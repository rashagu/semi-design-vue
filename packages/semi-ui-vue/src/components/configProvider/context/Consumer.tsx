import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {ContextValue} from "../context";


export function useConfigContext (): { context: Ref<UnwrapRef<ContextValue>> } {
  const context = inject('ConfigContext', ref<ContextValue>({}))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useConfigContext()
  return () => slots.default ? slots.default(context) : null
})

Consumer.props = vuePropsType

export default Consumer

