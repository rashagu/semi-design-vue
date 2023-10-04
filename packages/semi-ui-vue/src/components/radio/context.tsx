import {defineComponent, ref, h, Fragment, provide, watch} from 'vue'
// import { RadioChangeEvent as RadioChangeEvent_ } from '@douyinfe/semi-foundation/radio/radioInnerFoundation';
import { strings } from '@douyinfe/semi-foundation/radio/constants';
import { ArrayElement } from '../_base/base';
import {Locale} from "../locale/interface";

export type RadioGroupButtonSize = ArrayElement<typeof strings.BUTTON_SIZE>;
export type RadioMode = ArrayElement<typeof strings.MODE>;
export interface RadioContextValue {
  mode?: RadioMode;
  radioGroup?: {
    value?: string | number;
    isButtonRadio?: any;
    disabled?: boolean;
    prefixCls?: string;
    name?: string;
    onChange?: (e: any) => void;
    buttonSize?: RadioGroupButtonSize;
    isCardRadio?: boolean;
    isPureCardRadio?: boolean;
  };
}

export const vuePropsType = {
  value: Object,
}
const RadioContext = defineComponent<{value:any}>((props, {slots}) => {
  const ConfigContext = ref<RadioContextValue>(props.value);
  watch(()=>JSON.parse(JSON.stringify(props.value)), value =>{
    // console.log('value 更新', props.value)
    ConfigContext.value = props.value
  })
  // // console.log(props, ConfigContext.value)
  provide('RadioContextValue', ConfigContext)
  return ()=>slots.default?slots.default():null
}, {
  props: vuePropsType,
  name: 'RadioContext'
})


export default RadioContext

