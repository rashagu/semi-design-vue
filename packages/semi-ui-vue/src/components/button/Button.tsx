import { defineComponent, ref, h, StyleValue, ComponentObjectPropsOptions, PropType, AriaAttributes } from 'vue';
/* eslint-disable react/destructuring-assignment */
import classNames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/button/constants';
import '@douyinfe/semi-foundation/button/button.scss';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import cls from 'classnames';

const btnSizes = typeof strings.sizes;
const { htmlTypes, btnTypes } = strings;

export type HtmlType = 'button' | 'reset' | 'submit';
export type Size = 'default' | 'small' | 'large';
export type Theme = 'solid' | 'borderless' | 'light' | 'outline';
export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';

export interface ButtonProps {
  id?: string;
  block?: boolean;
  circle?: boolean;
  disabled?: boolean;
  className?: string;
  htmlType?: 'button' | 'reset' | 'submit';
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
  autoFocus?: boolean;
  role?: string;
  'aria-label'?: AriaAttributes['aria-label'];
  contentClassName?: string;
}

export const vuePropsType: ComponentObjectPropsOptions<ButtonProps> = {
  id: String,
  circle: Boolean,
  className: String,
  icon: [Object, String],
  iconPosition: String as PropType<ButtonProps['iconPosition']>,
  loading: Boolean,
  block: {
    type: Boolean,
    default: false,
  },
  htmlType: {
    type: String as PropType<ButtonProps['htmlType']>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ButtonProps['size']>,
    default: 'default',
  },
  style: Object,
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: 'primary',
  },
  theme: {
    type: String as PropType<ButtonProps['theme']>,
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
  autoFocus: {
    type: Boolean,
    default: undefined,
  },
  role: String,
  'aria-label': String,
  contentClassName: String,
};
const Button = defineComponent({
  props: vuePropsType,
  name: 'Button',
  setup(props, { slots }) {
    return () => {
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
        type: htmlType,
        ...attr,
        class: classNames(
          prefixCls,
          {
            [`${prefixCls}-${type}`]: !props.disabled && type,
            [`${prefixCls}-disabled`]: props.disabled,
            [`${prefixCls}-size-large`]: size === 'large',
            [`${prefixCls}-size-small`]: size === 'small',
            // [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-light`]: theme === 'light',
            [`${prefixCls}-block`]: block,
            [`${prefixCls}-circle`]: circle,
            [`${prefixCls}-borderless`]: theme === 'borderless',
            [`${prefixCls}-outline`]: theme === 'outline',
            [`${prefixCls}-${type}-disabled`]: disabled && type,
          },
          className
        ),
      };
      return (
        <button {...baseProps} onClick={props.onClick} onMousedown={props.onMouseDown} style={style}>
          <span
            class={cls(`${prefixCls}-content`, props.contentClassName)}
            onClick={(e) => props.disabled && e.stopPropagation()}
          >
            {slots.default ? slots.default() : null}
          </span>
        </button>
      );
    };
  },
});

export default Button;
