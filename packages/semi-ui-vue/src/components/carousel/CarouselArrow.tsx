
import cls from 'classnames';
import {cssClasses, strings} from '@douyinfe/semi-foundation/carousel/constants';
import {ArrowProps, CarouselArrowProps} from "./interface";
import { IconChevronLeft, IconChevronRight } from "@kousum/semi-icons-vue";
import { get } from 'lodash';
import {defineComponent, h, useSlots} from "vue";

export const vuePropsType = {
    type: String,
    theme: String,
    prev: Function,
    next: Function,
    arrowProps: Object
}
const CarouselArrow = defineComponent<CarouselArrowProps>((props, {}) => {
    const slots = useSlots()

    const renderLeftIcon = () => {
        return get(props, 'arrowProps.leftArrow.children', <IconChevronLeft aria-label="Previous index" size="inherit"/>);
    }

    const renderRightIcon = () => {
        return get(props, 'arrowProps.rightArrow.children', <IconChevronRight aria-label="Next index" size="inherit"/>);
    }

    return () => {

        const { type, theme, prev, next } = props;
        const classNames = cls( {
            [cssClasses.CAROUSEL_ARROW]: true,
            [`${cssClasses.CAROUSEL_ARROW}-${theme}`]: theme,
            [`${cssClasses.CAROUSEL_ARROW}-hover`]: type === 'hover',
        });

        const leftClassNames = cls( {
            [`${cssClasses.CAROUSEL_ARROW}-prev`]: true,
            [`${cssClasses.CAROUSEL_ARROW}-${theme}`]: theme,
        });

        const rightClassNames = cls( {
            [`${cssClasses.CAROUSEL_ARROW}-next`]: true,
            [`${cssClasses.CAROUSEL_ARROW}-${theme}`]: theme,
        });

        return (
          <div class={classNames}>
              <div
                // role='button'
                className={leftClassNames}
                onClick={prev}
                {...get(props, 'arrowProps.leftArrow.props')}
                x-semi-prop="arrowProps.leftArrow.children"
              >
                  {renderLeftIcon()}
              </div>
              <div
                // role='button'
                // tabIndex={0}
                className={rightClassNames}
                onClick={next}
                {...get(props, 'arrowProps.rightArrow.props')}
                x-semi-prop="arrowProps.rightArrow.children"
              >
                  {renderRightIcon()}
              </div>
          </div>
        );
    }
})

CarouselArrow.props = vuePropsType
CarouselArrow.name = 'CarouselArrow'

export default CarouselArrow
