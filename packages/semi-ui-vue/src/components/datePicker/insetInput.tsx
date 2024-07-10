import { defineComponent, ref, h, Fragment, useSlots, type ComponentObjectPropsOptions, type PropType } from 'vue';

import { get } from 'lodash';

import {
  InsetInputValue,
  Type,
  InsetInputChangeFoundationProps,
} from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import Input, { InputProps } from '../input';
import { CombineProps } from '../interface';

export interface InsetDateInputProps {
  forwardRef: InputProps['forwardRef'];
  insetInputValue: InsetInputValue;
  placeholder: string;
  valuePath: string;
  onChange: (options: InsetInputChangeFoundationProps) => void;
  onFocus: InputProps['onFocus'];
}

export const vuePropsTypeInsetDateInput: CombineProps<InsetDateInputProps> = {
  forwardRef: {
    type: [Function, Object],
    required: true,
  },
  insetInputValue: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  valuePath: {
    type: String,
    required: true
  },
  onChange: {
    type: Function as PropType<InsetDateInputProps['onChange']>,
    required: true
  },
  onFocus: {
    type: Function as PropType<InsetDateInputProps['onFocus']>,
    required: true
  },
};
const InsetDateInput = defineComponent({
  props: vuePropsTypeInsetDateInput,
  name: 'InsetDateInput',
  setup(props, {}) {
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
    );
  },
});

export interface InsetTimeInputProps {
  disabled: boolean;
  insetInputValue: InsetInputValue;
  placeholder: string;
  valuePath: string;
  type: Type;
  onChange: (options: InsetInputChangeFoundationProps) => void;
  onFocus: InputProps['onFocus'];
}

export const vuePropsTypeInsetTimeInput: CombineProps<InsetTimeInputProps> = {
  disabled: {
    type: Boolean,
    required: true
  },
  insetInputValue: {
    type: Object,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  valuePath: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<InsetTimeInputProps['type']>,
    required: true
  },
  onChange: {
    type: Function as PropType<InsetTimeInputProps['onChange']>,
    required: true
  },
  onFocus: {
    type: Function as PropType<InsetTimeInputProps['onFocus']>,
    required: true
  },
};
const InsetTimeInput = defineComponent(
  (props, {}) => {
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
  },
  {
    props: vuePropsTypeInsetTimeInput,
    name: 'InsetTimeInput',
  }
);

export { InsetDateInput, InsetTimeInput };
