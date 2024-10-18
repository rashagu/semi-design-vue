import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  useSlots,
  VNode,
  watch,
} from 'vue';
import classnames from 'classnames';
import { get, isDate, isEqual, isFunction, noop, stubFalse, pick, omit } from 'lodash';
import type {
  DatePickerAdapter,
  DatePickerFoundationProps,
  DatePickerFoundationState,
  DayStatusType,
  PresetType,
  RangeType,
  Type,
} from '@douyinfe/semi-foundation/datePicker/foundation';
import DatePickerFoundation from '@douyinfe/semi-foundation/datePicker/foundation';

import MonthGridFoundation from '@douyinfe/semi-foundation/datePicker/monthsGridFoundation';

import { cssClasses, numbers, strings } from '@douyinfe/semi-foundation/datePicker/constants';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import { useBaseComponent } from '../_base/baseComponent';
import Popover, { PopoverProps } from '../popover/index';
import type { DateInputProps } from './dateInput';
import DateInput from './dateInput';
import type { MonthsGridProps } from './monthsGrid';
import MonthsGrid from './monthsGrid';
import QuickControl from './quickControl';
import Footer from './footer';
import Trigger, { TriggerProps, vuePropsType } from '../trigger';
import type { YearAndMonthProps } from './yearAndMonth';
import YearAndMonth from './yearAndMonth';
import '@douyinfe/semi-foundation/datePicker/datePicker.scss';
import { Locale } from '../locale/interface';
import type { TimePickerProps } from '../timePicker';
import type { ScrollItemProps } from '../scrollList';
import type { InsetInputChangeProps, InsetInputValue } from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import type { AriaAttributes } from '../AriaAttributes';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { CombineProps, VueJsxNode } from '../interface';
import { useConfigContext } from '../configProvider/context/Consumer';

const triggerPropsKeys = Object.keys(vuePropsType)
export interface DatePickerProps extends DatePickerFoundationProps {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  clearIcon?: VueJsxNode;
  timePickerOpts?: TimePickerProps;
  bottomSlot?: VueJsxNode | (()=>VueJsxNode);
  insetLabel?: VueJsxNode;
  insetLabelId?: string;
  prefix?: VueJsxNode;
  topSlot?: VueJsxNode | (()=>VueJsxNode);
  rightSlot?: VueJsxNode | (()=>VueJsxNode);
  leftSlot?: VueJsxNode | (()=>VueJsxNode);
  renderDate?: (dayNumber?: number, fullDate?: string) => VueJsxNode;
  renderFullDate?: (dayNumber?: number, fullDate?: string, dayStatus?: DayStatusType) => VueJsxNode;
  triggerRender?: (props: DatePickerProps) => VueJsxNode;
  /**
   * There are multiple input boxes when selecting a range, and the input boxes will be out of focus multiple times.
   *
   * Use `onOpenChange` or `onClickOutSide` instead
   */
  onBlur?: any;
  onClear?: any;
  /**
   * There are multiple input boxes when selecting a range, and the input boxes will be focused multiple times.
   *
   * Use `onOpenChange` or `triggerRender` instead
   */
  onFocus?: (e: MouseEvent, rangeType: RangeType) => void;
  onPresetClick?: (item: PresetType, e: MouseEvent) => void;
  onClickOutSide?: () => void;
  locale?: Locale['DatePicker'];
  dateFnsLocale?: Locale['dateFnsLocale'];
  yearAndMonthOpts?: ScrollItemProps<any>;
  dropdownMargin?: PopoverProps['margin'];
  id?: string;
}

export type DatePickerState = DatePickerFoundationState;

const propTypes: CombineProps<DatePickerProps> = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': [PropTypes.bool, PropTypes.string] as PropType<DatePickerProps['aria-invalid']>,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  borderless: PropTypes.bool,
  type: String as PropType<DatePickerProps['type']>,
  size: String as PropType<DatePickerProps['size']>,
  density: String as PropType<DatePickerProps['density']>,
  defaultValue: [PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array],
  value: [PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array],
  defaultPickerValue: [PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array],
  disabledTime: PropTypes.func as PropType<DatePickerProps['disabledTime']>,
  disabledTimePicker: PropTypes.bool,
  hideDisabledOptions: PropTypes.bool,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  max: PropTypes.number, // only work when multiple is true
  placeholder: [PropTypes.string, PropTypes.array],
  presets: PropTypes.array,
  onChange: PropTypes.func as PropType<DatePickerProps['onChange']>,
  onChangeWithDateFirst: PropTypes.bool,
  weekStartsOn: PropTypes.number as PropType<DatePickerProps['weekStartsOn']>,
  disabledDate: PropTypes.func as PropType<DatePickerProps['disabledDate']>,
  timePickerOpts: PropTypes.object, // When dateTime, dateTimeRange, pass through the props to timePicker
  showClear: PropTypes.bool, // Whether to show the clear button
  onOpenChange: PropTypes.func as PropType<DatePickerProps['onOpenChange']>,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  motion: [PropTypes.bool, PropTypes.func, PropTypes.object] as PropType<DatePickerProps['motion']>,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  prefix: PropTypes.node,
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  zIndex: PropTypes.number,
  position: String as PropType<DatePickerProps['position']>,
  getPopupContainer: PropTypes.func as PropType<DatePickerProps['getPopupContainer']>,
  onCancel: PropTypes.func as PropType<DatePickerProps['onCancel']>,
  onConfirm: PropTypes.func as PropType<DatePickerProps['onConfirm']>,
  needConfirm: PropTypes.bool,
  inputStyle: PropTypes.object,
  timeZone: [PropTypes.string, PropTypes.number],
  triggerRender: PropTypes.func as PropType<DatePickerProps['triggerRender']>,
  stopPropagation: [PropTypes.bool, PropTypes.string],
  autoAdjustOverflow: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func as PropType<DatePickerProps['onFocus']>,
  onClear: PropTypes.func,
  style: PropTypes.object,
  autoFocus: PropTypes.bool,
  inputReadOnly: PropTypes.bool, // Text box can be entered
  validateStatus: String as PropType<DatePickerProps['validateStatus']>,
  renderDate: PropTypes.func as PropType<DatePickerProps['renderDate']>,
  renderFullDate: PropTypes.func as PropType<DatePickerProps['renderFullDate']>,
  spacing: PropTypes.number,
  startDateOffset: PropTypes.func as PropType<DatePickerProps['startDateOffset']>,
  endDateOffset: PropTypes.func as PropType<DatePickerProps['endDateOffset']>,
  autoSwitchDate: PropTypes.bool,
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.object,
  topSlot: [PropTypes.func, ...PropTypes.node] as PropType<DatePickerProps['topSlot']>,
  rightSlot: [PropTypes.func, ...PropTypes.node] as PropType<DatePickerProps['rightSlot']>,
  leftSlot: [PropTypes.func, ...PropTypes.node] as PropType<DatePickerProps['leftSlot']>,
  bottomSlot: [PropTypes.func, ...PropTypes.node] as PropType<DatePickerProps['bottomSlot']>,
  dateFnsLocale: PropTypes.object, // isRequired, but no need to add isRequired key. ForwardStatics function pass static properties to index.jsx, so there is no need for user to pass the prop.
  // Support synchronous switching of months
  syncSwitchMonth: PropTypes.bool,
  // Callback function for panel date switching
  onPanelChange: PropTypes.func as PropType<DatePickerProps['onPanelChange']>,
  rangeSeparator: PropTypes.string,
  preventScroll: PropTypes.bool,
  yearAndMonthOpts: PropTypes.object,
  locale: Object,

  clearIcon: PropTypes.node,
  presetPosition: PropTypes.string as PropType<DatePickerProps['presetPosition']>,
  dropdownMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  id: PropTypes.string as PropType<DatePickerProps['id']>,
  onPresetClick: PropTypes.func as PropType<DatePickerProps['onClickOutSide']>,
  onClickOutSide: PropTypes.func as PropType<DatePickerProps['onClickOutSide']>,
  localeCode: PropTypes.string,
  insetInput: [PropTypes.bool, PropTypes.object] as PropType<DatePickerProps['insetInput']>,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
};

const defaultProps = {
  onChangeWithDateFirst: true,
  borderless: false,
  autoAdjustOverflow: true,
  stopPropagation: true,
  motion: true,
  prefixCls: cssClasses.PREFIX,
  presetPosition: 'bottom',
  // position: 'bottomLeft',
  zIndex: popoverNumbers.DEFAULT_Z_INDEX,
  type: 'date',
  size: 'default',
  density: 'default',
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
  insetInput: false,
  onClickOutSide: noop,
};
export const vuePropsTypeDatePickerProps = vuePropsMake(propTypes, defaultProps);

const DatePicker = defineComponent({
  props: {...vuePropsTypeDatePickerProps},
  name: 'DatePicker',
  setup(props, {expose}) {
    const slots = useSlots();

    let clickOutSideHandler: (e: MouseEvent) => void;
    let _mounted: boolean;
    const state = reactive<DatePickerState>({
      panelShow: props.open || props.defaultOpen,
      isRange: false,
      inputValue: null, // Staging input values
      value: [], // The currently selected date, each date is a Date object
      cachedSelectedValue: [], // Save last selected date, maybe include null
      prevTimeZone: null,
      rangeInputFocus: undefined, // Optional'rangeStart ',' rangeEnd ', false
      autofocus: props.autoFocus || (isRangeType(props.type, props.triggerRender) && (props.open || props.defaultOpen)),
      insetInputValue: null,
      triggerDisabled: undefined,
    });

    const triggerElRef = ref();
    const panelRef = ref();
    const monthGrid = ref();
    const inputRef = ref();
    const rangeInputStartRef = ref();
    const rangeInputEndRef = ref();
    // @ts-ignore ignore readonly
    const focusRecordsRef = ref({
      rangeStart: false,
      rangeEnd: false,
    });

    const { adapter: adapterInject, isControlled, getDataAttr } = useBaseComponent<DatePickerProps>(props, state);

    function adapter_(): DatePickerAdapter {
      return {
        ...adapterInject<DatePickerProps, DatePickerState>(),
        togglePanel: (panelShow, cb) => {
          state.panelShow = panelShow;
          if (!panelShow) {
            focusRecordsRef.value.rangeEnd = false;
            focusRecordsRef.value.rangeStart = false;
          }
          nextTick(cb);
        },
        registerClickOutSide: () => {
          if (clickOutSideHandler) {
            adapter.unregisterClickOutSide();
            clickOutSideHandler = null;
          }
          clickOutSideHandler = (e) => {
            const triggerEl = triggerElRef.value;
            const panelEl = panelRef.value;
            const target = e.target as Element;
            const path = (e.composedPath && e.composedPath()) || [target];
            if (
              !(triggerEl && triggerEl.contains(target)) &&
              !(panelEl && panelEl.contains(target)) &&
              !(path.includes(triggerEl) || path.includes(panelEl))
            ) {
              props.onClickOutSide();
              if (!adapter.needConfirm()) {
                foundation.closePanel();
              }
            }
          };
          document.addEventListener('mousedown', clickOutSideHandler);
        },
        unregisterClickOutSide: () => {
          document.removeEventListener('mousedown', clickOutSideHandler);
        },
        notifyBlur: (...args) => props.onBlur(...args),
        notifyFocus: (...args) => {
          props.onFocus(...args);
        },
        notifyClear: (...args) => props.onClear(...args),
        notifyChange: (...args) => props.onChange(...args),
        notifyCancel: (...args) => props.onCancel(...args),
        notifyConfirm: (...args) => props.onConfirm(...args),
        notifyOpenChange: (...args) => props.onOpenChange(...args),
        notifyPresetsClick: (...args) => props.onPresetClick(...args),
        updateValue: (value) => (state.value = value),
        updatePrevTimezone: (prevTimeZone) => (state.prevTimeZone = prevTimeZone),
        updateCachedSelectedValue: (cachedSelectedValue) => {
          let _cachedSelectedValue = cachedSelectedValue;
          if (cachedSelectedValue && !Array.isArray(cachedSelectedValue)) {
            _cachedSelectedValue = [...(cachedSelectedValue as any)];
          }
          state.cachedSelectedValue = _cachedSelectedValue;
        },
        updateInputValue: (inputValue) => {
          state.inputValue = inputValue;
        },
        updateInsetInputValue: (insetInputValue: InsetInputValue) => {
          const { insetInput } = props;
          if (insetInput && !isEqual(insetInputValue, state.insetInputValue)) {
            state.insetInputValue = insetInputValue;
          }
        },
        needConfirm: () => ['dateTime', 'dateTimeRange'].includes(props.type) && props.needConfirm === true,
        typeIsYearOrMonth: () => ['month', 'year', 'monthRange'].includes(props.type),
        // setMotionEnd: motionEnd => state.motionEnd = motionEnd,
        setRangeInputFocus: (rangeInputFocus) => {
          const { preventScroll } = props;
          if (rangeInputFocus !== state.rangeInputFocus) {
            state.rangeInputFocus = rangeInputFocus;
          }
          switch (rangeInputFocus) {
            case 'rangeStart':
              const inputStartNode = rangeInputStartRef.value as HTMLInputElement;
              inputStartNode && inputStartNode.focus({ preventScroll });
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
                focusRecordsRef.value.rangeStart = true;
              }, 0);
              break;
            case 'rangeEnd':
              // console.log(rangeInputEndRef.value)
              const inputEndNode = rangeInputEndRef.value as HTMLInputElement;
              inputEndNode && inputEndNode.focus({ preventScroll });
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
                focusRecordsRef.value.rangeEnd = true;
              }, 0);
              break;
            default:
              return;
          }
        },
        couldPanelClosed: () => focusRecordsRef.value.rangeStart && focusRecordsRef.value.rangeEnd,
        isEventTarget: (e) => e && e.target === e.currentTarget,
        setInsetInputFocus: () => {
          const { preventScroll } = props;
          const { rangeInputFocus } = state;
          switch (rangeInputFocus) {
            case 'rangeEnd':
              if (document.activeElement !== rangeInputEndRef.value) {
                const inputEndNode = rangeInputEndRef.value as HTMLInputElement;
                inputEndNode && inputEndNode.focus({ preventScroll });
              }
              break;
            case 'rangeStart':
            default:
              if (document.activeElement !== rangeInputEndRef.value) {
                const inputStartNode = rangeInputStartRef.value as HTMLInputElement;
                inputStartNode && inputStartNode.focus({ preventScroll });
              }
              break;
          }
        },

        setInputFocus: () => {
          const { preventScroll } = props;
          const inputNode = inputRef.value as HTMLInputElement;
          inputNode && inputNode.focus({ preventScroll });
        },
        setInputBlur: () => {
          const inputNode = inputRef.value as HTMLInputElement;
          inputNode && inputNode.blur();
        },
        setRangeInputBlur: () => {
          const { rangeInputFocus } = state;
          if (rangeInputFocus === 'rangeStart') {
            const inputStartNode = rangeInputStartRef.value as HTMLInputElement;
            inputStartNode && inputStartNode.blur();
          } else if (rangeInputFocus === 'rangeEnd') {
            const inputEndNode = rangeInputEndRef.value as HTMLInputElement;
            inputEndNode && inputEndNode.blur();
          }
          adapter.setRangeInputFocus(false);
        },
        setTriggerDisabled: (disabled: boolean) => {
          state.triggerDisabled = disabled;
        },
      };
    }
    const adapter = adapter_();
    const foundation = new DatePickerFoundation(adapter);

    adapter.setCache('cachedSelectedValue', null);

    function isRangeType(type: Type, triggerRender: DatePickerProps['triggerRender']) {
      return /range/i.test(type) && !isFunction(triggerRender);
    }

    watch(
      () => props.value,
      (value, oldValue, onCleanup) => {
        propsChange([oldValue, props.timeZone]);
      },
      { immediate: true }
    );
    watch(
      () => props.timeZone,
      (value, oldValue, onCleanup) => {
        propsChange([props.value, oldValue]);
      },
      { immediate: true }
    );

    function propsChange([prevPropsValue, prevPropsTimeZone]) {
      if (!isEqual(prevPropsValue, props.value)) {
        foundation.initFromProps({
          ...(props as any),
        });
      } else if (props.timeZone !== prevPropsTimeZone) {
        foundation.initFromProps({
          value: state.value,
          timeZone: props.timeZone,
          prevTimeZone: prevPropsTimeZone,
        });
      }
    }

    watch(
      () => props.open,
      () => {
        foundation.initPanelOpenStatus();
        if (!props.open) {
          foundation.clearRangeInputFocus();
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      _mounted = true;
      // TODO
      // super.componentDidMount();
    });

    onUnmounted(() => {
      _mounted = false;
      // TODO
      // super.componentWillUnmount();
    });


    function open() {
      foundation.open();
    }

    function close() {
      foundation.close();
    }

    /**
     *
     * When selecting a range, the default focus is on the start input box, passing in `rangeEnd` can focus on the end input box
     *
     * When `insetInput` is `true`, due to trigger disabled, the cursor will focus on the input box of the popup layer panel
     *
     * 范围选择时，默认聚焦在开始输入框，传入 `rangeEnd` 可以聚焦在结束输入框
     *
     * `insetInput` 打开时，由于 trigger 禁用，会把焦点放在弹出面板的输入框上
     */
    function focus(focusType?: Exclude<RangeType, false>) {
      foundation.focus(focusType);
    }

    function blur() {
      foundation.blur();
    }

    expose({
      open,
      close,
      focus,
      blur,
    })



    const setTriggerRef = (node: HTMLDivElement) => (triggerElRef.value = node);

    // Called when changes are selected by clicking on the selected date
    const handleSelectedChange: MonthsGridProps['onChange'] = (v, options) =>
      foundation.handleSelectedChange(v, options);

    // Called when the year and month change
    const handleYMSelectedChange: YearAndMonthProps['onSelect'] = (item) => foundation.handleYMSelectedChange(item);

    const disabledDisposeDate: MonthsGridProps['disabledDate'] = (date, ...rest) =>
      foundation.disabledDisposeDate(date, ...rest);
    const disabledDisposeTime: MonthsGridProps['disabledTime'] = (date, ...rest) =>
      foundation.disabledDisposeTime(date, ...rest);

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
        yearAndMonthOpts,
        startYear,
        endYear,
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
          isControlledComponent={!adapter.needConfirm() && isControlled('value')}
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
          startYear={startYear}
          endYear={endYear}
        />
      );
    }

    function renderQuickControls() {
      const { presets, type, presetPosition, insetInput, locale } = props;
      return (
        <QuickControl
          type={type}
          presets={presets}
          insetInput={insetInput}
          presetPosition={presetPosition}
          onPresetClick={(item, e) => foundation.handlePresetClick(item, e)}
          locale={locale}
        />
      );
    }
    function renderDateInput() {
      const { insetInput, dateFnsLocale, density, type, format, rangeSeparator, defaultPickerValue } = props;
      const { insetInputValue, value } = state;

      const props_: DateInputProps = {
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
        defaultPickerValue,
      };

      return insetInput ? <DateInput {...props_} insetInput={insetInput} /> : null;
    }

    const handleOpenPanel = () => foundation.openPanel();
    const handleInputChange: DatePickerFoundation['handleInputChange'] = (...args) =>
      foundation.handleInputChange(...args);
    const handleInsetInputChange = (options: InsetInputChangeProps) => foundation.handleInsetInputChange(options);
    const handleInputComplete: DatePickerFoundation['handleInputComplete'] = (v) => foundation.handleInputComplete(v);
    const handleInputBlur: DateInputProps['onBlur'] = (e) => foundation.handleInputBlur(get(e, 'target.value'), e);
    const handleInputFocus: DatePickerFoundation['handleInputFocus'] = (...args) => {
      foundation.handleInputFocus(...args);
    };
    const handleInputClear: DatePickerFoundation['handleInputClear'] = (e) => foundation.handleInputClear(e);
    const handleTriggerWrapperClick: DatePickerFoundation['handleTriggerWrapperClick'] = (e) => {
      foundation.handleTriggerWrapperClick(e);
    };
    const handleSetRangeFocus: DatePickerFoundation['handleSetRangeFocus'] = (rangeInputFocus) =>
      foundation.handleSetRangeFocus(rangeInputFocus);
    const handleRangeInputBlur = (value: any, e: any) => foundation.handleRangeInputBlur(value, e);
    const handleRangeInputClear: DatePickerFoundation['handleRangeInputClear'] = (e) =>
      foundation.handleRangeInputClear(e);
    const handleRangeEndTabPress: DatePickerFoundation['handleRangeEndTabPress'] = (e) =>
      foundation.handleRangeEndTabPress(e);
    const isAnotherPanelHasOpened = (currentRangeInput: RangeType) => {
      if (currentRangeInput === 'rangeStart') {
        return focusRecordsRef.value.rangeEnd;
      } else {
        return focusRecordsRef.value.rangeStart;
      }
    };
    const handleInsetDateFocus = (e: FocusEvent, rangeType: 'rangeStart' | 'rangeEnd') => {
      const monthGridFoundation = get(this, 'monthGrid.current.foundation') as MonthGridFoundation;
      if (monthGridFoundation) {
        monthGridFoundation.showDatePanel(strings.PANEL_TYPE_LEFT);
        monthGridFoundation.showDatePanel(strings.PANEL_TYPE_RIGHT);
      }
      handleInputFocus(e, rangeType);
    };

    const handleInsetTimeFocus = () => {
      const monthGridFoundation = get(this, 'monthGrid.current.foundation') as MonthGridFoundation;
      if (monthGridFoundation) {
        monthGridFoundation.showTimePicker(strings.PANEL_TYPE_LEFT);
        monthGridFoundation.showTimePicker(strings.PANEL_TYPE_RIGHT);
      }
    };
    const handlePanelVisibleChange = (visible: boolean) => {
      foundation.handlePanelVisibleChange(visible);
    };

    function renderInner(extraProps?: Partial<DatePickerProps>) {
      const {
        clearIcon,
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
        defaultPickerValue,
        borderless,
      } = props;
      const { value, inputValue, rangeInputFocus, triggerDisabled } = state;
      // This class is not needed when triggerRender is function
      const isRangeType_ = isRangeType(type, triggerRender);
      const inputDisabled = disabled || (insetInput && triggerDisabled);
      const inputCls = classnames(`${cssClasses.PREFIX}-input`, {
        [`${cssClasses.PREFIX}-range-input`]: isRangeType_,
        [`${cssClasses.PREFIX}-range-input-${size}`]: isRangeType_ && size,
        [`${cssClasses.PREFIX}-range-input-active`]: isRangeType_ && rangeInputFocus && !inputDisabled,
        [`${cssClasses.PREFIX}-range-input-disabled`]: isRangeType_ && inputDisabled,
        [`${cssClasses.PREFIX}-range-input-${validateStatus}`]: isRangeType_ && validateStatus,
        [`${cssClasses.PREFIX}-borderless`]: borderless,
      });
      const phText = placeholder || locale.placeholder[type]; // i18n
      // These values should be passed to triggerRender, do not delete any key if it is not necessary
      const props_: DateInputProps = {
        ...extraProps,
        showClearIgnoreDisabled: Boolean(insetInput),
        placeholder: phText,
        clearIcon,
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
        insetLabel: insetLabel as VNode,
        insetLabelId,
        type,
        format,
        multiple,
        validateStatus,
        inputReadOnly: inputReadOnly || Boolean(insetInput),
        // onClick: handleOpenPanel,
        onBlur: handleInputBlur,
        onFocus: handleInputFocus,
        onClear: handleInputClear,
        prefix: prefix as VNode,
        size,
        autofocus: state.autofocus,
        dateFnsLocale,
        rangeInputFocus,
        rangeSeparator,
        onRangeBlur: handleRangeInputBlur,
        onRangeClear: handleRangeInputClear,
        onRangeEndTabPress: handleRangeEndTabPress,
        rangeInputStartRef: insetInput ? null : rangeInputStartRef,
        rangeInputEndRef: insetInput ? null : rangeInputEndRef,
      };

      return (
        <div
          // tooltip will mount a11y props to children
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          aria-label={Array.isArray(value) && value.length ? 'Change date' : 'Choose date'}
          aria-disabled={disabled}
          onClick={handleTriggerWrapperClick}
          class={inputCls}
        >
          {typeof triggerRender === 'function' ? (
            <Trigger
              {...(pick(props_, ...triggerPropsKeys) as TriggerProps)}
              triggerRender={triggerRender}
              componentName="DatePicker"
              componentProps={{ ...adapter.getProps() }}
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
      if (adapter.needConfirm()) {
        return (
          <Footer
            prefixCls={props.prefixCls}
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
      const {
        dropdownClassName,
        dropdownStyle,
        density,
        topSlot,
        bottomSlot,
        presetPosition,
        type,
        leftSlot,
        rightSlot,
      } = props;
      const wrapCls = classnames(
        cssClasses.PREFIX,
        {
          [cssClasses.PANEL_YAM]: adapter.typeIsYearOrMonth(),
          [`${cssClasses.PREFIX}-compact`]: density === 'compact',
        },
        dropdownClassName
      );

      return (
        <div ref={panelRef} class={wrapCls} style={dropdownStyle} x-type={type}>
          <div class={`${cssClasses.PREFIX}-container`}>
            {leftSlot && (
              <div class={`${cssClasses.PREFIX}-leftSlot`} x-semi-prop="leftSlot">
                {leftSlot}
              </div>
            )}
            <div>
              {topSlot && (
                <div class={`${cssClasses.PREFIX}-topSlot`} x-semi-prop="topSlot">
                  {topSlot}
                </div>
              )}
              {/* todo: monthRange does not support presetPosition temporarily */}
              {presetPosition === 'top' && type !== 'monthRange' && renderQuickControls()}
              {adapter.typeIsYearOrMonth()
                ? renderYearMonthPanel(locale, localeCode)
                : renderMonthGrid(locale, localeCode, dateFnsLocale)}
              {presetPosition === 'bottom' && type !== 'monthRange' && renderQuickControls()}
              {bottomSlot && (
                <div class={`${cssClasses.PREFIX}-bottomSlot`} x-semi-prop="bottomSlot">
                  {bottomSlot}
                </div>
              )}
            </div>
            {rightSlot && (
              <div class={`${cssClasses.PREFIX}-rightSlot`} x-semi-prop="rightSlot">
                {rightSlot}
              </div>
            )}
          </div>
          {renderFooter(locale, localeCode)}
        </div>
      );
    };

    const renderYearMonthPanel = (locale: Locale['DatePicker'], localeCode: string) => {
      const { density, presetPosition, yearAndMonthOpts, type, startYear, endYear } = props;

      const date = state.value[0];
      const year = { left: 0, right: 0 };
      const month = { left: 0, right: 0 };

      if (isDate(date)) {
        year.left = date.getFullYear();
        month.left = date.getMonth() + 1;
      }

      if (type === 'monthRange') {
        const dateRight = state.value[1];
        if (isDate(dateRight)) {
          year.right = dateRight.getFullYear();
          month.right = dateRight.getMonth() + 1;
        }
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
          presetPosition={presetPosition}
          renderQuickControls={renderQuickControls()}
          renderDateInput={renderDateInput()}
          type={type}
          yearAndMonthOpts={yearAndMonthOpts}
          startYear={startYear}
          endYear={endYear}
        />
      );
    };

    // rtl changes the default position
    const { context } = useConfigContext();
    const wrapPopover = (children: VueJsxNode) => {
      const { panelShow } = state;
      // TODO
      let direction = context.value.direction;
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
        dropdownMargin,
      } = props;
      // const mergedMotion = foundation.getMergedMotion(motion);
      return (
        <Popover
          getPopupContainer={getPopupContainer}
          // wrapWhenSpecial={false}
          autoAdjustOverflow={autoAdjustOverflow}
          zIndex={zIndex}
          motion={motion}
          margin={dropdownMargin}
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
      const { style, className, prefixCls, type, ...rest } = props;
      const outerProps = {
        style,
        class: classnames(className, { [prefixCls]: true }),
        ref: setTriggerRef,
        'aria-invalid': props['aria-invalid'],
        'aria-errormessage': props['aria-errormessage'],
        'aria-labelledby': props['aria-labelledby'],
        'aria-describedby': props['aria-describedby'],
        'aria-required': props['aria-required'],
        ...getDataAttr(),
      };

      const innerPropKeys: string[] = [];
      if (!type.toLowerCase().includes('range')) {
        innerPropKeys.push('borderless');
      }
      const inner = renderInner(pick(props, innerPropKeys));
      const wrappedInner = wrapPopover(inner);

      // @ts-ignore
      return <div {...outerProps}>{wrappedInner}</div>;
    };
  },
});

export default DatePicker;
