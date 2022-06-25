import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

import { get } from 'lodash';

import {
  InsetInputValue,
  Type,
  InsetInputChangeFoundationProps,
} from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import Input, { InputProps } from '../input';


export interface InsetDateInputProps {
  forwardRef: InputProps['forwardRef'];
  insetInputValue: InsetInputValue;
  placeholder: string;
  valuePath: string;
  onChange: (options: InsetInputChangeFoundationProps) => void;
  onFocus: InputProps['onFocus'];

}




export const vuePropsTypeInsetDateInput = {
  forwardRef: [Function, Object],
  insetInputValue: Object,
  placeholder: String,
  valuePath: String,
  onChange: Function,
  onFocus: Function
}
const InsetDateInput = defineComponent<InsetDateInputProps>((props, {}) => {
  const { insetInputValue, valuePath, onFocus, onChange, placeholder, forwardRef } = props;
  const value = get(insetInputValue, valuePath);

  return () => (
    <Input
      value={value}
      onChange={(value, event) => {
        onChange({
          value,
          event,
          insetInputValue,
          valuePath,
        });
      }}
      onFocus={onFocus}
      placeholder={placeholder}
      ref={forwardRef}
    />
  )
})

InsetDateInput.props = vuePropsTypeInsetDateInput



export interface InsetTimeInputProps {
  disabled: boolean;
  insetInputValue: InsetInputValue;
  placeholder: string;
  valuePath: string;
  type: Type;
  onChange: (options: InsetInputChangeFoundationProps) => void;
  onFocus: InputProps['onFocus'];
}
export const vuePropsTypeInsetTimeInput = {
  disabled: Boolean,
  insetInputValue: Object,
  placeholder: String,
  valuePath: String,
  type: String,
  onChange: Function,
  onFocus: Function
}
const InsetTimeInput = defineComponent<InsetTimeInputProps>((props, {}) => {
  const { insetInputValue, valuePath, type, onFocus, onChange, placeholder, disabled } = props;
  const _isTimeType = type.includes('Time');
  if (!_isTimeType) {
    return null;
  }
  const value = get(insetInputValue, valuePath);

  return () => (
    <Input
      value={value}
      onChange={(value, event) => {
        onChange({
          value,
          event,
          insetInputValue,
          valuePath,
        });
      }}
      onFocus={onFocus}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
})

InsetTimeInput.props = vuePropsTypeInsetTimeInput



export {
  InsetDateInput,
  InsetTimeInput
}

