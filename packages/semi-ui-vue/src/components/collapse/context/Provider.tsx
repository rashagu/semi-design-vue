import { defineComponent, ref, h, Fragment, provide, watch, PropType } from 'vue';
import { CollapseContextType } from '../collapse-context';

export const vuePropsType = {
  value: Object as PropType<CollapseContextType>,
};
const Provider = defineComponent({
  props: vuePropsType,
  name: 'CollapseProvider',
  setup(props, { slots }) {
    const ConfigContext = ref<CollapseContextType>();

    watch(
      () => props.value,
      () => {
        ConfigContext.value = props.value;
      },
      { deep: true, immediate: true }
    );
    provide('CollapseContext', ConfigContext);
    return () => {
      return slots.default ? slots.default(ConfigContext.value) : null;
    };
  },
});

export default Provider;
