import { Transition } from '@kousum/semi-animation-vue';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { noop } from 'lodash';
import { cssClasses } from '@douyinfe/semi-foundation/collapsible/constants';
import getMotionObjFromProps from '@douyinfe/semi-foundation/utils/getMotionObjFromProps';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  nextTick,
  PropType,
  ref,
  useSlots,
  watch,
} from 'vue';
import { CombineProps } from '../interface';

export interface CollapseProps {
  motion?: boolean;
  duration?: number;
  onMotionEnd?: () => void;
  motionType?: string;
}

export interface TransitionStyle {
  [x: string]: any;
  maxHeight?: number;
}

const ease = 'cubicBezier(.25,.1,.25,1)';
const propsType: CombineProps<CollapseProps> = {
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  duration: PropTypes.number,
  onMotionEnd: PropTypes.func as PropType<CollapseProps['onMotionEnd']>,
  motionType: String,
}
export const vuePropsType = vuePropsMake<CollapseProps>(
  propsType,
  {
    duration: 250,
    motion: true,
    onMotionEnd: noop,
  }
);
const Collapse = defineComponent({
  props: vuePropsType,
  name: 'Collapse',
  setup(props, {}) {
    const slots = useSlots();

    const ref_ = ref();
    const maxHeight = ref(0);
    function setMaxHeight(val: number) {
      maxHeight.value = val;
    }
    // cache last state
    const open = ref(true);
    function setOpen(val: boolean) {
      open.value = val;
    }
    const left = ref(false);
    function setLeft(val: boolean) {
      left.value = val;
    }
    const immediateAttr = ref(false);
    function setImmediateAttr(val: boolean) {
      immediateAttr.value = val;
    }

    // onMounted(()=>{
    //     useEffect()
    // })

    watch(
      () => props.motionType,
      () => {
        useEffect();
      }
    );

    function useEffect() {
      if (props.motionType === 'enter') {
        !open.value && setOpen(true);
        left.value && setLeft(false);
      } else if (props.motionType === 'leave') {
        !open.value && setOpen(true);
        !immediateAttr.value && setImmediateAttr(true);
        left.value && setLeft(false);
      }
    }

    let motionType = '';
    const setHeight = (node: any) => {
      // TODO 渲染时机不同 watch 在setHeight 之前执行了
      if (props.motionType !== motionType) {
        useEffect();
        motionType = props.motionType;
      }
      nextTick(() => {
        const currHeight = node && node.scrollHeight;
        if (currHeight && maxHeight.value !== currHeight) {
          setMaxHeight(currHeight);
        }
      });
    };

    const resetHeight = () => {
      ref_.value.style.maxHeight = 'none';
    };

    const formatStyle = (style: TransitionStyle) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { maxHeight } = style;
      return { maxHeight };
    };

    const renderChildren = (transitionStyle: TransitionStyle) => {
      const transition = transitionStyle && typeof transitionStyle === 'object' ? formatStyle(transitionStyle) : {};

      const style: CSSProperties = {
        overflow: 'hidden',
        maxHeight: open.value ? 'none' : 0,
        ...transition,
      };
      const children = slots.default?.();
      return (
        <div style={style} class={`${cssClasses.PREFIX}-wrapper`} ref={ref_}>
          <div ref={setHeight}>{children}</div>
        </div>
      );
    };
    const didLeave = () => {
      setLeft(true);
      setMaxHeight(0);
      props.motionType === 'leave' && props.onMotionEnd();
    };

    const onImmediateEnter = () => {
      open.value && setOpen(false);
      setImmediateAttr(false);
    };

    const didEnter = () => {
      resetHeight();
      immediateAttr.value && onImmediateEnter();
      props.motionType === 'enter' && props.onMotionEnd();
    };

    return () => {
      if (left.value) {
        return null;
      }

      const mergeMotion = getMotionObjFromProps({
        didEnter,
        didLeave,
        motion: props.motion,
      });

      return props.motion ? (
        <Transition
          state={open.value ? 'enter' : 'leave'}
          immediate={immediateAttr.value}
          from={{ maxHeight: 0 }}
          enter={{ maxHeight: { val: maxHeight.value, easing: ease, duration: props.duration } }}
          leave={{ maxHeight: { val: 0, easing: ease, duration: props.duration } }}
          {...mergeMotion}
        >
          {(transitionStyle: TransitionStyle) => renderChildren(transitionStyle)}
        </Transition>
      ) : (
        renderChildren(null)
      );
    };
  },
});

export default Collapse;
