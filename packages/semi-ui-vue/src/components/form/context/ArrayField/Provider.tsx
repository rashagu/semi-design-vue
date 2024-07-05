import {defineComponent, ref, h, Fragment, provide, watch, shallowRef} from 'vue'
export type ArrayFieldType = {
  shouldUseInitValue: boolean,
}

export const vuePropsType = {
  value: Object
}
const Provider = defineComponent((props, {slots}) => {
  const ConfigContext = shallowRef<ArrayFieldType>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { immediate: true, deep: true})
  provide('ArrayFieldContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
}, {
  props: vuePropsType,
  name: 'ArrayFieldContextProvider'
})


export default Provider

