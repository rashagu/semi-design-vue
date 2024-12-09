import { isRef } from 'vue';

export function setRefJsx(ref:any, node:any) {
  if (ref) {
    if (typeof ref.r === 'function') {
      ref.r(node);
    } else if (ref.r && typeof ref.r === 'object' && isRef(ref.r)) {
      ref.r.value = node;
    }
  }
}
