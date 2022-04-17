import {defineComponent, ref, h, onActivated, Fragment, onMounted, isVNode, watch} from 'vue'
import Animation, {AnimationProps} from './Animation';

import noop from './utils/noop';

export interface TransitionProps extends AnimationProps {
  from?: Record<string, any>;
  enter?: Record<string, any>;
  leave?: Record<string, any>;
  state?: string | boolean;
  willEnter?: (value: any) => void;
  didEnter?: (value: any) => void;
  willLeave?: (value: any) => void;
  didLeave?: (value: any) => void;
  onRest?: (value: any) => void;
  onStart?: (value: any) => void;
}


export const vuePropsType = {
  from: Object,
  enter: Object,
  leave: Object,
  state: [String, Boolean],

  willEnter: {
    type: Function,
    default: noop,
  },
  didEnter: {
    type: Function,
    default: noop,
  },
  willLeave: {
    type: Function,
    default: noop,
  },
  didLeave: {
    type: Function,
    default: noop,
  },
  onRest: {
    type: Function,
    default: noop,
  },
  onStart: {
    type: Function,
    default: noop,
  },
}
const Transition = defineComponent<TransitionProps>((props, {slots}) => {
  // 在keep-alive = true时  相当于 onShow
  onActivated(() => {

  })

  let instance: any;
  const state = ref('')
  const lastChildren = ref(null)
  const currentChildren = ref(null)


  onMounted(() => {

    if (instance) {
      instance.destroy();
      instance = null;
    }
  })


  const _isControlled = () => [true, false, 'enter', 'leave'].includes(props.state);

  const forwardInstance = (instance0: any) => {
    instance = instance0;
  };

  const onRest = (funcProps: any) => {
    if (state.value === 'enter') {
      props.didEnter(funcProps);
    } else if (state.value === 'leave') {
      currentChildren.value = null
      lastChildren.value = null
      props.didLeave(funcProps);
    }

    props.onRest(funcProps);
  };

  const onStart = (funcProps: any) => {

    if (state.value === 'enter') {
      props.willEnter(funcProps);
    } else if (state.value === 'leave') {
      props.willLeave(funcProps);
    }

    props.onStart(funcProps);
  };


  const {from: propsFrom, enter, leave, ...restProps} = props;

  let from = {};
  let to = {};

  const isControlled = _isControlled();
  let children: any;
  return () => {

    let stateProps: any;
    if (isControlled) {
      children = slots.default;
      stateProps = props.state;
    } else if (currentChildren == null && lastChildren == null) {
      return null;
    }

    if (stateProps === 'enter') {
      from = propsFrom;
      to = enter;

      if (!isControlled) {
        children = currentChildren;
      }
    } else if (stateProps === 'leave') {
      from = enter;
      to = leave;

      if (!isControlled) {
        children = lastChildren;
      }
    }

    // TODO vue 这里的相同的 props 传给子组件 不会覆盖 而是会合并成数组。
    //  so ...
    const finalProps = {...restProps, onRest,onStart,from,to}

    return (
      <Animation {...finalProps} force>
        {
          (propsRender: Record<string, any>) => (
            typeof children === 'function' ?
              children(propsRender) : isVNode(children) ? children : null
          )
        }
      </Animation>
    )
  }
})

Transition.props = vuePropsType

export default Transition

