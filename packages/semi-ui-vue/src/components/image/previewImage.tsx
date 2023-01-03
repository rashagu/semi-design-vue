import { cssClasses } from "@douyinfe/semi-foundation/image/constants";
import {PreviewImageProps, PreviewImageStates, PreviewProps} from "./interface";
import * as PropTypes from "../PropTypes";
import Spin from "../spin";
import PreviewImageFoundation, { PreviewImageAdapter } from "@douyinfe/semi-foundation/image/previewImageFoundation";
import {CSSProperties, defineComponent, h, onMounted, onUnmounted, reactive, ref, useSlots, watch} from "vue";
import {vuePropsMake} from "../PropTypes";
import {getProps, useBaseComponent} from "../_base/baseComponent";

const prefixCls = cssClasses.PREFIX;
const preViewImgPrefixCls = `${prefixCls}-preview-image`;
let originImageWidth = null;
let originImageHeight = null;
let startMouseMove = false;
// startMouseOffset：The offset of the mouse relative to the left and top of the picture
let startMouseOffset = { x: 0, y: 0 };


const propTypes = {
    src: PropTypes.string,
    rotation: PropTypes.number,
    style: PropTypes.object,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    zoomStep: PropTypes.number,
    zoom: PropTypes.number,
    ratio: PropTypes.string,
    disableDownload: PropTypes.number,
    clickZoom: PropTypes.number,
    setRatio: PropTypes.func,
    onZoom: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
}

const defaultProps = {
    maxZoom: 5,
    minZoom: 0.1,
    zoomStep: 0.1,
    zoom: undefined,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const PreviewImage = defineComponent<PreviewImageProps>((props, {}) => {

    const slots = useSlots()

    const state = reactive<PreviewImageStates>({
        width: 0,
        height: 0,
        loading: true,
        offset: { x: 0, y: 0 },
        currZoom: 0,
        top: 0,
        left: 0,
    });
    const {adapter: adapterInject} = useBaseComponent<PreviewImageProps>(props, state)
    function adapter_(): PreviewImageAdapter<PreviewImageProps, PreviewImageStates> {
        return {
            ...adapterInject<PreviewImageProps, PreviewImageStates>(),
            getOriginImageSize: () => ({ originImageWidth, originImageHeight }),
            setOriginImageSize: (size: { originImageWidth: number; originImageHeight: number; }) => {
                originImageWidth = size.originImageWidth;
                originImageHeight = size.originImageHeight;
            },
            getContainer: () => {
                return containerRef.value;
            },
            getImage: () => {
                return imageRef.value;
            },
            getMouseMove: () => startMouseMove,
            setStartMouseMove: (move: boolean) => { startMouseMove = move; },
            getMouseOffset: () => startMouseOffset,
            setStartMouseOffset: (offset: { x: number; y: number }) => { startMouseOffset = offset; },
            setLoading: (loading: boolean) => {
                state.loading = loading
            },
            setImageCursor: (canDrag: boolean) => {
                imageRef.value.style.cursor = canDrag ? "grab" : "default";
            }
        };
    }
    const adapter = adapter_()
    const containerRef = ref();
    const imageRef = ref();
    const foundation = new PreviewImageFoundation(adapter);

    onMounted(()=> {
        window.addEventListener("resize", onWindowResize);
    })

    onUnmounted(()=> {
        window.removeEventListener("resize", onWindowResize);
    })



    const onWindowResize = (): void => {
        foundation.handleWindowResize();
    };

    const handleZoomChange = (newZoom, e): void => {
        foundation.handleZoomChange(newZoom, e);
    };

    // Determine the response method of right click according to the disableDownload parameter in props
    const handleRightClickImage = (e) => {
        foundation.handleRightClickImage(e);
    };

    const handleWheel = (e) => {
        foundation.handleWheel(e);
    }

    const handleLoad = (e): void => {
        foundation.handleLoad(e);
    }

    const handleError = (e): void => {
        foundation.handleError(e);
    }

    const resizeImage = () => {
        foundation.handleResizeImage();
    }

    const handleMoveImage = (e): void => {
        foundation.handleMoveImage(e);
    };

    // 为什么通过ref注册wheel而不是使用onWheel事件？
    // 因为对于wheel事件，浏览器将 addEventListener 的 passive 默认值更改为 true。如此，事件监听器便不能取消事件，也不会在用户滚动页面时阻止页面呈现。
    // 这里我们需要保持页面不动，仅放大图片，因此此处需要将 passive 更改设置为 false。
    // Why register wheel via ref instead of using onWheel event?
    // Because for wheel events, the browser changes the passive default of addEventListener to true. This way, the event listener cannot cancel the event, nor prevent the page from rendering when the user scrolls.
    // Here we need to keep the page still and only zoom in on the image, so here we need to set the passive change to false.
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners。

    const registryImageRef = (ref): void => {
        if (imageRef && imageRef.value) {
            imageRef.value.removeEventListener("wheel", handleWheel);
        }
        if (ref) {
            ref.addEventListener("wheel", handleWheel, { passive: false });
        }
        imageRef.value = ref;
    };

    const onImageMouseDown = (e: any): void => {
        foundation.handleImageMouseDown(e);
    };

    const onImageMouseUp = (): void => {
        foundation.handleImageMouseUp();
    };





    // If src changes, start a new loading
    // If the incoming zoom changes, other content changes are determined based on the new zoom value
    // When the incoming ratio is changed, if it"s adaptation, then resizeImage is triggered to make the image adapt to the page
    // else if it"s adaptation is realSize, then onZoom(1) is called to make the image size the original size;
    // When the incoming rotation angle of the image changes, it needs to be resized to make the image fit on the page
    watch(()=>props.src, (value, oldValue, onCleanup)=>{
        if (value && oldValue !== value) {
            foundation.setLoading(true);
        }
    })

    watch(()=>props.zoom, (value, oldValue, onCleanup)=>{
        if ("zoom" in getProps(props) && value !== oldValue) {
            handleZoomChange(props.zoom, null);
        }
    }, {immediate: true})

    watch(()=>props.ratio, (value, oldValue, onCleanup)=>{
        if ("ratio" in getProps(props) && props.ratio !== oldValue) {
            if (originImageWidth && originImageHeight) {
                if (props.ratio === "adaptation") {
                    resizeImage();
                } else {
                    props.onZoom(1);
                }
            }
        }
    })

    watch(()=>props.rotation, (value, oldValue, onCleanup)=>{
        if ("rotation" in getProps(props) && props.rotation !== oldValue) {
            onWindowResize();
        }
    })

    return () => {
        const { src, rotation, crossOrigin } = props;
        const { loading, width, height, top, left } = state;
        const imgStyle:CSSProperties = {
            position: "absolute",
            visibility: loading ? "hidden" : "visible",
            transform: `rotate(${-rotation}deg)`,
            top: top + 'px',
            left: left + 'px',
            width: loading ? "auto" : `${width}px`,
            height: loading ? "auto" : `${height}px`,
        };
        return (
          <div
            class={`${preViewImgPrefixCls}`}
            ref={containerRef}
          >
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
              <img
                ref={registryImageRef}
                src={src}
                alt="previewImag"
                class={`${preViewImgPrefixCls}-img`}
                key={src}
                onMousemove={handleMoveImage}
                onMousedown={onImageMouseDown}
                onMouseup={onImageMouseUp}
                onContextmenu={handleRightClickImage}
                onDragstart={(e): void => e.preventDefault()}
                onLoad={handleLoad}
                onError={handleError}
                style={imgStyle}
                crossorigin={crossOrigin}
              />
              {loading && <Spin size={"large"} wrapperClassName={`${preViewImgPrefixCls}-spin`}/>}
          </div>
        );
    }
})

PreviewImage.props = vuePropsType
PreviewImage.name = 'PreviewImage'

export default PreviewImage
