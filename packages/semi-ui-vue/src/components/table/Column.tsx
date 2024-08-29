import * as PropTypes from '../PropTypes';
import ColumnShape from './ColumnShape';
import { ColumnProps, Data } from './interface';
import { ComponentObjectPropsOptions, defineComponent, h, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { CombineProps } from '../interface';

export function getColumn<RecordType extends Record<string, any> = Data>(){
  const propTypes: CombineProps<ColumnProps<RecordType>> = {
    ...ColumnShape,
  };
  const vuePropsType = vuePropsMake(propTypes, {});
  const Column = defineComponent({
    props: { ...vuePropsType },
    name: 'Column',
    setup(props, {}) {
      const slots = useSlots();

      return () => slots.default?.();
    },
  });

  return Column
}

const Column = getColumn()
export default Column;
