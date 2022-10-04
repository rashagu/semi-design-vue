import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {FormUpdaterContextType} from "@douyinfe/semi-foundation/form/interface";


export function useFormUpdaterContext (): { context: Ref<UnwrapRef<FormUpdaterContextType>> } {
  const context = inject('FormUpdaterContext', ref<FormUpdaterContextType>({} as FormUpdaterContextType))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useFormUpdaterContext()
  return () => slots.default ? slots.default(context) : null
})

Consumer.props = vuePropsType

export default Consumer

