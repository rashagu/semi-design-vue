import {PreviewInnerProps, PreviewInnerStates, RatioType, PreviewImageProps} from "./interface";
import * as PropTypes from "../PropTypes";
import {cssClasses, numbers} from "@douyinfe/semi-foundation/image/constants";
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
  reactive, ref,
  useSlots,
  watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {usePreviewContext} from "./previewContext/Consumer";
import {getProps, useBaseComponent} from "../_base/baseComponent";

const prefixCls = cssClasses.PREFIX;

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
  maxZoom: PropTypes.number as PropType<PreviewInnerProps['maxZoom']>,
  minZoom: PropTypes.number,
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

  setDownloadName: PropTypes.func as PropType<PreviewInnerProps['setDownloadName']>,
  crossOrigin: PropTypes.string as PropType<PreviewInnerProps['crossOrigin']>,
}

const defaultProps = {
  showTooltip: false,
  zoomStep: 0.1,
  infinite: false,
  closeOnEsc: true,
  lazyLoad: false,
  preLoad: true,
  preLoadGap: 2,
  zIndex: numbers.DEFAULT_Z_INDEX,
  maskClosable: true,
  viewerVisibleDelay: 10000,
  maxZoom: 5,
  minZoom: 0.1
};
export const vuePropsType = vuePropsMake<PreviewInnerProps>(propTypes, defaultProps)
const PreviewInner = defineComponent((props, {}) => {

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

  const imageWrapRef = ref()
  const headerRef = ref<HTMLElement>();
  const footerRef= ref<HTMLElement>();
  const leftIconRef= ref<HTMLDivElement>();
  const rightIconRef= ref<HTMLDivElement>();
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
      notifyDownloadError: (src: string) => {
        const { onDownloadError } = props;
        isFunction(onDownloadError) && onDownloadError(src);
      },
      registerKeyDownListener: () => {
        window && window.addEventListener("keydown", handleKeyDown);
      },
      unregisterKeyDownListener: () => {
        window && window.removeEventListener("keydown", handleKeyDown);
      },
      getSetDownloadFunc: () => {
        return context.value?.setDownloadName ?? props.setDownloadName;
      },
      isValidTarget: (e) => {
        const headerDom = headerRef.value;
        const footerDom = footerRef.value;
        const leftIconDom = leftIconRef.value;
        const rightIconDom = rightIconRef.value;
        const target = e.target as any;
        if (
          headerDom && headerDom.contains(target) ||
          footerDom && footerDom.contains(target) ||
          leftIconDom && leftIconDom.contains(target) ||
          rightIconDom && rightIconDom.contains(target)
        ) {
          // Move in the operation area, return false
          return false;
        }
        // Move in the preview area except the operation area, return true
        return true;
      }
    };

  }

  const adapter = adapter_()
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
        willUpdateStates.viewerVisible = true;
        willUpdateStates.rotation = 0;
        willUpdateStates.ratio = 'adaptation';
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
    const newState = getDerivedStateFromProps({...props}, {...state})
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

  watch([() => state.visible, () => props.visible, () => props.src], (value, [prevStateVisible, prevPropsVisible, prevPropsSrc], onCleanup) => {
    if (prevPropsSrc !== props.src) {
      foundation.updateTimer();
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
    foundation.clearTimer();
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

  const handlePreviewClose = (e: MouseEvent) => {
    foundation.handlePreviewClose(e);
  }

  const handleAdjustRatio = (type: RatioType) => {
    foundation.handleAdjustRatio(type);
  }

  const handleRotateImage = (direction) => {
    foundation.handleRotateImage(direction);
  }

  const handleZoomImage = (newZoom: number, notify: boolean = true) => {
    foundation.handleZoomImage(newZoom);
  }

  const handleMouseUp = (e): void => {
    foundation.handleMouseUp(e);
  }

  const handleMouseMove = (e): void => {
    foundation.handleMouseMove(e);
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

  const handleWheel = (e) => {
    foundation.handleWheel(e);
  }

  // 为什么通过 addEventListener 注册 wheel 事件而不是使用 onWheel 事件？
  // 因为 Passive Event Listeners（https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners）
  // Passive Event Listeners 是一种优化技术，用于提高滚动性能。在默认情况下，浏览器会假设事件的监听器不会调用
  // preventDefault() 方法来阻止事件的默认行为，从而允许进行一些优化操作，例如滚动平滑。
  // 对于 Image 而言，如果使用触控板，双指朝不同方向分开放大图片，则需要  preventDefault 防止页面整体放大。
  // Why register wheel event through addEventListener instead of using onWheel event？
  // Because of Passive Event Listeners(an optimization technique used to improve scrolling performance. By default,
  // the browser will assume that event listeners will not call preventDefault() method to prevent the default behavior of the event,
  // allowing some optimization operations such as scroll smoothing.)
  // For Image, if we use the trackpad and spread your fingers in different directions to enlarge the image, we need to preventDefault
  // to prevent the page from being enlarged as a whole.
  const registryImageWrapRef = (ref_): void => {
    if (imageWrapRef.value) {
      (imageWrapRef.value as any).removeEventListener("wheel", handleWheel);
    }
    if (ref_) {
      ref_.addEventListener("wheel", handleWheel, { passive: false });
    }
    imageWrapRef.value = ref_;
  };


  return () => {
    const {
      getPopupContainer,
      closable,
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
      visible && <Portal
        getPopupContainer={getPopupContainer}
        style={wrapperStyle}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            class={previewWrapperCls}
            style={style}
            onMousedown={handleMouseDown}
            onMouseup={handleMouseUp}
            ref={registryImageWrapRef}
            onMousemove={handleMouseMove}
          >
            <Header ref={headerRef} className={cls(hideViewerCls)} onClose={handlePreviewClose} renderHeader={renderHeader} closable={closable}/>
            <PreviewImage
              src={imgSrc[currentIndex]}
              onZoom={handleZoomImage}
              disableDownload={disableDownload}
              setRatio={handleAdjustRatio}
              zoom={zoom}
              ratio={ratio}
              rotation={rotation}
              crossOrigin={crossOrigin}
              onError={onImageError}
              onLoad={onImageLoad}
            />
            {showPrev && (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                ref={leftIconRef}
                class={cls(`${previewPrefixCls}-icon`, `${previewPrefixCls}-prev`, hideViewerCls)}
                onClick={(): void => handleSwitchImage("prev")}
              >
                <IconArrowLeft size="large"/>
              </div>
            )}
            {showNext && (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                ref={rightIconRef}
                class={cls(`${previewPrefixCls}-icon`, `${previewPrefixCls}-next`, hideViewerCls)}
                onClick={(): void => handleSwitchImage("next")}
              >
                <IconArrowRight size="large"/>
              </div>
            )}
            <Footer
              forwardRef={footerRef}
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
              zIndex={zIndex}
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
          </div>
      </Portal>
    );
  }
}, {
  props: vuePropsType,
  name: 'PreviewInner'
})


export default PreviewInner
