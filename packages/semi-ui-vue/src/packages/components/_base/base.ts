export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Motion<P extends Record<string, any> = any> = boolean | MotionObject | MotionFunction<P>;

export type MotionFunction<P> = (props: P) => MotionObject;

export interface MotionObject {
    [x: string]: any;
    willEnter?: () => void;
    didEnter?: () => void;
    willLeave?: () => void;
    didLeave?: () => void;
    onStart?: () => void;
    onRest?: () => void;
    state?: string;
}

export interface MotionChildrenProps {
    animateCls?: string;
    animateStyle?: {
        animationTimingFunction?: string;
        animationName?: string;
        animationDuration?: number | string;
        animationDelay?: number | string;
        animationIterationCount?: number | string;
        animationDirection?: 'alternate' | 'normal';
        animationFillMode?: string;
    };
    animateEvents?: {
        onAnimationIteration?: any | undefined;
        onAnimationStart?: any | undefined;
        onAnimationEnd?: any | undefined;
    };
}
