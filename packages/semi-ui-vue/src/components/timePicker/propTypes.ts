import * as PropTypes from "../PropTypes";
import {TimeShape} from "./TimeShape";
import {noop} from "lodash";
import {numbers as popoverNumbers} from "@douyinfe/semi-foundation/popover/constants";
import {strings} from "@douyinfe/semi-foundation/timePicker/constants";
import {PanelShape} from "./PanelShape";
import type {ComponentObjectPropsOptions, PropType} from "vue";
import type {TimePickerProps} from "./TimePicker";
import { CombineProps } from '../interface';

export const timePickerPropTypes:CombineProps<TimePickerProps> = {
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-errormessage': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-required': PropTypes.bool,
  prefixCls: PropTypes.string,
  borderless: PropTypes.bool,
  clearText: {type: PropTypes.string, default: 'clear'},
  value: TimeShape,
  inputReadOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  showClear: PropTypes.bool,
  defaultValue: TimeShape,
  stopPropagation: PropTypes.bool,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onOpenChange: {type: PropTypes.func as PropType<TimePickerProps['onOpenChange']>, default: noop},
  position: PropTypes.any as PropType<TimePickerProps['position']>,
  getPopupContainer: {type: PropTypes.func as PropType<TimePickerProps['getPopupContainer']>, default: () => document.body},
  placeholder: PropTypes.string,
  format: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  popupClassName: PropTypes.string,
  popupStyle: PropTypes.object,
  disabledHours: PropTypes.func as PropType<TimePickerProps['disabledHours']>,
  disabledMinutes: PropTypes.func as PropType<TimePickerProps['disabledMinutes']>,
  disabledSeconds: PropTypes.func as PropType<TimePickerProps['disabledSeconds']>,
  hideDisabledOptions: PropTypes.bool,
  onChange: PropTypes.func as PropType<TimePickerProps['onChange']>,
  use12Hours: PropTypes.bool,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  focusOnOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  size: PropTypes.string as PropType<TimePickerProps['size']>,
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
  insetLabel: PropTypes.node as PropType<TimePickerProps['insetLabel']>,
  insetLabelId: PropTypes.string,
  validateStatus: PropTypes.string as PropType<TimePickerProps['validateStatus']>,
  type: PropTypes.string as PropType<TimePickerProps['type']>,
  rangeSeparator: {type: PropTypes.string, default: strings.DEFAULT_RANGE_SEPARATOR},
  triggerRender: PropTypes.func as PropType<TimePickerProps['triggerRender']>,
  timeZone: [PropTypes.string, PropTypes.number],
  scrollItemProps: PropTypes.object,
  motion: [PropTypes.bool, PropTypes.func, PropTypes.object],
  autoAdjustOverflow: {type: PropTypes.bool, default: true},
  ...PanelShape,
  inputStyle: PropTypes.object,



  clearIcon: PropTypes.node,
  dropdownMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  preventScroll: PropTypes.bool,
  id: PropTypes.string,
  onChangeWithDateFirst: PropTypes.bool,
}
