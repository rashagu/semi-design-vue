import {defineComponent, ref, h, Fragment, useSlots, reactive} from 'vue'
import Button from "../../button";
import Tree from "../index";

interface VirtualizeTreeDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const VirtualizeTreeDemo = defineComponent<VirtualizeTreeDemoProps>((props, {}) => {
  const slots = useSlots()

  const state = reactive({
    gData: [],
    total: 0,
  })

  function generateData(x = 5, y = 4, z = 3, gData = []) {
    // x：每一级下的节点总数。y：每级节点里有y个节点、存在子节点。z：树的level层级数（0表示一级）
    function _loop(_level, _preKey = null, _tns = null) {
      const preKey = _preKey || '0';
      const tns = _tns || gData;

      const children = [];
      for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ label: `${key}-标签`, key: `${key}-key`, value: `${key}-value` });
        if (i < y) {
          children.push(key);
        }
      }
      if (_level < 0) {
        return tns;
      }
      const __level = _level - 1;
      children.forEach((key, index) => {
        tns[index].children = [];
        return _loop(__level, key, tns[index].children);
      });

      return null;
    }
    _loop(z);

    function calcTotal(x, y, z) {
      const rec = n => (n >= 0 ? x * y ** n-- + rec(n) : 0);
      return rec(z + 1);
    }
    return { gData, total: calcTotal(x, y, z) };
  }


  function onGen() {
    const { gData, total } = generateData();
    state.gData = gData
    state.total = total
  }
  return () => {
    const style = {
      width: '260px',
      border: '1px solid var(--semi-color-border)'
    };
    return (
      <div>
        <div style={{padding: '0 20px'}}>
          <Button onClick={onGen}>生成数据: </Button>
          <span>共 {state.total} 个节点</span>
          <br/>
          <br/>
          {state.gData.length ? (
            <Tree
              treeData={state.gData}
              filterTreeNode
              showFilteredOnly
              style={style}
              virtualize={{
                // if set height for tree, it will fill 100%
                height: 300,
                itemSize: 28,
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
})

// @ts-ignore
// VirtualizeTreeDemo.props = vuePropsType
// VirtualizeTreeDemo.name = 'VirtualizeTreeDemo'

export default VirtualizeTreeDemo

