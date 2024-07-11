import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import { TabContextValue } from '../interface';


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = ref<TabContextValue>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true, immediate: true})
  provide('TabsContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: { ...vuePropsType },
  name: 'TabsContextProvider'
})



export default Provider

