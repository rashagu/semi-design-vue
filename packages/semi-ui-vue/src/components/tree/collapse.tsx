import { Transition } from '@kousum/semi-animation-vue';
import * as PropTypes from '../PropTypes';
import { noop } from 'lodash';
import { cssClasses } from '@douyinfe/semi-foundation/collapsible/constants';
import getMotionObjFromProps from '@douyinfe/semi-foundation/utils/getMotionObjFromProps';
import {VueJsxNode} from "../interface";
import {defineComponent, h, useSlots, ref, watch, computed} from "vue";
import {vuePropsMake} from "../PropTypes";

export interface CollapseProps {
    [x: string]: any;
    motion?: boolean;
    children?: VueJsxNode[];
    duration?: number;
    onMotionEnd?: () => void;
    motionType?: string;
}

export interface TransitionStyle {
    [x: string]: any;
    maxHeight?: number;
}

const ease = 'cubicBezier(.25,.1,.25,1)';



export const vuePropsType = vuePropsMake({
    motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
    duration: PropTypes.number,
    onMotionEnd: PropTypes.func,
}, {
    duration: 250,
    motion: true,
    onMotionEnd: noop,
})
const Collapse = defineComponent<CollapseProps>((props, {}) => {
    const slots = useSlots()

    const ref_ = ref();
    const maxHeight = ref(0);
    function setMaxHeight(val:number) {
        maxHeight.value = val
    }
    // cache last state
    const open = ref(true);
    function setOpen(val:boolean) {
        open.value = val
    }
    const left = ref(false);
    function setLeft(val:boolean) {
        left.value = val
    }
    const immediateAttr = ref(false);
    function setImmediateAttr(val:boolean) {
        immediateAttr.value = val
    }

    watch(()=>props.motionType, ()=>{
        if (props.motionType === 'enter') {
            !open && setOpen(true);
            left && setLeft(false);
        } else if (props.motionType === 'leave') {
            !open && setOpen(true);
            !immediateAttr && setImmediateAttr(true);
            left && setLeft(false);
        }
    })

    const setHeight = computed(()=>(node) => {
        const currHeight = node && node.scrollHeight;
        if (currHeight && maxHeight !== currHeight) {
            setMaxHeight(currHeight);
        }
        console.log(left)
    });


    const resetHeight = () => {
        ref_.value.style.maxHeight = 'none';
    };


    const formatStyle = (style: TransitionStyle) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { maxHeight } = style;
        return { maxHeight };
    };

    const renderChildren = (transitionStyle: TransitionStyle) => {
        const transition =
          transitionStyle && typeof transitionStyle === 'object' ? formatStyle(transitionStyle) : {};

        const style = {
            overflow: 'hidden',
            maxHeight: open ? 'none' : 0,
            ...transition,
        };
        const children = slots.default?.()
        return (
          <div style={style} class={`${cssClasses.PREFIX}-wrapper`} ref={ref}>
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
        open && setOpen(false);
        setImmediateAttr(false);
    };

    const didEnter = () => {
        resetHeight();
        immediateAttr && onImmediateEnter();
        props.motionType === 'enter' && props.onMotionEnd();
    };

    return () => {
        if (left) {
            return null;
        }

        const mergeMotion = getMotionObjFromProps({
            didEnter,
            didLeave,
            motion: props.motion,
        });

        return props.motion ? (
          <Transition
            state={open ? 'enter' : 'leave'}
            immediate={immediateAttr.value}
            from={{ maxHeight: 0 }}
            enter={{ maxHeight: { val: maxHeight, easing: ease, duration: props.duration } }}
            leave={{ maxHeight: { val: 0, easing: ease, duration: props.duration } }}
            {...mergeMotion}
          >
              {(transitionStyle: TransitionStyle) => renderChildren(transitionStyle)}
          </Transition>
        ) : (
          renderChildren(null)
        );
    };
})

Collapse.props = vuePropsType
Collapse.name = 'Collapse'

export default Collapse
