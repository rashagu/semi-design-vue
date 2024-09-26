import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {Locale} from '../interface';


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = ref<Locale>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  })
  provide('semi_LocalContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: { ...vuePropsType },
  name: 'LocalContextProvider'
})


export default Provider

