import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Body from "../Body";
import Store from "@douyinfe/semi-foundation/utils/Store";

interface BodyDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const BodyDemo = defineComponent((props, {}) => {
  const slots = useSlots()

  const ns = new Set()
  const store = new Store({
    hoveredRowKey: null,
  });
  const groups = new Map()
  groups.set(100, new Set(["姜鹏志-semi design 设计稿0.fig"]))
  return () => (
    <div>
      <Body
        disabledRowKeysSet={ns}
        selectedRowKeysSet={ns}
        store={store as any}
        renderExpandIcon={()=><div></div>}
      >

      </Body>
      <Body
        disabledRowKeysSet={ns}
        selectedRowKeysSet={ns}
        store={store as any}
        renderExpandIcon={()=><div></div>}
        groups={groups as any}
      >

      </Body>
    </div>
  )
})

BodyDemo.props = vuePropsType
BodyDemo.name = 'BodyDemo'

export default BodyDemo

