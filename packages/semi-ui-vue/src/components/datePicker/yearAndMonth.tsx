import { defineComponent, ref, h, Fragment, useSlots, reactive, watch, PropType } from 'vue';

import YearAndMonthFoundation, {
  MonthScrollItem,
  YearAndMonthAdapter,
  YearAndMonthFoundationProps,
  YearAndMonthFoundationState,
  YearScrollItem,
} from '@douyinfe/semi-foundation/datePicker/yearAndMonthFoundation';
import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import ScrollList from '../scrollList/index';
import ScrollItem from '../scrollList/scrollItem';
import { getYears } from '@douyinfe/semi-foundation/datePicker/_utils/index';

import IconButton from '../iconButton';
import { IconChevronLeft } from '@kousum/semi-icons-vue';
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';

import { noop, stubFalse, isEqual } from 'lodash';
import { setYear, setMonth, set } from 'date-fns';
import { Locale } from '../locale/interface';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { strings } from '@douyinfe/semi-foundation/datePicker/constants';
import { PanelType } from '@douyinfe/semi-foundation/datePicker/monthsGridFoundation';
import { ComponentObjectPropsOptions } from 'vue';
import { CombineProps } from '../interface';

const prefixCls = `${BASE_CLASS_PREFIX}-datepicker`;

export interface YearAndMonthProps extends YearAndMonthFoundationProps, BaseProps {
  locale?: Locale['DatePicker'];
}

export type YearAndMonthState = YearAndMonthFoundationState;

const propTypes: CombineProps<YearAndMonthProps> = {
  currentYear: {
    type: PropTypes.object,
    required: true
  },
  currentMonth: {
    type: PropTypes.object,
    required: true
  },
  onSelect: PropTypes.func as PropType<YearAndMonthProps['onSelect']>,
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  monthCycled: PropTypes.bool,
  yearCycled: PropTypes.bool,
  noBackBtn: PropTypes.bool,
  disabledDate: PropTypes.func as PropType<YearAndMonthProps['disabledDate']>,
  density: PropTypes.string,

  presetPosition: PropTypes.string as PropType<YearAndMonthProps['presetPosition']>,
  renderQuickControls: PropTypes.node,
  renderDateInput: PropTypes.node,
  yearAndMonthOpts: PropTypes.any,
  type: PropTypes.string as PropType<YearAndMonthProps['type']>,
  startYear: PropTypes.number,
  endYear: PropTypes.number,

  onBackToMain: PropTypes.func as PropType<YearAndMonthProps['onBackToMain']>,
  className: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  disabledDate: stubFalse,
  monthCycled: false,
  yearCycled: false,
  noBackBtn: false,
  onSelect: noop,
  type: 'month',
};
export const vuePropsType = vuePropsMake<YearAndMonthProps>(propTypes, defaultProps);
const yearAndMonth = defineComponent({
  props: vuePropsType,
  name: 'DatePickerYearAndMonth',
  setup(props, { expose }) {
    const slots = useSlots();

    const now = new Date();

    let { currentYear, currentMonth } = props;

    const state = reactive<YearAndMonthState>({
      years: getYears(props.startYear, props.endYear).map((year) => ({
        value: year,
        year,
      })),
      months: Array(12)
        .fill(0)
        .map((v, idx) => ({
          value: idx + 1,
          month: idx + 1,
        })),
      currentYear: { left: currentYear.left || now.getFullYear(), right: currentYear.right || now.getFullYear() },
      currentMonth: { left: currentMonth.left || now.getMonth() + 1, right: currentMonth.right || now.getMonth() + 2 },
    });

    const { adapter: adapterInject } = useBaseComponent<YearAndMonthProps>(props, state);
    const yearRef = ref();
    const monthRef = ref();
    const foundation = new YearAndMonthFoundation(adapter());

    function adapter(): YearAndMonthAdapter {
      return {
        ...adapterInject<YearAndMonthProps, YearAndMonthState>(),
        // updateYears: years => this.setState({ years }),
        // updateMonths: months => this.setState({ months }),
        setCurrentYear: (currentYear) => (state.currentYear = currentYear),
        setCurrentMonth: (currentMonth) => (state.currentMonth = currentMonth),
        setCurrentYearAndMonth: (currentYear, currentMonth) => {
          state.currentYear = currentYear;
          state.currentMonth = currentMonth;
        },
        notifySelectYear: (year) =>
          props.onSelect({
            currentMonth: state.currentMonth,
            currentYear: year,
          }),
        notifySelectMonth: (month) =>
          props.onSelect({
            currentYear: state.currentYear,
            currentMonth: month,
          }),
        notifySelectYearAndMonth: (year, month) =>
          props.onSelect({
            currentYear: year,
            currentMonth: month,
          }),
        notifyBackToMain: () => props.onBackToMain(),
      };
    }

    // ok
    function getDerivedStateFromProps(props: YearAndMonthProps, state: YearAndMonthState) {
      const willUpdateStates: Partial<YearAndMonthState> = {};
      const now = new Date();

      if (!isEqual(props.currentYear, state.currentYear) && props.currentYear.left !== 0) {
        const nowYear = new Date().getFullYear();
        willUpdateStates.currentYear = {
          left: props.currentYear.left || nowYear,
          right: props.currentYear.right || nowYear,
        };
      }

      if (!isEqual(props.currentMonth, state.currentMonth) && props.currentMonth.left !== 0) {
        const nowMonth = new Date().getMonth();
        willUpdateStates.currentMonth = {
          left: props.currentMonth.left || nowMonth + 1,
          right: props.currentMonth.right || nowMonth + 2,
        };
      }

      return willUpdateStates;
    }
    watch(
      [() => props.currentMonth, () => props.currentYear],
      (val) => {
        const newState = getDerivedStateFromProps({ ...props }, { ...state });
        if (newState) {
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
        }
      },
      { immediate: true }
    );

    function renderColYear(panelType: PanelType) {
      const { years, currentYear, currentMonth, months } = state;
      const { disabledDate, localeCode, yearCycled, yearAndMonthOpts } = props;
      const currentDate = setMonth(Date.now(), currentMonth[panelType] - 1);
      const left = strings.PANEL_TYPE_LEFT;
      const right = strings.PANEL_TYPE_RIGHT;

      const needDisabled = (year) => {
        if (panelType === right && currentYear[left]) {
          if (currentMonth[left] <= currentMonth[right]) {
            return currentYear[left] > year;
          } else {
            return currentYear[left] >= year;
          }
        }
        return false;
      };

      const list: any[] = years.map(({ value, year }) => {
        const isAllMonthDisabled = months.every(({ month }) => {
          return disabledDate(set(currentDate, { year, month: month - 1 }));
        });
        const isRightPanelDisabled = needDisabled(year);
        return {
          year,
          value, // Actual rendered text
          disabled: isAllMonthDisabled || isRightPanelDisabled,
        };
      });
      let transform = (val: string) => val;
      if (localeCode === 'zh-CN' || localeCode === 'zh-TW') {
        // Only Chinese needs to add [year] after the selected year
        transform = (val) => `${val}年`;
      }
      return (
        <ScrollItem
          ref={yearRef}
          {...{
            cycled: yearCycled,
            list: list,
            transform: transform,
            selectedIndex: years.findIndex((item) => item.value === currentYear[panelType]),
            type: 'year',
            onSelect: (item) => selectYear(item as YearScrollItem, panelType),
            mode: 'normal',
            ...yearAndMonthOpts,
          }}
        />
      );
    }

    const selectYear = (item: YearScrollItem, panelType?: PanelType) => {
      foundation.selectYear(item, panelType);
    };

    const selectMonth = (item: MonthScrollItem, panelType?: PanelType) => {
      foundation.selectMonth(item, panelType);
    };

    const reselect = () => {
      const refKeys = [yearRef, monthRef];

      refKeys.forEach((refValue) => {
        if (refValue.value && refValue.value.scrollToIndex) {
          refValue.value.scrollToIndex();
        }
      });
    };
    expose({
      reselect,
    });

    function renderColMonth(panelType: PanelType) {
      const { months, currentMonth, currentYear } = state;
      const { locale, localeCode, monthCycled, disabledDate, yearAndMonthOpts } = props;
      let transform = (val: string) => val;
      const currentDate = setYear(Date.now(), currentYear[panelType]);
      const left = strings.PANEL_TYPE_LEFT;
      const right = strings.PANEL_TYPE_RIGHT;

      if (localeCode === 'zh-CN' || localeCode === 'zh-TW') {
        // Only Chinese needs to add [month] after the selected month
        transform = (val) => `${val}月`;
      }
      // i18n
      const list: MonthScrollItem[] = months.map(({ value, month }) => {
        const isRightPanelDisabled =
          panelType === right &&
          currentMonth[left] &&
          currentYear[left] === currentYear[right] &&
          currentMonth[left] > month;

        return {
          month,
          disabled: disabledDate(setMonth(currentDate, month - 1)) || isRightPanelDisabled,
          value: locale.fullMonths[value], // Actual rendered text
        };
      });
      const selectedIndex = list.findIndex((item) => item.month === currentMonth[panelType]);

      return (
        <ScrollItem
          ref={monthRef}
          {...{
            cycled: monthCycled,
            list: list,
            transform: transform,
            selectedIndex: selectedIndex,
            type: 'month',
            onSelect: (item) => selectMonth(item as MonthScrollItem, panelType),
            mode: 'normal',
            ...yearAndMonthOpts,
          }}
        />
      );
    }

    const backToMain = (e) => {
      e.stopImmediatePropagation();
      foundation.backToMain();
    };

    function renderPanel(panelType: PanelType) {
      return (
        <Fragment>
          <ScrollList>
            {renderColYear(panelType)}
            {renderColMonth(panelType)}
          </ScrollList>
        </Fragment>
      );
    }
    return () => {
      const { locale, noBackBtn, density, presetPosition, renderQuickControls, renderDateInput, type } = props;
      const prefix = `${prefixCls}-yearmonth-header`;
      const bodyCls = `${prefixCls}-yearmonth-body`;

      // i18n
      const selectDateText = locale.selectDate;
      const iconSize = density === 'compact' ? 'default' : 'large';
      const buttonSize = density === 'compact' ? 'small' : 'default';
      const panelTypeLeft = strings.PANEL_TYPE_LEFT;
      const panelTypeRight = strings.PANEL_TYPE_RIGHT;

      let content = null;
      if (type === 'month') {
        content = renderPanel(panelTypeLeft);
      } else {
        content = (
          <div class={bodyCls}>
            {renderPanel(panelTypeLeft)}
            {renderPanel(panelTypeRight)}
          </div>
        );
      }

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
          {presetPosition ? (
            <div style={{ display: 'flex' }}>
              {/* todo: monthRange does not support presetPosition temporarily */}
              {presetPosition === 'left' && type !== 'monthRange' && renderQuickControls}
              <div>
                {renderDateInput}
                {content}
              </div>
              {/* todo: monthRange does not support presetPosition temporarily */}
              {presetPosition === 'right' && type !== 'monthRange' && renderQuickControls}
            </div>
          ) : (
            <>
              {renderDateInput}
              {content}
            </>
          )}
        </Fragment>
      );
    };
  },
});

export default yearAndMonth;
