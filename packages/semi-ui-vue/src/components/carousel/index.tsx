
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import {useBaseComponent} from "../_base/baseComponent";
import {CarouselProps} from './interface';
import {cssClasses, numbers, strings} from '@douyinfe/semi-foundation/carousel/constants';
import CarouselFoundation, {CarouselAdapter} from '@douyinfe/semi-foundation/carousel/foundation';
import CarouselIndicator from './CarouselIndicator';
import CarouselArrow from './CarouselArrow';
import '@douyinfe/semi-foundation/carousel/carousel.scss';
import {debounce} from 'lodash';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import {
  cloneVNode,
  defineComponent,
  Fragment,
  h,
  isVNode,
  onBeforeUnmount,
  onMounted,
  reactive, shallowRef,
  useSlots,
  VNode,
  watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {ToastReactProps} from "../toast/toast";

export interface CarouselState {
  activeIndex: number;
  children: VNode[];
  preIndex: number;
  isReverse: boolean;
  isInit: boolean
}

const propTypes = {
  activeIndex: PropTypes.number,
  animation: PropTypes.string,
  arrowProps: PropTypes.object,
  autoPlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  className: PropTypes.string,
  defaultActiveIndex: PropTypes.number,
  indicatorPosition: PropTypes.string,
  indicatorSize: PropTypes.string,
  indicatorType: PropTypes.string,
  theme: PropTypes.string,
  onChange: PropTypes.func,
  arrowType: PropTypes.string,
  showArrow: PropTypes.bool,
  showIndicator: PropTypes.bool,
  slideDirection: PropTypes.string,
  speed: PropTypes.number,
  style: PropTypes.object,
  trigger: PropTypes.string
};

const defaultProps: CarouselProps = {
  children: [],
  animation: 'slide',
  autoPlay: true,
  arrowType: 'always',
  defaultActiveIndex: numbers.DEFAULT_ACTIVE_INDEX,
  indicatorPosition: 'center',
  indicatorSize: 'small',
  indicatorType: 'dot',
  theme: 'light',
  onChange: () => undefined,
  showArrow: true,
  showIndicator: true,
  slideDirection: 'left',
  speed: numbers.DEFAULT_SPEED,
  trigger: 'click'
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Carousel = defineComponent<CarouselProps>((props, {expose}) => {
  const slots = useSlots()
  const childrenRef = shallowRef<{children:VNode[]}>({
    children: []
  })

  let preChildren:VNode[] = []
  const state = reactive<CarouselState>({
    activeIndex: -1,
    children: [],
    preIndex: -1,
    isReverse: false,
    isInit: true
  })

  const {adapter: adapterInject} = useBaseComponent<CarouselProps>(props, state)

  function adapter_(): CarouselAdapter<CarouselProps, CarouselState> {
    return {
      ...adapterInject(),
      getStates(){
        return {
          ...state,
          children: preChildren
        }
      },
      notifyChange: (activeIndex: number, preIndex: number): void => {
        props.onChange(activeIndex, preIndex);
      },
      setNewActiveIndex: (activeIndex: number): void => {
        state.activeIndex = activeIndex
      },
      setPreActiveIndex: (preIndex: number): void => {
        state.preIndex = preIndex
      },
      setIsReverse: (isReverse: boolean): void => {
        state.isReverse = isReverse
      },
      setIsInit: (isInit: boolean): void => {
        state.isInit = isInit
      }
    };
  }

  const adapter = adapter_()
  const foundation = new CarouselFoundation(adapter);

  const defaultActiveIndex = foundation.getDefaultActiveIndex();
  state.activeIndex = defaultActiveIndex
  state.preIndex = defaultActiveIndex

  function getDerivedStateFromProps(props: CarouselProps): Partial<CarouselState> {
    const states: Partial<CarouselState> = {};
    if (!isNullOrUndefined(props.activeIndex) && props.activeIndex !== state.activeIndex) {
      states.activeIndex = props.activeIndex;
    }
    return states;
  }

  watch([() => props.activeIndex, () => state.activeIndex], (val) => {
    const newState = getDerivedStateFromProps(props)
    if (newState) {
      Object.keys(newState).forEach(key => {
        state[key] = newState[key]
      })
    }
  })

  onMounted(() => {
    handleAutoPlay();
  })
  onBeforeUnmount(() => {
    foundation.destroy();
  })


  const play = (): void => {
    return foundation.handleAutoPlay();
  }

  const stop = (): void => {
    return foundation.stop();
  };

  const goTo = (targetIndex: number): void => {
    return foundation.goTo(targetIndex);
  };

  const prev = (): void => {
    return foundation.prev();
  };

  const next = (): void => {
    return foundation.next();
  };

  expose({
    play,
    stop,
    goTo,
    prev,
    next
  })


  const handleAutoPlay = (): void => {
    if (!foundation.getIsControlledComponent()) {
      foundation.handleAutoPlay();
    }
  }

  const handleMouseEnter = (): void => {
    const {autoPlay} = props;
    if (typeof autoPlay !== 'object' || autoPlay.hoverToPause) {
      foundation.stop();
    }
  }

  const handleMouseLeave = (): void => {
    const {autoPlay} = props;
    if ((typeof autoPlay !== 'object' || autoPlay.hoverToPause) && !foundation.getIsControlledComponent()) {
      foundation.handleAutoPlay();
    }
  }

  const onIndicatorChange = (activeIndex: number): void => {
    return foundation.onIndicatorChange(activeIndex);
  };

  // function getChildren() {
  //   const originChildren:VNode[] = slots.default?.()?.[0].children as any  || [];
  //   return originChildren.filter(child => {
  //     return isVNode(child);
  //   });
  // }

  const getValidIndex = (activeIndex: number): number => {
    return foundation.getValidIndex(activeIndex);
  };


  const renderChildren = () => {
    const {speed, animation} = props;
    const {activeIndex, preIndex, isInit} = state;

    return (
      <Fragment>
        {preChildren.map((child: any, index: number) => {
          const isCurrent = index === activeIndex;
          const isPrev = index === getValidIndex(activeIndex - 1);
          const isNext = index === getValidIndex(activeIndex + 1);

          const animateStyle = {
            transitionTimingFunction: 'ease',
            transitionDuration: `${speed}ms`,
            animationTimingFunction: 'ease',
            animationDuration: `${speed}ms`,
          };

          return cloneVNode(child, {
            style: {
              ...child.props.style,
              ...animateStyle,
            },
            className: cls(child.props.class, {
              [`${cssClasses.CAROUSEL_CONTENT}-item-prev`]: isPrev,
              [`${cssClasses.CAROUSEL_CONTENT}-item-next`]: isNext,
              [`${cssClasses.CAROUSEL_CONTENT}-item-current`]: isCurrent,
              [`${cssClasses.CAROUSEL_CONTENT}-item`]: true,
              [`${cssClasses.CAROUSEL_CONTENT}-item-active`]: isCurrent,
              [`${cssClasses.CAROUSEL_CONTENT}-item-slide-in`]: animation === 'slide' && !isInit && isCurrent,
              [`${cssClasses.CAROUSEL_CONTENT}-item-slide-out`]: animation === 'slide' && !isInit && index === preIndex,
            })
          });
        })}
      </Fragment>
    );
  }

  const renderIndicator = () => {
    const {activeIndex} = state;
    const {showIndicator, indicatorType, theme, indicatorPosition, indicatorSize, trigger} = props;

    const carouselIndicatorCls = cls({
      [cssClasses.CAROUSEL_INDICATOR]: true
    });

    if (showIndicator && preChildren.length > 1) {
      return (
        <div class={carouselIndicatorCls}>
          <CarouselIndicator
            type={indicatorType}
            total={preChildren.length}
            activeIndex={activeIndex}
            position={indicatorPosition}
            trigger={trigger}
            size={indicatorSize}
            theme={theme}
            onIndicatorChange={onIndicatorChange}
          />
        </div>
      );
    }
    return null;
  }

  const renderArrow = () => {
    const {showArrow, arrowType, theme, arrowProps} = props;

    if (showArrow && preChildren.length > 1) {
      return (
        <CarouselArrow
          type={arrowType}
          theme={theme}
          prev={prev}
          next={next}
          arrowProps={arrowProps}
        />
      );
    }
    return null;
  };


  return () => {
    preChildren = slots.default?.()?.[0].children as any  || [];

    const {animation, className, style, slideDirection} = props;
    const {isReverse} = state;

    const carouselWrapperCls = cls(className, {
      [cssClasses.CAROUSEL]: true
    });

    return (
      <div
        // role='listbox'
        // tabIndex={0}
        class={carouselWrapperCls}
        style={style}
        onMouseenter={debounce(handleMouseEnter, 400)}
        onMouseleave={debounce(handleMouseLeave, 400)}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // onKeyDown={e => foundation.handleKeyDown(e)}
      >
        <div
          class={cls([`${cssClasses.CAROUSEL_CONTENT}-${animation}`], {
            [`${cssClasses.CAROUSEL_CONTENT}`]: true,
            [`${cssClasses.CAROUSEL_CONTENT}-reverse`]: slideDirection === 'left' ? isReverse : !isReverse,
          })}
          x-semi-prop="children"
        >
          {renderChildren()}
        </div>
        {renderIndicator()}
        {renderArrow()}
      </div>
    );
  }
})

Carousel.props = vuePropsType
Carousel.name = 'Carousel'

export default Carousel
