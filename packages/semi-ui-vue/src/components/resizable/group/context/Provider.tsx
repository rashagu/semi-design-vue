import { defineComponent, ref, h, Fragment, provide, watch, Ref } from 'vue';
import { ResizeContextProps } from '../resizeContext';


export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = ref<ResizeContextProps>(props.value);

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  })
  provide('semi_ResizeContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: { ...vuePropsType },
  name: 'ResizeContextProvider'
})


export default Provider

