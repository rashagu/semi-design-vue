import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Tree from "../index";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TreeDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const treeData = [
    {
      label: '亚洲',
      value: 'Asia',
      key: '0',
      children: [
        {
          label: '中国',
          value: 'China',
          key: '0-0',
          children: [
            {
              label: '北京',
              value: 'Beijing',
              key: '0-0-0',
            },
            {
              label: '上海',
              value: 'Shanghai',
              key: '0-0-1',
            },
          ],
        },
      ],
    },
    {
      label: '北美洲',
      value: 'North America',
      key: '1',
    }
  ];
  const style = {
    width: 260,
    height: 420,
    border: '1px solid var(--semi-color-border)'
  };
  return () => (
    <div>
      <Tree
        treeData={treeData}
        defaultExpandAll
        style={style}
        virtualize={{
          height: 300,
          itemSize: 28,
        }}
      />
    </div>
  )
})

// @ts-ignore
// TreeDemo.props = vuePropsType
// TreeDemo.name = 'TreeDemo'

export default TreeDemo

