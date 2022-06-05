import {defineComponent, ref, h, Fragment, reactive} from 'vue'
import * as PropTypes from '../PropTypes';
import classNames from 'classnames';
import { noop, get } from 'lodash';

import ConfigContext from '../configProvider/context';
import BaseComponent, { ValidateStatus } from '../_base/baseComponent';
import { strings, cssClasses } from '@douyinfe/semi-foundation/timePicker/constants';
import Popover from '../popover';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import TimePickerFoundation, { TimePickerAdapter } from '@douyinfe/semi-foundation/timePicker/foundation';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import Combobox from './Combobox';
import TimeInput from './TimeInput';

import { PanelShape, PanelShapeDefaults } from './PanelShape';
import { TimeShape } from './TimeShape';

import '@douyinfe/semi-foundation/timePicker/timePicker.scss';
import Trigger from '../trigger';

import { InputSize } from '../input';
import type { Position } from '../tooltip';
import { ScrollItemProps } from '../scrollList/scrollItem';
import { Locale } from '../locale/interface';
import { Motion } from '../_base/base';
import {vuePropsMake} from "../PropTypes";

export interface Panel {
  panelHeader?: React.ReactNode;
  panelFooter?: React.ReactNode;
}

export type BaseValueType = string | number | Date;

export type Type = 'time' | 'timeRange';

export type TimePickerProps = {
  'aria-describedby'?: React.AriaAttributes['aria-describedby'];
  'aria-errormessage'?: React.AriaAttributes['aria-errormessage'];
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
  'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
  'aria-required'?: React.AriaAttributes['aria-required'];
  autoAdjustOverflow?: boolean;
  autoFocus?: boolean; // TODO: autoFocus did not take effect
  className?: string;
  clearText?: string;
  dateFnsLocale?: Locale['dateFnsLocale'];
  defaultOpen?: boolean;
  defaultValue?: BaseValueType | BaseValueType[];
  disabled?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  focusOnOpen?: boolean;
  format?: string;
  getPopupContainer?: () => HTMLElement;
  hideDisabledOptions?: boolean;
  hourStep?: number;
  id?: string;
  inputReadOnly?: boolean;
  inputStyle?: React.CSSProperties;
  insetLabel?: React.ReactNode;
  insetLabelId?: string;
  locale?: Locale['TimePicker'];
  localeCode?: string;
  minuteStep?: number;
  motion?: Motion;
  open?: boolean;
  panelFooter?: React.ReactNode;
  panelHeader?: React.ReactNode;
  panels?: Panel[]; // FIXME:
  placeholder?: string;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
  position?: Position;
  prefixCls?: string;
  rangeSeparator?: string;
  scrollItemProps?: ScrollItemProps<any>;
  secondStep?: number;
  showClear?: boolean;
  size?: InputSize;
  style?: React.CSSProperties;
  timeZone?: string | number;
  triggerRender?: (props?: any) => React.ReactNode;
  type?: Type;
  use12Hours?: boolean;
  validateStatus?: ValidateStatus;
  value?: BaseValueType | BaseValueType[];
  zIndex?: number | string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: TimePickerAdapter['notifyChange'];
  onChangeWithDateFirst?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onOpenChange?: (open: boolean) => void;
};

export interface TimePickerState {
  open: boolean;
  value: Date[];
  inputValue: string;
  currentSelectPanel: string | number;
  isAM: [boolean, boolean];
  showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
  invalid: boolean;
}
const propTypes = {
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-errormessage': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-required': PropTypes.bool,
  prefixCls: PropTypes.string,
  clearText: {type: PropTypes.string, default: 'clear'},
  value: TimeShape,
  inputReadOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  showClear: PropTypes.bool,
  defaultValue: TimeShape,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onOpenChange: {type: PropTypes.func, default: noop},
  position: PropTypes.any,
  getPopupContainer: {type: PropTypes.func, default: () => document.body},
  placeholder: PropTypes.string,
  format: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  popupClassName: PropTypes.string,
  popupStyle: PropTypes.object,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  hideDisabledOptions: PropTypes.bool,
  onChange: PropTypes.func,
  use12Hours: PropTypes.bool,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  focusOnOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  panels: PropTypes.array,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  dateFnsLocale: PropTypes.object,
  zIndex: {
    type: [PropTypes.number, PropTypes.string],
    default: popoverNumbers.DEFAULT_Z_INDEX
  },
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  validateStatus: PropTypes.string,
  type: PropTypes.string,
  rangeSeparator: {type: PropTypes.string, default: strings.DEFAULT_RANGE_SEPARATOR},
  triggerRender: PropTypes.func,
  timeZone: [PropTypes.string, PropTypes.number],
  scrollItemProps: PropTypes.object,
  motion: [PropTypes.bool, PropTypes.func, PropTypes.object],
  autoAdjustOverflow: {type: PropTypes.bool, default: true},
  ...PanelShape,
  inputStyle: PropTypes.object,
}
const defaultProps = {
  autoAdjustOverflow: true,
  getPopupContainer: () => document.body,
  showClear: true,
  zIndex: popoverNumbers.DEFAULT_Z_INDEX,
  rangeSeparator: strings.DEFAULT_RANGE_SEPARATOR,
  onOpenChange: noop,
  clearText: 'clear',
  prefixCls: cssClasses.PREFIX,
  inputReadOnly: false,
  style: {},
  className: '',
  popupClassName: '',
  popupStyle: { left: '0px', top: '0px' },
  disabledHours: () => [] as number[],
  disabledMinutes: () => [] as number[],
  disabledSeconds: () => [] as number[],
  hideDisabledOptions: false,
  // position: 'bottomLeft',
  onFocus: noop,
  onBlur: noop,
  onChange: noop,
  onChangeWithDateFirst: true,
  use12Hours: false,
  focusOnOpen: false,
  onKeyDown: noop,
  size: 'default' as const,
  type: strings.DEFAULT_TYPE,
  ...PanelShapeDefaults,
  // format: strings.DEFAULT_FORMAT,
  // open and value controlled
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const TimePicker = defineComponent<TimePickerProps>((props, {slots}) => {

  const { format = strings.DEFAULT_FORMAT } = props;
  const state = reactive({
    open: props.open || props.defaultOpen || false,
    value: [], // Date[]
    inputValue: '', // time string
    currentSelectPanel: 0,
    isAM: [true, false],
    showHour: Boolean(format.match(/HH|hh|H|h/g)),
    showMinute: Boolean(format.match(/mm/g)),
    showSecond: Boolean(format.match(/ss/g)),
    invalid: undefined
  })
  const foundation: TimePickerFoundation = new TimePickerFoundation(this.adapter);
  const timePickerRef = ref()
  const savePanelRef = ref()

  return () => (
    <div>
      TimePicker
    </div>
  )
})

TimePicker.props = vuePropsType

export default TimePicker

