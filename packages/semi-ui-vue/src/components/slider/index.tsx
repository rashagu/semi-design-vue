/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-find-dom-node */
import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/slider/constants';
import { useBaseComponent } from '../_base/baseComponent';
import SliderFoundation, {
  SliderAdapter,
  SliderProps as BasicSliceProps,
  SliderState,
  tipFormatterBasicType,
} from '@douyinfe/semi-foundation/slider/foundation';
import Tooltip from '../tooltip/index';
import '@douyinfe/semi-foundation/slider/slider.scss';
import { isEqual, noop } from 'lodash';
import {
  CSSProperties,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useSlots,
  watch,
  Fragment,
  nextTick, ComponentObjectPropsOptions, PropType,
} from 'vue';
import { vuePropsMake } from '../PropTypes';

const prefixCls = cssClasses.PREFIX;

export interface SliderProps extends BasicSliceProps {
  style?: CSSProperties;
  railStyle?: CSSProperties;
}

export type { SliderState };

function domIsInRenderTree(e: HTMLElement) {
  if (!e) {
    return false;
  }
  return Boolean(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

const propTypes:ComponentObjectPropsOptions<SliderProps> = {
  // allowClear: PropTypes.bool,
  defaultValue: [PropTypes.number, PropTypes.array],
  disabled: {
    type: PropTypes.bool,
    default: undefined,
  },
  showMarkLabel: PropTypes.bool,
  included: {
    type: PropTypes.bool,
    default: undefined,
  }, // Whether to juxtapose. Allow dragging
  marks: PropTypes.object, // Scale
  max: PropTypes.number,
  min: PropTypes.number,
  range: {
    type: PropTypes.bool,
    default: undefined,
  }, // Whether both sides
  step: PropTypes.number,
  tipFormatter: PropTypes.func as PropType<SliderProps['tipFormatter']>,
  value: [PropTypes.number, PropTypes.array],
  vertical: {
    type: PropTypes.bool,
    default: undefined,
  },
  onAfterChange: PropTypes.func as PropType<SliderProps['onAfterChange']>, // OnmouseUp and triggered when clicked
  onChange: PropTypes.func as PropType<SliderProps['onChange']>,
  onMouseUp: PropTypes.func as PropType<SliderProps['onMouseUp']>,
  tooltipOnMark: PropTypes.bool,
  tooltipVisible: {
    type: PropTypes.bool,
    default: undefined,
  },
  showArrow: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  showBoundary: {
    type: PropTypes.bool,
    default: undefined,
  },
  railStyle: PropTypes.object,
  verticalReverse: {
    type: PropTypes.bool,
    default: undefined,
  },
  getAriaValueText: PropTypes.func as PropType<SliderProps['getAriaValueText']>,
  handleDot: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const defaultProps: Partial<SliderProps> = {
  // allowClear: false,
  disabled: false,
  showMarkLabel: true,
  tooltipOnMark: false,
  included: true, // No is juxtaposition. Allow dragging
  max: 100,
  min: 0,
  range: false, // Whether both sides
  showArrow: true,
  step: 1,
  tipFormatter: (value: tipFormatterBasicType | tipFormatterBasicType[]) => value,
  vertical: false,
  showBoundary: false,
  onAfterChange: (value: number | number[]) => {
    // console.log(value);
  },
  onChange: (value: number | number[]) => {
    // console.log(value);
  },
  verticalReverse: false,
};
export const vuePropsType = vuePropsMake<SliderProps>(propTypes, defaultProps);
const Slider = defineComponent<SliderProps>((props, {}) => {
  const slots = useSlots();

  let { value } = props;
  if (!value) {
    value = props.defaultValue;
  }

  const state = reactive<SliderState>({
    // eslint-disable-next-line no-nested-ternary
    currentValue: value ? value : props.range ? [0, 0] : 0,
    min: props.min || 0,
    max: props.max || 0,
    focusPos: '',
    onChange: props.onChange,
    disabled: props.disabled || false,
    chooseMovePos: '',
    isDrag: false,
    clickValue: 0,
    showBoundary: false,
    isInRenderTree: true,
    firstDotFocusVisible: false,
    secondDotFocusVisible: false,
  });
  const sliderEl = ref();
  const minHanleEl = ref();

  const maxHanleEl = ref();
  let dragging = [false, false];
  const eventListenerSet = new Set();

  const { adapter: adapterInject, getDataAttr } = useBaseComponent<SliderProps>(props, state);

  const adapter = adapter_();

  function adapter_(): SliderAdapter {
    return {
      ...adapterInject<SliderProps, SliderState>(),
      getSliderLengths: () => {
        if (sliderEl && sliderEl.value) {
          const rect = sliderEl.value.getBoundingClientRect();
          const offsetParentRect = sliderEl.value.offsetParent?.getBoundingClientRect();

          const offset = {
            x: offsetParentRect ? (rect.left - offsetParentRect.left): sliderEl.value.offsetLeft,
            y: offsetParentRect ? (rect.top - offsetParentRect.top) : sliderEl.value.current.offsetTop,
          };
          return {
            sliderX: offset.x,
            sliderY: offset.y,
            sliderWidth: rect.width,
            sliderHeight: rect.height,
          };
        }
        return {
          sliderX: 0,
          sliderY: 0,
          sliderWidth: 0,
          sliderHeight: 0,
        };
      },
      getParentRect: (): DOMRect | undefined => {
        const parentObj = sliderEl && sliderEl.value && sliderEl.value.offsetParent;
        if (!parentObj) {
          return undefined;
        }
        return parentObj.getBoundingClientRect();
      },
      getScrollParentVal: () => {
        const scrollParent = foundation.getScrollParent(sliderEl.value);
        return {
          scrollTop: scrollParent.scrollTop,
          scrollLeft: scrollParent.scrollLeft,
        };
      },
      isEventFromHandle: (e: MouseEvent) => {
        const handles = [minHanleEl, maxHanleEl];
        let flag = false;
        handles.forEach((handle) => {
          if (!handle.value) {
            return;
          }
          if (handle.value.contains(e.target as Node)) {
            flag = true;
          }
        });
        return flag;
      },
      getOverallVars: () => ({
        dragging: dragging,
      }),
      updateDisabled: (disabled: boolean) => {
        state.disabled = disabled;
      },
      transNewPropsToState<K extends keyof SliderState>(stateObj: Pick<SliderState, K>, callback = noop) {
        Object.keys(stateObj).forEach((key) => {
          state[key] = stateObj[key];
        });
        nextTick(() => {
          callback?.();
        });
      },
      notifyChange: (cbValue: number | number[]) => {
        props.onChange(Array.isArray(cbValue) ? [...cbValue].sort() : cbValue);
      },
      setDragging: (value: boolean[]) => {
        dragging = value;
      },
      updateCurrentValue: (value: number | number[]) => {
        const { currentValue } = state;
        if (value !== currentValue) {
          // state.currentValue = value
        }
      },
      setOverallVars: (key: string, value: any) => {
        // TODO
        // this[key] = value;
        console.error('smw: 用途 未知');
      },
      getMinHandleEl: () => minHanleEl.value,
      getMaxHandleEl: () => maxHanleEl.value,
      onHandleDown: (e: MouseEvent) => {
        _addEventListener(document.body, 'mousemove', foundation.onHandleMove, false);
        _addEventListener(window, 'mouseup', foundation.onHandleUp, false);
        _addEventListener(document.body, 'touchmove', foundation.onHandleTouchMove, false);
      },
      onHandleMove: (
        mousePos: number,
        isMin: boolean,
        stateChangeCallback = noop,
        clickTrack = false,
        outPutValue
      ): boolean | void => {
        const sliderDOMIsInRenderTree = foundation.checkAndUpdateIsInRenderTreeState();
        if (!sliderDOMIsInRenderTree) {
          return;
        }

        const { value } = props;

        let finalOutPutValue = outPutValue;
        if (finalOutPutValue === undefined) {
          const moveValue = foundation.transPosToValue(mousePos, isMin);
          if (moveValue === false) {
            return;
          }
          finalOutPutValue = foundation.outPutValue(moveValue);
        }

        const { currentValue } = state;
        if (!isEqual(foundation.outPutValue(currentValue), finalOutPutValue)) {
          if (!clickTrack && foundation.valueFormatIsCorrect(value)) {
            // still require afterChangeCallback when click on the track directly, need skip here
            return false;
          }
          state.currentValue = finalOutPutValue;
          nextTick(() => {
            stateChangeCallback?.();
          });
        }
      },
      setEventDefault: (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
      },
      setStateVal: <K extends keyof SliderState>(name: K, val: SliderState[K]) => {
        state[name] = val;
      },
      checkAndUpdateIsInRenderTreeState: () => {
        const sliderDOMIsInRenderTree = domIsInRenderTree(sliderEl.value);
        if (sliderDOMIsInRenderTree !== state.isInRenderTree) {
          state.isInRenderTree = sliderDOMIsInRenderTree;
        }
        return sliderDOMIsInRenderTree;
      },
      onHandleEnter: (pos: SliderState['focusPos']) => {
        state.focusPos = pos;
      },
      onHandleLeave: () => {
        state.focusPos = '';
      },
      onHandleUpBefore: (e: MouseEvent) => {
        props.onMouseUp?.(e);
        e.stopPropagation();
        e.preventDefault();
        document.body.removeEventListener('mousemove', foundation.onHandleMove, false);
        document.body.removeEventListener('mouseup', foundation.onHandleUp, false);
      },
      onHandleUpAfter: () => {
        const { currentValue } = state;
        const value = foundation.outPutValue(currentValue);
        props.onAfterChange(value);
      },
      unSubscribeEventListener: () => {
        Array.from(eventListenerSet).forEach((clear: any) => clear?.());
      },
    };
  }

  const foundation = new SliderFoundation(adapter);

  watch(
    [() => props.value, () => props.disabled, () => state.currentValue],
    (val, [prevPropsValue, prevPropsDisabled]) => {
      const hasPropValueChange = !isEqual(props.value, prevPropsValue);
      const hasPropDisabledChange = props.disabled !== prevPropsDisabled;

      if (hasPropDisabledChange) {
        foundation.handleDisabledChange(props.disabled);
      }

      if (hasPropValueChange) {
        const nextValue = props.value;
        const prevValue = state.currentValue;
        foundation.handleValueChange(prevValue, nextValue);
      }
    }
  );

  onMounted(() => {
    foundation.init();
  });

  onUnmounted(() => {
    foundation.init();
  });

  const renderHandle = () => {
    const {
      vertical,
      range,
      tooltipVisible,
      tipFormatter,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-valuetext': ariaValueText,
      getAriaValueText,
      disabled,
    } = props;
    const { chooseMovePos, isDrag, isInRenderTree, firstDotFocusVisible, secondDotFocusVisible } = state;
    const stylePos = vertical ? 'top' : 'left';
    const percentInfo = foundation.getMinAndMaxPercent(state.currentValue);
    const minPercent = percentInfo.min;
    const maxPercent = percentInfo.max;
    const { tipVisible, tipChildren } = foundation.computeHandleVisibleVal(
      tooltipVisible && isInRenderTree,
      tipFormatter,
      range
    );
    const minClass = cls(cssClasses.HANDLE, {
      [`${cssClasses.HANDLE}-clicked`]: chooseMovePos === 'min' && isDrag,
    });
    const maxClass = cls(cssClasses.HANDLE, {
      [`${cssClasses.HANDLE}-clicked`]: chooseMovePos === 'max' && isDrag,
    });
    const { min, max, currentValue } = state;

    const commonAria = {
      'aria-label': ariaLabel ?? (disabled ? 'Disabled Slider' : undefined),
      'aria-labelledby': ariaLabelledby,
      'aria-disabled': disabled,
    };
    vertical && Object.assign(commonAria, { 'aria-orientation': 'vertical' });

    const handleContents = !range ? (
      <Tooltip
        content={tipChildren.min}
        showArrow={props.showArrow}
        position="top"
        trigger="custom"
        rePosKey={minPercent}
        visible={isInRenderTree && (tipVisible.min || firstDotFocusVisible)}
        className={`${cssClasses.HANDLE}-tooltip`}
      >
        <span
          onMouseover={foundation.checkAndUpdateIsInRenderTreeState}
          ref={minHanleEl}
          class={minClass}
          style={{
            [stylePos]: `${minPercent * 100}%`,
            zIndex: chooseMovePos === 'min' && isDrag ? 2 : 1,
          }}
          onMousedown={(e) => {
            foundation.onHandleDown(e, 'min');
          }}
          onMouseenter={() => {
            foundation.onHandleEnter('min');
          }}
          onTouchstart={(e) => {
            foundation.onHandleTouchStart(e, 'min');
          }}
          onMouseleave={() => {
            foundation.onHandleLeave();
          }}
          onMouseup={(e) => {
            foundation.onHandleUp(e);
          }}
          onKeyup={(e) => {
            foundation.onHandleUp(e);
          }}
          onTouchend={(e) => {
            foundation.onHandleUp(e);
          }}
          onKeydown={(e) => {
            foundation.handleKeyDown(e, 'min');
          }}
          onFocus={(e) => {
            foundation.onFocus(e, 'min');
          }}
          onBlur={(e) => {
            foundation.onBlur(e, 'min');
          }}
          role="slider"
          aria-valuetext={getAriaValueText ? getAriaValueText(currentValue as number, 0) : ariaValueText}
          tabindex={disabled ? -1 : 0}
          {...commonAria}
          aria-valuenow={currentValue as number}
          aria-valuemax={max}
          aria-valuemin={min}
        >
          {props.handleDot && (
            <div
              class={cssClasses.HANDLE_DOT}
              style={{
                ...(props.handleDot?.size
                  ? {
                      width: props.handleDot.size,
                      height: props.handleDot.size,
                    }
                  : {}),
                ...(props.handleDot?.color ? { backgroundColor: props.handleDot.color } : {}),
              }}
            />
          )}
        </span>
      </Tooltip>
    ) : (
      <Fragment>
        <Tooltip
          content={tipChildren.min}
          position="top"
          trigger="custom"
          rePosKey={minPercent}
          visible={isInRenderTree && (tipVisible.min || firstDotFocusVisible)}
          className={`${cssClasses.HANDLE}-tooltip`}
        >
          <span
            ref={minHanleEl}
            class={minClass}
            style={{
              [stylePos]: `${minPercent * 100}%`,
              zIndex: chooseMovePos === 'min' ? 2 : 1,
            }}
            onMousedown={(e) => {
              foundation.onHandleDown(e, 'min');
            }}
            onMouseenter={() => {
              foundation.onHandleEnter('min');
            }}
            onTouchstart={(e) => {
              foundation.onHandleTouchStart(e, 'min');
            }}
            onMouseleave={() => {
              foundation.onHandleLeave();
            }}
            onMouseup={(e) => {
              foundation.onHandleUp(e);
            }}
            onKeyup={(e) => {
              foundation.onHandleUp(e);
            }}
            onTouchend={(e) => {
              foundation.onHandleUp(e);
            }}
            onKeydown={(e) => {
              foundation.handleKeyDown(e, 'min');
            }}
            onFocus={(e) => {
              foundation.onFocus(e, 'min');
            }}
            onBlur={(e) => {
              foundation.onBlur(e, 'min');
            }}
            role="slider"
            tabindex={disabled ? -1 : 0}
            {...commonAria}
            aria-valuetext={getAriaValueText ? getAriaValueText(currentValue[0], 0) : ariaValueText}
            aria-valuenow={currentValue[0]}
            aria-valuemax={currentValue[1]}
            aria-valuemin={min}
          >
            {props.handleDot?.[0] && (
              <div
                class={cssClasses.HANDLE_DOT}
                style={{
                  ...(props.handleDot[0]?.size
                    ? {
                        width: props.handleDot[0].size,
                        height: props.handleDot[0].size,
                      }
                    : {}),
                  ...(props.handleDot[0]?.color ? { backgroundColor: props.handleDot[0].color } : {}),
                }}
              />
            )}
          </span>
        </Tooltip>
        <Tooltip
          content={tipChildren.max}
          position="top"
          trigger="custom"
          rePosKey={maxPercent}
          visible={isInRenderTree && (tipVisible.max || secondDotFocusVisible)}
          className={`${cssClasses.HANDLE}-tooltip`}
        >
          <span
            ref={maxHanleEl}
            class={maxClass}
            style={{
              [stylePos]: `${maxPercent * 100}%`,
              zIndex: chooseMovePos === 'max' ? 2 : 1,
            }}
            onMousedown={(e) => {
              foundation.onHandleDown(e, 'max');
            }}
            onMouseenter={() => {
              foundation.onHandleEnter('max');
            }}
            onMouseleave={() => {
              foundation.onHandleLeave();
            }}
            onMouseup={(e) => {
              foundation.onHandleUp(e);
            }}
            onKeyup={(e) => {
              foundation.onHandleUp(e);
            }}
            onTouchstart={(e) => {
              foundation.onHandleTouchStart(e, 'max');
            }}
            onTouchend={(e) => {
              foundation.onHandleUp(e);
            }}
            onKeydown={(e) => {
              foundation.handleKeyDown(e, 'max');
            }}
            onFocus={(e) => {
              foundation.onFocus(e, 'max');
            }}
            onBlur={(e) => {
              foundation.onBlur(e, 'max');
            }}
            role="slider"
            tabindex={disabled ? -1 : 0}
            {...commonAria}
            aria-valuetext={getAriaValueText ? getAriaValueText(currentValue[1], 1) : ariaValueText}
            aria-valuenow={currentValue[1]}
            aria-valuemax={max}
            aria-valuemin={currentValue[0]}
          >
            {props.handleDot?.[1] && (
              <div
                class={cssClasses.HANDLE_DOT}
                style={{
                  ...(props.handleDot[1]?.size
                    ? {
                        width: props.handleDot[1].size,
                        height: props.handleDot[1].size,
                      }
                    : {}),
                  ...(props.handleDot[1]?.color ? { backgroundColor: props.handleDot[1].color } : {}),
                }}
              />
            )}
          </span>
        </Tooltip>
      </Fragment>
    );
    return handleContents;
  };

  const renderTrack = () => {
    const { range, included, vertical } = props;
    const percentInfo = foundation.getMinAndMaxPercent(state.currentValue);
    const minPercent = percentInfo.min;
    const maxPercent = percentInfo.max;
    let trackStyle: CSSProperties = !vertical ?
      {
        width: range ? `${Math.abs(maxPercent - minPercent) * 100}%` : `${minPercent * 100}%`,
        left: range ? `${Math.min(minPercent, maxPercent) * 100}%` : 0,
      } :
      {
        height: range ? `${Math.abs(maxPercent - minPercent) * 100}%` : `${minPercent * 100}%`,
        top: range ? `${Math.min(minPercent, maxPercent) * 100}%` : 0,
      };
    trackStyle = included ? trackStyle : {};
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div class={cssClasses.TRACK} style={trackStyle} onClick={foundation.handleWrapClick}>
        {/* {renderTrack} */}
      </div>
    );
  };

  const renderStepDot = () => {
    const { min, max, vertical, marks } = props;
    const stylePos = vertical ? 'top' : 'left';
    const labelContent =
      marks && Object.keys(marks).length > 0 ? (
        <div class={cssClasses.DOTS}>
          {Object.keys(marks).map((mark) => {
            const activeResult = foundation.isMarkActive(Number(mark));
            const markClass = cls(`${prefixCls}-dot`, {
              [`${prefixCls}-dot-active`]: foundation.isMarkActive(Number(mark)) === 'active',
            });
            const markPercent = (Number(mark) - min) / (max - min);
            const dotDOM = // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <span
                key={mark}
                onClick={foundation.handleWrapClick}
                class={markClass}
                style={{ [stylePos]: `calc(${markPercent * 100}% - 2px)` }}
              />;
            return activeResult ? (
              props.tooltipOnMark?<Tooltip content={marks[mark]}>{dotDOM}</Tooltip>:dotDOM
            ) : null;
          })}
        </div>
      ) : null;
    return labelContent;
  };

  const renderLabel = () => {
    if (!props.showMarkLabel) {
      return null;
    }
    const { min, max, vertical, marks, verticalReverse } = props;
    const stylePos = vertical ? 'top' : 'left';
    const labelContent =
      marks && Object.keys(marks).length > 0 ? (
        <div class={cssClasses.MARKS + (vertical && verticalReverse ? '-reverse' : '')}>
          {Object.keys(marks).map((mark) => {
            const activeResult = foundation.isMarkActive(Number(mark));
            const markPercent = (Number(mark) - min) / (max - min);
            return activeResult ? (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <span
                key={mark}
                class={cls(`${prefixCls}-mark${vertical && verticalReverse ? '-reverse' : ''}`)}
                style={{ [stylePos]: `${markPercent * 100}%` }}
                onClick={foundation.handleWrapClick}
              >
                {marks[mark]}
              </span>
            ) : null;
          })}
        </div>
      ) : null;
    return labelContent;
  };

  const _getAriaValueText = (value: number, index?: number) => {
    const { getAriaValueText } = props;
    return getAriaValueText ? getAriaValueText(value, index) : value;
  };

  function _addEventListener<T extends keyof HTMLElementEventMap>(
    target: HTMLElement | Window,
    eventName: T,
    callback: EventListenerOrEventListenerObject,
    ...rests: any
  ) {
    if (target.addEventListener) {
      target.addEventListener(eventName, callback, ...rests);
      const clearSelf = () => {
        target?.removeEventListener(eventName, callback);
        Promise.resolve().then(() => {
          eventListenerSet.delete(clearSelf);
        });
      };
      eventListenerSet.add(clearSelf);
      return clearSelf;
    } else {
      return noop;
    }
  }

  return () => {
    const { disabled, currentValue, min, max } = state;
    const { vertical, verticalReverse, style, railStyle, range, className, ...rest } = props;
    const wrapperClass = cls(
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-disabled`]: disabled,
        [`${cssClasses.VERTICAL}-wrapper`]: vertical,
        [`${prefixCls}-reverse`]: vertical && verticalReverse,
      },
      className
    );
    const boundaryClass = cls(`${prefixCls}-boundary`, {
      [`${prefixCls}-boundary-show`]: props.showBoundary && state.showBoundary,
    });
    const sliderCls = cls({
      [`${prefixCls}`]: !vertical,
      [cssClasses.VERTICAL]: vertical,
    });

    const fixedCurrentValue = Array.isArray(currentValue) ? [...currentValue].sort() : currentValue;
    const ariaLabel = range ? `Range: ${_getAriaValueText(fixedCurrentValue[0], 0)} to ${_getAriaValueText(fixedCurrentValue[1], 1)}` : undefined;

    const slider = (
      <div
        class={wrapperClass}
        style={style}
        ref={sliderEl}
        aria-label={ariaLabel}
        onMouseenter={() => foundation.handleWrapperEnter()}
        onMouseleave={() => foundation.handleWrapperLeave()}
        {...getDataAttr()}
      >
        {
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div class={`${prefixCls}-rail`} onClick={foundation.handleWrapClick} style={railStyle} />
        }
        {renderTrack()}
        {renderStepDot()}
        <div>{renderHandle()}</div>
        {renderLabel()}
        <div class={boundaryClass}>
          <span class={`${prefixCls}-boundary-min`}>{min}</span>
          <span class={`${prefixCls}-boundary-max`}>{max}</span>
        </div>
      </div>
    );
    if (!vertical) {
      return <div class={sliderCls}>{slider}</div>;
    }
    return slider;
  };
}, {
  props: vuePropsType,
  name: 'Slider'
});


export default Slider;
