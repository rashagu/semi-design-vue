import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {NavContextType} from "../nav-context";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = ref<NavContextType>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { deep: true})
  provide('NavContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: { ...vuePropsType },
  name: 'NavContextProvider'
})



export default Provider

