import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import TreeSelect from "../index";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TreeSelectDemo = defineComponent<ExampleProps>((props, {}) => {
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
  return () => (
    <div>
      <TreeSelect
        defaultOpen={true}
        style={{ width: 300 }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="请选择"
      />
    </div>
  )
})

TreeSelectDemo.props = vuePropsType
TreeSelectDemo.name = 'TreeSelectDemo'

export default TreeSelectDemo

