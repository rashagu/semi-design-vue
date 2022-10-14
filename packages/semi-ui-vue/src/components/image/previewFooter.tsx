import { IconChevronLeft, IconChevronRight, IconMinus, IconPlus, IconRotate, IconDownload, IconWindowAdaptionStroked, IconRealSizeStroked, IconSize } from "@kousum/semi-icons-vue";
import {FooterProps, ImageProps} from "./interface";
import * as PropTypes from "../PropTypes";
import Tooltip from "../tooltip";
import Divider from "../divider";
import Slider from "../slider";
import Icon from "../icons";
import { cssClasses } from "@douyinfe/semi-foundation/image/constants";
import cls from "classnames";
import PreviewFooterFoundation, { PreviewFooterAdapter } from "@douyinfe/semi-foundation/image/previewFooterFoundation";
import LocaleConsumer_ from "../locale/localeConsumer";
import { Locale } from "../locale/interface";
import { throttle } from "lodash";
import {defineComponent, h, useSlots} from "vue";
import {useBaseComponent} from "../_base/baseComponent";
import {VueJsxNode} from "../interface";
import {vuePropsMake} from "../PropTypes";

const prefixCls = cssClasses.PREFIX;
const footerPrefixCls = `${cssClasses.PREFIX}-preview-footer`;
const LocaleConsumer = LocaleConsumer_<Locale["Image"]>()
let mouseActiveTime: number = 0;


const propTypes = {
    curPage: PropTypes.number,
    totalNum: PropTypes.number,
    disabledPrev: PropTypes.bool,
    disabledNext: PropTypes.bool,
    disableDownload: PropTypes.bool,
    className: PropTypes.string,
    zoom: PropTypes.number,
    ratio: PropTypes.string,
    prevTip: PropTypes.string,
    nextTip: PropTypes.string,
    zoomInTip: PropTypes.string,
    zoomOutTip: PropTypes.string,
    rotateTip: PropTypes.string,
    downloadTip: PropTypes.string,
    adaptiveTip: PropTypes.string,
    originTip: PropTypes.string,
    showTooltip: PropTypes.bool,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onAdjustRatio: PropTypes.func,
    onRotateLeft: PropTypes.func,
    onDownload: PropTypes.func,
}

const defaultProps = {
    min: 10,
    max: 500,
    step: 10,
    showTooltip: false,
    disableDownload: false,
}
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Footer = defineComponent<FooterProps>((props, {}) => {

    const slots = useSlots()

    const {adapter: adapterInject} = useBaseComponent<FooterProps>(props, {})
    function adapter_(): PreviewFooterAdapter<FooterProps> {
        return {
            ...adapterInject(),
            setStartMouseOffset: (time: number) => {
                mouseActiveTime = time;
            }
        };
    }
    const adapter = adapter_()
    const foundation = new PreviewFooterFoundation(adapter);




    const changeSliderValue = (type: string): void => {
        foundation.changeSliderValue(type);
    };

    const handleMinusClick = () => {
        changeSliderValue("minus");
    }

    const handlePlusClick = () => {
        changeSliderValue("plus");
    }

    const handleRotateLeft = () => {
        foundation.handleRotate("left");
    }

    const handleRotateRight = () => {
        foundation.handleRotate("right");
    }

    const handleSlideChange = throttle((value): void => {
        foundation.handleValueChange(value);
    }, 50);

    const handleRatioClick = (): void => {
        foundation.handleRatioClick();
    }

    const customRenderViewMenu = (): VueJsxNode => {
        const { min, max, step, curPage, totalNum, ratio, zoom, disabledPrev, disabledNext,
            disableDownload, onNext, onPrev, onDownload, renderPreviewMenu }
          = props;

        const props_ = { min, max, step, curPage, totalNum, ratio, zoom,
            disabledPrev, disabledNext, disableDownload, onNext, onPrev, onDownload,
            onRotateLeft: handleRotateLeft,
            onRotateRight: handleRotateRight,
            disabledZoomIn: zoom === max,
            disabledZoomOut: zoom === min,
            onRatioClick: handleRatioClick,
            onZoomIn: handlePlusClick,
            onZoomOut: handleMinusClick,
        };
        return renderPreviewMenu(props_);
    }

    // According to showTooltip in props, decide whether to use Tooltip to pack a layer
    // 根据 props 中的 showTooltip 决定是否使用 Tooltip 包一层
    const getFinalIconElement = (element: VueJsxNode, content: VueJsxNode) => {
        const { showTooltip } = props;
        return showTooltip ? (
          <Tooltip content={content}>
              {element}
          </Tooltip>
        ): element;
    }

    const getLocalTextByKey = (key: string) => (
      <LocaleConsumer componentName="Image" >
          {(locale: Locale["Image"]) => locale[key]}
      </LocaleConsumer>
    );

    const getIconChevronLeft = () => {
        const { disabledPrev, onPrev, prevTip } = props;
        const icon = <IconChevronLeft
          size="large"
          className={disabledPrev ? `${footerPrefixCls}-disabled` : ""}
          onClick={!disabledPrev ? onPrev : undefined}
        />;
        const content = prevTip ?? getLocalTextByKey("prevTip");
        return getFinalIconElement(icon, content);
    }

    const getIconChevronRight = () => {
        const { disabledNext, onNext, nextTip } = props;
        const icon = <IconChevronRight
          size="large"
          className={disabledNext ? `${footerPrefixCls}-disabled` : ""}
          onClick={!disabledNext ? onNext : undefined}
        />;
        const content = nextTip ?? getLocalTextByKey("nextTip");
        return getFinalIconElement(icon, content);
    }

    const getIconMinus = () => {
        const { zoomOutTip, zoom, min } = props;
        const disabledZoomOut = zoom === min;
        const icon = <IconMinus
          size="large"
          onClick={!disabledZoomOut ? handleMinusClick : undefined}
          className={disabledZoomOut ? `${footerPrefixCls}-disabled` : ""}
        />;
        const content = zoomOutTip ?? getLocalTextByKey("zoomOutTip");
        return getFinalIconElement(icon, content);
    }

    const getIconPlus = () => {
        const { zoomInTip, zoom, max } = props;
        const disabledZoomIn = zoom === max;
        const icon = <IconPlus
          size="large"
          onClick={!disabledZoomIn ? handlePlusClick : undefined}
          className={disabledZoomIn ? `${footerPrefixCls}-disabled` : ""}
        />;
        const content = zoomInTip ?? getLocalTextByKey("zoomInTip");
        return getFinalIconElement(icon, content);
    }

    const getIconRatio = () => {
        const { ratio, originTip, adaptiveTip } = props;
        const props_ = {
            size: "large" as IconSize,
            className: cls(`${footerPrefixCls}-gap`),
            onClick: handleRatioClick,
        };
        const icon = ratio === "adaptation" ? <IconRealSizeStroked {...props_} /> : <IconWindowAdaptionStroked {...props_} />;
        let content: any;
        if (ratio === "adaptation") {
            content = originTip ?? getLocalTextByKey("originTip");
        } else {
            content = adaptiveTip ?? getLocalTextByKey("adaptiveTip");
        }
        return getFinalIconElement(icon, content);
    }

    const getIconRotate = () => {
        const { rotateTip } = props;
        const icon = <IconRotate
          size="large"
          onClick={handleRotateLeft}
        />;
        const content = rotateTip ?? getLocalTextByKey("rotateTip");
        return getFinalIconElement(icon, content);
    }

    const getIconDownload = () => {
        const { downloadTip, onDownload, disableDownload } = props;
        const icon = <IconDownload
          size="large"
          onClick={!disableDownload ? onDownload : undefined}
          className={cls(`${footerPrefixCls}-gap`,
            {
                [`${footerPrefixCls}-disabled`] : disableDownload,
            },
          )}
        />;
        const content = downloadTip ?? getLocalTextByKey("downloadTip");
        return getFinalIconElement(icon, content);
    }



    return () => {
        const {
            min,
            max,
            step,
            curPage,
            totalNum,
            zoom,
            showTooltip,
            className,
            renderPreviewMenu,
        } = props;

        if (renderPreviewMenu) {
            return (
              <div class={`${footerPrefixCls}-wrapper`}>
                  {customRenderViewMenu()}
              </div>
            );
        }

        // TODO 部分按钮点击无效
        return (
          <section class={cls(footerPrefixCls, `${footerPrefixCls}-wrapper`, className)}>
              {getIconChevronLeft()}
              <div class={`${footerPrefixCls}-page`}>
                  <span>{curPage}</span><span>/</span><span>{totalNum}</span>
              </div>
              {getIconChevronRight()}
              <Divider layout="vertical" />
              {getIconMinus()}
              <Slider
                value={zoom}
                min={min}
                max={max}
                step={step}
                tipFormatter={(v): string => `${v}%`}
                tooltipVisible={showTooltip ? undefined : false }
                onChange={handleSlideChange}
              />
              {getIconPlus()}
              {getIconRatio()}
              <Divider layout="vertical" />
              {getIconRotate()}
              {getIconDownload()}
          </section>
        );
    }
})

Footer.props = vuePropsType
Footer.name = 'Footer'

export default Footer





