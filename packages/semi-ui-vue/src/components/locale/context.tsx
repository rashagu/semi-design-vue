import {Locale} from './interface';
import {defineComponent, provide} from "vue";

const LocaleContext: Locale = null;
export const LocaleContextVNode_ = defineComponent<{value:any}>((props, {slots}) => {
  provide('LocaleContext', props.value)
  return slots.default()
})
LocaleContextVNode_.props = {
  value:{
    type: Object,
    default: null
  }
}
export const LocaleContextVNode = LocaleContextVNode_
export default LocaleContext;