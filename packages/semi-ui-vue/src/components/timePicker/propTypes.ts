import * as PropTypes from "../PropTypes";
import {TimeShape} from "./TimeShape";
import {noop} from "lodash";
import {numbers as popoverNumbers} from "@douyinfe/semi-foundation/popover/constants";
import {strings} from "@douyinfe/semi-foundation/timePicker/constants";
import {PanelShape} from "./PanelShape";

export const timePickerPropTypes = {
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



  clearIcon: PropTypes.node,
  dropdownMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  preventScroll: PropTypes.bool,
}
