import {BaseProps} from "../_base/baseComponent";
import {VueJsxNode} from "../interface";
import {CSSProperties} from "vue";


export interface ImageStates {
    src: string;
    loadStatus: "loading" | "success" | "error";
    previewVisible: boolean;
}

export interface ImageProps extends BaseProps{
    src?: string;
    width?: string | number;
    height?: string | number;
    alt?: string;
    placeholder?: VueJsxNode;
    fallback?: string | VueJsxNode;
    preview?: boolean | PreviewProps;
    onError?: (event: Event) => void;
    onLoad?: (event: Event) => void;
    crossOrigin?: "anonymous"| "use-credentials";
    children?: VueJsxNode,
    imageID?: number;
}

export interface PreviewProps extends BaseProps {
    visible?: boolean;
    src?: string | string[];
    previewTitle?: VueJsxNode;
    currentIndex?: number;
    defaultIndex?: number;
    defaultVisible?: boolean;
    maskClosable?: boolean;
    closable?: boolean;
    zoomStep?: number;
    infinite?: boolean;
    showTooltip?: boolean;
    closeOnEsc?: boolean;
    prevTip?: string;
    nextTip?: string;
    zoomInTip?: string;
    zoomOutTip?: string;
    rotateTip?: string;
    downloadTip?: string;
    adaptiveTip?: string;
    originTip?: string;
    lazyLoad?: boolean;
    lazyLoadMargin?: string;
    preLoad?: boolean;
    preLoadGap?: number;
    viewerVisibleDelay?: number;
    disableDownload?: boolean;
    zIndex?: number;
    children?: VueJsxNode,
    renderHeader?: (info: any) => VueJsxNode;
    renderPreviewMenu?: (props: MenuProps) => VueJsxNode;
    getPopupContainer?: () => HTMLElement;
    onVisibleChange?: (visible: boolean) => void;
    onChange?: (index: number) => void
    onClose?: () => void;
    onZoomIn?: (zoom: number) => void;
    onZoomOut?: (zoom: number) => void;
    onPrev?: (index: number) => void;
    onNext?: (index: number) => void;
    onRatioChange?: (type: RatioType) => void;
    onRotateChange?: (angle: number) => void;
    onDownload?: (src: string, index: number) => void;
}

export interface MenuProps {
    min?: number;
    max?: number;
    step?: number;
    curPage?: number;
    totalNum?: number;
    zoom?: number;
    ratio?: RatioType,
    disabledPrev?: boolean,
    disabledNext?: boolean,
    disableDownload?: boolean,
    onDownload?: () => void,
    onNext?: () => void,
    onPrev?: () => void,
    onZoomIn?: () => void,
    onZoomOut?: () => void,
    onRatioClick?: () => void,
    onRotateLeft?: () => void,
    onRotateRight?: () => void,
}

export type RatioType = "adaptation" | "realSize";

export interface PreviewInnerStates {
    imgSrc?: string[];
    imgLoadStatus?: Map<string, boolean>;
    zoom?: number;
    rotation?: number;
    ratio?: RatioType;
    currentIndex?: number;
    viewerVisible?: boolean;
    visible?: boolean;
    preloadAfterVisibleChange?: boolean;
    direction?: string;
}

export interface SliderProps {
    max?: number;
    min?: number;
    step?: number;
}

export interface HeaderProps {
    renderHeader?: (info: any) => VueJsxNode,
    title?: string;
    titleStyle?: CSSProperties;
    className?: string;
    onClose?: () => void;
}

export interface FooterProps extends SliderProps {
    curPage?: number;
    totalNum?: number;
    disabledPrev?: boolean;
    disabledNext?: boolean;
    disableDownload?: boolean;
    className?: string;
    zoom?: number;
    ratio?: RatioType;
    prevTip?: string;
    nextTip?: string;
    zoomInTip?: string;
    zoomOutTip?: string;
    rotateTip?: string;
    downloadTip?: string;
    adaptiveTip?: string;
    originTip?: string;
    showTooltip?: boolean;
    onZoomIn?: (zoom: number) => void;
    onZoomOut?: (zoom: number) => void;
    onPrev?: () => void;
    onNext?: () => void;
    onAdjustRatio?: (type: RatioType) => void;
    onRotate?: (direction: string) => void;
    onDownload?: () => void;
    renderPreviewMenu?: (props: MenuProps) => VueJsxNode;
}

export interface PreviewImageProps {
    src?: string;
    rotation?: number;
    style?: CSSProperties;
    maxZoom?: number;
    minZoom?: number;
    zoomStep?: number;
    zoom?: number;
    ratio?: RatioType;
    disableDownload?: boolean;
    clickZoom?: number;
    setRatio?: (type: RatioType) => void;
    onZoom?: (zoom: number) => void;
    onLoad?: (src: string) => void;
    onError?: (src: string) => void;
}

export interface ImageOffset {
    x: number;
    y: number;
}

export interface PreviewImageStates {
    loading: boolean;
    width: number;
    height: number;
    offset: ImageOffset;
    currZoom: number;
    top: number;
    left: number;
}

export interface DragDirection {
    canDragVertical: boolean;
    canDragHorizontal: boolean;
}

export interface ExtremeBounds {
    left: number;
    top: number;
}

export interface PreviewState {
    currentIndex: number;
    visible: boolean;
}
