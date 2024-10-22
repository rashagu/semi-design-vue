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
  getRTLAlign,
} from '@douyinfe/semi-foundation/table/utils';
import { TableComponents, OnHeaderRow, Fixed, TableLocale } from './interface';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  PropType,
  reactive,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
import { TableSelectionCellProps } from './ColumnSelection';
import { useTableContext } from './tableContext/Consumer';
import type { TableHeaderCell } from './TableHeader';
import { CombineProps } from '../interface';
import Tooltip from '../tooltip';
import LocaleConsumer from '../locale/localeConsumer';
import { getNextSortOrder } from './utils';

export interface TableHeaderRowProps {
  components?: TableComponents;
  row?: TableHeaderCell[];
  prefixCls?: string;
  onHeaderRow?: OnHeaderRow<any>;
  index?: number;
  style?: CSSProperties;
  columns?: any[];
  fixed?: Fixed;
  selectedRowKeysSet: Set<any>;
}

const propTypes: CombineProps<TableHeaderRowProps> = {
  components: PropTypes.object,
  row: PropTypes.array,
  prefixCls: PropTypes.string,
  onHeaderRow: PropTypes.func as PropType<TableHeaderRowProps['onHeaderRow']>,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  columns: PropTypes.array,
  fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  selectedRowKeysSet: {
    type: PropTypes.object,
    required: true
  },
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
const TableHeaderRow = defineComponent({
  props: { ...vuePropsType },
  name: 'TableHeaderRow',
  setup(props, {}) {
    const slots = useSlots();
    let headerNode: HTMLElement = null;
    const { context } = useTableContext();

    const state = reactive({});
    const { adapter: adapterInject } = useBaseComponent<TableSelectionCellProps>(props, state);

    const adapter = adapterInject();

    const cacheRef = (node: HTMLElement) => {
      headerNode = node;
      if (node && context.value.setHeadWidths) {
        const { prefixCls, row, index } = props;
        const cellSelector = `.${prefixCls}-row-head`;
        const heads = node && node.querySelectorAll && node.querySelectorAll(cellSelector);

        context.value.setHeadWidths(
          map(heads, (head, headIndex) => {
            let configWidth = get(row, [headIndex, 'column', 'width']);
            const key = get(row, [headIndex, 'column', 'key']) as any;
            if (typeof configWidth !== 'number') {
              configWidth = (head && head.getBoundingClientRect().width) || 0;
            }
            return { width: configWidth, key };
          }),
          index
        );
      }
    };

    watch(
      () => props.columns,
      (value, oldValue, onCleanup) => {
        if (oldValue !== props.columns && headerNode) {
          cacheRef(headerNode);
        }
      }
    );

    return () => {
      const { components, row, prefixCls, onHeaderRow, index, style, columns } = props;
      const { getCellWidths, direction } = context.value;
      const isRTL = direction === 'rtl';
      const slicedColumns = sliceColumnsByLevel(columns, index);
      const headWidths = getCellWidths?.(slicedColumns) || [];

      const HeaderRow = get(components, 'header.row', 'tr') as any;
      const HeaderCell = get(components, 'header.cell', 'th') as any;

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
            (item) => item && item.key != null && item.key === column.key
          );
          if (indexOfSlicedColumns > -1) {
            if (isFixedLeft(column)) {
              const xPositionKey = isRTL ? 'right' : 'left';
              cellStyle = {
                ...cellStyle,
                position: 'sticky',
                [xPositionKey]: arrayAdd(headWidths, 0, indexOfSlicedColumns) + 'px',
              };
            } else if (isFixedRight(column)) {
              const xPositionKey = isRTL ? 'left' : 'right';
              cellStyle = {
                ...cellStyle,
                position: 'sticky',
                [xPositionKey]: arrayAdd(headWidths, indexOfSlicedColumns + 1) + 'px',
              };
            }
          }
        }

        Object.assign(cellProps, { resize: column.resize });
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

        if (typeof column.clickToSort === 'function') {
          if (props.onClick) {
            props.onClick = (e: any) => {
              props.onClick(e);
              column.clickToSort(e);
            };
          } else {
            props.onClick = column.clickToSort;
          }
        }

        const headerCellNode = (<HeaderCell
          role="columnheader"
          aria-colindex={cellIndex + 1}
          {...(omit(props, 'children'))}
          style={cellStyle}
          key={column.key || column.dataIndex || cellIndex}
        >
          {props.children}
        </HeaderCell>);
        if (typeof column.clickToSort === 'function' && column.showSortTip === true) {
          let content = getNextSortOrder(column.sortOrder);
          return (<LocaleConsumer
            componentName="Table"
            key={column.key || column.dataIndex || cellIndex}
          >
            {(locale: TableLocale, localeCode: string) => (
              <Tooltip content={locale[content]}>
                {headerCellNode}
              </Tooltip>
            )}
          </LocaleConsumer>);
        }

        return headerCellNode;
      });

      return (
        <HeaderRow role="row" aria-rowindex={index + 1} {...rowProps} style={style} ref={cacheRef as any}>
          {cells}
        </HeaderRow>
      );
    };
  },
});

export default TableHeaderRow;
