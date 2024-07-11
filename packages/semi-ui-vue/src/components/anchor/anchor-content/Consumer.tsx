import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'

import AnchorContext, {AnchorContextType} from "../anchor-context";


export function useAnchorContext (): { context: Ref<UnwrapRef<AnchorContextType>> } {
  const context = inject('AnchorContext', ref<AnchorContextType>(null))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useAnchorContext()
  return () => slots.default ? slots.default(context) : null
},{props: { ...vuePropsType }})



export default Consumer

