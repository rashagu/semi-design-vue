import {defineComponent, ref, h, Fragment, provide, watch, shallowRef} from 'vue'
import {FormUpdaterContextType} from "@douyinfe/semi-foundation/form/interface";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = shallowRef<FormUpdaterContextType>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { immediate: true, deep: true})
  provide('FormUpdaterContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: { ...vuePropsType },
  name: 'FormUpdaterContextProvider'
})


export default Provider

