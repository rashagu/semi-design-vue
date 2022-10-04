import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {FormState} from "@douyinfe/semi-foundation/form/interface";


export function useFormStateContext (): { context: Ref<UnwrapRef<FormState>> } {
  const context = inject('FormStateContext', ref<FormState>({}))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useFormStateContext()
  return () => slots.default ? slots.default(context) : null
})

Consumer.props = vuePropsType

export default Consumer

