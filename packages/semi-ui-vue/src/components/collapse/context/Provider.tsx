import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {CollapseContextType} from "../collapse-context";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:CollapseContextType}>((props, {slots}) => {
  const ConfigContext = ref<CollapseContextType>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true, immediate: true})
  provide('CollapseContext', ConfigContext)
  return ()=>{
    return slots.default?slots.default(ConfigContext.value):null
  }
}, {
  props: vuePropsType,
  name: 'CollapseProvider'
})



export default Provider

