import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Cascader from '../index'
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const CascaderDemo = defineComponent<ExampleProps>((props, {}) => {
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
<div>
  <Cascader
    treeData={treeData}
    placeholder="请选择所在地区"
  />
  <Cascader
    treeData={treeData}
    multiple={true}
    placeholder="请选择所在地区"
  />
</div>
  )
})

CascaderDemo.props = vuePropsType

export default CascaderDemo

