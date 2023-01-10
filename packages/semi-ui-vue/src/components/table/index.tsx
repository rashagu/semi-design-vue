import * as PropTypes from '../PropTypes';
import NormalTable_, {TablePropTypes} from './Table';
import ResizableTable from './ResizableTable';
import Column from './Column';
import {strings} from '@douyinfe/semi-foundation/table/constants';
import {TableProps, Data} from './interface';
import {defineComponent, h, ref, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";

const propTypes = {
  ...TablePropTypes,
  resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const defaultProps = {
  hideExpandedColumn: true,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);

function Table<RecordType extends Record<string, any> = Data>() {
  const NormalTable = NormalTable_<RecordType>()
  const Table = defineComponent<TableProps<RecordType>>((props, {}) => {
    const slots = useSlots();
    const tableRef = ref()

    const getCurrentPageData = () => tableRef.value && tableRef.value.getCurrentPageData();

    return () => {
      // eslint-disable-next-line prefer-destructuring
      if (props.resizable) {
        return <ResizableTable {...props} children={slots.default?.()} ref={tableRef}></ResizableTable>;
      } else {
        return <NormalTable {...props} children={slots.default?.()} ref={tableRef}></NormalTable>;
      }
    };
  });

  Table.props = vuePropsType;
  Table.name = "TableIndex";
  return Table
}

export default Table;

const Table_ = Table()
const DEFAULT_KEY_COLUMN_SELECTION = strings.DEFAULT_KEY_COLUMN_SELECTION
const DEFAULT_KEY_COLUMN_EXPAND = strings.DEFAULT_KEY_COLUMN_EXPAND;
export {
  Table_ as Table,
  Column as TableColumn,
  DEFAULT_KEY_COLUMN_SELECTION,
  DEFAULT_KEY_COLUMN_EXPAND
}


export * from './interface';

