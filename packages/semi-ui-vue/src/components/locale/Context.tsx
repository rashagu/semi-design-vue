import {Locale} from './interface';
import {defineComponent, provide, ref} from "vue";

const LocaleContext: Locale = null;
export const LocaleContextVNode_ = defineComponent<{value:any}>((props, {slots}) => {
  const ConfigContext = ref<Locale>(null);
  // console.log(ConfigContext.value)
  provide('ConfigContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})
LocaleContextVNode_.props = {
  value:{
    type: Object,
    default: null
  }
}
export const LocaleContextVNode = LocaleContextVNode_
export default LocaleContext;
