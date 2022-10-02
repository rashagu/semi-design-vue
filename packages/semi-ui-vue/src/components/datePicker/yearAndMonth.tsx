import {defineComponent, ref, h, Fragment, useSlots, reactive, watch} from 'vue'

import YearAndMonthFoundation, { MonthScrollItem, YearAndMonthAdapter, YearAndMonthFoundationProps, YearAndMonthFoundationState, YearScrollItem } from '@douyinfe/semi-foundation/datePicker/yearAndMonthFoundation';
import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import ScrollList from '../scrollList/index';
import ScrollItem from '../scrollList/scrollItem';
import { getYears } from '@douyinfe/semi-foundation/datePicker/_utils/index';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';

import IconButton from '../iconButton';
import { IconChevronLeft } from '@kousum/semi-icons-vue';
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';

import { noop, stubFalse } from 'lodash';
import { setYear, setMonth } from 'date-fns';
import { Locale } from '../locale/interface';
import * as PropTypes from "../PropTypes";
import {vuePropsMake} from "../PropTypes";

const prefixCls = `${BASE_CLASS_PREFIX}-datepicker`;

export interface YearAndMonthProps extends YearAndMonthFoundationProps, BaseProps {
  locale?: Locale['DatePicker'];
}

export type YearAndMonthState = YearAndMonthFoundationState;


const propTypes = {
  currentYear: PropTypes.number,
  currentMonth: PropTypes.number,
  onSelect: PropTypes.func,
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  monthCycled: PropTypes.bool,
  yearCycled: PropTypes.bool,
  noBackBtn: PropTypes.bool,
  disabledDate: PropTypes.func,
  density: PropTypes.string,
};

const defaultProps = {
  disabledDate: stubFalse,
  monthCycled: false,
  yearCycled: false,
  noBackBtn: false,
  onSelect: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const yearAndMonth = defineComponent<YearAndMonthProps>((props, {}) => {
  const slots = useSlots()

  const now = new Date();

  let { currentYear, currentMonth } = props;
  currentYear = currentYear || now.getFullYear();
  currentMonth = currentMonth || now.getMonth() + 1;

  const state = reactive<YearAndMonthState>({
    years: getYears().map(year => ({
      value: year,
      year,
    })),
    months: Array(12)
      .fill(0)
      .map((v, idx) => ({
        value: idx + 1,
        month: idx + 1,
      })),
    currentYear,
    currentMonth,
  });

  const {cache, adapter: adapterInject, log, context: context_} = useBaseComponent<YearAndMonthProps>(props, state)
  const yearRef = ref();
  const monthRef = ref();
  const foundation = new YearAndMonthFoundation(adapter());

  function adapter(): YearAndMonthAdapter {
    return {
      ...adapterInject<YearAndMonthProps, YearAndMonthState>(),
      // updateYears: years => this.setState({ years }),
      // updateMonths: months => this.setState({ months }),
      setCurrentYear: currentYear => state.currentYear = currentYear,
      setCurrentMonth: currentMonth => state.currentMonth = currentMonth,
      notifySelectYear: year =>
        props.onSelect({
          currentMonth: state.currentMonth,
          currentYear: year,
        }),
      notifySelectMonth: month =>
        props.onSelect({
          currentYear: state.currentYear,
          currentMonth: month,
        }),
      notifyBackToMain: () => props.onBackToMain(),
    };
  }

  // ok
  function getDerivedStateFromProps(props: YearAndMonthProps, state: YearAndMonthState) {
    const willUpdateStates: Partial<YearAndMonthState> = {};
    const now = new Date();

    if (!isNullOrUndefined(props.currentMonth) && props.currentMonth !== state.currentMonth && props.currentMonth !== 0) {
      willUpdateStates.currentMonth = props.currentMonth || now.getMonth() + 1;
    }

    if (isNullOrUndefined(props.currentYear) && props.currentYear !== state.currentYear && props.currentYear !== 0) {
      willUpdateStates.currentYear = props.currentYear || now.getFullYear();
    }

    return willUpdateStates;
  }
  watch([()=>props.currentMonth, ()=>props.currentYear], (val)=>{
    const newState = getDerivedStateFromProps(props, state)
    if (newState){
      Object.keys(newState).forEach(key=>{
        state[key] = newState[key]
      })
    }
  })

  function renderColYear() {
    const { years, currentYear, currentMonth } = state;
    const { disabledDate, localeCode, yearCycled } = props;
    const currentDate = setMonth(Date.now(), currentMonth - 1);
    const list: any[] = years.map(({ value, year }) => ({
      year,
      value, // Actual rendered text
      disabled: disabledDate(setYear(currentDate, year)),
    }));
    let transform = (val: string) => val;
    if (localeCode === 'zh-CN' || localeCode === 'zh-TW') {
      // Only Chinese needs to add [year] after the selected year
      transform = val => `${val }年`;
    }
    return (
      <ScrollItem
        ref={yearRef}
        cycled={yearCycled}
        list={list}
        transform={transform}
        selectedIndex={years.findIndex(item => item.value === currentYear)}
        type="year"
        onSelect={selectYear}
      />
    );
  }

  const selectYear = (item: YearScrollItem) => {
    foundation.selectYear(item);
  };

  const selectMonth = (item: MonthScrollItem) => {
    foundation.selectMonth(item);
  };

  const reselect = () => {
    const refKeys = [yearRef, monthRef];

    refKeys.forEach(refValue => {
      if (refValue.value && refValue.value.scrollToIndex) {
        refValue.value.scrollToIndex();
      }
    });
  };

  function renderColMonth() {
    const { months, currentMonth, currentYear } = state;
    const { locale, localeCode, monthCycled, disabledDate } = props;
    let transform = (val: string) => val;
    const currentDate = setYear(Date.now(), currentYear);
    if (localeCode === 'zh-CN' || localeCode === 'zh-TW') {
      // Only Chinese needs to add [month] after the selected month
      transform = val => `${val }月`;
    }
    // i18n
    const list: MonthScrollItem[] = months.map(({ value, month }) => ({
      month,
      disabled: disabledDate(setMonth(currentDate, month - 1)),
      value: locale.fullMonths[value], // Actual rendered text
    }));
    const selectedIndex = list.findIndex(item => item.month === currentMonth);
    return (
      <ScrollItem
        ref={monthRef}
        cycled={monthCycled}
        list={list}
        transform={transform}
        selectedIndex={selectedIndex}
        type="month"
        onSelect={selectMonth}
      />
    );
  }

  const backToMain = e => {
    e.stopImmediatePropagation();
    foundation.backToMain();
  };

  return () => {
    const { locale, noBackBtn, density } = props;
    const prefix = `${prefixCls}-yearmonth-header`;
    // i18n
    const selectDateText = locale.selectDate;
    const iconSize = density === 'compact' ? 'default' : 'large';
    const buttonSize = density === 'compact' ? 'small' : 'default';

    return (
      <Fragment>
        {noBackBtn ? null : (
          <div class={prefix}>
            <IconButton
              noHorizontalPadding={false}
              icon={<IconChevronLeft aria-hidden size={iconSize} />}
              size={buttonSize}
              onClick={backToMain}
            >
              <span>{selectDateText}</span>
            </IconButton>
          </div>
        )}
        <ScrollList>
          {renderColYear()}
          {renderColMonth()}
        </ScrollList>
      </Fragment>
    );
  }
})

yearAndMonth.props = vuePropsType

export default yearAndMonth

