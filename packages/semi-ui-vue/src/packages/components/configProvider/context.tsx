
import { Locale } from '../locale/interface';
import {defineComponent, provide} from "vue";

export interface ContextValue {
    direction?: 'ltr' | 'rtl';
    timeZone?: string | number;
    locale?: Locale;
    children?: JSX.Element;
    getPopupContainer?(): HTMLElement;
    level?:number
}

const ConfigContext:ContextValue = {};
const ConfigContextVNode_ = defineComponent<{value:any}>((props, {slots}) => {
    provide('ConfigContext', props.value || null)
    return slots.default()
})
ConfigContextVNode_.props = {
    value:Object
}
export const ConfigContextVNode = ConfigContextVNode_
export default ConfigContext;
