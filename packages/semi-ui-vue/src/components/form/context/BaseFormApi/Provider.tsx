import {defineComponent, ref, h, Fragment, provide, watch, shallowRef} from 'vue'
import type {BaseFormApi} from "@douyinfe/semi-foundation/form/interface";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = shallowRef<BaseFormApi>();

  provide('BaseFormApiContext', ConfigContext)
  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { immediate: true, deep: true})
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: vuePropsType,
  name: 'FormApiContextProvider'
})


export default Provider

