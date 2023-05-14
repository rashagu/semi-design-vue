import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {BreadContextType} from "../bread-context";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:BreadContextType}>((props, {slots}) => {
  const ConfigContext = ref<BreadContextType>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true})
  provide('BreadContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

// @ts-ignore
Provider.props = vuePropsType

export default Provider

