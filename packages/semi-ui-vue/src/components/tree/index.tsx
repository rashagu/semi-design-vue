import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import TreeFoundation, {TreeAdapter} from '@douyinfe/semi-foundation/tree/foundation';
import {
  convertDataToEntities,
  flattenTreeData,
  calcExpandedKeysForValues,
  calcMotionKeys,
  convertJsonToData,
  findKeysForValues,
  calcCheckedKeys,
  calcExpandedKeys,
  filterTreeData,
  normalizeValue,
  updateKeys,
  calcDisabledKeys
} from '@douyinfe/semi-foundation/tree/treeUtil';
import {cssClasses, strings} from '@douyinfe/semi-foundation/tree/constants';

import { isEmpty, isEqual, get, isFunction, pick, isUndefined } from 'lodash';
import {cloneDeep} from './treeUtil';
import Input from '../input/index';
import {FixedSizeList as VirtualList} from '@kousum/vue3-window';
import AutoSizer from './autoSizer';
import TreeContext from './treeContext';
import TreeNode from './treeNode';
import NodeList from './nodeList';
import LocaleConsumer from '../locale/localeConsumer';
import '@douyinfe/semi-foundation/tree/tree.scss';
import {IconSearch} from '@kousum/semi-icons-vue';
import {Locale as LocaleObject} from '../locale/interface';
import {
  TreeProps,
  TreeState,
  TreeNodeProps,
  TreeNodeData,
  FlattenNode,
  KeyEntity,
  OptionProps,
  ScrollData,
} from './interface';
import CheckboxGroup from '../checkbox/checkboxGroup';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  Fragment,
  h,
  nextTick, PropType,
  reactive,
  ref,
  useSlots,
  watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useConfigContext} from "../configProvider/context/Consumer";
import {getProps, useBaseComponent} from "../_base/baseComponent";

export * from './interface';
export type {AutoSizerProps} from './autoSizer';

const prefixcls = cssClasses.PREFIX;


const propTypes: ComponentObjectPropsOptions<TreeProps> = {
  autoMergeValue: PropTypes.bool,
  blockNode: PropTypes.bool,
  className: PropTypes.string,
  showClear: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,
  defaultExpandedKeys: PropTypes.array,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  directory: PropTypes.bool,
  disabled: PropTypes.bool,
  emptyContent: PropTypes.node,
  expandAll: PropTypes.bool,
  expandedKeys: PropTypes.array,
  filterTreeNode: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  icon: [PropTypes.object, PropTypes.func] as PropType<TreeProps['icon']>,
  onChangeWithObject: PropTypes.bool,
  motion: PropTypes.bool,
  multiple: PropTypes.bool,
  onChange: PropTypes.func as PropType<TreeProps['onChange']>,
  onExpand: PropTypes.func as PropType<TreeProps['onExpand']>,
  onSearch: PropTypes.func as PropType<TreeProps['onSearch']>,
  onSelect: PropTypes.func as PropType<TreeProps['onSelect']>,
  onContextMenu: PropTypes.func as PropType<TreeProps['onContextMenu']>,
  onDoubleClick: PropTypes.func as PropType<TreeProps['onDoubleClick']>,
  searchClassName: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  searchStyle: PropTypes.object,
  selectedKey: PropTypes.string as PropType<TreeProps['selectedKey']>,
  showFilteredOnly: PropTypes.bool,
  showLine: PropTypes.bool,
  style: PropTypes.object,
  treeData: PropTypes.array,
  keyMaps: PropTypes.object,
  treeDataSimpleJson: PropTypes.object,
  treeNodeFilterProp: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  virtualize: PropTypes.object,
  autoExpandParent: PropTypes.bool,
  expandAction: [String, Boolean] as PropType<TreeProps['expandAction']>,
  searchRender: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  renderLabel: PropTypes.func as PropType<TreeProps['renderLabel']>,
  renderFullLabel: PropTypes.func as PropType<TreeProps['renderFullLabel']>,
  leafOnly: PropTypes.bool,
  loadedKeys: PropTypes.array,
  loadData: PropTypes.func as PropType<TreeProps['loadData']>,
  onLoad: PropTypes.func as PropType<TreeProps['onLoad']>,
  disableStrictly: PropTypes.bool,
  draggable: PropTypes.bool,
  autoExpandWhenDragEnter: PropTypes.bool,
  hideDraggingNode: PropTypes.bool,
  renderDraggingNode: PropTypes.func as PropType<TreeProps['renderDraggingNode']>,
  onDragEnd: PropTypes.func as PropType<TreeProps['onDragEnd']>,
  onDragEnter: PropTypes.func as PropType<TreeProps['onDragEnter']>,
  onDragLeave: PropTypes.func as PropType<TreeProps['onDragLeave']>,
  onDragOver: PropTypes.func as PropType<TreeProps['onDragOver']>,
  onDragStart: PropTypes.func as PropType<TreeProps['onDragStart']>,
  onDrop: PropTypes.func as PropType<TreeProps['onDrop']>,
  labelEllipsis: PropTypes.bool,
  checkRelation: PropTypes.string as PropType<TreeProps['checkRelation']>,
  'aria-label': PropTypes.string,
  preventScroll: PropTypes.bool,
  role: PropTypes.string as PropType<TreeProps['role']>,
};

const defaultProps = {
  showClear: true,
  disabled: false,
  blockNode: true,
  multiple: false,
  filterTreeNode: false,
  autoExpandParent: false,
  treeNodeFilterProp: 'label',
  defaultExpandAll: false,
  expandAll: false,
  onChangeWithObject: false,
  motion: true,
  leafOnly: false,
  showFilteredOnly: false,
  showLine: false,
  expandAction: false,
  disableStrictly: false,
  draggable: false,
  autoExpandWhenDragEnter: true,
  checkRelation: 'related',
  autoMergeValue: true,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Tree = defineComponent((props, {}) => {
  const slots = useSlots()

  let onNodeClick: any;
  let onMotionEnd: any;
  const {context} = useConfigContext()


  const state = reactive<TreeState>({
    inputValue: '',
    keyEntities: {},
    treeData: [],
    flattenNodes: [],
    selectedKeys: [],
    checkedKeys: new Set(),
    halfCheckedKeys: new Set(),
    realCheckedKeys: new Set([]),
    motionKeys: new Set([]),
    motionType: 'hide',
    expandedKeys: new Set(props.expandedKeys),
    filteredKeys: new Set(),
    filteredExpandedKeys: new Set(),
    filteredShownKeys: new Set(),
    prevProps: null,
    loadedKeys: new Set(),
    loadingKeys: new Set(),
    cachedFlattenNodes: undefined,
    cachedKeyValuePairs: {},
    disabledKeys: new Set(),
    dragging: false,
    dragNodesKeys: new Set(),
    dragOverNodeKey: null,
    dropPosition: null,
  });
  const inputRef = ref()
  const optionsRef = ref()
  const dragNode = ref()
  const virtualizedListRef = ref()


  const {adapter: adapterInject, getDataAttr} = useBaseComponent<TreeProps>(props, state);

  function adapter_(): TreeAdapter {
    const filterAdapter: Pick<TreeAdapter, 'updateInputValue' | 'focusInput'> = {
      updateInputValue: value => {
        state.inputValue = value
      },
      focusInput: () => {
        const {preventScroll} = props;
        if (inputRef.value) {
          (inputRef.value as any).focus({preventScroll});
        }
      },
    };
    return {
      ...adapterInject<TreeProps, TreeState>(),
      ...filterAdapter,
      updateState: states => {
        Object.keys(states).forEach(key => {
          state[key] = states[key]
        })
      },
      notifyExpand: (expandedKeys, {expanded: bool, node}) => {
        props.onExpand && props.onExpand([...expandedKeys], {expanded: bool, node});
        if (bool && props.loadData) {
          onNodeLoad(node);
        }
      },
      notifySelect: (selectKey, bool, node) => {
        props.onSelect && props.onSelect(selectKey, bool, node);
      },
      notifyChange: value => {
        props.onChange && props.onChange(value);
      },
      notifySearch: (input: string, filteredExpandedKeys: string[]) => {
        props.onSearch && props.onSearch(input, filteredExpandedKeys);
      },
      notifyRightClick: (e, node) => {
        props.onContextMenu && props.onContextMenu(e, node);
      },
      notifyDoubleClick: (e, node) => {
        props.onDoubleClick && props.onDoubleClick(e, node);
      },
      cacheFlattenNodes: bool => {
        state.cachedFlattenNodes = bool ? cloneDeep(state.flattenNodes) : undefined
      },
      setDragNode: treeNode => {
        dragNode.value = treeNode;
      },
    };
  }

  const adapter = adapter_()
  const foundation = new TreeFoundation(adapter);


  /**
   * Process of getDerivedStateFromProps was inspired by rc-tree
   * https://github.com/react-component/tree
   */

  function getDerivedStateFromProps(props: TreeProps, prevState: TreeState) {
    const { prevProps } = prevState;
    const { keyMaps } = props;
    let treeData;
    let keyEntities = prevState.keyEntities || {};
    let valueEntities = prevState.cachedKeyValuePairs || {};
    const isSeaching = Boolean(props.filterTreeNode && prevState.inputValue && prevState.inputValue.length);
    const newState: Partial<TreeState> = {
      prevProps: props,
    };
    const isExpandControlled = 'expandedKeys' in props;

    // Accept a props field as a parameter to determine whether to update the field
    const needUpdate = (name: string) => {
      const firstInProps = !prevProps && name in props;
      const nameHasChange = prevProps && !isEqual(prevProps[name], props[name]);
      return firstInProps || nameHasChange;
    };

    // Determine whether treeData has changed
    const needUpdateData = () => {
      const firstInProps = !prevProps && 'treeData' in props;
      const treeDataHasChange = prevProps && prevProps.treeData !== props.treeData;
      return firstInProps || treeDataHasChange;
    };

    const needUpdateTreeData = needUpdate('treeData');
    const needUpdateSimpleJson = needUpdate('treeDataSimpleJson');

    // Update the data of tree in state
    if (needUpdateTreeData || (props.draggable && needUpdateData())) {
      treeData = props.treeData;
      newState.treeData = treeData;
      const entitiesMap = convertDataToEntities(treeData, keyMaps);
      newState.keyEntities = {
        ...entitiesMap.keyEntities,
      };
      keyEntities = newState.keyEntities;
      newState.cachedKeyValuePairs = { ...entitiesMap.valueEntities };
      valueEntities = newState.cachedKeyValuePairs;
    } else if (needUpdateSimpleJson) {
      // Convert treeDataSimpleJson to treeData
      treeData = convertJsonToData(props.treeDataSimpleJson);
      newState.treeData = treeData;
      const entitiesMap = convertDataToEntities(treeData, keyMaps);
      newState.keyEntities = {
        ...entitiesMap.keyEntities,
      };
      keyEntities = newState.keyEntities;
      newState.cachedKeyValuePairs = { ...entitiesMap.valueEntities };
      valueEntities = newState.cachedKeyValuePairs;
    }

    // If treeData keys changes, we won't show animation
    if (treeData && props.motion) {
      if (prevProps && props.motion) {
        newState.motionKeys = new Set([]);
        newState.motionType = null;
      }
    }
    const dataUpdated = needUpdateSimpleJson || needUpdateTreeData;
    const expandAllWhenDataChange = dataUpdated && props.expandAll;
    if (!isSeaching) {
      // Update expandedKeys
      if (needUpdate('expandedKeys') || (prevProps && needUpdate('autoExpandParent'))) {
        newState.expandedKeys = calcExpandedKeys(
          props.expandedKeys,
          keyEntities,
          props.autoExpandParent || !prevProps
        );
        // only show animation when treeData does not change
        if (prevProps && props.motion && !treeData) {
          const { motionKeys, motionType } = calcMotionKeys(
            prevState.expandedKeys,
            newState.expandedKeys,
            keyEntities
          );
          newState.motionKeys = new Set(motionKeys);
          newState.motionType = motionType;
          if (motionType === 'hide') {
            // cache flatten nodes: expandedKeys changed may not be triggered by interaction
            newState.cachedFlattenNodes = cloneDeep(prevState.flattenNodes);
          }
        }
      } else if ((!prevProps && (props.defaultExpandAll || props.expandAll)) || expandAllWhenDataChange) {
        newState.expandedKeys = new Set(Object.keys(keyEntities));
      } else if (!prevProps && props.defaultExpandedKeys) {
        newState.expandedKeys = calcExpandedKeys(props.defaultExpandedKeys, keyEntities);
      } else if (!prevProps && props.defaultValue) {
        newState.expandedKeys = calcExpandedKeysForValues(
          props.defaultValue,
          keyEntities,
          props.multiple,
          valueEntities
        );
      } else if (!prevProps && props.value) {
        newState.expandedKeys = calcExpandedKeysForValues(
          props.value,
          keyEntities,
          props.multiple,
          valueEntities
        );
      } else if ((!isExpandControlled && dataUpdated) && props.value) {
        // 当 treeData 已经设置具体的值，并且设置了 props.loadData ，则认为 treeData 的更新是因为 loadData 导致的
        // 如果是因为 loadData 导致 treeData改变， 此时在这里重新计算 key 会导致为未选中的展开项目被收起
        // 所以此时不需要重新计算 expandedKeys，因为在点击展开按钮时候已经把被展开的项添加到 expandedKeys 中
        // When treeData has a specific value and props.loadData is set, it is considered that the update of treeData is caused by loadData
        // If the treeData is changed because of loadData, recalculating the key here will cause the unselected expanded items to be collapsed
        // So there is no need to recalculate expandedKeys at this time, because the expanded item has been added to expandedKeys when the expand button is clicked
        if (!(prevState.treeData && prevState.treeData?.length > 0 && props.loadData)) {
          newState.expandedKeys = calcExpandedKeysForValues(
            props.value,
            keyEntities,
            props.multiple,
            valueEntities
          );
        }
      }

      if (!newState.expandedKeys) {
        delete newState.expandedKeys;
      }

      // Update flattenNodes
      if (treeData || newState.expandedKeys) {
        const flattenNodes = flattenTreeData(
          treeData || prevState.treeData,
          newState.expandedKeys || prevState.expandedKeys,
          keyMaps
        );
        newState.flattenNodes = flattenNodes;
      }
    } else {
      let filteredState;
      // treeData changed while searching
      if (treeData) {
        // Get filter data
        filteredState = filterTreeData({
          treeData,
          inputValue: prevState.inputValue,
          filterTreeNode: props.filterTreeNode,
          filterProps: props.treeNodeFilterProp,
          showFilteredOnly: props.showFilteredOnly,
          keyEntities: newState.keyEntities,
          prevExpandedKeys: [...prevState.filteredExpandedKeys],
          keyMaps: keyMaps
        });
        newState.flattenNodes = filteredState.flattenNodes;
        newState.motionKeys = new Set([]);
        newState.filteredKeys = filteredState.filteredKeys;
        newState.filteredShownKeys = filteredState.filteredShownKeys;
        newState.filteredExpandedKeys = filteredState.filteredExpandedKeys;
      }

      // expandedKeys changed while searching
      if (props.expandedKeys) {
        newState.filteredExpandedKeys = calcExpandedKeys(
          props.expandedKeys,
          keyEntities,
          props.autoExpandParent || !prevProps
        );

        if (prevProps && props.motion) {
          const prevKeys = prevState ? prevState.filteredExpandedKeys : new Set([]);
          // only show animation when treeData does not change
          if (!treeData) {
            const motionResult = calcMotionKeys(
              prevKeys,
              newState.filteredExpandedKeys,
              keyEntities
            );

            let { motionKeys } = motionResult;
            const { motionType } = motionResult;
            if (props.showFilteredOnly) {
              motionKeys = motionKeys.filter(key => prevState.filteredShownKeys.has(key));
            }
            if (motionType === 'hide') {
              // cache flatten nodes: expandedKeys changed may not be triggered by interaction
              newState.cachedFlattenNodes = cloneDeep(prevState.flattenNodes);
            }
            newState.motionKeys = new Set(motionKeys);
            newState.motionType = motionType;
          }
        }

        newState.flattenNodes = flattenTreeData(
          treeData || prevState.treeData,
          newState.filteredExpandedKeys || prevState.filteredExpandedKeys,
          keyMaps,
          props.showFilteredOnly && prevState.filteredShownKeys
        );
      }
    }

    // Handle single selection and multiple selection in controlled mode
    const withObject = props.onChangeWithObject;
    const isMultiple = props.multiple;
    if (!isMultiple) {
      // When getting single selection, the selected node
      if (needUpdate('value')) {
        newState.selectedKeys = findKeysForValues(
          // In both cases whether withObject is turned on, the value is standardized to string
          normalizeValue(props.value, withObject, keyMaps),
          valueEntities,
          isMultiple
        );
      } else if (!prevProps && props.defaultValue) {
        newState.selectedKeys = findKeysForValues(
          normalizeValue(props.defaultValue, withObject, keyMaps),
          valueEntities,
          isMultiple
        );
      } else if (treeData) {
        // If `treeData` changed, we also need check it
        if (props.value) {
          newState.selectedKeys = findKeysForValues(
            normalizeValue(props.value, withObject, keyMaps) || '',
            valueEntities,
            isMultiple
          );
        }
      }
    } else {
      let checkedKeyValues;
      // Get the selected node during multiple selection
      if (needUpdate('value')) {
        checkedKeyValues = findKeysForValues(
          normalizeValue(props.value, withObject, keyMaps),
          valueEntities,
          isMultiple
        );
      } else if (!prevProps && props.defaultValue) {
        checkedKeyValues = findKeysForValues(
          normalizeValue(props.defaultValue, withObject, keyMaps),
          valueEntities,
          isMultiple
        );
      } else if (treeData) {
        // If `treeData` changed, we also need check it
        if (props.value) {
          checkedKeyValues = findKeysForValues(
            normalizeValue(props.value, withObject, keyMaps) || [],
            valueEntities,
            isMultiple
          );
        } else {
          checkedKeyValues = updateKeys(props.checkRelation === 'related' ? prevState.checkedKeys : prevState.realCheckedKeys, keyEntities);
        }
      }

      if (checkedKeyValues) {
        if (props.checkRelation === 'unRelated') {
          newState.realCheckedKeys = new Set(checkedKeyValues);
        } else if (props.checkRelation === 'related') {
          const { checkedKeys, halfCheckedKeys } = calcCheckedKeys(checkedKeyValues, keyEntities);

          newState.checkedKeys = checkedKeys;
          newState.halfCheckedKeys = halfCheckedKeys;
        }
      }
    }

    // update loadedKeys
    if (needUpdate('loadedKeys')) {
      newState.loadedKeys = new Set(props.loadedKeys);
    }

    // update disableStrictly
    if (treeData && props.disableStrictly && props.checkRelation === 'related') {
      newState.disabledKeys = calcDisabledKeys(keyEntities, keyMaps);
    }

    return newState;
  }

  watch([
    () => props.filterTreeNode,
    () => props.treeData,
    () => props.draggable,
    () => props.treeDataSimpleJson,
    () => props.motion,
    () => props.expandAll,
    () => props.autoExpandParent,
    () => props.defaultExpandAll,
    () => props.defaultExpandedKeys,
    () => props.multiple,
    () => props.value,
    () => props.treeNodeFilterProp,
    () => props.showFilteredOnly,
    () => props.onChangeWithObject,
    () => props.defaultValue,
    () => props.loadedKeys,
    () => props.disableStrictly,
    () => props.checkRelation,


    () => state.keyEntities as any,
    () => state.cachedKeyValuePairs as any,
    () => state.inputValue as any,
    () => state.expandedKeys as any,
    () => state.flattenNodes as any,
    () => state.treeData as any,
    () => state.filteredExpandedKeys as any,
    () => state.filteredShownKeys as any,
    () => state.checkedKeys as any,
  ], (value, oldValue, onCleanup) => {
    const newState = getDerivedStateFromProps({...props}, {...state} as TreeState)
    newState && Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  }, {immediate: true})


  const search = (value: string) => {
    foundation.handleInputChange(value);
  };

  const scrollTo = (scrollData: ScrollData) => {
    const {key, align = 'center'} = scrollData;
    const {flattenNodes} = state;
    if (key) {
      const index = flattenNodes?.findIndex((node) => {
        return node.key === key;
      });
      index >= 0 && (virtualizedListRef.value as any)?.scrollToItem(index, align);
    }
  }

  function renderInput() {
    const {
      searchClassName,
      searchStyle,
      searchRender,
      searchPlaceholder,
      showClear
    } = props;
    const inputcls = cls(`${prefixcls}-input`);
    const {inputValue} = state;
    const inputProps = {
      value: inputValue,
      className: inputcls,
      onChange: (value: string) => search(value),
      prefix: <IconSearch/>,
      showClear,
      placeholder: searchPlaceholder,
    };
    const wrapperCls = cls(`${prefixcls}-search-wrapper`, searchClassName);
    return (
      <div class={wrapperCls} style={searchStyle}>
        <LocaleConsumer componentName="Tree">
          {(locale: LocaleObject) => {
            inputProps.placeholder = searchPlaceholder || get(locale, 'searchPlaceholder');
            if (isFunction(searchRender)) {
              return searchRender({...inputProps});
            }
            if (searchRender === false) {
              return null;
            }
            return (
              <Input
                aria-label='Filter Tree'
                ref={inputRef as any}
                {...inputProps}
              />
            );
          }}
        </LocaleConsumer>
      </div>
    );
  }

  const renderEmpty = () => {
    const {emptyContent} = props;
    if (emptyContent) {
      return <TreeNode key={'empty_tree'} empty emptyContent={props.emptyContent}/>;
    } else {
      return (
        <LocaleConsumer componentName="Tree">
          {(locale: LocaleObject) => <TreeNode key={'empty_tree'} empty emptyContent={get(locale, 'emptyText')}/>}
        </LocaleConsumer>
      );
    }
  };

  const onNodeSelect = (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeSelect(e, treeNode);
  };

  const onNodeLoad = (data: TreeNodeData) => (
    new Promise(resolve => {
      // We need to get the latest state of loading/loaded keys
      const {loadingKeys} = foundation.handleNodeLoad(
        state.loadedKeys || new Set([]),
        state.loadingKeys || new Set([]),
        data,
        resolve
      )
      state.loadingKeys = loadingKeys
    })
  );

  const onNodeCheck = (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeSelect(e, treeNode);
  };

  const onNodeExpand = (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeExpand(e, treeNode);
  };

  const onNodeRightClick = (e: MouseEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeRightClick(e, treeNode);
  };

  const onNodeDoubleClick = (e: MouseEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeDoubleClick(e, treeNode);
  };

  const onNodeDragStart = (e: DragEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeDragStart(e, treeNode);
  };

  const onNodeDragEnter = (e: DragEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeDragEnter(e, treeNode, dragNode);
  };

  const onNodeDragOver = (e: DragEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeDragOver(e, treeNode, dragNode);
  };

  const onNodeDragLeave = (e: DragEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeDragLeave(e, treeNode);
  };

  const onNodeDragEnd = (e: DragEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeDragEnd(e, treeNode);
  };

  const onNodeDrop = (e: DragEvent, treeNode: TreeNodeProps) => {
    foundation.handleNodeDrop(e, treeNode, dragNode);
  };


  const getTreeNodeRequiredProps = () => {
    const {expandedKeys, selectedKeys, checkedKeys, halfCheckedKeys, keyEntities, filteredKeys} = state;
    return {
      expandedKeys: expandedKeys || new Set(),
      selectedKeys: selectedKeys || [],
      checkedKeys: checkedKeys || new Set(),
      halfCheckedKeys: halfCheckedKeys || new Set(),
      filteredKeys: filteredKeys || new Set(),
      keyEntities,
    };
  };


  const getTreeNodeKey = (treeNode: TreeNodeData) => {
    const {data} = treeNode;
    const {key} = data;
    return key;
  };

  const renderTreeNode = (treeNode: FlattenNode, ind?: number, style?: CSSProperties) => {
    const { data, key } = treeNode;
    const treeNodeProps = foundation.getTreeNodeProps(key);
    if (!treeNodeProps) {
      return null;
    }
    const { keyMaps, showLine } = props;
    const props_: any = pick(treeNode, ['key', 'label', 'disabled', 'isLeaf', 'icon', 'isEnd']);
    const children = data[get(keyMaps, 'children', 'children')];//TODO
    !isUndefined(children) && (props_.children = children);
    return <TreeNode {...treeNodeProps} {...data} {...props_} showLine={showLine} data={data} style={isEmpty(style) ? {} : style} />;
  };

  const itemKey = (index: number, data: KeyEntity) => {
    // Find the item at the specified index.
    const item = data[index];
    // Return a value that uniquely identifies this item.
    return item.key;
  };
  const option = ({ index, style, data }: OptionProps) => (
    renderTreeNode(data[index], index, style)
  );
  function renderNodeList() {
    const {flattenNodes, cachedFlattenNodes, motionKeys, motionType} = state;
    const {virtualize, motion} = props;
    const {direction} = context.value;
    if (isEmpty(flattenNodes)) {
      return undefined;
    }
    if (!virtualize || isEmpty(virtualize)) {
      return (
        <Fragment>
          <NodeList
            flattenNodes={flattenNodes as FlattenNode[]}
            flattenList={cachedFlattenNodes as (FlattenNode[] | undefined)}
            motionKeys={motion ? motionKeys : new Set([])}
            motionType={motionType}
            onMotionEnd={onMotionEnd}
            renderTreeNode={renderTreeNode}
          />
        </Fragment>
      );
    }

    return (
      <AutoSizer
        defaultHeight={virtualize.height}
        defaultWidth={virtualize.width}
        children={({height, width}: { width: string | number; height: string | number }) => (
          <VirtualList
            ref={virtualizedListRef}
            itemCount={flattenNodes.length}
            itemSize={virtualize.itemSize}
            height={parseInt('' + height)}
            width={width}
            itemKey={itemKey}
            itemData={flattenNodes as any}
            className={`${prefixcls}-virtual-list`}
            style={{direction}}
          >
            {option}
          </VirtualList>
        )}
      >

      </AutoSizer>
    );
  }


  return () => {
    const {
      keyEntities,
      motionKeys,
      motionType,
      inputValue,
      filteredKeys,
      dragOverNodeKey,
      dropPosition,
      checkedKeys,
      realCheckedKeys,
    } = state;

    const {
      blockNode,
      className,
      style,
      filterTreeNode,
      disabled,
      icon,
      directory,
      multiple,
      showFilteredOnly,
      showLine,
      motion,
      expandAction,
      loadData,
      renderLabel,
      draggable,
      renderFullLabel,
      labelEllipsis,
      virtualize,
      checkRelation,
    } = props;
    const wrapperCls = cls(`${prefixcls}-wrapper`, className);
    const listCls = cls(`${prefixcls}-option-list`, {
      [`${prefixcls}-option-list-block`]: blockNode,
    });
    const searchNoRes = Boolean(inputValue) && !filteredKeys.size;
    const noData = isEmpty(keyEntities) || (showFilteredOnly && searchNoRes);
    const ariaAttr = {
      role: noData ? 'none' : 'tree'
    };
    if (ariaAttr.role === 'tree') {
      ariaAttr['aria-multiselectable'] = multiple ? true : false;
    }
    return (
      <TreeContext.Provider
        value={{
          treeDisabled: disabled,
          treeIcon: icon,
          motion,
          motionKeys,
          motionType,
          filterTreeNode,
          keyEntities,
          onNodeClick: onNodeClick,
          onNodeExpand: onNodeExpand,
          onNodeSelect: onNodeSelect,
          onNodeCheck: onNodeCheck,
          onNodeRightClick: onNodeRightClick,
          onNodeDoubleClick: onNodeDoubleClick,
          renderTreeNode: renderTreeNode,
          onNodeDragStart: onNodeDragStart,
          onNodeDragEnter: onNodeDragEnter,
          onNodeDragOver: onNodeDragOver,
          onNodeDragLeave: onNodeDragLeave,
          onNodeDragEnd: onNodeDragEnd,
          onNodeDrop: onNodeDrop,
          expandAction,
          directory,
          multiple,
          showFilteredOnly,
          isSearching: Boolean(inputValue),
          loadData,
          onNodeLoad: onNodeLoad,
          renderLabel,
          draggable,
          renderFullLabel,
          dragOverNodeKey,
          dropPosition,
          labelEllipsis: typeof labelEllipsis === 'undefined' ? virtualize : labelEllipsis,
        }}
      >
        <div aria-label={props['aria-label']} class={wrapperCls} style={style} {...getDataAttr()}>
          {filterTreeNode ? renderInput() : null}
          <div class={listCls} {...ariaAttr}>
            {noData ? renderEmpty() : (multiple ?
                (<CheckboxGroup value={Array.from(checkRelation === 'related' ? checkedKeys : realCheckedKeys)}>
                  {renderNodeList()}
                </CheckboxGroup>) :
                renderNodeList()
            )}
          </div>
        </div>
      </TreeContext.Provider>
    );
  }
}, {
  props: vuePropsType,
  name: 'Tree'
})



export default Tree

export {
  TreeNode
};
