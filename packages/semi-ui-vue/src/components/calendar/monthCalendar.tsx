import cls from 'classnames';
import { isEqual } from 'lodash';
import * as PropTypes from '../PropTypes';
import { IconClose } from '@kousum/semi-icons-vue';
// eslint-disable-next-line max-len
import CalendarFoundation, { CalendarAdapter, EventObject, MonthData, MonthlyEvent, ParsedEventsType, ParsedEventsWithArray, ParsedRangeEvent } from '@douyinfe/semi-foundation/calendar/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/calendar/constants';
import { DateObj } from '@douyinfe/semi-foundation/calendar/eventUtil';
import LocaleConsumer_ from '../locale/localeConsumer';
import {useBaseComponent} from '../_base/baseComponent';
import Popover from '../popover';
import Button from '../iconButton';
import { Locale } from '../locale/interface';
import { MonthCalendarProps } from './interface';

import '@douyinfe/semi-foundation/calendar/calendar.scss';
import {defineComponent, h, onBeforeUnmount, onMounted, reactive, ref, useSlots, watch} from "vue";
import {vuePropsMake} from "../PropTypes";

const LocaleConsumer = LocaleConsumer_()
const toPercent = (num: number) => {
    const res = num < 1 ? num * 100 : 100;
    return `${res}%`;
};

const prefixCls = `${cssClasses.PREFIX}-month`;
const contentPadding = 60;
const contentHeight = 24;

export interface MonthCalendarState {
    itemLimit: number;
    showCard: Record<string, [boolean] | [boolean, string]>;
    parsedEvents: MonthlyEvent;
    cachedKeys: Array<string>
}

const propTypes = {
    displayValue: PropTypes.object,
    header: PropTypes.node,
    events: PropTypes.array,
    mode: PropTypes.string,
    markWeekend: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    className: PropTypes.string,
    dateGridRender: PropTypes.func,
    onClick: PropTypes.func,
    onClose: PropTypes.func,



    weekStartsOn: PropTypes.number,
    range: PropTypes.array,
    showCurrTime: PropTypes.bool,
    scrollTop: PropTypes.number,
    renderTimeDisplay: PropTypes.func,
};

const defaultProps = {
    displayValue: new Date(),
    events: [] as EventObject[],
    mode: 'month',
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const MonthCalendar = defineComponent<MonthCalendarProps>((props, {}) => {
    const slots = useSlots()

    const cellDom = ref()
    const cardRef: Map<string, any> = new Map();
    let contentCellHeight: number;
    let monthlyData: MonthData;

    let clickOutsideHandler: (e: MouseEvent) => void;

    const state = reactive<MonthCalendarState>({
        itemLimit: 0,
        showCard: {},
        parsedEvents: {} as MonthlyEvent,
        cachedKeys: []
    });
    const {adapter: adapterInject} = useBaseComponent<MonthCalendarProps>(props, state)
    function adapter_(): CalendarAdapter<MonthCalendarProps, MonthCalendarState> {
        return {
            ...adapterInject(),
            registerClickOutsideHandler: (key: string, cb: () => void) => {
                clickOutsideHandler = (e: MouseEvent) => {
                    const cardInstance = cardRef && cardRef.get(key);
                    // eslint-disable-next-line react/no-find-dom-node
                    const cardDom = cardInstance;
                    if (cardDom && !cardDom.contains(e.target as any)) {
                        cb();
                    }
                };
                document.addEventListener('mousedown', clickOutsideHandler, false);
            },
            unregisterClickOutsideHandler: () => {
                document.removeEventListener('mousedown', clickOutsideHandler, false);
            },
            setMonthlyData: data => {
                monthlyData = data;
            },
            getMonthlyData: () => monthlyData,
            notifyClose: (e, key) => {
                const updates = {};
                updates[key] = [false];
                state.showCard = { ...state.showCard, ...updates }
                props.onClose && props.onClose(e);
            },
            openCard: (key, spacing) => {
                const updates = {};
                const pos = spacing ? 'leftTopOver' : 'rightTopOver';
                updates[key] = [true, pos];
                state.showCard = { ...updates }
            },
            setParsedEvents: (parsedEvents: ParsedEventsType) => {
                state.parsedEvents = parsedEvents as MonthlyEvent
            },
            setItemLimit: itemLimit => {
                state.itemLimit = itemLimit
            },
            cacheEventKeys: cachedKeys => {
                state.cachedKeys = cachedKeys
            }
        };
    }


    const adapter = adapter_()
    const foundation = new CalendarFoundation(adapter);




    const calcItemLimit = () => {
        contentCellHeight = cellDom.value.getBoundingClientRect().height;
        return Math.max(0, Math.ceil((contentCellHeight - contentPadding) / contentHeight));
    };

    onMounted(()=>{

        foundation.init();
        const itemLimit = calcItemLimit();
        foundation.parseMonthlyEvents(itemLimit);
    })

    onBeforeUnmount(()=>{
        foundation.destroy();
    })

    watch([
        ()=>state.cachedKeys,
        ()=>state.itemLimit,
        ()=>props.events,
        ()=>props.height,
    ], (value, [
      prevStateCachedKeys,
        prevStateItemLimit,
        prevPropsEvents,
        prevPropsHeight
    ], onCleanup)=>{

        const prevEventKeys = prevStateCachedKeys;
        const nowEventKeys = props.events.map(event => event.key);

        let itemLimitUpdate = false;
        let { itemLimit } = state;
        if (prevPropsHeight !== props.height) {
            itemLimit = calcItemLimit();
            if (prevStateItemLimit !== itemLimit) {
                itemLimitUpdate = true;
            }
        }
        if (!isEqual(prevEventKeys, nowEventKeys) || itemLimitUpdate) {
            foundation.parseMonthlyEvents((itemLimit || props.events) as any);
        }
    })

    const handleClick = (e: MouseEvent, val: [Date]) => {
        const { onClick } = props;
        const value = foundation.formatCbValue(val);
        onClick && onClick(e, value);
    };

    function closeCard(e: MouseEvent, key: string) {
        foundation.closeCard(e, key);
    }

    const showCardFunc = (e: MouseEvent, key: string) => {
        foundation.showCard(e, key);
    };

    const renderHeader = (dateFnsLocale: Locale['dateFnsLocale']) => {
        const { markWeekend, displayValue } = props;
        monthlyData = foundation.getMonthlyData(displayValue, dateFnsLocale);
        return (
          <div class={`${prefixCls}-header`} role="presentation">
              <div role="presentation" class={`${prefixCls}-grid`}>
                  <ul role="row" class={`${prefixCls}-grid-row`}>
                      {monthlyData[0].map(day => {
                          const { weekday } = day;
                          const listCls = cls({
                              [`${cssClasses.PREFIX}-weekend`]: markWeekend && day.isWeekend,
                          });
                          return (
                            <li role="columnheader" aria-label={weekday} key={`${weekday}-monthheader`} class={listCls}>
                                <span>{weekday}</span>
                            </li>
                          );
                      })}
                  </ul>
              </div>
          </div>
        );
    };

    const renderEvents = (events: ParsedRangeEvent[]) => {
        if (!events) {
            return undefined;
        }
        const list = events.map((event, ind) => {
            const { leftPos, width, topInd, key, children } = event;
            const style = {
                left: toPercent(leftPos),
                width: toPercent(width),
                top: `${topInd}em`
            };
            return (
              <li
                class={`${cssClasses.PREFIX}-event-item ${cssClasses.PREFIX}-event-month`}
                key={key || `${ind}-monthevent`}
                style={style}
              >
                  {children}
              </li>
            );
        });
        return list;
    };

    const renderCollapsed = (events: MonthlyEvent['day'][number], itemInfo: DateObj, listCls: string, month: string) => {
        const { itemLimit, showCard } = state;
        const { weekday, dayString, date } = itemInfo;
        const key = date.toString();
        const remained = events.filter(i => Boolean(i)).length - itemLimit;
        const cardCls = `${prefixCls}-event-card`;
        // const top = contentPadding / 2 + state.itemLimit * contentHeight;
        const shouldRenderCard = remained > 0;
        const closer = (
          <Button
            className={`${cardCls}-close`}
            onClick={e => closeCard(e, key)}
            type="tertiary"
            icon={<IconClose />}
            theme="borderless"
            size="small"
          />
        );
        const header = (
          <div class={`${cardCls}-header-info`}>
              <div class={`${cardCls}-header-info-weekday`}>{weekday}</div>
              <div class={`${cardCls}-header-info-date`}>{dayString}</div>
          </div>
        );
        const content = (
          <div class={cardCls}>
              <div class={`${cardCls}-content`}>
                  <div class={`${cardCls}-header`}>
                      {header}
                      {closer}
                  </div>
                  <div class={`${cardCls}-body`}>
                      <ul class={`${cardCls}-list`}>
                          {events.map(item => (
                            <li key={item.key || `${item.start.toString()}-event`}>{item.children}</li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
        );
        const pos = showCard && showCard[key] ? showCard[key][1] : 'leftTopOver';
        const text = (
          <LocaleConsumer componentName="Calendar">
              {(locale: Locale['Calendar']) => (// eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  class={`${cardCls}-wrapper`}
                  style={{ bottom: 0 }}
                  onClick={e => showCardFunc(e, key)}
                >
                    {locale.remaining.replace('${remained}', String(remained))}
                </div>
              )}
          </LocaleConsumer>
        );
        return (
          <Popover
            key={`${date.valueOf()}`}
            content={content}
            position={pos as any}
            trigger="custom"
            visible={showCard && showCard[key] && showCard[key][0]}
            ref={ref => cardRef.set(key, ref)}
          >
              <li key={date as any} class={listCls} onClick={e => handleClick(e, [date])}>
                  {formatDayString(month, dayString)}
                  {shouldRenderCard ? text : null}
                  {renderCusDateGrid(date)}
              </li>
          </Popover>
        );
    };

    const formatDayString = (month: string, date: string) => {
        if (date === '1') {
            return (
              <LocaleConsumer componentName="Calendar">
                  {(locale: Locale['Calendar'], localeCode: string) => (
                    <span class={`${prefixCls}-date`}>
                            {month}
                        <span class={`${cssClasses.PREFIX}-today-date`}>&nbsp;{date}</span>
                        {locale.datestring}
                        </span>
                  )}
              </LocaleConsumer>
            );
        }
        return (
          // eslint-disable-next-line max-len
          <span class={`${prefixCls}-date`}><span class={`${cssClasses.PREFIX}-today-date`}>{date}</span></span>
        );
    };

    const renderCusDateGrid = (date: Date) => {
        const { dateGridRender } = props;
        if (!dateGridRender) {
            return null;
        }
        return dateGridRender(date.toString(), date);
    };

    const renderWeekRow = (index: number | string, weekDay: MonthData[number], events: MonthlyEvent = {} as MonthlyEvent) => {
        const { markWeekend } = props;
        const { itemLimit } = state;
        const { display, day } = events;
        return (
          <div role="presentation" class={`${prefixCls}-weekrow`} ref={cellDom} key={`${index}-weekrow`}>
              <ul role="row" class={`${prefixCls}-skeleton`}>
                  {weekDay.map(each => {
                      const { date, dayString, isToday, isSameMonth, isWeekend, month, ind } = each;
                      const listCls = cls({
                          [`${cssClasses.PREFIX}-today`]: isToday,
                          [`${cssClasses.PREFIX}-weekend`]: markWeekend && isWeekend,
                          [`${prefixCls}-same`]: isSameMonth
                      });
                      const shouldRenderCollapsed = Boolean(day && day[ind] && day[ind].length > itemLimit);
                      const inner = (
                        <li role="gridcell" aria-label={date.toLocaleDateString()} aria-current={isToday ? "date" : false} key={`${date}-weeksk`} class={listCls} onClick={e => handleClick(e, [date])}>
                            {formatDayString(month, dayString)}
                            {renderCusDateGrid(date)}
                        </li>
                      );
                      if (!shouldRenderCollapsed) {
                          return inner;
                      }
                      return renderCollapsed(day[ind], each, listCls, month);
                  })}
              </ul>
              <ul class={`${cssClasses.PREFIX}-event-items`}>
                  {display ? renderEvents(display) : null}
              </ul>
          </div>
        );
    };

    const renderMonthGrid = () => {
        const { parsedEvents } = state;
        return (
          <div role="presentation" class={`${prefixCls}-week`}>
              <ul role="presentation" class={`${prefixCls}-grid-col`}>
                  {Object.keys(monthlyData).map(weekInd =>
                    renderWeekRow(weekInd, monthlyData[weekInd], parsedEvents[weekInd])
                  )}
              </ul>
          </div>
        );
    };

    return () => {

        const { className, height, width, style, header } = props;
        const monthCls = cls(prefixCls, className);
        const monthStyle = {
            height: typeof height === 'string'?height:(height + 'px'),
            width: typeof width === 'string'?width:(width + 'px'),
            ...style,
        };
        return (
          <LocaleConsumer componentName="Calendar">
              {(locale: Locale['Calendar'], localeCode: string, dateFnsLocale: Locale['dateFnsLocale']) => (
                <div role="grid" class={monthCls} key={state.itemLimit} style={monthStyle}>
                    <div role="presentation" class={`${prefixCls}-sticky-top`}>
                        {header}
                        {renderHeader(dateFnsLocale)}
                    </div>
                    <div role="presentation" class={`${prefixCls}-grid-wrapper`}>
                        {renderMonthGrid()}
                    </div>
                </div>
              )}
          </LocaleConsumer>
        );
    }
})

MonthCalendar.props = vuePropsType
MonthCalendar.name = 'monthCalendar'

export default MonthCalendar

