import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {ArrayFieldContext} from "../../context";
import {ArrayFieldType} from "./Provider";


export function useArrayFieldContext (): { context: Ref<UnwrapRef<ArrayFieldType>> } {
  const context = inject('ArrayFieldContext', ref<ArrayFieldType>({
    shouldUseInitValue: true,
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
  const {context} = useArrayFieldContext()
  return () => slots.default ? slots.default(context) : null
})

Consumer.props = vuePropsType

export default Consumer

