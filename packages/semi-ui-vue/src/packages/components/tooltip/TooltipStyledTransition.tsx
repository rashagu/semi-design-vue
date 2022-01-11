import {defineComponent, ref, h, onActivated, Fragment} from 'vue'
import { cssClasses } from '@douyinfe/semi-foundation/tooltip/constants';
import getMotionObjFromProps from '@douyinfe/semi-foundation/utils/getMotionObjFromProps';
import { Motion } from '../_base/base';
import { StyledTransition } from '@kousum/semi-animation-vue';

const enterCls = `${cssClasses.PREFIX}-bounceIn`;
const leaveCls = `${cssClasses.PREFIX}-zoomOut`;

export interface TooltipTransitionProps {
  position:string,
  willEnter:any,
  didLeave:any,
  didEnter:any,
  state:any,
  transitionState: string,

  [key: string]: any;
  children?: (arg: any) => any;
  motion?: Motion<TooltipTransitionProps>;
}

export const vuePropsType = {
  className: String,
  transitionState: String,
  name: String,
  position: String,
  willEnter: Function,
  didEnter: Function,
  didLeave: Function,
  motion: [Boolean],
}
const TooltipStyledTransition = defineComponent<TooltipTransitionProps>((props, {slots}) => {

  const motion = getMotionObjFromProps(props);

  return ()=>{
    return (
      <StyledTransition {...props} enter={enterCls} leave={leaveCls} duration={'100ms'} {...motion}>
        {{
          default: slots.default?(p:{ animateCls:any, animateEvents:any, animateStyle:any }) => {
            if (p){
              const { animateCls, animateEvents, animateStyle } = p
              return slots.default({ animateCls, animateEvents, animateStyle })
            }else{
              return  null
            }
          }:null
        }}
      </StyledTransition>
    )
  };
})

TooltipStyledTransition.props = vuePropsType

export default TooltipStyledTransition

