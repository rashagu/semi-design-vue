import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  type CSSProperties,
  PropType,
  shallowRef,
  reactive,
  watch, onMounted, onUnmounted
} from 'vue'
import {CombineProps} from '../interface';
import cls from "classnames";
import * as PropTypes from '../PropTypes';
import "@douyinfe/semi-foundation/cropper/cropper.scss";
import CropperFoundation, {
  CropperAdapter,
  ImageDataState,
  CropperBox
} from '@douyinfe/semi-foundation/cropper/foundation';
import {cssClasses, strings} from '@douyinfe/semi-foundation/cropper/constants';
import ResizeObserver, {ObserverProperty} from '../resizeObserver';
import {isUndefined} from 'lodash';
import {vuePropsMake} from "../PropTypes";
import {useBaseComponent} from "../_base/baseComponent";


interface CropperProps {
  className?: string;
  style?: CSSProperties;
  /* The address of the image that needs to be cropped */
  src?: string;
  /* Parameters that need to be transparently transmitted to the img node */
  imgProps?: HTMLImageElement;
  /* The shape to crop, defaults to rectangle */
  shape?: 'rect' | 'round' | 'roundRect';
  /* Controlled crop ratio */
  aspectRatio?: number;
  /* The initial width-to-height ratio of the cropping box, default is 1 */
  defaultAspectRatio?: number;
  /* controlled scaling */
  /* when img loaded，After the image is loaded, an initial layer of scaling
      will be performed on the image to fit the zoom area.
      The zoom parameter is to zoom based on the initial zoom.
  */
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  /* Image rotation angle */
  rotate?: number;
  /* Show crop box resizing box ?*/
  showResizeBox?: boolean;
  cropperBoxStyle?: CSSProperties;
  cropperBoxCls?: string;
  /* The fill color of the non-picture parts in the cut result */
  fill?: string;
  maxZoom?: number;
  minZoom?: number;
  zoomStep?: number
  preview?: () => HTMLElement
}

interface CropperState {
  imgData: ImageDataState;
  cropperBox: CropperBox;
  zoom: number;
  rotate: number;
  loaded: boolean
}

const prefixCls = cssClasses.PREFIX;


const propTypes: CombineProps<CropperProps> = {
  className: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string,
  imgProps: PropTypes.object,
  shape: PropTypes.string as PropType<CropperProps['shape']>,
  aspectRatio: PropTypes.number,
  defaultAspectRatio: PropTypes.number,
  zoom: PropTypes.number,
  onZoomChange: PropTypes.func as PropType<CropperProps['onZoomChange']>,

  rotate: PropTypes.number,
  showResizeBox: PropTypes.bool,
  cropperBoxStyle: PropTypes.object,
  cropperBoxCls: PropTypes.string,
  fill: PropTypes.string,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  zoomStep: PropTypes.number,

  preview: PropTypes.func as PropType<CropperProps['preview']>,
};

const defaultProps = {
  shape: 'rect',
  defaultAspectRatio: 1,
  showResizeBox: true,
  fill: 'rgba(0, 0, 0, 0)',
  maxZoom: 3,
  minZoom: 0.1,
  zoomStep: 0.1,
}

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const index = defineComponent({
  props: {...vuePropsType},
  name: 'Cropper',
  setup(props, {expose, attrs}) {
    const slots = useSlots()

    const containerRef = shallowRef<HTMLDivElement>();
    const imgRef = shallowRef<HTMLImageElement>();

    const state = reactive<CropperState>({
      imgData: {
        width: 0,
        height: 0,
        centerPoint: {
          x: 0,
          y: 0
        }
      },
      cropperBox: {
        width: 0,
        height: 0,
        centerPoint: {
          x: 0,
          y: 0,
        }
      },
      zoom: 1,
      rotate: 0,
      loaded: false,
    })
    const {adapter: adapterInject, getDataAttr} = useBaseComponent(props, state)

    function adapter_(): CropperAdapter<CropperProps, CropperState> {
      return {
        ...adapterInject(),
        getContainer: () => containerRef.value as HTMLElement,
        notifyZoomChange: (zoom: number) => {
          const {onZoomChange} = props;
          onZoomChange?.(zoom);
        },
        getImg: () => imgRef.value,
      };
    }

    const adapter = adapter_()
    const foundation = new CropperFoundation(adapter);


    function getDerivedStateFromProps(nextProps: CropperProps, prevState: CropperState) {
      const {rotate: newRotate, zoom: newZoom} = nextProps;
      const {rotate, zoom, imgData, cropperBox, loaded} = prevState;
      let nextWidth = imgData.width, nextHeight = imgData.height;
      let nextImgCenter = {...imgData.centerPoint};
      const nextState = {} as any;
      if (!loaded) {
        return null;
      }
      if (!isUndefined(newRotate) && newRotate !== rotate) {
        nextState.rotate = newRotate;
        if (loaded) {
          // 因为以裁切框的左上方顶点作为原点，所以centerPoint 的 y 坐标与实际的坐标系方向相反，
          // 因此 y 方向需要先做变换，再使用旋转变换公式计算中心点坐标
          const rotateCenter = {
            x: cropperBox.centerPoint.x,
            y: -cropperBox.centerPoint.y
          };
          const imgCenter = {
            x: imgData.centerPoint.x,
            y: -imgData.centerPoint.y
          };
          const angle = (newRotate - rotate) * Math.PI / 180;
          nextImgCenter = {
            x: (imgCenter.x - rotateCenter.x) * Math.cos(angle) + (imgCenter.y - rotateCenter.y) * Math.sin(angle) + rotateCenter.x,
            y: -(-(imgCenter.x - rotateCenter.x) * Math.sin(angle) + (imgCenter.y - rotateCenter.y) * Math.cos(angle) + rotateCenter.y),
          };
        }
      }
      if (!isUndefined(newRotate) && newZoom !== zoom) {
        nextState.zoom = newZoom;
        if (loaded) {
          // 同上
          const scaleCenter = {
            x: cropperBox.centerPoint.x,
            y: -cropperBox.centerPoint.y
          };
          const currentImgCenter = {
            x: nextImgCenter.x,
            y: -nextImgCenter.y
          };
          nextWidth = imgData.width / zoom * newZoom;
          nextHeight = imgData.height / zoom * newZoom;
          nextImgCenter = {
            x: (currentImgCenter.x - scaleCenter.x) / zoom * newZoom + scaleCenter.x,
            y: -[(currentImgCenter.y - scaleCenter.y) / zoom * newZoom + scaleCenter.y],
          };
        }
      }

      if ((newRotate !== rotate || newZoom !== zoom)) {
        nextState.imgData = {
          width: nextWidth,
          height: nextHeight,
          centerPoint: nextImgCenter,
        };
      }

      if (Object.keys(nextState).length) {
        return nextState;
      }
      return null;
    }

    function updateState() {
      const newState = getDerivedStateFromProps({...props}, {...state})
      Object.keys(newState || {}).forEach((key) => {
        // @ts-ignore
        state[key] = newState[key]
      })
    }

    watch([
      () => props.rotate,
      () => props.zoom,
      // () => state.rotate,
      // () => state.zoom,
      // () => state.imgData,
      // () => state.cropperBox,
      // () => state.loaded,
    ], () => {
      updateState()
    }, {immediate: false})

    onMounted(() => {
      foundation.init();
    })
    onUnmounted(() => {
      foundation.destroy();
      unRegisterImageWrapRef();
    })
    const unRegisterImageWrapRef = (): void => {
      if (containerRef.value) {
        (containerRef.value as any).removeEventListener("wheel", foundation.handleWheel);
      }
      containerRef.value = null;
    };

    const registryImageWrapRef = (ref: any): void => {
      //TODO 解决vue中重复执行的问题
      if(containerRef.value === ref){
        return
      }

      unRegisterImageWrapRef();
      if (ref) {
        // We need to use preventDefault to prevent the page from being enlarged when zooming in with two fingers.
        ref.addEventListener("wheel", foundation.handleWheel, {passive: false});
      }
      containerRef.value = ref;
    };

    // ref method: Get the cropped canvas
    const getCropperCanvas = () => {
      return foundation.getCropperCanvas();
    }

    expose({
      getCropperCanvas
    })

    return () => {
      const {className, style, src, shape, showResizeBox, cropperBoxStyle, cropperBoxCls} = props;
      const {imgData, cropperBox, rotate, loaded} = state;
      const imgX = imgData.centerPoint.x - imgData.width / 2;
      const imgY = imgData.centerPoint.y - imgData.height / 2;
      const cropperBoxX = cropperBox.centerPoint.x - cropperBox.width / 2;
      const cropperBoxY = cropperBox.centerPoint.y - cropperBox.height / 2;
      const cropperImgX = imgX - cropperBoxX;
      const cropperImgY = imgY - cropperBoxY;

      foundation.updatePreview({
        width: imgData.width,
        height: imgData.height,
        translateX: cropperImgX,
        translateY: cropperImgY,
        rotate: rotate,
      });

      return (<ResizeObserver
        onResize={()=>{
          foundation.handleResize()
        }}
        observerProperty={ObserverProperty.Width}
      >
        <div
          class={cls(prefixCls, className)}
          style={style}
          ref={registryImageWrapRef}
        >
          {/* Img layer */}
          <div class={cssClasses.IMG_WRAPPER}>
            <img
              ref={imgRef}
              src={src}
              onLoad={foundation.handleImageLoad}
              class={cssClasses.IMG}
              crossorigin='anonymous'
              style={{
                width: imgData.width + 'px',
                height: imgData.height + 'px',
                transformOrigin: 'center',
                transform: `translate(${imgX}px, ${imgY}px) rotate(${rotate}deg)`,
              }}
            />
          </div>
          {/* Mask layer */}
          <div
            class={cssClasses.MASK}
            onMousedown={foundation.handleMaskMouseDown}
          />
          {/* Cropper box */}
          <div
            class={cls(cssClasses.CROPPER_BOX, {
              [cropperBoxCls]: cropperBoxCls,
              [cssClasses.CROPPER_VIEW_BOX_ROUND]: shape === 'round',
            })}
            style={{
              ...cropperBoxStyle,
              width: cropperBox.width + 'px',
              height: cropperBox.height + 'px',
              transform: `translate(${cropperBoxX}px, ${cropperBoxY}px)`,
            }}
            onMousedown={foundation.handleCropperBoxMouseDown}
          >
            <div
              class={cls(cssClasses.CROPPER_VIEW_BOX, {
                [cssClasses.CROPPER_VIEW_BOX_ROUND]: shape.includes('round'),
              })}
            >
              <img
                onDragstart={foundation.viewIMGDragStart}
                class={cssClasses.CROPPER_IMG}
                src={src}
                style={{
                  width: imgData.width + 'px',
                  height: imgData.height + 'px',
                  transformOrigin: 'center',
                  transform: `translate(${cropperImgX}px, ${cropperImgY}px) rotate(${rotate}deg)`,
                }}
              />
            </div>
            {/* 裁剪框的拖拽操作按钮 */}
            {loaded && showResizeBox && (shape === 'round' ? strings.roundCorner : strings.corner).map(corner => (
              <div
                class={cls(cssClasses.CORNER, `${cssClasses.CORNER}-${corner}`)}
                data-dir={corner}
                key={corner}
                onMousedown={foundation.handleCornerMouseDown}
              />
            ))}
          </div>
        </div>
      </ResizeObserver>);
    }
  }
})


export default index

