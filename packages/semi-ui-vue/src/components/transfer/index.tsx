import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import {vuePropsMake} from '../PropTypes';
import {isArray, isEmpty, isEqual, noop, omit} from 'lodash';
import TransferFoundation, {
  BasicDataItem,
  OnSortEndProps,
  TransferAdapter,
} from '@douyinfe/semi-foundation/transfer/foundation';
import {_generateDataByType, _generateSelectedItems} from '@douyinfe/semi-foundation/transfer/transferUtils';
import {cssClasses, strings} from '@douyinfe/semi-foundation/transfer/constants';
import '@douyinfe/semi-foundation/transfer/transfer.scss';
import {useBaseComponent} from '../_base/baseComponent';
import LocaleConsumer_ from '../locale/localeConsumer';
import {Locale} from '../locale/interface';
import {Checkbox} from '../checkbox/index';
import Input, {InputProps} from '../input/index';
import Spin from '../spin';
import Button from '../button';
import Tree from '../tree';
import {IconClose, IconHandle, IconSearch} from '@kousum/semi-icons-vue';
import {TreeProps, Value as TreeValue} from '../tree/interface';
import {CSSProperties, defineComponent, Fragment, h, reactive, ref, useSlots, VNode, watch,} from 'vue';
import {VueJsxNode} from '../interface';
import SortableList from "./SortableList";
import type {SortableItemFuncArg} from "../tagInput";
import {arrayMove} from "@dnd-kit-vue/sortable";
import {DragEndEvent} from "@dnd-kit-vue/core";

const LocaleConsumer = LocaleConsumer_();
export interface DataItem extends BasicDataItem {
  label?: VueJsxNode;
  style?: CSSProperties;
}

export interface GroupItem {
  title?: string;
  children?: Array<DataItem>;
}

export interface TreeItem extends DataItem {
  children: Array<TreeItem>;
}

export interface RenderSourceItemProps extends DataItem {
  checked: boolean;
  onChange?: () => void;
}

export interface RenderSelectedItemProps extends DataItem {
  onRemove?: () => void;
  sortableHandle?: any;
}

export interface EmptyContent {
  left?: VueJsxNode;
  right?: VueJsxNode;
  search?: VueJsxNode;
}

export type Type = 'list' | 'groupList' | 'treeList';

export interface SourcePanelProps {
  value: Array<string | number>;
  /* Loading */
  loading: boolean;
  /* Whether there are no items that match the current search value */
  noMatch: boolean;
  /* Items that match the current search value */
  filterData: Array<DataItem>;
  /* All items */
  sourceData: Array<DataItem>;
  /* transfer props' dataSource */
  propsDataSource: DataSource;
  /* Whether to select all */
  allChecked: boolean;
  /* Number of filtered results */
  showNumber: number;
  /* Input search box value */
  inputValue: string;
  /* The function that should be called when the search box changes */
  onSearch: (searchString: string) => void;
  /* The function that should be called when all the buttons on the left are clicked */
  onAllClick: () => void;
  /* Selected item on the left */
  selectedItems: Map<string | number, DataItem>;
  /* The function that should be called when selecting or deleting a single option */
  onSelectOrRemove: (item: DataItem) => void;
  /* The function that should be called when selecting an option, */
  onSelect: (value: Array<string | number>) => void;
}

export type OnSortEnd = ({ oldIndex, newIndex }: OnSortEndProps) => void;

export interface SelectedPanelProps {
  /* Number of selected options */
  length: number;
  /* Collection of all selected options */
  selectedData: Array<DataItem>;
  /* Callback function that should be called when click to clear */
  onClear: () => void;
  /* The function that should be called when a single option is deleted */
  onRemove: (item: DataItem) => void;
  /* The function that should be called when reordering the results */
  onSortEnd: OnSortEnd;
}

export interface ResolvedDataItem extends DataItem {
  _parent?: {
    title: string;
  };
  _optionKey?: string | number;
}

export interface DraggableResolvedDataItem {
  key?: string | number;
  index?: number;
  item?: ResolvedDataItem;
}

export type DataSource = Array<DataItem> | Array<GroupItem> | Array<TreeItem>;

interface HeaderConfig {
  totalContent: string;
  allContent: string;
  onAllClick: () => void;
  type: string;
  showButton: boolean;
}

export interface TransferState {
  data: Array<ResolvedDataItem>;
  selectedItems: Map<number | string, ResolvedDataItem>;
  searchResult: Set<number | string>;
  inputValue: string;
}

export interface TransferProps {
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  dataSource?: DataSource;
  filter?: boolean | ((sugInput: string, item: DataItem) => boolean);
  defaultValue?: Array<string | number>;
  value?: Array<string | number>;
  inputProps?: InputProps;
  type?: Type;
  emptyContent?: EmptyContent;
  draggable?: boolean;
  treeProps?: Omit<TreeProps, 'value' | 'ref' | 'onChange'>;
  showPath?: boolean;
  loading?: boolean;
  onChange?: (values: Array<string | number>, items: Array<DataItem>) => void;
  onSelect?: (item: DataItem) => void;
  onDeselect?: (item: DataItem) => void;
  onSearch?: (sunInput: string) => void;
  renderSourceItem?: (item: RenderSourceItemProps) => VNode;
  renderSelectedItem?: (item: RenderSelectedItemProps, arg: SortableItemFuncArg) => VueJsxNode;
  renderSourcePanel?: (sourcePanelProps: SourcePanelProps) => VueJsxNode;
  renderSelectedPanel?: (selectedPanelProps: SelectedPanelProps) => VueJsxNode;
}

export const prefixCls = cssClasses.PREFIX;


const propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dataSource: PropTypes.array,
  filter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSearch: PropTypes.func,
  inputProps: PropTypes.object,
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  renderSourceItem: PropTypes.func,
  renderSelectedItem: PropTypes.func,
  loading: PropTypes.bool,
  type: PropTypes.string,
  treeProps: PropTypes.object,
  showPath: PropTypes.bool,
  emptyContent: PropTypes.object,
  renderSourcePanel: PropTypes.func,
  renderSelectedPanel: PropTypes.func,
  draggable: PropTypes.bool,
};

const defaultProps = {
  type: strings.TYPE_LIST,
  dataSource: [] as DataSource,
  onSearch: noop,
  onChange: noop,
  onSelect: noop,
  onDeselect: noop,
  onClear: noop,
  defaultValue: [] as Array<string | number>,
  emptyContent: {},
  showPath: false,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const Transfer = defineComponent<TransferProps>((props, {}) => {
  const slots = useSlots();
  const _treeRef = ref();

  const { defaultValue = [], dataSource, type } = props;
  const state = reactive<TransferState>({
    data: [],
    selectedItems: new Map(),
    searchResult: new Set(),
    inputValue: '',
  });
  if (Boolean(dataSource) && isArray(dataSource)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Avoid reporting errors this.state.xxx is read-only
    state.data = _generateDataByType(dataSource, type);
  }
  if (Boolean(defaultValue) && isArray(defaultValue)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Avoid reporting errors this.state.xxx is read-only
    state.selectedItems = _generateSelectedItems(defaultValue, state.data);
  }

  function getDerivedStateFromProps(props: TransferProps) {
    const { value, dataSource, type, filter } = props;
    const mergedState = {} as TransferState;
    let newData:ResolvedDataItem[] = state.data as any;
    let newSelectedItems = state.selectedItems;
    if (Boolean(dataSource) && Array.isArray(dataSource)) {
      newData = _generateDataByType(dataSource, type);
      mergedState.data = newData;
    }
    if (Boolean(value) && Array.isArray(value)) {
      newSelectedItems = _generateSelectedItems(value, newData);
      mergedState.selectedItems = newSelectedItems;
    }
    if (!isEqual(state.data, newData)) {
      if (typeof state.inputValue === 'string' && state.inputValue !== '') {
        const filterFunc =
          typeof filter === 'function'
            ? (item: DataItem) => filter(state.inputValue, item)
            : (item: DataItem) => typeof item.label === 'string' && item.label.includes(state.inputValue);
        const searchData = newData.filter(filterFunc);
        const searchResult = new Set(searchData.map((item) => item.key));
        mergedState.searchResult = searchResult;
      }
    }

    return isEmpty(mergedState) ? null : mergedState;
  }

  watch(
    [
      () => state.selectedItems,
      () => state.data,
      () => state.inputValue,
      () => props.value,
      () => props.dataSource,
      () => props.type,
      () => props.filter,
    ],
    (value, oldValue, onCleanup) => {

      if (!isEqual(value, oldValue)){
        const newState = getDerivedStateFromProps(props);
        if (newState) {
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
        }
      }
    },
    {immediate: true}
  );
  const { adapter: adapterInject } = useBaseComponent<TransferProps>(props, state);
  function adapter_(): TransferAdapter<TransferProps, TransferState> {
    return {
      ...adapterInject(),
      getSelected: () => new Map(state.selectedItems),
      updateSelected: (selectedItems) => {
        state.selectedItems = selectedItems;
      },
      notifyChange: (values, items) => {
        props.onChange(values, items);
      },
      notifySearch: (input) => {
        props.onSearch(input);
      },
      notifySelect: (item) => {
        props.onSelect(item);
      },
      notifyDeselect: (item) => {
        props.onDeselect(item);
      },
      updateInput: (input) => {
        state.inputValue = input;
      },
      updateSearchResult: (searchResult) => {
        state.searchResult = searchResult;
      },
      searchTree: (keyword) => {
        _treeRef.value && _treeRef.value.search(keyword); // TODO check this._treeRef.current?
      },
    };
  }
  const adapter = adapter_();
  const foundation = new TransferFoundation<TransferProps, TransferState>(adapter);

  function onInputChange(value: string) {
    foundation.handleInputChange(value, true);
  }

  function search(value: string) {
    // The search method is used to provide the user with a manually triggered search
    // Since the method is manually called by the user, setting the second parameter to false does not trigger the onSearch callback to notify the user
    foundation.handleInputChange(value, false);
  }

  function onSelectOrRemove(item: ResolvedDataItem) {
    foundation.handleSelectOrRemove(item);
  }

  function onSortEnd(event?:DragEndEvent, callbackProps?: OnSortEndProps) {
    if (event){
      const {active, over} = event;
      const selectedItems = adapter.getSelected();
      let selectedArr = [...selectedItems.values()].map(item=>item.key);
      if (active.id !== over.id) {
        const oldIndex = selectedArr.indexOf(active.id);
        const newIndex = selectedArr.indexOf(over.id);
        foundation.handleSortEnd({ oldIndex, newIndex });
      }
    }
    if (callbackProps){
      foundation.handleSortEnd(callbackProps);
    }
  }
  // function onSortEnd(callbackProps: OnSortEndProps) {
  //   foundation.handleSortEnd(callbackProps);
  // }

  function renderFilter(locale: Locale['Transfer']) {
    const { inputProps, filter, disabled } = props;
    if (typeof filter === 'boolean' && !filter) {
      return null;
    }
    return (
      <div role="search" aria-label="Transfer filter" class={`${prefixCls}-filter`}>
        <Input
          prefix={<IconSearch />}
          placeholder={locale.placeholder}
          showClear
          value={state.inputValue}
          disabled={disabled}
          onChange={onInputChange}
          {...inputProps}
        />
      </div>
    );
  }

  function renderHeader(headerConfig: HeaderConfig) {
    const { disabled } = props;
    const { totalContent, allContent, onAllClick, type, showButton } = headerConfig;
    const headerCls = cls({
      [`${prefixCls}-header`]: true,
      [`${prefixCls}-right-header`]: type === 'right',
      [`${prefixCls}-left-header`]: type === 'left',
    });
    return (
      <div class={headerCls}>
        <span class={`${prefixCls}-header-total`}>{totalContent}</span>
        {showButton ? (
          <Button
            theme="borderless"
            disabled={disabled}
            type="tertiary"
            size="small"
            className={`${prefixCls}-header-all`}
            onClick={onAllClick}
          >
            {allContent}
          </Button>
        ) : null}
      </div>
    );
  }

  function renderLeftItem(item: ResolvedDataItem, index: number) {
    const { renderSourceItem, disabled } = props;
    const { selectedItems } = state;
    const checked = selectedItems.has(item.key);
    if (renderSourceItem) {
      return renderSourceItem({ ...item, checked, onChange: () => onSelectOrRemove(item) });
    }
    const leftItemCls = cls({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-disabled`]: item.disabled,
    });
    return (
      <Checkbox
        key={index}
        disabled={item.disabled || disabled}
        className={leftItemCls}
        checked={checked}
        role="listitem"
        onChange={() => onSelectOrRemove(item)}
        x-semi-children-alias={`dataSource[${index}].label`}
      >
        {item.label}
      </Checkbox>
    );
  }

  function renderLeft(locale: Locale['Transfer']) {
    const { data, selectedItems, inputValue, searchResult } = state;
    const { loading, type, emptyContent, renderSourcePanel, dataSource } = props;
    const totalToken = locale.total;
    const inSearchMode = inputValue !== '';
    const showNumber = inSearchMode ? searchResult.size : data.length;
    // @ts-ignore
    const filterData = inSearchMode ? data.filter((item) => searchResult.has(item.key)) : data;
    // Whether to select all should be a judgment, whether the filtered data on the left is a subset of the selected items
    // For example, the filtered data on the left is 1, 3, 4;
    // The selected option is 1,2,3,4, it is true
    // The selected option is 2,3,4, then it is false
    const leftContainesNotInSelected = Boolean(filterData.find((f) => !selectedItems.has(f.key)));

    const totalText = totalToken.replace('${total}', `${showNumber}`);

    const headerConfig: HeaderConfig = {
      totalContent: totalText,
      allContent: leftContainesNotInSelected ? locale.selectAll : locale.clearSelectAll,
      onAllClick: () => foundation.handleAll(leftContainesNotInSelected),
      type: 'left',
      showButton: type !== strings.TYPE_TREE_TO_LIST,
    };
    const inputCom = renderFilter(locale);
    const headerCom = renderHeader(headerConfig);
    const noMatch = inSearchMode && searchResult.size === 0;
    const emptySearch = emptyContent.search ? emptyContent.search : locale.emptySearch;
    const emptyLeft = emptyContent.left ? emptyContent.left : locale.emptyLeft;
    const emptyDataCom = renderEmpty('left', emptyLeft);
    const emptySearchCom = renderEmpty('left', emptySearch);

    const loadingCom = <Spin />;

    let content: VueJsxNode = null;
    switch (true) {
      case loading:
        content = loadingCom;
        break;
      case noMatch:
        content = emptySearchCom;
        break;
      case data.length === 0:
        content = emptyDataCom;
        break;
      case type === strings.TYPE_TREE_TO_LIST:
        content = (
          <Fragment>
            {headerCom}
            {renderLeftTree()}
          </Fragment>
        );
        break;
      case !noMatch && (type === strings.TYPE_LIST || type === strings.TYPE_GROUP_LIST):
        content = (
          <Fragment>
            {headerCom}
            {renderLeftList(filterData)}
          </Fragment>
        );
        break;
      default:
        content = null;
        break;
    }

    const { values } = foundation.getValuesAndItemsFromMap(selectedItems);

    const renderProps: SourcePanelProps = {
      loading,
      noMatch,
      filterData,
      sourceData: data,
      propsDataSource: dataSource,
      allChecked: !leftContainesNotInSelected,
      showNumber,
      inputValue,
      selectedItems,
      value: values,
      onSelect: foundation.handleSelect.bind(foundation),
      onAllClick: () => foundation.handleAll(leftContainesNotInSelected),
      onSearch: onInputChange,
      onSelectOrRemove: (item: ResolvedDataItem) => onSelectOrRemove(item),
    };

    if (renderSourcePanel) {
      return renderSourcePanel(renderProps);
    }

    return (
      <section class={`${prefixCls}-left`}>
        {inputCom}
        {content}
      </section>
    );
  }

  function renderGroupTitle(group: GroupItem, index: number) {
    const groupCls = cls(`${prefixCls}-group-title`);
    return (
      <div class={groupCls} key={`title-${index}`}>
        {group.title}
      </div>
    );
  }

  function renderLeftTree() {
    const { selectedItems } = state;
    const { disabled, dataSource, treeProps } = props;
    const { values } = foundation.getValuesAndItemsFromMap(selectedItems);
    const onChange = (value: TreeValue) => {
      foundation.handleSelect(value);
    };
    const restTreeProps = omit(treeProps, ['value', 'ref', 'onChange']);
    return (
      <Tree
        disabled={disabled}
        treeData={dataSource as any}
        multiple
        disableStrictly
        value={values}
        defaultExpandAll
        leafOnly
        ref={_treeRef}
        filterTreeNode
        searchRender={false}
        searchStyle={{ padding: 0 }}
        style={{ flex: 1, overflow: 'overlay' }}
        onChange={onChange}
        {...restTreeProps}
      />
    );
  }

  function renderLeftList(visibileItems: Array<ResolvedDataItem>) {
    const content = [] as Array<VNode>;
    const groupStatus = new Map();

    visibileItems.forEach((item, index) => {
      const parentGroup = item._parent;
      const optionContent = renderLeftItem(item, index);
      if (parentGroup && groupStatus.has(parentGroup.title)) {
        // group content already insert
        content.push(optionContent);
      } else if (parentGroup) {
        const groupContent = renderGroupTitle(parentGroup, index);
        groupStatus.set(parentGroup.title, true);
        content.push(groupContent);
        content.push(optionContent);
      } else {
        content.push(optionContent);
      }
    });
    return (
      <div class={`${prefixCls}-left-list`} role="list" aria-label="Option list">
        {content}
      </div>
    );
  }

  function renderRightItem(item: ResolvedDataItem) {
    const { renderSelectedItem, draggable, type, showPath } = props;
    const onRemove = () => foundation.handleSelectOrRemove(item);
    const rightItemCls = cls({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-right-item`]: true,
      [`${prefixCls}-right-item-draggable`]: draggable,
    });
    const shouldShowPath = type === strings.TYPE_TREE_TO_LIST && showPath === true;

    const label = shouldShowPath ? foundation._generatePath(item) : item.label;

    if (renderSelectedItem) {
      return (arg: SortableItemFuncArg)=>renderSelectedItem({ ...item, onRemove, sortableHandle: ()=>{} }, arg);
    }

    return (arg: SortableItemFuncArg)=>{
      return (
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
        <div role="listitem" ref={arg.setNodeRef} class={rightItemCls} key={item.key} {...arg.attributes} style={arg.style}>
          {draggable ? <IconHandle {...arg.listeners} role="button" aria-label="Drag and sort" className={`${prefixCls}-right-item-drag-handler`} /> : null}
          <div class={`${prefixCls}-right-item-text`}>{label}</div>
          <IconClose
            onClick={onRemove}
            aria-disabled={item.disabled}
            className={cls(`${prefixCls}-item-close-icon`, {
              [`${prefixCls}-item-close-icon-disabled`]: item.disabled,
            })}
          />
        </div>
      )
    };
  }

  function renderEmpty(type: string, emptyText: VueJsxNode) {
    const emptyCls = cls({
      [`${prefixCls}-empty`]: true,
      [`${prefixCls}-right-empty`]: type === 'right',
      [`${prefixCls}-left-empty`]: type === 'left',
    });
    return (
      <div aria-label="empty" class={emptyCls}>
        {emptyText}
      </div>
    );
  }

  function renderRightSortableList(selectedData: Array<ResolvedDataItem>) {
    const sortableListItems = selectedData.map((item) => {
      return ({
        ...item,
        id: item.key,
        node: renderRightItem(item),
      })
    });

    // helperClass：add styles to the helper(item being dragged) https://github.com/clauderic/react-sortable-hoc/issues/87
    // @ts-ignore skip SortableItem type check
    const sortList = (
      <SortableList
        useDragHandle
        helperClass={`${prefixCls}-right-item-drag-item-move`}
        onSortEnd={onSortEnd}
        items={sortableListItems}
      />
    );
    return sortList;
  }

  function renderRight(locale: Locale['Transfer']) {
    const { selectedItems } = state;
    const { emptyContent, renderSelectedPanel, draggable } = props;
    const selectedData = [...selectedItems.values()];

    // when custom render panel
    const renderProps: SelectedPanelProps = {
      length: selectedData.length,
      selectedData,
      onClear: () => foundation.handleClear(),
      onRemove: (item) => foundation.handleSelectOrRemove(item),
      onSortEnd: (props) => onSortEnd(null, props),
    };
    if (renderSelectedPanel) {
      return renderSelectedPanel(renderProps);
    }
    const selectedToken = locale.selected;
    const selectedText = selectedToken.replace('${total}', `${selectedData.length}`);
    const headerConfig = {
      totalContent: selectedText,
      allContent: locale.clear,
      onAllClick: () => foundation.handleClear(),
      type: 'right',
      showButton: Boolean(selectedData.length),
    };
    const headerCom = renderHeader(headerConfig);
    const emptyCom = renderEmpty('right', emptyContent.right ? emptyContent.right : locale.emptyRight);
    const panelCls = `${prefixCls}-right`;

    let content = null;

    switch (true) {
      // when empty
      case !selectedData.length:
        content = emptyCom;
        break;
      case selectedData.length && !draggable:
        const list = (
          <div class={`${prefixCls}-right-list`} role="list" aria-label="Selected list">
            {selectedData.map((item) => {
              return renderRightItem({...item})({})
            })}
          </div>
        );
        content = list;
        break;
      case selectedData.length && draggable:
        content = renderRightSortableList(selectedData);
        break;
      default:
        break;
    }

    return (
      <section class={panelCls}>
        {headerCom}
        {content}
      </section>
    );
  }

  return () => {
    const { className, style, disabled, renderSelectedPanel, renderSourcePanel } = props;
    const transferCls = cls(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-custom-panel`]: renderSelectedPanel && renderSourcePanel,
    });

    return (
      <LocaleConsumer componentName="Transfer">
        {(locale: Locale['Transfer']) => (
          <div class={transferCls} style={style}>
            {renderLeft(locale)}
            {renderRight(locale)}
          </div>
        )}
      </LocaleConsumer>
    );
  };
});

Transfer.props = vuePropsType;
Transfer.name = 'Transfer';

export default Transfer;
