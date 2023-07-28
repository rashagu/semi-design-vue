import * as PropTypes from '../PropTypes';
import NormalTable_, {TablePropTypes} from './Table';
import ResizableTable from './ResizableTable';
import Column from './Column';
import {strings} from '@douyinfe/semi-foundation/table/constants';
import {TableProps, Data} from './interface';

import {defineComponent, h, ref, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useConfigContext} from "../configProvider/context/Consumer";

const propTypes = {
  ...TablePropTypes,
  resizable: [PropTypes.bool, PropTypes.object],
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
    const {context} = useConfigContext()

    const getCurrentPageData = () => tableRef.value && tableRef.value.getCurrentPageData();

    return () => {
      const direction = props.direction ?? context.value.direction;
      // eslint-disable-next-line prefer-destructuring
      if (props.resizable) {
        return <ResizableTable {...props} children={slots.default?.()} ref={tableRef} direction={direction} ></ResizableTable>;
      } else {
        return <NormalTable {...props} children={slots.default?.()} ref={tableRef} direction={direction} ></NormalTable>;
      }
    };
  }, {
    props: vuePropsType,
    name: 'TableIndex'
  });

  return Table
}


const Table_ = Table()
export default Table_;
const DEFAULT_KEY_COLUMN_SELECTION = strings.DEFAULT_KEY_COLUMN_SELECTION
const DEFAULT_KEY_COLUMN_EXPAND = strings.DEFAULT_KEY_COLUMN_EXPAND;
export {
  Table as TableMaker,
  Column as TableColumn,
  DEFAULT_KEY_COLUMN_SELECTION,
  DEFAULT_KEY_COLUMN_EXPAND
}


export * from './interface';

