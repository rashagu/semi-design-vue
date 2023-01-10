import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {TableContextProps} from "../table-context";



export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:TableContextProps}>((props, {slots}) => {
  const ConfigContext = ref<TableContextProps>(props.value);

  watch(()=>props.value, ()=>{
    // @ts-ignore
    ConfigContext.value = props.value
  }, { deep: true})
  provide('TableContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

Provider.props = vuePropsType
Provider.name = 'TableContextProvider'

export default Provider

