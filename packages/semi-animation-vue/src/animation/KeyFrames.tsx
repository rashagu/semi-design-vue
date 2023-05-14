import {defineComponent, ref, h, onActivated, Fragment, onMounted, ExtractPublicPropTypes, PropType} from 'vue'


import noop from './utils/noop';
import Animation from './Animation';

export interface KeyFramesProps1 {
  frames?: any[];
  loop?: boolean;
  forwardInstance?: (value: any) => void;
  onFrame?: (value: any) => void;
  onKeyRest?: (value: any) => void;
  onRest?: (value: any) => void;
}

export interface KeyFramesStates {
  currentStyle: any;
  frameIndex: number;
}



export const vuePropsType = {
  forwardInstance: Function as PropType<(value: any) => void>,
  name: String,
  frames: {
    type: Array,
    default: ():any[]=>[],
  },
  loop: {
    type: Boolean,
    default: false,
  },
  onKeyRest: {
    type: Function as PropType<(value: any) => void>,
    default: ()=>noop
  },
  onRest: {
    type: Function as PropType<(value: any) => void>,
    default: ()=>noop
  },
  onFrame: {
    type: Function as PropType<(value: any) => void>,
    default: ()=>noop
  },
}
export type KeyFramesProps = ExtractPublicPropTypes<typeof vuePropsType>
const KeyFrames = defineComponent(
  (props, {slots}) => {

    let instance: any;

    const currentStyle = ref({});
    const frameIndex = ref(0);


    const onFrame = (props0 = {}) => {
      const currentStyle0 = {...props0};

      props.onFrame(currentStyle);
      currentStyle.value = currentStyle0;
    };

    const next = () => {
      const {frames, loop} = props;

      frameIndex.value++;

      if (frameIndex.value < frames.length - 1) {
        // setState({ frameIndex });
      } else {
        frameIndex.value = 0;
        props.onRest(currentStyle.value);

        if (loop) {
          // setState({ frameIndex });
        }
      }

      props.onKeyRest(currentStyle.value);
    };

    const forwardInstance = (instance0: any) => {
      instance = instance0;

      if (typeof props.forwardInstance === 'function') {
        props.forwardInstance(instance0);
      }
    };


    onMounted(() => {
      instance && instance.destroy();
    })


    const {frames} = props;


    const from = frames[frameIndex.value];
    const to = frames[frameIndex.value + 1];

    return ()=>(
      <Animation
        {...props}
        forwardInstance={forwardInstance}
        from={from}
        to={to}
        onFrame={onFrame}
        onRest={next}
      >
        {slots.default ? (typeof slots.default() === 'function' ? slots.default(currentStyle) : slots.default()) : null}
      </Animation>
    );
  },
  {
    props: vuePropsType
  }
)


export default KeyFrames

