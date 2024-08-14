import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import ColorPicker from '../index';

interface ColorPickerDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<ColorPickerDemoProps> = {
  name: String,
};
const ColorPickerDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'ColorPickerDemo',
  setup(props, { attrs }) {
    const slots = useSlots();

    return () => (
      <div>
        <ColorPicker
          data-testid={'ColorPicker_testid1'}
          alpha={true}
          popoverProps={{
            trigger: 'click',
          }}
          onChange={(value) => {
            console.log(value);
          }}
          usePopover={true}
        />
      </div>
    );
  },
});

export default ColorPickerDemo;
