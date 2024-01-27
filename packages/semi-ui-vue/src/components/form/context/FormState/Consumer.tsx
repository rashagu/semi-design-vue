import {defineComponent, h, inject, Ref, ref, shallowRef, UnwrapRef, useSlots} from 'vue'
import {FormState} from "@douyinfe/semi-foundation/form/interface";


export function useFormStateContext (): { context: Ref<UnwrapRef<FormState>> } {
  const context = inject('FormStateContext', shallowRef<FormState>({}))
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

// @ts-ignore
Consumer.props = vuePropsType

export default Consumer

