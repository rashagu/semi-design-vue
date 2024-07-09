import { defineComponent, ref, h, StyleValue, isVNode, Fragment, PropType, ComponentObjectPropsOptions } from 'vue';
import classNames from 'classnames';
import * as PropTypes from '../PropTypes';

import { cssClasses, strings } from '@douyinfe/semi-foundation/button/constants';
import { strings as iconStrings } from '@douyinfe/semi-foundation/icons/constants';
import Button, { Theme, ButtonProps, Size, Type } from '../button/Button';
import { vuePropsType as buttonVuePropsType } from '../button/Button';
import SpinIcon from '../spin/icon';
import { noop } from 'lodash';
import '@douyinfe/semi-foundation/button/iconButton.scss';
import { getFragmentChildren } from '../_utils';
import { vuePropsMake } from '../PropTypes';
import { useHasInProps } from '../_base/baseComponent';

const iconSizes = iconStrings.SIZE;

export type HorizontalPaddingType = 'left' | 'right';

export interface IconButtonProps extends ButtonProps {
  icon?: any;
  iconPosition?: 'left' | 'right';
  iconSize?: any;
  iconStyle?: StyleValue;
  loading?: boolean;
  theme?: Theme;
  style?: StyleValue;
  className?: string;
  class?: string;
  disabled?: boolean;
  noHorizontalPadding?: boolean | HorizontalPaddingType | HorizontalPaddingType[];
  prefixCls?: string;
  autoFocus?: boolean;
  contentClassName?: string;
}
const propsType: ComponentObjectPropsOptions<Required<IconButtonProps>> = {
  ...buttonVuePropsType,
  iconStyle: PropTypes.object,
  style: PropTypes.object,
  loading: PropTypes.bool,
  prefixCls: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
  iconSize: PropTypes.string,
  noHorizontalPadding: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.array]),
  theme: PropTypes.string as PropType<IconButtonProps['theme']>,
  iconPosition: PropTypes.string as PropType<IconButtonProps['iconPosition']>,
  className: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  class: String,
  role: String,
  contentClassName: String,
}
const vuePropsType = vuePropsMake<IconButtonProps>(
  propsType,
  {
    iconPosition: strings.DEFAULT_ICON_POSITION,
    prefixCls: cssClasses.PREFIX,
    loading: false,
    noHorizontalPadding: false, //  true same as ['left', 'right']
    onMouseEnter: noop,
    onMouseLeave: noop,
  }
);

// TODO: add a buttonGroup component
// TODO: icon configuration
const Index = defineComponent({
  props: vuePropsType,
  name: 'IconButton',
  setup(props, { slots }) {
    const { getProps } = useHasInProps();

    return () => {
      const {
        iconPosition,
        iconSize,
        iconStyle,
        style: originStyle,
        icon,
        noHorizontalPadding,
        theme,
        className,
        prefixCls,
        loading,
        ...otherProps
      } = getProps(props);

      const style: any = originStyle;
      // TODO: review check
      if (Array.isArray(noHorizontalPadding)) {
        noHorizontalPadding.includes('left') && (style.paddingLeft = 0);
        noHorizontalPadding.includes('right') && (style.paddingRight = 0);
      } else if (noHorizontalPadding === true) {
        style.paddingLeft = 0;
        style.paddingRight = 0;
      }

      let finalChildren = null;

      const btnTextCls = classNames({
        [`${prefixCls}-content-left`]: iconPosition === 'right',
        [`${prefixCls}-content-right`]: iconPosition === 'left',
      });

      return (
        <Button
          {...otherProps}
          className={classNames(className, `${prefixCls}-with-icon`, {
            [`${prefixCls}-with-icon-only`]: !slots.default || !slots.default(),
            [`${prefixCls}-loading`]: loading,
          })}
          theme={theme}
          style={style}
        >
          {{
            default: () => {
              let IconElem = (): any => null;

              if (loading && !otherProps.disabled) {
                IconElem = () => <SpinIcon />;
              } else if (isVNode(icon)) {
                IconElem = () => icon;
              } else if (typeof icon.setup === 'function') {
                IconElem = () => <icon />;
              }
              const children = () =>
                getFragmentChildren(slots) ? (
                  <span class={IconElem() ? btnTextCls : ''}>{slots.default ? slots.default() : null}</span>
                ) : null;
              if (iconPosition === 'left') {
                return (
                  <>
                    {IconElem()}
                    {children ? children() : null}
                  </>
                );
              } else {
                return (
                  <>
                    {children ? children() : null}
                    {IconElem()}
                  </>
                );
              }
            },
          }}
        </Button>
      );
    };
  },
});

export const VuePropsType = {
  icon: [Object, String],
  iconPosition: {
    type: String,
    default: strings.DEFAULT_ICON_POSITION,
  },
  iconSize: String,
  iconStyle: Object,
  loading: {
    type: Boolean,
    default: false,
  },
  theme: String,
  style: {
    type: Object,
    default: {},
  },
  className: String,
  disabled: Boolean,
  noHorizontalPadding: {
    type: [Boolean, String, Array],
    default: false, //  true same as ['left', 'right']
  },
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX,
  },
  onMouseEnter: Function,
  onMouseLeave: Function,

  id: String,
  block: Boolean,
  circle: Boolean,
  htmlType: String,
  size: String,
  type: String,
  // 否则会出现重复执行的情况
  onClick: Function,
  onMouseDown: Function,
  autoFocus: Function,
};

export default Index;
