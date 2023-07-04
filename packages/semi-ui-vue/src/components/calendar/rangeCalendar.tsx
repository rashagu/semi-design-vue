import cls from 'classnames';
import * as PropTypes from '../PropTypes';
// eslint-disable-next-line max-len
import CalendarFoundation, { ParsedEvents, CalendarAdapter, RangeData, ParsedRangeEvent, ParsedEventsType } from '@douyinfe/semi-foundation/calendar/foundation';
import LocaleConsumer from '../locale/localeConsumer';
import { cssClasses } from '@douyinfe/semi-foundation/calendar/constants';
import DayCol from './dayCol';
import TimeCol from './timeCol';
import { isEqual } from 'lodash';
import { calcRowHeight } from '@douyinfe/semi-foundation/calendar/eventUtil';
import '@douyinfe/semi-foundation/calendar/calendar.scss';
import { RangeCalendarProps } from './interface';
import { Locale } from '../locale/interface';
import {
    ComponentObjectPropsOptions,
    defineComponent,
    h,
    onBeforeUnmount,
    onMounted, PropType,
    reactive,
    ref,
    useSlots,
    watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useBaseComponent} from "../_base/baseComponent";

const toPercent = (num: number) => {
    const res = num < 1 ? num * 100 : 100;
    return `${res}%`;
};

const prefixCls = `${cssClasses.PREFIX}-week`;
const allDayCls = `${cssClasses.PREFIX}-all-day`;

export interface RangeCalendarState {
    scrollHeight: number;
    parsedEvents: ParsedEvents;
    cachedKeys: Array<string>
}


const propTypes:ComponentObjectPropsOptions<RangeCalendarProps> = {
    // displayValue: PropTypes.instanceOf(Date),
    range: PropTypes.array,
    header: PropTypes.node,
    events: PropTypes.array,
    mode: PropTypes.string as PropType<RangeCalendarProps['mode']>,
    showCurrTime: PropTypes.bool,
    markWeekend: PropTypes.bool,
    scrollTop: PropTypes.number,
    renderTimeDisplay: PropTypes.func as PropType<RangeCalendarProps['renderTimeDisplay']>,
    dateGridRender: PropTypes.func as PropType<RangeCalendarProps['dateGridRender']>,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    className: PropTypes.string,


    displayValue: PropTypes.object,
    weekStartsOn: PropTypes.number as PropType<RangeCalendarProps['weekStartsOn']>,
    onClick: PropTypes.func as PropType<RangeCalendarProps['onClick']>,
};

const defaultProps = {
    events: [] as ParsedEvents[],
    mode: 'range',
};
export const vuePropsType = vuePropsMake<RangeCalendarProps>(propTypes, defaultProps)
const RangeCalendar = defineComponent<RangeCalendarProps>((props, {}) => {
    const slots = useSlots()

    let dom = ref()
    let scrollDom = ref()
    let isWeekend: boolean;
    let allDayRowHeight: number = 1;
    let RangeData: RangeData;
    const state = reactive({
        scrollHeight: 0,
        parsedEvents: {
            day: new Map(),
            allDay: new Map()
        },
        cachedKeys: [],
    })

    const { adapter: adapterInject} = useBaseComponent<RangeCalendarProps>(props, state)
    function adapter_(): CalendarAdapter<RangeCalendarProps, RangeCalendarState> {
        return {
            ...adapterInject(),
            setRangeData: data => {
                RangeData = data;
            },
            getRangeData: () => RangeData,
            updateScrollHeight: scrollHeight => {
                state.scrollHeight = scrollHeight
            },
            setParsedEvents: (parsedEvents: ParsedEventsType) => {
                state.parsedEvents = parsedEvents as any
            },
            cacheEventKeys: cachedKeys => {
                state.cachedKeys = cachedKeys
            }
        };
    }
    const adapter = adapter_()
    const foundation = new CalendarFoundation(adapter);

    onMounted(()=>{
        foundation.init();
        const { scrollHeight } = scrollDom.value;
        dom.value.scrollTop = props.scrollTop;
        foundation.notifyScrollHeight(scrollHeight);
        foundation.parseRangeEvents();
    })
    watch([
        ()=>state.cachedKeys,
        ()=>props.events,
    ], (value, [prevStateCachedKeys], onCleanup)=>{
        const prevEventKeys = prevStateCachedKeys;
        const nowEventKeys = props.events.map(event => event.key);
        if (!isEqual(prevEventKeys, nowEventKeys)) {
            foundation.parseRangeEvents();
        }
    })

    onBeforeUnmount(()=>{
        foundation.destroy();
    })


    const handleClick = (e: MouseEvent, val: [Date, number, number, number]) => {
        const { onClick } = props;
        const value = foundation.formatCbValue(val);
        onClick && onClick(e, value);
    };

    const renderDayGrid = () => {
        const { parsedEvents } = state;
        const events = parsedEvents.day;
        const { week } = RangeData;
        const { markWeekend, dateGridRender } = props;
        const inner = week.map(day => {
            const dateString = day.date.toString();
            const dayEvents = events.has(dateString) ? events.get(dateString) : [];
            const parsed = foundation.getParseDailyEvents(dayEvents, day.date);
            return (
              <DayCol
                key={`${dateString}-weekday`}
                displayValue={day.date}
                scrollHeight={state.scrollHeight}
                handleClick={handleClick}
                events={parsed.day}
                showCurrTime={props.showCurrTime}
                isWeekend={markWeekend && day.isWeekend}
                dateGridRender={dateGridRender}
              />
            );
        });
        return inner;
    };

    const renderHeader = (dateFnsLocale: Locale['dateFnsLocale']) => {
        const { markWeekend, range } = props;
        const { month, week } = foundation.getRangeData(range[0], dateFnsLocale);
        return (
          <div class={`${prefixCls}-header`}>
              <ul class={`${cssClasses.PREFIX}-tag ${prefixCls}-tag ${prefixCls}-sticky-left`}>
                  <span>{month}</span>
              </ul>
              <div role="gridcell" class={`${prefixCls}-grid`}>
                  <ul class={`${prefixCls}-grid-row`}>
                      {week.map(day => {
                          const { date, dayString, weekday, isToday } = day;
                          const listCls = cls({
                              [`${cssClasses.PREFIX}-today`]: isToday,
                              [`${cssClasses.PREFIX}-weekend`]: markWeekend && day.isWeekend,
                          });
                          return (
                            <li key={`${date.toString()}-weekheader`} class={listCls}>
                                <span class={`${cssClasses.PREFIX}-today-date`}>{dayString}</span>
                                <span>{weekday}</span>
                            </li>
                          );
                      })}
                  </ul>
              </div>
          </div>
        );
    };

    const renderAllDayEvents = (events: Array<ParsedRangeEvent>) => {
        const list = events.map((event, ind) => {
            const { leftPos, width, topInd, children } = event;
            const top = `${topInd}em`;
            const style = {
                left: toPercent(leftPos),
                width: toPercent(width),
                top,
            };
            return (
              <li
                class={`${cssClasses.PREFIX}-event-item ${cssClasses.PREFIX}-event-allday`}
                key={`allDay-${ind}`}
                style={style}
              >
                  {children}
              </li>
            );
        });
        return list;
    };

    const renderAllDay = (locale: Locale['Calendar']) => {
        const { allDay } = state.parsedEvents;
        const parsed = foundation.parseRangeAllDayEvents(allDay);
        const maxRowHeight = calcRowHeight(parsed);
        const style = {
            height: `${maxRowHeight}em`
        };
        const { markWeekend } = props;
        const { week } = RangeData;
        return (

          <div class={`${allDayCls}`} style={style}>
              <ul class={`${cssClasses.PREFIX}-tag ${allDayCls}-tag ${prefixCls}-sticky-left`}>
                  <span>{locale.allDay}</span>
              </ul>
              <div role="gridcell" class={`${cssClasses.PREFIX}-content ${allDayCls}-content`}>
                  <ul class={`${allDayCls}-skeleton`}>
                      {Object.keys(week).map((date, ind) => {
                          const listCls = cls({
                              [`${cssClasses.PREFIX}-weekend`]: markWeekend && week[date].isWeekend,
                          });
                          return (
                            <li key={`${date}-weekgrid`} class={listCls} />
                          );
                      })}
                  </ul>
                  <ul class={`${cssClasses.PREFIX}-event-items`}>
                      {renderAllDayEvents(parsed)}
                  </ul>
              </div>
          </div>

        );
    };



    return () => {

        const { renderTimeDisplay, className, height, width, style, header } = props;
        const weekCls = cls(prefixCls, className);
        const weekStyle = {
            height: typeof height === 'string'?height:(height + 'px'),
            width: typeof width === 'string'?width:(width + 'px'),
            ...style,
        };
        return (
          <LocaleConsumer componentName="Calendar">
              {(locale: Locale['Calendar'], localeCode: string, dateFnsLocale: Locale['dateFnsLocale']) => (
                <div class={weekCls} style={weekStyle} ref={dom}>
                    <div class={`${prefixCls}-sticky-top`}>
                        {header}
                        {renderHeader(dateFnsLocale)}
                        {renderAllDay(locale)}
                    </div>
                    <div class={`${prefixCls}-scroll-wrapper`}>
                        <div class={`${prefixCls}-scroll`} ref={scrollDom}>
                            <TimeCol
                              className={`${prefixCls}-sticky-left`}
                              renderTimeDisplay={renderTimeDisplay}
                            />
                            {renderDayGrid()}
                        </div>
                    </div>
                </div>
              )}
          </LocaleConsumer>
        );
    }
}, {props: vuePropsType, name:'RangeCalendar'})


export default RangeCalendar
