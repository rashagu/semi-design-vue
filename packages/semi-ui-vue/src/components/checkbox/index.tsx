import Checkbox from './checkbox';
import type { CheckboxProps, CheckboxEvent } from './checkbox';
import Group  from './checkboxGroup';
import type { CheckboxGroupProps, CheckboxType, CheckboxDirection } from './checkboxGroup';

export type { CheckboxInnerProps } from './checkboxInner';
Checkbox.Group = Group
const CheckboxWithGroup  = Checkbox
export const CheckboxGroup = Group
export {
  CheckboxWithGroup,
  Checkbox,
};

export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxEvent,
  CheckboxType,
  CheckboxDirection
}

export default CheckboxWithGroup;