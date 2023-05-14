import {defineComponent, ref, h, onActivated, Fragment, onMounted, watch} from 'vue'

import StyledAnimation, {StyledAnimationProps} from './StyledAnimation';
import noop from './utils/noop';

export interface StyledTransitionProps extends StyledAnimationProps {
  state?: string | boolean;
  enter?: string;
  leave?: string;
  transitionState:string
  willEnter?: (value: any) => void;
  didEnter?: (value: any) => void;
  willLeave?: (value: any) => void;
  didLeave?: (value: any) => void;
  onStart?: (value: any) => void;
  onRest?: (value: any) => void;
}

export const vuePropsType = {
  duration: String,
  className: String,
  name: String,
  position: String,
  motion: [Object, String, Boolean, Function],
  transitionState: String,

  state: {
    type: [String, Boolean],
    default: undefined as any
  },
  from: Object,
  enter: String,
  leave: String,

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

export interface StyledTransitionState {
  state: string | boolean;
  lastChildren: any;
  currentChildren: any;
}


const StyledTransition = defineComponent<StyledTransitionProps>((props, {slots}) => {


  let instance: any;
  const state = ref<string | boolean>('')
  const lastChildren = ref(null)
  const currentChildren = ref(null)

  onMounted(() => {

    if (instance) {
      instance.destroy();
      instance = null;
    }
  })



  // TODO getDerivedStateFromProps
  // onMounted(()=>{
  //   if (slots.default !== currentChildren.value) {
  //     lastChildren.value = currentChildren.value;
  //     currentChildren.value = slots.default;
  //
  //
  //     if (slots.default == null) {
  //       state.value = 'leave';
  //     } else {
  //       state.value = 'enter';
  //     }
  //   }
  // })

  // TODO getDerivedStateFromProps
  watch([()=>props.transitionState, currentChildren,lastChildren], (newData, preData)=>{
    // console.log(props, state);
    // console.error(newData, preData)
    if (slots.default !== currentChildren.value) {
      lastChildren.value = currentChildren.value;
      currentChildren.value = slots.default;

      state.value = props.transitionState;

    }
    // console.log(state.value)
  }, {immediate: true})


  watch(()=>props.state , ()=>{
    if (props.state != null) {
      state.value = props.state;
    }
  })



  const _isControlled = () => [true, false, 'enter', 'leave'].includes(props.state);

  const forwardInstance = (instance0: any) => {
    instance = instance0;
  };

  const onRest = (thisProps: any) => {
    // console.log(state.value )

    if (state.value === 'enter') {
      props.didEnter(thisProps);
    } else if (state.value === 'leave') {
      currentChildren.value = null
      lastChildren.value = null
      props.didLeave(thisProps);
    }

    props.onRest(thisProps);
  };

  const onStart = (thisProps: any) => {

    if (state.value === 'enter') {
      props.willEnter(thisProps);
    } else if (state.value === 'leave') {
      props.willLeave(thisProps);
    }

    props.onStart(thisProps);
  };


  return ()=>{

    const { enter, leave, ...restProps } = props;

    const isControlled = _isControlled();


    let children:any, type: string;

    let thisSate:any = JSON.parse(JSON.stringify(state.value));


    if (isControlled) {
      children = slots.default;
      thisSate = props.state;
    } else if (currentChildren == null && lastChildren == null) {
      return null;
    }

    if (thisSate === 'enter') {
      type = enter;

      if (!isControlled) {
        children = currentChildren.value;
      }
    } else if (thisSate === 'leave') {
      type = leave;

      if (!isControlled) {
        children = lastChildren.value;
      }
    }

    const props_ =  {...{...restProps,type,onStart,onRest}}
    // console.log(thisSate,type)
    return (
      <StyledAnimation {...{...restProps,type,onStart,onRest}}>
        {{
          default: typeof children === 'function'?(arg:any)=>children(arg):
            // @ts-ignore
            ()=>null
        }}
      </StyledAnimation>
    )
  };
})

// @ts-ignore
StyledTransition.props = vuePropsType

export default StyledTransition

