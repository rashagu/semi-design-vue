
import { strings } from '@douyinfe/semi-foundation/carousel/constants';
import {CSSProperties, VNode} from "vue";

export interface CarouselMethod {
    next?: () => void;
    prev?: () => void;
    goTo?: (tagetIndex: number) => void;
    play?: () => void;
    stop?: () => void
}

export interface CarouselProps {
    activeIndex?: number;
    animation?: typeof strings.ANIMATION_MAP[number];
    arrowProps?: ArrowProps;
    autoPlay?: boolean | {interval?: number; hoverToPause?: boolean};
    arrowType?: typeof strings.ARROW_MAP[number];
    children?: VNode | Array<VNode>;
    className?: string;
    defaultActiveIndex?: number;
    indicatorPosition?: typeof strings.POSITION_MAP[number];
    indicatorSize?: typeof strings.SIZE[number];
    theme?: typeof strings.THEME_MAP[number];
    indicatorType?: typeof strings.TYPE_MAP[number];
    onChange?: (index: number, preIndex: number) => void;
    showArrow?: boolean;
    showIndicator?: boolean;
    slideDirection?: typeof strings.DIRECTION[number];
    speed?: number;
    style?: CSSProperties;
    trigger?: typeof strings.TRIGGER[number]
}

export interface CarouselIndicatorProps {
    activeIndex?: number;
    className?: string;
    defaultActiveIndex?: number;
    position?: typeof strings.POSITION_MAP[number];
    size?: typeof strings.SIZE[number];
    total?:number;
    theme?: typeof strings.THEME_MAP[number];
    type?: typeof strings.TYPE_MAP[number];
    onIndicatorChange?: (activeIndex: number) => void;
    style?: CSSProperties;
    trigger?: typeof strings.TRIGGER[number]
    activeKey?: number
}

export interface CarouselArrowProps {
    type?: typeof strings.ARROW_MAP[number];
    theme?: typeof strings.THEME_MAP[number];
    prev?: () => void;
    next?: () => void;
    arrowProps?: ArrowProps
}

export interface ArrowButton {
    props?: any;
    children?: VNode
}
export interface ArrowProps {
    leftArrow?: ArrowButton;
    rightArrow?: ArrowButton
}
