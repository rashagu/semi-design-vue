
import { ColumnProps, GetVirtualizedListRef, RowKey } from './interface';
import {
    BaseRowKeyType,
    BaseHeadWidth,
} from '@douyinfe/semi-foundation/table/foundation';
import Provider from "./tableContext/Provider";
import Consumer from "./tableContext/Consumer";
import {VueJsxNode} from "../interface";
import type { ContextValue } from '../configProvider/context';

export interface TableContextProps {
    children?: VueJsxNode;
    anyColumnFixed?: boolean;
    flattenedColumns?: ColumnProps[];
    tableWidth?: number;
    headWidths?: BaseHeadWidth[][];
    setHeadWidths?: (headWidth?: BaseHeadWidth[], index?: number) => void;
    getHeadWidths?: (index?: number) => number[];
    getCellWidths?: (flattenColumns: ColumnProps[], flattenedWidths?: number[], ignoreScrollBarKey?: boolean) => number[];
    handleRowExpanded?: (expanded: boolean, realKey: RowKey<any>, domEvent: MouseEvent) => void;
    renderExpandIcon?: (record: Record<string, any>, isNested?: boolean, groupKey?: string | number) => VueJsxNode;
    renderSelection?: (record?: Record<string, any>, isHeader?: boolean) => VueJsxNode;
    getVirtualizedListRef?: GetVirtualizedListRef;
    setBodyHasScrollbar?: (bodyHasScrollBar: boolean) => void;
    direction?: ContextValue['direction']
}

const TableContext = {
    Provider,
    Consumer
}

export default TableContext;
