import { cloneVNode, CSSProperties, defineComponent, h, isVNode, PropType, VNode } from 'vue';
import { BaseProps } from '../_base/baseComponent';
import { get } from 'lodash';
import { cssClasses, strings } from '@douyinfe/semi-foundation/button/constants';
import { Size, Type } from './Button';
import { CombineProps } from '../interface';
import { ButtonProps } from './index';
import classNames from 'classnames';

export type Theme = 'solid' | 'borderless' | 'light' | 'outline'

export interface ButtonGroupProps extends BaseProps {
  disabled?: boolean;
  type?: Type;
  size?: Size;
  theme?: Theme;
  'aria-label'?: string
}

const prefixCls = cssClasses.PREFIX;
const btnSizes = strings.sizes;

export const vuePropsType: CombineProps<ButtonGroupProps> = {
  disabled: Boolean,
  size: {
    type: String as PropType<ButtonGroupProps['size']>,
    default: 'default',
  },
  type: {
    type: String as PropType<ButtonGroupProps['type']>,
    default: 'primary',
  },
  theme: {
    type: String as PropType<ButtonGroupProps['theme']>,
    default: 'light',
  },
  'aria-label': String,
  style: Object as PropType<CSSProperties>,
  className: String
};
const ButtonGroup = defineComponent({
  props: { ...vuePropsType },
  name: 'ButtonGroup',
  setup(props, { slots }) {

    function getInnerWithLine(inner) {
      const innerWithLine: VNode[] = [];
      if (inner.length > 1) {
        inner.slice(0, -1).forEach((item, index) => {
          const isButtonType = get(item, 'type.elementType') === 'Button';
          const buttonProps = get(item, 'props') as ButtonProps;
          const { type, theme, disabled } = buttonProps ?? {};
          if (isButtonType && theme !== 'outline') {
            const lineCls = classNames(
              `${prefixCls}-group-line`,
              `${prefixCls}-group-line-${theme ?? 'light'}`,
              `${prefixCls}-group-line-${type ?? 'primary'}`,
              {
                [`${prefixCls}-group-line-disabled`]: disabled,
              }
            );
            innerWithLine.push(item, <span class={lineCls} key={`line-${index}`} />);
          } else {
            innerWithLine.push(item);
          }
        });
        innerWithLine.push(inner.slice(-1));
        return innerWithLine;
      } else {
        return inner;
      }
    }
    return () => {
      const children = slots.default?.()
      const { disabled, size, type, className, style, 'aria-label': ariaLabel, ...rest } = props;
      let inner: VNode[];
      let innerWithLine: VNode[] = [];
      const cls = classNames(`${prefixCls}-group`, className);

      if (children) {
        inner = ((Array.isArray(children) ? children : [children])).map((itm: VNode, index) => (
          isVNode(itm)
            ? cloneVNode(itm, { disabled, size, type, ...itm.props, ...rest, key: itm.key ?? index })
            : itm
        ));
        innerWithLine = getInnerWithLine(inner);
      }
      return <div class={cls} style={style} role="group" aria-label={ariaLabel}>{innerWithLine}</div>;
    };
  },
});

export default ButtonGroup;
