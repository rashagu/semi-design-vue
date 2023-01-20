import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import Transfer from '../index';

interface TreeDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const TransferTreeDemo = defineComponent<TreeDemoProps>((props, {}) => {
  const slots = useSlots();

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
              key: '0-1-0',
            },
          ],
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
          key: '1-0',
        },
        {
          label: 'Canada',
          value: 'Canada',
          key: '1-1',
        },
        {
          label: 'Mexico',
          value: 'Mexico',
          disabled: true,
          key: '1-2',
        },
        {
          label: 'Cuba',
          value: 'Cuba',
          key: '1-3',
        },
      ],
    },
  ];

  const v = ref<any[]>(['Shanghai']);
  function onChange(val: (string | number)[]) {
    console.log(val)
    v.value = val
  }
  return () => (
    <div style={{ margin: 10, padding: 10, width: 600 }}>
      <Transfer dataSource={treeData} type="treeList" value={v.value} onChange={onChange}></Transfer>
    </div>
  );
});

TransferTreeDemo.props = vuePropsType;
TransferTreeDemo.name = 'TransferTreeDemo';

export default TransferTreeDemo;
