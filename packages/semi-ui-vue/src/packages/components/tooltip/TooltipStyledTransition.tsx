import {defineComponent, ref, h, onActivated, Fragment} from 'vue'
import { cssClasses } from '@douyinfe/semi-foundation/tooltip/constants';
import getMotionObjFromProps from '@douyinfe/semi-foundation/utils/getMotionObjFromProps';
import { Motion } from '../_base/base';
import { StyledTransition } from '@kousum/semi-animation-vue';

const enterCls = `${cssClasses.PREFIX}-bounceIn`;
const leaveCls = `${cssClasses.PREFIX}-zoomOut`;

export interface TooltipTransitionProps {
  [key: string]: any;
  children?: (arg: any) => any;
  motion?: Motion<TooltipTransitionProps>;
}

export const vuePropsType = {
  name: String
}
const TooltipStyledTransition = defineComponent<TooltipTransitionProps>((props, {slots}) => {
  const { children } = props;
  const motion = getMotionObjFromProps(props);

  return (
    <StyledTransition {...props} enter={enterCls} leave={leaveCls} duration={'100ms'} {...motion}>
      {typeof children === 'function' ?
        ({ animateCls, animateEvents, animateStyle }: any) => children({ animateCls, animateEvents, animateStyle }) :
        children}
    </StyledTransition>
  );
})

TooltipStyledTransition.props = vuePropsType

export default TooltipStyledTransition

