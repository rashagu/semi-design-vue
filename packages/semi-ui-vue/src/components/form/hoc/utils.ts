import {isVNode} from "vue";

export function isValid(errors: any): boolean {
  let valid = true;
  if (typeof errors === 'string' && errors.length) {
    valid = false;
  } else if (Array.isArray(errors) && errors.length) {
    valid = errors.every(error => isValid(error));
  } else if (typeof errors === 'boolean') {
    valid = errors;
  } else if (isVNode(errors)) {
    // when error message is reactNode
    // only work with React Adapter
    valid = false;
  }
  return valid;
}
