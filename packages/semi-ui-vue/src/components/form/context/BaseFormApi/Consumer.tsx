import {defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots} from 'vue'
import {BaseFormApi} from "@douyinfe/semi-foundation/form/interface";


export function useBaseFormApiContext (): { context: Ref<UnwrapRef<BaseFormApi>> } {
  const context = inject('BaseFormApiContext', ref<BaseFormApi>({} as BaseFormApi))
  return {
    context
  }
}
export const vuePropsType = {

}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const {context} = useBaseFormApiContext()
  return () => slots.default ? slots.default(context) : null
},{
  props: vuePropsType,
  name: 'BaseFormApiContextConsumer'
})


export default Consumer

