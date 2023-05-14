import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import TreeCheckDemo from "./TreeCheckDemo";
import VirtualizeTreeDemo from "./VirtualizeTreeDemo";
import TreeDemo from "./TreeDemo";

interface TreeAllDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TreeAllDemo = defineComponent<TreeAllDemoProps>((props, {}) => {
  const slots = useSlots()


  return () => (
    <div>
      <TreeDemo />
      <TreeCheckDemo />
    </div>
  )
})

// @ts-ignore
TreeAllDemo.props = vuePropsType
TreeAllDemo.name = 'TreeAllDemo'

export default TreeAllDemo

