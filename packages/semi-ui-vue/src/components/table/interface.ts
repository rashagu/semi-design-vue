/* eslint-disable max-len */
import type { BaseProps } from '../_base/baseComponent';
import type { PaginationProps } from '../pagination';
import type { CheckboxProps } from '../checkbox';
import type { DropdownProps } from '../dropdown';
import type { Locale } from '../locale/interface';
import type { ArrayElement } from '../_base/base';
import { strings } from '@douyinfe/semi-foundation/table/constants';
import type {
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
    BaseIncludeGroupRecord,
    BaseEllipsis
} from '@douyinfe/semi-foundation/table/foundation';
import type { ScrollDirection, CSSDirection } from '@kousum/vue3-window';
import type {VueJsxNode} from "../interface";
import { CSSProperties, DefineSetupFnComponent, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, VNode } from 'vue';
import type { ColumnFilterProps } from './ColumnFilter';

export interface TableProps<RecordType extends Record<string, any> = any> extends BaseProps {
    bordered?: boolean;
    bodyWrapperRef?: any;
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
    keepDOM?: boolean;
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
    sticky?: Sticky;
    direction?: Direction
}

export interface ColumnProps<RecordType extends Record<string, any> = any> {
    align?: Align;
    children?: Array<ColumnProps<RecordType>>;
    className?: string;
    colSpan?: number;
    /** use `dataIndex` to get current column data item from record. If you use `sorter` or `onFilter`, a unique `dataIndex` is required  */
    dataIndex?: string;
    defaultFilteredValue?: any[];
    defaultSortOrder?: SortOrder;
    filterChildrenRecord?: boolean;
    filterDropdown?: ColumnFilterProps['filterDropdown'];
    /** render filter Dropdown panel content  */
    renderFilterDropdown?: ColumnFilterProps['renderFilterDropdown'];
    /** filter Dropdown props  */
    filterDropdownProps?: ColumnFilterProps['filterDropdownProps'];
    filterDropdownVisible?: boolean;
    filterIcon?: FilterIcon;
    filterMultiple?: boolean;
    filteredValue?: any[];
    /** `filters` is not required if you use `renderFilterDropdown`  */
    filters?: Filter[];
    fixed?: Fixed;
    /** the key required by React. If you have already set the `dataIndex`, the key does not need to be set again.  */
    key?: string | number | symbol;
    render?: ColumnRender<RecordType>;
    renderFilterDropdownItem?: RenderFilterDropdownItem;
    sortChildrenRecord?: boolean;
    sortOrder?: SortOrder;
    /** enable sorting, `dataIndex` is required at the same time  */
    sorter?: Sorter<RecordType>;
    sortIcon?: SortIcon;
    title?: ColumnTitle;
    useFullRender?: boolean;
    width?: string | number;
    onCell?: OnCell<RecordType>;
    /** enable filtering, `dataIndex` is required at the same time  */
    onFilter?: OnFilter<RecordType>;
    onFilterDropdownVisibleChange?: OnFilterDropdownVisibleChange;
    onHeaderCell?: OnHeaderCell<RecordType>;
    ellipsis?: BaseEllipsis;
    resize?: boolean
}

export type Align = BaseAlign;
export type SortOrder = BaseSortOrder;
export type SortIcon = (props: { sortOrder: SortOrder }) => VueJsxNode;
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
export type OnHeaderCell<RecordType> = (record?: RecordType, columnIndex?: number, index?: number) => OnHeaderCellReturnObject;
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
export interface OnGroupedRowReturnObject extends HTMLAttributes {
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
    table?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
    header?: {
        outer?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        wrapper?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        row?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        cell?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>
    };
    body?: {
        outer?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        wrapper?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        row?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        cell?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        colgroup?: {
            wrapper?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
            col?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>
        }
    };
    footer?: {
        wrapper?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        row?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        cell?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>;
        outer?: DefineSetupFnComponent<HTMLAttributes & {className?: string}>
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
    onSelectAll?: RowSelectionOnSelectAll<RecordType>;
    onCell?: ColumnProps['onCell'];
    onHeaderCell?: ColumnProps['onHeaderCell'];
    renderCell?: RowSelectionRenderCell<RecordType>
}

export type RowSelectionRenderCell<RecordType> = (renderCellArgs: {
    selected: boolean;
    record: RecordType;
    originNode: JSX.Element;
    inHeader: boolean;
    disabled: boolean;
    indeterminate: boolean;
    index?: number;
    selectRow?: (selected: boolean, e: Event) => void;
    selectAll?: (selected: boolean, e: Event) => void
}) => VNode;
export type GetCheckboxProps<RecordType> = (record: RecordType) => Omit<CheckboxProps, 'defaultChecked' | 'checked' | 'indeterminate' | 'onChange'>;
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
export type VirtualizeItemSizeRow = {
    sectionRow?: boolean;
    expandedRow?: boolean
};
export type VirtualizedItemSizeFn = (index?: number, row?: VirtualizeItemSizeRow) => number;
export type VirtualizedItemSize = number | VirtualizedItemSizeFn;
export type VirtualizedOnScroll = (object: VirtualizedOnScrollArgs) => void;
export interface VirtualizedProps {
    [x: string]: any;
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
