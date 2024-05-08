import type {ImageProps, ImageStates} from "./interface";
import * as PropTypes from "../PropTypes";
import {cssClasses} from "@douyinfe/semi-foundation/image/constants";
import cls from "classnames";
import {IconUploadError, IconEyeOpened} from "@kousum/semi-icons-vue";
import PreviewInner from "./previewInner";
import ImageFoundation, {ImageAdapter} from "@douyinfe/semi-foundation/image/imageFoundation";
import {LocaleConsumerFunc} from "../locale/localeConsumer";
import {Locale} from "../locale/interface";
import {isBoolean, isObject, isUndefined, omit} from "lodash";
import Skeleton, {SkeletonImage} from "../skeleton";
import "@douyinfe/semi-foundation/image/image.scss";
import {
  ComponentObjectPropsOptions,
  defineComponent,
  h,
  onMounted,
  PropType,
  reactive,
  ref,
  useSlots,
  watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {usePreviewContext} from "./previewContext/Consumer";
import {useBaseComponent} from "../_base/baseComponent";

const LocaleConsumer = LocaleConsumerFunc<Locale["Image"]>()
const prefixCls = cssClasses.PREFIX;


const propTypes:ComponentObjectPropsOptions<ImageProps> = {
  style: PropTypes.object,
  className: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alt: PropTypes.string,
  placeholder: PropTypes.node,
  fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  preview: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onLoad: PropTypes.func as PropType<ImageProps['onLoad']>,
  onError: PropTypes.func as PropType<ImageProps['onError']>,
  onClick: PropTypes.func as PropType<ImageProps['onClick']>,
  crossOrigin: PropTypes.string as PropType<ImageProps['crossOrigin']>,
  imageID: PropTypes.number,
}

const defaultProps = {
  preview: true,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Image = defineComponent<ImageProps>((props, {}) => {

  const slots = useSlots()

  const {context} = usePreviewContext()

  const state = reactive<ImageStates>({
    src: "",
    loadStatus: "loading",
    previewVisible: false,
  })

  const {adapter: adapterInject} = useBaseComponent<ImageProps>(props, state)

  function adapter_(): ImageAdapter<ImageProps, ImageStates> {
    return {
      ...adapterInject<ImageProps, ImageStates>(),
      getIsInGroup: () => isInGroup(),
      // getContexts: () => context.value,
      // getContext: key => { // eslint-disable-line
      //   if (context.value && key) {
      //     // @ts-ignore
      //     return context.value[key];
      //   }
      // }
    };
  }

  const adapter = adapter_()
  const foundation = new ImageFoundation(adapter);

  const imgRef = ref()

  function getDerivedStateFromProps(props: ImageProps, state: ImageStates) {
    const willUpdateStates: Partial<ImageStates> = {};

    if (props.src !== state.src) {
      willUpdateStates.src = props.src;
      willUpdateStates.loadStatus = "loading";
    }

    if (isObject(props.preview)) {
      const { visible } = props.preview;
      if (isBoolean(visible)) {
        willUpdateStates.previewVisible = visible;
      }
    }
    return willUpdateStates;
  }

  watch([() => props.src, ()=>props.preview], () => {
    const newState = getDerivedStateFromProps({...props}, {...state})
    if (newState) {
      Object.keys(newState).forEach(key => {
        state[key] = newState[key]
      })
    }
  }, {immediate: true, deep: true})



  function isInGroup() {
    return Boolean(context && context.value.isGroup);
  }

  function isLazyLoad() {
    if (context) {
      return context.value.lazyLoad;
    }
    return false;
  }

  const handleClick = (e) => {
    foundation.handleClick(e);
  };

  const handleLoaded = (e) => {
    foundation.handleLoaded(e);
  }

  const handleError = (e) => {
    foundation.handleError(e);
  }

  const handlePreviewVisibleChange = (visible: boolean) => {
    foundation.handlePreviewVisibleChange(visible);
  }

  const renderDefaultLoading = () => {
    const {width, height} = props;
    return (
      <SkeletonImage style={{width, height}}/>
    );
  };

  const renderDefaultError = () => {
    const prefixClsName = `${prefixCls}-status`;
    return (
      <div class={prefixClsName}>
        <IconUploadError size={"extra-large"}/>
      </div>
    );
  };

  const renderLoad = () => {
    const prefixClsName = `${prefixCls}-status`;
    const {placeholder} = props;
    return (
      placeholder ? (
        <div class={prefixClsName}>
          {placeholder}
        </div>
      ) : renderDefaultLoading()
    );
  }

  const renderError = () => {
    const {fallback} = props;
    const prefixClsName = `${prefixCls}-status`;
    const fallbackNode = typeof fallback === "string" ? (
      <img style={{width: "100%", height: "100%"}} src={fallback} alt="fallback"/>) : fallback;
    return (
      fallback ? (
        <div class={prefixClsName}>
          {fallbackNode}
        </div>
      ) : renderDefaultError()
    );
  }

  const renderExtra = () => {
    const {loadStatus} = state;
    return (
      <div class={`${prefixCls}-overlay`}>
        {loadStatus === "error" && renderError()}
        {loadStatus === "loading" && renderLoad()}
      </div>
    );
  }

  const getLocalTextByKey = (key: string) => (
    <LocaleConsumer componentName="Image">
      {(locale: Locale["Image"]) => locale[key]}
    </LocaleConsumer>
  );

  const renderMask = () => (<div class={`${prefixCls}-mask`}>
    <div class={`${prefixCls}-mask-info`}>
      <IconEyeOpened size="extra-large"/>
      <span class={`${prefixCls}-mask-info-text`}>{getLocalTextByKey("preview")}</span>
    </div>
  </div>)


  return () => {
    const {src, loadStatus, previewVisible} = state;
    const {
      src: picSrc,
      width,
      height,
      alt,
      style,
      className,
      crossOrigin,
      preview,
      fallback,
      placeholder,
      imageID,
      setDownloadName, imgCls, imgStyle,
      ...restProps
    } = props;
    const outerStyle = Object.assign({width, height}, style);
    const outerCls = cls(prefixCls, className);
    const canPreview = loadStatus === "success" && preview && !isInGroup();
    const showPreviewCursor = preview && loadStatus === "success";
    const previewSrc = isObject(preview) ? (preview.src ?? src) : src;
    const previewProps = isObject(preview) && canPreview ? {
      ...omit(preview, ['className', 'style', 'previewCls', 'previewStyle']),
      className: preview?.previewCls,
      style: preview?.previewStyle
    }: {} as any;
    return (
      // eslint-disable jsx-a11y/no-static-element-interactions
      // eslint-disable jsx-a11y/click-events-have-key-events
      <div
        style={outerStyle}
        class={outerCls}
        onClick={handleClick}
      >
        <img
          ref={imgRef}
          {...restProps}
          src={isInGroup() && isLazyLoad() ? undefined : src}
          data-src={src}
          alt={alt}
          style={imgStyle}
          class={cls(`${prefixCls}-img`, {
            [`${prefixCls}-img-preview`]: showPreviewCursor,
            [`${prefixCls}-img-error`]: loadStatus === "error",
            [imgCls]: Boolean(imgCls),
          })}
          width={parseInt('' + width)}
          height={height ? parseInt('' + height) : height}
          crossorigin={crossOrigin}
          onError={handleError}
          onLoad={handleLoaded}
        />
        {loadStatus !== "success" && renderExtra()}
        {canPreview &&
          <PreviewInner
            {...previewProps}
            src={previewSrc}
            visible={previewVisible}
            onVisibleChange={handlePreviewVisibleChange}
            crossOrigin={!isUndefined(crossOrigin) ? crossOrigin : previewProps?.crossOrigin}
            setDownloadName={setDownloadName}
          />
        }
      </div>
    );
  }
}, {
  props:vuePropsType,
  name: 'Image'
})

// @ts-ignore
Image.isSemiImage = true

export default Image


