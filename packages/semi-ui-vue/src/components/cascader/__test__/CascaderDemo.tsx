import {defineComponent, ref, h, Fragment, useSlots, computed} from 'vue';
import Cascader, {TriggerRenderProps, Value} from '../index';
import Item from '../item';
import {noop} from "lodash";
import {IconChevronDown, IconClose, IconHome} from "@kousum/semi-icons-vue";
import Button from "../../button";
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
  const value = ref<Value>(['zhejiang', 'hangzhou', 'xiaoshan'])
  return () => (
    <div>
      <Cascader onChange={(v)=>{
        console.log(v)
        value.value = v
      }} value={value.value}
                filterTreeNode treeData={treeData} placeholder="请选择所在地区" />
      {/*<Cascader defaultOpen={true} onChange={(v)=>{*/}
      {/*  console.log(v)*/}
      {/*  value.value = v*/}
      {/*}} value={value.value} treeData={treeData} placeholder="请选择所在地区" />*/}
      {/*<Cascader treeData={treeData} multiple={true} placeholder="请选择所在地区" />*/}

      {/*<ItemDdemo />*/}


      {/*<TriggerRenderDemo />*/}


    </div>
  );
});


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



export const TriggerRenderDemo = defineComponent(() => {

  const value = ref([]);
  const treeData = computed(() => [
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
  ]);
  const onChange = (val) => {
    value.value = val
  }
  const onClear = e => {
    e && e.stopPropagation();
    value.value = []
  }

  const closeIcon = computed(() => {
    return value.value && value.value.length ? <IconClose onClick={onClear} /> : <IconChevronDown />;
  });

  const triggerRender = ({ value: innerStateValue, placeholder, ...rest }:TriggerRenderProps) => {
    console.log(value);
    console.log(rest);
    return (
      <Button theme={'light'} icon={closeIcon} iconPosition={'right'}>
        {value.value && value.value.length ? value.value.join('/') : placeholder}
      </Button>
    );
  };
  return () => (
    <div>
      <Cascader
        defaultOpen={true}
        onChange={onChange}
        value={value.value}
        treeData={treeData.value}
        placeholder='Custom Trigger'
        triggerRender={triggerRender}
        suffix={<IconHome/>}
        prefix={<IconHome/>}
      />
    </div>
  );
});
