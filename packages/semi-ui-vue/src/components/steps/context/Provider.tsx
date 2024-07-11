import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {ContextValue} from "../context";



export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = ref<ContextValue>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true})
  provide('StepsContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: { ...vuePropsType },
  name: 'StepsContextProvider'
})



export default Provider

