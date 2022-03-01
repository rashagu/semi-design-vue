import {defineComponent, ref, h, StyleValue} from 'vue'
/* eslint-disable react/destructuring-assignment */
import classNames from 'classnames';
import {cssClasses, strings} from '@douyinfe/semi-foundation/button/constants';
import '@douyinfe/semi-foundation/button/button.scss';
import {noop} from '@douyinfe/semi-foundation/utils/function';

const btnSizes = typeof strings.sizes;
const {htmlTypes, btnTypes} = strings;

export type HtmlType = 'button' | 'reset' | 'submit';
export type Size = 'default' | 'small' | 'large';
export type Theme = 'solid' | 'borderless' | 'light';
export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';


export interface ButtonProps {
  id?: string;
  block?: boolean;
  circle?: boolean;
  disabled?: boolean;
  className?: string;
  htmlType?: "button" | "reset" | "submit",
  icon?: any;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  size?: Size;
  style?: StyleValue;
  theme?: Theme;
  type?: Type;
  prefixCls?: string;
  onClick?: any;
  onMouseDown?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
}


const Button = defineComponent<ButtonProps>((props, {slots}) => {

  const {
    block,
    loading,
    circle,
    className,
    style,
    disabled,
    size,
    theme,
    type,
    prefixCls,
    iconPosition,
    htmlType,
    ...attr
  } = props;

  const baseProps = {
    disabled,
    type: htmlType,
    ...attr,
    className: classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: !disabled && type,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-size-large`]: size === 'large',
        [`${prefixCls}-size-small`]: size === 'small',
        // [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-light`]: theme === 'light',
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-circle`]: circle,
        [`${prefixCls}-borderless`]: theme === 'borderless',
      },
      className
    ),
  };

  // console.log(baseProps)
  return () => (
    <button
      {...baseProps}
      onClick={props.onClick}
      onMousedown={props.onMouseDown}
      style={style}
    >
      <span class={`${prefixCls}-content`}
           onClick={e => disabled && e.stopPropagation()}>
                    {slots.default ? slots.default() : null}
          </span>
    </button>
  );
})

export const vuePropsType = {
  id: String,
  circle: Boolean,
  className: String,
  icon: [Object, String],
  iconPosition: String,
  loading: Boolean,
  block: {
    type: Boolean,
    default: false
  },
  htmlType: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'default',
  },
  style: Object,
  type: {
    type: String,
    default: 'primary',
  },
  theme: {
    type: String,
    default: 'light',
  },
  onClick: {
    type: Function,
    default: noop,
  },
  onMouseDown: {
    type: Function,
    default: noop,
  },
  onMouseEnter: {
    type: Function,
    default: noop,
  },
  onMouseLeave: {
    type: Function,
    default: noop,
  },
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX,
  },
}

Button.props = vuePropsType

export default Button
