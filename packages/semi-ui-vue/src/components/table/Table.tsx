import * as PropTypes from '../PropTypes';
import classnames from 'classnames';
import {
  get,
  noop,
  includes,
  find,
  findIndex,
  some,
  debounce,
  flattenDeep,
  each,
  omit,
  isNull,
  difference,
  isFunction,
  isObject,
  isPlainObject
} from 'lodash';

import {
  mergeQueries,
  equalWith,
  isAnyFixedRight,
  assignColumnKeys,
  flattenColumns,
  getAllDisabledRowKeys,
  shouldShowEllipsisTitle
} from '@douyinfe/semi-foundation/table/utils';
import Store from '@douyinfe/semi-foundation/utils/Store';
import TableFoundation, {
  TableAdapter,
  BasePageData,
  BaseRowKeyType,
  BaseHeadWidth,
} from '@douyinfe/semi-foundation/table/foundation';
import { TableSelectionCellEvent } from '@douyinfe/semi-foundation/table/tableSelectionCellFoundation';
import { strings, cssClasses, numbers } from '@douyinfe/semi-foundation/table/constants';
import '@douyinfe/semi-foundation/table/table.scss';

import Spin from '../spin';
import LocaleConsumer from '../locale/localeConsumer';
import getColumnsImport from './getColumns';
import TableContext, { TableContextProps } from './table-context';
import TableContextProvider from './TableContextProvider';
import ColumnSelection, { TableSelectionCellProps } from './ColumnSelection';
import TablePagination from './TablePagination';
import ColumnFilter, { OnSelectData } from './ColumnFilter';
import ColumnSorter from './ColumnSorter';
import ExpandedIcon from './CustomExpandIcon';
import HeadTable, { HeadTableProps } from './HeadTable';
import BodyTable, { BodyProps } from './Body';
import { measureScrollbar, logger, cloneDeep, mergeComponents, mergeColumns } from './utils';
import type {
  ColumnProps,
  TablePaginationProps,
  BodyScrollEvent,
  BodyScrollPosition,
  ExpandIcon,
  ColumnTitleProps,
  Pagination,
  RenderPagination,
  TableLocale,
  TableProps,
  TableComponents,
  RowSelectionProps,
  Data,
} from './interface';
import { ArrayElement } from '../_base/base';

import { VueJsxNode } from '../interface';
import {
  ComponentInternalInstance, ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  Fragment,
  getCurrentInstance,
  h,
  isVNode,
  onBeforeUnmount,
  onMounted, PropType,
  reactive,
  ref,
  toRaw,
  useSlots,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
import { useTableContext } from './tableContext/Consumer';
import {is} from "date-fns/locale";

export type NormalTableProps<RecordType extends Record<string, any> = Data> = Omit<TableProps<RecordType>, 'resizable'>;

export interface NormalTableState<RecordType extends Record<string, any> = Data> {
  cachedColumns?: ColumnProps<RecordType>[];
  cachedChildren?: VueJsxNode;
  flattenColumns?: ColumnProps<RecordType>[];
  components?: TableComponents;
  queries?: ColumnProps<RecordType>[];
  dataSource?: RecordType[];
  flattenData?: RecordType[];
  expandedRowKeys?: (string | number)[];
  rowSelection?: TableStateRowSelection<RecordType>;
  pagination?: Pagination;
  groups?: Map<string, RecordType[]>;
  allRowKeys?: (string | number)[];
  disabledRowKeys?: (string | number)[];
  disabledRowKeysSet?: Set<string | number>;
  headWidths?: Array<Array<BaseHeadWidth>>;
  bodyHasScrollBar?: boolean;
  prePropRowSelection?: TableStateRowSelection<RecordType>;
  tableWidth?: number;
  prePagination?: Pagination;    /**
   * Disabled row keys in sorted and filtered data
   */
  allDisabledRowKeys?: BaseRowKeyType[];
  /**
   * Disabled row keys set in sorted and filtered data
   */
  allDisabledRowKeysSet?: Set<BaseRowKeyType>
}

export type TableStateRowSelection<RecordType extends Record<string, any> = Data> =
  | (RowSelectionProps<RecordType> & { selectedRowKeysSet?: Set<string | number> })
  | boolean;

export interface RenderTableProps<RecordType> extends HeadTableProps, BodyProps {
  filteredColumns: ColumnProps<RecordType>[];
  useFixedHeader: boolean;
  bodyRef: any;
  rowSelection: TableStateRowSelection<RecordType>;
  bodyHasScrollBar: boolean;
}

const propTypes:ComponentObjectPropsOptions<NormalTableProps<any>> = {
  children: PropTypes.any as PropType<NormalTableProps['children']>,
  className: PropTypes.string,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  components: PropTypes.any as PropType<NormalTableProps['components']>,
  bordered: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.string as PropType<NormalTableProps['size']>,
// @ts-ignore
  tableLayout: PropTypes.string as PropType<any>,
  columns: PropTypes.array as PropType<NormalTableProps['columns']>,
  hideExpandedColumn: PropTypes.bool,
  id: PropTypes.string,
  expandIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.node]),
  expandCellFixed: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  onHeaderRow: PropTypes.func as PropType<NormalTableProps['onHeaderRow']>,
  showHeader: PropTypes.bool,
  indentSize: PropTypes.number,
  rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.number]),
  onRow: PropTypes.func as PropType<NormalTableProps['onRow']>,
  onExpandedRowsChange: PropTypes.func as PropType<NormalTableProps['onExpandedRowsChange']>,
  onExpand: PropTypes.func as PropType<NormalTableProps['onExpand']>,
  rowExpandable: PropTypes.func as PropType<NormalTableProps['rowExpandable']>,
  expandedRowRender: PropTypes.func as PropType<NormalTableProps['expandedRowRender']>,
  expandedRowKeys: PropTypes.array,
  defaultExpandAllRows: PropTypes.bool,
  expandAllRows: PropTypes.bool,
  defaultExpandAllGroupRows: PropTypes.bool,
  expandAllGroupRows: PropTypes.bool,
  defaultExpandedRowKeys: PropTypes.array,
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  renderPagination: PropTypes.func as PropType<NormalTableProps['renderPagination']>,
  footer: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.node]),
  empty: PropTypes.node,
  dataSource: PropTypes.array,
  childrenRecordName: PropTypes.string, // children data property name
  rowSelection: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func as PropType<NormalTableProps['onChange']>,
  scroll: PropTypes.object,
  groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  renderGroupSection: PropTypes.oneOfType([PropTypes.func]),
  onGroupedRow: PropTypes.func as PropType<NormalTableProps['onGroupedRow']>,
  clickGroupedRowToExpand: PropTypes.bool,
  virtualized: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dropdownPrefixCls: PropTypes.string, // TODO: future api
  expandRowByClick: PropTypes.bool, // TODO: future api
  getVirtualizedListRef: PropTypes.func as PropType<NormalTableProps['getVirtualizedListRef']>, // TODO: future api
  bodyWrapperRef: [PropTypes.func, PropTypes.object],
  direction: PropTypes.string as PropType<NormalTableProps['direction']>,
};
export { propTypes as TablePropTypes };
const defaultProps = {
  // rowExpandable: stubTrue,
  tableLayout: '',
  dataSource: [] as [],
  prefixCls: cssClasses.PREFIX,
  rowSelection: null as null,
  className: '',
  childrenRecordName: 'children',
  size: 'default',
  loading: false,
  bordered: false,
  expandCellFixed: false,
  hideExpandedColumn: true,
  showHeader: true,
  indentSize: numbers.DEFAULT_INDENT_WIDTH,
  onChange: noop,
  pagination: true,
  rowKey: 'key',
  defaultExpandedRowKeys: [] as [],
  defaultExpandAllRows: false,
  defaultExpandAllGroupRows: false,
  expandAllRows: false,
  expandAllGroupRows: false,
  onFilterDropdownVisibleChange: noop,
  onExpand: noop,
  onExpandedRowsChange: noop,
  expandRowByClick: false,
};
// NormalTableProps<RecordType>, NormalTableState<RecordType>
// 需要返回范型组件
function Table<RecordType extends Record<string, any>>() {
  const vuePropsType = vuePropsMake<NormalTableProps<RecordType>>(propTypes, defaultProps);
  const TableComp = defineComponent<NormalTableProps<RecordType>>((props, {expose}) => {
    const slots = useSlots();

    let lastScrollTop!: number;
    let lastScrollLeft!: number;
    let scrollPosition!: BodyScrollPosition;
    let position!: BodyScrollPosition;
    let { context } = useTableContext();


    let cachedFilteredSortedDataSource: RecordType[] = [];
    let cachedFilteredSortedRowKeys: BaseRowKeyType[] = [];
    let cachedFilteredSortedRowKeysSet: Set<string | number> = new Set();

    // columns cannot be deepClone, otherwise the comparison will be false
    const columns = getColumns(props.columns, props.children);
    const cachedflattenColumns = flattenColumns(columns);
    const queries = TableFoundation.initColumnsFilteredValueAndSorterOrder(cloneDeep(cachedflattenColumns));

    const rootWrapRef = ref();
    const wrapRef = ref(); // table's outside wrap

    const bodyWrapRef = ref();
    const headerWrapRef = ref();

    const state = reactive<NormalTableState<RecordType>>({
      /**
       * Cached props
       */
      cachedColumns: columns, // update cachedColumns after columns or children change
      cachedChildren: props.children,
      flattenColumns: cachedflattenColumns,
      components: mergeComponents(props.components, props.virtualized), // cached components

      /**
       * State calculated based on prop
       */
      queries, // flatten columns, update when sorting or filtering
      dataSource: [], // data after paging
      flattenData: [],
      expandedRowKeys: [...(props.expandedRowKeys || []), ...(props.defaultExpandedRowKeys || [])], // cached expandedRowKeys
      rowSelection: props.rowSelection ? (isObject(props.rowSelection) ? { ...props.rowSelection } : {}) : null,
      pagination:
        props.pagination && typeof props.pagination === 'object' ? { ...props.pagination } : props.pagination || false,

      /**
       * Internal state
       */
      groups: null,
      allRowKeys: [], // row keys after paging
      disabledRowKeys: [], // disabled row keys after paging
      disabledRowKeysSet: new Set(),
      allDisabledRowKeys: [],
      allDisabledRowKeysSet: new Set(),
      headWidths: [], // header cell width
      bodyHasScrollBar: false,
      prePropRowSelection: undefined,
      prePagination: undefined,
    });
    const { adapter: adapterInject, getDataAttr } = useBaseComponent<NormalTableProps<RecordType>>(props, state);

    function adapter_(): TableAdapter<RecordType> {
      return {
        ...adapterInject(),
        resetScrollY: () => {
          if (bodyWrapRef.value) {
            bodyWrapRef.value.scrollTop = 0;
          }
        },
        setSelectedRowKeys: (selectedRowKeys) => {
          state.rowSelection = {
            ...(state.rowSelection as Record<string, any>),
            selectedRowKeys: [...selectedRowKeys],
            selectedRowKeysSet: new Set(selectedRowKeys),
          };
        },
        setDisabledRowKeys: (disabledRowKeys) => {
          state.disabledRowKeys = disabledRowKeys;
          state.disabledRowKeysSet = new Set(disabledRowKeys);
        },
        setCurrentPage: (currentPage) => {
          const { pagination } = state;
          if (typeof pagination === 'object') {
            state.pagination = { ...(pagination as any), currentPage };
          } else {
            state.pagination = { currentPage };
          }
        },
        setPagination: (pagination) => {
          state.pagination = pagination;
        },
        setGroups: (groups) => {
          state.groups = groups as any;
        },
        setDataSource: (dataSource) => {
          state.dataSource = dataSource as any;
        },
        setExpandedRowKeys: (expandedRowKeys) => {
          state.expandedRowKeys = [...expandedRowKeys];
        },
        setQuery: (query = {}) => {
          let queries = [...state.queries];
          queries = mergeQueries(query, queries);
          state.queries = queries;
        },
        // Update queries when filtering or sorting
        setQueries: (queries: ColumnProps<RecordType>[]) => (state.queries = queries as any),
        setFlattenData: (flattenData) => (state.flattenData = flattenData as any),
        setAllRowKeys: (allRowKeys) => (state.allRowKeys = allRowKeys),
        setHoveredRowKey: (hoveredRowKey) => {
          store.setState({ hoveredRowKey });
        },
        setCachedFilteredSortedDataSource: (filteredSortedDataSource) => {
          cachedFilteredSortedDataSource = filteredSortedDataSource;
        },
        setCachedFilteredSortedRowKeys: (filteredSortedRowKeys) => {
          cachedFilteredSortedRowKeys = filteredSortedRowKeys;
          cachedFilteredSortedRowKeysSet = new Set(filteredSortedRowKeys);
        },
        setAllDisabledRowKeys: allDisabledRowKeys => {
          const allDisabledRowKeysSet = new Set(allDisabledRowKeys);
          state.allDisabledRowKeys = allDisabledRowKeys
          state.allDisabledRowKeysSet = allDisabledRowKeysSet
        },
        getCurrentPage: () => get(state as any, 'pagination.currentPage', 1),
        getCurrentPageSize: () => get(state as any, 'pagination.pageSize', numbers.DEFAULT_PAGE_SIZE),
        getCachedFilteredSortedDataSource: () => cachedFilteredSortedDataSource,
        getCachedFilteredSortedRowKeys: () => cachedFilteredSortedRowKeys,
        getCachedFilteredSortedRowKeysSet: () => cachedFilteredSortedRowKeysSet,
        getAllDisabledRowKeys: () => state.allDisabledRowKeys,
        getAllDisabledRowKeysSet: () => state.allDisabledRowKeysSet,
        notifyFilterDropdownVisibleChange: (visible, dataIndex) =>
          _invokeColumnFn(dataIndex, 'onFilterDropdownVisibleChange', visible),
        notifyChange: (...args) => props.onChange(...args),
        notifyExpand: (...args) => props.onExpand(...args),
        notifyExpandedRowsChange: (...args) => props.onExpandedRowsChange(...args),
        notifySelect: (...args) => _invokeRowSelection('onSelect', ...args),
        notifySelectAll: (...args) => _invokeRowSelection('onSelectAll', ...args),
        notifySelectInvert: (...args) => _invokeRowSelection('onSelectInvert', ...args),
        notifySelectionChange: (...args) => _invokeRowSelection('onChange', ...args),
        isAnyColumnFixed: (columns: ColumnProps<RecordType>[]) =>
          some(getColumns(columns || props.columns, props.children), (column) => Boolean(column.fixed)),
        useFixedHeader: () => {
          const { scroll, sticky } = props;

          if (get(scroll, 'y')) {
            return true;
          }

          if (sticky) {
            return true;
          }

          return false;
        },
        getTableLayout: () => {
          let isFixed = false;
          const { flattenColumns } = state;

          if (Array.isArray(flattenColumns)) {
            isFixed = flattenColumns.some(column => (Boolean(column.ellipsis) || Boolean(column.fixed)));
          }
          if (adapter.useFixedHeader()) {
            isFixed = true;
          }
          return isFixed ? 'fixed' : 'auto';
        },
        setHeadWidths: (headWidths: Array<BaseHeadWidth>, index = 0) => {
          if (!equalWith(state.headWidths[index], headWidths)) {
            // The map call depends on the last state
            const newHeadWidths: Array<Array<BaseHeadWidth>> = [...state.headWidths];
            newHeadWidths[index] = [...headWidths];
            state.headWidths = newHeadWidths;
          }
        },
        getHeadWidths: (index = 0) => {
          if (state.headWidths.length && typeof index === 'number') {
            const configs = state.headWidths[index] || [];
            return configs.map((item) => item.width);
          }
          return [];
        },
        // This method is called by row rendering function
        getCellWidths: (
          flattenedColumns: ColumnProps<RecordType>[],
          flattenedWidths: BaseHeadWidth[] = null,
          ignoreScrollBarKey = false
        ): number[] => {
          if (Array.isArray(flattenedColumns) && flattenedColumns.length) {
            flattenedWidths = flattenedWidths == null && state.headWidths.length ? flattenDeep(state.headWidths) : [];
            if (Array.isArray(flattenedWidths) && flattenedWidths.length) {
              return flattenedColumns.reduce((result, column) => {
                const found =
                  column.key === strings.DEFAULT_KEY_COLUMN_SCROLLBAR && ignoreScrollBarKey
                    ? null
                    : find(flattenedWidths, (item) => item && item.key != null && item.key === column.key);
                if (found) {
                  result.push(found.width);
                }

                return result;
              }, [] as number[]);
            }
          }
          return [];
        },
        mergedRowExpandable: (record) => {
          const { expandedRowRender, childrenRecordName, rowExpandable } = props;
          const children = get(record, childrenRecordName);
          const hasExpandedRowRender = typeof expandedRowRender === 'function';
          const hasRowExpandable = typeof rowExpandable === 'function';
          const hasChildren = Array.isArray(children) && children.length;
          const strictExpandableResult = hasRowExpandable && rowExpandable(record);
          const looseExpandableResult = !hasRowExpandable || strictExpandableResult;

          return (
            ((hasExpandedRowRender || hasChildren) && looseExpandableResult) ||
            (!(hasExpandedRowRender || hasChildren) && strictExpandableResult)
          );
        },
        isAnyColumnUseFullRender: (columns: ColumnProps<RecordType>[]) => {
          return some(columns, (column) => {
            Boolean(column.useFullRender);
          });
        },
        //TODO 类型没对上
        getNormalizeColumns: () => normalizeColumns as any,
        getHandleColumns: () => handleColumns as any,
        getMergePagination: () => mergePagination,
        setBodyHasScrollbar: (bodyHasScrollBar) => {
          if (bodyHasScrollBar !== state.bodyHasScrollBar) {
            state.bodyHasScrollBar = bodyHasScrollBar;
          }
        },
        stopPropagation(e: TableSelectionCellEvent) {
          // The event definition here is not very accurate for now, it belongs to a broad structure definition
          if (e && typeof e === 'object') {
            if (typeof e.stopPropagation === 'function') {
              e.stopPropagation();
            }
            if (e.nativeEvent && typeof e.nativeEvent.stopPropagation === 'function') {
              e.nativeEvent.stopPropagation();
            } else if (typeof e.stopImmediatePropagation === 'function') {
              e.stopImmediatePropagation();
            }
          }
        },
      };
    }
    const adapter = adapter_();
    const foundation = new TableFoundation<RecordType>(adapter);



    const filteredSortedDataSource = foundation.getFilteredSortedDataSource(props.dataSource, queries);
    const newPagination = isPlainObject(props.pagination) ? props.pagination : {} as any;
    const pageData: BasePageData<RecordType> = foundation.getCurrentPageData(filteredSortedDataSource, newPagination, queries);
    state.dataSource = pageData.dataSource as any
    state.pagination = pageData.pagination


    const store = new Store({
      hoveredRowKey: null,
    });

    let debouncedWindowResize = debounce(handleWindowResize, 150);


    function getDerivedStateFromProps(props: NormalTableProps) {
      const willUpdateStates: Partial<NormalTableState> = {};
      const { rowSelection, dataSource, childrenRecordName, rowKey, pagination } = props;
      props.columns &&
        props.children &&
        logger.warn('columns should not given by object and children at the same time');

      // @ts-ignore
      if (props.columns && props.columns !== state.cachedColumns) {
        const newFlattenColumns = flattenColumns(props.columns);
        willUpdateStates.flattenColumns = newFlattenColumns;
        willUpdateStates.queries = mergeColumns(state.queries, newFlattenColumns, null, false);
        willUpdateStates.cachedColumns = props.columns;
        willUpdateStates.cachedChildren = null;
      } else if (props.children && props.children !== state.cachedChildren) {
        const newNestedColumns = getColumnsImport(props.children);
        const newFlattenColumns = flattenColumns(newNestedColumns);
        const columns = mergeColumns(state.queries, newFlattenColumns, null, false);
        willUpdateStates.flattenColumns = newFlattenColumns;
        willUpdateStates.queries = [...columns];
        willUpdateStates.cachedColumns = [...newNestedColumns];
        willUpdateStates.cachedChildren = props.children;
      }

      // Update controlled selection column
      if (rowSelection !== state.prePropRowSelection) {
        let newSelectionStates: TableStateRowSelection = {};
        if (isObject(state.rowSelection)) {
          // @ts-ignore
          newSelectionStates = { ...newSelectionStates, ...state.rowSelection };
        }
        if (isObject(rowSelection)) {
          // @ts-ignore
          newSelectionStates = { ...newSelectionStates, ...rowSelection };
        }
        const selectedRowKeys = get(rowSelection, 'selectedRowKeys');
        const getCheckboxProps = get(rowSelection, 'getCheckboxProps');
        if (selectedRowKeys && Array.isArray(selectedRowKeys)) {
          // @ts-ignore
          newSelectionStates.selectedRowKeysSet = new Set(selectedRowKeys);
        }
        // The return value of getCheckboxProps affects the disabled rows
        if (isFunction(getCheckboxProps)) {
          const disabledRowKeys = getAllDisabledRowKeys({ dataSource, getCheckboxProps, childrenRecordName, rowKey });
          const disabledRowKeysSet = new Set(disabledRowKeys);
          willUpdateStates.disabledRowKeys = disabledRowKeys;
          willUpdateStates.disabledRowKeysSet = disabledRowKeysSet;
          willUpdateStates.allDisabledRowKeys = disabledRowKeys;
          willUpdateStates.allDisabledRowKeysSet = disabledRowKeysSet;
        }
        willUpdateStates.rowSelection = newSelectionStates;
        willUpdateStates.prePropRowSelection = rowSelection;
      }
      if (pagination !== state.prePagination) {
        let newPagination: Pagination = {};
        if (isObject(state.pagination)) {
          // @ts-ignore
          newPagination = { ...newPagination, ...state.pagination };
        }
        if (isObject(pagination)) {
          // @ts-ignore
          newPagination = { ...newPagination, ...pagination };
        }
        willUpdateStates.pagination = newPagination;
        willUpdateStates.prePagination = pagination;
      }
      return willUpdateStates;
    }

    watch(
      () => props,
      () => {
        const newState = getDerivedStateFromProps({...props} as any);
        newState &&
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
      },
      { deep: true, immediate: true }
    );

    onMounted(() => {
      setScrollPosition('left');

      if (adapter.isAnyColumnFixed() || (props.showHeader && adapter.useFixedHeader())) {
        handleWindowResize();
        window.addEventListener('resize', debouncedWindowResize);
      }
    });

    // TODO: Extract the setState operation to the adapter or getDerivedStateFromProps function
    // @ts-ignore
    watch(
      [
        () => props.expandedRowKeys,
        () => props.components,
        () => props.virtualized,
        () => props.expandAllRows,
        () => props.expandAllGroupRows,
        () => props.dataSource,
        () => state.cachedColumns,
        () => state.cachedChildren,
      ],
      (
        value,
        [
          prevPropsExpandedRowKeys,
          prevPropsComponents,
          prevPropsVirtualized,
          prevPropsExpandAllRows,
          prevPropsExpandAllGroupRows,
          prevPropsDataSource,
          prevStateCachedColumns,
          prevStateCachedChildren,
        ]
      ) => {
        const {
          dataSource,
          expandedRowKeys,
          expandAllRows,
          expandAllGroupRows,
          virtualized,
          components,
          pagination: propsPagination,
        } = props;

        const {
          pagination: statePagination,
          queries: stateQueries,
          cachedColumns: stateCachedColumns,
          // @ts-ignore
          cachedChildren: stateCachedChildren,
          groups: stateGroups,
        } = state;

        /**
         * State related to paging
         *
         * @param dataSource
         * @param groups
         * @param pagination
         * @param disabledRowKeys
         * @param allRowKeys
         * @param queries
         */
        const states: Partial<NormalTableState<RecordType>> = {};

        _warnIfNoKey();

        /**
         * The state that needs to be updated after props changes
         */

        // Update controlled expand column
        if (Array.isArray(expandedRowKeys) && expandedRowKeys !== prevPropsExpandedRowKeys) {
          state.expandedRowKeys = expandedRowKeys;
        }

        // Update components
        if (components !== prevPropsComponents || virtualized !== prevPropsVirtualized) {
          state.components = mergeComponents(components, virtualized);
        }

        // Update the default expanded column
        if (expandAllRows !== prevPropsExpandAllRows || expandAllGroupRows !== prevPropsExpandAllGroupRows) {
          foundation.initExpandedRowKeys({ groups: stateGroups as any });
        }

        /**
         * After dataSource is updated || (cachedColumns || cachedChildren updated)
         * 1. Cache filtered sorted data and a collection of data rows, stored in this
         * 2. Update pager and group, stored in state
         */
        if (
          dataSource !== prevPropsDataSource ||
          stateCachedColumns !== prevStateCachedColumns ||
          stateCachedChildren !== prevStateCachedChildren
        ) {
          // TODO: foundation.getFilteredSortedDataSource has side effects and will be modified to the dataSource reference
          // Temporarily use _dataSource=[...dataSource] for processing
          const _dataSource = [...dataSource];
          const filteredSortedDataSource = foundation.getFilteredSortedDataSource(_dataSource, stateQueries as any);
          const allDataDisabledRowKeys = foundation.getAllDisabledRowKeys(filteredSortedDataSource);
          foundation.setCachedFilteredSortedDataSource(filteredSortedDataSource);
          foundation.setAllDisabledRowKeys(allDataDisabledRowKeys);
          states.dataSource = filteredSortedDataSource;

          if (props.groupBy) {
            states.groups = null;
          }
        }

        // when dataSource has change, should reset currentPage
        if (dataSource !== prevPropsDataSource) {
          // @ts-ignore
          states.pagination = isObject(statePagination)
            ? {
                ...statePagination,
                currentPage: isObject(propsPagination) && propsPagination.currentPage ? propsPagination.currentPage : 1,
              }
            : statePagination;
        }

        if (Object.keys(states).length) {
          const {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            pagination: mergedStatePagination = null,
            queries: stateQueries = null,
            dataSource: stateDataSource = null,
          } = states;
          const handledProps: Partial<NormalTableState<RecordType>> = foundation.getCurrentPageData(
            stateDataSource,
            mergedStatePagination as TablePaginationProps,
            stateQueries as any
          );

          // After the pager is updated, reset allRowKeys of the current page
          adapter.setAllRowKeys(handledProps.allRowKeys);
          adapter.setDisabledRowKeys(handledProps.disabledRowKeys);

          if ('dataSource' in states) {
            if (
              (props.defaultExpandAllRows && handledProps.groups && handledProps.groups.size) ||
              props.expandAllRows ||
              props.expandAllGroupRows
            ) {
              foundation.initExpandedRowKeys(handledProps);
            }
            states.pagination = handledProps.pagination;
          }

          // Centrally update paging related state
          const statesKeys: any[] = Object.keys(states);
          for (const k of statesKeys) {
            state[k] = handledProps[k];
          }
        }

        if (adapter.isAnyColumnFixed() || (props.showHeader && adapter.useFixedHeader())) {
          if (!debouncedWindowResize) {
            window.addEventListener('resize', debouncedWindowResize);
          }
        }
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      if (debouncedWindowResize) {
        window.removeEventListener('resize', debouncedWindowResize);
        (debouncedWindowResize as any).cancel();
        debouncedWindowResize = null;
      }
    });

    // TODO: notify when data don't have key
    function _warnIfNoKey() {
      if (
        (props.rowSelection || props.expandedRowRender) &&
        some(props.dataSource, (record) => foundation.getRecordKey(record) == null)
      ) {
        logger.error(
          'You must specify a key for each element in the dataSource or use "rowKey" to specify an attribute name as the primary key!'
        );
      }
    }

    const _invokeRowSelection = (funcName: string, ...args: any[]) => {
      const func = get(state as any, ['rowSelection', funcName]);

      if (typeof func === 'function') {
        func(...args);
      }
    };

    const _invokeColumnFn = (key: string, funcName: string, ...args: any[]) => {
      if (key && funcName) {
        const column = foundation.getQuery(key);
        const func = get(column, funcName, null);

        if (typeof func === 'function') {
          func(...args);
        }
      }
    };

    const _cacheHeaderRef = (node: HTMLDivElement) => {
      headerWrapRef.value = node;
    };

    const getCurrentPageData = () => {
      const pageData = foundation.getCurrentPageData();
      const retObj: Pick<BasePageData<RecordType>, 'dataSource' | 'groups'> = ['dataSource', 'groups'].reduce((result, key) => {
        if (pageData[key]) {
          result[key] = pageData[key];
        }
        return result;
      }, {});

      return cloneDeep(retObj);
    };

    function getColumns(columns: ColumnProps<RecordType>[], children: VueJsxNode) {
      return !Array.isArray(columns) || !columns || !columns.length ? getColumnsImport(children) : columns;
    }

    // @ts-ignore
    const getCellWidths = (...args: any[]) => foundation.getCellWidths(...args);
    // @ts-ignore
    const setHeadWidths = (...args: any[]) => foundation.setHeadWidths(...args);
    // @ts-ignore
    const getHeadWidths = (...args: any[]) => foundation.getHeadWidths(...args);
    // @ts-ignore
    const mergedRowExpandable = (...args: any[]) => foundation.mergedRowExpandable(...args);
    // @ts-ignore
    const setBodyHasScrollbar = (...args: any[]) => foundation.setBodyHasScrollbar(...args);

    const handleWheel = (event: WheelEvent) => {
      const { scroll = {} } = props;
      if (window.navigator?.userAgent.match(/Trident\/7\./) && scroll.y) {
        event.preventDefault();
        const wd = event.deltaY;
        const { target } = event;
        // const { bodyTable, fixedColumnsBodyLeft, fixedColumnsBodyRight } = this;
        const bodyTable = bodyWrapRef.value;

        let scrollTop = 0;

        if (lastScrollTop) {
          scrollTop = lastScrollTop + wd;
        } else {
          scrollTop = wd;
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      }
    };

    const handleBodyScrollLeft = (e: BodyScrollEvent) => {
      if (e.currentTarget !== e.target) {
        return;
      }
      const { target } = e;
      // const { headTable, bodyTable } = this;
      const headTable = headerWrapRef.value?.$el;
      const bodyTable = bodyWrapRef.value;
      if (target.scrollLeft !== lastScrollLeft) {
        if (target === bodyTable && headTable) {
          headTable.scrollLeft = target.scrollLeft;
        } else if (target === headTable && bodyTable) {
          bodyTable.scrollLeft = target.scrollLeft;
        }
        setScrollPositionClassName();
      }
      // Remember last scrollLeft for scroll direction detecting.
      lastScrollLeft = target.scrollLeft;
    };

    function handleWindowResize() {
      syncTableWidth();
      setScrollPositionClassName();
    }

    const handleBodyScrollTop = (e: BodyScrollEvent) => {
      const { target } = e;
      if (e.currentTarget !== target) {
        return;
      }
      const { scroll = {} } = props;
      // const { headTable, bodyTable, fixedColumnsBodyLeft, fixedColumnsBodyRight } = this;
      const headTable = headerWrapRef.value;
      const bodyTable = bodyWrapRef.value;

      if (target.scrollTop !== lastScrollTop && scroll.y && target !== headTable) {
        const { scrollTop } = target;

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      }
      // Remember last scrollTop for scroll direction detecting.
      lastScrollTop = target.scrollTop;
    };

    const handleBodyScroll = (e: BodyScrollEvent) => {
      handleBodyScrollLeft(e);
      handleBodyScrollTop(e);
    };

    const setScrollPosition = (position: BodyScrollPosition) => {
      const { prefixCls } = props;
      const positionAll = [
        `${prefixCls}-scroll-position-both`,
        `${prefixCls}-scroll-position-middle`,
        `${prefixCls}-scroll-position-left`,
        `${prefixCls}-scroll-position-right`,
      ];
      scrollPosition = position;
      const tableNode = wrapRef.value;
      if (tableNode && tableNode.nodeType) {
        if (position === 'both') {
          const acceptPosition = [`${prefixCls}-scroll-position-left`, `${prefixCls}-scroll-position-right`];
          tableNode.classList.remove(...difference(positionAll, acceptPosition));
          tableNode.classList.add(...acceptPosition);
        } else {
          const acceptPosition = [`${prefixCls}-scroll-position-${position}`];
          tableNode.classList.remove(...difference(positionAll, acceptPosition));
          tableNode.classList.add(...acceptPosition);
        }
      }
    };

    const setScrollPositionClassName = () => {
      const node = bodyWrapRef.value;
      if (node && node.children && node.children.length) {
        const scrollToLeft = node.scrollLeft === 0;
        // why use Math.abs? @see https://bugzilla.mozilla.org/show_bug.cgi?id=1447743
        const scrollToRight =
          Math.abs(node.scrollLeft) + 1 >=
          node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width;
        if (scrollToLeft && scrollToRight) {
          setScrollPosition('both');
        } else if (scrollToLeft) {
          setScrollPosition('left');
        } else if (scrollToRight) {
          setScrollPosition('right');
        } else if (scrollPosition !== 'middle') {
          setScrollPosition('middle');
        }
      }
    };

    const syncTableWidth = () => {
      if (rootWrapRef && rootWrapRef.value) {
        state.tableWidth = rootWrapRef.value.getBoundingClientRect().width;
      }
    };

    const renderSelection = (record = {} as any, inHeader = false, index?: number): VueJsxNode => {
      const { rowSelection, allDisabledRowKeysSet } = state;

      if (rowSelection && typeof rowSelection === 'object') {
        const {
          selectedRowKeys = [],
          selectedRowKeysSet = new Set(),
          getCheckboxProps,
          disabled,
          renderCell,
        } = rowSelection;
        const allRowKeys = cachedFilteredSortedRowKeys;
        const allRowKeysSet = cachedFilteredSortedRowKeysSet;
        const allIsSelected = foundation.allIsSelected(selectedRowKeysSet, allDisabledRowKeysSet, allRowKeys);
        const hasRowSelected = foundation.hasRowSelected(selectedRowKeys, allRowKeysSet);
        const indeterminate = hasRowSelected && !allIsSelected;

        if (inHeader) {
          const columnKey = get(rowSelection, 'key', strings.DEFAULT_KEY_COLUMN_SELECTION);

          const originNode = (
            <ColumnSelection
              aria-label={`${allIsSelected ? 'Deselect' : 'Select'} all rows`}
              disabled={disabled}
              key={columnKey}
              selected={allIsSelected}
              indeterminate={indeterminate}
              onChange={(selected, e) => {
                toggleSelectAllRow(selected, e);
              }}
            />
          );

          const selectAll = (selected: boolean, e: Event) =>
            toggleSelectAllRow(selected, e as TableSelectionCellEvent);

          return isFunction(renderCell)
            ? renderCell({
              selected: allIsSelected,
              record,
              originNode,
              inHeader,
              disabled,
              indeterminate,
              selectAll,
            })
            : originNode;
        } else {
          const key = foundation.getRecordKey(record);
          const selected = selectedRowKeysSet.has(key);
          const checkboxPropsFn = () => (typeof getCheckboxProps === 'function' ? getCheckboxProps(record) : {});
          const originNode = (
            <ColumnSelection
              aria-label={`${selected ? 'Deselect' : 'Select'} this row`}
              getCheckboxProps={checkboxPropsFn}
              selected={selected}
              onChange={(status, e) => toggleSelectRow(status, key, e)}
            />
          );
          const selectRow = (selected: boolean, e: Event) =>
            toggleSelectRow(selected, key, e as TableSelectionCellEvent);

          return isFunction(renderCell)
            ? renderCell({
              selected,
              record,
              index,
              originNode,
              inHeader: false,
              disabled,
              indeterminate,
              selectRow,
            })
            : originNode;
        }
      }
      return null;
    };

    const renderRowSelectionCallback = (text: string, record: RecordType = {} as RecordType, index: number) => renderSelection(record, false, index);
    const renderTitleSelectionCallback = () => renderSelection(undefined, true);

    const normalizeSelectionColumn = (
      props: { rowSelection?: TableStateRowSelection<RecordType>; prefixCls?: string } = {}
    ) => {
      const { rowSelection, prefixCls } = props;
      let column: ColumnProps = {};
      if (rowSelection) {
        const needOmitSelectionKey = ['selectedRowKeys', 'selectedRowKeysSet'];
        column = { key: strings.DEFAULT_KEY_COLUMN_SELECTION };

        if (isObject(rowSelection)) {
          column = { ...column, ...omit(rowSelection, needOmitSelectionKey) };
        }

        column.className = classnames(column.className, `${prefixCls}-column-selection`);

        column.title = renderTitleSelectionCallback;

        column.render = renderRowSelectionCallback;
      }
      return column;
    };

    // If there is a scroll bar, manually construct a column and insert it into the header
    const normalizeScrollbarColumn = (
      props: { scrollbarWidth?: number } = {}
    ): { key: 'column-scrollbar'; width: number; fixed: 'right' } => {
      const { scrollbarWidth = 0 } = props;

      return {
        key: strings.DEFAULT_KEY_COLUMN_SCROLLBAR as 'column-scrollbar',
        width: scrollbarWidth,
        fixed: 'right',
      };
    };

    /**
     * render expand icon
     * @param {Object} record
     * @param {Boolean} isNested
     * @param {String} groupKey
     * @returns {VueJsxNode}
     */
    const renderExpandIcon = (record = {}, isNested = false, groupKey: string | number = null) => {
      const { expandedRowKeys } = state;
      const { expandIcon } = props;
      const key =
        typeof groupKey === 'string' || typeof groupKey === 'number'
          ? groupKey
          : foundation.getRecordKey(record as RecordType);

      return (
        <ExpandedIcon
          key={key}
          componentType={isNested ? 'tree' : 'expand'}
          expanded={includes(expandedRowKeys, key)}
          expandIcon={expandIcon}
          onClick={(expanded, e) => handleRowExpanded(expanded, key, e)}
        />
      );
    };

    // @ts-ignore
    const handleRowExpanded = (...args: any[]) => foundation.handleRowExpanded(...args);

    const normalizeExpandColumn = (
      props: {
        prefixCls?: string;
        expandCellFixed?: ArrayElement<typeof strings.FIXED_SET>;
        expandIcon?: ExpandIcon;
      } = {}
    ) => {
      let column: ColumnProps = null;

      const { prefixCls, expandCellFixed, expandIcon } = props;

      column = { fixed: expandCellFixed, key: strings.DEFAULT_KEY_COLUMN_EXPAND };

      column.className = classnames(column.className, `${prefixCls}-column-expand`);

      column.render =
        expandIcon !== false
          ? (text = '', record, index) => (adapter.mergedRowExpandable(record) ? renderExpandIcon(record) : null)
          : () => null;

      return column;
    };

    /**
     * Add sorting, filtering, and rendering functions to columns, and add column event handling
     * Title support function, passing parameters as {filter: node, sorter: node, selection: node}
     * @param {*} column
     */
    const addFnsInColumn = (column: ColumnProps = {}) => {
      const { prefixCls } = props;
      if (column && (column.sorter || column.filters || column.onFilter || column.useFullRender)) {
        let hasSorterOrFilter = false;
        const { dataIndex, title: rawTitle, useFullRender } = column;
        const curQuery = foundation.getQuery(dataIndex);
        const titleMap: ColumnTitleProps = {};
        const titleArr = [];

        // useFullRender adds select buttons to each column
        if (useFullRender) {
          titleMap.selection = renderSelection(null, true);
        }

        const stateSortOrder = get(curQuery, 'sortOrder');
        const defaultSortOrder = get(curQuery, 'defaultSortOrder', false);
        const sortOrder = foundation.isSortOrderValid(stateSortOrder) ? stateSortOrder : defaultSortOrder;
        const showEllipsisTitle = shouldShowEllipsisTitle(column.ellipsis);
        const TitleNode = typeof rawTitle !== 'function' && (
          <span
            class={`${prefixCls}-row-head-title`}
            key={strings.DEFAULT_KEY_COLUMN_TITLE}
            title={showEllipsisTitle && typeof rawTitle === 'string' ? rawTitle : undefined}
          >
                    {rawTitle}
                </span>
        );
        if (typeof column.sorter === 'function' || column.sorter === true) {
          // In order to increase the click hot area of ​​sorting, when sorting is required & useFullRender is false,
          // both the title and sorting areas are used as the click hot area for sorting。
          const sorter = (
            <ColumnSorter
              key={strings.DEFAULT_KEY_COLUMN_SORTER}
              sortOrder={sortOrder}
              sortIcon={column.sortIcon}
              onClick={(e) => foundation.handleSort(column, e)}
              title={TitleNode}
            />
          );
          useFullRender && (titleMap.sorter = sorter);
          hasSorterOrFilter = true;
          titleArr.push(sorter);
        } else {
          titleArr.push(TitleNode);
        }

        const stateFilteredValue = get(curQuery, 'filteredValue');
        const defaultFilteredValue = get(curQuery, 'defaultFilteredValue');
        const filteredValue = stateFilteredValue ? stateFilteredValue : defaultFilteredValue;
        if (
          (Array.isArray(column.filters) && column.filters.length) ||
          isVNode(column.filterDropdown) ||
          typeof column.renderFilterDropdown === 'function'
        ) {
          const filter = (
            <ColumnFilter
              key={strings.DEFAULT_KEY_COLUMN_FILTER}
              {...curQuery}
              filteredValue={filteredValue}
              onFilterDropdownVisibleChange={(visible: boolean) =>
                foundation.toggleShowFilter(dataIndex, visible)
              }
              onSelect={(data: OnSelectData) => {
                foundation.handleFilterSelect(dataIndex, data);
              }}
            />
          );
          useFullRender && (titleMap.filter = filter);
          hasSorterOrFilter = true;
          titleArr.push(filter);
        }

        const newTitle =
          typeof rawTitle === 'function' ? (
            () => rawTitle(titleMap)
          ) : hasSorterOrFilter ? (
            <div class={`${prefixCls}-operate-wrapper`}>{titleArr}</div>
          ) : (
            titleArr
          );
        column = { ...column, title: newTitle };
      }

      return column;
    };

    const toggleSelectRow = (selected: boolean, realKey: string | number, e: TableSelectionCellEvent) => {
      foundation.handleSelectRow(realKey, selected, e);
    };

    const toggleSelectAllRow = (selected: boolean, e: TableSelectionCellEvent) => {
      foundation.handleSelectAllRow(selected, e);
    };

    /**
     * render pagination
     * @param {object} pagination
     * @param {object} propRenderPagination
     */
    const renderPagination = (pagination: TablePaginationProps, propRenderPagination: RenderPagination) => {
      if (!pagination) {
        return null;
      }

      // use memoized pagination
      const mergedPagination = foundation.memoizedPagination(pagination);

      return (
        <LocaleConsumer componentName="Table">
          {(locale: TableLocale) => {
            const info = foundation.formatPaginationInfo(mergedPagination, locale.pageText);
            return (
              <TablePagination info={info} pagination={mergedPagination} renderPagination={propRenderPagination} />
            );
          }}
        </LocaleConsumer>
      );
    };

    const renderTitle = (
      props: {
        title?: VueJsxNode | ((dataSource?: RecordType[]) => VueJsxNode);
        prefixCls?: string;
        dataSource?: any[];
      } = {}
    ) => {
      let { title } = props;
      const { prefixCls, dataSource } = props;

      if (typeof title === 'function') {
        title = title(dataSource);
      }

      return isVNode(title) || typeof title === 'string' ? (
        <div class={`${prefixCls}-title`} x-semi-prop="title">
          {title}
        </div>
      ) : null;
    };

    const renderEmpty = (props: { prefixCls?: string; empty?: VueJsxNode; dataSource?: RecordType[] } = {}) => {
      const { prefixCls, empty, dataSource } = props;
      const wrapCls = `${prefixCls}-placeholder`;
      const isEmpty = foundation.isEmpty(dataSource);

      if (!isEmpty) {
        return null;
      }

      return (
        <LocaleConsumer componentName="Table" key={'emptyText'}>
          {(locale: TableLocale, localeCode: string) => (
            <div class={wrapCls}>
              <div class={`${prefixCls}-empty`} x-semi-prop="empty">
                {empty || locale.emptyText}
              </div>
            </div>
          )}
        </LocaleConsumer>
      );
    };

    const renderFooter = (
      props: {
        footer?: VueJsxNode | ((dataSource?: RecordType[]) => VueJsxNode);
        prefixCls?: string;
        dataSource?: RecordType[];
      } = {}
    ) => {
      let { footer } = props;
      const { prefixCls, dataSource } = props;

      if (typeof footer === 'function') {
        footer = footer(dataSource);
      }

      return isVNode(footer) || typeof footer === 'string' ? (
        <div class={`${prefixCls}-footer`} key="footer" x-semi-prop="footer">
          {footer}
        </div>
      ) : null;
    };

    const renderMainTable = (props_: any) => {
      const useFixedHeader = adapter.useFixedHeader();
      const emptySlot = renderEmpty(props_);

      const table = [
        renderTable({
          ...props_,
          fixed: false,
          useFixedHeader,
          headerRef: _cacheHeaderRef,
          bodyRef: bodyWrapRef,
          includeHeader: !useFixedHeader,
          emptySlot,
        }),
        renderFooter(props_),
      ];

      return table;
    };

    const renderTable = (props_: RenderTableProps<RecordType>) => {
      const {
        columns,
        filteredColumns,
        fixed,
        useFixedHeader,
        scroll,
        prefixCls,
        anyColumnFixed,
        includeHeader,
        showHeader,
        components,
        headerRef,
        bodyRef,
        onHeaderRow,
        rowSelection,
        dataSource,
        bodyHasScrollBar,
        disabledRowKeysSet,
        sticky,
      } = props_;
      const selectedRowKeysSet = get(rowSelection, 'selectedRowKeysSet', new Set());
      const tableLayout = adapter.getTableLayout();

      const headTable =
        fixed || useFixedHeader ? (
          <HeadTable
            key="head"
            tableLayout={tableLayout}
            ref={headerRef}
            columns={filteredColumns}
            prefixCls={prefixCls}
            fixed={fixed}
            handleBodyScroll={handleBodyScrollLeft}
            components={components}
            scroll={scroll}
            showHeader={showHeader}
            selectedRowKeysSet={selectedRowKeysSet}
            onHeaderRow={onHeaderRow}
            dataSource={dataSource}
            bodyHasScrollBar={bodyHasScrollBar}
            sticky={sticky}
          />
        ) : null;
      const bodyTable = (
        <BodyTable
          {...(omit(props_, ['rowSelection', 'headWidths', 'allDisabledRowKeys', 'allDisabledRowKeysSet']) as any)}
          key="body"
          forwardedRef={bodyRef}
          columns={filteredColumns}
          fixed={fixed}
          prefixCls={prefixCls}
          handleWheel={handleWheel}
          handleBodyScroll={handleBodyScroll}
          anyColumnFixed={anyColumnFixed}
          tableLayout={tableLayout}
          includeHeader={includeHeader}
          showHeader={showHeader}
          scroll={scroll}
          components={components}
          store={store}
          selectedRowKeysSet={selectedRowKeysSet}
          disabledRowKeysSet={disabledRowKeysSet}
        />
      );

      return [headTable, bodyTable];
    };

    /**
     * When columns change, call this function to get the latest withFnsColumns
     * In addition to changes in columns, these props changes must be recalculated
     *  - hideExpandedColumn
     *  -rowSelection changes from trusy to falsy or rowSelection.hidden changes
     *  -isAnyFixedRight(columns) || get(scroll,'y') changes
     *
     * columns变化时，调用此函数获取最新的withFnsColumns
     * 除了 columns 变化，这些 props 变化也要重新计算
     *  - hideExpandedColumn
     *  - rowSelection 从 trusy 变为 falsy 或 rowSelection.hidden 发生变化
     *  - isAnyFixedRight(columns) || get(scroll, 'y') 发生变化
     *
     * @param {Array} queries
     * @param {Array} cachedColumns
     * @returns columns after adding extended functions
     */
    function handleColumns(queries: ColumnProps<RecordType>[], cachedColumns: ColumnProps<RecordType>[]) {
      const { hideExpandedColumn, scroll, prefixCls, expandCellFixed, expandIcon, rowSelection } = props;
      const childrenColumnName = 'children';
      let columns: ColumnProps<RecordType>[] = cloneDeep(cachedColumns);

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const addFns = (columns: ColumnProps<RecordType>[] = []) => {
        if (Array.isArray(columns) && columns.length) {
          each(columns, (column, index, originColumns) => {
            const newColumn = addFnsInColumn(column);
            const children = column[childrenColumnName];
            if (Array.isArray(children) && children.length) {
              const newChildren = [...children];
              addFns(newChildren);
              newColumn[childrenColumnName] = newChildren;
            }
            originColumns[index] = newColumn;
          });
        }
      };

      addFns(columns);

      // hideExpandedColumn=false render expand column separately
      if (!hideExpandedColumn) {
        const column = normalizeExpandColumn({ prefixCls, expandCellFixed, expandIcon });

        const destIndex = findIndex(columns, (item) => item.key === strings.DEFAULT_KEY_COLUMN_EXPAND);
        if (column) {
          if (destIndex > -1) {
            columns[destIndex] = { ...column, ...columns[destIndex] };
          } else if (column.fixed === 'right') {
            columns = [...columns, column];
          } else {
            columns = [column, ...columns];
          }
        }
      }

      // selection column
      if (rowSelection && !get(rowSelection, 'hidden')) {
        const destIndex = findIndex(columns, (item) => item.key === strings.DEFAULT_KEY_COLUMN_SELECTION);
        const column = normalizeSelectionColumn({ rowSelection, prefixCls });

        if (destIndex > -1) {
          columns[destIndex] = { ...column, ...columns[destIndex] };
        } else if (column.fixed === 'right') {
          columns = [...columns, column];
        } else {
          columns = [column, ...columns];
        }
      }

      assignColumnKeys(columns);

      return columns;
    }

    /**
     * Convert children to columns object
     * @param {Array} columns
     * @param {VueJsxNode} children
     * @returns {Array}
     */
    const normalizeColumns = (columns: ColumnProps<RecordType>[], children: VueJsxNode) => {
      // TODO
      console.error('TODO');
      const normalColumns = cloneDeep(getColumns(columns, children));
      return normalColumns;
    };

    /**
     * Combine pagination and table paging processing functions
     */
    function mergePagination(pagination: TablePaginationProps) {
      const newPagination = { onChange: foundation.setPage, ...pagination };
      return newPagination;
    }

    expose({
      getCurrentPageData
    })
    return () => {
      let {
        scroll,
        prefixCls,
        className,
        style = {},
        bordered,
        id,
        pagination: propPagination,
        virtualized,
        size,
        renderPagination: propRenderPagination,
        getVirtualizedListRef,
        loading,
        hideExpandedColumn,
        rowSelection: propRowSelection,
        children,
        ...rest
      } = props;

      const wrapStyle: CSSProperties = {
        ...props.style,
      };

      let columns: ColumnProps<RecordType>[];
      /**
       * As state.queries will change, the columns should be refreshed as a whole at this time
       * The scene of changes in queries
       * 1. Filter
       * 2. Pagination
       *
       * useFullRender needs to be passed to the user selection VueJsxNode, so columns need to be recalculated every time the selectedRowKeys changes
       * TODO: In the future, the selection passed to the user can be changed to the function type, allowing the user to execute the function to obtain the real-time status of the selection title
       *
       * 由于state.queries会发生变化，此时columns应该整体刷新
       * queries变化的场景
       *  1. 筛选
       *  2. 分页
       * useFullRender需要传给用户selection VueJsxNode，因此需要每次selectedRowKeys变化时重新计算columns
       * TODO: 未来可以将传给用户的selection改为函数类型，让用户执行函数获取selection title的实时状态
       */
      if (!adapter.isAnyColumnUseFullRender(state.queries as any)) {
        const rowSelectionUpdate: boolean = propRowSelection && !get(propRowSelection, 'hidden');
        columns = foundation.memoizedWithFnsColumns(
          state.queries as any,
          state.cachedColumns as any,
          rowSelectionUpdate,
          hideExpandedColumn,
          // Update the columns after the body scrollbar changes to ensure that the head and body are aligned
          state.bodyHasScrollBar
        );
      } else {
        columns = handleColumns(state.queries as any, state.cachedColumns as any);
      }
      const filteredColumns: ColumnProps<RecordType>[] = foundation.memoizedFilterColumns(columns as any);
      const flattenFnsColumns: ColumnProps<RecordType>[] = foundation.memoizedFlattenFnsColumns(columns as any);

      const anyColumnFixed = adapter.isAnyColumnFixed(columns as any);

      /**
       * - If it is the first page break, you need to calculate the current page
       * - If it is manual paging, call foundation to modify the state
       *
       * TODO: After merging issue 1007, you can place it in the constructor to complete
       * The reason is that #1007 exposes the parameters required by getCurrentPageData in the constructor
       */
      // if (isNull(state.dataSource)) {
      //   const pageData: BasePageData<RecordType> = foundation.getCurrentPageData(props.dataSource);
      //   state.dataSource = pageData.dataSource as any;
      //   state.pagination = pageData.pagination;
      // }
      // TODO 拿到state的原始数据
      const stateObj = { ...toRaw(state) };

      const props_ = {
        ...rest,
        ...stateObj,
        // props not in rest
        virtualized,
        scroll,
        prefixCls,
        size,
        hideExpandedColumn,
        // renamed state
        columns,
        // calculated value
        anyColumnFixed,
        rowExpandable: mergedRowExpandable,
        pagination: state.pagination,
        dataSource: state.dataSource,
        rowSelection: state.rowSelection,
        expandedRowKeys: state.expandedRowKeys,
        renderExpandIcon: renderExpandIcon,
        filteredColumns,
      };

      const x = get(scroll, 'x');
      const y = get(scroll, 'y');

      if (virtualized) {
        if (isNaN(parseInt('' + wrapStyle.width))) {
          wrapStyle.width = x + 'px';
        } else {
          wrapStyle.width = typeof wrapStyle.width === 'string' ? wrapStyle.width : wrapStyle.width + 'px';
        }
      }

      const wrapCls = classnames({
        [`${prefixCls}-${strings.SIZE_SMALL}`]: size === strings.SIZE_SMALL,
        [`${prefixCls}-${strings.SIZE_MIDDLE}`]: size === strings.SIZE_MIDDLE,
        [`${prefixCls}-virtualized`]: Boolean(virtualized),
        [`${prefixCls}-bordered`]: bordered,
        [`${prefixCls}-fixed-header`]: Boolean(y),
        [`${prefixCls}-scroll-position-left`]: ['both', 'left'].includes(position),
        [`${prefixCls}-scroll-position-right`]: ['both', 'right'].includes(position),
      });

      // pagination
      const tablePagination =
        state.pagination && propPagination ? renderPagination(state.pagination as any, propRenderPagination) : null;
      const paginationPosition = get(propPagination, 'position', 'bottom');

      const tableContextValue: TableContextProps = {
        ...(context.value as any),
        headWidths: state.headWidths as any,
        tableWidth: state.tableWidth as any,
        anyColumnFixed,
        flattenedColumns: flattenFnsColumns,
        renderExpandIcon: renderExpandIcon,
        renderSelection: renderSelection,
        setHeadWidths: setHeadWidths,
        getHeadWidths: getHeadWidths,
        getCellWidths: getCellWidths,
        handleRowExpanded: handleRowExpanded,
        getVirtualizedListRef,
        setBodyHasScrollbar: setBodyHasScrollbar,
      };
      if (props.direction){
        tableContextValue.direction = props.direction
      }
      const dataAttr = getDataAttr();
      return (
        <div
          ref={rootWrapRef}
          class={classnames(className, `${prefixCls}-wrapper`, `${prefixCls}-wrapper-${props.direction}`)}
          data-column-fixed={anyColumnFixed}
          style={wrapStyle}
          id={id}
          {...dataAttr}
        >
          <TableContextProvider {...tableContextValue}>
            <Spin spinning={loading} size="large">
              <div ref={wrapRef} class={wrapCls}>
                <Fragment key={'pagination-top'}>
                  {['top', 'both'].includes(paginationPosition) ? tablePagination : null}
                </Fragment>{' '}
                {renderTitle({
                  title: (props as any).title,
                  dataSource: props.dataSource,
                  prefixCls: props.prefixCls,
                })}
                <div class={`${prefixCls}-container`}>{renderMainTable({ ...props_ })}</div>
                <Fragment key={'pagination-bottom'}>
                  {['bottom', 'both'].includes(paginationPosition) ? tablePagination : null}
                </Fragment>
              </div>
            </Spin>
          </TableContextProvider>
        </div>
      );
    };
  }, {
    props: vuePropsType,
    name: 'Table'
  });

  return TableComp;
}

export default Table;
