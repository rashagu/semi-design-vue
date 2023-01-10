
import * as PropTypes from '../../PropTypes';
import classnames from 'classnames';
import { get, isSet } from 'lodash';

import Store from '@douyinfe/semi-foundation/utils/Store';
import { cssClasses, strings } from '@douyinfe/semi-foundation/table/constants';
import { filterColumns } from '@douyinfe/semi-foundation/table/utils';
import BaseRow from './BaseRow';
import TableContext, { TableContextProps } from '../table-context';
import {
    ColumnProps,
    RenderGroupSection,
    OnGroupedRow,
    TableComponents,
    Virtualized,
    RowKey,
    OnRowReturnObject
} from '../interface';
import {VueJsxNode} from "../../interface";
import {CSSProperties, defineComponent, h, isVNode, useSlots} from "vue";
import {vuePropsMake} from "../../PropTypes";
import {useTableContext} from "../tableContext/Consumer";

export interface SectionRowProps {
    record?: Record<string, any>;
    index?: number;
    columns?: ColumnProps[];
    group?: (string | number)[];
    groupKey: string | number;
    data?: Record<string, any>[];
    renderGroupSection?: RenderGroupSection; // render group title
    onGroupedRow?: OnGroupedRow<Record<string, any>>;
    clickGroupedRowToExpand?: boolean;
    components?: TableComponents;
    expanded?: boolean;
    prefixCls?: string;
    onExpand?: (willExpanded: boolean, groupKey: number | string, e: MouseEvent) => void;
    virtualized?: Virtualized;
    style?: CSSProperties;
    renderExpandIcon?: (record: Record<string, any>, isNested: boolean, groupKey: string | number) => VueJsxNode | null;
    className?: string;
    store?: Store;
    rowKey?: RowKey<any>
}

/**
 * Grouping component title row
 */
const propTypes = {
    record: PropTypes.object,
    index: PropTypes.number,
    columns: PropTypes.array,
    group: PropTypes.object,
    groupKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.array,
    renderGroupSection: PropTypes.func, // render group title
    onGroupedRow: PropTypes.func,
    clickGroupedRowToExpand: PropTypes.bool,
    components: PropTypes.object,
    expanded: PropTypes.bool,
    prefixCls: PropTypes.string,
    onExpand: PropTypes.func,
    virtualized: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    style: PropTypes.object,
    renderExpandIcon: PropTypes.func, // passing to baseRow
    className: PropTypes.string,
    store: PropTypes.object,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
};
const defaultProps = {
    prefixCls: cssClasses.PREFIX,
    components: {
        body: {
            row: 'tr',
            cell: 'td',
        },
    },
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const SectionRow = defineComponent<SectionRowProps>((props, {}) => {
    const slots = useSlots();
    const {context} = useTableContext()

    const onRow = (...args: any[]): OnRowReturnObject => {
        const { onGroupedRow, clickGroupedRowToExpand, onExpand, groupKey, expanded } = props;
        const rowProps: { onClick?: (e: MouseEvent) => void } = {};

        if (typeof onGroupedRow === 'function') {
            Object.assign(rowProps, onGroupedRow(...args));
        }

        return {
            ...rowProps,
            onClick: (e: MouseEvent) => {
                if (typeof onExpand === 'function' && clickGroupedRowToExpand) {
                    onExpand(!expanded, groupKey, e);
                }

                if (typeof rowProps.onClick === 'function') {
                    rowProps.onClick(e);
                }
            },
        };
    };

    const vcollectGroupedData = () => {
        const { data, group, rowKey } = props;

        if (Array.isArray(data) && data.length && isSet(group)) {
            return data.filter(record => {
                const realRowKey = typeof rowKey === 'function' ? rowKey(record) : get(record, rowKey);
                return realRowKey != null && realRowKey !== '' && group.has(realRowKey);
            });
        }

        return [];
    };

    const renderExpandIcon = (record: any) => {
        const { renderExpandIcon, groupKey } = props;

        if (typeof renderExpandIcon === 'function') {
            return renderExpandIcon(record, false, groupKey);
        }
        return null;
    };

    function isInnerColumnKey(key: any) {
        if (key != null) {
            return [strings.DEFAULT_KEY_COLUMN_EXPAND, strings.DEFAULT_KEY_COLUMN_SELECTION].includes(key);
        }

        return false;
    }

    return () => {
        const {
            record,
            columns: propColumns = [],
            prefixCls,
            className,
            expanded,
            renderGroupSection,
            components,
            index,
            store,
            group,
            groupKey,
            virtualized,
            style,
        } = props;

        const props_: { colSpan?: number } = {};
        let column = {};
        let children: VueJsxNode = null;
        // render title
        const cell = typeof renderGroupSection === 'function' ? renderGroupSection(groupKey, [...group]) : null;

        if (isVNode(cell)) {
            children = cell;
        } else if (cell && Object.prototype.toString.call(cell) === '[object Object]') {
            const { children: cellChildren, ...restProps } = cell as { children?: VueJsxNode };
            children = cellChildren;
            column = { ...restProps };
        }

        // Filter out scroll-bar column
        props_.colSpan = filterColumns(propColumns).length;

        const columns = [{ render: () => ({ props: props_, children }), ...column }];

        const rowCls = classnames(className, `${prefixCls}-row-section`, {
            on: expanded,
        });

        const { getCellWidths } = context.value;
        const baseRowCellWidths = getCellWidths(columns, null, true);

        return (
          // @ts-ignore
          <BaseRow
            components={components}
            virtualized={virtualized}
            index={index}
            onRow={onRow}
            expanded={expanded}
            expandIcon
            isSection
            record={record}
            replaceClassName={rowCls}
            expandableRow
            renderExpandIcon={renderExpandIcon}
            rowKey={groupKey}
            columns={columns}
            store={store}
            style={style}
            cellWidths={baseRowCellWidths}
          />
        );
    };
});

SectionRow.props = vuePropsType;
SectionRow.name = "SectionRow";

export default SectionRow;

