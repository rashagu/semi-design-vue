import * as PropTypes from "../PropTypes";

export const propTypesCheckbox = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
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
  onChange: PropTypes.func,
  value: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  extra: PropTypes.node,
  index: PropTypes.number,
  'aria-label': PropTypes.string,
  tabIndex: PropTypes.number,
  preventScroll: PropTypes.bool,
  type: PropTypes.string,

  class: PropTypes.string,
  role: String,
  addonId: String,
  extraId: String,
};