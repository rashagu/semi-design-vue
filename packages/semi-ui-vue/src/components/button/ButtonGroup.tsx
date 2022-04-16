import {defineComponent, ref, h, cloneVNode, isVNode, RendererNode, RendererElement, VNode, } from 'vue'
import {BaseProps} from '../_base/BaseComponent';

import {cssClasses, strings} from '@douyinfe/semi-foundation/button/constants';
import {Type, Size} from './Button';
import {noop} from "@douyinfe/semi-foundation/utils/function";


export type Theme = 'solid' | 'borderless' | 'light';

export interface ButtonGroupProps extends BaseProps {
  disabled?: boolean;
  type?: Type;
  size?: Size;
  theme?: Theme;
}

const prefixCls = cssClasses.PREFIX;
const btnSizes = strings.sizes;


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

})

export const vuePropsType = {
  size: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
    default: 'primary',
  },
  theme: {
    type: String,
    default: 'light',
  },
}

ButtonGroup.props = vuePropsType

export default ButtonGroup
