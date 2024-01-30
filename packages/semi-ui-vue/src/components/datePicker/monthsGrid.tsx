import {CSSProperties, defineComponent, h, nextTick, onMounted, PropType, reactive, Ref, watch,} from 'vue';

import classnames from 'classnames';
import * as PropTypes from '../PropTypes';
import {vuePropsMake} from '../PropTypes';
import {format as formatFn, isSameDay} from 'date-fns';

import MonthsGridFoundation, {
  MonthInfo,
  MonthsGridAdapter,
  MonthsGridDateAdapter,
  MonthsGridFoundationProps,
  MonthsGridFoundationState,
  MonthsGridRangeAdapter,
  PanelType,
} from '@douyinfe/semi-foundation/datePicker/monthsGridFoundation';
import {cssClasses, numbers, strings} from '@douyinfe/semi-foundation/datePicker/constants';
import {compatibleParse} from '@douyinfe/semi-foundation/datePicker/_utils/parser';
import {noop, stubFalse} from 'lodash';
import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import Navigation from './navigation';
import Month from './month';
import Combobox from '../timePicker/Combobox';
import YearAndMonth from './yearAndMonth';
import {IconCalendar, IconClock} from '@kousum/semi-icons-vue';
import {getDefaultFormatTokenByType} from '@douyinfe/semi-foundation/datePicker/_utils/getDefaultFormatToken';
import getDefaultPickerDate from '@douyinfe/semi-foundation/datePicker/_utils/getDefaultPickerDate';
import {DayStatusType} from '@douyinfe/semi-foundation/datePicker/foundation';
import {VueJsxNode} from '../interface';
import type {ScrollItemProps} from '../scrollList';
import {ComponentObjectPropsOptions} from "vue";

const prefixCls = cssClasses.PREFIX;

export interface MonthsGridProps extends MonthsGridFoundationProps, BaseProps {
  navPrev?: VueJsxNode;
  navNext?: VueJsxNode;
  renderDate?: (dayNumber?: number, fullDate?: string) => VueJsxNode;
  renderFullDate?: (dayNumber?: number, fullDate?: string, dayStatus?: DayStatusType) => VueJsxNode;
  focusRecordsRef?: Ref<{ rangeStart: boolean; rangeEnd: boolean }>;
  yearAndMonthOpts?: ScrollItemProps<any>;

  motionEnd?: boolean
}

export type MonthsGridState = MonthsGridFoundationState;

const propTypes:ComponentObjectPropsOptions<MonthsGridProps> = {
  type: PropTypes.string as PropType<MonthsGridProps['type']>,
  defaultValue: PropTypes.array,
  defaultPickerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array]),
  multiple: PropTypes.bool,
  max: PropTypes.number, // only work when multiple is true
  weekStartsOn: PropTypes.number as PropType<MonthsGridProps['weekStartsOn']>,
  disabledDate: PropTypes.func as PropType<MonthsGridProps['disabledDate']>,
  disabledTime: PropTypes.func as PropType<MonthsGridProps['disabledTime']>,
  disabledTimePicker: PropTypes.bool,
  hideDisabledOptions: PropTypes.bool,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  onMaxSelect: PropTypes.func as PropType<MonthsGridProps['onMaxSelect']>,
  timePickerOpts: PropTypes.object,
  // Whether the outer datePicker is a controlled component
  isControlledComponent: PropTypes.bool,
  rangeStart: PropTypes.oneOfType([PropTypes.string]),
  rangeInputFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  format: PropTypes.string,
  renderDate: PropTypes.func as PropType<MonthsGridProps['renderDate']>,
  renderFullDate: PropTypes.func as PropType<MonthsGridProps['renderFullDate']>,
  startDateOffset: PropTypes.func as PropType<MonthsGridProps['startDateOffset']>,
  endDateOffset: PropTypes.func as PropType<MonthsGridProps['endDateOffset']>,
  autoSwitchDate: PropTypes.bool,
  density: PropTypes.string,
  dateFnsLocale: PropTypes.any,
  timeZone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // Support synchronous switching of months
  syncSwitchMonth: PropTypes.bool,
  // Callback function for panel date switching
  onPanelChange: PropTypes.func as PropType<MonthsGridProps['onPanelChange']>,
  focusRecordsRef: PropTypes.object,
  triggerRender: PropTypes.func as PropType<MonthsGridProps['triggerRender']>,
  presetPosition: PropTypes.string as PropType<MonthsGridProps['presetPosition']>,
  renderQuickControls: PropTypes.node,
  renderDateInput: PropTypes.node,

  style: [Object, String] as PropType<MonthsGridProps['style']>,
  className: String,
  motionEnd: PropTypes.bool as PropType<MonthsGridProps['motionEnd']>,
  splitPanels: Boolean,
  onChange: Function as PropType<MonthsGridProps['onChange']>,
  setRangeInputFocus: Function as PropType<MonthsGridProps['setRangeInputFocus']>,
  isAnotherPanelHasOpened: Function as PropType<MonthsGridProps['isAnotherPanelHasOpened']>,
  insetInput: Boolean,
};

const defaultProps = {
  type: 'date',
  rangeStart: '',
  multiple: false,
  weekStartsOn: numbers.WEEK_START_ON,
  disabledDate: stubFalse,
  onMaxSelect: noop,
  locale: {},
};
export const vuePropsType = vuePropsMake<MonthsGridProps>(propTypes, defaultProps);
const monthsGrid = defineComponent<MonthsGridProps>((props, { slots }) => {
  const validFormat = props.format || getDefaultFormatTokenByType(props.type);
  const { nowDate, nextDate } = getDefaultPickerDate({
    defaultPickerValue: props.defaultPickerValue,
    format: validFormat,
    dateFnsLocale: props.dateFnsLocale,
  });
  const dateState = {
    // Direct use of full date string storage, mainly considering the month rendering comparison to save a conversion
    // The selected value for single or multiple selection, full date string, eg. {'2019-10-01', '2019-10-02'}
    selected: new Set<string>(),
  };
  const rangeState = {
    monthLeft: {
      pickerDate: nowDate,
      showDate: nowDate,
      isTimePickerOpen: false,
      isYearPickerOpen: false,
    },
    monthRight: {
      pickerDate: nextDate,
      showDate: nextDate,
      isTimePickerOpen: false,
      isYearPickerOpen: false,
    },
    maxWeekNum: 0, // Maximum number of weeks left and right for manual height adjustment
    hoverDay: '', // Real-time hover date
    rangeStart: props.rangeStart, // Start date for range selection
    rangeEnd: '', // End date of range selection
    currentPanelHeight: 0, // current month panel height,
    offsetRangeStart: '',
    offsetRangeEnd: '',
  };
  const state = reactive<MonthsGridState>({
    ...dateState,
    ...rangeState,
  });
  const { adapter: adapterInject } = useBaseComponent<MonthsGridProps>(props, state);
  const foundation: MonthsGridFoundation = new MonthsGridFoundation(adapter());

  function dateAdapter(): MonthsGridDateAdapter {
    return {
      updateDaySelected: (selected) => (state.selected = selected),
    };
  }

  function rangeAdapter(): MonthsGridRangeAdapter {
    return {
      setRangeStart: (rangeStart) => (state.rangeStart = rangeStart),
      setRangeEnd: (rangeEnd) => (state.rangeEnd = rangeEnd),
      setHoverDay: (hoverDay) => (state.hoverDay = hoverDay),
      setWeeksHeight: (maxWeekNum) => (state.maxWeekNum = maxWeekNum),
      setOffsetRangeStart: (offsetRangeStart) => (state.offsetRangeStart = offsetRangeStart),
      setOffsetRangeEnd: (offsetRangeEnd) => (state.offsetRangeEnd = offsetRangeEnd),
    };
  }
  function adapter(): MonthsGridAdapter {
    return {
      ...adapterInject<MonthsGridProps, MonthsGridState>(),
      ...dateAdapter(),
      ...rangeAdapter(),
      updateMonthOnLeft: (v) => (state.monthLeft = v),
      updateMonthOnRight: (v) => (state.monthRight = v),
      notifySelectedChange: (value, options) => {
        props.onChange(value, options)
      },
      notifyMaxLimit: (v) => props.onMaxSelect(v),
      notifyPanelChange: (date, dateString) => props.onPanelChange(date, dateString),
      setRangeInputFocus: (rangeInputFocus) => props.setRangeInputFocus(rangeInputFocus),
      isAnotherPanelHasOpened: (currentRangeInput) => props.isAnotherPanelHasOpened(currentRangeInput),
    };
  }

  onMounted(() => {
    // super.componentDidMount();
  });

  watch(
    () => props.defaultValue,
    (value) => {
      foundation.updateSelectedFromProps(value);
    },
    { immediate: true }
  );

  watch(
    () => props.defaultPickerValue,
    (value) => {
      foundation.initDefaultPickerValue();
    },
    { immediate: true }
  );

  // watch(()=>props.motionEnd, (value)=>{
  //   if (value === true){
  //     if (foundation.isRangeType()) {
  //       const currentPanelHeight = calcScrollListHeight();
  //       state.currentPanelHeight = currentPanelHeight
  //     }
  //   }
  // })

  watch(
    state,
    (value, prevState, onCleanup) => {
      const isRange = foundation.isRangeType();
      if (isRange) {
        /**
         * we have to add these code to ensure that scroll list's selector places center
         */
        const prevAll = leftIsYearOrTime(prevState) && rightIsYearOrTime(prevState);
        const prevSome =
          (leftIsYearOrTime(prevState) && !rightIsYearOrTime(prevState)) ||
          (!leftIsYearOrTime(prevState) && rightIsYearOrTime(prevState));
        const nowAll = leftIsYearOrTime() && rightIsYearOrTime();
        const nowSome = (leftIsYearOrTime() && !rightIsYearOrTime()) || (!leftIsYearOrTime() && rightIsYearOrTime());
        const prevAllToSome = prevAll && nowSome;
        const prevSomeToAll = prevSome && nowAll;

        if (prevSomeToAll) {
          state.currentPanelHeight = calcScrollListHeight();
          nextTick(() => {
            reselect();
          });
        } else if (prevAllToSome) {
          reselect();
        }
      }
    },
    { immediate: true }
  );

  const cacheRefCurrent = (key: string, current: any) => {
    if (typeof key === 'string' && key.length) {
      adapter().setCache(key, current);
    }
  };

  function leftIsYearOrTime(state_?: MonthsGridState) {
    const { monthLeft } = state_ || state;

    if (monthLeft && (monthLeft.isTimePickerOpen || monthLeft.isYearPickerOpen)) {
      return true;
    } else {
      return false;
    }
  }

  function rightIsYearOrTime(state_?: MonthsGridState) {
    const { monthRight } = state_ || state;

    if (monthRight && (monthRight.isTimePickerOpen || monthRight.isYearPickerOpen)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Calculate the height of the scrolling list, if the animation is not over, return 0
   */
  const calcScrollListHeight = () => {
    const wrapLeft = adapter().getCache(`wrap-${strings.PANEL_TYPE_LEFT}`);
    const wrapRight = adapter().getCache(`wrap-${strings.PANEL_TYPE_RIGHT}`);
    const switchLeft = adapter().getCache(`switch-${strings.PANEL_TYPE_LEFT}`);
    const switchRight = adapter().getCache(`switch-${strings.PANEL_TYPE_RIGHT}`);

    const leftRect = wrapLeft && wrapLeft.getBoundingClientRect();
    const rightRect = wrapRight && wrapRight.getBoundingClientRect();

    let leftHeight = (leftRect && leftRect.height) || 0;
    let rightHeight = (rightRect && rightRect.height) || 0;

    if (switchLeft) {
      leftHeight += switchLeft.getBoundingClientRect().height;
    }
    if (switchRight) {
      rightHeight += switchRight.getBoundingClientRect().height;
    }

    return Math.max(leftHeight, rightHeight);
  };

  function renderPanel(month: Date, panelType: PanelType) {
    let monthCls = classnames(`${prefixCls}-month-grid-${panelType}`);
    const { monthLeft, monthRight, currentPanelHeight } = state;
    const { insetInput } = props;
    const panelDetail = panelType === strings.PANEL_TYPE_RIGHT ? monthRight : monthLeft;
    const { isTimePickerOpen, isYearPickerOpen } = panelDetail;

    const panelContent = renderMonth(month, panelType);

    const yearAndMonthLayer = isYearPickerOpen ? (
      <div class={`${prefixCls}-yam`}>{renderYearAndMonth(panelType, panelDetail)}</div>
    ) : null;
    const timePickerLayer = isTimePickerOpen ? (
      <div class={`${prefixCls}-tpk`}>{renderTimePicker(panelType, panelDetail)}</div>
    ) : null;

    const style: CSSProperties = {};
    const wrapLeft = adapter().getCache(`wrap-${strings.PANEL_TYPE_LEFT}`);
    const wrapRight = adapter().getCache(`wrap-${strings.PANEL_TYPE_RIGHT}`);
    const wrap = panelType === strings.PANEL_TYPE_RIGHT ? wrapRight : wrapLeft;

    if (foundation.isRangeType()) {
      if (isYearPickerOpen || isTimePickerOpen) {
        style.minWidth = wrap.getBoundingClientRect().width;
        style.minWidth = typeof style.minWidth === 'string'?style.minWidth:(style.minWidth + 'px');
      }

      if (leftIsYearOrTime() && rightIsYearOrTime() && !insetInput) {
        /**
         * left和right同时为tpk时，panel会有一个minHeight
         * 如果缓存的currentPanelHeight为0，则需要计算滚动列表的高度
         * 如果有缓存的值则使用currentPanelHeight（若此高度<实际值，则会影响ScrollList中渲染列表的循环次数）
         * 详见 packages/semi-foundation/scrollList/itemFoundation.js initWheelList函数
         *
         * When left and right are tpk at the same time, the panel will have a minHeight
         * If the cached currentPanelHeight is 0, you need to calculate the height of the scrolling list
         * If there is a cached value, use currentPanelHeight (if this height is less than the actual value, it will affect the number of cycles in the ScrollList to render the list)
         * See packages/semi-foundation/scrollList/itemFoundation.js initWheelList function
         */

        style.minHeight = currentPanelHeight ? currentPanelHeight : calcScrollListHeight();
        style.minHeight = style.minHeight + 'px';
      }
    } else if (props.type !== 'year' && props.type !== 'month' && (isTimePickerOpen || isYearPickerOpen)) {
      monthCls = classnames(monthCls, `${prefixCls}-yam-showing`);
    }

    const _isDatePanelOpen = !(isYearPickerOpen || isTimePickerOpen);
    const xOpenType = _isDatePanelOpen ? 'date' : isYearPickerOpen ? 'year' : 'time';

    return (
      <div class={monthCls} key={panelType} style={style} x-open-type={xOpenType}>
        {yearAndMonthLayer}
        {timePickerLayer}
        {/* {isYearPickerOpen || isTimePickerOpen ? null : panelContent} */}
        {foundation.isRangeType() ? panelContent : isYearPickerOpen || isTimePickerOpen ? null : panelContent}
        {renderSwitch(panelType)}
      </div>
    );
  }

  function showYearPicker(panelType: PanelType, e: MouseEvent) {
    // e.stopPropagation();
    // When switching to the year and month, the e.target at this time is generated from Navigation, and the Navigation module will be removed from the DOM after switching
    // If you do not prevent the event from spreading to index.jsx, panel.contain (e.target) in clickOutSide will call closePanel because there is no Nav in the Panel and think this click is clickOutSide
    // Cause the entire component pop-up window to be closed by mistake
    // console.log(this.navRef.current.clientHeight, this.monthRef.current.clientHeight);
    // this.wrapRef.current.style.height = this.wrapRef.current.clientHeight + 'px';
    // this.wrapRef.current.style.overflow = 'hidden';
    e.stopImmediatePropagation();
    foundation.showYearPicker(panelType);
  }

  function renderMonth(month: Date, panelType: PanelType) {
    const { selected, rangeStart, rangeEnd, hoverDay, maxWeekNum, offsetRangeStart, offsetRangeEnd } = state;
    const {
      weekStartsOn,
      disabledDate,
      locale,
      localeCode,
      renderDate,
      renderFullDate,
      startDateOffset,
      endDateOffset,
      density,
      rangeInputFocus,
      syncSwitchMonth,
      multiple,
    } = props;
    let monthText = '';
    // i18n monthText
    if (month) {
      // Get the absolute value of the year and month
      const yearNumber = month ? formatFn(month, 'yyyy') : '';
      const monthNumber = month ? formatFn(month, 'L') : '';
      // Display the month as the corresponding language text
      const mText = locale && locale.months && locale.months[monthNumber];
      const monthFormatToken = locale.monthText;
      // Display the year and month in a specific language format order
      monthText = monthFormatToken && monthFormatToken.replace('${year}', yearNumber).replace('${month}', mText);
    }

    let style = {};
    const detail = panelType === strings.PANEL_TYPE_RIGHT ? state.monthRight : state.monthLeft;
    // Whether to select type for range
    const isRangeType = foundation.isRangeType();
    // Whether to switch synchronously for two panels
    const shouldBimonthSwitch = isRangeType && syncSwitchMonth;

    if (isRangeType && detail && (detail.isYearPickerOpen || detail.isTimePickerOpen)) {
      style = {
        visibility: 'hidden',
        position: 'absolute',
        pointerEvents: 'none',
      };
    }

    // TODO forwardRef
    return (
      <div ref={(current) => cacheRefCurrent(`wrap-${panelType}`, current)} style={style}>
        <Navigation
          forwardRef={(current) => cacheRefCurrent(`nav-${panelType}`, current)}
          monthText={monthText}
          density={density}
          onMonthClick={(e) => showYearPicker(panelType, e)}
          onPrevMonth={() => foundation.prevMonth(panelType)}
          onNextMonth={() => foundation.nextMonth(panelType)}
          onNextYear={() => foundation.nextYear(panelType)}
          onPrevYear={() => foundation.prevYear(panelType)}
          shouldBimonthSwitch={shouldBimonthSwitch}
          panelType={panelType}
        />
        <Month
          locale={locale}
          localeCode={localeCode}
          forwardRef={(current) => cacheRefCurrent(`month-${panelType}`, current)}
          disabledDate={disabledDate}
          weekStartsOn={weekStartsOn}
          month={month}
          selected={selected}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          rangeInputFocus={rangeInputFocus}
          offsetRangeStart={offsetRangeStart}
          offsetRangeEnd={offsetRangeEnd}
          hoverDay={hoverDay}
          weeksRowNum={maxWeekNum}
          renderDate={renderDate}
          renderFullDate={renderFullDate}
          onDayClick={(day) => foundation.handleDayClick(day, panelType)}
          onDayHover={(day) => foundation.handleDayHover(day, panelType)}
          onWeeksRowNumChange={(weeksRowNum) => handleWeeksRowNumChange(weeksRowNum, panelType)}
          startDateOffset={startDateOffset}
          endDateOffset={endDateOffset}
          focusRecordsRef={props.focusRecordsRef}
          multiple={multiple}
        />
      </div>
    );
  }

  const handleWeeksRowNumChange = (weeksRowNum: number, panelType: PanelType) => {
    const isLeft = panelType === strings.PANEL_TYPE_RIGHT;
    const isRight = panelType === strings.PANEL_TYPE_RIGHT;
    const allIsYearOrTime = leftIsYearOrTime() && rightIsYearOrTime();

    if (foundation.isRangeType() && !allIsYearOrTime) {
      state.weeksRowNum = weeksRowNum;
      state.currentPanelHeight = calcScrollListHeight();
      nextTick(() => {
        if ((leftIsYearOrTime() && isRight) || (rightIsYearOrTime() && isLeft)) {
          reselect();
        }
      });
    }
  };

  const reselect = () => {
    const refKeys = [
      `timepicker-${strings.PANEL_TYPE_LEFT}`,
      `timepicker-${strings.PANEL_TYPE_RIGHT}`,
      `yam-${strings.PANEL_TYPE_LEFT}`,
      `yam-${strings.PANEL_TYPE_RIGHT}`,
    ];

    refKeys.forEach((key) => {
      const current = adapter().getCache(key);

      if (current && typeof current.reselect === 'function') {
        current.reselect();
      }
    });
  };

  const getYAMOpenType = () => {
    return foundation.getYAMOpenType();
  };

  function renderTimePicker(panelType: PanelType, panelDetail: MonthInfo) {
    const { type, locale, format, hideDisabledOptions, timePickerOpts, dateFnsLocale } = props;
    const { pickerDate } = panelDetail;
    const timePanelCls = classnames(`${prefixCls}-time`);
    const restProps = {
      ...timePickerOpts,
      hideDisabledOptions,
    };

    const disabledOptions = foundation.calcDisabledTime(panelType);

    if (disabledOptions) {
      ['disabledHours', 'disabledMinutes', 'disabledSeconds'].forEach((key) => {
        if (disabledOptions[key]) {
          restProps[key] = disabledOptions[key];
        }
      });
    }

    const { rangeStart, rangeEnd } = state;
    const dateFormat = foundation.getValidDateFormat();
    let startDate, endDate;
    if (
      type === 'dateTimeRange' &&
      rangeStart &&
      rangeEnd &&
      isSameDay(
        (startDate = compatibleParse(rangeStart, dateFormat, undefined, dateFnsLocale)),
        (endDate = compatibleParse(rangeEnd, dateFormat, undefined, dateFnsLocale))
      )
    ) {
      if (panelType === strings.PANEL_TYPE_RIGHT) {
        rangeStart && (restProps.startDate = startDate);
      } else {
        rangeEnd && (restProps.endDate = endDate);
      }
    }
    // i18n placeholder
    const placeholder = locale.selectTime;
    return (
      <div class={timePanelCls}>
        <Combobox
          ref={(current) => cacheRefCurrent(`timepicker-${panelType}`, current)}
          panelHeader={placeholder}
          format={format || strings.FORMAT_TIME_PICKER}
          timeStampValue={pickerDate}
          onChange={(newTime: { timeStampValue: number }) => foundation.handleTimeChange(newTime, panelType)}
          {...restProps}
        />
      </div>
    );
  }

  function renderYearAndMonth(panelType: PanelType, panelDetail: MonthInfo) {
    const { pickerDate } = panelDetail;
    const { locale, localeCode, density, yearAndMonthOpts, startYear, endYear } = props;
    const y = pickerDate.getFullYear();
    const m = pickerDate.getMonth() + 1;
    return (
      <YearAndMonth
        ref={(current) => cacheRefCurrent(`yam-${panelType}`, current)}
        locale={locale}
        localeCode={localeCode}
        currentYear={{ left: y, right: 0 }}
        currentMonth={{ left: m, right: 0 }}
        onSelect={(item) => foundation.toYearMonth(panelType, new Date(item.currentYear.left, item.currentMonth.left - 1))}
        onBackToMain={() => {
          foundation.showDatePanel(panelType);
          const wrapCurrent = adapter().getCache(`wrap-${panelType}`);
          if (wrapCurrent) {
            wrapCurrent.style.height = 'auto';
          }
        }}
        density={density}
        yearAndMonthOpts={yearAndMonthOpts}
        startYear={startYear}
        endYear={endYear}
      />
    );
  }

  function renderSwitch(panelType: PanelType) {
    const { rangeStart, rangeEnd, monthLeft, monthRight } = state;
    const { type, locale, disabledTimePicker, density, dateFnsLocale, insetInput } = props;
    // Type: date, dateRange, year, month, inset input no rendering required
    if (!type.includes('Time') || insetInput) {
      return null;
    }

    // switch year/month & time
    let panelDetail, dateText;

    // i18n
    const { FORMAT_SWITCH_DATE } = locale.localeFormatToken;
    // Timepicker format is constant and does not change with language
    // const FORMAT_TIME_PICKER = strings.FORMAT_TIME_PICKER;
    const formatTimePicker = foundation.getValidTimeFormat();
    const dateFormat = foundation.getValidDateFormat();

    if (panelType === strings.PANEL_TYPE_LEFT) {
      panelDetail = monthLeft;
      dateText = rangeStart
        ? formatFn(compatibleParse(rangeStart, dateFormat, undefined, dateFnsLocale), FORMAT_SWITCH_DATE)
        : '';
    } else {
      panelDetail = monthRight;
      dateText = rangeEnd
        ? formatFn(compatibleParse(rangeEnd, dateFormat, undefined, dateFnsLocale), FORMAT_SWITCH_DATE)
        : '';
    }

    const { isTimePickerOpen, showDate } = panelDetail;
    const monthText = showDate ? formatFn(showDate, FORMAT_SWITCH_DATE) : '';

    const timeText = showDate ? formatFn(showDate, formatTimePicker) : '';

    const showSwitchIcon = ['default'].includes(density);

    const switchCls = classnames(`${prefixCls}-switch`);
    const dateCls = classnames({
      [`${prefixCls}-switch-date`]: true,
      [`${prefixCls}-switch-date-active`]: !isTimePickerOpen,
    });
    const timeCls = classnames({
      [`${prefixCls}-switch-time`]: true,
      [`${prefixCls}-switch-time-disabled`]: disabledTimePicker,
      [`${prefixCls}-switch-date-active`]: isTimePickerOpen,
    });
    const textCls = classnames(`${prefixCls}-switch-text`);

    return (
      <div class={switchCls} ref={(current) => adapter().setCache(`switch-${panelType}`, current)}>
        <div
          role="button"
          aria-label="Switch to date panel"
          class={dateCls}
          onClick={(e) => foundation.showDatePanel(panelType)}
        >
          {showSwitchIcon && <IconCalendar aria-hidden />}
          <span class={textCls}>{dateText || monthText}</span>
        </div>
        <div
          role="button"
          aria-label="Switch to time panel"
          class={timeCls}
          onClick={(e) => foundation.showTimePicker(panelType, true)}
        >
          {showSwitchIcon && <IconClock aria-hidden />}
          <span class={textCls}>{timeText}</span>
        </div>
      </div>
    );
  }

  return () => {
    const { monthLeft, monthRight } = state;
    const { type, insetInput, presetPosition, renderQuickControls, renderDateInput } = props;
    const monthGridCls = classnames({
      [`${prefixCls}-month-grid`]: true,
    });
    const panelTypeLeft = strings.PANEL_TYPE_LEFT;
    const panelTypeRight = strings.PANEL_TYPE_RIGHT;
    let content = null;
    if (type === 'date' || type === 'dateTime') {
      content = renderPanel(monthLeft.pickerDate, panelTypeLeft);
    } else if (type === 'dateRange' || type === 'dateTimeRange') {
      content = [renderPanel(monthLeft.pickerDate, panelTypeLeft), renderPanel(monthRight.pickerDate, panelTypeRight)];
    } else if (type === 'year' || type === 'month') {
      content = 'year month';
    }
    const yearOpenType = getYAMOpenType();

    return (
      <div style={{ display: 'flex' }}>
        {presetPosition === 'left' && renderQuickControls}
        <div>
          {renderDateInput}
          <div
            class={monthGridCls}
            x-type={type}
            x-panel-yearandmonth-open-type={yearOpenType}
            // FIXME:
            x-insetinput={insetInput ? 'true' : 'false'}
            x-preset-position={renderQuickControls === null ? 'null' : presetPosition}
            ref={(current) => cacheRefCurrent('monthGrid', current)}
          >
            {content}
          </div>
        </div>
        {presetPosition === 'right' && renderQuickControls}
      </div>
    );
  };
}, {
  props: vuePropsType,
  name: 'MonthsGrid'
});


export default monthsGrid;
