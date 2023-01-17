
import * as PropTypes from '../../PropTypes';
import {get, size, isMap, each, isEqual, pick, isNull, isFunction, omit} from 'lodash';
import classnames from 'classnames';
import { VariableSizeList as List } from '@kousum/vue3-window';

import {
    arrayAdd,
    getRecordKey,
    isExpanded,
    isSelected,
    isDisabled,
    getRecord,
    genExpandedRowKey,
    getDefaultVirtualizedRowConfig,
    isTreeTable
} from '@douyinfe/semi-foundation/table/utils';
import BodyFoundation, { BodyAdapter, FlattenData, GroupFlattenData } from '@douyinfe/semi-foundation/table/bodyFoundation';
import { strings } from '@douyinfe/semi-foundation/table/constants';
import Store from '@douyinfe/semi-foundation/utils/Store';

import {BaseProps, useBaseComponent} from '../../_base/baseComponent';
import { logger } from '../utils';
import ColGroup from '../ColGroup';
import BaseRow, {BaseRowPropTypes} from './BaseRow';
import ExpandedRow from './ExpandedRow';
import SectionRow, {SectionRowPropTypes} from './SectionRow';

import TableHeader from '../TableHeader';
import ConfigContext from '../../configProvider/context';
import TableContext, { TableContextProps } from '../table-context';
import {
    ExpandedRowRender,
    Virtualized,
    GetVirtualizedListRef,
    ColumnProps,
    Size,
    BodyScrollEvent,
    Scroll,
    Fixed,
    TableComponents,
    RowExpandable,
    VirtualizedOnScroll,
    Direction,
    RowKey
} from '../interface';
import {VueJsxNode} from "../../interface";
import {
    CSSProperties,
    defineComponent, Fragment,
    FunctionalComponent,
    h,
    nextTick,
    reactive,
    ref,
    useSlots,
    watch, WatchStopHandle
} from "vue";
import {vuePropsMake} from "../../PropTypes";
import {useTableContext} from "../tableContext/Consumer";
import {FooterProps} from "../../image/interface";

export interface BodyProps extends BaseProps {
    anyColumnFixed?: boolean;
    columns?: ColumnProps[];
    dataSource?: Record<string, any>[];
    disabledRowKeysSet: Set<any>; // required
    emptySlot?: VueJsxNode;
    expandedRowKeys?: (string | number)[];
    expandedRowRender?: ExpandedRowRender<Record<string, any>>;
    fixed?: Fixed;
    forwardedRef?: any;
    handleBodyScroll?: (e: BodyScrollEvent) => void;
    handleWheel?: (e: WheelEvent) => void;
    includeHeader?: boolean;
    prefixCls?: string;
    scroll?: Scroll;
    selectedRowKeysSet: Set<any>; // required
    showHeader?: boolean;
    size?: Size;
    virtualized?: Virtualized;
    components?: TableComponents;
    store: Store;
    groups?: Map<string, Record<string, any>[]>[];
    rowKey?: RowKey<Record<string, any>>;
    childrenRecordName?: string;
    rowExpandable?: RowExpandable<Record<string, any>>;
    renderExpandIcon: (record: Record<string, any>, isNested: boolean) => VueJsxNode | null;
    headerRef?: any;
    onScroll?: VirtualizedOnScroll,
    bodyWrapperRef?: any
}

export interface BodyState {
    virtualizedData?: Array<FlattenData | GroupFlattenData>;
    cache?: {
        virtualizedScrollTop?: number;
        virtualizedScrollLeft?: number
    };
    cachedExpandBtnShouldInRow?: boolean;
    cachedExpandRelatedProps?: any[]
}

export interface BodyContext {
    getVirtualizedListRef: GetVirtualizedListRef;
    flattenedColumns: ColumnProps[];
    getCellWidths: (flattenedColumns: ColumnProps[]) => number[]
}

const propTypes = {
    anyColumnFixed: PropTypes.bool,
    childrenRecordName: PropTypes.string,
    columns: PropTypes.array,
    components: PropTypes.object,
    dataSource: PropTypes.array,
    disabledRowKeysSet: PropTypes.object,
    emptySlot: PropTypes.node,
    expandRowByClick: PropTypes.bool,
    expandedRowKeys: PropTypes.array,
    expandedRowRender: PropTypes.func,
    fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    groups: PropTypes.object,
    handleBodyScroll: PropTypes.func,
    handleWheel: PropTypes.func,
    headerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    includeHeader: PropTypes.bool,
    onScroll: PropTypes.func,
    prefixCls: PropTypes.string,
    renderExpandIcon: PropTypes.func,
    rowExpandable: PropTypes.func,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    scroll: PropTypes.object,
    selectedRowKeysSet: PropTypes.object,
    showHeader: PropTypes.bool,
    size: PropTypes.string,
    store: PropTypes.object,
    virtualized: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),

    tableWidth: PropTypes.number,
    tableLayout: PropTypes.any,
    expandIcon: PropTypes.any,
    expandCellFixed: PropTypes.any,
    title: PropTypes.any,
    indentSize: PropTypes.any,
    defaultExpandAllRows: PropTypes.any,
    expandAllRows: PropTypes.any,
    defaultExpandAllGroupRows: PropTypes.any,
    expandAllGroupRows: PropTypes.any,
    defaultExpandedRowKeys: PropTypes.any,
    footer: PropTypes.any,
    empty: PropTypes.any,
    groupBy: PropTypes.any,
    renderGroupSection: PropTypes.any,
    clickGroupedRowToExpand: PropTypes.any,
    dropdownPrefixCls: PropTypes.any,
    cachedColumns: PropTypes.any,
    cachedChildren: PropTypes.any,
    flattenColumns: PropTypes.any,
    queries: PropTypes.any,
    flattenData: PropTypes.any,
    pagination: PropTypes.any,
    allRowKeys: PropTypes.any,
    disabledRowKeys: PropTypes.any,
    bodyHasScrollBar: PropTypes.any,
    prePropRowSelection: PropTypes.any,
    prePagination: PropTypes.any,
    hideExpandedColumn: PropTypes.any,
    filteredColumns: PropTypes.any,
    useFixedHeader: PropTypes.any,
    bodyRef: PropTypes.any,
    onExpandedRowsChange: PropTypes.func,
    onExpand: PropTypes.func,
    onChange: PropTypes.func,

    onRow: PropTypes.func,
    bodyWrapperRef: [PropTypes.func, PropTypes.object],
    onGroupedRow: PropTypes.func,
};
export {
    propTypes as BodyPropTypes
}
export const vuePropsType = vuePropsMake(propTypes, {});
const Body = defineComponent<BodyProps>((props, {}) => {
    const slots = useSlots();

    const nodeRef = ref()
    const listRef = ref()
    let observer: ResizeObserver;
    let cellWidths: number[];
    let flattenedColumns: ColumnProps[];
    const {context} = useTableContext()
    const state = reactive<BodyState>({
        virtualizedData: [],
        cache: {
            virtualizedScrollTop: null,
            virtualizedScrollLeft: null,
        },
        cachedExpandBtnShouldInRow: null,
        cachedExpandRelatedProps: [],
    })


    watch([listRef, ()=>context.value.getVirtualizedListRef], ()=>{
        if (props.virtualized) {
            context.value.getVirtualizedListRef?.(listRef.value)
        } else {
            console.warn('getVirtualizedListRef only works with virtualized. ' +
              'See https://semi.design/zh-CN/show/table for more information.');
        }
    })
    let one1: WatchStopHandle
    one1 = watch(()=>context.value.getVirtualizedListRef, (value)=>{
        flattenedColumns = context.value.flattenedColumns as any;
        cellWidths = context.value.getCellWidths(flattenedColumns);
        one1?.()
    }, {immediate: true})
    observer = null;
    const {adapter: adapterInject} = useBaseComponent<BodyProps>(props, {})
    function adapter_(): BodyAdapter<BodyProps, BodyState> {
        return {
            ...adapterInject(),
            setVirtualizedData: (virtualizedData, cb) => {
                state.virtualizedData = virtualizedData
                nextTick(cb)
            },
            setCachedExpandBtnShouldInRow: cachedExpandBtnShouldInRow => state.cachedExpandBtnShouldInRow = cachedExpandBtnShouldInRow,
            setCachedExpandRelatedProps: cachedExpandRelatedProps => state.cachedExpandRelatedProps = cachedExpandRelatedProps,
            observeBodyResize: (bodyWrapDOM: HTMLDivElement) => {
                const { setBodyHasScrollbar } = context.value;

                // Callback when the size of the body dom content changes, notifying Table.jsx whether the bodyHasScrollBar exists
                const resizeCallback = () => {
                    const update = () => {
                        const { offsetWidth, clientWidth } = bodyWrapDOM;
                        const bodyHasScrollBar = clientWidth < offsetWidth;
                        setBodyHasScrollbar(bodyHasScrollBar);
                    };
                    const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
                    requestAnimationFrame(update);
                };

                // Monitor body dom resize
                if (bodyWrapDOM) {
                    if (get(window, 'ResizeObserver')) {
                        if (observer) {
                            observer.unobserve(bodyWrapDOM);
                            observer = null;
                        }
                        observer = new ResizeObserver(resizeCallback);
                        observer.observe(bodyWrapDOM);
                    } else {
                        logger.warn(
                          'The current browser does not support ResizeObserver,' +
                          'and the table may be misaligned after plugging and unplugging the mouse and keyboard.' +
                          'You can try to refresh it.'
                        );
                    }
                }
            },
            unobserveBodyResize: () => {
                const bodyWrapDOM = nodeRef.value;
                if (observer) {
                    observer.unobserve(bodyWrapDOM);
                    observer = null;
                }
            },
        };
    }
    const adapter = adapter_()
    const foundation = new BodyFoundation(adapter);

    watch([
        () => props.virtualized,
        () => props.dataSource,
        () => props.expandedRowKeys,
        () => props.columns,
        () => props.scroll,
        () => state.cachedExpandRelatedProps
    ], (value, [
            prevPropsVirtualized,
            prevPropsDataSource,
            prevPropsExpandedRowKeys,
            prevPropsColumns,
            prevPropsScroll,
            prevStateCachedExpandRelatedProps
        ]) => {
        const { virtualized, dataSource, expandedRowKeys, columns, scroll } = props;

        if (virtualized) {
            if (
              prevPropsDataSource !== dataSource ||
              prevPropsExpandedRowKeys !== expandedRowKeys ||
              prevPropsColumns !== columns
            ) {
                foundation.initVirtualizedData();
            }
        }

        const expandRelatedProps = strings.EXPAND_RELATED_PROPS;
        const newExpandRelatedProps = expandRelatedProps.map(key => get(props, key, undefined));
        if (!isEqual(newExpandRelatedProps, prevStateCachedExpandRelatedProps)) {
            foundation.initExpandBtnShouldInRow(newExpandRelatedProps);
        }

        const scrollY = get(scroll, 'y');
        const bodyWrapDOM = nodeRef.value;
        if (scrollY && scrollY !== prevPropsScroll?.y) {
            foundation.observeBodyResize(bodyWrapDOM);
        }
    }, {immediate: true})






    const forwardRef = (node: HTMLDivElement) => {
        const { forwardedRef } = props;
        nodeRef.value = node;
        foundation.observeBodyResize(node);
        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef && typeof forwardedRef === 'object') {
            forwardedRef.value = node;
        }
    };

    const itemSize = (index: number) => {
        const { virtualized, size: tableSize } = props;
        const { virtualizedData } = state;
        const virtualizedItem = get(virtualizedData, index);
        const defaultConfig = getDefaultVirtualizedRowConfig(tableSize, virtualizedItem.sectionRow);

        const itemSize = get(virtualized, 'itemSize', defaultConfig.height);

        let realSize = itemSize;

        if (typeof itemSize === 'function') {
            realSize = itemSize(index, {
                expandedRow: get(virtualizedItem, 'expandedRow', false),
                sectionRow: get(virtualizedItem, 'sectionRow', false),
            });
        }

        if (realSize < defaultConfig.minHeight) {
            logger.warn(`The computed real \`itemSize\` cannot be less than ${defaultConfig.minHeight}`);
        }

        return realSize;
    };

    const itemKey = (index: number, data: Array<FlattenData | GroupFlattenData>) => get(data, [index, 'key'], index);

    const handleRowClick = (rowKey: RowKey<any>, e: MouseEvent, expand: boolean) => {
        const { handleRowExpanded } = context.value;
        handleRowExpanded(!expand, rowKey, e);
    };

    const handleVirtualizedScroll = (props_ = {}) => {
        const onScroll = get(props.virtualized, 'onScroll');
        if (typeof onScroll === 'function') {
            onScroll(props_);
        }
    };

    /**
     * @param {MouseEvent<HTMLDivElement>} e
     */
    const handleVirtualizedBodyScroll = (e: BodyScrollEvent) => {
        const { handleBodyScroll } = props;

        const newScrollLeft = get(e, 'nativeEvent.target.scrollLeft');
        const newScrollTop = get(e, 'nativeEvent.target.scrollTop');

        if (newScrollTop === state.cache.virtualizedScrollTop) {
            handleVirtualizedScroll({ horizontalScrolling: true });
        }

        state.cache.virtualizedScrollLeft = newScrollLeft;
        state.cache.virtualizedScrollTop = newScrollTop;

        if (typeof handleBodyScroll === 'function') {
            handleBodyScroll(e);
        }
    };

    const getVirtualizedRowWidth = () => {
        const { getCellWidths } = context.value;
        const { columns } = props;
        const cellWidths = getCellWidths(columns);
        const rowWidth = arrayAdd(cellWidths, 0, size(columns));

        return rowWidth;
    };

    const renderVirtualizedRow = (options: { index?: number; style?: CSSProperties; isScrolling?: boolean }) => {
        const { index, style } = options;
        const { virtualizedData, cachedExpandBtnShouldInRow } = state;
        const { flattenedColumns } = context.value;
        const virtualizedItem: any = get(virtualizedData, [index], {});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key, parentKeys, expandedRow, sectionRow, ...rest } = virtualizedItem;
        const rowWidth = getVirtualizedRowWidth();

        const expandBtnShouldInRow = cachedExpandBtnShouldInRow;

        const props_ = {
            ...props,
            style: {
                ...style,
                width: rowWidth + 'px',
            },
            ...rest,
            columns: flattenedColumns,
            index,
            expandBtnShouldInRow,
        };
        // eslint-disable-next-line no-nested-ternary
        return sectionRow ?
          renderSectionRow(props_) :
          expandedRow ?
            renderExpandedRow(props_) :
            renderBaseRow(props_);
    };

    // virtualized List innerElementType
    const renderTbody: FunctionalComponent<any> = ((props_, {slots}) => {

        return (
          <div
            {...props_}
            onScroll={(...args) => {
                if (props_.onScroll) {
                    props_.onScroll(...args);
                }
            }}
            class={classnames(props_.className, `${props.prefixCls}-tbody`)}
            style={{ ...props_.style }}
            ref={ref}
          >
              {slots?.default?.()}
          </div>
        )
    });

    // virtualized List outerElementType
    const renderOuter: FunctionalComponent<any> = ((props_, {slots}) => {
        const {...rest } = props_;
        // eslint-disable-next-line react/no-this-in-sfc
        const { handleWheel, prefixCls, emptySlot, dataSource } = props;

        // eslint-disable-next-line react/no-this-in-sfc
        const tableWidth = getVirtualizedRowWidth();
        const tableCls = classnames(`${prefixCls}`, `${prefixCls}-fixed`);

        return (
          <div
            {...rest}
            ref={ref}
            onWheel={(...args) => {
                if (handleWheel) {
                    handleWheel(...args);
                }
                if (rest.onWheel) {
                    rest.onWheel(...args);
                }
            }}
            onScroll={(...args) => {
                // eslint-disable-next-line react/no-this-in-sfc
                handleVirtualizedBodyScroll(...args);
                if (rest.onScroll) {
                    rest.onScroll(...args);
                }
            }}
          >
              <div style={{ width: tableWidth + 'px' }} class={tableCls}>
                  {slots.default?.()}
              </div>
              {size(dataSource) === 0 && emptySlot}
          </div>
        );
    });

    const onItemsRendered = (props: { overscanStartIndex: number; overscanStopIndex: number; visibleStartIndex: number; visibleStopIndex: number }) => {
        if (state.cache.virtualizedScrollLeft && nodeRef.value) {
            nodeRef.value.scrollLeft = state.cache.virtualizedScrollLeft;
        }
    };

    const renderVirtualizedBody = (direction?: Direction) => {
        const { scroll, prefixCls, virtualized, anyColumnFixed, columns } = props;
        const { virtualizedData } = state;
        const { getCellWidths } = context.value;
        const cellWidths = getCellWidths(columns);

        if (!size(cellWidths)) {
            return null;
        }

        const rawY = get(scroll, 'y');
        const yIsNumber = typeof rawY === 'number';
        const y = yIsNumber ? rawY : 600;

        if (!yIsNumber) {
            logger.warn('You have to specific "scroll.y" which must be a number for table virtualization!');
        }

        const listStyle = {
            width: '100%',
            height: virtualizedData?.length ? y + 'px' : null,
            overflowX: 'auto',
            overflowY: 'auto',
        } as const;

        const wrapCls = classnames(`${prefixCls}-body`);

        return (
          <List
            {...(typeof virtualized === 'object' ? virtualized : {})}
            initialScrollOffset={state.cache.virtualizedScrollTop}
            onScroll={handleVirtualizedScroll}
            onItemsRendered={onItemsRendered}
            ref={listRef}
            className={wrapCls}
            outerRef={forwardRef}
            height={virtualizedData?.length ? y : 0}
            width={listStyle.width}
            itemData={virtualizedData}
            itemSize={itemSize}
            itemCount={virtualizedData.length}
            itemKey={itemKey}
            innerElementType={renderTbody as any}
            outerElementType={renderOuter as any}
            style={{ ...listStyle, direction }}
            direction={direction}
          >
              {{default: renderVirtualizedRow}}
          </List>
        );
    };

    /**
     * render group title
     * @param props_
     */
    const renderSectionRow = (props_: RenderSectionRowProps = { groupKey: undefined }) => {
        const { dataSource, rowKey, group, groupKey, index } = props_;
        const sectionRowPickKeys = Object.keys(SectionRowPropTypes);
        const sectionRowProps: any = pick(props_, sectionRowPickKeys);

        const { handleRowExpanded } = context.value;

        return (
          <SectionRow
            {...{
                ...sectionRowProps,
                onExpand: handleRowExpanded,
                record: {
                    groupKey,
                    records: [...group].map(recordKey => getRecord(dataSource, recordKey, rowKey)),
                },
                index,
                data: dataSource
            }}
            key={groupKey || index}
          />
        );
    };

    const renderExpandedRow = (props_: RenderExpandedRowProps = { renderExpandIcon: () => null }) => {
        const {
            style,
            components,
            renderExpandIcon,
            expandedRowRender,
            record,
            columns,
            expanded,
            index,
            rowKey,
            virtualized,
        } = props_;
        let key = getRecordKey(record, rowKey);

        if (key == null) {
            key = index;
        }

        const { getCellWidths } = context.value;

        // we use memoized cellWidths to avoid re-render expanded row (fix #686)
        if (flattenedColumns !== context.value.flattenedColumns as any ) {
            flattenedColumns = context.value.flattenedColumns as any;
            cellWidths = getCellWidths(flattenedColumns);
        }

        return (
          <ExpandedRow
            style={style}
            components={components}
            renderExpandIcon={renderExpandIcon}
            expandedRowRender={expandedRowRender}
            record={record}
            columns={columns}
            expanded={expanded}
            index={index}
            virtualized={virtualized}
            key={genExpandedRowKey(key)}
            cellWidths={cellWidths}
          />
        );
    };

    /**
     * render base row
     * @param {*} props
     * @returns
     */
    function renderBaseRow(props: any = {}) {
        // console.log(ctx)
        const {
            rowKey,
            columns,
            expandedRowKeys,
            rowExpandable,
            record,
            index,
            level,
            expandBtnShouldInRow, // effect the display of the indent span
            selectedRowKeysSet,
            disabledRowKeysSet,
            expandRowByClick,
        } = props;

        const baseRowPickKeys = Object.keys(BaseRowPropTypes);
        const baseRowProps: Record<string, any> = pick(props, baseRowPickKeys);

        let key = getRecordKey(record, rowKey);

        if (key == null) {
            key = index;
        }

        const expanded = isExpanded(expandedRowKeys, key);
        const expandable = rowExpandable && rowExpandable(record);

        const expandableProps: {
            level?: number;
            expanded?: boolean;
            expandableRow?: boolean;
            onRowClick?: (...args: any[]) => void
        } = {
            level: undefined,
            expanded,
        };

        if (expandable || expandBtnShouldInRow) {
            expandableProps.level = level;
            expandableProps.expandableRow = expandable;
            if (expandRowByClick) {
                expandableProps.onRowClick = handleRowClick;
            }
        }

        const selectionProps = {
            selected: isSelected(selectedRowKeysSet, key),
            disabled: isDisabled(disabledRowKeysSet, key),
        };

        const { getCellWidths } = context.value;
        const cellWidths = getCellWidths(columns, null, true);
        return (
          // 这里必须加Fragment，不然BaseRow会传入一个默认的props，来历不明？
          <Fragment>
              {/*// @ts-ignore*/}
              <BaseRow
                {...{
                    ...baseRowProps,
                    ...expandableProps,
                    ...selectionProps,
                    key,
                    rowKey: key,
                    cellWidths: cellWidths
                }}
              />
          </Fragment>
        );
    }

    /**
     * render grouped rows
     * @returns {VueJsxNode[]} renderedRows
     */
    const renderGroupedRows = () => {
        const { groups, dataSource: data, rowKey, expandedRowKeys } = props;
        const { flattenedColumns } = context.value;
        const groupsInData = new Map();
        const renderedRows: VueJsxNode[] = [];

        if (groups != null && Array.isArray(data) && data.length) {
            data.forEach(record => {
                const recordKey = getRecordKey(record, rowKey);

                groups.forEach((group: Map<string, Record<string, any>[]>, key: number) => {
                    if (group.has(recordKey)) {
                        if (!groupsInData.has(key)) {
                            groupsInData.set(key, new Set([]));
                        }
                        groupsInData.get(key).add(recordKey);
                        return false;
                    }
                    return undefined;
                });
            });
        }

        let index = -1;
        groupsInData.forEach((group, groupKey) => {
            // Calculate the expanded state of the group
            const expanded = isExpanded(expandedRowKeys, groupKey);

            // Render the title of the group
            renderedRows.push(
              renderSectionRow({
                  ...(props as any),
                  columns: flattenedColumns,
                  index: ++index,
                  group,
                  groupKey,
                  expanded,
              })
            );

            // Render the grouped content when the group is expanded
            if (expanded) {
                const dataInGroup: any[] = [];

                group.forEach((recordKey: string) => {
                    const record = getRecord(data, recordKey, rowKey);

                    if (record != null) {
                        dataInGroup.push(record);
                    }
                });

                /**
                 * Render the contents of the group row
                 */
                renderedRows.push(renderBodyRows(dataInGroup));
            }
        });

        return renderedRows;
    };

    function renderBodyRows(data: Record<string, any>[] = [], level = 0, renderedRows: VueJsxNode[] = []) {
        const {
            rowKey,
            expandedRowRender,
            expandedRowKeys,
            childrenRecordName,
            rowExpandable,
        } = props;

        const hasExpandedRowRender = typeof expandedRowRender === 'function';
        const expandBtnShouldInRow = state.cachedExpandBtnShouldInRow;
        const { flattenedColumns } = context.value;

        each(data, (record, index) => {
            let key = getRecordKey(record, rowKey);

            if (key == null) {
                key = index;
            }

            const recordChildren = get(record, childrenRecordName);
            const recordHasChildren = Boolean(Array.isArray(recordChildren) && recordChildren.length);

            renderedRows.push(
              renderBaseRow({
                  ...props,
                  columns: flattenedColumns,
                  expandBtnShouldInRow,
                  record,
                  key,
                  level,
                  index,
              })
            );

            // render expand row
            const expanded = isExpanded(expandedRowKeys, key);
            if (hasExpandedRowRender && rowExpandable && rowExpandable(record) && expanded) {
                const currentExpandRow = renderExpandedRow({
                    ...(props as any),
                    columns: flattenedColumns,
                    level,
                    index,
                    record,
                    expanded,
                });
                /**
                 * If expandedRowRender returns falsy, this expanded row will not be rendered
                 * Render an empty div before v1.19.7
                 */
                if (!isNull(currentExpandRow)) {
                    renderedRows.push(currentExpandRow);
                }
            }

            // render tree data
            if (recordHasChildren && expanded) {
                const nestedRows = renderBodyRows(recordChildren, level + 1);
                renderedRows.push(...nestedRows);
            }
        });

        return renderedRows;
    }

    const renderBody = (direction?: Direction) => {
        const {
            scroll,
            prefixCls,
            columns,
            components,
            fixed,
            handleWheel,
            headerRef,
            handleBodyScroll,
            anyColumnFixed,
            showHeader,
            emptySlot,
            includeHeader,
            dataSource,
            onScroll,
            groups,
            expandedRowRender,
        } = props;

        const x = get(scroll, 'x');
        const y = get(scroll, 'y');

        const bodyStyle: {
            maxHeight?: string | number;
            overflow?: string;
            WebkitTransform?: string
        } = {};
        const tableStyle: {
            width?: string | number
        } = {};
        const Table = get(components, 'body.outer', 'table');
        const BodyWrapper = get(components, 'body.wrapper') || 'tbody';

        if (y) {
            bodyStyle.maxHeight = typeof y === 'string'? y: y + 'px';
        }

        if (x) {
            tableStyle.width = typeof x === 'string'? x: x + 'px';
        }

        if (anyColumnFixed && size(dataSource)) {
            // Auto is better than scroll. For example, when there is only scrollY, the scroll axis is not displayed horizontally.
            bodyStyle.overflow = 'auto';
            // Fix weird webkit render bug
            bodyStyle.WebkitTransform = 'translate3d (0, 0, 0)';
        }

        const colgroup = <ColGroup components={get(components, 'body')} columns={columns} prefixCls={prefixCls} />;
        // const tableBody = renderBody();
        const wrapCls = `${prefixCls}-body`;


        const baseTable = (
          <div
            key="bodyTable"
            class={wrapCls}
            style={bodyStyle}
            ref={forwardRef as any}
            onWheel={handleWheel}
            onScroll={handleBodyScroll}
          >
              <Table
                role={isMap(groups) || isFunction(expandedRowRender) || isTreeTable({ dataSource }) ? 'treegrid' : 'grid'}
                aria-rowcount={dataSource && dataSource.length}
                aria-colcount={columns && columns.length}
                style={tableStyle}
                className={classnames(prefixCls, {
                    [`${prefixCls}-fixed`]: anyColumnFixed,
                })}
              >
                  {colgroup}
                  {includeHeader && showHeader ? (
                    <TableHeader {...props} ref={headerRef} components={components} columns={columns} />
                  ) : null}
                  <BodyWrapper ref={props.bodyWrapperRef} className={`${prefixCls}-tbody`} onScroll={onScroll}>
                      {isMap(groups) ? renderGroupedRows() : renderBodyRows(dataSource)}
                  </BodyWrapper>
              </Table>
              {emptySlot}
          </div>
        );

        if (fixed && columns.length) {
            return (
              <div key="bodyTable" class={`${prefixCls}-body-outer`}>
                  {baseTable}
              </div>
            );
        }

        return baseTable;
    };


    return () => {
        const { virtualized } = props;
        return (
          <ConfigContext.Consumer>
              {({ direction }: { direction?: Direction }) => (virtualized ? renderVirtualizedBody(direction) : renderBody(direction))}
          </ConfigContext.Consumer>
        );
    };
});

Body.props = vuePropsType;
Body.name = "Body";

export default Body;




export interface RenderExpandedRowProps {
    style?: CSSProperties;
    components?: TableComponents;
    renderExpandIcon: (record?: Record<string, any>, isNested?: boolean) => VueJsxNode | null;
    expandedRowRender?: ExpandedRowRender<Record<string, any>>;
    record?: Record<string, any>;
    columns?: ColumnProps[];
    expanded?: boolean;
    index?: number;
    rowKey?: RowKey<Record<string, any>>;
    virtualized?: Virtualized;
    level?: number
}

export interface RenderSectionRowProps {
    dataSource?: Record<string, any>[];
    columns?: ColumnProps[];
    rowKey?: RowKey<Record<string, any>>;
    group?: any;
    groupKey: string | number;
    index?: number;
    expanded?: boolean
}
