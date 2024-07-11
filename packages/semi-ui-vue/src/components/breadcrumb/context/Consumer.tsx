import { defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots } from 'vue';
import { BreadContextType } from '../bread-context';

export function useBreadContext(): { context: Ref<UnwrapRef<BreadContextType>> } {
  const context = inject('BreadContext', ref<BreadContextType>({}));
  return {
    context,
  };
}
export const vuePropsType = {
  name: String,
};
const Consumer = defineComponent({
  props: { ...vuePropsType },
  name: 'BreadContextConsumer',
  setup() {
    const slots = useSlots();
    const { context } = useBreadContext();
    return () => (slots.default ? slots.default(context) : null);
  },
});

export default Consumer;
