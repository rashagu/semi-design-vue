import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {ContextValue} from "../context";


export function useStepsContext (): { context: Ref<UnwrapRef<ContextValue>> } {
  const context = inject('StepsContext', ref<ContextValue>(null))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useStepsContext()
  return () => slots.default ? slots.default(context) : null
}, {
  props: vuePropsType,
  name: 'StepsContextConsumer'
})



export default Consumer

