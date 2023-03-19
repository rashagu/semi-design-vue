import {computed, defineComponent, h, useSlots} from "vue"
import Context, { TableContextProps } from './table-context';
import * as PropTypes from "../PropTypes";


export const vuePropsType = {
  headWidths: PropTypes.array,
  setHeadWidths: PropTypes.func,
  handleRowExpanded: PropTypes.func,
  tableWidth: PropTypes.number,
  anyColumnFixed: PropTypes.bool,
  flattenedColumns: PropTypes.array,
  renderExpandIcon: PropTypes.func,
  renderSelection: PropTypes.func,
  getHeadWidths: PropTypes.func,
  getCellWidths: PropTypes.func,
  getVirtualizedListRef: [PropTypes.func, PropTypes.object],
  setBodyHasScrollbar: PropTypes.func
};
const TableContextProvider = defineComponent<TableContextProps>((props, {}) => {
  const slots = useSlots();

  const tableContextValue = computed(() => ({
    anyColumnFixed: props.anyColumnFixed,
    flattenedColumns: props.flattenedColumns,
    renderExpandIcon: props.renderExpandIcon,
    renderSelection: props.renderSelection,
    setHeadWidths: props.setHeadWidths,
    getHeadWidths: props.getHeadWidths,
    getCellWidths: props.getCellWidths,
    headWidths: props.headWidths,
    tableWidth: props.tableWidth,
    handleRowExpanded: props.handleRowExpanded,
    getVirtualizedListRef: props.getVirtualizedListRef,
    setBodyHasScrollbar: props.setBodyHasScrollbar,
    direction: props.direction,
  }));

  return () => {




    return <Context.Provider value={tableContextValue.value}>{{default: slots.default}}</Context.Provider>;
  };
});

TableContextProvider.props = vuePropsType;
TableContextProvider.name = "TableContextProvider";

export default TableContextProvider;

