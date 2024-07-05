import * as PropTypes from '../../PropTypes';
import classnames from 'classnames';
import { get, set, isNull } from 'lodash';

import { cssClasses, strings } from '@douyinfe/semi-foundation/table/constants';
import { arrayAdd, filterColumns } from '@douyinfe/semi-foundation/table/utils';
import Store from '@douyinfe/semi-foundation/utils/Store';
import TableContext, { TableContextProps } from '../table-context';
import TableRow from './BaseRow';
import { amendTableWidth } from '../utils';
import { ColumnProps, ExpandIcon, TableComponents, Virtualized, Fixed } from '../interface';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, isVNode, PropType, useSlots } from 'vue';
import { vuePropsMake } from '../../PropTypes';
import { useTableContext } from '../tableContext/Consumer';
import { VueJsxNode } from '../../interface';
import { styleNum } from '../../_utils';

export interface TableExpandedRowProps {
  cellWidths: number[]; // required
  className?: string;
  columns?: ColumnProps[];
  components?: TableComponents;
  defaultExpandAllRows?: boolean;
  defaultExpandedRowKeys?: (string | number)[];
  expandIcon?: ExpandIcon;
  expandRowByClick?: boolean;
  expanded?: boolean;
  expandedRowKeys?: (string | number)[];
  expandedRowRender?: (record?: Record<string, any>, index?: number, expanded?: boolean) => ExpandedRowRenderReturnType;
  indentSize?: number;
  index?: number;
  prefixCls?: string;
  record?: Record<string, any>;
  renderExpandIcon?: (record?: Record<string, any>, isNested?: boolean) => VueJsxNode | null;
  store?: Store;
  style?: CSSProperties;
  virtualized?: Virtualized;
  displayNone?: boolean;
  onExpand?: any;
  onExpandedRowsChange?: any;
}

const propTypes: ComponentObjectPropsOptions<TableExpandedRowProps> = {
  cellWidths: PropTypes.array,
  className: PropTypes.string,
  columns: PropTypes.array,
  components: PropTypes.object,
  defaultExpandAllRows: PropTypes.bool,
  defaultExpandedRowKeys: PropTypes.array,
  expandIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.node, PropTypes.func]),
  expandRowByClick: PropTypes.bool,
  expanded: PropTypes.bool,
  expandedRowKeys: PropTypes.array,
  expandedRowRender: PropTypes.func as PropType<TableExpandedRowProps['expandedRowRender']>,
  indentSize: PropTypes.number,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onExpand: PropTypes.func as PropType<TableExpandedRowProps['onExpand']>,
  onExpandedRowsChange: PropTypes.func as PropType<TableExpandedRowProps['onExpandedRowsChange']>,
  prefixCls: PropTypes.string,
  record: PropTypes.object,
  renderExpandIcon: PropTypes.func as PropType<TableExpandedRowProps['renderExpandIcon']>,
  store: PropTypes.object,
  style: PropTypes.object,
  virtualized: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};
const defaultProps = {
  record: {},
  prefixCls: cssClasses.PREFIX,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const TableExpandedRow = defineComponent({
  props: vuePropsType,
  name: 'TableExpandedRow',
  setup(props, {}) {
    const slots = useSlots();
    const { context } = useTableContext();

    return () => {
      const {
        record,
        columns: propColumns = [],
        prefixCls,
        className,
        expanded,
        expandedRowRender,
        renderExpandIcon,
        index,
        store,
        components,
        style,
        virtualized,
        indentSize,
        cellWidths,
        displayNone,
      } = props;
      const { tableWidth, anyColumnFixed, getCellWidths } = context.value;
      const cell: ExpandedRowRenderReturnType = expandedRowRender(record, index, expanded);
      let children: VueJsxNode = null;
      const props_: { colSpan?: number; style?: Record<string, any> } = {};
      let column = {};
      if (isNull(cell)) {
        return null;
      } else if (isVNode(cell)) {
        children = cell;
      } else if (cell && Object.prototype.toString.call(cell) === '[object Object]') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children: cellChildren, fixed, ...restProps } = cell as { children: VueJsxNode; fixed: Fixed };
        children = cellChildren;
        column = { ...restProps };
      }

      if ((get(components, 'body.cell') as any) !== strings.DEFAULT_COMPONENTS.body.cell) {
        if (virtualized) {
          set(props_, 'style.height', '100%');
        }
        set(props_, 'style.display', 'block');
        set(props_, 'style.width', arrayAdd(cellWidths, 0, propColumns.length));
      } else {
        // Remove the row where the scroll bar is located
        props_.colSpan = filterColumns(propColumns).length;
      }

      const columns = [
        {
          render: () => ({
            props: props_,
            children: (
              <div
                class={classnames(`${prefixCls}-expand-inner`)}
                style={{
                  width: anyColumnFixed ? styleNum(amendTableWidth(tableWidth)) : undefined,
                }}
              >
                {children}
              </div>
            ),
          }),
          ...column,
        },
      ];

      const rowCls = classnames(className, `${prefixCls}-row-expand`);
      const baseRowCellWidths = getCellWidths(columns);

      return (
        <TableRow
          style={style}
          components={components}
          className={rowCls}
          expandedRow={true}
          renderExpandIcon={renderExpandIcon}
          rowKey={`${record.key}-expanded-row`}
          columns={columns}
          store={store}
          virtualized={virtualized}
          indentSize={indentSize}
          cellWidths={baseRowCellWidths}
          displayNone={displayNone}
        />
      );
    };
  },
});

export default TableExpandedRow;

export type ExpandedRowRenderReturnType = VueJsxNode | ({ children: VueJsxNode; fixed: Fixed } & ColumnProps);
