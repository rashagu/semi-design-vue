import { merge, get, find, noop } from 'lodash';
import * as PropTypes from '../PropTypes';
import { addClass, removeClass } from '@douyinfe/semi-foundation/utils/classnames';
import { strings, numbers } from '@douyinfe/semi-foundation/table/constants';
import { assignColumnKeys, findColumn, withResizeWidth } from '@douyinfe/semi-foundation/table/utils';

import Table_ from './Table';
import { cloneDeep, mergeColumns } from './utils';
import getColumns from './getColumns';
import ResizableHeaderCell from './ResizableHeaderCell';
import {
    TableProps,
    ColumnProps,
} from './interface';
import {computed, CSSProperties, defineComponent, h, ref, useSlots, watch} from "vue";
import {VueJsxNode} from "../interface";

const Table = Table_()
export const vuePropsType = {
    bordered: PropTypes.bool,
    children: PropTypes.element,
    childrenRecordName: PropTypes.string,
    className: PropTypes.string,
    clickGroupedRowToExpand: PropTypes.bool,
    columns: PropTypes.array,
    components: PropTypes.element,
    dataSource: PropTypes.array,
    defaultExpandAllGroupRows: PropTypes.bool,
    defaultExpandAllRows: PropTypes.bool,
    defaultExpandedRowKeys: PropTypes.array,
    empty: PropTypes.element,
    expandAllGroupRows: PropTypes.bool,
    expandAllRows: PropTypes.bool,
    expandCellFixed: PropTypes.bool,
    expandIcon: PropTypes.element,
    expandedRowKeys: PropTypes.array,
    expandedRowRender: PropTypes.func,
    expandRowByClick: PropTypes.bool,
    footer: PropTypes.element,
    getVirtualizedListRef: PropTypes.element,
    groupBy: PropTypes.element,
    hideExpandedColumn: PropTypes.bool,
    id: PropTypes.string,
    indentSize: PropTypes.number,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    prefixCls: PropTypes.string,
    renderGroupSection: PropTypes.element,
    renderPagination: PropTypes.element,
    resizable: [PropTypes.bool, PropTypes.object],
    rowExpandable: PropTypes.any,
    rowKey: PropTypes.string,
    rowSelection: PropTypes.element,
    scroll: PropTypes.any,
    showHeader: PropTypes.bool,
    size: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.element,
    virtualized: PropTypes.bool,
    onChange: PropTypes.func,
    onExpand: PropTypes.func,
    onExpandedRowsChange: PropTypes.func,
    onGroupedRow: PropTypes.func,
    onHeaderRow: PropTypes.func,
    onRow: PropTypes.func,
    sticky: PropTypes.element,
    direction: PropTypes.string,
};
const ResizableTable = defineComponent<TableProps>((props, {}) => {
    const slots = useSlots();
    const childrenColumnName = 'children';

    const columns = ref<Record<string, any>[]>([]);
    watch([
        () => props.columns,
        () => props.expandedRowRender,
        () => props.hideExpandedColumn,
        () => props.rowSelection
    ], () => {

        const { columns: propColumns } = props;
        /**
         * 此处关于 columns 有三个存储
         *
         * 1. rawColumns 是根据 props.columns 或者 props.children 解析出来的原始 columns
         * 2. newColumns 是 rawColumns 的深拷贝，同时根据 props.expandedRowRender、props.hideExpandedColumn 和 props.rowSelection
         * 这三个参数加入了【选择列】以及【展开列】
         * 3. columns 是当前组件中存储的 state，一般情况下与 newColumns 相等，但是会保存列当前伸缩的宽度
         */

        /**
         * There are three stores for columns here
         *
         * 1. rawColumns are the original columns parsed according to props.columns or props.children
         * 2. newColumns is a deep copy of rawColumns, based on props.expandedRowRender, props.hideExpandedColumn and props.rowSelection
         * These three parameters have been added [Select Column] and [Expand Column]
         * 3. columns is the state stored in the current component, which is generally equal to newColumns, but it will save the current stretched width of the column
         */

        const parsedColumns = Array.isArray(propColumns) && propColumns.length ? propColumns : getColumns(props.children);

        const rawColumns = assignColumnKeys(cloneDeep(parsedColumns), childrenColumnName);

        const newColumns = assignColumnKeys(cloneDeep(parsedColumns), childrenColumnName);

        if (
          typeof props.expandedRowRender === 'function' &&
          !props.hideExpandedColumn &&
          !find(rawColumns, item => item.key === strings.DEFAULT_KEY_COLUMN_EXPAND)
        ) {
            newColumns.unshift({ key: strings.DEFAULT_KEY_COLUMN_EXPAND, width: numbers.DEFAULT_WIDTH_COLUMN_EXPAND });
        }

        if (props.rowSelection && !find(rawColumns, item => item.key === strings.DEFAULT_KEY_COLUMN_SELECTION)) {
            newColumns.unshift({
                width: get(props, 'rowSelection.width', numbers.DEFAULT_WIDTH_COLUMN_SELECTION),
                key: strings.DEFAULT_KEY_COLUMN_SELECTION,
            });
        }

        const oldColumns = Array.from(columns.value)
        // If there is a resize value, the width does not use the default value fix#1072
        const _newColumns = withResizeWidth(oldColumns, newColumns);
        columns.value = mergeColumns(oldColumns, _newColumns)
    }, {deep: true, immediate: true});


    const components = computed(()=>{
        return merge(
          {
              header: {
                  cell: ResizableHeaderCell,
              },
          },
          props.components
        )
    })


    const handleResize = (column: ColumnProps) => (e: MouseEvent, { size }: { size: { width: number } }) => {
        const onResize = get(props.resizable, 'onResize', noop);

        const nextColumns = cloneDeep(columns.value);
        const curColumn: ColumnProps = findColumn(nextColumns, column, childrenColumnName);
        let nextColumn = {
            ...curColumn,
            width: size.width,
        };

        const customProps = onResize(nextColumn) || {};

        nextColumn = {
            ...nextColumn,
            ...customProps,
        };

        Object.assign(curColumn, nextColumn);
        columns.value = nextColumns
    };

    const handleResizeStart = (column: ColumnProps<any>) => (e: MouseEvent) => {
        const onResizeStart = get(props.resizable, 'onResizeStart', noop);
        const handlerClassName = get(props.resizable, 'handlerClassName', 'resizing');

        const nextColumns = cloneDeep(columns.value);

        const curColumn: ColumnProps = findColumn(nextColumns, column, childrenColumnName);

        let nextColumn: ColumnProps = {
            ...curColumn,
            className: addClass(curColumn.className, handlerClassName),
        };

        const customProps = onResizeStart(nextColumn) || {};

        nextColumn = {
            ...nextColumn,
            ...customProps,
        };

        Object.assign(curColumn, nextColumn);

        columns.value = nextColumns
    };

    const handleResizeStop = (column: ColumnProps) => (e: MouseEvent) => {
        const onResizeStop = get(props.resizable, 'onResizeStop', noop);
        const handlerClassName = get(props.resizable, 'handlerClassName', 'resizing');
        const nextColumns = cloneDeep(columns.value);

        const curColumn: ColumnProps = findColumn(nextColumns, column, childrenColumnName);

        let nextColumn = {
            ...curColumn,
            className: removeClass(curColumn.className, handlerClassName),
        };

        const customProps = onResizeStop(nextColumn) || {};

        nextColumn = {
            ...nextColumn,
            ...customProps,
        };

        Object.assign(curColumn, nextColumn);

        columns.value = nextColumns
    };

    const resizableRender = (col: ColumnProps, index: number, level = 0) => ({
        ...col,
        onHeaderCell: (column: ColumnProps) => ({
            width: column.width,
            onResize: handleResize(column),
            onResizeStart: handleResizeStart(column),
            onResizeStop: handleResizeStop(column),
        }),
    });

    const assignResizableRender = (columns: ColumnProps[] = [], level = 0) => (Array.isArray(columns) && columns.length ?
      columns.map((col, index) => {
          Object.assign(col, resizableRender(col, index, level));
          const children = col[childrenColumnName];

          if (Array.isArray(children) && children.length) {
              col[childrenColumnName] = assignResizableRender(children, level + 1);
          }

          return col;
      }) :
      []);

    const finalColumns = computed(()=>{
        return assignResizableRender(columns.value)
    });

    return () => {

        const { components: propComponents, columns: propColumns, resizable, ...restProps } = props;

        return <Table {...restProps} columns={finalColumns.value} components={components.value} />;
    };
});

ResizableTable.props = vuePropsType;
ResizableTable.name = "ResizableTable";

export default ResizableTable;
