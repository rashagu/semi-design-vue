import {defineComponent, ref, h, Fragment, useSlots, VNode} from 'vue'
import cls from 'classnames';

import DateInputFoundation, {
  DateInputAdapter,
  DateInputFoundationProps,
  RangeType,
  InsetInputChangeProps,
  InsetInputChangeFoundationProps,
} from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/datePicker/constants';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import { IconCalendar, IconCalendarClock, IconClear } from '@kousum/semi-icons-vue';
import { BaseValueType, ValueType } from '@douyinfe/semi-foundation/datePicker/foundation';

import BaseComponent, { BaseProps } from '../_base/baseComponent';
import Input from '../input/index';
import { InsetDateInput, InsetTimeInput } from './insetInput';
import * as PropTypes from "../PropTypes";

export interface DateInputProps extends DateInputFoundationProps, BaseProps {
  insetLabel?: VNode;
  prefix?: VNode;
  onClick?: (e: MouseEvent) => void;
  onChange?: (value: string, e: MouseEvent) => void;
  onEnterPress?: (e: KeyboardEvent) => void;
  onBlur?: (e: MouseEvent) => void;
  onFocus?: (e: MouseEvent, rangeType?: RangeType) => void;
  onClear?: (e: MouseEvent) => void;
  onInsetInputChange?: (options: InsetInputChangeProps) => void;
  value?: Date[];
}


export const vuePropsType = {
  onClick: {
    type: PropTypes.func,
    default: noop
  },
  onChange: {
    type: PropTypes.func,
    default: noop
  },
  onEnterPress: {
    type: PropTypes.func,
    default: noop
  },
  onBlur: {
    type: PropTypes.func,
    default: noop
  },
  onClear: {
    type: PropTypes.func,
    default: noop
  },
  onFocus: {
    type: PropTypes.func,
    default: noop
  },
  value: PropTypes.array,
  disabled: PropTypes.bool,
  type: {type: PropTypes.string, default: 'date'},
  showClear: {
    type: PropTypes.bool,
    default: true
  },
  format: PropTypes.string, // Attributes not used
  inputStyle: {
    type: PropTypes.object,
    default: ()=>({})
  },
  inputReadOnly: {
    type: PropTypes.bool,
    default: false
  }, // Text box can be entered
  insetLabel: PropTypes.node,
  validateStatus: PropTypes.string,
  prefix: PropTypes.node,
  prefixCls: {type: PropTypes.string, default: cssClasses.PREFIX},
  dateFnsLocale: PropTypes.any, // Foundation useful to
  placeholder: PropTypes.any,
  rangeInputFocus: PropTypes.any,
  rangeInputStartRef: PropTypes.object,
  rangeInputEndRef: PropTypes.object,
  rangeSeparator: {type: PropTypes.string, default: strings.DEFAULT_SEPARATOR_RANGE},
  insetInput: PropTypes.bool,
  insetInputValue: PropTypes.object,
  defaultPickerValue: PropTypes.any,
}
const dateInput = defineComponent<DateInputProps>((props, {}) => {
  const slots = useSlots()
  function adapter() {
    
  }
  const foundation: DateInputFoundation = new DateInputFoundation(adapter());

  return () => (
    <div>
      dateInput
    </div>
  )
})

dateInput.props = vuePropsType

export default dateInput

