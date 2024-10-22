import {defineComponent, ref, h, Fragment, useSlots, inject} from 'vue'
import { ResizeContextProps } from '../resizeContext';

export function useResizeContext() {
  return inject('semi_ResizeContext', ref<ResizeContextProps>(undefined))
}

export const vuePropsType = {
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const config = inject('semi_ResizeContext', ref<ResizeContextProps>(undefined))
  return ()=>slots.default?slots.default(config):null
}, {
  props: { ...vuePropsType },
  name: 'ResizeContextConsumer'
})


export default Consumer

