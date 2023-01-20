import { strings } from '@douyinfe/semi-foundation/calendar/constants';
import type { ArrayElement } from '../_base/base';
import type { BaseProps } from '../_base/baseComponent';
import type { EventObject, weeekStartsOnEnum } from '@douyinfe/semi-foundation/calendar/foundation';
import {VueJsxNode} from "../interface";

export interface CalendarProps extends BaseProps {
    displayValue?: Date;
    range?: Date[];
    header?: VueJsxNode;
    events?: EventObject[];
    mode?: ArrayElement<typeof strings.MODE>;
    showCurrTime?: boolean;
    weekStartsOn?: weeekStartsOnEnum;
    scrollTop?: number;
    onClick?: (e: MouseEvent, value: Date) => void;
    onClose?: (e: MouseEvent) => void;
    renderTimeDisplay?: (time: number) => VueJsxNode;
    markWeekend?: boolean;
    width?: number | string;
    height?: number | string;
    dateGridRender?: (dateString?: string, date?: Date) => VueJsxNode
}

export type DayCalendarProps = Omit<CalendarProps, 'mode'>;

type DayCalendarPropsKeys = 'events' | 'displayValue' | 'showCurrTime' | 'mode' | 'dateGridRender';
export interface DayColProps extends Pick<CalendarProps, DayCalendarPropsKeys>, BaseProps {
    scrollHeight: number;
    currPos?: number;
    isWeekend: boolean;
    handleClick: (e: MouseEvent, val: [Date, number, number, number]) => void
}

export type MonthCalendarProps = Omit<CalendarProps, 'range' | 'showCurrTime' | 'scrollTop' | 'renderTimeDisplay'>;

export type RangeCalendarProps = CalendarProps;

export interface TimeColProps {
    className?: string;
    renderTimeDisplay?: CalendarProps['renderTimeDisplay']
}

export type WeekCalendarProps = CalendarProps;
