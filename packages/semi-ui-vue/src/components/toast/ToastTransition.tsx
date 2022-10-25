import {Transition} from '../../../../semi-animation-vue/src/animation/index';
import {Motion} from '../_base/base';
import {VueJsxNode} from "../interface";
import {defineComponent, h, useSlots, VNode, watch} from "vue";


export interface ToastTransitionProps {
  motion?: Motion<ToastTransitionProps>;
  children: VNode | ((TransitionProps: any) => any) | VNode[]
}

export const vuePropsType = {
  motion: [String, Object, Boolean],
  children: [Object, Function]
}
const ToastTransition = defineComponent<ToastTransitionProps>((props, {}) => {
  const slots = useSlots()
  let children

  return () => {

    let {motion = {}} = props;

    if (typeof motion === 'function') {
      motion = motion(props);
    } else if (!motion || typeof motion !== 'object') {
      motion = {};
    }
    // TODO 缓存 children函数 用于退出动画
    if (!children) {
      children = props.children
    }
    return (
      <Transition
        // onFrame={style => console.log(style)}
        from={{translateY: -100, opacity: 0}}
        enter={{translateY: {val: 0, tension: 560, friction: 32}, opacity: {val: 1, duration: 300}} as any}
        leave={{
          translateY: {val: -100, easing: 'easeOutCubic', duration: 300},
          opacity: {val: 0, duration: 200},
        } as any}
        children={typeof props.children === 'function' ?
          ({translateY, opacity}: { translateY: string | number; opacity: string | number }) => {
            let children_
            if (props.children === null) {
              children_ = children
            } else {
              children_ = props.children
            }
            return children_({
              transform: `translateY(${translateY}%)`,
              opacity,
            })
          } :
          props.children}
        {...motion}
      >
      </Transition>
    )
  }
})

ToastTransition.props = vuePropsType
ToastTransition.name = 'ToastTransition'

export default ToastTransition


