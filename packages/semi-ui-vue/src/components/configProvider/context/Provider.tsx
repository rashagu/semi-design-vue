import { defineComponent, ref, h, Fragment, provide, watch } from 'vue';
import { ContextValue } from '../context';

export const vuePropsType = {
  value: Object,
};
const Provider = defineComponent({
  props: { ...vuePropsType },
  name: 'ConfigProviderProvider',
  setup(props, { slots }) {
    const ConfigContext = ref<ContextValue>(props.value);

    watch(
      () => props.value,
      () => {
        ConfigContext.value = props.value;
      },
      { deep: true }
    );
    provide('ConfigContext', ConfigContext);
    return () => (slots.default ? slots.default(ConfigContext.value) : null);
  },
});

export default Provider;
