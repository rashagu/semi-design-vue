import {defineComponent, ref, h, Fragment, useSlots, provide} from 'vue'
import {  BasicCheckboxEvent } from '@douyinfe/semi-foundation/checkbox/checkboxFoundation';
export type CheckboxContext = {
  checkboxGroup?: {
    onChange: (evt: BasicCheckboxEvent) => void;
    value: any[];
    disabled: boolean;
    name: any;
    isCardType: boolean;
    isPureCardType: boolean;
  };
};


const CheckboxContextProvider = defineComponent<{value:any}>((props, {}) => {
  const slots = useSlots()
  const ConfigContext = ref<CheckboxContext>(null);
  // console.log(ConfigContext.value)
  provide('CheckboxContext', ConfigContext)
  return ()=>slots.default?slots.default(ConfigContext.value):null
})

CheckboxContextProvider.props = {
  value:{
    type: Object,
    default: null
  }
}

export default CheckboxContextProvider
const Context = {};
export { Context };
