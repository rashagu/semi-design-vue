import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {CheckboxContext} from "../context";


export function useCheckboxContext (): { context: Ref<UnwrapRef<CheckboxContext>> } {
  const context = inject('CheckboxContext', ref<CheckboxContext>({}))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useCheckboxContext()
  return () => slots.default ? slots.default(context) : null
}, {
  props: vuePropsType,
  name: 'CheckboxContextConsumer'
})


export default Consumer

