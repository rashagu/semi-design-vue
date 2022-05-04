import {defineComponent, ref, h, Fragment, useSlots, VNode} from 'vue'

import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop, stubFalse, isDate, get, isFunction, isEqual } from 'lodash';
import ConfigContext, { ContextValue } from '../configProvider/context';
import DatePickerFoundation, { DatePickerAdapter, DatePickerFoundationProps, DatePickerFoundationState, DayStatusType, PresetType, Type, RangeType } from '@douyinfe/semi-foundation/datePicker/foundation';
import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/datePicker/constants';
import { strings as popoverStrings, numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import BaseComponent from '../_base/baseComponent';
import Popover from '../popover/index';
import DateInput, { DateInputProps } from './dateInput';
import MonthsGrid, { MonthsGridProps } from './monthsGrid';
import QuickControl from './quickControl';
import Footer from './footer';
import Trigger from '../trigger';
import YearAndMonth, { YearAndMonthProps } from './yearAndMonth';
import '@douyinfe/semi-foundation/datePicker/datePicker.scss';
import { Locale } from '../locale/interface';
import { TimePickerProps } from '../timePicker/TimePicker';
import { InsetInputValue, InsetInputChangeProps } from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import {AriaAttributes} from "../AriaAttributes";

export interface DatePickerProps extends DatePickerFoundationProps {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  timePickerOpts?: TimePickerProps;
  bottomSlot?: VNode | string;
  insetLabel?: VNode | string;
  insetLabelId?: string;
  prefix?: VNode | string;
  topSlot?: VNode | string;
  renderDate?: (dayNumber?: number, fullDate?: string) => VNode | string;
  renderFullDate?: (dayNumber?: number, fullDate?: string, dayStatus?: DayStatusType) => VNode | string;
  triggerRender?: (props: DatePickerProps) => VNode | string;
  onBlur?: any;
  onClear?: any;
  onFocus?: (e: MouseEvent, rangeType: RangeType) => void;
  onPresetClick?: (item: PresetType, e: MouseEvent) => void;
  locale?: Locale['DatePicker'];
  dateFnsLocale?: Locale['dateFnsLocale'];
}

export type DatePickerState = DatePickerFoundationState;


export const vuePropsType = {
  name: String
}
const datePicker = defineComponent<DatePickerProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      datePicker
    </div>
  )
})

datePicker.props = vuePropsType

export default datePicker

