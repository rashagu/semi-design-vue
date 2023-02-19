import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
export type ArrayFieldType = {
  shouldUseInitValue: boolean,
}

export const vuePropsType = {
  value: Object
}
const Provider = defineComponent<{value:ArrayFieldType}>((props, {slots}) => {
  const ConfigContext = ref<ArrayFieldType>();

  watch(()=>props.value, ()=>{
    ConfigContext.value = props.value
  }, { immediate: true, deep: true})
  provide('ArrayFieldContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

Provider.props = vuePropsType

export default Provider

