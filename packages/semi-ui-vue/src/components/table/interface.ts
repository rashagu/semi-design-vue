/* eslint-disable max-len */
import { BaseProps } from '../_base/baseComponent';
import { PaginationProps } from '../pagination';
import { CheckboxProps } from '../checkbox';
import { DropdownProps } from '../dropdown';
import { Locale } from '../locale/interface';
import { ArrayElement } from '../_base/base';
import { strings } from '@douyinfe/semi-foundation/table/constants';
import {
    BaseRowKeyType,
    BaseSortOrder,
    BaseGroupBy,
    BaseGroupByFn,
    BaseFixed,
    BaseAlign,
    BaseChangeInfoSorter,
    BaseSorter,
    BaseFilter,
    BaseChangeInfoFilter,
    BaseIncludeGroupRecord
} from '@douyinfe/semi-foundation/table/foundation';
import type { ScrollDirection, CSSDirection } from '@kousum/vue3-window';
import {VueJsxNode} from "../interface";
import type {CSSProperties, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes} from "vue"

export interface TableProps<RecordType extends Record<string, any> = any> extends BaseProps {
    bordered?: boolean;
    children?: VueJsxNode;
    childrenRecordName?: string;
    className?: string;
    clickGroupedRowToExpand?: boolean;
    columns?: ColumnProps<RecordType>[];
    components?: TableComponents;
    dataSource?: RecordType[];
    defaultExpandAllGroupRows?: boolean;
    defaultExpandAllRows?: boolean;
    defaultExpandedRowKeys?: (string | number)[];
    empty?: VueJsxNode;
    expandAllGroupRows?: boolean;
    expandAllRows?: boolean;
    expandCellFixed?: Fixed;
    expandIcon?: ExpandIcon;
    expandedRowKeys?: (string | number)[];
    expandedRowRender?: ExpandedRowRender<RecordType>;
    expandRowByClick?: boolean;
    footer?: Footer<RecordType>;
    getVirtualizedListRef?: GetVirtualizedListRef;
    groupBy?: GroupBy<RecordType>;
    hideExpandedColumn?: boolean;
    id?: string;
    indentSize?: number;
    loading?: boolean;
    pagination?: TablePagination;
    prefixCls?: string;
    renderGroupSection?: RenderGroupSection;
    renderPagination?: RenderPagination;
    resizable?: Resizable<RecordType>;
    rowExpandable?: RowExpandable<RecordType>;
    rowKey?: RowKey<RecordType>;
    rowSelection?: RowSelection<RecordType>;
    scroll?: Scroll;
    showHeader?: boolean;
    size?: Size;
    style?: CSSProperties;
    title?: Title<RecordType>;
    virtualized?: Virtualized;
    onChange?: OnChange<RecordType>;
    onExpand?: OnExpand<RecordType>;
    onExpandedRowsChange?: OnExpandedRowsChange<RecordType>;
    onGroupedRow?: OnGroupedRow<RecordType>;
    onHeaderRow?: OnHeaderRow<RecordType>;
    onRow?: OnRow<RecordType>;
    sticky?: Sticky
}

export interface ColumnProps<RecordType extends Record<string, any> = any> {
    [x: string]: any;
    align?: Align;
    children?: Array<ColumnProps<RecordType>>;
    className?: string;
    colSpan?: number;
    dataIndex?: string;
    defaultFilteredValue?: any[];
    defaultSortOrder?: SortOrder;
    filterChildrenRecord?: boolean;
    filterDropdown?: VueJsxNode;
    filterDropdownProps?: DropdownProps;
    filterDropdownVisible?: boolean;
    filterIcon?: FilterIcon;
    filterMultiple?: boolean;
    filteredValue?: any[];
    filters?: Filter[];
    fixed?: Fixed;
    key?: string | number | symbol;
    render?: ColumnRender<RecordType>;
    renderFilterDropdownItem?: RenderFilterDropdownItem;
    sortChildrenRecord?: boolean;
    sortOrder?: SortOrder;
    sorter?: Sorter<RecordType>;
    title?: ColumnTitle;
    useFullRender?: boolean;
    width?: string | number;
    onCell?: OnCell<RecordType>;
    onFilter?: OnFilter<RecordType>;
    onFilterDropdownVisibleChange?: OnFilterDropdownVisibleChange;
    onHeaderCell?: OnHeaderCell<RecordType>
}

export type Align = BaseAlign;
export type SortOrder = BaseSortOrder;
export type FilterIcon = boolean | VueJsxNode | FilterIconRenderFunction;
export interface Filter extends BaseFilter {
    value?: any;
    text?: VueJsxNode;
    children?: Filter[]
}
export type Fixed = BaseFixed;
export type OnCell<RecordType> = (record?: RecordType, rowIndex?: number) => OnCellReturnObject;
export type OnFilter<RecordType> = (filteredValue?: any, record?: RecordType) => boolean;
export type OnFilterDropdownVisibleChange = (visible?: boolean) => void;
export type OnHeaderCell<RecordType> = (record?: RecordType, columnIndex?: number) => OnHeaderCellReturnObject;
export type ColumnRender<RecordType> = (text: any, record: RecordType, index: number, options?: RenderOptions) => ColumnRenderReturnType;
export type RenderFilterDropdownItem = (itemInfo?: FilterDropdownItem) => VueJsxNode;
export type Sorter<RecordType> = BaseSorter<RecordType>;
export type ColumnTitle = VueJsxNode | ((ColumnTitleProps?: ColumnTitleProps) => VueJsxNode);
export type FilterIconRenderFunction = (filtered: boolean) => VueJsxNode;
export type ColumnTitleProps = {
    sorter?: VueJsxNode;
    filter?: VueJsxNode;
    selection?: VueJsxNode
};
export type ColumnRenderReturnType = VueJsxNode | RenderReturnObject;
export interface RenderReturnObject {
    [x: string]: any;
    children: VueJsxNode;
    props: {
        [x: string]: any;
        colSpan?: number;
        rowSpan?: number
    }
}
export interface FilterDropdownItem {
    [x: string]: any;
    value?: any;
    text?: VueJsxNode;
    onChange?: any;
    level?: number;
    filterMultiple?: boolean;
    checked?: boolean
}
export interface RenderOptions {
    expandIcon?: VueJsxNode;
    selection?: VueJsxNode;
    indentText?: VueJsxNode
}
export interface OnCellReturnObject extends TdHTMLAttributes {
    [x: string]: any;
    style?: CSSProperties;
    className?: string;
    onClick?: (e: MouseEvent) => void
}
export interface OnHeaderCellReturnObject extends ThHTMLAttributes {
    [x: string]: any;
    style?: CSSProperties;
    className?: string;
    onClick?: (e: MouseEvent) => void
}

interface OnRowReturnOmit {
    ref?: any
}

export interface OnRowReturnObject {
    [x: string]: any;
    className?: string;
    style?: CSSProperties;
    onClick?: (e: MouseEvent) => void
}
export interface OnGroupedRowReturnObject extends Omit<HTMLAttributes, 'className'> {
    [x: string]: any;
    style?: CSSProperties;
    onClick?: (e: MouseEvent) => void
}
export type OnHeaderRowReturnObject = Omit<HTMLAttributes, 'ref' | 'style'>;

export interface Scroll {
    x?: number | string;
    y?: number | string;
    scrollToFirstRowOnChange?: boolean
}

export interface Data {
    [x: string]: any;
    key?: string | number
}

export interface TableComponents {
    table?: VueJsxNode;
    header?: {
        outer?: VueJsxNode;
        wrapper?: VueJsxNode;
        row?: VueJsxNode;
        cell?: VueJsxNode
    };
    body?: {
        outer?: VueJsxNode;
        wrapper?: VueJsxNode;
        row?: VueJsxNode;
        cell?: VueJsxNode;
        colgroup?: {
            wrapper?: VueJsxNode;
            col?: VueJsxNode
        }
    };
    footer?: {
        wrapper?: VueJsxNode;
        row?: VueJsxNode;
        cell?: VueJsxNode;
        outer?: VueJsxNode
    }
}

export interface RowSelectionProps<RecordType> {
    className?: string;
    disabled?: boolean;
    fixed?: Fixed;
    getCheckboxProps?: GetCheckboxProps<RecordType>;
    hidden?: boolean;
    selectedRowKeys?: (string | number)[];
    title?: VueJsxNode;
    width?: string | number;
    onChange?: RowSelectionOnChange<RecordType>;
    onSelect?: RowSelectionOnSelect<RecordType>;
    onSelectAll?: RowSelectionOnSelectAll<RecordType>
}

export type GetCheckboxProps<RecordType> = (record: RecordType) => CheckboxProps;
export type RowSelectionOnChange<RecordType> = (selectedRowKeys?: (string | number)[], selectedRows?: RecordType[]) => void;
export type RowSelectionOnSelect<RecordType> = (
    record?: RecordType,
    selected?: boolean,
    selectedRows?: RecordType[],
    nativeEvent?: MouseEvent
) => void;
export type RowSelectionOnSelectAll<RecordType> = (selected?: boolean, selectedRows?: RecordType[], changedRows?: RecordType[]) => void;
export type ExpandIcon = ((expanded?: boolean) => VueJsxNode) | VueJsxNode;
export type ExpandedRowRender<RecordType> = (record?: RecordType, index?: number, expanded?: boolean) => VueJsxNode;
export type Footer<RecordType> = VueJsxNode | ((pageData?: RecordType[]) => VueJsxNode);
export type FormatPageText = ((pageInfo?: { currentStart?: number; currentEnd?: number; total?: number }) => VueJsxNode) | boolean;
export type GetVirtualizedListRef = (ref: any) => void;
export type GroupByFunction<RecordType> = BaseGroupByFn<RecordType>;
export type GroupBy<RecordType> = BaseGroupBy<RecordType>;
export type Size = ArrayElement<typeof strings.SIZES>;
export type Title<RecordType> = VueJsxNode | ((pageData?: RecordType[]) => VueJsxNode);
export type PaginationPosition = ArrayElement<typeof strings.PAGINATION_POSITIONS>;
export type Pagination = TablePaginationProps | boolean;
export type TablePagination = Pagination;
export interface ChangeInfoFilter<RecordType> extends BaseChangeInfoFilter<RecordType> {
    filters?: Filter[];
    onFilter?: OnFilter<RecordType>
}
export type ChangeInfoSorter<RecordType> = BaseChangeInfoSorter<RecordType>;
export interface ChangeInfo<RecordType> {
    pagination?: TablePaginationProps;
    filters?: ChangeInfoFilter<RecordType>[];
    sorter?: ChangeInfoSorter<RecordType>;
    extra?: Record<string, any>
}
export type OnChange<RecordType> = (changeInfo: ChangeInfo<RecordType>) => void;
export type OnRow<RecordType> = (record?: RecordType, index?: number) => OnRowReturnObject;
export type OnGroupedRow<RecordType> = (record?: RecordType, index?: number) => OnGroupedRowReturnObject;
export type OnHeaderRow<RecordType> = (columns?: ColumnProps<RecordType>[], index?: number) => OnHeaderRowReturnObject;
export type OnExpandedRowsChange<RecordType> = (expandedRows?: IncludeGroupRecord<RecordType>[]) => void;
export type OnExpand<RecordType> = (expanded?: boolean, record?: IncludeGroupRecord<RecordType>, mouseEvent?: MouseEvent) => void;
export type RenderGroupSection = (groupKey?: string | number, group?: (string | number)[]) => VueJsxNode | {
    [x: string]: any;
    children: VueJsxNode
};
export type RenderPagination = (paginationProps: TablePaginationProps) => VueJsxNode;
export type RowExpandable<RecordType> = (record?: RecordType) => boolean;
export type RowKey<RecordType> = BaseRowKeyType | ((record?: RecordType) => string);
export type RowSelection<RecordType> = RowSelectionProps<RecordType> | boolean;

export type VirtualizedOnScrollArgs = {
    scrollDirection?: ScrollDirection;
    scrollOffset?: number;
    scrollUpdateWasRequested?: boolean
};
export type VirtualizedMode = 'list' | 'grid';
export type VirtualizedItemSizeFn = (index?: number) => number;
export type VirtualizedItemSize = number | VirtualizedItemSizeFn;
export type VirtualizedOnScroll = (object: VirtualizedOnScrollArgs) => void;
export interface VirtualizedProps {
    [x: string]: any;
    mode?: VirtualizedMode;
    itemSize?: VirtualizedItemSize;
    onScroll?: VirtualizedOnScroll
}
export type Virtualized = boolean | VirtualizedProps;

export interface TablePaginationProps extends BaseProps, PaginationProps {
    position?: PaginationPosition;
    formatPageText?: FormatPageText
}

export type Resizable<RecordType> = ResizableProps<RecordType> | boolean;
export interface ResizableProps<RecordType> {
    onResize?: ResizeFn<RecordType>;
    onResizeStart?: ResizeFn<RecordType>;
    onResizeStop?: ResizeFn<RecordType>
}
export type ResizeFn<RecordType> = (column: RecordType) => RecordType;

export interface BodyScrollEvent {
    [x: string]: any;
    currentTarget: any;
    target: any
}

export type BodyScrollPosition = 'both' | 'middle' | 'left' | 'right';

export type TableLocale = Locale['Table'];
export type Direction = CSSDirection;
export type IncludeGroupRecord<RecordType> = BaseIncludeGroupRecord<RecordType>;
export type Sticky = boolean | {
    top?: number
}
