import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {ContextType} from "../layoutContext";
import {noop} from "@douyinfe/semi-foundation/utils/function";


export function useLayoutContext (): { context: Ref<UnwrapRef<ContextType>> } {
  const context = inject('LayoutContext', ref<ContextType>({
    siderHook: {
      addSider: noop,
      removeSider: noop,
    },
  }))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useLayoutContext()
  return () => slots.default ? slots.default(context) : null
})

Consumer.props = vuePropsType

export default Consumer

