import { ComponentObjectPropsOptions, computed, defineComponent, h, PropType, useSlots } from 'vue';
import Context, { TableContextProps } from './table-context';
import * as PropTypes from '../PropTypes';
import { CombineProps } from '../interface';

export const vuePropsType: CombineProps<TableContextProps> = {
  headWidths: PropTypes.array,
  setHeadWidths: PropTypes.func as PropType<TableContextProps['setHeadWidths']>,
  handleRowExpanded: PropTypes.func as PropType<TableContextProps['handleRowExpanded']>,
  tableWidth: PropTypes.number,
  anyColumnFixed: PropTypes.bool,
  flattenedColumns: PropTypes.array,
  renderExpandIcon: PropTypes.func as PropType<TableContextProps['renderExpandIcon']>,
  renderSelection: PropTypes.func as PropType<TableContextProps['renderSelection']>,
  getHeadWidths: PropTypes.func as PropType<TableContextProps['getHeadWidths']>,
  getCellWidths: PropTypes.func as PropType<TableContextProps['getCellWidths']>,
  getVirtualizedListRef: [PropTypes.func, PropTypes.object] as PropType<TableContextProps['getVirtualizedListRef']>,
  setBodyHasScrollbar: PropTypes.func as PropType<TableContextProps['setBodyHasScrollbar']>,
  direction: PropTypes.string as PropType<TableContextProps['direction']>,
};
const TableContextProvider = defineComponent({
  props: { ...vuePropsType },
  name: 'TableContextProvider',
  setup(props, {}) {
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
      return <Context.Provider value={tableContextValue.value}>{{ default: slots.default }}</Context.Provider>;
    };
  },
});

export default TableContextProvider;
