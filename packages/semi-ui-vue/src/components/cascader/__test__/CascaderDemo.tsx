import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Cascader from '../Index'
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const CascaderDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const treeData = [
    {
      label: '浙江省',
      value: 'zhejiang',
      children: [
        {
          label: '杭州市',
          value: 'hangzhou',
          children: [
            {
              label: '西湖区',
              value: 'xihu',
            },
            {
              label: '萧山区',
              value: 'xiaoshan',
            },
            {
              label: '临安区',
              value: 'linan',
            },
          ],
        },
        {
          label: '宁波市',
          value: 'ningbo',
          children: [
            {
              label: '海曙区',
              value: 'haishu',
            },
            {
              label: '江北区',
              value: 'jiangbei',
            }
          ]
        },
      ],
    }
  ];
  return () => (
    <Cascader
      style={{ width: 300 }}
      treeData={treeData}
      placeholder="请选择所在地区"
    />
  )
})

CascaderDemo.props = vuePropsType

export default CascaderDemo

