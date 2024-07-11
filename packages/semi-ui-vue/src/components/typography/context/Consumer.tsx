import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import { TypographyBaseSize } from '../interface';



export function useTypographyBaseSizeContext(): { context: Ref<UnwrapRef<TypographyBaseSize>> } {
  const context = inject('TypographyBaseSize', ref<TypographyBaseSize>('normal'))
  return {
    context
  }
}
export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useTypographyBaseSizeContext()
  return () => slots.default ? slots.default(context) : null
}, {
  props: { ...vuePropsType },
  name: 'TypographyBaseSizeConsumer'
})


export default Consumer

