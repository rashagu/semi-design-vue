import * as PropTypes from "../PropTypes";
import {ComponentObjectPropsOptions} from "vue";
import {CheckboxProps} from "./checkbox";
import {PropType} from "vue";
import { CombineProps } from '../interface';


export const propTypesCheckbox: CombineProps<CheckboxProps> = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': [PropTypes.bool, PropTypes.string] as PropType<CheckboxProps['aria-invalid']>,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  // Specifies whether it is currently selected
  checked: PropTypes.bool,
  // Initial check
  defaultChecked: PropTypes.bool,
  // Failure state
  disabled: PropTypes.bool,
  // Set indeterminate state, only responsible for style control
  indeterminate: PropTypes.bool,
  // Callback function when changing
  onChange: PropTypes.func as PropType<CheckboxProps['onChange']>,
  value: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  extra: PropTypes.node as PropType<CheckboxProps['extra']>,
  index: PropTypes.number as PropType<CheckboxProps['index']>,
  'aria-label': PropTypes.string,
  tabIndex: PropTypes.number,
  preventScroll: PropTypes.bool,
  type: PropTypes.string as PropType<CheckboxProps['type']>,

  class: PropTypes.string as PropType<CheckboxProps['class']>,
  role: String,
  addonId: String,
  extraId: String,
  id: String,
  autoFocus: Boolean,
};
