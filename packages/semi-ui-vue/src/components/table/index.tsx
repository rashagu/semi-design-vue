import * as PropTypes from '../PropTypes';
import NormalTable_, { TablePropTypes } from './Table';
import ResizableTable from './ResizableTable';
import Column from './Column';
import { strings } from '@douyinfe/semi-foundation/table/constants';
import type { TableProps, Data } from './interface';

import { ComponentObjectPropsOptions, defineComponent, h, ref, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useConfigContext } from '../configProvider/context/Consumer';

const propTypes = {
  ...TablePropTypes,
  resizable: [PropTypes.bool, PropTypes.object],
};

const defaultProps = {
  hideExpandedColumn: true,
};

function Table<RecordType extends Record<string, any> = Data>() {
  const NormalTable = NormalTable_<RecordType>();
  const vuePropsType = vuePropsMake<TableProps<RecordType>>(propTypes, defaultProps);
  const Table = defineComponent({
    props: vuePropsType as ComponentObjectPropsOptions<TableProps<RecordType>>,
    name: 'TableIndex',
    setup(props, { expose }) {
      const slots = useSlots();
      const tableRef = ref();
      const { context } = useConfigContext();

      const getCurrentPageData = () => tableRef.value && tableRef.value.getCurrentPageData();

      expose({
        getCurrentPageData,
      });

      return () => {
        const direction = props.direction ?? context.value.direction;
        // eslint-disable-next-line prefer-destructuring
        if (props.resizable) {
          return (
            <ResizableTable
              {...props}
              children={slots.default?.()}
              ref={tableRef}
              direction={direction}
            ></ResizableTable>
          );
        } else {
          return (
            <NormalTable {...props} children={slots.default?.()} ref={tableRef} direction={direction}></NormalTable>
          );
        }
      };
    },
  });

  return Table;
}

const Table_ = Table();
export default Table_;
const DEFAULT_KEY_COLUMN_SELECTION = strings.DEFAULT_KEY_COLUMN_SELECTION;
const DEFAULT_KEY_COLUMN_EXPAND = strings.DEFAULT_KEY_COLUMN_EXPAND;
export { Table as TableMaker, Column as TableColumn, DEFAULT_KEY_COLUMN_SELECTION, DEFAULT_KEY_COLUMN_EXPAND };

export * from './interface';
