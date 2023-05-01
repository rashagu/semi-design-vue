import { PreviewContext } from "./previewContext";
import * as PropTypes from "../PropTypes";
import {ImageProps, PreviewProps, PreviewState} from "./interface";
import PreviewInner from "./previewInner";
import PreviewFoundation from "@douyinfe/semi-foundation/image/previewFoundation";
import { getUuidShort } from "@douyinfe/semi-foundation/utils/uuid";
import { cssClasses } from "@douyinfe/semi-foundation/image/constants";
import { isObject } from "lodash";
import "@douyinfe/semi-foundation/image/image.scss";
import {defineComponent, h, reactive, useSlots, ref, Fragment, onMounted, watch, cloneVNode, VNode} from "vue";
import {vuePropsMake} from "../PropTypes";
import {getProps, useBaseComponent} from "../_base/baseComponent";
import {VueJsxNode} from "../interface";
import {getFragmentChildren} from "../_utils";

const prefixCls = cssClasses.PREFIX;


const propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    visible: PropTypes.bool,
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    currentIndex: PropTypes.number,
    defaultIndex: PropTypes.number,
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
    disableDownload: PropTypes.bool,
    zIndex: PropTypes.number,
    renderHeader: PropTypes.func,
    renderPreviewMenu: PropTypes.func,
    getPopupContainer: PropTypes.func,
    onVisibleChange: PropTypes.func,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onDownload: PropTypes.func,
    onRatioChange: PropTypes.func,
    onRotateChange: PropTypes.func,
}

const defaultProps = {
    src: [],
    lazyLoad: true,
    lazyLoadMargin: "0px 100px 100px 0px",
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Preview = defineComponent<PreviewProps>((props, {}) => {

    const slots = useSlots()
    const state = reactive({
        currentIndex: props.currentIndex || props.defaultIndex || 0,
        visible: props.visible || props.defaultVisible || false,
    });

    const {adapter: adapterInject} = useBaseComponent<PreviewProps>(props, state)
    function adapter_() {
        return {
            ...adapterInject(),
        };
    }
    const adapter = adapter_()
    const foundation = new PreviewFoundation(adapter);
    const previewGroupId = getUuidShort({ prefix: "semi-image-preview-group", length: 4 });
    const previewRef = ref();
    const previewObserver = new IntersectionObserver(entries => {
          entries.forEach(item => {
              const src = (item.target as any).dataset?.src;
              if (item.isIntersecting && src) {
                  (item.target as any).src = src;
                  (item.target as any).removeAttribute("data-src");
                  previewObserver.unobserve(item.target);
              }
          });
      },
      {
          root: document.querySelector(`#${previewGroupId}`),
          rootMargin: props.lazyLoadMargin,
      }
    );

    onMounted(()=>{

        const { lazyLoadMargin } = props;
        const allElement = document.querySelectorAll(`.${prefixCls}-img`);
        // use IntersectionObserver to lazy load image
        const observer = new IntersectionObserver(entries => {
              entries.forEach(item => {
                  const src = (item.target as any).dataset?.src;
                  if (item.isIntersecting && src) {
                      (item.target as any).src = src;
                      observer.unobserve(item.target);
                  }
              });
          },
          {
              root: document.querySelector(`#${previewGroupId}`),
              rootMargin: lazyLoadMargin,
          }
        );
        allElement.forEach(item => observer.observe(item));
    })


    function getDerivedStateFromProps(props: PreviewProps, state: PreviewState) {
        const willUpdateStates: Partial<PreviewState> = {};
        if (("currentIndex" in getProps(props)) && (props.currentIndex !== state.currentIndex)) {
            willUpdateStates.currentIndex = props.currentIndex;
        }
        if (("visible" in getProps(props)) && (props.visible !== state.visible)) {
            willUpdateStates.visible = props.visible;
        }
        return willUpdateStates;
    }

    watch(()=>props, (val)=>{
        const newState = getDerivedStateFromProps(props, state)
        newState && Object.keys(newState).forEach(key=>{
            state[key] = newState[key]
        })
    }, {deep: true})

    const handleVisibleChange = (newVisible : boolean) => {
        foundation.handleVisibleChange(newVisible);
    };

    const handleCurrentIndexChange = (index: number) => {
        foundation.handleCurrentIndexChange(index);
    };

    const loopImageIndex = () => {
        const children = getFragmentChildren(slots)
        let index = 0;
        const srcListInChildren = [];
        const titles: VueJsxNode = [];
        const loop = (children:VNode[]) => {
            return children.map((child) => {
                if (child && child.props && child.type) {
                    // @ts-ignore
                    if (child.type.isSemiImage) {
                        const { src, preview, alt } = child.props;
                        if (preview || preview === undefined) {
                            const previewSrc = isObject(preview) ? ((preview as any).src ?? src) : src;
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
        const { src, style, lazyLoad, ...restProps } = props;
        const { currentIndex, visible } = state;
        const { srcListInChildren, newChildren, titles } = loopImageIndex();
        const srcArr = Array.isArray(src) ? src : (typeof src === "string" ? [src] : []);
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
            }}
          >
              <div id={previewGroupId} style={style} class={`${prefixCls}-preview-group`}>
                  {newChildren}
              </div>
              <PreviewInner
                {...restProps}
                ref={previewRef}
                src={finalSrcList}
                currentIndex={currentIndex}
                visible={visible}
                onVisibleChange={handleVisibleChange}
              />
          </PreviewContext.Provider>
        );
    }
})

Preview.props = vuePropsType
Preview.name = 'Preview'

export default Preview


