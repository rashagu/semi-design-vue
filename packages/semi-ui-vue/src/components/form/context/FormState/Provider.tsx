import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {FormState} from "@douyinfe/semi-foundation/form/interface";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:FormState}>((props, {slots}) => {
  const ConfigContext = ref<FormState>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { immediate: true, deep: true})
  provide('FormStateContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

Provider.props = vuePropsType
Provider.name = "FormStateContextProvider"

export default Provider

