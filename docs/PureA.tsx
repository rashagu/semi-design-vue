import { defineComponent, ref, h, Fragment, useSlots, CSSProperties } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';

interface PureAProps {
  style?: CSSProperties;
}

export const vuePropsType: ComponentObjectPropsOptions<PureAProps> = {
  style: [Object],
};
const PureA = defineComponent<PureAProps>((props, {}) => {
  const slots = useSlots();


  return () => (
    <a style={{
      fontWeight: 600,
      color: 'var(--semi-color-link-visited)',
      lineHeight: '20px',
      fontSize: 14,
      ...props.style
    }}>
      {slots.default?.()}
    </a>
  );
}, {
  props: vuePropsType,
  name: 'PureA',
});


export default PureA;

