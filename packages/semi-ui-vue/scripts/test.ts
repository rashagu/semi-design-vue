import { Project, SyntaxKind, TypeFormatFlags } from 'ts-morph';
import { inspect } from './types';
// import {Button} from "@kousum/semi-ui-vue/src/components/button/Button.tsx";

// const tsMorph = require('ts-morph');
// 初始化项目
const project = new Project({
  tsConfigFilePath: "tsconfig.json",
  // addFilesFromTsConfig: true,
});

// 加载文件
const sourceFile = project.addSourceFileAtPath('dist/button/ButtonGroup.d.ts');

const props = [];
const interfaces = sourceFile.getInterfaces();

interfaces.forEach((i) => {
  if (i.getName() === 'ButtonGroupProps') {  // 假设你的 props 接口名为 Props
    i.getProperties().forEach((property) => {
      props.push({
        name: property.getName(),
        type: property.getType().getText(),
        required: !property.hasQuestionToken(),
      });
    });
    i.getBaseDeclarations().forEach((property) => {
      property.getType().getProperties().forEach((s) => {
        const type = s.getValueDeclaration().getType().getText(undefined, TypeFormatFlags.None)
        const required = !s.isOptional();
        props.push({
          name: s.getName(),
          type,
          required,
        });
      })
    })
  }
});

console.log(JSON.stringify(props, null, 2));
