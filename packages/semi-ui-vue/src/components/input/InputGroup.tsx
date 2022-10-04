import { defineComponent, ref, h, cloneVNode, VNode } from 'vue';

import * as PropTypes from '../PropTypes';
import cls from 'classnames';

import { cssClasses, strings } from '@douyinfe/semi-foundation/input/constants';
import Label, { LabelProps } from '../form/Label';

import { noop } from '@douyinfe/semi-foundation/utils/function';
import { get, isFunction } from 'lodash';

const prefixCls = cssClasses.PREFIX;
const sizeSet = strings.SIZE;

export type InputSize = 'small' | 'large' | 'default';

export interface InputGroupProps {
  className?: string;
  size?: InputSize;
  style?: Record<string, any>;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  label?: LabelProps;
  labelPosition?: string;
  disabled?: boolean;
}

// eslint-disable-next-line
export interface InputGroupState {}

export const VuePropsType = {
  className: { type: String, default: '' },
  size: { type: String, default: 'default' },
  style: [String, Object],
  onBlur: {
    type: Function,
    default: noop,
  },
  onFocus: {
    type: Function,
    default: noop,
  },
  label: Object,
  labelPosition: String,
  disabled: Boolean,
};
// eslint-disable-next-line
export interface InputGroupState {}

const InputGroup = defineComponent<InputGroupProps>((props, { slots }) => {
  function renderGroupWithLabel(inner: VNode[]) {
    // eslint-disable-next-line no-unused-vars
    const { size, className, label, labelPosition, ...rest } = props;
    const groupWrapperCls = cls({
      [`${prefixCls}-group-wrapper`]: true,
      [`${prefixCls}-group-wrapper-with-top-label`]: labelPosition === 'top',
      [`${prefixCls}-group-wrapper-with-left-label`]: labelPosition === 'left',
    });
    const groupCls = cls(`${prefixCls}-group`, className, {
      [`${prefixCls}-${size}`]: size !== 'default',
    });
    // const labelCls = cls(label.className, '');
    const defaultName = 'input-group';
    return (
      <div class={groupWrapperCls}>
        {label && label.text ? <Label name={defaultName} {...label} /> : null}
        <span
          role="group"
          aria-disabled={props.disabled}
          id={(label && label.name) || defaultName}
          class={groupCls}
          style={props.style}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        >
          {inner}
        </span>
      </div>
    );
  }
  return () => {
    const { size, style, className, label, onBlur: groupOnBlur, onFocus: groupOnFocus, disabled: groupDisabled, ...rest } = props;
    const children = slots.default ? slots.default() : null;
    const groupCls = cls(
      `${prefixCls}-group`,
      {
        [`${prefixCls}-${size}`]: size !== 'default',
      },
      className
    );
    let inner;
    if (children) {
      inner = (Array.isArray(children) ? children : [children]).map((item, index) => {
        if (item) {
          const { onBlur: itemOnBlur, onFocus: itemOnFocus, disabled: itemDisabled } = (item as any).props;
          const onBlur = isFunction(itemOnBlur) && get(itemOnBlur, 'name') !== 'noop' ? itemOnBlur : groupOnBlur;
          const onFocus = isFunction(itemOnFocus) && get(itemOnFocus, 'name') !== 'noop' ? itemOnFocus : groupOnFocus;
          const disabled = typeof itemDisabled === 'boolean' ? itemDisabled : groupDisabled;
          return cloneVNode(item as any, { key: index, ...rest, size, onBlur, onFocus, disabled });
        }
        return null;
      });
    }

    if (label && label.text) {
      return renderGroupWithLabel(inner);
    }

    return (
      <span
        role="group"
        aria-label="Input group"
        aria-disabled={props.disabled}
        class={groupCls}
        style={style}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      >
        {inner}
      </span>
    );
  };
});

InputGroup.props = VuePropsType;

export default InputGroup;
