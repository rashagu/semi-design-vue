import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Tree from "../index";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TreeCheckDemo = defineComponent((props, {}) => {
  const slots = useSlots()
  const treeData = [
    {
      label: 'Asia',
      value: 'Asia',
      key: '0',
      children: [
        {
          label: 'China',
          value: 'China',
          key: '0-0',
          children: [
            {
              label: 'Beijing',
              value: 'Beijing',
              key: '0-0-0',
            },
            {
              label: 'Shanghai',
              value: 'Shanghai',
              key: '0-0-1',
            },
            {
              label: 'Chengdu',
              value: 'Chengdu',
              key: '0-0-2',
            },
          ],
        },
        {
          label: 'Japan',
          value: 'Japan',
          key: '0-1',
          children: [
            {
              label: 'Osaka',
              value: 'Osaka',
              key: '0-1-0'
            }
          ]
        },
      ],
    },
    {
      label: 'North America',
      value: 'North America',
      key: '1',
      children: [
        {
          label: 'United States',
          value: 'United States',
          key: '1-0'
        },
        {
          label: 'Canada',
          value: 'Canada',
          key: '1-1'
        }
      ]
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
        multiple
        defaultExpandAll
        style={style}
      />
    </div>
  )
})


export default TreeCheckDemo

