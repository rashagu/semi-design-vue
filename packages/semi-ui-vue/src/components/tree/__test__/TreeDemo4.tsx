import Tree from '../index';
import { defineComponent, ref } from 'vue';

const Demo = defineComponent(() => {
  const expandedKeys = ref([]);
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
        {
          label: '日本',
          value: 'Japan',
          key: '0-1',
        },
      ],
    },
    {
      label: '北美洲',
      value: 'North America',
      key: '1',
    }
  ];
  return ()=>(
    <Tree
      style={{ width: '300px' }}
      treeData={treeData}
      filterTreeNode
      expandedKeys={expandedKeys.value}
      onExpand={v => {
        expandedKeys.value = v;
      }}
      onSearch={(inputValue, filteredExpandedKeys) => {
        expandedKeys.value = [...filteredExpandedKeys];
      }}
    />
  );
})
export default Demo;
