import Checkbox from './Checkbox';
import type { CheckboxProps, CheckboxEvent } from './Checkbox';
import Group  from './CheckboxGroup';
import type { CheckboxGroupProps, CheckboxType, CheckboxDirection } from './CheckboxGroup';

export type { CheckboxInnerProps } from './CheckboxInner';
Checkbox.Group = Group
const CheckboxWithGroup  = Checkbox

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