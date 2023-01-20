import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {DescriptionsContextValue} from "../descriptions-context";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:DescriptionsContextValue}>((props, {slots}) => {
  const ConfigContext = ref<DescriptionsContextValue>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true, immediate: true})
  provide('DescriptionsContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

Provider.props = vuePropsType

export default Provider

