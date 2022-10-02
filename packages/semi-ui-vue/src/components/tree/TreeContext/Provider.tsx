import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {TreeContextValue} from "../treeContext";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:TreeContextValue}>((props, {slots}) => {
  const ConfigContext = ref<TreeContextValue>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  })
  provide('TreeContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

Provider.props = vuePropsType

export default Provider

