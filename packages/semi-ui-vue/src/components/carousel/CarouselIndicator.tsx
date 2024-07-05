import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/carousel/constants';
import { CarouselIndicatorProps } from "./interface";
import getDataAttr from "@douyinfe/semi-foundation/utils/getDataAttr";
import {ComponentObjectPropsOptions, CSSProperties, defineComponent, h, PropType, useSlots, VNode} from "vue";
import {vuePropsMake} from "../PropTypes";
const propTypes:ComponentObjectPropsOptions<CarouselIndicatorProps> = {
    activeKey: PropTypes.number,
    className: PropTypes.string,
    position: PropTypes.string as PropType<CarouselIndicatorProps['position']>,
    size: PropTypes.string as PropType<CarouselIndicatorProps['size']>,
    style: PropTypes.object,
    theme: PropTypes.string as PropType<CarouselIndicatorProps['theme']>,
    total: PropTypes.number,
    onIndicatorChange: PropTypes.func as PropType<CarouselIndicatorProps['onIndicatorChange']>,
    type: String as PropType<CarouselIndicatorProps['type']>,
    trigger: PropTypes.string as PropType<CarouselIndicatorProps['trigger']>,
    activeIndex: PropTypes.number,

    defaultActiveIndex: PropTypes.number,
};

export const vuePropsType = vuePropsMake<CarouselIndicatorProps>(propTypes, {})
const CarouselIndicator = defineComponent((props, {}) => {
    const slots = useSlots()

    const onIndicatorChange = (activeIndex: number): void => {
        props.onIndicatorChange(activeIndex);
    };

    const handleIndicatorClick = (activeIndex: number): void => {
        const { trigger } = props;
        if (trigger === 'click'){
            onIndicatorChange(activeIndex);
        }
    }

    const handleIndicatorHover = (activeIndex: number): void => {
        const { trigger } = props;
        if (trigger === 'hover'){
            onIndicatorChange(activeIndex);
        }
    }

    function renderIndicatorContent() {
        const { total, theme, size, activeIndex } = props;
        const indicatorContent: VNode[] = [];
        for (let i = 0; i < total; i++) {
            indicatorContent.push(
              <span
                // role='none'
                key={i}
                data-index={i}
                class={cls([`${cssClasses.CAROUSEL_INDICATOR}-item`], {
                    [`${cssClasses.CAROUSEL_INDICATOR}-item-active`]: i === activeIndex,
                    [`${cssClasses.CAROUSEL_INDICATOR}-item-${theme}`]: theme,
                    [`${cssClasses.CAROUSEL_INDICATOR}-item-${size}`]: size,
                })}
                onClick={()=>handleIndicatorClick(i)}
                onMouseenter={()=>handleIndicatorHover(i)}
              ></span>
            );
        }
        return indicatorContent;
    }


    return () => {

        const { type, size, theme, style, className, position, ...restProps } = props;
        const classNames = cls(className, {
            [cssClasses.CAROUSEL_INDICATOR]: true,
            [`${cssClasses.CAROUSEL_INDICATOR}-${type}`]: type,
            [`${cssClasses.CAROUSEL_INDICATOR}-${position}`]: position,
        });

        const indicatorContent = renderIndicatorContent();

        return (
          <div class={classNames} style={style} {...getDataAttr(restProps)}>
              {indicatorContent}
          </div>
        );
    }
}, {
    props: vuePropsType,
    name: 'CarouselIndicator'
})


export default CarouselIndicator

