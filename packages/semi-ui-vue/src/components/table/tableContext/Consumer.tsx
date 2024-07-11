import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {TableContextProps} from "../table-context";
import {noop} from "lodash";
import Provider from "./Provider";



export function useTableContext (): { context: Ref<UnwrapRef<TableContextProps>> } {
  const context = inject('TableContext', ref<TableContextProps>({
    headWidths: [],
    setHeadWidths: noop,
    handleRowExpanded: noop,
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
  const {context} = useTableContext()
  return () => slots.default ? slots.default(context) : null
}, {
  props: { ...vuePropsType },
  name: 'TableContextConsumer'
})


export default Consumer

