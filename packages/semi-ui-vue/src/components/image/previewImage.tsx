import { cssClasses } from '@douyinfe/semi-foundation/image/constants';
import { FooterProps, PreviewImageProps, PreviewImageStates, PreviewProps } from './interface';
import * as PropTypes from '../PropTypes';
import Spin from '../spin';
import PreviewImageFoundation, { PreviewImageAdapter } from '@douyinfe/semi-foundation/image/previewImageFoundation';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
import { CombineProps } from '../interface';

const prefixCls = cssClasses.PREFIX;
const preViewImgPrefixCls = `${prefixCls}-preview-image`;

const propTypes: CombineProps<PreviewImageProps> = {
  src: PropTypes.string,
  rotation: PropTypes.number,
  style: PropTypes.object,
  // maxZoom: PropTypes.number,
  // minZoom: PropTypes.number,
  // zoomStep: PropTypes.number,
  zoom: PropTypes.number,
  ratio: PropTypes.string as PropType<PreviewImageProps['ratio']>,
  disableDownload: PropTypes.bool as PropType<PreviewImageProps['disableDownload']>,
  clickZoom: PropTypes.number,
  setRatio: PropTypes.func as PropType<PreviewImageProps['setRatio']>,
  onZoom: PropTypes.func as PropType<PreviewImageProps['onZoom']>,
  onLoad: PropTypes.func as PropType<PreviewImageProps['onLoad']>,
  onError: PropTypes.func as PropType<PreviewImageProps['onError']>,
  crossOrigin: PropTypes.string as PropType<PreviewImageProps['crossOrigin']>,
};

const defaultProps = {
  // maxZoom: 5,
  // minZoom: 0.1,
  // zoomStep: 0.1,
  zoom: undefined,
};
export const vuePropsType = vuePropsMake<PreviewImageProps>(propTypes, defaultProps);
const PreviewImage = defineComponent({
  props: { ...vuePropsType },
  name: 'PreviewImage',
  setup(props, {expose}) {
    const slots = useSlots();

    const state = reactive<PreviewImageStates>({
      width: 0,
      height: 0,
      loading: true,
      translate: {
        x: 0,
        y: 0
      },
      currZoom: props.zoom
    });
    const { adapter: adapterInject } = useBaseComponent<PreviewImageProps>(props, state);
    function adapter_(): PreviewImageAdapter<PreviewImageProps, PreviewImageStates> {
      return {
        ...adapterInject<PreviewImageProps, PreviewImageStates>(),
        getContainer: () => {
          return containerRef.value;
        },
        getImage: () => {
          return imageRef.value;
        },
        setLoading: (loading: boolean) => {
          state.loading = loading;
        },
        setImageCursor: (canDrag: boolean) => {
          imageRef.value.style.cursor = canDrag ? 'grab' : 'default';
        },
      };
    }
    const adapter = adapter_();
    const containerRef = ref();
    const imageRef = ref<HTMLImageElement>();
    const foundation = new PreviewImageFoundation(adapter);

    expose({
      foundation
    })
    onMounted(() => {
      foundation.init();
      window.addEventListener('resize', onWindowResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onWindowResize);
    });

    const onWindowResize = (): void => {
      foundation.handleWindowResize();
    };

    // Determine the response method of right click according to the disableDownload parameter in props
    const handleRightClickImage = (e) => {
      foundation.handleRightClickImage(e);
    };

    const handleLoad = (e): void => {
      foundation.handleLoad(e);
    };

    const handleError = (e): void => {
      foundation.handleError(e);
    };

    const handleImageMove = (e): void => {
      foundation.handleImageMove(e);
    };

    const handleMouseDown = (e: any): void => {
      foundation.handleImageMouseDown(e);
    };

    // If src changes, start a new loading
    // If the incoming zoom changes, other content changes are determined based on the new zoom value
    // When the incoming ratio is changed, if it"s adaptation, then resizeImage is triggered to make the image adapt to the page
    // else if it"s adaptation is realSize, then onZoom(1) is called to make the image size the original size;
    // When the incoming rotation angle of the image changes, it needs to be resized to make the image fit on the page
    watch(
      [
        () => props.src,
        () => props.zoom,
        () => props.ratio,
        () => props.rotation,
        () => state.currZoom,
        () => containerRef.value,
      ],
      (value, [prevPropsSrc, prevPropsZoom, prevPropsRatio, prevPropsRotation, prevStatesCurrZoom], onCleanup) => {
        const zoomChange = 'zoom' in props && props.zoom !== state.currZoom;
        const srcChange = props.src && props.src !== prevPropsSrc;
        if (srcChange) {
          foundation.setLoading(true);
        }
        // If the incoming zoom changes, other content changes are determined based on the new zoom value
        // if (zoomChange) {
        //   foundation.calculatePreviewImage(props.zoom, null);
        // }
        if (!zoomChange && !srcChange) {
          if ('ratio' in props && props.ratio !== prevPropsRatio) {
            foundation.handleRatioChange();
          }
          if ('rotation' in props && props.rotation !== prevPropsRotation) {
            onWindowResize();
          }
        }
      }
    );

    return () => {
      const { src, rotation, crossOrigin } = props;
      const { loading, width, height, translate } = state;
      const imgStyle: CSSProperties = {
        position: "absolute",
        visibility: loading ? "hidden" : "visible",
        transform: `translate(${translate.x}px, ${translate.y}px) rotate(${rotation}deg)`,
        width: `${width}px`,
        height: `${height}px`,
      };
      return (
        <div class={`${preViewImgPrefixCls}`} ref={containerRef}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            ref={imageRef}
            src={src}
            alt="previewImag"
            class={`${preViewImgPrefixCls}-img`}
            key={src}
            onMousemove={handleImageMove}
            onMousedown={handleMouseDown}
            onContextmenu={handleRightClickImage}
            onDragstart={(e): void => e.preventDefault()}
            onLoad={handleLoad}
            onError={handleError}
            style={imgStyle}
            crossorigin={crossOrigin}
          />
          {loading && <Spin size={'large'} wrapperClassName={`${preViewImgPrefixCls}-spin`} />}
        </div>
      );
    };
  },
});

export default PreviewImage;
