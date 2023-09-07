import { IconChevronLeft, IconChevronRight, IconMinus, IconPlus,
    IconRotate, IconDownload, IconWindowAdaptionStroked, IconRealSizeStroked } from "@kousum/semi-icons-vue";
import type { IconSize } from "@kousum/semi-icons-vue";
import {FooterProps} from "./interface";
import * as PropTypes from "../PropTypes";
import Tooltip from "../tooltip";
import Divider from "../divider";
import Slider from "../slider";
import { cssClasses } from "@douyinfe/semi-foundation/image/constants";
import cls from "classnames";
import PreviewFooterFoundation, { PreviewFooterAdapter } from "@douyinfe/semi-foundation/image/previewFooterFoundation";
import {LocaleConsumerFunc} from "../locale/localeConsumer";
import { Locale } from "../locale/interface";
import { throttle } from "lodash";
import {ComponentObjectPropsOptions, defineComponent, h, PropType, useSlots} from "vue";
import {useBaseComponent} from "../_base/baseComponent";
import {VueJsxNode} from "../interface";
import {vuePropsMake} from "../PropTypes";
import {AnchorProps} from "../anchor";

const prefixCls = cssClasses.PREFIX;
const footerPrefixCls = `${cssClasses.PREFIX}-preview-footer`;
const LocaleConsumer = LocaleConsumerFunc<Locale["Image"]>()
let mouseActiveTime: number = 0;


const propTypes:ComponentObjectPropsOptions<FooterProps> = {
    curPage: PropTypes.number,
    totalNum: PropTypes.number,
    disabledPrev: PropTypes.bool,
    disabledNext: PropTypes.bool,
    disableDownload: PropTypes.bool,
    className: PropTypes.string,
    zoom: PropTypes.number,
    ratio: PropTypes.string as PropType<FooterProps['ratio']>,
    prevTip: PropTypes.string,
    nextTip: PropTypes.string,
    zoomInTip: PropTypes.string,
    zoomOutTip: PropTypes.string,
    rotateTip: PropTypes.string,
    downloadTip: PropTypes.string,
    adaptiveTip: PropTypes.string,
    originTip: PropTypes.string,
    showTooltip: PropTypes.bool,
    onZoomIn: PropTypes.func as PropType<FooterProps['onZoomIn']>,
    onZoomOut: PropTypes.func as PropType<FooterProps['onZoomOut']>,
    onPrev: PropTypes.func as PropType<FooterProps['onPrev']>,
    onNext: PropTypes.func as PropType<FooterProps['onNext']>,
    onAdjustRatio: PropTypes.func as PropType<FooterProps['onAdjustRatio']>,
    // onRotateLeft: PropTypes.func,
    onDownload: PropTypes.func as PropType<FooterProps['onDownload']>,

    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onRotate: PropTypes.func as PropType<FooterProps['onRotate']>,
    renderPreviewMenu: PropTypes.func as PropType<FooterProps['renderPreviewMenu']>,
}

const defaultProps = {
    min: 10,
    max: 500,
    step: 10,
    showTooltip: false,
    disableDownload: false,
}
export const vuePropsType = vuePropsMake<FooterProps>(propTypes, defaultProps)
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
            menuItems: getMenu()
        };
        return renderPreviewMenu(props_);
    }

    // According to showTooltip in props, decide whether to use Tooltip to pack a layer
    // 根据 props 中的 showTooltip 决定是否使用 Tooltip 包一层
    const getFinalIconElement = (element: VueJsxNode, content: VueJsxNode, key: string) => {
        const { showTooltip } = props;
        return showTooltip ? (
          <Tooltip content={content} key={`tooltip-${key}`}>
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
          key="chevron-left"
          size="large"
          className={disabledPrev ? `${footerPrefixCls}-disabled` : ""}
          onClick={!disabledPrev ? onPrev : undefined}
        />;
        const content = prevTip ?? getLocalTextByKey("prevTip");
        return getFinalIconElement(icon, content, 'chevron-left');
    }

    const getIconChevronRight = () => {
        const { disabledNext, onNext, nextTip } = props;
        const icon = <IconChevronRight
          key="chevron-right"
          size="large"
          className={disabledNext ? `${footerPrefixCls}-disabled` : ""}
          onClick={!disabledNext ? onNext : undefined}
        />;
        const content = nextTip ?? getLocalTextByKey("nextTip");
        return getFinalIconElement(icon, content, 'chevron-right');
    }

    const getIconMinus = () => {
        const { zoomOutTip, zoom, min } = props;
        const disabledZoomOut = zoom === min;
        const icon = <IconMinus
          key="minus"
          size="large"
          onClick={!disabledZoomOut ? handleMinusClick : undefined}
          className={disabledZoomOut ? `${footerPrefixCls}-disabled` : ""}
        />;
        const content = zoomOutTip ?? getLocalTextByKey("zoomOutTip");
        return getFinalIconElement(icon, content, 'minus');
    }

    const getIconPlus = () => {
        const { zoomInTip, zoom, max } = props;
        const disabledZoomIn = zoom === max;
        const icon = <IconPlus
          key="plus"
          size="large"
          onClick={!disabledZoomIn ? handlePlusClick : undefined}
          className={disabledZoomIn ? `${footerPrefixCls}-disabled` : ""}
        />;
        const content = zoomInTip ?? getLocalTextByKey("zoomInTip");
        return getFinalIconElement(icon, content, 'plus');
    }

    const getIconRatio = () => {
        const { ratio, originTip, adaptiveTip } = props;
        const props_ = {
            key: "ratio",
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
        return getFinalIconElement(icon, content, 'ratio');
    }

    const getIconRotate = () => {
        const { rotateTip } = props;
        const icon = <IconRotate
          key="rotate"
          size="large"
          onClick={handleRotateLeft}
        />;
        const content = rotateTip ?? getLocalTextByKey("rotateTip");
        return getFinalIconElement(icon, content, 'rotate');
    }

    const getIconDownload = () => {
        const { downloadTip, onDownload, disableDownload } = props;
        const icon = <IconDownload
          key='download'
          size="large"
          onClick={!disableDownload ? onDownload : undefined}
          className={cls(`${footerPrefixCls}-gap`,
            {
                [`${footerPrefixCls}-disabled`] : disableDownload,
            },
          )}
        />;
        const content = downloadTip ?? getLocalTextByKey("downloadTip");
        return getFinalIconElement(icon, content, 'download');
    }


    const getNumberInfo = () => {
        const { curPage, totalNum } = props;
        return (
          <div class={`${footerPrefixCls}-page`} key={'info'} >
              {curPage}/{totalNum}
          </div>
        );
    }

    const getSlider = () => {
        const { zoom, min, max, step, showTooltip } = props;
        return (
          <Slider
            key={'slider'}
            value={zoom}
            min={min}
            max={max}
            step={step}
            tipFormatter={(v): string => `${v}%`}
            tooltipVisible={showTooltip ? undefined : false }
            onChange={handleSlideChange}
          />
        );
    }

    const getMenu = () => ([
        getIconChevronLeft(),
        getNumberInfo(),
        getIconChevronRight(),
        getIconMinus(),
        getSlider(),
        getIconPlus(),
        getIconRatio(),
        getIconRotate(),
        getIconDownload()
    ]);

    const getFooterMenu = () => {
        const menuItems = getMenu();
        menuItems.splice(3, 0, <Divider layout="vertical" key={"divider-first"}/>);
        menuItems.splice(8, 0, <Divider layout="vertical" key={"divider-second"} />);
        return menuItems;
    }


    return () => {
        const { className, renderPreviewMenu } = props;

        const menuCls = cls(footerPrefixCls, `${footerPrefixCls}-wrapper`, className,
          {
              [`${footerPrefixCls}-content`]: !Boolean(renderPreviewMenu),
          },
        );
        return (
          <section class={menuCls} >
              {renderPreviewMenu ? customRenderViewMenu() : getFooterMenu()}
          </section>
        );
    }
}, {
    props: vuePropsType,
    name: 'Footer'
})



export default Footer





