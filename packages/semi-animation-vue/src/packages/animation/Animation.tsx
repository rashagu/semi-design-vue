import {
  defineComponent,
  ref,
  h,
  onActivated,
  Fragment,
  isVNode,
  onMounted,
  onUnmounted,
  watch,
  onBeforeMount
} from 'vue'
import PropTypes from 'prop-types';
import {Animation as SemiAnimation, events} from '@douyinfe/semi-animation';
import noop from './utils/noop';


export interface AnimationProps {
  onStart?: Function;
  onFrame?: Function;
  onPause?: Function;
  onResume?: Function;
  onStop?: Function;
  onRest?: Function;
  from?: Record<string, any>;
  to?: Record<string, any>;
  reverse?: boolean;
  reset?: boolean;
  force?: boolean;
  config?: Record<string, any>;
  autoStart?: boolean;
  forwardInstance?: (value: any) => void;
  immediate?: boolean;

  [key: string]: any,
}

export const vuePropsType = {
  onStart: {
    type: Function,
    default: noop,
  },
  onFrame: {
    type: Function,
    default: noop,
  },
  onPause: {
    type: Function,
    default: noop,
  },
  onResume: {
    type: Function,
    default: noop,
  },
  onStop: {
    type: Function,
    default: noop,
  },
  onRest: {
    type: Function,
    default: noop,
  },

  from: Object,
  to: Object,
  reverse: Boolean,
  reset: Boolean,
  force: {
    type:Boolean,
    default: false,
  },
  config: Object,
  autoStart: {
    type: Boolean,
    default: true
  },
  forwardInstance: Function,
  immediate: Boolean,
}
const Index = defineComponent<AnimationProps>((props, {slots}) => {
  // 在keep-alive = true时  相当于 onShow

  let _mounted: boolean = false;
  let _destroyed: boolean = false;
  const animation = ref<SemiAnimation>(null);
  let reverse: () => void;
  let destroy: () => void;
  let reset: () => void;
  let resume: () => void;
  let end: () => void;
  let stop: () => void;
  let pause: () => void;
  let start: () => void;

  const currentStyle = ref({})

  let startOrNot: any = function () {
    throw new Error('Method not implemented.');
  }

  onBeforeMount(()=>{
    initAnimation();
    bindEvents();
  })

  onMounted(() => {
    _mounted = true;
    const {forwardInstance} = props;
    if (typeof forwardInstance === 'function') {
      // console.error(forwardInstance)
      forwardInstance(animation.value);
    }

    startOrNot();
  })

  onUnmounted(() => {
    _mounted = false;
    if (animation.value) {
      animation.value.destroy();
      animation.value = null;
    }
  })

  watch([() => props.from, () => props.to], (n, [prevPropsFrom, prevPropsTo]) => {

    if (props.reset) {
      if (props.from !== prevPropsFrom || props.to !== prevPropsTo) {
        destroy();
        initAnimation();
        startOrNot();
      }
    }


    if (props.force) {
      if (props.to !== prevPropsTo) {
        initAnimation({
          ...props,
          from: prevPropsTo,
        });
        startOrNot();
      }
    }

  })

  const initAnimation = (props0?: AnimationProps) => {
    // eslint-disable-next-line eqeqeq
    props0 = props0 == null ? props : props0;
    // eslint-disable-next-line prefer-const
    let {from, to, config, reverse} = props0;

    if (reverse) {
      [from, to] = [to, from];
    }

    const initState = new SemiAnimation(
      {
        from: {...from},
        to: {...to},
      },
      {
        ...config,
      }
    )
    animation.value = initState;

    events.forEach((event: string) => {
      const propName = `on${event[0].toUpperCase() + event.slice(1)}`;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      animation.value.on(event, (propsAnimation: any) => {
        // avoid memory leak
        //console.log(_mounted,_destroyed)
        if (_mounted && !_destroyed) {
          currentStyle.value = {...propsAnimation}
          props[propName](propsAnimation);
        }
      });
    });

    _destroyed = false;
  };
  const bindEvents = () => {
    startOrNot = () => {
      const {immediate, autoStart} = props;
      if (immediate) {
        end();
      } else if (autoStart) {
        start();
      }
    };
    start = () => {
      animation.value && animation.value.start();
    };
    pause = () => {
      animation.value && animation.value.pause();
    };
    stop = () => {
      animation.value && animation.value.stop();
    };
    end = () => {
      animation.value && animation.value.end();
    };
    resume = () => {
      animation.value && animation.value.resume();
    };
    reset = () => {
      if (animation.value) {
        animation.value.reset();
        startOrNot();
      }
    };
    reverse = () => {
      if (animation.value) {
        animation.value.reverse();
        startOrNot();
      }
    };
    destroy = () => {
      _destroyed = true;
      animation.value && animation.value.destroy();
    };
  };


  return () => <div>
    {(() => {
      const children: any = slots.default;
      if (typeof children === 'function' && animation.value) {
        return children(animation.value.getCurrentStates());
      } else if (isVNode(children)) {
        return children;
      } else {
        return null;
      }
    })()}
  </div>
})

Index.props = vuePropsType

export default Index

