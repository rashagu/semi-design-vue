import type { Plugin } from 'vite';
import type { Options } from './types';
import * as fs from 'fs';
import * as Path from 'path';
import * as sass from 'sass';
import { pathToFileURL } from 'node:url';
import componentVariablePathList from './componentName';

const { compileString } = sass;

function viteSemiTheme(options: Options): Plugin {
  if (!options.theme){
    console.error('theme: 参数必填')
  }
  return {
    name: 'vite:semi-theme',

    async transform(code, id, opt) {
      const [filepath] = id.split('?');
      if (
        /@douyinfe\/semi-(ui|icons|foundation)\/lib\/.+\.css$/.test(filepath) ||
        /@kousum\/semi-ui-vue\/dist\/.+\.css$/.test(filepath) ||
        /_base\/base.css$/.test(filepath)
      ) {
        const theme = options.theme;
        const cssLayer = options.cssLayer ?? false as boolean;
        // always inject
        const scssVarStr = `@import "${theme}/scss/index.scss";\n`;
        // inject once
        const cssVarStr = `@import "${theme}/scss/global.scss";\n`;

        let animationStr = `@import "${theme}/scss/animation.scss";\n`;

        let scssFilePath = filepath.replace('.css', '.scss')!;

        let fileStr = fs.readFileSync(scssFilePath).toString('utf8');

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
        const shouldInject = fileStr.includes('semi-base');
        if (options.include || options.variables || componentVariables) {
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
            const fileSplit = fileStr.split(regex).filter((item) => Boolean(item));
            if (fileSplit.length > 1) {
              fileSplit.splice(fileSplit.length - 1, 0, localImport);
              fileStr = fileSplit.join('');
            }
          } catch (error) {}
        }

        // inject prefix
        const prefixCls = options.prefixCls || 'semi';

        const prefixClsStr = `$prefix: '${prefixCls}';\n`;
        let finalCSS: string = "";

        if (shouldInject) {
          const customStr = (() => {
            let customStr = '';
            try {
              const customExists = new URL(
                `${theme}/scss/custom.scss`,
                pathToFileURL(scssFilePath.split('node_modules')[0] + 'node_modules/')
              );
              let customFileStr = fs.readFileSync(customExists).toString('utf8');

              if (!fs.existsSync(customExists) || !customFileStr) {
                return '';
              }
              const collectAllVariablesPath: string[] = [
                ...componentVariablePathList,
              ];
              if (componentVariables) {
                collectAllVariablesPath.push(`${theme}/scss/local.scss`);
              }
              collectAllVariablesPath.push(`${theme}/scss/custom.scss`);
              customStr = collectAllVariablesPath.map(p => {
                return `@import "${p}";`;
              }).join('\n') + '\n' + customStr;

            } catch (e) {
              customStr = ''; // fallback to empty string
            }
            return `body:not(:not(body)){${customStr}};`;
          })();
          console.log(customStr);
          finalCSS = `${animationStr}${cssVarStr}${scssVarStr}${prefixClsStr}${fileStr}${customStr}`;
        } else {
          finalCSS = `${scssVarStr}${prefixClsStr}${fileStr}`;
        }
        if (cssLayer) {
          finalCSS = `@layer semi{${finalCSS}}`;
        }
        const css = compileString(finalCSS, {
          importer: {
            findFileUrl(url) {
              if (url.includes('@douyinfe/semi-foundation/')) {
                const path = scssFilePath.match(/^(\S*\/node_modules\/)/)
                if (path){
                  return new URL(url.replace('~', ''), pathToFileURL(path[0]));
                }else{
                  return new URL(url, pathToFileURL('E:/semi-design-vue/packages/semi-ui-vue/node_modules/'));
                }
              }

              if (url.startsWith(options.theme)) {
                return new URL(url, pathToFileURL(Path.resolve('./') + '/node_modules/'));
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
