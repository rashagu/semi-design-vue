import {defineComponent, ref, h, Fragment, useSlots, onMounted} from 'vue'
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
  const value = ref('North America')
  onMounted(()=>{
    setTimeout(()=>{
      value.value = 'Beijing'
      console.log(value.value)
    }, 3300)
  })
  return () => (
    <div>
      <TreeSelect
        value={value.value}
        onChange={(v)=>{
          console.log(v)
          value.value = v
        }}
        style={{ width: '300px' }}
        dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
        treeData={treeData}
        placeholder="请选择"
      />
      <TreeSelect
        defaultOpen={true}
        style={{ width: '300px' }}
        dropdownStyle={{overflow: 'auto' }}
        treeData={treeData}
        placeholder="请选择"
      />
    </div>
  )
})



export default TreeSelectDemo

