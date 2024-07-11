import {
  defineComponent,
  ref,
  h,
  cloneVNode,
  isVNode,
  RendererNode,
  RendererElement,
  VNode,
  ComponentObjectPropsOptions,
  PropType,
  CSSProperties
} from 'vue';
import { BaseProps } from '../_base/baseComponent';

import { cssClasses, strings } from '@douyinfe/semi-foundation/button/constants';
import { Type, Size } from './Button';
import { CombineProps } from '../interface';

export type Theme = 'solid' | 'borderless' | 'light';

export interface ButtonGroupProps extends BaseProps {
  disabled?: boolean;
  type?: Type;
  size?: Size;
  theme?: Theme;
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
  style: Object as PropType<CSSProperties>,
  className: String
};
const ButtonGroup = defineComponent({
  props: { ...vuePropsType },
  name: 'ButtonGroup',
  setup(props, { slots }) {
    return () => {
      // rest 剩下的
      const { disabled, size, type, ...rest } = props;
      return (
        <div class={`${prefixCls}-group` + ' ' + props.className} style={props.style}>
          {slots.default
            ? slots
                .default()
                .map((itm, index) =>
                  isVNode(itm) ? cloneVNode(itm, { disabled, size, type, ...itm.props, ...rest, key: index }) : itm
                )
            : null}
        </div>
      );
    };
  },
});

export default ButtonGroup;
