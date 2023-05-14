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
  onBeforeMount, reactive, onBeforeUnmount, shallowRef, CSSProperties
} from 'vue'

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
}
const Index = defineComponent<AnimationProps>((props, {slots}) => {
  // 在keep-alive = true时  相当于 onShow

  let _mounted: boolean = false;
  let _destroyed: boolean = false;
  const animation = shallowRef<SemiAnimation>(null);
  let reverse: () => void;
  let destroy: () => void;
  let reset: () => void;
  let resume: () => void;
  let end: () => void;
  let stop: () => void;
  let pause: () => void;
  let start: () => void;

  const state = reactive<{currentStyle:Record<string, any>}>({
    currentStyle: {},
  })

  let startOrNot: any = function () {
    throw new Error('Method not implemented.');
  }

  initAnimation();
  bindEvents();

  onMounted(() => {
    _mounted = true;
    const {forwardInstance} = props;

    if (animation.value === null) {
      // didmount/willUnmount may be called twice when React.StrictMode is true in React 18, we need to ensure that this.animation is correct
      initAnimation();
      bindEvents();
    }


    if (typeof forwardInstance === 'function') {
      // console.error(forwardInstance)
      forwardInstance(animation.value);
    }

    startOrNot();
  })

  onBeforeUnmount(() => {
    _mounted = false;
    if (animation.value) {
      animation.value.destroy();
      animation.value = null;
    }
  })

  watch([() => props.from, () => props.to, ()=>props.reset, ()=>props.force], (n, [prevPropsFrom, prevPropsTo]) => {

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

  function initAnimation (props0?: AnimationProps) {
    // eslint-disable-next-line eqeqeq
    props0 = props0 == null ? props : props0;
    // eslint-disable-next-line prefer-const
    let {from, to, config, reverse} = props0;

    if (reverse) {
      [from, to] = [to, from];
    }

    animation.value = new SemiAnimation(
      {
        from: {...from},
        to: {...to},
      },
      {
        ...config,
      }
    )

    events.forEach((event: string) => {
      const propName = `on${event[0].toUpperCase() + event.slice(1)}`;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      animation.value.on(event, (propsAnimation: any) => {
        // avoid memory leak
        //console.log(_mounted,_destroyed)
        if (_mounted && !_destroyed) {
          state.currentStyle = {...propsAnimation}
          // @ts-ignore
          props[propName](propsAnimation);
        }
      });
    });

    _destroyed = false;
  };
  function bindEvents() {
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


  return () => {
    const children = slots.default;
    const styles:any = {}
    Object.keys(state.currentStyle).forEach(key=>{
      if (['height',  'width', 'left', 'right', 'top', 'bottom', 'maxHeight', 'minHeight', 'maxWidth', 'minWidth'].includes(key)){
        if (typeof state.currentStyle[key] === 'number'){
          styles[key] = state.currentStyle[key] + 'px'
        }
      }else{
        styles[key] = state.currentStyle[key]
      }
    })
    if (typeof children === 'function' && animation.value) {
      return children(styles);
    } else if (isVNode(children)) {
      return children;
    } else {
      return null;
    }
  }
})

// @ts-ignore
Index.props = vuePropsType

export default Index

