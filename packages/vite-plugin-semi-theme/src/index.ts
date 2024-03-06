import type { Plugin } from 'vite';
import type { Options } from './types';
import * as fs from 'fs';
import * as Path from 'path';
import * as sass from 'sass';
import { pathToFileURL } from 'node:url';

const { compileString } = sass;

function viteSemiTheme(options: Options): Plugin {
  if (!options.theme){
    console.error('name: 参数必填')
  }
  return {
    name: 'vite:semi-theme',

    async transform(code, id, opt) {
      const [filepath] = id.split('?');
      if (
        /@douyinfe\/semi-(ui|icons|foundation)\/lib\/.+\.css$/.test(filepath) ||
        /@kousum\/semi-ui-vue\/dist\/.+\.css$/.test(filepath)
      ) {
        const theme = options.theme;
        // always inject
        const scssVarStr = `@import "${theme}/scss/index.scss";\n`;
        // inject once
        const cssVarStr = `@import "${theme}/scss/global.scss";\n`;

        let animationStr = `@import "${theme}/scss/animation.scss";\n`;

        let scssFilePath = filepath.replace('.css', '.scss')!;

        let scssStr = fs.readFileSync(scssFilePath).toString('utf8');

        let componentVariables: string | boolean | undefined;
        try {
          const p = new URL(
            `${theme}/scss/local.scss`,
            pathToFileURL(scssFilePath.split('node_modules')[0] + 'node_modules/')
          );

          if (fs.existsSync(p)) {
            componentVariables = fs.readFileSync(p).toString('utf8')
          }
        } catch (e) {}
        const shouldInject = scssStr.includes('semi-base');
        if (options.include || options.variables) {
          let localImport = '';
          if (componentVariables) {
            localImport += `\n@import "${theme}/scss/local.scss";`;
          }
          if (options.include) {
            localImport += `\n@import "${options.include}";`;
          }
          if (options.variables) {
            localImport += `\n${options.variables}`;
          }
          try {
            const regex = /(@import '.\/variables.scss';?|@import ".\/variables.scss";?)/g;
            const fileSplit = scssStr.split(regex).filter((item) => Boolean(item));
            if (fileSplit.length > 1) {
              fileSplit.splice(fileSplit.length - 1, 0, localImport);
              scssStr = fileSplit.join('');
            }
          } catch (error) {}
        }

        // inject prefix
        const prefixCls = options.prefixCls || 'semi';

        const prefixClsStr = `$prefix: '${prefixCls}';\n`;

        if (shouldInject) {
          scssStr = `${animationStr}${cssVarStr}${scssVarStr}${prefixClsStr}${scssStr}`;
        } else {
          scssStr = `${scssVarStr}${prefixClsStr}${scssStr}`;
        }
        const css = compileString(scssStr, {
          importer: {
            findFileUrl(url) {
              if (url.includes('/base/base')) {
                return new URL(url.replace('~', ''), pathToFileURL(scssFilePath.match(/^(\S*\/node_modules\/)/)?.[0]!));
              }else if (url.startsWith(options.theme)) {
                return new URL(url, pathToFileURL(scssFilePath.split('node_modules')[0] + 'node_modules/'));
              }

              let filePath = Path.resolve(Path.dirname(scssFilePath), url);

              if (fs.existsSync(filePath)) {
                return pathToFileURL(filePath);
              }

              return null;
            },
          },
          url: undefined,
        }).css;

        return {
          code: css,
        };
      }
    },
  };
}

export default viteSemiTheme;
