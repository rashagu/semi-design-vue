import { PreviewContext } from './previewContext';
import * as PropTypes from '../PropTypes';
import { ImageProps, PreviewProps, PreviewState } from './interface';
import PreviewInner from './previewInner';
import PreviewFoundation from '@douyinfe/semi-foundation/image/previewFoundation';
import { getUuidShort } from '@douyinfe/semi-foundation/utils/uuid';
import { cssClasses } from '@douyinfe/semi-foundation/image/constants';
import { isObject, isEqual } from 'lodash';
import '@douyinfe/semi-foundation/image/image.scss';
import {
  defineComponent,
  h,
  reactive,
  useSlots,
  ref,
  Fragment,
  onMounted,
  watch,
  cloneVNode,
  VNode,
  isVNode,
  onBeforeUnmount,
  ComponentObjectPropsOptions,
  PropType,
  shallowRef,
  nextTick,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent, useHasInProps } from '../_base/baseComponent';
import { CombineProps, VueJsxNode } from '../interface';
import { getFragmentChildren } from '../_utils';
import cls from 'classnames';
import { omit } from 'lodash';

const prefixCls = cssClasses.PREFIX;

const propTypes: CombineProps<PreviewProps> = {
  style: PropTypes.object,
  className: PropTypes.string,
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
  lazyLoadMargin: PropTypes.string,
  preLoad: PropTypes.bool,
  preLoadGap: PropTypes.number,
  previewCls: PropTypes.string,
  previewStyle: PropTypes.object,
  disableDownload: PropTypes.bool,
  zIndex: PropTypes.number,
  renderHeader: PropTypes.func as PropType<PreviewProps['renderHeader']>,
  renderPreviewMenu: PropTypes.func as PropType<PreviewProps['renderPreviewMenu']>,
  getPopupContainer: PropTypes.func as PropType<PreviewProps['getPopupContainer']>,
  onVisibleChange: PropTypes.func as PropType<PreviewProps['onVisibleChange']>,
  onChange: PropTypes.func as PropType<PreviewProps['onChange']>,
  onClose: PropTypes.func as PropType<PreviewProps['onClose']>,
  onZoomIn: PropTypes.func as PropType<PreviewProps['onZoomIn']>,
  onZoomOut: PropTypes.func as PropType<PreviewProps['onZoomOut']>,
  onPrev: PropTypes.func as PropType<PreviewProps['onPrev']>,
  onNext: PropTypes.func as PropType<PreviewProps['onNext']>,
  onDownload: PropTypes.func as PropType<PreviewProps['onDownload']>,
  onRatioChange: PropTypes.func as PropType<PreviewProps['onRatioChange']>,
  onRotateChange: PropTypes.func as PropType<PreviewProps['onRotateChange']>,
  previewTitle: PropTypes.node as PropType<PreviewProps['previewTitle']>,
  rotateTip: PropTypes.string,
  viewerVisibleDelay: PropTypes.number,
  crossOrigin: PropTypes.string as PropType<PreviewProps['crossOrigin']>,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  onRotateLeft: PropTypes.func as PropType<PreviewProps['onRotateLeft']>,
  onDownloadError: PropTypes.func as PropType<PreviewProps['onDownloadError']>,
  setDownloadName: PropTypes.func as PropType<PreviewProps['setDownloadName']>,
  forwardRef: [Function, Object] as PropType<PreviewProps['forwardRef']>,
};

const defaultProps = {
  src: [],
  lazyLoad: true,
  lazyLoadMargin: '0px 100px 100px 0px',
  closable: true,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Preview = defineComponent({
  props: { ...vuePropsType },
  name: 'Preview',
  setup(props, {}) {
    const { getProps } = useHasInProps();
    const slots = useSlots();
    const state = reactive({
      currentIndex: props.currentIndex || props.defaultCurrentIndex || 0,
      visible: props.visible || props.defaultVisible || false,
    });

    const { adapter: adapterInject } = useBaseComponent<PreviewProps>(props, state);
    function adapter_() {
      return {
        ...adapterInject(),
      };
    }
    const adapter = adapter_();
    const foundation = new PreviewFoundation(adapter);
    const previewGroupId = getUuidShort({ prefix: 'semi-image-preview-group', length: 4 });
    const previewRef = ref();
    let previewObserver: IntersectionObserver;
    // const previewObserver = new IntersectionObserver(entries => {
    //       entries.forEach(item => {
    //           const src = (item.target as any).dataset?.src;
    //           if (item.isIntersecting && src) {
    //               (item.target as any).src = src;
    //               (item.target as any).removeAttribute("data-src");
    //               previewObserver.unobserve(item.target);
    //           }
    //       });
    //   },
    //   {
    //       root: document.querySelector(`#${previewGroupId}`),
    //       rootMargin: props.lazyLoadMargin,
    //   }
    // );

    onMounted(() => {
      props.lazyLoad && observerImages();
    });

    const children = shallowRef<VNode[]>([]);
    // 监听子元素变化
    watch([() => props.lazyLoad, children], ([a, newChildren], [_, prevPropsChildren], onCleanup) => {
      if (props.lazyLoad) {
        const prevChildrenKeys = prevPropsChildren?.map((child) => (isVNode(child) ? child.key : null));
        const currChildrenKeys = newChildren?.map((child) => (isVNode(child) ? child.key : null));

        if (!isEqual(prevChildrenKeys, currChildrenKeys)) {
          nextTick(() => {
            observerImages();
          });
        }
      }
    });

    function observerImages() {
      if (previewObserver) {
        // cancel the observation of all elements of the previous observer
        previewObserver.disconnect();
      } else {
        previewObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((item) => {
              const src = (item.target as any).dataset?.src;
              if (item.isIntersecting && src) {
                (item.target as any).src = src;
                (item.target as any).removeAttribute('data-src');
              }
              previewObserver.unobserve(item.target);
            });
          },
          {
            root: document.querySelector(`#${previewGroupId}`),
            rootMargin: props.lazyLoadMargin,
          }
        );
      }
      const allImgElement = document.querySelectorAll(`.${prefixCls}-img`);
      allImgElement.forEach((item) => previewObserver.observe(item));
    }

    function getDerivedStateFromProps(props: PreviewProps, state: PreviewState) {
      const willUpdateStates: Partial<PreviewState> = {};
      if ('currentIndex' in getProps(props) && props.currentIndex !== state.currentIndex) {
        willUpdateStates.currentIndex = props.currentIndex;
      }
      if ('visible' in getProps(props) && props.visible !== state.visible) {
        willUpdateStates.visible = props.visible;
      }
      return willUpdateStates;
    }

    watch(
      () => props,
      (val) => {
        const newState = getDerivedStateFromProps({ ...props }, { ...state });
        newState &&
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
      },
      { deep: true }
    );

    onBeforeUnmount(() => {
      if (previewObserver) {
        previewObserver.disconnect();
        previewObserver = null;
      }
    });
    const handleVisibleChange = (newVisible: boolean) => {
      foundation.handleVisibleChange(newVisible);
    };

    const handleCurrentIndexChange = (index: number) => {
      foundation.handleCurrentIndexChange(index);
    };

    const loopImageIndex = () => {
      const children = getFragmentChildren(slots);
      let index = 0;
      const srcListInChildren = [];
      const titles: VueJsxNode = [];
      const loop = (children: VNode[]) => {
        return children.map((child) => {
          if (child && child.props && child.type) {
            // @ts-ignore
            if (child.type.isSemiImage) {
              const { src, preview, alt } = child.props;
              if (preview || preview === undefined) {
                const previewSrc = isObject(preview) ? (preview as any).src ?? src : src;
                srcListInChildren.push(previewSrc);
                titles.push(preview?.previewTitle);
                return cloneVNode(child, { imageID: index++ });
              }
              return child;
            }
          }

          if (child && child.props && child.props.children) {
            return cloneVNode(child, {
              children: loop(child.props.children),
            });
          }

          return child;
        });
      };

      return {
        srcListInChildren,
        newChildren: loop(children),
        titles,
      };
    };

    // TODO 关闭后再次打开图片不显示
    return () => {
      // @ts-ignore
      children.value = slots.default?.()?.[0]?.children || [];
      const { src, className, style, lazyLoad, setDownloadName, ...restProps } = getProps(props);
      const previewInnerProps = {
        ...omit(restProps, ['previewCls', 'previewStyle']),
        className: restProps?.previewCls,
        style: restProps?.previewStyle,
      };
      const { currentIndex, visible } = state;
      const { srcListInChildren, newChildren, titles } = loopImageIndex();
      const srcArr = Array.isArray(src) ? src : typeof src === 'string' ? [src] : [];
      const finalSrcList = [...srcArr, ...srcListInChildren];
      return (
        <PreviewContext.Provider
          value={{
            isGroup: true,
            previewSrc: finalSrcList,
            titles: titles,
            currentIndex,
            visible,
            lazyLoad,
            previewObserver: previewObserver,
            setCurrentIndex: handleCurrentIndexChange,
            handleVisibleChange: handleVisibleChange,
            setDownloadName: setDownloadName,
          }}
        >
          <div id={previewGroupId} style={style} class={cls(`${prefixCls}-preview-group`, className)}>
            {newChildren}
          </div>
          <PreviewInner
            {...previewInnerProps}
            ref={previewRef}
            src={finalSrcList}
            currentIndex={currentIndex}
            visible={visible}
            onVisibleChange={handleVisibleChange}
          />
        </PreviewContext.Provider>
      );
    };
  },
});

export default Preview;
