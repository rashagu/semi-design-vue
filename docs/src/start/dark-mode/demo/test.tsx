import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';

interface testProps {
  name?: string;
}

export const vuePropsType: ComponentObjectPropsOptions<testProps> = {
  name: String,
};
const test = defineComponent<testProps>((props, {}) => {
  const slots = useSlots();


  return () => (
    <div>
      test
    </div>
  );
}, {
  props: vuePropsType,
  name: 'test',
});


export default test;

