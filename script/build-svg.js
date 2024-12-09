/**
 * 转换svg元素成Vue3TSX组件
 */

const svgr = require('@svgr/core').default;
const {optimize} = require('svgo');
const fs = require('node:fs');
const {resolve, basename, extname} = require('path');
const camelCase = require('camelcase');
const prettier = require('prettier');

/**
 *
 * @param {*} entryDir 存放svg文件夹
 * @param {*} outDir 输出Vue3TSX组件文件夹
 * @param {*} prefix 图标前缀
 * @param {*} suffix 图标后缀
 * @param svgoPlugins
 * @param svgrOptions
 * @param type
 */
async function build(entryDir, outDir, prefix, suffix, svgoPlugins = [], svgrOptions = {}, type) {
  const prettierConfig = require('../.prettierrc.js');
  fs.rmSync(outDir, {recursive: true});
  fs.mkdirSync(outDir);
  // 读取svg文件夹下的文件，转译成Vue3TSX组件，并输出
  const files = fs.readdirSync(entryDir, 'utf-8');
  const indexFileName = 'index.ts';
  const batches = files.filter(f => extname(f) === '.svg').map(async file => {
    try {
      const svgFileName = basename(file, '.svg');
      const componentName = `${prefix}${camelCase(svgFileName, {pascalCase: true})}${suffix}`;
      const reactFileName = `${componentName}.tsx`;
      const svgContent = fs.readFileSync(resolve(entryDir, file), 'utf-8');
      const svgProps = {
        focusable: '{false}',
        'aria-hidden': true
      };
      const result = optimize(svgContent, {
        plugins: svgoPlugins,
      });
      // console.log(svgr)
      const jsxCode = await svgr(result.data, {
        plugins: ['@svgr/plugin-jsx'],
        svgProps,
        iconType: svgFileName,
        ...svgrOptions,
      });
      const formattedCode = prettier.format(jsxCode, prettierConfig);
      const newFormattedCode = formattedCode
        // .replace('defineComponent_', `defineComponent<IconProps>`)
        .replace('focusable={false}', `// @ts-ignore
            focusable={false}`)
        .replaceAll('fillRule', 'fill-rule')
        .replaceAll('clipRule', 'clip-rule')
        .replaceAll('strokeWidth', 'stroke-width')
        .replaceAll('clipPath=', 'clip-path=')
        .replaceAll('className=', 'class=')
        .replaceAll('stopOpacity', 'stop-opacity')
        .replaceAll('strokeLinecap', 'stroke-linecap')
        .replaceAll('strokeLinejoin', 'stroke-linejoin')
        .replaceAll('stopColor', 'stop-colo')
        .replaceAll('strokeMiterlimit', 'stroke-miterlimit')
        .replaceAll('fillOpacity=', 'fill-opacity=')

        .replaceAll('semi_icon-activity', componentName)
        .replaceAll("iconType={'activity'}", `iconType={'${svgFileName}'}`)



      fs.writeFileSync(resolve(outDir, reactFileName), newFormattedCode, 'utf-8');
      return {fileName: reactFileName, componentName};
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  const arr = await Promise.all(batches);
  // const indexFileContent = arr.map((a, index) => `export { default as ${a.componentName} } from './${a.componentName}';`).join('\n');
  // fs.writeFileSync(resolve(outDir, indexFileName), indexFileContent, 'utf-8');

  const o = type === 'icons'?`import Icon, {ConvertIcon} from './components/Icon';

export type {
  IconSize,
  IconProps,
  convertIconType
} from './components/Icon';


export {
  Icon,
  ConvertIcon
}
`:''
  const indexFileContent = arr.map((a, index) => `export { default as ${a.componentName} } from './${type}/${a.componentName}';`).join('\n');
  fs.writeFileSync(resolve(outDir, '../' + indexFileName), o + '\n' + indexFileContent, 'utf-8');


  const testFileContent = `import {shallowMount, mount} from "@vue/test-utils";\nimport { expect, test } from 'vitest';\n` + (arr.map((a, index) => `import {default as ${a.componentName}, SvgComponent as SvgComponent${index} }  from "./${type}/${a.componentName}";`).join('\n')) + `
test('render with scoped-slot', async () => {
  ${(arr.map((a,index) => `const wrapper${index} = shallowMount(${a.componentName}, {});
  const wrapperSvgComponent${index} = shallowMount(SvgComponent${index}, {});
  `).join('\n'))}
})
  `;
  fs.writeFileSync(resolve(outDir, '../testIcon.spec.ts'), testFileContent, 'utf-8');
  return arr;
}

module.exports = build;
