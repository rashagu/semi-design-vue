import {defineComponent, ref, h, Fragment, useSlots, VNode, reactive, onMounted, onUnmounted, CSSProperties} from 'vue'
import cls from 'classnames';

import DateInputFoundation, {
  DateInputAdapter,
  DateInputFoundationProps,
  RangeType,
  InsetInputChangeProps,
  InsetInputChangeFoundationProps,
} from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/datePicker/constants';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import { IconCalendar, IconCalendarClock, IconClear } from '@kousum/semi-icons-vue';
import { BaseValueType, ValueType } from '@douyinfe/semi-foundation/datePicker/foundation';

import BaseComponent, {BaseProps, useBaseComponent} from '../_base/baseComponent';
import Input from '../input/index';
import { InsetDateInput, InsetTimeInput } from './insetInput';
import * as PropTypes from "../PropTypes";
import {CheckboxProps} from "../checkbox";

export interface DateInputProps extends DateInputFoundationProps, BaseProps {
  insetLabel?: VNode;
  prefix?: VNode;
  onClick?: (e: MouseEvent) => void;
  onChange?: (value: string, e: MouseEvent) => void;
  onEnterPress?: (e: KeyboardEvent) => void;
  onBlur?: (e: MouseEvent) => void;
  onFocus?: (e: MouseEvent, rangeType?: RangeType) => void;
  onClear?: (e: MouseEvent) => void;
  onInsetInputChange?: (options: InsetInputChangeProps) => void;
  value?: Date[];
}


export const vuePropsType = {
  onClick: {
    type: PropTypes.func,
    default: noop
  },
  onChange: {
    type: PropTypes.func,
    default: noop
  },
  onEnterPress: {
    type: PropTypes.func,
    default: noop
  },
  onBlur: {
    type: PropTypes.func,
    default: noop
  },
  onClear: {
    type: PropTypes.func,
    default: noop
  },
  onFocus: {
    type: PropTypes.func,
    default: noop
  },
  value: PropTypes.array,
  disabled: PropTypes.bool,
  type: {type: PropTypes.string, default: 'date'},
  showClear: {
    type: PropTypes.bool,
    default: true
  },
  format: PropTypes.string, // Attributes not used
  inputStyle: {
    type: PropTypes.object,
    default: ()=>({})
  },
  inputReadOnly: {
    type: PropTypes.bool,
    default: false
  }, // Text box can be entered
  insetLabel: PropTypes.node,
  validateStatus: PropTypes.string,
  prefix: PropTypes.node,
  prefixCls: {type: PropTypes.string, default: cssClasses.PREFIX},
  dateFnsLocale: PropTypes.any, // Foundation useful to
  placeholder: PropTypes.any,
  rangeInputFocus: PropTypes.any,
  rangeInputStartRef: PropTypes.object,
  rangeInputEndRef: PropTypes.object,
  rangeSeparator: {type: PropTypes.string, default: strings.DEFAULT_SEPARATOR_RANGE},
  insetInput: PropTypes.bool,
  insetInputValue: PropTypes.object,
  defaultPickerValue: PropTypes.any,
}
const dateInput = defineComponent<DateInputProps>((props, {}) => {
  const slots = useSlots()
  const state = reactive({isFocusing: false})
  const {cache, adapter: adapterInject, log, context: context_} = useBaseComponent<DateInputProps>(props, state)

  function adapter(): DateInputAdapter {
    return {
      ...adapterInject<CheckboxProps>(),
      updateIsFocusing: isFocusing => state.isFocusing = isFocusing,
      notifyClick: (...args) => props.onClick(...args),
      notifyChange: (...args) => props.onChange(...args),
      notifyEnter: (...args) => props.onEnterPress(...args),
      notifyBlur: (...args) => props.onBlur(...args),
      notifyClear: (...args) => props.onClear(...args),
      notifyFocus: (...args) => props.onFocus(...args),
      notifyRangeInputClear: (...args) => props.onRangeClear(...args),
      notifyRangeInputFocus: (...args) => props.onFocus(...args),
      notifyTabPress: (...args) => props.onRangeEndTabPress(...args),
      notifyInsetInputChange: options => props.onInsetInputChange(options),
    }
  }
  onMounted(()=>{
    foundation.init();
  })

  onUnmounted(()=>{
    foundation.destroy();
  })
  const foundation: DateInputFoundation = new DateInputFoundation(adapter());




  function formatText(value: ValueType) {
    // eslint-disable-next-line max-len
    return value && (value as BaseValueType[]).length ? foundation.formatShowText(value as BaseValueType[]) : '';
  }

  const handleChange = (value: string, e: any) => foundation.handleChange(value, e);

  const handleEnterPress = (e: KeyboardEvent) => foundation.handleInputComplete(e);

  const handleInputClear = (e: MouseEvent) => foundation.handleInputClear(e);

  const handleRangeInputChange = (rangeStart: string, rangeEnd: string, e: any) => {
    const rangeInputValue = getRangeInputValue(rangeStart, rangeEnd);
    foundation.handleChange(rangeInputValue, e);
  };

  const handleRangeInputClear: any = e => {
    foundation.handleRangeInputClear(e);
  };

  const handleRangeInputEnterPress = (e: KeyboardEvent, rangeStart: string, rangeEnd: string) => {
    const rangeInputValue = getRangeInputValue(rangeStart, rangeEnd);
    foundation.handleRangeInputEnterPress(e, rangeInputValue);
  };

  const handleRangeInputEndKeyPress = (e: KeyboardEvent) => {
    foundation.handleRangeInputEndKeyPress(e);
  };

  const handleRangeInputFocus = (e: MouseEvent, rangeType: RangeType) => {
    foundation.handleRangeInputFocus(e, rangeType);
  };

  const handleRangeStartFocus: any = e => {
    handleRangeInputFocus(e, 'rangeStart');
  };

  const handleInsetInputChange = (options: InsetInputChangeFoundationProps) => {
    foundation.handleInsetInputChange(options);
  };

  const getRangeInputValue = (rangeStart: string, rangeEnd: string) => {
    const { rangeSeparator } = props;
    const rangeInputValue = `${rangeStart}${rangeSeparator}${rangeEnd}`;
    return rangeInputValue;
  };

  function renderRangePrefix() {
    const { prefix, insetLabel, prefixCls, disabled, rangeInputFocus } = props;
    const labelNode = prefix || insetLabel;
    return labelNode ? (
      <div
        class={`${prefixCls}-range-input-prefix`}
        onClick={e => !disabled && !rangeInputFocus && handleRangeStartFocus(e)}
      >
        {labelNode}
      </div>
    ) : null;
  }

  function renderRangeSeparator(rangeStart: string, rangeEnd: string) {
    const { disabled, rangeSeparator } = props;
    const separatorCls = cls({
      [`${cssClasses.PREFIX}-range-input-separator`]: true,
      [`${cssClasses.PREFIX}-range-input-separator-active`]: (rangeStart || rangeEnd) && !disabled,
    });
    return (
      <span onClick={e => !disabled && handleRangeStartFocus(e)} class={separatorCls}>
                {rangeSeparator}
            </span>
    );
  }

  function renderRangeClearBtn(rangeStart: string, rangeEnd: string) {
    const { showClear, prefixCls, disabled } = props;
    const allowClear = (rangeStart || rangeEnd) && showClear;
    return allowClear && !disabled ? (
      <div
        role="button"
        tabindex={0}
        aria-label="Clear range input value"
        class={`${prefixCls}-range-input-clearbtn`}
        onMousedown={e => !disabled && handleRangeInputClear(e)}>
        <IconClear aria-hidden />
      </div>
    ) : null;
  }

  function renderRangeSuffix(suffix: VNode) {
    const { prefixCls, disabled, rangeInputFocus } = props;
    const rangeSuffix = suffix ? (
      <div
        class={`${prefixCls}-range-input-suffix`}
        onClick={e => !disabled && !rangeInputFocus && handleRangeStartFocus(e)}
      >
        {suffix}
      </div>
    ) : null;
    return rangeSuffix;
  }

  function renderRangeInput(rangeProps: DateInputProps) {
    const {
      // props
      placeholder,
      inputStyle,
      disabled,
      inputReadOnly,
      autofocus,
      size,
      // compute props
      text,
      suffix,
      inputCls,
      // range only props
      rangeInputStartRef,
      rangeInputEndRef,
      rangeInputFocus,
      prefixCls,
      rangeSeparator,
    } = rangeProps;

    const [rangeStart, rangeEnd = ''] = text.split(rangeSeparator) || [];
    const rangeSize = size === 'large' ? 'default' : 'small';
    const rangePlaceholder = Array.isArray(placeholder) ? placeholder : [placeholder, placeholder];
    const [rangeStartPlaceholder, rangeEndPlaceholder] = rangePlaceholder;
    const inputLeftWrapperCls = cls(`${prefixCls}-range-input-wrapper-start`, `${prefixCls}-range-input-wrapper`, {
      [`${prefixCls}-range-input-wrapper-active`]: rangeInputFocus === 'rangeStart' && !disabled,
      [`${prefixCls}-range-input-wrapper-start-with-prefix`]: props.prefix || props.insetLabel,
    });
    const inputRightWrapperCls = cls(`${prefixCls}-range-input-wrapper-end`, `${prefixCls}-range-input-wrapper`, {
      [`${prefixCls}-range-input-wrapper-active`]: rangeInputFocus === 'rangeEnd' && !disabled,
    });
    return (
      <>
        {renderRangePrefix()}
        <div
          onClick={e => !disabled && handleRangeInputFocus(e, 'rangeStart')}
          class={`${inputCls} ${inputLeftWrapperCls}`}
        >
          <Input
            size={rangeSize}
            style={inputStyle as CSSProperties}
            disabled={disabled}
            readonly={inputReadOnly}
            placeholder={rangeStartPlaceholder}
            value={rangeStart}
            // range input onBlur function is called when panel is closed
            // onBlur={noop}
            onChange={(rangeStartValue, e) => handleRangeInputChange(rangeStartValue, rangeEnd, e)}
            onEnterPress={e => handleRangeInputEnterPress(e, rangeStart, rangeEnd)}
            onFocus={e => handleRangeInputFocus(e as any, 'rangeStart')}
            autofocus={autofocus} // autofocus moved to range start
            ref={rangeInputStartRef}
          />
        </div>
        {renderRangeSeparator(rangeStart, rangeEnd)}
        <div
          class={`${inputCls} ${inputRightWrapperCls}`}
          onClick={e => !disabled && handleRangeInputFocus(e, 'rangeEnd')}
        >
          <Input
            size={rangeSize}
            style={inputStyle as CSSProperties}
            disabled={disabled}
            readonly={inputReadOnly}
            placeholder={rangeEndPlaceholder}
            value={rangeEnd}
            // range input onBlur function is called when panel is closed
            // onBlur={noop}
            onChange={(rangeEndValue, e) => handleRangeInputChange(rangeStart, rangeEndValue, e)}
            onEnterPress={e => handleRangeInputEnterPress(e, rangeStart, rangeEnd)}
            onFocus={e => handleRangeInputFocus(e as any, 'rangeEnd')}
            onKeydown={handleRangeInputEndKeyPress} // only monitor tab button on range end
            ref={rangeInputEndRef}
          />
        </div>
        {renderRangeClearBtn(rangeStart, rangeEnd)}
        {renderRangeSuffix(suffix)}
      </>
    );
  }

  function renderInputInset() {
    const {
      type,
      handleInsetDateFocus,
      handleInsetTimeFocus,
      value,
      insetInputValue,
      prefixCls,
      rangeInputStartRef,
      rangeInputEndRef,
      density,
    } = props;

    const _isRangeType = type.includes('Range');
    const newInsetInputValue = foundation.getInsetInputValue({ value, insetInputValue });
    const { datePlaceholder, timePlaceholder } = foundation.getInsetInputPlaceholder();

    const insetInputWrapperCls = `${prefixCls}-inset-input-wrapper`;
    const separatorCls = `${prefixCls}-inset-input-separator`;

    return (
      <div class={insetInputWrapperCls} x-type={type}>
        <InsetDateInput
          forwardRef={rangeInputStartRef}
          insetInputValue={newInsetInputValue}
          placeholder={datePlaceholder}
          valuePath={'monthLeft.dateInput'}
          onChange={handleInsetInputChange}
          onFocus={e => handleInsetDateFocus(e, 'rangeStart')}
        />
        <InsetTimeInput
          disabled={!newInsetInputValue.monthLeft.dateInput}
          insetInputValue={newInsetInputValue}
          placeholder={timePlaceholder}
          type={type}
          valuePath={'monthLeft.timeInput'}
          onChange={handleInsetInputChange}
          onFocus={handleInsetTimeFocus}
        />
        {_isRangeType && (
          <>
            <div class={separatorCls}>{density === 'compact' ? null : '-'}</div>
            <InsetDateInput
              forwardRef={rangeInputEndRef}
              insetInputValue={newInsetInputValue}
              placeholder={datePlaceholder}
              valuePath={'monthRight.dateInput'}
              onChange={handleInsetInputChange}
              onFocus={e => handleInsetDateFocus(e, 'rangeEnd')}
            />
            <InsetTimeInput
              disabled={!newInsetInputValue.monthRight.dateInput}
              insetInputValue={newInsetInputValue}
              placeholder={timePlaceholder}
              type={type}
              valuePath={'monthRight.timeInput'}
              onChange={handleInsetInputChange}
              onFocus={handleInsetTimeFocus}
            />
          </>
        )}
      </div>
    );
  }

  function renderTriggerInput() {
    const {
      placeholder,
      type,
      value,
      inputValue,
      inputStyle,
      disabled,
      showClear,
      inputReadOnly,
      insetLabel,
      validateStatus,
      block,
      prefixCls,
      multiple, // Whether to allow multiple values for email and file types
      dateFnsLocale, // No need to pass to input
      onBlur,
      onClear,
      onFocus,
      prefix,
      autofocus,
      size,
      // range input support props, no need passing to not range type
      rangeInputStartRef,
      rangeInputEndRef,
      onRangeClear,
      onRangeBlur,
      onRangeEndTabPress,
      rangeInputFocus,
      rangeSeparator,
      insetInput,
      insetInputValue,
      defaultPickerValue,
      ...rest
    } = props;
    const dateIcon = <IconCalendar aria-hidden />;
    const dateTimeIcon = <IconCalendarClock aria-hidden />;
    const suffix = type.includes('Time') ? dateTimeIcon : dateIcon;
    let text = '';

    if (!isNullOrUndefined(inputValue)) {
      text = inputValue;
    } else if (value) {
      text = formatText(value);
    }

    const inputCls = cls({
      [`${prefixCls}-input-readonly`]: inputReadOnly,
    });

    const isRangeType = /range/i.test(type);
    const rangeProps = { ...props, text, suffix, inputCls };

    const inputProps = {
      ...rest,
      insetLabel: insetLabel,
      disabled: disabled,
      readonly: inputReadOnly,
      className: inputCls,
      style: inputStyle as CSSProperties,
      hideSuffix: showClear,
      placeholder: placeholder,
      onEnterPress: handleEnterPress,
      onChange: handleChange,
      onClear: handleInputClear,
      suffix: suffix,
      showClear: showClear,
      value: text,
      validateStatus: validateStatus,
      prefix: prefix,
      autofocus: autofocus,
      size: size,
      onBlur: onBlur as any,
      onFocus: onFocus as any,
    }
    return isRangeType ? (
      renderRangeInput(rangeProps)
    ) : (
      <Input
        {...inputProps}
      />
    );
  }

  return () => {
    const { insetInput } = props;
    return insetInput ? renderInputInset() : renderTriggerInput();
  }
})

dateInput.props = vuePropsType

export default dateInput

