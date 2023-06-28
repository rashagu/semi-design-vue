import { isEqual, noop } from "lodash";
import {CSSProperties, defineComponent, h, nextTick, onMounted, reactive, useSlots, watch} from "vue";
import {VueJsxNode} from "../interface";


interface AnimationEventsNeedBind {
    onAnimationStart?: (e: AnimationEvent) => void;
    onAnimationEnd?: (e: AnimationEvent) => void;

    [key: string]: (e: any) => void
}

interface AnimationProps {
    startClassName?: string;
    endClassName?: string;
    children: ({ }: {
        animationClassName: string;
        animationStyle: CSSProperties;
        animationEventsNeedBind: AnimationEventsNeedBind;
        isAnimating: boolean
    }) => VueJsxNode;
    animationState: "enter" | "leave";
    onAnimationEnd?: (stoppedByAnother: boolean) => void;
    onAnimationStart?: () => void;
    motion?: boolean;
    replayKey?: string;
    fillMode?: "backwards" | "both" | "forwards" | "none"
}

interface AnimationState {
    currentClassName: string;
    extraStyle: CSSProperties;
    isAnimating: boolean
}


export const vuePropsType = {
    startClassName: String,
    endClassName: String,
    children: [Function, Object],
    animationState: String,
    onAnimationEnd: Function,
    onAnimationStart: Function,
    motion: {
        type: Boolean,
        default: true
    },
    replayKey: {
        type: String,
        default: ""
    },
    fillMode: String,
}


const CSSAnimation = defineComponent<AnimationProps>((props, {}) => {

    const slots = useSlots()

    const state = reactive<AnimationState>({
        currentClassName: props.startClassName,
        extraStyle: {
            animationFillMode: props.fillMode,
        },
        isAnimating: true
    })

    onMounted(()=>{
        props.onAnimationStart?.();
        if (!props.motion) {
            props.onAnimationEnd?.(false);
            state.isAnimating = false
        }
    })
    // TODO watch的“value, oldValue”就算实际变了得到的值可能还是相同的
    watch(()=>props.animationState, ()=>{
        // if (changedKeys.includes("animationState")) {
        // }

    })
    watch([
        ()=>props.startClassName,
        ()=>props.replayKey,
        ()=>props.motion,
    ], ()=>{
        state.currentClassName = props.startClassName
        state.extraStyle = {
            animationFillMode: props.fillMode,
        }
        state.isAnimating = true
        nextTick(()=>{
            props.onAnimationStart?.();
            if (!props.motion) {
                props.onAnimationEnd?.(state.isAnimating);
                state.isAnimating = false
            }
        })
    })

    const handleAnimationStart = () => {
        props.onAnimationStart?.();
    }


    const handleAnimationEnd = () => {
        state.currentClassName = props.startClassName
        state.extraStyle = {
            animationFillMode: props.fillMode,
        }
        state.isAnimating = false
        nextTick(()=>{
            props.onAnimationEnd?.(false);
        })

    }
    return () => {
        if (props.motion) {
            return props.children({
                animationClassName: state.currentClassName ?? "",
                animationStyle: state.extraStyle,
                animationEventsNeedBind: {
                    onAnimationstart: handleAnimationStart,
                    onAnimationend: handleAnimationEnd
                },
                isAnimating: state.isAnimating
            });
        } else {
            return props.children({
                animationClassName: "",
                animationStyle: {},
                animationEventsNeedBind: {},
                isAnimating: state.isAnimating
            });
        }
    }
})

CSSAnimation.props = vuePropsType
CSSAnimation.name = 'CSSAnimation'

export default CSSAnimation


