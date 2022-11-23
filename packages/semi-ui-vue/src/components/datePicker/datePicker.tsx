import {defineComponent, ref, h, Fragment, useSlots, VNode, reactive, watch, onMounted, onUnmounted} from 'vue'
import classnames from 'classnames';
import {noop, stubFalse, isDate, get, isFunction, isEqual} from 'lodash';
import DatePickerFoundation from '@douyinfe/semi-foundation/datePicker/foundation';
import type { DatePickerAdapter, DatePickerFoundationProps, DatePickerFoundationState, DayStatusType, PresetType, Type, RangeType } from '@douyinfe/semi-foundation/datePicker/foundation';

import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/datePicker/constants';
import { strings as popoverStrings, numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import {useBaseComponent} from '../_base/baseComponent';
import Popover from '../popover/index';
import DateInput from './dateInput';
import type { DateInputProps }from './dateInput';
import MonthsGrid from './monthsGrid';
import type { MonthsGridProps } from './monthsGrid';
import QuickControl from './quickControl';
import Footer from './footer';
import Trigger from '../trigger';
import YearAndMonth from './yearAndMonth';
import type { YearAndMonthProps } from './yearAndMonth';
import '@douyinfe/semi-foundation/datePicker/datePicker.scss';
import { Locale } from '../locale/interface';
import type { TimePickerProps } from '../timePicker';
import type { ScrollItemProps } from '../scrollList';
import type { InsetInputValue, InsetInputChangeProps } from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import type {AriaAttributes} from "../AriaAttributes";
import * as PropTypes from '../PropTypes'
import {vuePropsMake} from "../PropTypes";
import {VueJsxNode} from "../interface";
import {useConfigContext} from "../configProvider/context/Consumer";


export interface DatePickerProps extends DatePickerFoundationProps {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  timePickerOpts?: TimePickerProps;
  bottomSlot?: VueJsxNode;
  insetLabel?: VueJsxNode;
  insetLabelId?: string;
  prefix?: VueJsxNode;
  topSlot?: VueJsxNode;
  renderDate?: (dayNumber?: number, fullDate?: string) => VueJsxNode;
  renderFullDate?: (dayNumber?: number, fullDate?: string, dayStatus?: DayStatusType) => VueJsxNode;
  triggerRender?: (props: DatePickerProps) => VueJsxNode;
  onBlur?: any;
  onClear?: any;
  onFocus?: (e: MouseEvent, rangeType: RangeType) => void;
  onPresetClick?: (item: PresetType, e: MouseEvent) => void;
  locale?: Locale['DatePicker'];
  dateFnsLocale?: Locale['dateFnsLocale'];
  yearAndMonthOpts?: ScrollItemProps<any>
}

export type DatePickerState = DatePickerFoundationState;

const propTypes = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  type: String,
  size: String,
  density: String,
  defaultValue: [PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array],
  value: [PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array],
  defaultPickerValue: [
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ],
  disabledTime: PropTypes.func,
  disabledTimePicker: PropTypes.bool,
  hideDisabledOptions: PropTypes.bool,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  max: PropTypes.number, // only work when multiple is true
  placeholder: [PropTypes.string, PropTypes.array],
  presets: PropTypes.array,
  onChange: PropTypes.func,
  onChangeWithDateFirst: PropTypes.bool,
  weekStartsOn: PropTypes.number,
  disabledDate: PropTypes.func,
  timePickerOpts: PropTypes.object, // When dateTime, dateTimeRange, pass through the props to timePicker
  showClear: PropTypes.bool, // Whether to show the clear button
  onOpenChange: PropTypes.func,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  motion: [PropTypes.bool, PropTypes.func, PropTypes.object],
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  prefix: PropTypes.node,
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  zIndex: PropTypes.number,
  position: String,
  getPopupContainer: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  needConfirm: PropTypes.bool,
  inputStyle: PropTypes.object,
  timeZone: [PropTypes.string, PropTypes.number],
  triggerRender: PropTypes.func,
  stopPropagation: [PropTypes.bool, PropTypes.string],
  autoAdjustOverflow: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClear: PropTypes.func,
  style: PropTypes.object,
  autoFocus: PropTypes.bool,
  inputReadOnly: PropTypes.bool, // Text box can be entered
  validateStatus: String,
  renderDate: PropTypes.func,
  renderFullDate: PropTypes.func,
  spacing: PropTypes.number,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  autoSwitchDate: PropTypes.bool,
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.object,
  topSlot: PropTypes.node,
  bottomSlot: PropTypes.node,
  dateFnsLocale: PropTypes.object, // isRequired, but no need to add isRequired key. ForwardStatics function pass static properties to index.jsx, so there is no need for user to pass the prop.
  // Support synchronous switching of months
  syncSwitchMonth: PropTypes.bool,
  // Callback function for panel date switching
  onPanelChange: PropTypes.func,
  rangeSeparator: PropTypes.string,
  preventScroll: PropTypes.bool,
  yearAndMonthOpts: PropTypes.object,
  locale: Object,
};

const defaultProps = {
  open: undefined,
  onChangeWithDateFirst: true,
  autoAdjustOverflow: true,
  stopPropagation: true,
  motion: true,
  prefixCls: cssClasses.PREFIX,
  // position: 'bottomLeft',
  zIndex: popoverNumbers.DEFAULT_Z_INDEX,
  type: 'date',
  size: 'default',
  density: 'default',
  disabled: false,
  multiple: false,
  defaultOpen: false,
  disabledHours: noop,
  disabledMinutes: noop,
  disabledSeconds: noop,
  hideDisabledOptions: false,
  onBlur: noop,
  onFocus: noop,
  onClear: noop,
  onCancel: noop,
  onConfirm: noop,
  onChange: noop,
  onOpenChange: noop,
  onPanelChange: noop,
  onPresetClick: noop,
  weekStartsOn: numbers.WEEK_START_ON,
  disabledDate: stubFalse,
  disabledTime: stubFalse,
  inputReadOnly: false,
  spacing: numbers.SPACING,
  autoSwitchDate: true,
  syncSwitchMonth: false,
  rangeSeparator: strings.DEFAULT_SEPARATOR_RANGE,
  insetInput: false
};
export const vuePropsTypeDatePickerProps = vuePropsMake(propTypes, defaultProps)
console.log(vuePropsTypeDatePickerProps)
const DatePicker = defineComponent<DatePickerProps>((props, {}) => {
  const slots = useSlots()
  console.log(props)

  let clickOutSideHandler: (e: MouseEvent) => void;
  let _mounted: boolean;
  const state = reactive<DatePickerState>({
    panelShow: props.open || props.defaultOpen,
    isRange: false,
    inputValue: null, // Staging input values
    value: [], // The currently selected date, each date is a Date object
    cachedSelectedValue: null, // Save last selected date, maybe include null
    prevTimeZone: null,
    // motionEnd: false, // Monitor if popover animation ends
    rangeInputFocus: undefined, // Optional'rangeStart ',' rangeEnd ', false
    autofocus: props.autoFocus || (isRangeType(props.type, props.triggerRender) && (props.open || props.defaultOpen)),
    insetInputValue: null,
    triggerDisabled: undefined,
  });

  const triggerElRef = ref();
  const panelRef = ref();
  const monthGrid = ref();
  const rangeInputStartRef = ref();
  const rangeInputEndRef =ref();
  // @ts-ignore ignore readonly
  const focusRecordsRef = ref({
    current:{
      rangeStart: false,
      rangeEnd: false
    }
  });

  const {cache, adapter: adapterInject, log, context: context_, isControlled} = useBaseComponent<DatePickerProps>(props, state)

  const foundation = new DatePickerFoundation(adapter());

  function adapter(): DatePickerAdapter {
    return {
      ...adapterInject<DatePickerProps, DatePickerState>(),
      togglePanel: panelShow => {
        state.panelShow = panelShow
        if (!panelShow) {
          focusRecordsRef.value.current.rangeEnd = false;
          focusRecordsRef.value.current.rangeStart = false;
        }
      },
      registerClickOutSide: () => {
        if (clickOutSideHandler) {
          adapter().unregisterClickOutSide();
          clickOutSideHandler = null;
        }
        clickOutSideHandler = e => {
          if (adapter().needConfirm()) {
            return;
          }
          const triggerEl = triggerElRef.value;
          const panelEl = panelRef.value;
          const isInTrigger = triggerEl && triggerEl.contains(e.target as Node);
          const isInPanel = panelEl && panelEl.contains(e.target as Node);
          if (!isInTrigger && !isInPanel && _mounted) {
            foundation.closePanel(e);
          }
        };
        document.addEventListener('mousedown', clickOutSideHandler);
      },
      unregisterClickOutSide: () => {
        document.removeEventListener('mousedown', clickOutSideHandler);
      },
      notifyBlur: (...args) => props.onBlur(...args),
      notifyFocus: (...args) => {
        console.log(props.onFocus)
        props.onFocus(...args)
      },
      notifyClear: (...args) => props.onClear(...args),
      notifyChange: (...args) => props.onChange(...args),
      notifyCancel: (...args) => props.onCancel(...args),
      notifyConfirm: (...args) => props.onConfirm(...args),
      notifyOpenChange: (...args) => props.onOpenChange(...args),
      notifyPresetsClick: (...args) => props.onPresetClick(...args),
      updateValue: value => state.value = value,
      updatePrevTimezone: prevTimeZone => state.prevTimeZone = prevTimeZone,
      updateCachedSelectedValue: cachedSelectedValue => {
        let _cachedSelectedValue = cachedSelectedValue;
        if (cachedSelectedValue && !Array.isArray(cachedSelectedValue)) {
          _cachedSelectedValue = [...cachedSelectedValue as any];
        }
        state.cachedSelectedValue = _cachedSelectedValue
      },
      updateInputValue: inputValue => {
        state.inputValue = inputValue;
      },
      updateInsetInputValue: (insetInputValue: InsetInputValue) => {
        const { insetInput } = props;
        if (insetInput && !isEqual(insetInputValue, state.insetInputValue)) {
          state.insetInputValue = insetInputValue;
        }
      },
      needConfirm: () =>
        ['dateTime', 'dateTimeRange'].includes(props.type) && props.needConfirm === true,
      typeIsYearOrMonth: () => ['month', 'year'].includes(props.type),
      // setMotionEnd: motionEnd => state.motionEnd = motionEnd,
      setRangeInputFocus: rangeInputFocus => {
        if (rangeInputFocus !== state.rangeInputFocus) {
          state.rangeInputFocus = rangeInputFocus;
        }
        switch (rangeInputFocus) {
          case 'rangeStart':
            const inputStartNode = rangeInputStartRef.value.current;
            inputStartNode && inputStartNode.focus();
            /**
             * 解决选择完startDate，切换到endDate后panel被立马关闭的问题。
             * 用户打开panel，选了startDate后，会执行setRangeInputFocus('rangeEnd'),focus到endDateInput，
             * 同时会走到datePicker/foundation.js中的handleSelectedChange方法，在这个方法里会根据focusRecordsRef来判断是否可以关闭panel。
             * 如果在setRangeInputFocus里同步修改了focusRecordsRef的状态为true，那在handleSelectedChange里会误判startDate和endDate都已经完成选择，
             * 导致endDate还没选就关闭了panel
             *
             * Fix the problem that the panel is closed immediately after switching to endDate after starting Date is selected.
             * The user opens the panel and after starting Date is selected, setRangeInputFocus ('rangeEnd') will be executed, focus to endDateInput,
             * At the same time, it will go to the handleSelectedChange method in datePicker/foundation.js, where it will be determined whether the panel can be closed according to focusRecordsRef.
             * If the status of focusRecordsRef is modified synchronously in setRangeInputFocus to true, then in handleSelectedChange it will be misjudged that both begDate and endDate have completed the selection,
             * resulting in the panel being closed before endDate is selected
             */
            setTimeout(() => {
              focusRecordsRef.value.current.rangeStart = true;
            }, 0);
            break;
          case 'rangeEnd':
            // console.log(rangeInputEndRef.value)
            const inputEndNode = rangeInputEndRef.value;
            inputEndNode && inputEndNode.focus();
            /**
             * 解决选择完startDate，切换到endDate后panel被立马关闭的问题。
             * 用户打开panel，选了startDate后，会执行setRangeInputFocus('rangeEnd'),focus到endDateInput，
             * 同时会走到datePicker/foundation.js中的handleSelectedChange方法，在这个方法里会根据focusRecordsRef来判断是否可以关闭panel。
             * 如果在setRangeInputFocus里同步修改了focusRecordsRef的状态为true，那在handleSelectedChange里会误判startDate和endDate都已经完成选择，
             * 导致endDate还没选就关闭了panel
             *
             * Fix the problem that the panel is closed immediately after switching to endDate after starting Date is selected.
             * The user opens the panel and after starting Date is selected, setRangeInputFocus ('rangeEnd') will be executed, focus to endDateInput,
             * At the same time, it will go to the handleSelectedChange method in datePicker/foundation.js, where it will be determined whether the panel can be closed according to focusRecordsRef.
             * If the status of focusRecordsRef is modified synchronously in setRangeInputFocus to true, then in handleSelectedChange it will be misjudged that both begDate and endDate have completed the selection,
             * resulting in the panel being closed before endDate is selected
             */
            setTimeout(() => {
              focusRecordsRef.value.current.rangeEnd = true;
            }, 0);
            break;
          default:
            return;
        }
      },
      couldPanelClosed: () => focusRecordsRef.value.current.rangeStart && focusRecordsRef.value.current.rangeEnd,
      isEventTarget: e => e && e.target === e.currentTarget,
      setInsetInputFocus: () => {
        const { preventScroll } = props;
        const { rangeInputFocus } = state;
        switch (rangeInputFocus) {
          case 'rangeEnd':
            console.log(rangeInputEndRef.value)
            if (document.activeElement !== rangeInputEndRef.value) {
              const inputEndNode = rangeInputEndRef.value;
              inputEndNode && inputEndNode.focus();
            }
            break;
          case 'rangeStart':
          default:
            console.log(rangeInputEndRef.value)
            if (document.activeElement !== rangeInputEndRef.value) {
              const inputStartNode = rangeInputStartRef.value;
              inputStartNode && inputStartNode.focus({ preventScroll });
            }
            break;
        }
      },
      setTriggerDisabled: (disabled: boolean) => {
        state.triggerDisabled = disabled
      }
    };
  }

  adapter().setCache('cachedSelectedValue', null);

  function isRangeType(type: Type, triggerRender: DatePickerProps['triggerRender']) {
    return /range/i.test(type) && !isFunction(triggerRender);
  }

  watch([()=>props.value, ()=>props.timeZone], ([prevPropsValue, prevPropsTimeZone])=>{
    if (prevPropsValue !== props.value) {
      foundation.initFromProps({
        ...props,
      });
    }else if (props.timeZone !== prevPropsTimeZone) {
      foundation.initFromProps({
        value: state.value,
        timeZone: props.timeZone,
        prevTimeZone: prevPropsTimeZone,
      });
    }
  })

  watch(()=>props.open, ()=>{
    foundation.initPanelOpenStatus();
    if (!props.open) {
      foundation.clearRangeInputFocus();
    }
  })

  onMounted(()=>{
    _mounted = true;
    // TODO
    // super.componentDidMount();
  })

  onUnmounted(()=>{
    _mounted = false;
    // TODO
    // super.componentWillUnmount();
  })


  const setTriggerRef = (node: HTMLDivElement) => (triggerElRef.value = node);

  // Called when changes are selected by clicking on the selected date
  const handleSelectedChange: MonthsGridProps['onChange'] = (v, options) => foundation.handleSelectedChange(v, options);

  // Called when the year and month change
  const handleYMSelectedChange: YearAndMonthProps['onSelect'] = item => foundation.handleYMSelectedChange(item);

  const disabledDisposeDate: MonthsGridProps['disabledDate'] = (date, ...rest) => foundation.disabledDisposeDate(date, ...rest);
  const disabledDisposeTime: MonthsGridProps['disabledTime'] = (date, ...rest) => foundation.disabledDisposeTime(date, ...rest);

  function renderMonthGrid(locale: Locale['DatePicker'], localeCode: string, dateFnsLocale: Locale['dateFnsLocale']) {
    const {
      type,
      multiple,
      max,
      weekStartsOn,
      timePickerOpts,
      defaultPickerValue,
      format,
      hideDisabledOptions,
      disabledTimePicker,
      renderDate,
      renderFullDate,
      startDateOffset,
      endDateOffset,
      autoSwitchDate,
      density,
      syncSwitchMonth,
      onPanelChange,
      timeZone,
      triggerRender,
      insetInput,
      presetPosition,
      yearAndMonthOpts
    } = props;
    const { cachedSelectedValue, rangeInputFocus } = state;

    const defaultValue = cachedSelectedValue;
    return (
      <MonthsGrid
        ref={monthGrid}
        locale={locale}
        localeCode={localeCode}
        dateFnsLocale={dateFnsLocale}
        weekStartsOn={weekStartsOn}
        type={type}
        multiple={multiple}
        max={max}
        format={format}
        disabledDate={disabledDisposeDate}
        hideDisabledOptions={hideDisabledOptions}
        disabledTimePicker={disabledTimePicker}
        disabledTime={disabledDisposeTime}
        defaultValue={defaultValue}
        defaultPickerValue={defaultPickerValue}
        timePickerOpts={timePickerOpts}
        isControlledComponent={!adapter().needConfirm() && isControlled('value')}
        onChange={handleSelectedChange}
        renderDate={renderDate}
        renderFullDate={renderFullDate}
        startDateOffset={startDateOffset}
        endDateOffset={endDateOffset}
        autoSwitchDate={autoSwitchDate}
        density={density}
        rangeInputFocus={rangeInputFocus}
        setRangeInputFocus={handleSetRangeFocus}
        isAnotherPanelHasOpened={isAnotherPanelHasOpened}
        syncSwitchMonth={syncSwitchMonth}
        onPanelChange={onPanelChange}
        timeZone={timeZone}
        focusRecordsRef={focusRecordsRef}
        triggerRender={triggerRender}
        insetInput={insetInput}
        presetPosition={presetPosition}
        renderQuickControls={renderQuickControls()}
        renderDateInput={renderDateInput()}
        yearAndMonthOpts={yearAndMonthOpts}
      />
    );
  }

  function renderQuickControls() {
    const { presets, type } = props;
    return (
      <QuickControl
        type={type}
        presets={presets}
        onPresetClick={(item, e) => foundation.handlePresetClick(item, e)}
      />
    );
  }
  function renderDateInput() {
    const { insetInput, dateFnsLocale, density, type, format, rangeSeparator, defaultPickerValue } = props;
    const { insetInputValue, value } = state;

    const insetInputProps = {
      dateFnsLocale,
      format,
      insetInputValue,
      rangeSeparator,
      type,
      value: value as Date[],
      handleInsetDateFocus: handleInsetDateFocus,
      handleInsetTimeFocus: handleInsetTimeFocus,
      onInsetInputChange: handleInsetInputChange,
      rangeInputStartRef: rangeInputStartRef.value,
      rangeInputEndRef: rangeInputEndRef.value,
      density,
      defaultPickerValue
    };

    return insetInput ? <DateInput {...insetInputProps} insetInput={true} /> : null;
  }


  const handleOpenPanel = () => foundation.openPanel();
  const handleInputChange: DatePickerFoundation['handleInputChange'] = (...args) => foundation.handleInputChange(...args);
  const handleInsetInputChange = (options: InsetInputChangeProps) => foundation.handleInsetInputChange(options);
  const handleInputComplete: DatePickerFoundation['handleInputComplete'] = v => foundation.handleInputComplete(v);
  const handleInputBlur: DateInputProps['onBlur'] = e => foundation.handleInputBlur(get(e, 'target.value'), e);
  const handleInputFocus: DatePickerFoundation['handleInputFocus'] = (...args) => {
    console.log(args)
    foundation.handleInputFocus(...args)
  };
  const handleInputClear: DatePickerFoundation['handleInputClear'] = e => foundation.handleInputClear(e);
  const handleTriggerWrapperClick: DatePickerFoundation['handleTriggerWrapperClick'] = e => foundation.handleTriggerWrapperClick(e);
  const handleSetRangeFocus: DatePickerFoundation['handleSetRangeFocus'] = rangeInputFocus => foundation.handleSetRangeFocus(rangeInputFocus);
  const handleRangeInputBlur = (value: any, e: any) => foundation.handleRangeInputBlur(value, e);
  const handleRangeInputClear: DatePickerFoundation['handleRangeInputClear'] = e => foundation.handleRangeInputClear(e);
  const handleRangeEndTabPress: DatePickerFoundation['handleRangeEndTabPress'] = e => foundation.handleRangeEndTabPress(e);
  const isAnotherPanelHasOpened = (currentRangeInput: RangeType) => {
    if (currentRangeInput === 'rangeStart') {
      return focusRecordsRef.value.current.rangeEnd;
    } else {
      return focusRecordsRef.value.current.rangeStart;
    }
  };
  const handleInsetDateFocus = (e: FocusEvent, rangeType: 'rangeStart' | 'rangeEnd') => {
    const monthGridFoundation = monthGrid.value.foundation;
    if (monthGridFoundation) {
      monthGridFoundation.showDatePanel(strings.PANEL_TYPE_LEFT);
      monthGridFoundation.showDatePanel(strings.PANEL_TYPE_RIGHT);
    }
    handleInputFocus(e, rangeType);
  }

  const handleInsetTimeFocus = () => {
    // TODO
    const monthGridFoundation = monthGrid.value.current.foundation;
    if (monthGridFoundation) {
      monthGridFoundation.showTimePicker(strings.PANEL_TYPE_LEFT);
      monthGridFoundation.showTimePicker(strings.PANEL_TYPE_RIGHT);
    }
  }
  const handlePanelVisibleChange = (visible: boolean) => {
    console.log(visible, state.panelShow)
    foundation.handlePanelVisibleChange(visible);
  }

  function renderInner(extraProps?: Partial<DatePickerProps>) {
    const {
      type,
      format,
      multiple,
      disabled,
      showClear,
      insetLabel,
      insetLabelId,
      placeholder,
      validateStatus,
      inputStyle,
      prefix,
      locale,
      dateFnsLocale,
      triggerRender,
      size,
      inputReadOnly,
      rangeSeparator,
      insetInput,
      defaultPickerValue
    } = props;
    const { value, inputValue, rangeInputFocus, triggerDisabled } = state;
    // This class is not needed when triggerRender is function
    const isRangeType_ = isRangeType(type, triggerRender);
    const inputDisabled = disabled || insetInput && triggerDisabled;
    const inputCls = classnames(`${cssClasses.PREFIX}-input`, {
      [`${cssClasses.PREFIX}-range-input`]: isRangeType_,
      [`${cssClasses.PREFIX}-range-input-${size}`]: isRangeType_ && size,
      [`${cssClasses.PREFIX}-range-input-active`]: isRangeType_ && rangeInputFocus && !inputDisabled,
      [`${cssClasses.PREFIX}-range-input-disabled`]: isRangeType_ && inputDisabled,
      [`${cssClasses.PREFIX}-range-input-${validateStatus}`]: isRangeType_ && validateStatus,
    });
    const phText = placeholder || (locale && locale.placeholder && locale.placeholder[type]); // i18n
    // These values should be passed to triggerRender, do not delete any key if it is not necessary
    const props_ = {
      ...extraProps,
      placeholder: phText,
      disabled: inputDisabled,
      inputValue,
      value: value as Date[],
      defaultPickerValue,
      onChange: handleInputChange,
      onEnterPress: handleInputComplete,
      // TODO: remove in next major version
      block: true,
      inputStyle,
      showClear,
      insetLabel,
      insetLabelId,
      type,
      format,
      multiple,
      validateStatus,
      inputReadOnly: inputReadOnly || insetInput,
      // onClick: handleOpenPanel,
      onBlur: handleInputBlur,
      onFocus: handleInputFocus,
      onClear: handleInputClear,
      prefix,
      size,
      autofocus: state.autofocus,
      dateFnsLocale,
      rangeInputFocus,
      rangeSeparator,
      onRangeBlur: handleRangeInputBlur,
      onRangeClear: handleRangeInputClear,
      onRangeEndTabPress: handleRangeEndTabPress,
      rangeInputStartRef: insetInput ? null :  rangeInputStartRef,
      rangeInputEndRef: insetInput ? null : rangeInputEndRef,
    };

    return (
      <div
        // tooltip will mount a11y props to children
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="combobox"
        aria-label={Array.isArray(value) && value.length ? "Change date" : "Choose date"}
        aria-disabled={disabled}
        onClick={handleTriggerWrapperClick}
        class={inputCls}>
        {typeof triggerRender === 'function' ? (
          <Trigger
            {...props_}
            triggerRender={triggerRender}
            componentName="DatePicker"
            componentProps={{ ...props_ }}
          />
        ) : (
          <DateInput {...props_} />
        )}
      </div>
    );
  }

  const handleConfirm = (e: MouseEvent) => foundation.handleConfirm();

  const handleCancel = (e: MouseEvent) => foundation.handleCancel();

  const renderFooter = (locale: Locale['DatePicker'], localeCode: string) => {
    if (adapter().needConfirm()) {
      return (
        <Footer
          {...props}
          locale={locale}
          localeCode={localeCode}
          onConfirmClick={handleConfirm}
          onCancelClick={handleCancel}
        />
      );
    }

    return null;
  };

  const renderPanel = (locale: Locale['DatePicker'], localeCode: string, dateFnsLocale: Locale['dateFnsLocale']) => {
    const { dropdownClassName, dropdownStyle, density, topSlot, bottomSlot, insetInput, type, format, rangeSeparator, defaultPickerValue } = props;
    const { insetInputValue, value } = state;
    const wrapCls = classnames(
      cssClasses.PREFIX,
      {
        [cssClasses.PANEL_YAM]: adapter().typeIsYearOrMonth(),
        [`${cssClasses.PREFIX}-compact`]: density === 'compact',
      },
      dropdownClassName
    );

    const insetInputProps = {
      dateFnsLocale,
      format,
      insetInputValue,
      rangeSeparator,
      type,
      value: value as Date[],
      handleInsetDateFocus: handleInsetDateFocus,
      handleInsetTimeFocus: handleInsetTimeFocus,
      onInsetInputChange: handleInsetInputChange,
      rangeInputStartRef: rangeInputStartRef,
      rangeInputEndRef: rangeInputEndRef,
      density,
      defaultPickerValue
    };

    return (
      <div ref={panelRef} class={wrapCls} style={dropdownStyle}>
        {topSlot && <div class={`${cssClasses.PREFIX}-topSlot`}>{topSlot}</div>}
        {insetInput && <DateInput {...insetInputProps} insetInput={true} />}
        {adapter().typeIsYearOrMonth() ?
          renderYearMonthPanel(locale, localeCode) :
          renderMonthGrid(locale, localeCode, dateFnsLocale)}
        {renderQuickControls()}
        {bottomSlot && <div class={`${cssClasses.PREFIX}-bottomSlot`}>{bottomSlot}</div>}
        {renderFooter(locale, localeCode)}
      </div>
    );
  };

  const renderYearMonthPanel = (locale: Locale['DatePicker'], localeCode: string) => {
    const { density } = props;

    const date = state.value[0];
    let year = 0;
    let month = 0;

    if (isDate(date)) {
      year = date.getFullYear();
      month = date.getMonth() + 1;
    }

    return (
      <YearAndMonth
        locale={locale}
        localeCode={localeCode}
        disabledDate={disabledDisposeDate}
        noBackBtn
        monthCycled
        onSelect={handleYMSelectedChange}
        currentYear={year}
        currentMonth={month}
        density={density}
      />
    );
  };

  const wrapPopover = (children: VueJsxNode) => {
    const { panelShow } = state;
    // rtl changes the default position
    const { context } = useConfigContext();
    // TODO
    let direction = context.value.direction
    const defaultPosition = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    const {
      motion,
      zIndex,
      position = defaultPosition,
      getPopupContainer,
      locale,
      localeCode,
      dateFnsLocale,
      stopPropagation,
      autoAdjustOverflow,
      spacing,
    } = props;
    // const mergedMotion = foundation.getMergedMotion(motion);
    return (
      <Popover
        getPopupContainer={getPopupContainer}
        // wrapWhenSpecial={false}
        autoAdjustOverflow={autoAdjustOverflow}
        zIndex={zIndex}
        motion={motion}
        content={renderPanel(locale, localeCode, dateFnsLocale)}
        trigger="custom"
        position={position}
        visible={panelShow}
        stopPropagation={stopPropagation}
        spacing={spacing}
        onVisibleChange={handlePanelVisibleChange}
      >
        {children}
      </Popover>
    );
  };

  return () => {
    const { style, className, prefixCls } = props;
    const outerProps = {
      style,
      class: classnames(className, { [prefixCls]: true }),
      ref: setTriggerRef,
      'aria-invalid': props['aria-invalid'],
      'aria-errormessage': props['aria-errormessage'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
      'aria-required': props['aria-required'],
    };

    const inner = renderInner();
    const wrappedInner = wrapPopover(inner);

    // @ts-ignore
    return <div {...outerProps}>{wrappedInner}</div>;
  }
})

DatePicker.props = vuePropsTypeDatePickerProps

export default DatePicker

