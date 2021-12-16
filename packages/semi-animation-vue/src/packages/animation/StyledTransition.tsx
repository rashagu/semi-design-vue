import {defineComponent, ref, h, onActivated, Fragment, onMounted} from 'vue'
import PropTypes from 'prop-types';
import StyledAnimation, {StyledAnimationProps} from './StyledAnimation';
import noop from './utils/noop';

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
  state: [String, Boolean],
  from: Object,
  enter: Object,
  leave: Object,

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

  const _isControlled = () => [true, false, 'enter', 'leave'].includes(props.state);

  const forwardInstance = (instance0: any) => {
    instance = instance0;
  };

  const onRest = (props: any) => {

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


  const { enter, leave, ...restProps } = props;

  const isControlled = _isControlled();


  return ()=>{

    let children, type;


    if (isControlled) {
      children = slots.default;
      state.value = props.state;
    } else if (currentChildren == null && lastChildren == null) {
      return null;
    }

    if (state.value === 'enter') {
      type = enter;

      if (!isControlled) {
        children = currentChildren;
      }
    } else if (state.value === 'leave') {
      type = leave;

      if (!isControlled) {
        children = lastChildren;
      }
    }
    return (
      <StyledAnimation {...restProps} type={type} onStart={onStart} onRest={onRest}>
        {children()}
      </StyledAnimation>
    )
  };
})

StyledTransition.props = vuePropsType

export default StyledTransition

