import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Tree from "../index";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TreeCheckDemo = defineComponent((props, {}) => {
  const slots = useSlots()
  const style = {
    width: 260,
    height: 420,
    border: '1px solid var(--semi-color-border)'
  };
  const json = {
    "Node1": {
      "Child Node11": {
        "Child Node13": '0-0-1',
        "Child Node12": '0-0-99',
      },
      "ChildNode9": {
        "Child Node91": '9-1',
        "Child Node92": '9-99',
      },
    },
    "Node2": "0-1"
  };
  return () => (
    <div>
      <Tree
        treeDataSimpleJson={json}
        multiple
        defaultExpandAll
        onChange={e => console.log('当前所有选中项: ', e)}
        onSelect={(e,b,c) => console.log('当前选项: ', e,b,c)}
        style={style}
      />
    </div>
  )
})


export default TreeCheckDemo

