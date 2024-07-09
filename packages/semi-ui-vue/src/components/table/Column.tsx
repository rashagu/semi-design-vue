import * as PropTypes from '../PropTypes';
import ColumnShape from './ColumnShape';
import { ColumnProps } from './interface';
import { ComponentObjectPropsOptions, defineComponent, h, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';

const propTypes: ComponentObjectPropsOptions<Required<ColumnProps>> = {
  ...ColumnShape,
};
export const vuePropsType = vuePropsMake(propTypes, {});
const Column = defineComponent({
  props: vuePropsType,
  name: 'Column',
  setup(props, {}) {
    const slots = useSlots();

    return () => null;
  },
});

export default Column;
