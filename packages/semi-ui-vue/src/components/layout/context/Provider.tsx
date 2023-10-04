import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {ContextType} from "../layoutContext";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:ContextType}>((props, {slots}) => {
  const ConfigContext = ref<ContextType>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true})
  provide('LayoutContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: vuePropsType,
  name: 'LayoutProvider'
})


export default Provider

