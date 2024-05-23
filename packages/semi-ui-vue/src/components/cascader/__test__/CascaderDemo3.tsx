import { defineComponent, ref, h, Fragment, useSlots, computed, onMounted } from 'vue';
import Cascader, { TriggerRenderProps, Value } from '../index';
import Item from '../item';
import { noop } from 'lodash';
import { IconChevronDown, IconClose, IconHome } from '@kousum/semi-icons-vue';
import Button from '../../button';
import { Form, FormCascader } from '../../form';
import { BaseFormApi } from '@douyinfe/semi-foundation/form/interface';
import { treeData } from './treeData';
interface ExampleProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const CascaderDemo3 = defineComponent<ExampleProps>((props, {}) => {

  const value = ref<Value>([
    "zhejiang",
    "ningbo5",
    "hangzhou",
    "linan3"
  ]);

  const formApi = ref<BaseFormApi>();
  onMounted(() => {

  });

  return () => (
    <div style={{display: 'flex', justifyContent:'space-between'}}>
      <Cascader
        onChange={(v) => {
          value.value = v;
        }}
        value={value.value}
        treeData={treeData}
        placeholder="请选择所在地区"
      />
      <Cascader treeData={treeData}
                onChange={(v) => {
                  value.value = v;
                }}
                value={value.value} placeholder="请选择所在地区" />

      {/*<Form getFormApi={(v)=>formApi.value = v}>*/}
      {/*  <FormCascader*/}
      {/*    field='sss'*/}
      {/*    style={{ width: '300px' }}*/}
      {/*    treeData={[*/}
      {/*      {*/}
      {/*        label: '浙江省',*/}
      {/*        value: 'zhejiang',*/}
      {/*        children: [*/}
      {/*          {*/}
      {/*            label: '杭州市',*/}
      {/*            value: 'hangzhou',*/}
      {/*            children: [*/}
      {/*              {*/}
      {/*                label: '西湖区',*/}
      {/*                value: 'xihu',*/}
      {/*              },*/}
      {/*              {*/}
      {/*                label: '萧山区',*/}
      {/*                value: 'xiaoshan',*/}
      {/*              },*/}
      {/*              {*/}
      {/*                label: '临安区',*/}
      {/*                value: 'linan',*/}
      {/*              },*/}
      {/*            ],*/}
      {/*          },*/}
      {/*          {*/}
      {/*            label: '宁波市',*/}
      {/*            value: 'ningbo',*/}
      {/*            children: [*/}
      {/*              {*/}
      {/*                label: '海曙区',*/}
      {/*                value: 'haishu',*/}
      {/*              },*/}
      {/*              {*/}
      {/*                label: '江北区',*/}
      {/*                value: 'jiangbei',*/}
      {/*              }*/}
      {/*            ]*/}
      {/*          },*/}
      {/*        ],*/}
      {/*      }*/}
      {/*    ]}*/}
      {/*    placeholder="请选择所在地区_test1"*/}
      {/*    leafOnly*/}

      {/*    multiple*/}
      {/*  >*/}

      {/*  </FormCascader>*/}
      {/*</Form>*/}
    </div>
  );
});

export default CascaderDemo3;
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
    },
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
            },
          ],
        },
      ],
    },
  ]);
  const onChange = (val) => {
    value.value = val;
  };
  const onClear = (e) => {
    e && e.stopPropagation();
    value.value = [];
  };

  const closeIcon = computed(() => {
    return value.value && value.value.length ? <IconClose onClick={onClear} /> : <IconChevronDown />;
  });

  const triggerRender = ({ value: innerStateValue, placeholder, ...rest }: TriggerRenderProps) => {
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
        placeholder="Custom Trigger"
        triggerRender={triggerRender}
        suffix={<IconHome />}
        prefix={<IconHome />}
      />
    </div>
  );
});
