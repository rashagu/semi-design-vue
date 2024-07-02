import { Project, TypeFormatFlags } from 'ts-morph';

const project = new Project();
const sourceFile = project.createSourceFile('temp.ts', `
import { CSSProperties } from 'vue';
export type BaseProps = {
    style?: CSSProperties;
    className?: string;
};
`);


// 获取类型
const basePropsType = sourceFile.getTypeAliasOrThrow('BaseProps');
// 转换为web-types格式
const webTypes = {
  contributions: {
    html: {
      'types-syntax': 'typescript',
      'types': [
        {
          name: 'BaseProps',
          description: 'Base properties for components',
          attributes: basePropsType.getType().getProperties().map(prop => ({
            name: prop.getName(),
            description: prop.getJsDocTags().map(doc => doc.getText()).join(' '),
            value: {
              kind: 'expression',
              type: prop.getValueDeclaration().getType().getText(undefined, TypeFormatFlags.None)
            }
          }))
        }
      ]
    }
  }
};

console.log(JSON.stringify(webTypes, null, 2));
