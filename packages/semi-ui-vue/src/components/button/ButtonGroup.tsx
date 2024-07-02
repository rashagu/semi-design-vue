import {
  defineComponent,
  ref,
  h,
  cloneVNode,
  isVNode,
  RendererNode,
  RendererElement,
  VNode,
  ComponentObjectPropsOptions, PropType,
} from 'vue'
import {BaseProps} from '../_base/baseComponent';

import {cssClasses, strings} from '@douyinfe/semi-foundation/button/constants';
import {Type, Size} from './Button';


export type Theme = 'solid' | 'borderless' | 'light';

export interface ButtonGroupProps extends BaseProps {
  disabled?: boolean;
  type?: Type;
  size?: Size;
  theme?: Theme;
}

const prefixCls = cssClasses.PREFIX;
const btnSizes = strings.sizes;


export const vuePropsType:ComponentObjectPropsOptions<ButtonGroupProps> = {
  disabled: Boolean,
  size: {
    type: String as PropType<ButtonGroupProps['size']>,
    default: 'default'
  },
  type: {
    type: String as PropType<ButtonGroupProps['type']>,
    default: 'primary',
  },
  theme: {
    type: String as PropType<ButtonGroupProps['theme']>,
    default: 'light',
  },
}
const ButtonGroup = defineComponent<ButtonGroupProps>((props, {slots}) => {

  // rest 剩下的
  const { disabled, size, type, ...rest } = props;





  return ()=> <div class={`${prefixCls}-group`}>{
    slots.default? slots.default().map((itm, index) => (
      isVNode(itm)
        ? cloneVNode(itm, { disabled, size, type, ...itm.props, ...rest, key: index })
        : itm
    )):null
  }</div>;

}, {
  props: vuePropsType,
  name: 'ButtonGroup'
})



export default ButtonGroup
