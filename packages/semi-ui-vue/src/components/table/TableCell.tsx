/* eslint-disable prefer-destructuring */
/* eslint-disable eqeqeq */
import classnames from 'classnames';
import * as PropTypes from '../PropTypes';
import { get, noop, set, omit, isEqual, merge } from 'lodash';

import { cssClasses, numbers } from '@douyinfe/semi-foundation/table/constants';
import TableCellFoundation, { TableCellAdapter } from '@douyinfe/semi-foundation/table/cellFoundation';
import { isSelectionColumn, isExpandedColumn, getRTLAlign, shouldShowEllipsisTitle, getRTLFlexAlign } from '@douyinfe/semi-foundation/table/utils';

import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import Context, { TableContextProps } from './table-context';
import { amendTableWidth } from './utils';
import { ColumnProps, ExpandIcon } from './interface';
import {
    ComponentObjectPropsOptions,
    CSSProperties,
    defineComponent,
    Fragment,
    h,
    isVNode, PropType,
    reactive,
    ref,
    useSlots,
    watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useTableContext} from "./tableContext/Consumer";
import {FooterProps} from "../image/interface";
import {VueJsxNode} from "../interface";
import {styleNum} from "../_utils";

export interface TableCellProps extends BaseProps {
    record?: Record<string, any>;
    prefixCls?: string;
    index?: number; // index of dataSource
    fixedLeft?: boolean | number;
    lastFixedLeft?: boolean;
    fixedRight?: boolean | number;
    firstFixedRight?: boolean;
    indent?: number; // The level of the tree structure
    indentSize?: number; // Tree structure indent size
    column?: ColumnProps; // The column of the current cell
    /**
      * Does the first column include expandIcon
      * When hideExpandedColumn is true or isSection is true
      * expandIcon is a custom icon or true
      */
    expandIcon?: ExpandIcon;
    renderExpandIcon?: (record: Record<string, any>) => VueJsxNode;
    hideExpandedColumn?: boolean;
    component?: any;
    onClick?: (record: Record<string, any>, e: MouseEvent) => void; // callback of click cell event
    onDidUpdate?: (ref: any) => void;
    isSection?: boolean; // Whether it is in group row
    width?: string | number; // cell width
    height?: string | number; // cell height
    selected?: boolean; // Whether the current row is selected
    expanded?: boolean; // Whether the current line is expanded
    disabled?: boolean;
    colIndex?: number
}

function isInvalidRenderCellText(text: any) {
    return text && !isVNode(text) && Object.prototype.toString.call(text) === '[object Object]';
}



const propTypes:ComponentObjectPropsOptions<TableCellProps> = {
    record: PropTypes.object,
    prefixCls: PropTypes.string,
    index: PropTypes.number,
    fixedLeft: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    lastFixedLeft: PropTypes.bool,
    fixedRight: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    firstFixedRight: PropTypes.bool,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    column: PropTypes.object,
    expandIcon: PropTypes.any as PropType<TableCellProps['expandIcon']>,
    renderExpandIcon: PropTypes.func as PropType<TableCellProps['renderExpandIcon']>,
    hideExpandedColumn: PropTypes.bool,
    component: PropTypes.any,
    onClick: PropTypes.func as PropType<TableCellProps['onClick']>,
    onDidUpdate: PropTypes.func as PropType<TableCellProps['onDidUpdate']>,
    isSection: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selected: PropTypes.bool,
    expanded: PropTypes.bool,
    colIndex: PropTypes.number,

    disabled: PropTypes.bool,
};
const defaultProps = {
    indent: 0,
    indentSize: numbers.DEFAULT_INDENT_WIDTH,
    onClick: noop,
    prefixCls: cssClasses.PREFIX,
    component: 'td',
    onDidUpdate: noop,
    column: {},
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const TableCell = defineComponent<TableCellProps>((props, {}) => {
    const slots = useSlots();
    let {context} = useTableContext();
    const nodeRef = ref()
    const state = reactive({})

    const {adapter: adapterInject} = useBaseComponent<TableCellProps>(props, state)
    function adapter_(): TableCellAdapter {
        return {
            ...adapterInject(),
            notifyClick: (...args) => {
                const { onClick } = props;

                if (typeof onClick === 'function') {
                    onClick(...args);
                }
            },
        };
    }

    const adapter = adapter_()

    const foundation = new TableCellFoundation(adapter);

    /**
     * Control whether to execute the render function of the cell
     * 1. Scenes that return true
     *  - The cell contains the selection state, you need to calculate whether its selection state has changed during selection
     *  - The cell contains the folding state, it needs to be calculated when the folding state has changed
     * 2. Scenarios that return false
     *  - Cells without table operation operation status, only need to judge that their props have changed
     *    At this time, the update of the table cell is controlled by the user. At this time, its update will not affect other cells
     *
     * 控制是否执行cell的render函数
     * 1. 返回true的场景
     *  - cell内包含选择状态，需要在选择时计算它的选择态是否发生变化
     *  - cell内包含折叠状态，需要在折叠时计算它的折叠态是否发生了变化
     * 2. 返回false的场景
     *  - 没有table操作操作状态的cell，只需判断自己的props发生了变化
     *    此时table cell的更新由用户自己控制，此时它的更新不会影响其他cell
     *
     * @param {*} nextProps
     * @returns
     */
    function shouldComponentUpdate(nextProps: TableCellProps) {
        //组件是否需要更新，需要返回一个布尔值，返回true则更新，返回flase不更新，这是一个关键点
        const { column, expandIcon } = props;
        const cellInSelectionColumn = isSelectionColumn(column);
        // The expand button may be in a separate column or in the first data column
        const columnHasExpandIcon = isExpandedColumn(column) || expandIcon;
        if ((cellInSelectionColumn || columnHasExpandIcon) && !isEqual(nextProps, props)) {
            return true;
        } else {
            const omitProps = ['selected', 'expanded', 'expandIcon', 'disabled'];
            const propsOmitSelected = omit(props, omitProps);
            const nextPropsOmitSelected = omit(nextProps, omitProps);
            if (!isEqual(nextPropsOmitSelected, propsOmitSelected)) {
                return true;
            }
        }
        return false;
    }

    watch([()=>props, state], ()=>{
        props.onDidUpdate(nodeRef.value);
    })



    const handleClick = (e: MouseEvent) => {
        foundation.handleClick(e);
        const customCellProps = adapter.getCache('customCellProps');
        if (customCellProps && typeof customCellProps.onClick === 'function') {
            customCellProps.onClick(e);
        }
    };

    function getTdProps() {
        const {
            record,
            index,
            column = {},
            fixedLeft,
            fixedRight,
            width,
            height,
        } = props;

        let tdProps: { style?: Partial<CSSProperties> } = {};
        let customCellProps = {};
        const { direction } = context.value;
        const isRTL = direction === 'rtl';

        const fixedLeftFlag = fixedLeft || typeof fixedLeft === 'number';
        const fixedRightFlag = fixedRight || typeof fixedRight === 'number';

        if (fixedLeftFlag) {
            set(tdProps, isRTL ? 'style.right' : 'style.left', typeof fixedLeft === 'number' ? fixedLeft : 0);
        } else if (fixedRightFlag) {
            set(tdProps, isRTL ? 'style.left' : 'style.right', typeof fixedRight === 'number' ? fixedRight : 0);
        }

        if (width != null) {
            set(tdProps, 'style.width', width + 'px');
        }

        if (height != null) {
            set(tdProps, 'style.height', height + 'px');
        }

        // Vue3 补充
        if (tdProps.style?.left && typeof tdProps.style?.left === 'number'){
            tdProps.style.left = tdProps.style.left + 'px'
        }
        if (tdProps.style?.right && typeof tdProps.style?.right === 'number'){
            tdProps.style.right = tdProps.style.right + 'px'
        }


        if (column.onCell) {
            customCellProps = (column as any).onCell(record, index);
            adapter.setCache('customCellProps', { ...customCellProps });
            tdProps = { ...tdProps, ...omit(customCellProps, ['style', 'className', 'onClick']) };
            const customCellStyle = get(customCellProps, 'style') || {};
            tdProps.style = { ...tdProps.style, ...customCellStyle };
        }

        if (column.align) {
            const textAlign = getRTLAlign(column.align, direction);
            const justifyContent = getRTLFlexAlign(column.align, direction);
            tdProps.style = { ...tdProps.style, textAlign, justifyContent };
        }

        return { tdProps, customCellProps };
    }

    /**
     * We should return undefined if no dataIndex is specified, but in order to
     * be compatible with object-path's behavior, we return the record object instead.
     */
    function renderText(tdProps: { style?: CSSProperties; colSpan?: number; rowSpan?: number }) {
        const {
            record,
            indentSize,
            prefixCls,
            indent,
            index,
            expandIcon,
            renderExpandIcon,
            column = {},
        } = props;
        const { dataIndex, render, useFullRender } = column;

        let text: any,
          colSpan: number,
          rowSpan: number;

        if (typeof dataIndex === 'number') {
            text = get(record, dataIndex);
        } else if (!dataIndex || dataIndex.length === 0) {
            text = record;
        } else {
            text = get(record, dataIndex);
        }

        const indentText = (indent && indentSize) ? (
          <span
            style={{ paddingLeft: `${indentSize * indent}px` }}
            class={`${prefixCls}-row-indent indent-level-${indent}`}
          />
        ) : null;

        // column.render
        const realExpandIcon = (typeof renderExpandIcon === 'function' ? renderExpandIcon(record) : expandIcon) as VueJsxNode;
        if (render) {
            const renderOptions = {
                expandIcon: realExpandIcon,
            };

            // column.useFullRender
            if (useFullRender) {
                const { renderSelection } = context.value;
                const realSelection = typeof renderSelection === 'function' ? renderSelection(record) : null;
                Object.assign(renderOptions, {
                    selection: realSelection,
                    indentText,
                });
            }

            text = render(text, record, index, renderOptions);
            if (isInvalidRenderCellText(text)) {
                // eslint-disable-next-line no-param-reassign
                tdProps = text.props ? merge(tdProps, text.props) : tdProps;
                colSpan = tdProps.colSpan;
                rowSpan = tdProps.rowSpan;
                text = text.children;
            }
        }

        return { text, indentText, rowSpan, colSpan, realExpandIcon, tdProps };
    }

    function renderInner(text: VueJsxNode, indentText: VueJsxNode, realExpandIcon: VueJsxNode) {
        const {
            prefixCls,
            isSection,
            expandIcon,
            column = {},
        } = props;
        const { tableWidth, anyColumnFixed } = context.value;
        const { useFullRender } = column;

        let inner = null;

        if (useFullRender) {
            inner = text;
        } else {
            inner = [
                <Fragment key={'indentText'}>{indentText}</Fragment>,
                <Fragment key={'expandIcon'}>{expandIcon ? realExpandIcon : null}</Fragment>,
                <Fragment key={'text'}>{text}</Fragment>,
            ];
        }

        if (isSection) {
            inner = (
              <div
                class={classnames(`${prefixCls}-section-inner`)}
                style={{ width: anyColumnFixed ? styleNum(amendTableWidth(tableWidth)) : undefined }}
              >
                  {inner}
              </div>
            );
        }

        return inner;
    }



    const setRef = (ref_: any) => (nodeRef.value = ref_);
    return () => {
        const {
            prefixCls,
            column = {},
            component: BodyCell,
            fixedLeft,
            fixedRight,
            lastFixedLeft,
            firstFixedRight,
            colIndex
        } = props;
        const { direction } = context.value;
        const isRTL = direction === 'rtl';
        const { className, ellipsis } = column;
        const fixedLeftFlag = fixedLeft || typeof fixedLeft === 'number';
        const fixedRightFlag = fixedRight || typeof fixedRight === 'number';
        const { tdProps, customCellProps } = getTdProps();

        const renderTextResult = renderText(tdProps);
        let { text } = renderTextResult;
        const { indentText, rowSpan, colSpan, realExpandIcon, tdProps: newTdProps } = renderTextResult;
        let title: string;

        const shouldShowTitle = shouldShowEllipsisTitle(ellipsis);
        if (shouldShowTitle) {
            if (typeof text === 'string') {
                title = text;
            }
        }

        if (rowSpan === 0 || colSpan === 0) {
            return null;
        }

        if (isInvalidRenderCellText(text)) {
            text = null;
        }

        const inner = renderInner(text, indentText, realExpandIcon);
        let isFixedLeft, isFixedLeftLast, isFixedRight, isFixedRightFirst;

        if (isRTL) {
            isFixedLeft = fixedRightFlag;
            isFixedLeftLast = firstFixedRight;
            isFixedRight = fixedLeftFlag;
            isFixedRightFirst = lastFixedLeft;
        } else {
            isFixedLeft = fixedLeftFlag;
            isFixedLeftLast = lastFixedLeft;
            isFixedRight = fixedRightFlag;
            isFixedRightFirst = firstFixedRight;
        }

        const columnCls = classnames(
          className,
          `${prefixCls}-row-cell`,
          get(customCellProps, 'className'),
          {
              [`${prefixCls}-cell-fixed-left`]: isFixedLeft,
              [`${prefixCls}-cell-fixed-left-last`]: isFixedLeftLast,
              [`${prefixCls}-cell-fixed-right`]: isFixedRight,
              [`${prefixCls}-cell-fixed-right-first`]: isFixedRightFirst,
              [`${prefixCls}-row-cell-ellipsis`]: ellipsis,
          }
        );

        return (
          <BodyCell
            role="gridcell"
            aria-colindex={colIndex + 1}
            className={columnCls}
            onClick={handleClick}
            title={title}
            {...newTdProps}
            ref={setRef}
          >
              {inner}
          </BodyCell>
        );
    };
}, {
    props: vuePropsType,
    name: 'TableCell'
});




export default TableCell;
