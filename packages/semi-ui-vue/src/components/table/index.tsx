import * as PropTypes from '../PropTypes';
import NormalTable_, { NormalTableProps, TablePropTypes } from './Table';
import ResizableTable from './ResizableTable';
import Column from './Column';
import { strings } from '@douyinfe/semi-foundation/table/constants';
import type { TableProps, Data } from './interface';

import { ComponentObjectPropsOptions, defineComponent, h, ref, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useConfigContext } from '../configProvider/context/Consumer';
import { useHasInProps } from '../_base/baseComponent';
import { CombineProps } from '../interface';

const propTypes: CombineProps<NormalTableProps<any> & {resizable?: any}> = {
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
    props: vuePropsType as CombineProps<TableProps<RecordType>>,
    name: 'TableIndex',
    setup(props, { expose }) {
      const {getProps} = useHasInProps()
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
              {...getProps(props)}
              children={slots.default?.()}
              ref={tableRef}
              direction={direction}
            ></ResizableTable>
          );
        } else {
          return (
            <NormalTable {...getProps(props)} children={slots.default?.()} ref={tableRef} direction={direction}></NormalTable>
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
