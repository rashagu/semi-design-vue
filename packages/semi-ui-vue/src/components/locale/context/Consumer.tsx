import {defineComponent, ref, h, Fragment, useSlots, inject} from 'vue'
import {Locale} from '../interface';

export const vuePropsType = {
  name: String
}
const Consumer = defineComponent(() => {
  const slots = useSlots()
  const config = inject('LocalContext', ref<Locale | null>(null))
  return ()=>slots.default?slots.default(config):null
})

Consumer.props = vuePropsType
Consumer.name = "LocaleContext"

export default Consumer

