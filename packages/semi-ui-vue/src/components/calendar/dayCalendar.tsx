import { isEqual } from 'lodash';
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import CalendarFoundation, { CalendarAdapter, ParsedEventsType, ParsedEventsWithArray } from '@douyinfe/semi-foundation/calendar/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/calendar/constants';
import DayCol from './dayCol';
import TimeCol from './timeCol';
import LocaleConsumer_ from '../locale/localeConsumer';
import localeContext from '../locale/context';
import { Locale } from '../locale/interface';
import { DayCalendarProps } from './interface';
import '@douyinfe/semi-foundation/calendar/calendar.scss';
import {defineComponent, h, onBeforeUnmount, onMounted, reactive, ref, useSlots, watch} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useBaseComponent} from "../_base/baseComponent";

const LocaleConsumer = LocaleConsumer_()
const prefixCls = `${cssClasses.PREFIX}-day`;

export interface DayCalendarState {
    scrollHeight: number;
    parsedEvents: ParsedEventsWithArray;
    cachedKeys: Array<string>
}

const propTypes = {
    displayValue: PropTypes.object,
    events: PropTypes.array,
    header: PropTypes.node,
    showCurrTime: PropTypes.bool,
    onClick: PropTypes.func,
    mode: PropTypes.string,
    renderTimeDisplay: PropTypes.func,
    markWeekend: PropTypes.bool,
    scrollTop: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    className: PropTypes.string,
    dateGridRender: PropTypes.func,


    range: PropTypes.array,
    weekStartsOn: PropTypes.number,
};

const defaultProps = {
    events: [] as DayCalendarProps['events'],
    displayValue: new Date(),
    mode: 'day',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const DayCalendar = defineComponent<DayCalendarProps>((props, {}) => {
    const slots = useSlots()
    let dom = ref()
    let scrollDom = ref()
    let isWeekend: boolean = false;


    const state = reactive<DayCalendarState>({
        scrollHeight: 0,
        parsedEvents: {
            day: [],
            allDay: []
        },
        cachedKeys: [],
    });

    const {adapter: adapterInject} = useBaseComponent<DayCalendarProps>(props, state)
    function adapter_(): CalendarAdapter<DayCalendarProps, DayCalendarState> {
        return {
            ...adapterInject(),
            updateScrollHeight: scrollHeight => {
                state.scrollHeight = scrollHeight
            },
            setParsedEvents: (parsedEvents: ParsedEventsType) => {
                state.parsedEvents = parsedEvents as ParsedEventsWithArray
            },
            cacheEventKeys: cachedKeys => {
                state.cachedKeys = cachedKeys
            },
        };
    }
    const adapter = adapter_()
    const foundation = new CalendarFoundation(adapter);
    onMounted(()=>{
        foundation.init();
        const { scrollHeight } = scrollDom.value;
        dom.value.scrollTop = props.scrollTop;
        foundation.notifyScrollHeight(scrollHeight);
        foundation.parseDailyEvents();
    })

    watch([
        ()=>state.cachedKeys,
        ()=>props.events
    ], (value, [prevStateCachedKeys], onCleanup)=>{
        const prevEventKeys = prevStateCachedKeys;
        const nowEventKeys = props.events.map(event => event.key);
        if (!isEqual(prevEventKeys, nowEventKeys)) {
            foundation.parseDailyEvents();
        }
    })

    onBeforeUnmount(()=>{
        foundation.destroy();
    })


    const checkWeekend = (val: Date) => foundation.checkWeekend(val);

    const renderAllDayEvents = (events: ParsedEventsWithArray['allDay']) => {
        const list = events.map((event, ind) => {
            const { children, key } = event;
            return (
              // eslint-disable-next-line max-len
              <li class={`${cssClasses.PREFIX}-event-item ${cssClasses.PREFIX}-event-allday`} key={key || `allDay-${ind}`}>
                  {children}
              </li>
            );
        });
        return list;
    };

    const handleClick = (e: MouseEvent, val: [Date, number, number, number]) => {
        const { onClick } = props;
        const value = foundation.formatCbValue(val);
        onClick && onClick(e, value);
    };

    const renderAllDay = (events: ParsedEventsWithArray['allDay']) => {
        const allDayCls = `${cssClasses.PREFIX}-all-day`;
        const contentCls = cls(`${allDayCls}-content`, {
            [`${cssClasses.PREFIX}-weekend`]: isWeekend,
        });
        return (
          <LocaleConsumer componentName="Calendar">
              {(locale: Locale['Calendar']) => (
                <div class={`${allDayCls}`}>
                    <ul class={`${cssClasses.PREFIX}-tag ${allDayCls}-tag ${prefixCls}-sticky-left`}>
                        <span>{locale.allDay}</span>
                    </ul>
                    <div role="gridcell" class={contentCls}>
                        <ul class={`${cssClasses.PREFIX}-event-items`}>
                            {renderAllDayEvents(events)}
                        </ul>
                    </div>
                </div>
              )}
          </LocaleConsumer>
        );
    };


    return () => {

        // eslint-disable-next-line max-len
        const { dateGridRender, displayValue, showCurrTime, renderTimeDisplay, markWeekend, className, height, width, style, header } = props;
        const dayCls = cls(prefixCls, className);
        const dayStyle = {
            height: typeof height === 'string'?height:(height + 'px'),
            width: typeof width === 'string'?width:(width + 'px'),
            ...style,
        };
        const { parsedEvents, scrollHeight } = state;
        isWeekend = markWeekend && checkWeekend(displayValue);
        return (
          <div class={dayCls} style={dayStyle} ref={dom}>
              <div class={`${prefixCls}-sticky-top`}>
                  {header}
                  {renderAllDay(parsedEvents.allDay)}
              </div>
              <div class={`${prefixCls}-scroll-wrapper`}>
                  <div class={`${prefixCls}-scroll`} ref={scrollDom}>
                      <TimeCol
                        className={`${prefixCls}-sticky-left`}
                        renderTimeDisplay={renderTimeDisplay}
                      />
                      <DayCol
                        events={parsedEvents.day}
                        displayValue={displayValue}
                        scrollHeight={scrollHeight}
                        handleClick={handleClick}
                        showCurrTime={showCurrTime}
                        isWeekend={isWeekend}
                        dateGridRender={dateGridRender}
                      />
                  </div>
              </div>
          </div>
        );
    }
})

DayCalendar.props = vuePropsType
DayCalendar.name = 'DayCalendar'

export default DayCalendar
