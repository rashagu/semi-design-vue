import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import DescriptionsContext, {DescriptionsContextValue} from "../descriptions-context";


export function useDescriptionsContext (): { context: Ref<UnwrapRef<DescriptionsContextValue>> } {
  const context = inject('DescriptionsContext', ref<DescriptionsContextValue>(null))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useDescriptionsContext()
  return () => slots.default ? slots.default(context) : null
}, {
  props: vuePropsType,
  name: 'DescriptionsConsumer'
})


export default Consumer

