import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import Cascader from '../index';
import Item from '../item';
import {noop} from "lodash";
interface ExampleProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
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
            },
          ],
        },
      ],
    },
  ];
  return () => (
    <div>
      <Cascader defaultOpen={true} treeData={treeData} placeholder="请选择所在地区" />
      <Cascader treeData={treeData} multiple={true} placeholder="请选择所在地区" />

      <ItemDdemo />
    </div>
  );
});

CascaderDemo.props = vuePropsType;

export default CascaderDemo;
export const ItemDdemo = defineComponent(() => {
  const props_ = {
    activeKeys: new Set(),
    selectedKeys: new Set(),
    halfCheckedKeys: new Set(),
    checkedKeys: new Set(),
    loadedKeys: new Set(),
    loadingKeys: new Set(),
    onItemClick: noop,
    separator: ' / ',
    showNext: 'click',
    searchable: false,
    inputValue: '',
    data: [],
    multiple: false,
  };
  const a = [
    {
      children: [],
      data: { label: '浙江省', value: 'zhejiang', children: [] },
      ind: 0,
      key: '0',
      level: 0,
      parent: undefined,
      parentKey: null,
      path: ['0'],
      valuePath: ['zhejiang'],
    }
  ];
  return () => (
    <div>
      {/*// @ts-ignore*/}
      <Item {...props_}></Item>
      {/*// @ts-ignore*/}
      <Item {...props_} data={a}></Item>
    </div>
  );
});
