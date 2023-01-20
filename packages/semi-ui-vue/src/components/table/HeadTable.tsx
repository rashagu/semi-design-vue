/* eslint-disable max-len */
import * as PropTypes from '../PropTypes';
import { get, noop } from 'lodash';
import classnames from 'classnames';

import ColGroup from './ColGroup';
import TableHeader from './TableHeader';
import { Fixed, TableComponents, Scroll, BodyScrollEvent, ColumnProps, OnHeaderRow } from './interface';
import {CSSProperties, defineComponent, h, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";

export interface HeadTableProps {
    [x: string]: any;
    anyColumnFixed?: boolean;
    bodyHasScrollBar?: boolean;
    columns?: ColumnProps[];
    components?: TableComponents;
    dataSource?: Record<string, any>[];
    fixed?: Fixed;
    handleBodyScroll?: (e: BodyScrollEvent) => void;
    prefixCls?: string;
    forwardedRef?: any;
    scroll?: Scroll;
    selectedRowKeysSet: Set<any>;
    showHeader?: boolean;
    onDidUpdate?: (ref: any) => void;
    onHeaderRow?: OnHeaderRow<any>
}

/**
 * When there are fixed columns, the header is rendered as a separate Table
 */

const propTypes = {
    anyColumnFixed: PropTypes.bool,
    bodyHasScrollBar: PropTypes.bool,
    columns: PropTypes.array,
    components: PropTypes.object,
    dataSource: PropTypes.array,
    fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    handleBodyScroll: PropTypes.func,
    prefixCls: PropTypes.string,
    forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    scroll: PropTypes.object,
    selectedRowKeysSet: PropTypes.object, // Useful when update is selected
    showHeader: PropTypes.bool,
    onDidUpdate: PropTypes.func,
    onHeaderRow: PropTypes.func,
};

const defaultProps = {
    handleBodyScroll: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const HeadTable = defineComponent<HeadTableProps>((props, {}) => {
    const slots = useSlots();

    return () => {
        const {
            scroll,
            prefixCls,
            fixed,
            forwardedRef,
            handleBodyScroll,
            columns,
            components,
            onDidUpdate,
            showHeader,
            anyColumnFixed,
            bodyHasScrollBar,
            sticky
        } = props;

        if (!showHeader) {
            return null;
        }

        const Table = get(components, 'header.outer', 'table');
        const x = get(scroll, 'x');
        const headStyle: Partial<CSSProperties> = {};
        const tableStyle: { width?: number | string } = {};


        if (x && !fixed) {
            tableStyle.width = x + 'px';
        }

        if (bodyHasScrollBar) {
            headStyle.overflowY = 'scroll';
        }

        const colgroup = <ColGroup columns={columns} prefixCls={prefixCls} />;
        const tableHeader = (
          <TableHeader {...props} columns={columns} components={components} onDidUpdate={onDidUpdate} />
        );

        const headTableCls = classnames(`${prefixCls}-header`, {
            [`${prefixCls}-header-sticky`]: sticky,
        });

        const stickyTop = get(sticky, 'top', 0);
        if (typeof stickyTop === 'number') {
            headStyle.top = stickyTop;
        }


        return (
          <div
            key="headTable"
            style={headStyle}
            class={headTableCls}
            ref={forwardedRef}
            onScroll={handleBodyScroll}
          >
              <Table
                style={tableStyle}
                className={classnames(prefixCls, {
                    [`${prefixCls}-fixed`]: anyColumnFixed,
                })}
              >
                  {colgroup}
                  {tableHeader}
              </Table>
          </div>
        );
    };
});

HeadTable.props = vuePropsType;
HeadTable.name = "HeadTable";

export default HeadTable;
