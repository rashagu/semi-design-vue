import {PreviewProps as PreviewInnerProps, PreviewInnerStates, RatioType, PreviewImageProps} from "./interface";
import * as PropTypes from "../PropTypes";
import {cssClasses} from "@douyinfe/semi-foundation/image/constants";
import cls from "classnames";
import {isEqual, isFunction} from "lodash";
import Portal from "../_portal";
import {IconArrowLeft, IconArrowRight} from "@kousum/semi-icons-vue";
import Header from "./previewHeader";
import Footer from "./previewFooter";
import PreviewImage from "./previewImage";
import PreviewInnerFoundation from "@douyinfe/semi-foundation/image/previewInnerFoundation";
import type {PreviewInnerAdapter} from "@douyinfe/semi-foundation/image/previewInnerFoundation";
import { getScrollbarWidth } from "../_utils";

import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted, PropType,
  reactive,
  useSlots,
  watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {usePreviewContext} from "./previewContext/Consumer";
import {getProps, useBaseComponent} from "../_base/baseComponent";
import {AnchorProps} from "../anchor";

const prefixCls = cssClasses.PREFIX;

let startMouseDown = {x: 0, y: 0};

let mouseActiveTime: number = null;
let stopTiming = false;
let timer = null;
// let bodyOverflowValue = document.body.style.overflow;


const propTypes:ComponentObjectPropsOptions<PreviewInnerProps> = {
  style: PropTypes.object,
  className: PropTypes.string,
  lazyLoadMargin: PropTypes.string,
  visible: PropTypes.bool,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  currentIndex: PropTypes.number,
  defaultCurrentIndex: PropTypes.number,
  defaultVisible: PropTypes.bool,
  maskClosable: PropTypes.bool,
  closable: PropTypes.bool,
  zoomStep: PropTypes.number,
  infinite: PropTypes.bool,
  showTooltip: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  prevTip: PropTypes.string,
  nextTip: PropTypes.string,
  zoomInTip: PropTypes.string,
  zoomOutTip: PropTypes.string,
  downloadTip: PropTypes.string,
  adaptiveTip: PropTypes.string,
  originTip: PropTypes.string,
  lazyLoad: PropTypes.bool,
  preLoad: PropTypes.bool,
  preLoadGap: PropTypes.number,
  disableDownload: PropTypes.bool,
  viewerVisibleDelay: PropTypes.number,
  zIndex: PropTypes.number,
  renderHeader: PropTypes.func as PropType<PreviewInnerProps['renderHeader']>,
  renderPreviewMenu: PropTypes.func as PropType<PreviewInnerProps['renderPreviewMenu']>,
  getPopupContainer: PropTypes.func as PropType<PreviewInnerProps['getPopupContainer']>,
  onVisibleChange: PropTypes.func as PropType<PreviewInnerProps['onVisibleChange']>,
  onChange: PropTypes.func as PropType<PreviewInnerProps['onChange']>,
  onClose: PropTypes.func as PropType<PreviewInnerProps['onClose']>,
  onZoomIn: PropTypes.func as PropType<PreviewInnerProps['onZoomIn']>,
  onZoomOut: PropTypes.func as PropType<PreviewInnerProps['onZoomOut']>,
  onPrev: PropTypes.func as PropType<PreviewInnerProps['onPrev']>,
  onNext: PropTypes.func as PropType<PreviewInnerProps['onNext']>,
  onDownload: PropTypes.func as PropType<PreviewInnerProps['onDownload']>,
  onRatioChange: PropTypes.func as PropType<PreviewInnerProps['onRatioChange']>,
  onRotateChange: PropTypes.func as PropType<PreviewInnerProps['onRotateChange']>,
  // onRotateLeft: PropTypes.func as PropType<PreviewInnerProps['onRotateLeft']>,
}

const defaultProps = {
  showTooltip: false,
  zoomStep: 0.1,
  infinite: false,
  closeOnEsc: true,
  lazyLoad: false,
  preLoad: true,
  preLoadGap: 2,
  zIndex: 1000,
  maskClosable: true,
  viewerVisibleDelay: 10000,
};
export const vuePropsType = vuePropsMake<PreviewInnerProps>(propTypes, defaultProps)
const PreviewInner = defineComponent<PreviewInnerProps>((props, {}) => {

  const slots = useSlots()

  let bodyOverflow: string;
  let scrollBarWidth: number;
  let originBodyWidth: string;
  const state = reactive<PreviewInnerStates>({
    imgSrc: [],
    imgLoadStatus: new Map(),
    zoom: 0.1,
    currentIndex: 0,
    ratio: "adaptation",
    rotation: 0,
    viewerVisible: true,
    visible: false,
    preloadAfterVisibleChange: true,
    direction: "",
  });
  const {adapter: adapterInject} = useBaseComponent<PreviewInnerProps>(props, state)
  const {context} = usePreviewContext()

  function adapter_(): PreviewInnerAdapter<PreviewInnerProps, PreviewInnerStates> {
    return {
      ...adapterInject(),
      getIsInGroup: () => isInGroup(),
      disabledBodyScroll: () => {
        const { getPopupContainer } = props;
        bodyOverflow = document.body.style.overflow || '';
        if (!getPopupContainer && bodyOverflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          document.body.style.width = `calc(${originBodyWidth || '100%'} - ${scrollBarWidth}px)`;
        }
      },
      enabledBodyScroll: () => {
        const { getPopupContainer } = props;
        if (!getPopupContainer && bodyOverflow !== 'hidden') {
          document.body.style.overflow = bodyOverflow;
          document.body.style.width = originBodyWidth;
        }
      },
      notifyChange: (index: number, direction: string) => {
        const { onChange, onPrev, onNext } = props;
        isFunction(onChange) && onChange(index);
        if (direction === "prev") {
          onPrev && onPrev(index);
        } else {
          onNext && onNext(index);
        }
      },
      notifyZoom: (zoom: number, increase: boolean) => {
        const {onZoomIn, onZoomOut} = props;
        if (increase) {
          isFunction(onZoomIn) && onZoomIn(zoom);
        } else {
          isFunction(onZoomOut) && onZoomOut(zoom);
        }
      },
      notifyClose: () => {
        const {onClose} = props;
        isFunction(onClose) && onClose();
      },
      notifyVisibleChange: (visible: boolean) => {
        const {onVisibleChange} = props;
        isFunction(onVisibleChange) && onVisibleChange(visible);
      },
      notifyRatioChange: (type: string) => {
        const {onRatioChange} = props;
        isFunction(onRatioChange) && onRatioChange(type as "adaptation" | "realSize");
      },
      notifyRotateChange: (angle: number) => {
        const {onRotateChange} = props;
        isFunction(onRotateChange) && onRotateChange(angle);
      },
      notifyDownload: (src: string, index: number) => {
        const {onDownload} = props;
        isFunction(onDownload) && onDownload(src, index);
      },
      registerKeyDownListener: () => {
        window && window.addEventListener("keydown", handleKeyDown);
      },
      unregisterKeyDownListener: () => {
        window && window.removeEventListener("keydown", handleKeyDown);
      },
      getMouseActiveTime: () => {
        return mouseActiveTime;
      },
      getStopTiming: () => {
        return stopTiming;
      },
      setStopTiming: (value) => {
        stopTiming = value;
      },
      getStartMouseDown: () => {
        return startMouseDown;
      },
      setStartMouseDown: (x: number, y: number) => {
        startMouseDown = {x, y};
      },
      setMouseActiveTime: (time: number) => {
        mouseActiveTime = time;
      },
      getSetDownloadFunc: () => {
        return context.value?.setDownloadName ?? props.setDownloadName;
      },
    };

  }

  const adapter = adapter_()
  let timer;
  const foundation = new PreviewInnerFoundation(adapter);

  function getDerivedStateFromProps(props: PreviewInnerProps, state: PreviewInnerStates) {
    const willUpdateStates: Partial<PreviewInnerStates> = {};
    let src = [];
    if (props.visible) {
      // if src in props
      src = Array.isArray(props.src) ? props.src : [props.src];
    }
    if (!isEqual(src, state.imgSrc)) {
      willUpdateStates.imgSrc = src;
    }
    if (props.visible !== state.visible) {
      willUpdateStates.visible = props.visible;
      if (props.visible) {
        willUpdateStates.preloadAfterVisibleChange = true;
      }
    }
    if ("currentIndex" in getProps(props) && props.currentIndex !== state.currentIndex) {
      willUpdateStates.currentIndex = props.currentIndex;
      // ratio will set to adaptation when change picture,
      // attention: If the ratio is controlled, the ratio should not change as the index changes
      willUpdateStates.ratio = 'adaptation';
    }
    return willUpdateStates;
  }

  watch(() => props, (val) => {
    const newState = getDerivedStateFromProps(props, state)
    if (newState) {
      Object.keys(newState).forEach(key => {
        state[key] = newState[key]
      })
    }
  }, {deep: true, immediate: true})

  onMounted(()=>{
    scrollBarWidth = getScrollbarWidth();
    originBodyWidth = document.body.style.width;
    if (props.visible) {
      foundation.beforeShow();
    }
  })

  watch([() => state.visible, () => props.visible], (value, [prevStateVisible, prevPropsVisible], onCleanup) => {
    if (prevStateVisible !== props.visible && props.visible) {
      mouseActiveTime = new Date().getTime();
      timer && clearInterval(timer);
      timer = setInterval(viewVisibleChange, 1000);
    }
    // hide => show
    if (!prevStateVisible && props.visible) {
      foundation.beforeShow();
    }
    // show => hide
    if (prevStateVisible && !props.visible) {
      foundation.afterHide();
    }
  }, {immediate: true})

  onBeforeUnmount(() => {
    timer && clearInterval(timer);
  })


  function isInGroup() {
    return Boolean(context && context.value.isGroup);
  }

  function viewVisibleChange(){
    foundation.handleViewVisibleChange();
  }

  const handleSwitchImage = (direction: string) => {
    foundation.handleSwitchImage(direction);
  }

  const handleDownload = () => {
    foundation.handleDownload();
  }

  const handlePreviewClose = () => {
    foundation.handlePreviewClose();
  }

  const handleAdjustRatio = (type: RatioType) => {
    foundation.handleAdjustRatio(type);
  }

  const handleRotateImage = (direction) => {
    foundation.handleRotateImage(direction);
  }

  const handleZoomImage = (newZoom: number) => {
    foundation.handleZoomImage(newZoom);
  }

  const handleMouseUp = (e): void => {
    foundation.handleMouseUp(e);
  }

  const handleMouseMove = (e): void => {
    foundation.handleMouseMove(e);
  }

  const handleMouseEvent = (e, event: string) => {
    foundation.handleMouseMoveEvent(e, event);
  }

  function handleKeyDown (e: KeyboardEvent) {
    foundation.handleKeyDown(e);
  }

  function onImageError() {
    foundation.preloadSingleImage();
  }

  function onImageLoad(src) {
    foundation.onImageLoad(src);
  }

  function handleMouseDown(e): void {
    foundation.handleMouseDown(e);
  }


  return () => {
    const {
      getPopupContainer,
      zIndex,
      visible,
      className,
      style,
      infinite,
      zoomStep,
      crossOrigin,
      prevTip,
      nextTip,
      zoomInTip,
      zoomOutTip,
      rotateTip,
      downloadTip,
      adaptiveTip,
      originTip,
      showTooltip,
      disableDownload,
      renderPreviewMenu,
      renderHeader,
    } = props;
    const {currentIndex, imgSrc, zoom, ratio, rotation, viewerVisible} = state;
    let wrapperStyle: CSSProperties = {
      zIndex,
    };

    if (getPopupContainer) {
      wrapperStyle = {
        zIndex,
        position: "static",
      };
    }
    const previewPrefixCls = `${prefixCls}-preview`;
    const previewWrapperCls = cls(previewPrefixCls,
      {
        [`${prefixCls}-hide`]: !visible,
        [`${previewPrefixCls}-popup`]: getPopupContainer,
      },
      className,
    );
    const hideViewerCls = !viewerVisible ? `${previewPrefixCls}-hide` : "";
    const total = imgSrc.length;
    const showPrev = total !== 1 && (infinite || currentIndex !== 0);
    const showNext = total !== 1 && (infinite || currentIndex !== total - 1);
    return (
      <Portal
        getPopupContainer={getPopupContainer}
        style={wrapperStyle}
      >
        {visible &&
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            class={previewWrapperCls}
            style={style}
            onMousedown={handleMouseDown}
            onMouseup={handleMouseUp}
            onMousemove={handleMouseMove}
            onMouseover={(e): void => handleMouseEvent(e, "over")}
            onMouseout={(e): void => handleMouseEvent(e, "out")}
          >
            <Header className={cls(hideViewerCls)} onClose={handlePreviewClose} renderHeader={renderHeader}/>
            <PreviewImage
              src={imgSrc[currentIndex]}
              onZoom={handleZoomImage}
              disableDownload={disableDownload}
              setRatio={handleAdjustRatio}
              zoom={zoom}
              ratio={ratio}
              zoomStep={zoomStep}
              rotation={rotation}
              crossOrigin={crossOrigin}
              onError={onImageError}
              onLoad={onImageLoad}
            />
            {showPrev && (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                class={cls(`${previewPrefixCls}-icon`, `${previewPrefixCls}-prev`, hideViewerCls)}
                onClick={(): void => handleSwitchImage("prev")}
              >
                <IconArrowLeft size="large"/>
              </div>
            )}
            {showNext && (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                class={cls(`${previewPrefixCls}-icon`, `${previewPrefixCls}-next`, hideViewerCls)}
                onClick={(): void => handleSwitchImage("next")}
              >
                <IconArrowRight size="large"/>
              </div>
            )}
            <Footer
              className={hideViewerCls}
              totalNum={total}
              curPage={currentIndex + 1}
              disabledPrev={!showPrev}
              disabledNext={!showNext}
              zoom={zoom * 100}
              step={zoomStep * 100}
              showTooltip={showTooltip}
              ratio={ratio}
              prevTip={prevTip}
              nextTip={nextTip}
              zoomInTip={zoomInTip}
              zoomOutTip={zoomOutTip}
              rotateTip={rotateTip}
              downloadTip={downloadTip}
              disableDownload={disableDownload}
              adaptiveTip={adaptiveTip}
              originTip={originTip}
              onPrev={(): void => handleSwitchImage("prev")}
              onNext={(): void => handleSwitchImage("next")}
              onZoomIn={handleZoomImage}
              onZoomOut={handleZoomImage}
              onDownload={handleDownload}
              onRotate={handleRotateImage}
              onAdjustRatio={handleAdjustRatio}
              renderPreviewMenu={renderPreviewMenu}
            />
          </div>}
      </Portal>
    );
  }
}, {
  props: vuePropsType,
  name: 'PreviewInner'
})


export default PreviewInner
