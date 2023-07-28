import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import ListContext, {ListContextValue} from "../list-context";


export function useListContext (): { context: Ref<UnwrapRef<ListContextValue>> } {
  const context = inject('ListContext', ref<ListContextValue>(null))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useListContext()
  return () => slots.default ? slots.default(context) : null
}, {
  props: vuePropsType,
  name: 'ListContextConsumer'
})



export default Consumer

