import { defineComponent, ref, h, Fragment, provide, watch } from 'vue';
import { DropdownContextType } from '../context';

export const vuePropsType = {
  value: Object,
};
const Provider = defineComponent({
  props: { ...vuePropsType },
  name: 'DropdownProvider',
  setup(props, { slots }) {
    const ConfigContext = ref<DropdownContextType>(props.value);

    watch(
      () => props.value,
      () => {
        ConfigContext.value = props.value;
      }
    );
    provide('DropdownContext', ConfigContext);
    return () => (slots.default ? slots.default(ConfigContext.value) : null);
  },
});

export default Provider;
