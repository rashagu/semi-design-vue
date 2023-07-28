import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {ListContextValue} from "../list-context";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:ListContextValue}>((props, {slots}) => {
  const ConfigContext = ref<ListContextValue>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true, immediate: true})
  provide('ListContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: vuePropsType,
  name: 'ListContextProvider'
})


export default Provider

