import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {TreeContextValue} from "../treeContext";


export function useTreeContext (): { context: Ref<UnwrapRef<TreeContextValue>> } {
  const context = inject('TreeContext', ref<TreeContextValue>({}))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useTreeContext()
  return () => slots.default ? slots.default(context) : null
}, {
  props: { ...vuePropsType },
  name: 'TreeContextConsumer'
})


export default Consumer

