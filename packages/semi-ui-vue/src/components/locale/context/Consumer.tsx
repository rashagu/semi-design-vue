import {defineComponent, ref, h, Fragment, useSlots, inject} from 'vue'
import {Locale} from '../interface';

export const vuePropsType = {
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const config = inject('LocalContext', ref<Locale | null>(null))
  return ()=>slots.default?slots.default(config):null
}, {
  props: { ...vuePropsType },
  name: 'LocaleContextConsumer'
})


export default Consumer

