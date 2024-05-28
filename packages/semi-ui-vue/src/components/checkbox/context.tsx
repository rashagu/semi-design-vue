import {  BasicCheckboxEvent } from '@douyinfe/semi-foundation/checkbox/checkboxFoundation';
import Provider from "./context/Provider";
import Consumer from "./context/Consumer";
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


const Context = {
  Provider,
  Consumer
};
export { Context };
