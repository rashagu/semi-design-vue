
import { Locale } from '../locale/interface';
import {defineComponent, provide, ref, watch} from "vue";

export interface ContextValue {
    direction?: 'ltr' | 'rtl';
    timeZone?: string | number;
    locale?: Locale;
    children?: JSX.Element;
    getPopupContainer?(): HTMLElement;
    level?:number
}

const ConfigContextVNode_ = defineComponent<{value:any}>((props, {slots}) => {
    const ConfigContext = ref<ContextValue>(props.value || {});

    watch(()=>props.value, ()=>{
        ConfigContext.value = props.value
    })
    provide('ConfigContext', ConfigContext)
    return ()=>slots.default?slots.default(ConfigContext.value):null
})
ConfigContextVNode_.props = {
    value:Object
}
export const ConfigContextVNode = ConfigContextVNode_
export default ConfigContextVNode_;
