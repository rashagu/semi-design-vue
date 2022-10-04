import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {FormUpdaterContextType} from "@douyinfe/semi-foundation/form/interface";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:FormUpdaterContextType}>((props, {slots}) => {
  const ConfigContext = ref<FormUpdaterContextType>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true})
  provide('FormUpdaterContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

Provider.props = vuePropsType

export default Provider

