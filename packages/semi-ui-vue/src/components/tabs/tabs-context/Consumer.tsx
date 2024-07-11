import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import { TabContextValue } from '../interface';
import TabsContext from "../tabs-context";


export function useTabsContext (): { context: Ref<UnwrapRef<TabContextValue>> } {
  const context = inject('TabsContext', ref<TabContextValue>({}))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useTabsContext()
  return () => slots.default ? slots.default(context) : null
}, {
  props: { ...vuePropsType },
  name: 'TabsContextConsumer'
})



export default Consumer

