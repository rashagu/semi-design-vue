import { defineComponent, ref, h, Fragment, useSlots, onMounted } from 'vue';
import Tree from "../index";
import tree from '../index';

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TreeDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const treeData = ref([]);
  onMounted(()=>{
    treeData.value = [
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
    ]
  })
  const style = {
    width: 260,
    height: 420,
    border: '1px solid var(--semi-color-border)'
  };
  // 虚拟化开启后，动画效果将被关闭
  return () => (
    <div>
      <Tree
        treeData={treeData.value}
        defaultExpandAll
        expandAll
        style={style}
      />
      <Tree
        treeData={treeData.value}
        style={style}
        virtualize={{
          height: 300,
          itemSize: 28,
        }}
      />
    </div>
  )
})




export default TreeDemo

