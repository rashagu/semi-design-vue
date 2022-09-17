import {defineComponent, ref, h, Fragment, provide} from 'vue'
import {Locale} from '../interface';


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:Locale}>((props, {slots}) => {
  const ConfigContext = ref<Locale>(props.value);

  provide('LocalContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

Provider.props = vuePropsType

export default Provider

