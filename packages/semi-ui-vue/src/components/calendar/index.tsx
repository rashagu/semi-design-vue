import * as PropTypes from '../PropTypes';
import { EventObject } from '@douyinfe/semi-foundation/calendar/foundation';
import DayCalendar from './dayCalendar';
import WeekCalendar from './weekCalendar';
import MonthCalendar from './monthCalendar';
import RangeCalendar from './rangeCalendar';
import { CalendarProps } from './interface';
import '@douyinfe/semi-foundation/calendar/calendar.scss';
import {cloneVNode, defineComponent, h, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";

export * from './interface';


const propTypes = {
    displayValue: PropTypes.object,
    header: PropTypes.node,
    events: PropTypes.array,
    mode: PropTypes.string,
    showCurrTime: PropTypes.bool,
    weekStartsOn: PropTypes.number,
    scrollTop: PropTypes.number,
    onClick: PropTypes.func,
    renderTimeDisplay: PropTypes.func,
    markWeekend: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    className: PropTypes.string,
    range: PropTypes.array,
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

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Calendar = defineComponent<CalendarProps>((props, {}) => {
    const slots = useSlots()

    return () => {

        const { mode, ...rest } = props;
        const component = {
            month: (<MonthCalendar />),
            week: (<WeekCalendar />),
            day: (<DayCalendar />),
            range: (<RangeCalendar />)
        };
        return cloneVNode(component[mode], { ...rest });
    }
})

Calendar.props = vuePropsType
Calendar.name = 'Calendar'

export default Calendar


export type { EventObject };
