import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
import {PreviewContextProps} from "../previewContext";


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = ref<PreviewContextProps>(props.value);

  watch(()=>props.value, ()=>{
    // @ts-ignore
    ConfigContext.value = props.value
  }, { deep: true})
  provide('PreviewContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: vuePropsType,
  name: 'PreviewContextProvider'
})


export default Provider

