import {defineComponent, ref, h, Fragment, useSlots, ComponentObjectPropsOptions, PropType} from 'vue'

import {get} from 'lodash';

import {
  InsetInputValue,
  Type,
  InsetInputChangeFoundationProps,
} from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import Input, {InputProps} from '../input';
import Footer from "./footer";


export interface InsetDateInputProps {
  forwardRef: InputProps['forwardRef'];
  insetInputValue: InsetInputValue;
  placeholder: string;
  valuePath: string;
  onChange: (options: InsetInputChangeFoundationProps) => void;
  onFocus: InputProps['onFocus'];

}


export const vuePropsTypeInsetDateInput: ComponentObjectPropsOptions<InsetDateInputProps> = {
  forwardRef: [Function, Object],
  insetInputValue: Object,
  placeholder: String,
  valuePath: String,
  onChange: Function as PropType<InsetDateInputProps['onChange']>,
  onFocus: Function as PropType<InsetDateInputProps['onFocus']>,
}
const InsetDateInput = defineComponent<InsetDateInputProps>((props, {}) => {
  const {insetInputValue, valuePath, onFocus, onChange, placeholder, forwardRef} = props;
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
}, {
  props: vuePropsTypeInsetDateInput,
  name: 'InsetDateInput'
})


export interface InsetTimeInputProps {
  disabled: boolean;
  insetInputValue: InsetInputValue;
  placeholder: string;
  valuePath: string;
  type: Type;
  onChange: (options: InsetInputChangeFoundationProps) => void;
  onFocus: InputProps['onFocus'];
}

export const vuePropsTypeInsetTimeInput: ComponentObjectPropsOptions<InsetTimeInputProps> = {
  disabled: Boolean,
  insetInputValue: Object,
  placeholder: String,
  valuePath: String,
  type: String as PropType<InsetTimeInputProps['type']>,
  onChange: Function as PropType<InsetTimeInputProps['onChange']>,
  onFocus: Function as PropType<InsetTimeInputProps['onFocus']>,
}
const InsetTimeInput = defineComponent<InsetTimeInputProps>((props, {}) => {
  const {insetInputValue, valuePath, type, onFocus, onChange, placeholder, disabled} = props;
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
}, {
  props: vuePropsTypeInsetTimeInput,
  name: "InsetTimeInput"
})


export {
  InsetDateInput,
  InsetTimeInput
}

