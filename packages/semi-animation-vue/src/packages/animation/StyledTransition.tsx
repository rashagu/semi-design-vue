import {defineComponent, ref, h, onActivated, Fragment, onMounted, watch} from 'vue'
import PropTypes from 'prop-types';
import StyledAnimation, {StyledAnimationProps} from './StyledAnimation';
import noop from './utils/noop';
import {Slot} from "@vue/test-utils/dist/types";
import {SpinProps} from "@kousum/semi-ui-vue/src/packages/components/spin";

export interface StyledTransitionProps extends StyledAnimationProps {
  state?: string | boolean;
  enter?: string;
  leave?: string;
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
  motion: [Boolean],


  state: [String, Boolean],
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
  const state = ref<string | boolean>('enter')
  const lastChildren = ref(null)
  const currentChildren = ref(null)

  onMounted(() => {

    if (instance) {
      instance.destroy();
      instance = null;
    }
  })




  // TODO getDerivedStateFromProps
  onMounted(()=>{
    if (slots.default() !== currentChildren.value) {
      lastChildren.value = currentChildren.value;
      currentChildren.value = slots.default();

      if (slots.default == null) {
        state.value = 'leave';
      } else {
        state.value = 'enter';
      }
    }

    if (props.state != null && props.state !== state.value) {
      state.value = props.state;
    }
  })



  const _isControlled = () => [true, false, 'enter', 'leave'].includes(props.state);

  const forwardInstance = (instance0: any) => {
    instance = instance0;
  };

  const onRest = (props: any) => {
    console.log('onRest')

    if (state.value === 'enter') {
      props.didEnter(props);
    } else if (state.value === 'leave') {
      currentChildren.value = null
      lastChildren.value = null
      props.didLeave(props);
    }

    props.onRest(props);
  };

  const onStart = (funcProps: any) => {

    if (state.value === 'enter') {
      props.willEnter(funcProps);
    } else if (state.value === 'leave') {
      props.willLeave(funcProps);
    }

    props.onStart(funcProps);
  };


  return ()=>{


    const { enter, leave, ...restProps } = props;

    const isControlled = _isControlled();


    let children:any, type: string;

    let thisSate:any = state.value;


    if (isControlled) {
      children = slots.default;
      thisSate = props.state;
      debugger
    } else if (currentChildren == null && lastChildren == null) {
      return null;
    }

    if (thisSate === 'enter') {
      type = enter;

      if (!isControlled) {
        children = currentChildren;
      }
    } else if (thisSate === 'leave') {
      type = leave;

      if (!isControlled) {
        children = lastChildren;
      }
    }

    const props_ =  {...{...restProps,type,onStart,onRest}}
    console.log(thisSate, props_)
    debugger
    return (
      <StyledAnimation>
        {{
          default: (arg:any)=>children(arg)
        }}
      </StyledAnimation>
    )
  };
})

StyledTransition.props = vuePropsType

export default StyledTransition

