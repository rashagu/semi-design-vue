import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import HotKeys, { vuePropsType } from '../index';

interface HotKeysDemoProps {
  name?: string;
}

const HotKeysDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'HotKeysDemo',
  setup(props, { attrs }) {
    const slots = useSlots();


    return () => (
      <HotKeys {...props} id={"test"}></HotKeys>
    );
  },
});


export default HotKeysDemo;

