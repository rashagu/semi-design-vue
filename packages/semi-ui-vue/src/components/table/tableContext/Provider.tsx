import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {TableContextProps} from "../table-context";



export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:TableContextProps}>((props, {slots}) => {
  const ConfigContext = ref<TableContextProps>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true, immediate: true})
  provide('TableContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: vuePropsType,
  name: 'TableContextProvider'
})


export default Provider

