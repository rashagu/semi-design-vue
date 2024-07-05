import classnames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { each, noop, get, stubTrue, omit, isEqual, pick } from 'lodash';

import { strings, cssClasses } from '@douyinfe/semi-foundation/table/constants';
import shallowEqualObjects from '@douyinfe/semi-foundation/utils/shallowEqualObjects';
import TableRowFoundation, { TableRowAdapter } from '@douyinfe/semi-foundation/table/tableRowFoundation';
import {
  isLastLeftFixed,
  arrayAdd,
  isFixedLeft,
  isFixedRight,
  isScrollbarColumn,
  isFirstFixedRight,
  isInnerColumnKey,
  isExpandedColumn,
} from '@douyinfe/semi-foundation/table/utils';
import Store from '@douyinfe/semi-foundation/utils/Store';
import { BaseRowKeyType } from '@douyinfe/semi-foundation/table/foundation';

import TableCell from '../TableCell';
import { ColumnProps, Fixed, TableComponents, Virtualized, ExpandIcon, OnRow, RowExpandable } from '../interface';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  h,
  PropType,
  useSlots,
} from 'vue';
import { vuePropsMake } from '../../PropTypes';
import { useBaseComponent } from '../../_base/baseComponent';
import { VueJsxNode } from '../../interface';

export interface BaseRowProps {
  anyColumnFixed?: boolean;
  cellWidths?: number[];
  className?: string;
  columns: ColumnProps[]; // required
  components?: TableComponents; // required
  disabled?: boolean;
  expandIcon?: ExpandIcon;
  expandableRow?: boolean;
  expanded?: boolean;
  expandedRow?: boolean;
  fixed?: Fixed;
  height?: string | number;
  hideExpandedColumn?: boolean;
  hovered?: boolean; // required
  indent?: number;
  indentSize?: number;
  index?: number;
  isSection?: boolean;
  level?: number;
  onDidUpdate?: (ref: any) => void;
  onHover?: (mouseEnter: boolean, rowKey: string | number) => void;
  onRow?: OnRow<any>;
  onRowClick?: (rowKey: BaseRowKeyType, e: MouseEvent, expand: boolean) => void;
  onRowContextMenu?: (record: Record<string, any>, e: MouseEvent) => void;
  onRowDoubleClick?: (record: Record<string, any>, e: MouseEvent) => void;
  onRowMouseEnter?: (record: Record<string, any>, e: MouseEvent) => void;
  onRowMouseLeave?: (record: Record<string, any>, e: MouseEvent) => void;
  prefixCls?: string;
  record?: Record<string, any>;
  renderExpandIcon?: RenderExpandIcon;
  replaceClassName?: string;
  rowExpandable?: RowExpandable<any>;
  rowKey?: string | number; // required, this place rowKey is a real key of the row
  selected?: boolean;
  store?: Store;
  style?: CSSProperties;
  virtualized?: Virtualized;
  visible?: boolean; // required
  /** whether display none */
  displayNone?: boolean;
}

const propTypes: ComponentObjectPropsOptions<BaseRowProps> = {
  anyColumnFixed: PropTypes.bool,
  cellWidths: PropTypes.array,
  className: PropTypes.string,
  columns: PropTypes.array,
  components: PropTypes.object,
  disabled: PropTypes.bool,
  expandIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.node]),
  expandableRow: PropTypes.bool,
  expanded: PropTypes.bool,
  displayNone: PropTypes.bool,
  expandedRow: PropTypes.bool,
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideExpandedColumn: PropTypes.bool,
  hovered: PropTypes.bool,
  indent: PropTypes.number,
  indentSize: PropTypes.number,
  index: PropTypes.number,
  isSection: PropTypes.bool,
  level: PropTypes.number,
  onDidUpdate: PropTypes.func as PropType<BaseRowProps['onDidUpdate']>,
  onHover: PropTypes.func as PropType<BaseRowProps['onHover']>,
  onRow: PropTypes.func as PropType<BaseRowProps['onRow']>,
  onRowClick: PropTypes.func as PropType<BaseRowProps['onRowClick']>,
  onRowContextMenu: PropTypes.func as PropType<BaseRowProps['onRowContextMenu']>,
  onRowDoubleClick: PropTypes.func as PropType<BaseRowProps['onRowDoubleClick']>,
  onRowMouseEnter: PropTypes.func as PropType<BaseRowProps['onRowMouseEnter']>,
  onRowMouseLeave: PropTypes.func as PropType<BaseRowProps['onRowMouseLeave']>,
  prefixCls: PropTypes.string,
  record: PropTypes.object,
  renderExpandIcon: PropTypes.func as PropType<BaseRowProps['renderExpandIcon']>,
  replaceClassName: PropTypes.string,
  rowExpandable: PropTypes.func as PropType<BaseRowProps['rowExpandable']>,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // real key of the row
  selected: PropTypes.bool,
  store: PropTypes.object,
  style: PropTypes.object,
  virtualized: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  visible: PropTypes.bool,
  // data: [Array] as PropType<BaseRowProps['data']>,
};

export { propTypes as BaseRowPropTypes };
const defaultProps = {
  columns: [] as [],
  rowExpandable: stubTrue,
  components: {
    body: {
      row: 'tr',
      cell: 'td',
    },
  },
  prefixCls: cssClasses.PREFIX,
  onRow: noop,
  onRowClick: noop,
  onRowDoubleClick: noop,
  onRowMouseEnter: noop,
  onRowMouseLeave: noop,
  onHover: noop,
  onDidUpdate: noop,
  visible: true,
  hovered: false,
  selected: false,
  disabled: false,
};
export const vuePropsType = vuePropsMake<BaseRowProps>(propTypes, defaultProps);
const TableRow = defineComponent({
  props: vuePropsType,
  name: 'TableRow',
  setup(props, { attrs }) {
    const slots = useSlots();

    const { adapter: adapterInject } = useBaseComponent<BaseRowProps>(props, {});
    function adapter_(): TableRowAdapter<BaseRowProps> {
      return {
        ...adapterInject(),
        notifyClick: (...args) => props.onRowClick(...args),
        notifyDoubleClick: (...args) => props.onRowDoubleClick(...args),
        notifyMouseLeave: (...args) => {
          props.onHover(false, props.rowKey);
          props.onRowMouseEnter(...args);
        },
        notifyMouseEnter: (...args) => {
          props.onHover(true, props.rowKey);
          props.onRowMouseEnter(...args);
        },
      };
    }

    const adapter = adapter_();
    const foundation = new TableRowFoundation(adapter);

    const instance = getCurrentInstance();

    // TODO
    //组件是否需要更新，需要返回一个布尔值，返回true则更新，返回flase不更新，这是一个关键点
    function shouldComponentUpdate(nextProps: BaseRowProps) {
      /**
       * Shallow comparison of incoming props to simulate PureComponent
       * Deep comparison cellWidths
       *
       * 浅层对比传入的 props，模拟 PureComponent
       * 深比较 cellWidths
       */
      const omitProps = ['cellWidths'];
      const isPropsShallowEqual = shallowEqualObjects(omit(nextProps, omitProps), omit(props, omitProps));
      if (!isPropsShallowEqual || !isEqual(pick(nextProps, omitProps), pick(props, omitProps))) {
        return true;
      }
      return false;
    }
    // watch([()=>props], (value)=>{
    //     if (shouldComponentUpdate(value)){
    //         // @ts-ignore
    //         instance.ctx?.$forceUpdate?.()
    //         console.log(props.styleTrue)
    //     }
    // }, {deep: true})

    // Pass true to render the tree-shaped expand button
    const renderExpandIcon = (record: Record<string, any>) => {
      const { renderExpandIcon } = props;
      return renderExpandIcon(record, true);
    };

    function renderCells() {
      const {
        columns,
        record,
        index,
        prefixCls,
        fixed,
        components,
        expandableRow,
        level,
        expandIcon,
        rowExpandable,
        isSection,
        expandedRow,
        virtualized,
        indentSize,
        hideExpandedColumn,
        cellWidths,
        selected,
        expanded,
        disabled,
        onDidUpdate,
      } = props;

      const BodyCell = get(components, 'body.cell', strings.DEFAULT_COMPONENTS.body.cell);

      const cells: VueJsxNode[] = [];
      const displayExpandedColumn = rowExpandable(record);

      let firstIndex = 0;
      // const dataColumns = getDataColumns(columns);

      each(columns, (column, columnIndex) => {
        const columnKey = get(column, 'key');
        const expandableProps: {
          renderExpandIcon?: (record: Record<string, any>) => VueJsxNode;
          expandIcon?: ExpandIcon;
          indent?: number;
        } = {};

        if (fixed !== 'right') {
          if (isInnerColumnKey(columnKey as any)) {
            firstIndex++;
          }

          if (expandableRow && columnIndex === firstIndex) {
            expandableProps.renderExpandIcon = renderExpandIcon;
            if (hideExpandedColumn || isSection) {
              expandableProps.expandIcon = expandIcon != null ? expandIcon : true;
            }
          }

          // Only the first data row will be indented
          if (level != null && columnIndex === firstIndex) {
            expandableProps.indent = level;

            if (!expandableRow && hideExpandedColumn) {
              expandableProps.indent = level + 1;
            }
          }
        }

        if (isExpandedColumn(column) && !displayExpandedColumn) {
          cells.push(<TableCell key={columnIndex} colIndex={columnIndex} isSection={isSection} />);
        } else if (!isScrollbarColumn(column)) {
          const diyProps: { width?: number } = {};

          if (BodyCell !== strings.DEFAULT_COMPONENTS.body.cell && virtualized && !expandedRow) {
            diyProps.width = get(cellWidths, columnIndex);
          }
          cells.push(
            <TableCell
              colIndex={columnIndex}
              {...{
                ...expandableProps,
                ...diyProps,
              }}
              hideExpandedColumn={hideExpandedColumn}
              indentSize={indentSize}
              isSection={isSection}
              prefixCls={`${prefixCls}`}
              column={column}
              key={columnIndex}
              index={index}
              record={record}
              component={BodyCell}
              fixedLeft={isFixedLeft(column) && arrayAdd(cellWidths, 0, columnIndex)}
              lastFixedLeft={isLastLeftFixed(columns, column)}
              fixedRight={isFixedRight(column) && arrayAdd(cellWidths, columnIndex + 1)}
              firstFixedRight={isFirstFixedRight(columns, column)}
              selected={selected}
              expanded={expanded}
              disabled={disabled}
              onDidUpdate={onDidUpdate}
            />
          );
        }
      });

      return cells;
    }

    const handleMouseEnter = (e: MouseEvent) => {
      foundation.handleMouseEnter(e);

      const customRowProps = adapter.getCache('customRowProps');

      if (typeof customRowProps?.onMouseEnter === 'function') {
        customRowProps.onMouseEnter(e);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      foundation.handleMouseLeave(e);

      const customRowProps = adapter.getCache('customRowProps');

      if (typeof customRowProps?.onMouseLeave === 'function') {
        customRowProps.onMouseLeave(e);
      }
    };

    const handleClick = (e: MouseEvent) => {
      foundation.handleClick(e);

      const customRowProps = adapter.getCache('customRowProps');

      if (customRowProps && typeof customRowProps.onClick === 'function') {
        customRowProps.onClick(e);
      }
    };

    return () => {
      const { style } = props;
      const {
        components,
        prefixCls,
        selected,
        onRow,
        index,
        className,
        replaceClassName,
        record,
        hovered,
        expanded,
        displayNone,
        expandableRow,
        level,
        expandedRow,
        isSection,
        rowKey,
      } = props;

      const BodyRow = components.body.row;

      const { className: customClassName, style: customStyle, ...rowProps } = onRow(record, index) || {};

      adapter.setCache('customRowProps', { ...rowProps });

      const baseRowStyle = { ...style, ...customStyle };

      const rowCls =
        typeof replaceClassName === 'string' && replaceClassName.length
          ? classnames(replaceClassName, customClassName)
          : classnames(
              className,
              `${prefixCls}-row`,
              {
                [`${prefixCls}-row-selected`]: selected,
                [`${prefixCls}-row-expanded`]: expanded,
                [`${prefixCls}-row-hovered`]: hovered,
                [`${prefixCls}-row-hidden`]: displayNone,
              },
              customClassName
            );
      const ariaProps = {};
      if (typeof index === 'number') {
        ariaProps['aria-rowindex'] = index + 1;
      }
      if (expandableRow) {
        ariaProps['aria-expanded'] = expanded;
      }
      // if row is expandedRow, set it's level to 2
      if (expanded || expandedRow) {
        ariaProps['aria-level'] = 2;
      }
      if (typeof level === 'number') {
        ariaProps['aria-level'] = level + 1;
      }
      if (isSection) {
        ariaProps['aria-level'] = 1;
      }

      return (
        <BodyRow
          role="row"
          {...ariaProps}
          {...rowProps}
          style={baseRowStyle}
          className={rowCls}
          // used for dnd-kit sortable
          data-row-key={rowKey}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
          onClick={handleClick}
        >
          {renderCells()}
        </BodyRow>
      );
    };
  },
});

export default TableRow;

export type RenderExpandIcon = (record: Record<string, any>, isNested: boolean) => VueJsxNode | null;
