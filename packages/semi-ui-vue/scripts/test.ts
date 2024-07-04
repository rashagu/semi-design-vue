import { Project, SyntaxKind, Type } from "ts-morph";
import * as fs from "fs";
import { componentsData } from './componentsData';

// 初始化 ts-morph 项目
const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

// 解析 TSX 组件文件
const sourceFiles = project.addSourceFilesAtPaths('./node_modules/@kousum/semi-ui-vue/dist/**/*.d.ts');
const sourceFilesNames = project.addSourceFilesAtPaths('./node_modules/@kousum/semi-ui-vue/dist/index.d.ts');

const webTypes = {
  $schema: "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
  framework: "vue",
  name: "my-vue-library",
  version: "1.0.0",
  contributions: {
    html: {
      tags: [],
    },
  },
};



sourceFiles.forEach((sourceFile) => {
  sourceFile.getInterfaces().forEach(item=>{
    let find = componentsData.find(component=>{
      return component.propsName === item.getName()
    })
    if (find){
      const componentTag = {
        name: find.name,
        attributes: [],
        events: [],
        slots: [],
      };
      item.getType().getProperties().forEach(t=>{
        let propType = t.getValueDeclaration()?.getType().getText();
        if (propType?.indexOf('node_modules/') > -1){
          propType = '(\"' + propType.split('node_modules/').pop()
        }
        const propName = t.getName();
        componentTag.attributes.push({
          name: propName,
          description: `Description for ${propName}`,
          value: {
            type: propType,
          },
        });
        // console.log(t.getName(), propType)
      })
      webTypes.contributions.html.tags.push(componentTag);
    }
  })


});

// 将 web-types 写入文件
fs.writeFileSync("web-types.json", JSON.stringify(webTypes, null, 2));
