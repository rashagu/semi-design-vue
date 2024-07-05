import { defineComponent, PropType, provide, ref, watch } from 'vue';
import { TypographyBaseSize } from '../interface';

export const vuePropsType = {
  value: String as PropType<TypographyBaseSize>,
};
const Provider = defineComponent(
  (props, { slots }) => {
    const ConfigContext = ref<TypographyBaseSize>(props.value);

    watch(
      () => props.value,
      () => {
        ConfigContext.value = props.value;
      },
      { deep: true }
    );
    provide('TypographyBaseSize', ConfigContext);
    return () => (slots.default ? slots.default(ConfigContext.value) : null);
  },
  {
    props: vuePropsType,
    name: 'TypographyBaseSizeProvider',
  }
);

export default Provider;
