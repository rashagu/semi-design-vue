import {
  defineComponent,
  ref,
  h,
  onActivated,
  Fragment,
  onMounted,
  isVNode,
  watch,
  reactive,
  VNode,
  useSlots,
  onBeforeUnmount
} from 'vue'
import Animation, {AnimationProps} from './Animation';

import noop from './utils/noop';

export interface TransitionState {
  state: string | boolean;
  lastChildren: VNode | ((TransitionProps: any) => VNode | any) | VNode[];
  currentChildren: VNode | ((TransitionProps: any) => VNode | any) | VNode[];
}

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
const Transition = defineComponent<TransitionProps>((props, {}) => {
  const slots = useSlots()
  // 在keep-alive = true时  相当于 onShow
  onActivated(() => {

  })

  let instance: any;
  const state = reactive<TransitionState>({
    state: '',
    lastChildren: null,
    currentChildren: null,
  })

  function getDerivedStateFromProps(props: TransitionProps, state: TransitionState) {
    const willUpdateStates: TransitionState = {...state};
    const children = slots.default
    if (
      children !== state.currentChildren
      // && (props.children == null || state.currentChildren == null)
    ) {
      willUpdateStates.lastChildren = state.currentChildren;
      willUpdateStates.currentChildren = children;

      if (children == null) {
        willUpdateStates.state = 'leave';
      } else {
        willUpdateStates.state = 'enter';
      }
    }

    if (props.state != null) {
      willUpdateStates.state = props.state;
    }

    return willUpdateStates;
  }

  watch([()=>props.state, ()=>slots.defautl], ()=>{
    const newState = getDerivedStateFromProps(props, state)
    Object.keys(newState).forEach((key)=>{
      // @ts-ignore
      state[key] = newState[key]
    })
  })

  onBeforeUnmount(() => {
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
    if (state.state === 'enter') {
      props.didEnter(funcProps);
    } else if (state.state === 'leave') {
      state.currentChildren = null
      state.lastChildren = null
      props.didLeave(funcProps);
    }
    console.log(state.state)
    props.onRest(funcProps);
  };

  const onStart = (funcProps: any) => {

    if (state.state === 'enter') {
      props.willEnter(funcProps);
    } else if (state.state === 'leave') {
      props.willLeave(funcProps);
    }

    props.onStart(funcProps);
  };


  return () => {
    const {from: propsFrom, enter, leave, ...restProps} = props;

    let from = {};
    let to = {};

    const isControlled = _isControlled();
    let children: any;

    if (isControlled) {
      children = slots.default;
      state.state = props.state;
    } else if (state.currentChildren == null && state.lastChildren == null) {
      return null;
    }

    if (state.state === 'enter') {
      from = propsFrom;
      to = enter;

      if (!isControlled) {
        children = state.currentChildren;
      }
    } else if (state.state === 'leave') {
      from = enter;
      to = leave;

      if (!isControlled) {
        children = state.lastChildren;
      }
    }

    // TODO vue 这里的相同的 props 传给子组件 不会覆盖 而是会合并成数组。
    //  so ...
    const finalProps = {...restProps, onRest, onStart, from, to}

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

