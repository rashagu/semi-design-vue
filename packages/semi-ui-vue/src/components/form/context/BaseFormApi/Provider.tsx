import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {BaseFormApi} from "@douyinfe/semi-foundation/form/interface";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:BaseFormApi}>((props, {slots}) => {
  const ConfigContext = ref<BaseFormApi>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true})
  provide('BaseFormApiContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

Provider.props = vuePropsType

export default Provider

