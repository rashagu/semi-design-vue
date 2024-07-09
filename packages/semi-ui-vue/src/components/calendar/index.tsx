import * as PropTypes from '../PropTypes';
import { EventObject } from '@douyinfe/semi-foundation/calendar/foundation';
import DayCalendar from './dayCalendar';
import WeekCalendar from './weekCalendar';
import MonthCalendar from './monthCalendar';
import RangeCalendar from './rangeCalendar';
import { CalendarProps } from './interface';
import '@douyinfe/semi-foundation/calendar/calendar.scss';
import { cloneVNode, ComponentObjectPropsOptions, defineComponent, h, PropType, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';

export * from './interface';

const propTypes: ComponentObjectPropsOptions<Required<CalendarProps>> = {
  displayValue: PropTypes.object,
  header: PropTypes.node,
  events: PropTypes.array,
  mode: PropTypes.string as PropType<CalendarProps['mode']>,
  showCurrTime: PropTypes.bool,
  weekStartsOn: PropTypes.number as PropType<CalendarProps['weekStartsOn']>,
  scrollTop: PropTypes.number,
  onClick: PropTypes.func as PropType<CalendarProps['onClick']>,
  renderTimeDisplay: PropTypes.func as PropType<CalendarProps['renderTimeDisplay']>,
  renderDateDisplay: PropTypes.func as PropType<CalendarProps['renderDateDisplay']>,
  markWeekend: PropTypes.bool,
  minEventHeight: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
  range: PropTypes.array,
  onClose: PropTypes.func as PropType<CalendarProps['onClose']>,
  dateGridRender: PropTypes.func as PropType<CalendarProps['dateGridRender']>,
  allDayEventsRender: PropTypes.func as PropType<CalendarProps['allDayEventsRender']>,
};

const defaultProps = {
  events: [] as EventObject[],
  displayValue: new Date(),
  showCurrTime: true,
  mode: 'week',
  markWeekend: false,
  height: 600,
  scrollTop: 400,
  weekStartsOn: 0,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Calendar = defineComponent({
  props: vuePropsType,
  name: 'Calendar',
  setup(props, {}) {
    const slots = useSlots();

    return () => {
      const { mode, range, showCurrTime, scrollTop, renderTimeDisplay, ...rest } = props;
      const component = {
        month: <MonthCalendar />,
        week: <WeekCalendar />,
        day: <DayCalendar />,
        range: <RangeCalendar />,
      };
      return cloneVNode(component[mode], {
        ...rest,
        // 去掉month不需要的参数
        ...(mode === 'month'
          ? {}
          : {
              range,
              showCurrTime,
              scrollTop,
              renderTimeDisplay,
            }),
      });
    };
  },
});

export default Calendar;

export type { EventObject };
