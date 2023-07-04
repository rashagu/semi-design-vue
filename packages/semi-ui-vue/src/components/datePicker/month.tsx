import {defineComponent, ref, h, Fragment, reactive, onMounted, nextTick, onUnmounted, watch, Ref, PropType} from 'vue'


import classNames from 'classnames';
import * as PropTypes from '../PropTypes';
import MonthFoundation, { MonthAdapter, MonthDayInfo, MonthFoundationProps, MonthFoundationState } from '@douyinfe/semi-foundation/datePicker/monthFoundation';
import { cssClasses, numbers } from '@douyinfe/semi-foundation/datePicker/constants';
import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import { isBefore, isAfter, isBetween, isSameDay } from '@douyinfe/semi-foundation/datePicker/_utils/index';
import { noop, stubFalse, isFunction } from 'lodash';
import { parseISO } from 'date-fns';
import { Locale } from '../locale/interface';
import {CheckboxProps} from "../checkbox";
import {InsetTimeInput} from "./insetInput";
import {vuePropsMake} from "../PropTypes";
import {ComponentObjectPropsOptions} from "vue/dist/vue";

const prefixCls = cssClasses.PREFIX;

export interface MonthProps extends MonthFoundationProps, BaseProps {
  forwardRef: any;
  locale: Locale['DatePicker'];
  focusRecordsRef: Ref<{ rangeStart: boolean; rangeEnd: boolean }>;
}

export type MonthState = MonthFoundationState;
const propTypes: ComponentObjectPropsOptions<MonthProps> = {
  forwardRef: undefined,
  localeCode: undefined,
  month: {type: PropTypes.object, default: new Date()},
  selected: {type: PropTypes.object, default: new Set()},
  rangeStart: {type: PropTypes.string, default: ''},
  rangeEnd: {type: PropTypes.string, default: ''},
  offsetRangeStart: PropTypes.string,
  offsetRangeEnd: PropTypes.string,
  onDayClick: {type:PropTypes.func as PropType<MonthProps['onDayClick']>,default:noop},
  onDayHover: {type:PropTypes.func as PropType<MonthProps['onDayHover']>,default:noop},
  weekStartsOn: {type: PropTypes.number as PropType<MonthProps['weekStartsOn']>, default: numbers.WEEK_START_ON},
  disabledDate: {type: PropTypes.func as PropType<MonthProps['disabledDate']>, default: stubFalse},
  weeksRowNum: {type:PropTypes.number, default:0},
  onWeeksRowNumChange: {type:PropTypes.func as PropType<MonthProps['onWeeksRowNumChange']>,default:noop},
  renderDate: PropTypes.func as PropType<MonthProps['renderDate']>,
  renderFullDate: PropTypes.func as PropType<MonthProps['renderFullDate']>,
  hoverDay: PropTypes.string, // Real-time hover date
  startDateOffset: PropTypes.func as PropType<MonthProps['startDateOffset']>,
  endDateOffset: PropTypes.func as PropType<MonthProps['endDateOffset']>,
  rangeInputFocus: [PropTypes.string, PropTypes.bool],
  focusRecordsRef: PropTypes.object,
  multiple: PropTypes.bool,
  locale:Object
}

const defaultProps = {
  month: new Date(),
  selected: new Set(),
  rangeStart: '',
  rangeEnd: '',
  onDayClick: noop,
  onDayHover: noop,
  onWeeksRowNumChange: noop,
  weekStartsOn: numbers.WEEK_START_ON,
  disabledDate: stubFalse,
  weeksRowNum: 0,
};
export const vuePropsType = vuePropsMake<MonthProps>(propTypes, defaultProps)
const month = defineComponent<MonthProps>((props, {slots}) => {

  const monthRef = ref()
  const state = reactive<MonthState>({
    weekdays: [],
    month: { weeks: [], monthText: '' },
    todayText: '',
    weeksRowNum: props.weeksRowNum,
  });

  const {adapter: adapterInject} = useBaseComponent<MonthProps>(props, state)
  let foundation: MonthFoundation;
  function adapter(): MonthAdapter {
    return {
      ...adapterInject<MonthProps, MonthState>(),
      updateToday: todayText => state.todayText = todayText,
      setWeekDays: weekdays => state.weekdays = weekdays,
      setWeeksRowNum: (weeksRowNum, callback) => {
        state.weeksRowNum = weeksRowNum
        nextTick(()=>{
          callback()
        })
      },
      updateMonthTable: month => state.month = month,
      notifyDayClick: day => props.onDayClick(day),
      notifyDayHover: day => props.onDayHover(day),
      notifyWeeksRowNumChange: weeksRowNum => props.onWeeksRowNumChange(weeksRowNum),
    };
  }
  foundation = new MonthFoundation(adapter());
  onMounted(()=>{
    foundation.init();
  })

  onUnmounted(()=>{
    foundation.destroy();
  })

  watch(()=>props.month, ()=>{
    foundation.getMonthTable();
  }, {immediate: true})


  function getSingleDayStatus(options: Partial<MonthProps> & { fullDate: string; todayText: string }) {
    const { rangeInputFocus } = props;
    const { fullDate, todayText, selected, disabledDate, rangeStart, rangeEnd } = options;
    const disabledOptions = { rangeStart, rangeEnd, rangeInputFocus };
    const isToday = fullDate === todayText;
    const isSelected = selected.has(fullDate);

    let isDisabled = disabledDate && disabledDate(parseISO(fullDate), disabledOptions);
    if (
      !isDisabled &&
      props.rangeInputFocus === 'rangeStart' &&
      rangeEnd &&
      props.focusRecordsRef &&
      props.focusRecordsRef.value.rangeEnd
    ) {
      // The reason for splitting is that the dateRangeTime format: 'yyyy-MM-dd HH:MM:SS'
      isDisabled = isAfter(fullDate, rangeEnd.trim().split(/\s+/)[0]);
    }
    if (
      !isDisabled &&
      props.rangeInputFocus === 'rangeEnd' &&
      rangeStart &&
      props.focusRecordsRef &&
      props.focusRecordsRef.value.rangeStart
    ) {
      // The reason for splitting is that the dateRangeTime format: 'yyyy-MM-dd HH:MM:SS'
      isDisabled = isBefore(fullDate, rangeStart.trim().split(/\s+/)[0]);
    }

    return {
      isToday, // Today
      isSelected, // Selected
      isDisabled // Disabled
    };
  }

  function getDateRangeStatus(options: Partial<MonthProps> & { fullDate: string }) {
    const { rangeStart, rangeEnd, fullDate, hoverDay, offsetRangeStart, offsetRangeEnd, rangeInputFocus } = options;

    // If no item is selected, return the empty object directly
    const _isDateRangeAnySelected = Boolean(rangeStart || rangeEnd);
    const _isDateRangeSelected = Boolean(rangeStart && rangeEnd);
    const _isOffsetDateRangeAnyExist = offsetRangeStart || offsetRangeEnd;
    if (!_isDateRangeAnySelected) {
      return ({});
    }

    // The range selects the hover date, and the normal hover is .semi-datepicker-main: hover
    const _isHoverDay = isSameDay(hoverDay, fullDate);

    // When one is selected
    // eslint-disable-next-line one-var
    let _isHoverAfterStart, _isHoverBeforeEnd, isSelectedStart, isSelectedEnd, isHoverDayAroundOneSelected;
    if (rangeStart) {
      isSelectedStart = isSameDay(fullDate, rangeStart);
      if (rangeInputFocus === 'rangeEnd') {
        _isHoverAfterStart = isBetween(fullDate, { start: rangeStart, end: hoverDay });
      }
    }
    if (rangeEnd) {
      isSelectedEnd = isSameDay(fullDate, rangeEnd);
      if (rangeInputFocus === 'rangeStart') {
        _isHoverBeforeEnd = isBetween(fullDate, { start: hoverDay, end: rangeEnd });
      }
    }

    if (!_isDateRangeSelected && _isDateRangeAnySelected) {
      isHoverDayAroundOneSelected = _isHoverDay;
    }

    // eslint-disable-next-line one-var
    let isHover;
    if (!_isOffsetDateRangeAnyExist) {
      isHover = _isHoverAfterStart || _isHoverBeforeEnd || _isHoverDay;
    }

    // Select all
    // eslint-disable-next-line one-var
    let isInRange, isSelectedStartAfterHover, isSelectedEndBeforeHover, isHoverDayInStartSelection, isHoverDayInEndSelection, isHoverDayInRange;
    if (_isDateRangeSelected) {
      isInRange = isBetween(fullDate, { start: rangeStart, end: rangeEnd });
      if (!_isOffsetDateRangeAnyExist) {
        isSelectedStartAfterHover = isSelectedStart && isAfter(rangeStart, hoverDay);
        isSelectedEndBeforeHover = isSelectedEnd && isBefore(rangeEnd, hoverDay);
        isHoverDayInStartSelection = _isHoverDay && rangeInputFocus === 'rangeStart';
        isHoverDayInEndSelection = _isHoverDay && rangeInputFocus === 'rangeEnd';
        isHoverDayInRange = _isHoverDay && isBetween(hoverDay, { start: rangeStart, end: rangeEnd });
      }
    }

    return {
      isHoverDay: _isHoverDay, // Is the current hover date
      isSelectedStart, // Select Start
      isSelectedEnd, // End of selection
      isInRange, // Range within the selected date
      isHover, // Date between selection and hover date
      isSelectedStartAfterHover, // Choose to start behind the hover
      isSelectedEndBeforeHover, // Choose to end in front of the hover
      isHoverDayInRange, // Hover date within range
      isHoverDayInStartSelection, // Hover date when starting Date is selected
      isHoverDayInEndSelection, // Hover date when endDate is selected
      isHoverDayAroundOneSelected, // Hover date and select a date
    };
  }

  function getOffsetDateStatus(options: Partial<MonthProps> & { fullDate: string }) {
    const { offsetRangeStart, offsetRangeEnd, rangeStart, rangeEnd, fullDate, hoverDay } = options;

    // When there is no offset, return the empty object directly
    const _isOffsetDateRangeNull = !(offsetRangeStart || offsetRangeEnd);
    if (_isOffsetDateRangeNull) {
      return ({});
    }

    // Range Select base date
    const _isInRange = isBetween(fullDate, { start: rangeStart, end: rangeEnd });
    const _isHoverDay = isSameDay(hoverDay, fullDate);
    const _isSelectedStart = rangeStart && isSameDay(fullDate, rangeStart);
    const _isSelectedEnd = rangeEnd && isSameDay(fullDate, rangeEnd);
    const _isDateRangeSelected = Boolean(rangeStart && rangeEnd);

    // Determine whether it is offsetStart or offsetRangeEnd
    const isOffsetRangeStart = isSameDay(fullDate, offsetRangeStart);
    const isOffsetRangeEnd = isSameDay(fullDate, offsetRangeEnd);
    const isHoverDayOffset = _isHoverDay;

    // When selected
    let isHoverInOffsetRange, isInOffsetRange;
    if (_isDateRangeSelected) {
      isHoverInOffsetRange = _isInRange && _isHoverDay;
    }

    // When there is an offset area
    const _isOffsetDateRangeSelected = Boolean(offsetRangeStart && offsetRangeEnd);
    if (_isOffsetDateRangeSelected) {
      isInOffsetRange = (_isSelectedStart || isBetween(fullDate, { start: offsetRangeStart, end: offsetRangeEnd }) || _isSelectedEnd);
    }

    return {
      isOffsetRangeStart, // Week selection start
      isOffsetRangeEnd, // End of week selection
      isHoverInOffsetRange, // Hover in the week selection
      isHoverDayOffset, // Week selection hover day
      isInOffsetRange // Include start and end within the week selection (start and end styles are the same as other dates, so start and end are included)
    };
  }

  /**
   * get day current status
   * @param {Object} fullDate
   * @param {Object} options
   * @returns {Object}
   */
  function getDayStatus(currentDay: MonthDayInfo, options: MonthProps & { todayText: string }) {
    const { fullDate } = currentDay;
    const { hoverDay, rangeStart, rangeEnd, todayText, offsetRangeStart, offsetRangeEnd, disabledDate, selected, rangeInputFocus } = options;

    const singleDayStatus = getSingleDayStatus({ fullDate, todayText, hoverDay, selected, disabledDate, rangeStart, rangeEnd });
    const dateRangeStatus = getDateRangeStatus({ fullDate, rangeStart, rangeEnd, hoverDay, offsetRangeStart, offsetRangeEnd, rangeInputFocus, ...singleDayStatus });
    const offsetDataStatus = getOffsetDateStatus({ offsetRangeStart, offsetRangeEnd, rangeStart, rangeEnd, fullDate, hoverDay, ...singleDayStatus, ...dateRangeStatus });

    // this parameter will pass to the user when given renderFullDate function, do not delete or modify its key
    const dayStatus = {
      ...singleDayStatus,
      ...dateRangeStatus,
      ...offsetDataStatus,
    };

    return dayStatus;
  }

  function renderDayOfWeek() {
    const { locale } = props;
    const weekdayCls = classNames(cssClasses.WEEKDAY);
    const weekdayItemCls = classNames(`${prefixCls}-weekday-item`);
    const { weekdays } = state;
    // i18n
    const weekdaysText = weekdays.map(key => locale.weeks[key]);
    return (
      <div role="row" class={weekdayCls}>
        {weekdaysText.map((E, i) => (
          <div role="columnheader" key={E + i} class={weekdayItemCls}>
            {E}
          </div>
        ))}
      </div>
    );
  }

  function renderWeeks() {
    const { month } = state;
    const { weeks } = month;
    const { weeksRowNum } = props;
    let style = {};
    if (weeksRowNum) {
      const height = weeksRowNum * numbers.WEEK_HEIGHT;
      style = { height };
    }
    const weeksCls = classNames(cssClasses.WEEKS);
    return (
      <div class={weeksCls} style={style}>
        {weeks.map((week, weekIndex) => renderWeek(week, weekIndex))}
      </div>
    );
  }

  function renderWeek(week: MonthDayInfo[], weekIndex: number) {
    const weekCls = cssClasses.WEEK;
    return (
      <div role="row" class={weekCls} key={weekIndex}>
        {week.map((day, dayIndex) => renderDay(day, dayIndex))}
      </div>
    );
  }

  function renderDay(day: MonthDayInfo, dayIndex: number) {
    const { todayText } = state;
    const { renderFullDate, renderDate } = props;
    const { fullDate, dayNumber } = day;
    if (!fullDate) {
      return (
        <div role="gridcell" tabindex={-1} key={(dayNumber as number) + dayIndex} class={cssClasses.DAY}>
          <span />
        </div>
      );
    }

    const dayStatus = getDayStatus(day, { todayText, ...props });

    const dayCls = classNames(cssClasses.DAY, {
      [cssClasses.DAY_TODAY]: dayStatus.isToday,
      [cssClasses.DAY_IN_RANGE]: dayStatus.isInRange,
      [cssClasses.DAY_HOVER]: dayStatus.isHover,
      [cssClasses.DAY_SELECTED]: dayStatus.isSelected,
      [cssClasses.DAY_SELECTED_START]: dayStatus.isSelectedStart,
      [cssClasses.DAY_SELECTED_END]: dayStatus.isSelectedEnd,
      [cssClasses.DAY_DISABLED]: dayStatus.isDisabled,
      // offsetDate class
      [cssClasses.DAY_HOVER_DAY]: dayStatus.isHoverDayOffset,
      [cssClasses.DAY_IN_OFFSET_RANGE]: dayStatus.isInOffsetRange,
      [cssClasses.DAY_SELECTED_RANGE_HOVER]: dayStatus.isHoverInOffsetRange,
      [cssClasses.DAY_OFFSET_RANGE_START]: dayStatus.isOffsetRangeStart,
      [cssClasses.DAY_OFFSET_RANGE_END]: dayStatus.isOffsetRangeEnd,
      // range input class
      [cssClasses.DAY_SELECTED_START_AFTER_HOVER]: dayStatus.isSelectedStartAfterHover,
      [cssClasses.DAY_SELECTED_END_BEFORE_HOVER]: dayStatus.isSelectedEndBeforeHover,
      [cssClasses.DAY_HOVER_DAY_BEFORE_RANGE]: dayStatus.isHoverDayInStartSelection,
      [cssClasses.DAY_HOVER_DAY_AFTER_RANGE]: dayStatus.isHoverDayInEndSelection,
      [cssClasses.DAY_HOVER_DAY_AROUND_SINGLE_SELECTED]: dayStatus.isHoverDayAroundOneSelected,
    });

    const dayMainCls = classNames({
      [`${cssClasses.DAY}-main`]: true,
    });

    const fullDateArgs = [dayNumber, fullDate, dayStatus];
    const customRender = isFunction(renderFullDate);

    return (
      <div
        role="gridcell"
        tabindex={dayStatus.isDisabled ? -1 : 0}
        aria-disabled={dayStatus.isDisabled}
        aria-selected={dayStatus.isSelected}
        aria-label={fullDate}
        class={!customRender ? dayCls : cssClasses.DAY}
        title={fullDate}
        key={(dayNumber as number) + dayIndex}
        onClick={e => !dayStatus.isDisabled && foundation.handleClick(day)}
        onMouseenter={() => foundation.handleHover(day)}
        onMouseleave={() => foundation.handleHover()}
      >
        {/*// @ts-ignore*/}
        {customRender ? renderFullDate(...fullDateArgs) : (
          <div class={dayMainCls}>
            {/*// @ts-ignore*/}
            {isFunction(renderDate) ? renderDate(dayNumber, fullDate) : <span>{dayNumber}</span>}
          </div>
        )}
      </div>
    );
  }



  return () => {

    const { forwardRef, multiple } = props;
    const weekday = renderDayOfWeek();
    const weeks = renderWeeks();
    const monthCls = classNames(cssClasses.MONTH);
    const ref = forwardRef || monthRef;
    return (
      <div role="grid" aria-multiselectable={multiple} ref={ref} class={monthCls} >
        {weekday}
        {weeks}
      </div>
    );
  }
}, {
  props: vuePropsType,
  name: 'Month'
})


export default month

