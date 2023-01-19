import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import CollapseContext, {CollapseContextType} from "../collapse-context";


export function useCollapseContext (): { context: Ref<UnwrapRef<CollapseContextType>> } {
  const context = inject('CollapseContext', ref<CollapseContextType>({} as CollapseContextType))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useCollapseContext()
  return () => slots.default ? slots.default(context) : null
})

Consumer.props = vuePropsType

export default Consumer

