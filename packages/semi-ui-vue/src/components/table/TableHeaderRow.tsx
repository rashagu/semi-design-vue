
import classnames from 'classnames';
import * as PropTypes from '../PropTypes';
import { get, noop, map, set, omit, findIndex } from 'lodash';

import { cssClasses } from '@douyinfe/semi-foundation/table/constants';
import {
    arrayAdd,
    isFirstFixedRight,
    isLastLeftFixed,
    isFixedLeft,
    isFixedRight,
    sliceColumnsByLevel,
    getRTLAlign
} from '@douyinfe/semi-foundation/table/utils';
import { TableComponents, OnHeaderRow, Fixed } from './interface';
import {CSSProperties, defineComponent, h, reactive, useSlots, watch} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useBaseComponent} from "../_base/baseComponent";
import {TableSelectionCellProps} from "./ColumnSelection";
import {useTableContext} from "./tableContext/Consumer";

export interface TableHeaderRowProps {
    components?: TableComponents;
    row?: any[];
    prefixCls?: string;
    onHeaderRow?: OnHeaderRow<any>;
    index?: number;
    style?: CSSProperties;
    columns?: any[];
    fixed?: Fixed;
    selectedRowKeysSet: Set<any>
}


const propTypes = {
    components: PropTypes.object,
    row: PropTypes.array,
    prefixCls: PropTypes.string,
    onHeaderRow: PropTypes.func,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    columns: PropTypes.array,
    fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    selectedRowKeysSet: PropTypes.object,
};

const defaultProps = {
    onHeaderRow: noop,
    prefixCls: cssClasses.PREFIX,
    columns: [] as [],
    components: {
        header: {
            wrapper: 'thead',
            row: 'tr',
            cell: 'th',
        },
    },
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const TableHeaderRow = defineComponent<TableHeaderRowProps>((props, {}) => {
    const slots = useSlots();
    let headerNode: HTMLElement = null;
    const {context} = useTableContext()

    const state = reactive({})
    const {adapter: adapterInject} = useBaseComponent<TableSelectionCellProps>(props, state)

    const adapter = adapterInject()

    const cacheRef = (node: HTMLElement) => {
        headerNode = node;
        if (node && context.value.setHeadWidths) {
            const { prefixCls, row, index } = props;
            const cellSelector = `.${prefixCls}-row-head`;
            const heads = node && node.querySelectorAll && node.querySelectorAll(cellSelector);

            context.value.setHeadWidths(
              map(heads, (head, headIndex) => {
                  let configWidth = get(row, [headIndex, 'column', 'width']);
                  const key = get(row, [headIndex, 'column', 'key']);
                  if (typeof configWidth !== 'number') {
                      configWidth = (head && head.getBoundingClientRect().width) || 0;
                  }
                  return { width: configWidth, key };
              }),
              index
            );
        }
    };

    watch(()=>props.columns, (value, oldValue, onCleanup)=>{

        if (oldValue !== props.columns && headerNode) {
            cacheRef(headerNode);
        }
    })


    return () => {

        const { components, row, prefixCls, onHeaderRow, index, style, columns } = props;
        const { getCellWidths, direction } = context.value;
        const isRTL = direction === 'rtl';
        const slicedColumns = sliceColumnsByLevel(columns, index);
        const headWidths = getCellWidths?.(slicedColumns) || [];

        const HeaderRow = get(components, 'header.row', 'tr');
        const HeaderCell = get(components, 'header.cell', 'th');

        const rowProps = onHeaderRow(columns, index) || {};
        set(rowProps, 'className', classnames(get(rowProps, 'className'), `${prefixCls}-row`));

        const cells = map(row, (cell, cellIndex) => {
            const { column, ...cellProps } = cell;
            const customProps =
              typeof column.onHeaderCell === 'function' ? column.onHeaderCell(column, cellIndex, index) : {};
            let cellStyle = { ...customProps.style };
            if (column.align) {
                const textAlign = getRTLAlign(column.align, direction);
                cellStyle = { ...cellStyle, textAlign };
                customProps.className = classnames(customProps.className, column.className, {
                    [`${prefixCls}-align-${textAlign}`]: Boolean(textAlign),
                });
            }

            let fixedLeft, fixedRight, fixedLeftLast, fixedRightFirst;
            if (isRTL) {
                fixedLeft = isFixedRight(column);
                fixedRight = isFixedLeft(column);
                fixedLeftLast = isFirstFixedRight(slicedColumns, column);
                fixedRightFirst = isLastLeftFixed(slicedColumns, column);
            } else {
                fixedLeft = isFixedLeft(column);
                fixedRight = isFixedRight(column);
                fixedLeftLast = isLastLeftFixed(slicedColumns, column);
                fixedRightFirst = isFirstFixedRight(slicedColumns, column);
            }

            customProps.className = classnames(
              `${prefixCls}-row-head`,
              column.className,
              customProps.className,
              // `${prefixCls}-fixed-columns`,
              {
                  [`${prefixCls}-cell-fixed-left`]: fixedLeft,
                  [`${prefixCls}-cell-fixed-left-last`]: fixedLeftLast,
                  [`${prefixCls}-cell-fixed-right`]: fixedRight,
                  [`${prefixCls}-cell-fixed-right-first`]: fixedRightFirst,
                  [`${prefixCls}-row-head-ellipsis`]: column.ellipsis,
              }
            );

            if (headWidths.length && slicedColumns.length) {
                const indexOfSlicedColumns = findIndex(
                  slicedColumns,
                  item => item && item.key != null && item.key === column.key
                );
                if (indexOfSlicedColumns > -1) {
                    if (isFixedLeft(column)) {
                        const xPositionKey = isRTL ? 'right' : 'left';
                        cellStyle = {
                            ...cellStyle,
                            position: 'sticky',
                            [xPositionKey]: arrayAdd(headWidths, 0, indexOfSlicedColumns),
                        };
                    } else if (isFixedRight(column)) {
                        const xPositionKey = isRTL ? 'left' : 'right';
                        cellStyle = {
                            ...cellStyle,
                            position: 'sticky',
                            [xPositionKey]: arrayAdd(headWidths, indexOfSlicedColumns + 1),
                        };
                    }
                }
            }

            const props = omit({ ...cellProps, ...customProps }, [
                'colStart',
                'colEnd',
                'hasSubColumns',
                'parents',
                'level',
            ]);

            const { rowSpan, colSpan } = props;
            if (rowSpan === 0 || colSpan === 0) {
                return null;
            }

            if (cellStyle.left && typeof cellStyle.left === 'number'){
                cellStyle.left = cellStyle.left + 'px'
            }

            if (cellStyle.right && typeof cellStyle.right === 'number'){
                cellStyle.right = cellStyle.right + 'px'
            }
            return (
              <HeaderCell
                role="columnheader"
                aria-colindex={cellIndex + 1}
                {...omit(props, 'children')}
                style={cellStyle}
                key={column.key || column.dataIndex || cellIndex}
              >
                  {props.children}
              </HeaderCell>
            );
        });

        return (
          <HeaderRow
            role="row"
            aria-rowindex={index + 1}
            {...rowProps}
            style={style}
            ref={cacheRef as any}
          >
              {cells}
          </HeaderRow>
        );
    };
});

TableHeaderRow.props = vuePropsType;
TableHeaderRow.name = "TableHeaderRow";

export default TableHeaderRow;
