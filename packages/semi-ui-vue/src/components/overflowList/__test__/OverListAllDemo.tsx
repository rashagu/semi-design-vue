import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import OverflowListDemo from "./OverflowListDemo";
import {OverflowListScroll} from "../__stories__/Demo.stories";
import OverflowListDemoScroll from "./OverflowListDemoScroll";

interface OverListAllDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const OverListAllDemo = defineComponent<OverListAllDemoProps>((props, {}) => {
  const slots = useSlots()


  return () => (
    <div>
      <OverflowListDemo></OverflowListDemo>
      <OverflowListDemoScroll />
    </div>
  )
})

OverListAllDemo.props = vuePropsType
OverListAllDemo.name = 'OverListAllDemo'

export default OverListAllDemo

