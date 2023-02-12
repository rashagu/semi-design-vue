import * as PropTypes from '../PropTypes';
import classnames from 'classnames';
import Input, {InputProps} from '../input';
import {forwardStatics} from '@douyinfe/semi-foundation/utils/object';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import isBothNaN from '@douyinfe/semi-foundation/utils/isBothNaN';
import InputNumberFoundation, {
  BaseInputNumberState,
  InputNumberAdapter
} from '@douyinfe/semi-foundation/inputNumber/foundation';
import {useBaseComponent} from '../_base/baseComponent';
import {cssClasses, numbers, strings} from '@douyinfe/semi-foundation/inputNumber/constants';
import {IconChevronUp, IconChevronDown} from '@kousum/semi-icons-vue';

import '@douyinfe/semi-foundation/inputNumber/inputNumber.scss';
import {isNaN, isString, noop} from 'lodash';
import {ArrayElement} from '../_base/base';
import {CSSProperties, defineComponent, h, nextTick, reactive, useSlots, VNode, watch} from "vue";
import {vuePropsMake} from "../PropTypes";
import {YearAndMonthProps} from "../datePicker";

export interface InputNumberProps extends InputProps {
  autofocus?: boolean;
  className?: string;
  defaultValue?: number | string;
  disabled?: boolean;
  formatter?: (value: number | string) => string;
  forwardedRef?: any;
  hideButtons?: boolean;
  innerButtons?: boolean;
  insetLabel?: VNode;
  insetLabelId?: string;
  keepFocus?: boolean;
  max?: number;
  min?: number;
  parser?: (value: string) => string;
  precision?: number;
  prefixCls?: string;
  pressInterval?: number;
  pressTimeout?: number;
  shiftStep?: number;
  showClear?: boolean;
  size?: ArrayElement<typeof strings.SIZE>;
  step?: number;
  style?: CSSProperties;
  suffix?: VNode;
  value?: number | string;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (value: number | string, e?: any) => void;
  onDownClick?: (value: string, e: MouseEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeyDown?: any;
  onNumberChange?: (value: number, e?: any) => void;
  onUpClick?: (value: string, e: MouseEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputNumberState extends BaseInputNumberState {
}


const propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-errormessage': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-required': PropTypes.bool,
  autofocus: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: [PropTypes.number, PropTypes.string],
  disabled: PropTypes.bool,
  formatter: PropTypes.func,
  forwardedRef: PropTypes.any,
  hideButtons: PropTypes.bool,
  innerButtons: PropTypes.bool,
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  keepFocus: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  parser: PropTypes.func,
  precision: PropTypes.number,
  prefixCls: PropTypes.string,
  pressInterval: PropTypes.number,
  pressTimeout: PropTypes.number,
  preventScroll: PropTypes.bool,
  shiftStep: PropTypes.number,
  step: PropTypes.number,
  style: PropTypes.object,
  suffix: {
    type: PropTypes.any,
    default: undefined
  },
  value: [PropTypes.number, PropTypes.string],
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDownClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onNumberChange: PropTypes.func,
  onUpClick: PropTypes.func,
};

const defaultProps: InputNumberProps = {
  forwardedRef: noop,
  innerButtons: false,
  keepFocus: false,
  max: Infinity,
  min: -Infinity,
  prefixCls: cssClasses.PREFIX,
  pressInterval: numbers.DEFAULT_PRESS_TIMEOUT,
  pressTimeout: numbers.DEFAULT_PRESS_TIMEOUT,
  shiftStep: numbers.DEFAULT_SHIFT_STEP,
  size: strings.DEFAULT_SIZE,
  step: numbers.DEFAULT_STEP,
  onBlur: noop,
  onChange: noop,
  onDownClick: noop,
  onFocus: noop,
  onKeyDown: noop,
  onNumberChange: noop,
  onUpClick: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const InputNumber = defineComponent<InputNumberProps>((props, {}) => {
  let cursorStart!: number;
  let cursorEnd!: number;
  let currentValue!: number | string;
  let cursorBefore!: string;
  let cursorAfter!: string;
  const state = reactive<InputNumberState>({
    value: '',
    number: null, // Current parsed numbers
    focusing: Boolean(props.autofocus) || false,
    hovering: false,
  })
  let inputNode = null;
  let clickUpOrDown = false;

  const {adapter: adapterInject} = useBaseComponent<InputNumberProps>(props, state)

  function adapter_(): InputNumberAdapter {
    return {
      ...adapterInject<InputNumberProps, InputNumberState>(),
      setValue: (value, cb) => {
        state.value = value
        nextTick(() => {
          cb?.()
        })
      },
      setNumber: (number, cb) => {
        state.number = number
        nextTick(() => {
          cb?.()
        })
      },
      setFocusing: (focusing, cb) => {
        state.focusing = focusing
        nextTick(() => {
          cb?.()
        })
      },
      setHovering: hovering => state.hovering = hovering,
      notifyChange: (...args) => props.onChange(...args),
      notifyNumberChange: (...args) => props.onNumberChange(...args),
      notifyBlur: e => props.onBlur(e),
      notifyFocus: e => props.onFocus(e),
      notifyUpClick: (value, e) => props.onUpClick(value, e),
      notifyDownClick: (value, e) => props.onDownClick(value, e),
      notifyKeyDown: e => props.onKeyDown(e),
      registerGlobalEvent: (eventName, handler) => {
        if (eventName && typeof handler === 'function') {
          adapter.unregisterGlobalEvent(eventName);
          adapter.setCache(eventName, handler);

          document.addEventListener(eventName, handler);
        }
      },
      unregisterGlobalEvent: eventName => {
        if (eventName) {
          const handler = adapter.getCache(eventName);
          document.removeEventListener(eventName, handler);
          adapter.setCache(eventName, null);
        }
      },
      recordCursorPosition: () => {
        // Record position
        try {
          if (inputNode) {
            cursorStart = inputNode.selectionStart;
            cursorEnd = inputNode.selectionEnd;
            currentValue = inputNode.value;
            cursorBefore = inputNode.value.substring(0, cursorStart);
            cursorAfter = inputNode.value.substring(cursorEnd);
          }
        } catch (e) {
          console.warn(e);
          // Fix error in Chrome:
          // Failed to read the 'selectionStart' property from 'HTMLInputElement'
          // http://stackoverflow.com/q/21177489/3040605
        }
      },
      restoreByAfter: str => {
        if (isNullOrUndefined(str)) {
          return false;
        }

        const fullStr = inputNode.value;
        const index = fullStr.lastIndexOf(str);

        if (index === -1) {
          return false;
        }

        if (index + str.length === fullStr.length) {
          adapter.fixCaret(index, index);

          return true;
        }
        return false;
      },
      restoreCursor: (str = cursorAfter) => {
        if (isNullOrUndefined(str)) {
          return false;
        }

        // For loop from full str to the str with last char to map. e.g. 123
        // -> 123
        // -> 23
        // -> 3
        return Array.prototype.some.call(str, (_: any, start: number) => {
          const partStr = str.substring(start);

          return adapter.restoreByAfter(partStr);
        });
      },
      fixCaret: (start, end) => {
        if (start === undefined || end === undefined || !inputNode || !inputNode.value) {
          return;
        }

        try {
          const currentStart = inputNode.selectionStart;
          const currentEnd = inputNode.selectionEnd;

          if (start !== currentStart || end !== currentEnd) {
            inputNode.setSelectionRange(start, end);
          }
        } catch (e) {
          // Fix error in Chrome:
          // Failed to read the 'selectionStart' property from 'HTMLInputElement'
          // http://stackoverflow.com/q/21177489/3040605
        }
      },
      setClickUpOrDown: value => {
        clickUpOrDown = value;
      },
      updateStates: (states, callback) => {
        Object.keys(states).forEach(key => {
          state[key] = states[key]
        })
        nextTick(() => {
          callback?.()
        })
      }
    };
  }

  const adapter = adapter_()
  let foundation = new InputNumberFoundation(adapter);


  watch([
    () => props.value,
    () => props.preventScroll,
    () => state.focusing
  ], (val, [prevPropsValue, prevPropsPreventScroll, prevStateFocusing]) => {

    const {value, preventScroll} = props;
    const {focusing} = state;

    let newValue;
    /**
     * To determine whether the front and back are equal
     * NaN need to check whether both are NaN
     */
    if (value !== prevPropsValue && !isBothNaN(value, prevPropsValue)) {
      if (isNullOrUndefined(value) || value === '') {
        newValue = '';
        foundation.updateStates({value: newValue, number: null});
      } else {
        let valueStr = value;
        if (typeof value === 'number') {
          valueStr = value.toString();
        }

        const parsedNum = foundation.doParse(valueStr, false, true, true);
        const toNum = typeof value === 'number' ? value : foundation.doParse(valueStr, false, false, false);

        /**
         * focusing 状态为输入状态，输入状态的受控值要特殊处理
         * 如：
         *  - 输入合法值
         *      123 => input value 也应该是 123，同时需要设置 number 为 123
         *  - 输入非法值，只设置 input value，不设置非法的number
         *      abc => input value 这时是 abc，但失焦后会进行格式化
         *      100（超出范围） => input value 应该是 100，但不设置 number
         *
         * 保持输入态有三种方式
         * 1. 输入框输入
         *  - 输入可以解析为合法数字，input value根据输入值确定，失焦时更新input value
         *  - 输入不可解析为合法数字，进行格式化后显示在input框
         * 2. 键盘点击上下按钮（input value根据受控值进行更改）
         * 3. keepFocus+鼠标点击上下按钮（input value根据受控值进行更改）
         *
         * The focusing state is the input state, and the controlled value of the input state needs special treatment
         * For example:
         *  - input legal value
         *      123 = > input value should also be 123, and the number should be set to 123
         *  - input illegal value, only set the input value, do not set the illegal number
         *      abc = > input value This is abc at this time, but it will be formatted after being out of focus
         *      100 (out of range) = > input value should be 100, but no number
         *
         * There are three ways to maintain the input state
         * 1. input box input
         *  - input can be resolved into legal numbers, input value is determined according to the input value, and input value is updated when out of focus
         *  - input cannot be resolved into legal numbers, and it will be displayed in the input box after formatting
         * 2. Keyboard click on the up and down button (input value is changed according to the controlled value)
         * 3.keepFocus + mouse click on the up and down button (input value is changed according to the controlled value)
         */
        if (focusing) {
          if (foundation.isValidNumber(parsedNum) && parsedNum !== state.number) {
            const obj: { number?: number; value?: string } = {number: parsedNum};
            /**
             * If you are clicking the button, it will automatically format once
             * We need to set the status to false after trigger focus event
             */
            if (clickUpOrDown) {
              obj.value = foundation.doFormat(valueStr, true);
              newValue = obj.value;
            }
            foundation.updateStates(obj, () => adapter.restoreCursor());
          } else if (!isNaN(toNum)) {
            // Update input content when controlled input is illegal and not NaN
            newValue = foundation.doFormat(toNum, false);
            foundation.updateStates({value: newValue});
          } else {
            // Update input content when controlled input NaN
            newValue = foundation.doFormat(valueStr, false);
            foundation.updateStates({value: newValue});
          }
        } else if (foundation.isValidNumber(parsedNum)) {
          newValue = foundation.doFormat(parsedNum);
          foundation.updateStates({number: parsedNum, value: newValue});
        } else {
          // Invalid digital analog blurring effect instead of controlled failure
          newValue = '';
          foundation.updateStates({number: null, value: newValue});
        }
      }
      if (newValue && isString(newValue) && newValue !== String(props.value)) {
        foundation.notifyChange(newValue, null);
      }
    }

    if (!clickUpOrDown) {
      return;
    }

    if (props.keepFocus && state.focusing) {
      if (document.activeElement !== inputNode) {
        inputNode.focus({preventScroll});
      }
    }
  }, {immediate: true})


  const setInputRef = (node: any) => {
    const {forwardedRef} = props;
    inputNode = node;

    if (forwardedRef && typeof forwardedRef === 'object') {
      forwardedRef.current = node;
    } else if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    }
  };

  const handleInputFocus = (e: FocusEvent) => foundation.handleInputFocus(e);

  const handleInputChange = (value: string, event: any) => foundation.handleInputChange(value, event);

  const handleInputBlur = (e: FocusEvent) => foundation.handleInputBlur(e);

  const handleInputKeyDown = (e: KeyboardEvent) => foundation.handleInputKeyDown(e);

  const handleInputMouseEnter = (e: MouseEvent) => foundation.handleInputMouseEnter(e);

  const handleInputMouseLeave = (e: MouseEvent) => foundation.handleInputMouseLeave(e);

  const handleInputMouseMove = (e: MouseEvent) => foundation.handleInputMouseMove(e);

  const handleUpClick = (e: KeyboardEvent) => {
    foundation.handleUpClick(e)
  };

  const handleDownClick = (e: KeyboardEvent) => {
    foundation.handleDownClick(e)
  };

  const handleMouseUp = (e: MouseEvent) => {
    // @ts-ignore
    // e.persist = noop
    foundation.handleMouseUp(e)
  };

  const handleMouseLeave = (e: MouseEvent) => {
    // @ts-ignore
    // e.persist = noop
    foundation.handleMouseLeave(e)
  };

  const renderButtons = () => {
    const {prefixCls, disabled, innerButtons, max, min} = props;
    const {hovering, focusing, number} = state;
    const notAllowedUp = disabled ? disabled : number === max;
    const notAllowedDown = disabled ? disabled : number === min;
    const suffixChildrenCls = classnames(`${prefixCls}-number-suffix-btns`, {
      [`${prefixCls}-number-suffix-btns-inner`]: innerButtons,
      [`${prefixCls}-number-suffix-btns-inner-hover`]: innerButtons && hovering && !focusing
    });
    const upClassName = classnames(`${prefixCls}-number-button`, `${prefixCls}-number-button-up`, {
      [`${prefixCls}-number-button-up-disabled`]: disabled,
      [`${prefixCls}-number-button-up-not-allowed`]: notAllowedUp,
    });
    const downClassName = classnames(`${prefixCls}-number-button`, `${prefixCls}-number-button-down`, {
      [`${prefixCls}-number-button-down-disabled`]: disabled,
      [`${prefixCls}-number-button-down-not-allowed`]: notAllowedDown,
    });

    return (
      <div class={suffixChildrenCls}>
                <span
                  class={upClassName}
                  onMousedown={notAllowedUp ? noop : handleUpClick}
                  onMouseup={handleMouseUp}
                  onMouseleave={handleMouseLeave}
                >
                    <IconChevronUp size="extra-small"/>
                </span>
        <span
          class={downClassName}
          onMousedown={notAllowedDown ? noop : handleDownClick}
          onMouseup={handleMouseUp}
          onMouseleave={handleMouseLeave}
        >
                    <IconChevronDown size="extra-small"/>
                </span>
      </div>
    );
  };

  const renderSuffix = () => {
    const {innerButtons, suffix} = props;
    const {hovering, focusing} = state;

    if (innerButtons && (hovering || focusing)) {
      const buttons = renderButtons();
      return buttons;
    }
    return suffix;
  };


  return () => {
    const {
      disabled,
      className,
      prefixCls,
      min,
      max,
      step,
      shiftStep,
      precision,
      formatter,
      parser,
      forwardedRef,
      onUpClick,
      onDownClick,
      pressInterval,
      pressTimeout,
      suffix,
      size,
      hideButtons,
      innerButtons,
      style,
      onNumberChange,
      keepFocus,
      defaultValue,
      ...rest
    } = props;
    const {value, number} = state;

    const inputNumberCls = classnames(className, `${prefixCls}-number`, {
      [`${prefixCls}-number-size-${size}`]: size,
    });

    const buttons = renderButtons();
    const ariaProps = {
      'aria-disabled': disabled,
      step,
    };
    if (number) {
      ariaProps['aria-valuenow'] = number;
    }
    if (max !== Infinity) {
      ariaProps['aria-valuemax'] = max;
    }
    if (min !== -Infinity) {
      ariaProps['aria-valuemin'] = min;
    }

    const input = (
      <div
        class={inputNumberCls}
        style={style}
        onMousemove={e => handleInputMouseMove(e)}
        onMouseenter={e => handleInputMouseEnter(e)}
        onMouseleave={e => handleInputMouseLeave(e)}
      >
        <Input
          role="spinbutton"
          {...{
            ...ariaProps,
            ...rest,
            size,
            disabled,
            ref: setInputRef,
            value,
            onFocus: handleInputFocus,
            onChange: handleInputChange,
            onBlur: handleInputBlur,
            onKeyDown: handleInputKeyDown,
            suffix: renderSuffix(),
          }}
        />
        {(hideButtons || innerButtons) ? null : (
          buttons
        )}
      </div>
    );
    return input;
  }
})

InputNumber.props = vuePropsType
InputNumber.name = 'InputNumber'


export default InputNumber;
