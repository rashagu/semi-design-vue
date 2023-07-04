import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {DropdownContextType} from "../context";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:DropdownContextType}>((props, {slots}) => {
  const ConfigContext = ref<DropdownContextType>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  })
  provide('DropdownContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: vuePropsType,
  name: 'DropdownProvider'
})



export default Provider

