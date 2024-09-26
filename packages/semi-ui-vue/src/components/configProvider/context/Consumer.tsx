import { defineComponent, h, inject, Ref, ref, UnwrapRef, useSlots } from 'vue';
import { ContextValue } from '../context';

export function useConfigContext(): { context: Ref<UnwrapRef<ContextValue>> } {
  const context = inject('semi_ConfigContext', ref<ContextValue>({}));
  return {
    context,
  };
}
const Consumer = defineComponent({
  name: 'ConfigContextConsumer',
  setup() {
    const slots = useSlots();
    const { context } = useConfigContext();
    return () => (slots.default ? slots.default(context) : null);
  },
});

export default Consumer;
