import {defineComponent, ref, h, onActivated, Fragment, StyleValue, isVNode, cloneVNode} from 'vue'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {types as styledTypes, loops, delays, speeds} from '@douyinfe/semi-animation-styled';
import noop from './utils/noop';
import invokeFns from './utils/invokeFns';

export interface StyledAnimationProps {
  className?: string;
  type?: any;
  style?: any;
  speed?: string | number;
  delay?: string | number;
  reverse?: boolean | string;
  loop?: string | number;
  onStart?: (value: any) => void;
  onFrame?: (value: any) => void;
  onRest?: (value: any) => void;
  prefixCls?: string;
  timing?: string;
  duration?: string | number;
  fillMode?: string;
  transitionState?: string,
}

const types: any = Object.values(styledTypes).reduce((arr, cur) => [...arr as any, ...cur as any], []);


export const vuePropsType = {
  state: [Object, String, Boolean, Function],
  willEnter: [Object, String, Boolean, Function],
  didEnter: [Object, String, Boolean, Function],
  willLeave: [Object, String, Boolean, Function],
  didLeave: [Object, String, Boolean, Function],
  from: [Object, String, Boolean, Function],
  motion: [Object, String, Boolean, Function],
  name: [Object, String, Boolean, Function],
  position: [Object, String, Boolean, Function],
  transitionState: String,

  className: String,
  type: [Object, String],
  style: [Object, String],
  speed: {
    type: [Number, String], default: 'faster'
  },
  delay: [Number, String],
  reverse: [Number, String],
  loop: [Number, String],
  onStart: {type: Function, default: noop},
  onFrame: {type: Function, default: noop},
  onRest: {type: Function, default: noop},
  prefixCls: {type: String, default: 'semi'},
  timing: String,
  duration: [Number, String],
  fillMode: String,
}
const StyledAnimation = defineComponent<StyledAnimationProps>((props, {slots}) => {
  // 在keep-alive = true时  相当于 onShow
  onActivated(() => {

  })
  const _generateAnimateEvents = (child: any, props: StyledAnimationProps = {}) => (
    {
    onAnimationiteration: (...args: any) =>
      invokeFns([child && child.props && child.props.onAnimationiteration, props.onFrame], args),
    onAnimationstart: (...args: any) =>
      invokeFns([child && child.props && child.props.onAnimationstart, props.onStart], args),
    onAnimationend: (...args: any) =>{
      // console.error(props.onRest)

      return invokeFns([child && child.props && child.props.onAnimationend, props.onRest], args)
    },
  }
  );

  const _hasSpeedClass = (speed = props.speed) => speed != null && speeds.includes(speed as string);
  const _hasTypeClass = (type = props.type) => type != null && types.includes(type);
  const _hasDelayClass = (delay = props.delay) => delay != null && delays.includes(delay as string);
  const _hasLoopClass = (loop = props.loop) => loop != null && loops.includes(loop as string);





  return  ()=>{

    let {
      type,
      speed,
      duration,
      delay,
      loop,
      reverse,
      prefixCls,
      timing,
      className,
      fillMode,
    } = props;

    const hasTypeClass = _hasTypeClass();
    const hasSpeedClass = _hasSpeedClass();
    const hasDelayClass = _hasDelayClass();
    const hasLoopClass = _hasLoopClass();

    const animateCls =
      className ||
      classnames(`${prefixCls}-animated`, {
        [`${prefixCls}-${type}`]: Boolean(type), // How to use it before compatibility
        [`${prefixCls}-speed-${speed}`]: hasSpeedClass,
        [`${prefixCls}-delay-${delay}`]: hasDelayClass,
        [`${prefixCls}-loop-${loop}`]: hasLoopClass,
      });

    const animateStyle = {
      animationTimingFunction: timing,
      animationName: !hasTypeClass && type,
      animationDuration: duration,
      animationDelay: !hasDelayClass && delay,
      animationIterationCount: !hasLoopClass && loop,
      animationDirection: reverse ? 'alternate' : 'normal',
      animationFillMode: fillMode,
    };
    return slots.default({animateCls, animateStyle, animateEvents: _generateAnimateEvents(null, props)})
  }
  //
  // return () => {
  //   if (slots.default && isVNode(slots.default)) {
  //     return slots.default().map(slots.default, (child: any) => {
  //       const animateEvents = _generateAnimateEvents(child, props);
  //       let style = props.style ? props.style : {}
  //       return (cloneVNode(child, {
  //           className: classnames(child.props.className, animateCls),
  //           style: {...child.props.style, ...style},
  //           ...animateEvents,
  //         })
  //       );
  //     });
  //   } else {
  //     return slots.default({animateCls, animateStyle, animateEvents: _generateAnimateEvents(null, props)})
  //   }
  // };
})

StyledAnimation.props = vuePropsType

export default StyledAnimation




