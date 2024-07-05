import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { isEqual, isString, isEmpty, noop, get, isFunction, isUndefined, isNull, pick } from 'lodash';
import TreeSelectFoundation, {
  BasicTreeSelectInnerData,
  BasicTreeSelectProps,
  BasicTriggerRenderProps,
  Size,
  TreeSelectAdapter,
} from '@douyinfe/semi-foundation/treeSelect/foundation';
import {
  calcCheckedKeys,
  calcDisabledKeys,
  calcExpandedKeys,
  calcExpandedKeysForValues,
  calcMotionKeys,
  convertDataToEntities,
  findKeysForValues,
  flattenTreeData,
  getValueOrKey,
  normalizeKeyList,
  normalizeValue,
  updateKeys,
  filterTreeData,
} from '@douyinfe/semi-foundation/tree/treeUtil';
import { cssClasses, strings } from '@douyinfe/semi-foundation/treeSelect/constants';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import { FixedSizeList as VirtualList } from '@kousum/vue3-window';
import '@douyinfe/semi-foundation/tree/tree.scss';
import '@douyinfe/semi-foundation/treeSelect/treeSelect.scss';
import { getProps, useBaseComponent, ValidateStatus } from '../_base/baseComponent';
import TagGroup from '../tag/group';
import Tag, { TagProps } from '../tag/index';
import Input, { InputProps } from '../input/index';
import AutoSizer from '../tree/autoSizer';
import TreeContext from '../tree/treeContext';
import TreeNode from '../tree/treeNode';
import NodeList from '../tree/nodeList';
import { cloneDeep } from '../tree/treeUtil';
import LocaleConsumer from '../locale/localeConsumer';
import { Locale } from '../locale/interface';
import Trigger from '../trigger';
import TagInput from '../tagInput';
import { isSemiIcon, styleNum } from '../_utils';
import type { FlattenNode, TreeNodeData, TreeNodeProps, TreeProps, TreeState } from '../tree/interface';
import { Motion } from '../_base/base';
import { IconChevronDown, IconClear, IconSearch } from '@kousum/semi-icons-vue';
import CheckboxGroup from '../checkbox/checkboxGroup';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  Fragment,
  h,
  isVNode,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { AriaAttributes } from '../AriaAttributes';
import { VueHTMLAttributes, VueJsxNode, VueJsxNodeSingle } from '../interface';
import Popover, { PopoverProps } from '../popover/index';
import VirtualRow from '../select/virtualRow';

export type ListItemKeySelector<T = any> = (index: number, data: T) => string | number;
export type ExpandAction = false | 'click' | 'doubleClick';

export interface TriggerRenderProps extends Omit<BasicTriggerRenderProps, 'componentProps'> {
  [x: string]: any;
  componentProps: TreeSelectProps;
  value: TreeNodeData[];
  onClear: (e: MouseEvent) => void;
}

export interface OnChange {
  /* onChangeWithObject is false */
  (
    value: TreeNodeData['value'] | Array<TreeNodeData['value']>,
    node: TreeNodeData[] | TreeNodeData,
    e: MouseEvent
  ): void;
  /* onChangeWithObject is true */
  (node: TreeNodeData[] | TreeNodeData, e: MouseEvent): void;
}

export type RenderSelectedItemInSingle = (treeNode: TreeNodeData) => VueJsxNode;

export type RenderSelectedItemInMultiple = (
  treeNode: TreeNodeData,
  otherProps: { index: number | string; onClose: (tagContent: any, e: MouseEvent) => void }
) => {
  isRenderInTag: boolean;
  content: VueJsxNode;
};

export type RenderSelectedItem = RenderSelectedItemInSingle | RenderSelectedItemInMultiple;

export type OverrideCommonProps =
  | 'renderFullLabel'
  | 'renderLabel'
  | 'defaultValue'
  | 'emptyContent'
  | 'filterTreeNode'
  | 'style'
  | 'treeData'
  | 'value'
  | 'onExpand'
  | 'keyMaps'
  | 'showLine';

/**
 * Type definition description:
 * TreeSelectProps inherits some properties from BasicTreeSelectProps (from foundation) and TreeProps (from semi-ui-react).
 */
// eslint-disable-next-line max-len
export interface TreeSelectProps
  extends Omit<BasicTreeSelectProps, OverrideCommonProps | 'validateStatus' | 'searchRender'>,
    Pick<TreeProps, OverrideCommonProps> {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  motion?: Motion;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  arrowIcon?: VueJsxNode;
  clearIcon?: VueJsxNode;
  autoAdjustOverflow?: boolean;
  clickToHide?: boolean;
  defaultOpen?: boolean;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean;
  dropdownStyle?: CSSProperties;
  dropdownMargin?: PopoverProps['margin'];
  insetLabel?: VueJsxNode;
  insetLabelId?: string;
  maxTagCount?: number;
  motionExpand?: boolean;
  optionListStyle?: CSSProperties;
  outerBottomSlot?: VueJsxNode;
  outerTopSlot?: VueJsxNode;
  placeholder?: string;
  prefix?: VueJsxNode;
  position?: PopoverProps['position'];
  searchAutoFocus?: boolean;
  searchPlaceholder?: string;
  showSearchClear?: boolean;
  size?: Size;
  suffix?: VueJsxNode;
  treeNodeLabelProp?: string;
  validateStatus?: ValidateStatus;
  zIndex?: number;
  searchPosition?: string;
  stopPropagation?: boolean | string;
  searchRender?: boolean | ((inputProps: InputProps) => VueJsxNode);
  onSelect?: (selectedKey: string, selected: boolean, selectedNode: TreeNodeData) => void;
  renderSelectedItem?: RenderSelectedItem;
  getPopupContainer?: () => HTMLElement;
  triggerRender?: (props?: TriggerRenderProps) => VueJsxNode;
  onBlur?: (e: MouseEvent) => void;
  onChange?: OnChange;
  onFocus?: (e: MouseEvent) => void;
  onVisibleChange?: (isVisible: boolean) => void;
  onClear?: (e: MouseEvent | KeyboardEvent) => void;
  autoMergeValue?: boolean
  id?: string;
}

export type OverrideCommonState = 'keyEntities' | 'treeData' | 'disabledKeys' | 'flattenNodes';

// eslint-disable-next-line max-len
export interface TreeSelectState
  extends Omit<BasicTreeSelectInnerData, OverrideCommonState | 'prevProps'>,
    Pick<TreeState, OverrideCommonState> {
  inputTriggerFocus: boolean;
  isOpen: boolean;
  // isInput: boolean;
  rePosKey: number;
  dropdownMinWidth: null | number;
  isHovering: boolean;
  prevProps: TreeSelectProps;
  isFocus: boolean;
}

const prefixcls = cssClasses.PREFIX;
const prefixTree = cssClasses.PREFIX_TREE;

const key = 0;

const propTypes: ComponentObjectPropsOptions<TreeSelectProps> = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  'aria-label': PropTypes.string,
  borderless: PropTypes.bool,
  loadedKeys: PropTypes.array as PropType<TreeSelectProps['loadedKeys']>,
  loadData: PropTypes.func as PropType<TreeSelectProps['loadData']>,
  onLoad: PropTypes.func as PropType<TreeSelectProps['onLoad']>,
  arrowIcon: PropTypes.node,
  clearIcon: PropTypes.node,
  defaultOpen: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultExpandAll: PropTypes.bool,
  defaultExpandedKeys: PropTypes.array,
  expandAll: PropTypes.bool,
  disabled: PropTypes.bool,
  disableStrictly: PropTypes.bool,
  // Whether to turn on the input box filtering function, when it is a function, it represents a custom filtering function
  filterTreeNode: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  multiple: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchAutoFocus: PropTypes.bool,
  virtualize: PropTypes.object,
  treeNodeFilterProp: PropTypes.string,
  onChange: PropTypes.func as PropType<TreeSelectProps['onChange']>,
  onClear: PropTypes.func as PropType<TreeSelectProps['onClear']>,
  onSearch: PropTypes.func as PropType<TreeSelectProps['onSearch']>,
  onSelect: PropTypes.func as PropType<TreeSelectProps['onSelect']>,
  onExpand: PropTypes.func as PropType<TreeSelectProps['onExpand']>,
  onChangeWithObject: PropTypes.bool,
  onBlur: PropTypes.func as PropType<TreeSelectProps['onBlur']>,
  onFocus: PropTypes.func as PropType<TreeSelectProps['onFocus']>,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  expandedKeys: PropTypes.array,
  autoExpandParent: PropTypes.bool,
  showClear: PropTypes.bool,
  showSearchClear: PropTypes.bool,
  autoAdjustOverflow: PropTypes.bool,
  showFilteredOnly: PropTypes.bool,
  showLine: PropTypes.bool,
  motionExpand: PropTypes.bool,
  emptyContent: PropTypes.node,
  leafOnly: PropTypes.bool,
  keyMaps: PropTypes.object,
  treeData: PropTypes.array,
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.object,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),
  placeholder: PropTypes.string,
  maxTagCount: PropTypes.number,
  size: String as PropType<TreeSelectProps['size']>,
  className: PropTypes.string,
  style: PropTypes.object,
  treeNodeLabelProp: PropTypes.string,
  suffix: PropTypes.node,
  prefix: PropTypes.node,
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  zIndex: PropTypes.number,
  getPopupContainer: PropTypes.func as PropType<TreeSelectProps['getPopupContainer']>,
  dropdownMatchSelectWidth: PropTypes.bool,
  validateStatus: String as PropType<TreeSelectProps['validateStatus']>,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  triggerRender: PropTypes.func as PropType<TreeSelectProps['triggerRender']>,
  stopPropagation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  outerBottomSlot: PropTypes.node,
  outerTopSlot: PropTypes.node,
  onVisibleChange: PropTypes.func as PropType<TreeSelectProps['onVisibleChange']>,
  expandAction: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  searchPosition: String,
  clickToHide: PropTypes.bool,
  renderLabel: PropTypes.func as PropType<TreeSelectProps['renderLabel']>,
  renderFullLabel: PropTypes.func as PropType<TreeSelectProps['renderFullLabel']>,
  labelEllipsis: PropTypes.bool,
  optionListStyle: PropTypes.object,
  searchRender: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  renderSelectedItem: PropTypes.func as PropType<TreeSelectProps['renderSelectedItem']>,
  checkRelation: PropTypes.string as PropType<TreeSelectProps['checkRelation']>,
  id: PropTypes.string as PropType<TreeSelectProps['id']>,
  showRestTagsPopover: PropTypes.bool,
  restTagsPopoverProps: PropTypes.object,
  preventScroll: PropTypes.bool,
  clickTriggerToHide: PropTypes.bool,
  autoMergeValue: PropTypes.bool,

  dropdownMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  position: PropTypes.string as PropType<TreeSelectProps['position']>,
};

const defaultProps: Partial<TreeSelectProps> = {
  borderless: false,
  searchPosition: strings.SEARCH_POSITION_DROPDOWN,
  arrowIcon: <IconChevronDown />,
  autoExpandParent: false,
  autoAdjustOverflow: true,
  stopPropagation: true,
  motion: true,
  motionExpand: true,
  expandAll: false,
  zIndex: popoverNumbers.DEFAULT_Z_INDEX,
  disableStrictly: false,
  multiple: false,
  filterTreeNode: false,
  size: 'default' as const,
  treeNodeFilterProp: 'label' as const,
  onChangeWithObject: false,
  treeNodeLabelProp: 'label' as const,
  dropdownMatchSelectWidth: true,
  defaultOpen: false,
  showSearchClear: true,
  showClear: false,
  onVisibleChange: noop,
  expandAction: false,
  clickToHide: true,
  searchAutoFocus: false,
  checkRelation: 'related',
  'aria-label': 'TreeSelect',
  showRestTagsPopover: false,
  restTagsPopoverProps: {},
  clickTriggerToHide: true,
  autoMergeValue: true,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const TreeSelect = defineComponent(
  (props, {}) => {
    const slots = useSlots();

    // let _flattenNodes: TreeState['flattenNodes'];
    const state = reactive<TreeSelectState>({
      inputTriggerFocus: false,
      isOpen: false,
      isFocus: false,
      // isInput: false,
      rePosKey: key,
      dropdownMinWidth: null,
      inputValue: '',
      keyEntities: {},
      treeData: [],
      flattenNodes: [],
      cachedFlattenNodes: undefined,
      selectedKeys: [],
      checkedKeys: new Set(),
      halfCheckedKeys: new Set(),
      realCheckedKeys: new Set([]),
      disabledKeys: new Set(),
      motionKeys: new Set([]),
      motionType: 'hide',
      expandedKeys: new Set(props.expandedKeys),
      filteredKeys: new Set(),
      filteredExpandedKeys: new Set(),
      filteredShownKeys: new Set(),
      prevProps: null,
      isHovering: false,
      cachedKeyValuePairs: {},
      loadedKeys: new Set(),
      loadingKeys: new Set(),
    });
    const inputRef = ref();
    const tagInputRef = ref();
    const triggerRef = ref();
    const optionsRef = ref();
    let clickOutsideHandler = null;
    const treeSelectID = Math.random().toString(36).slice(2);

    let onNodeClick;
    let onNodeDoubleClick;
    let clearInputFlag: boolean = false;

    // TODO context
    const { adapter: adapterInject, context, getDataAttr } = useBaseComponent<TreeSelectProps>(props, state);
    function adapter_(): TreeSelectAdapter<TreeSelectProps, TreeSelectState> {
      const filterAdapter: Pick<TreeSelectAdapter, 'updateInputValue'> = {
        updateInputValue: (value) => {
          state.inputValue = value;
        },
      };
      const treeSelectAdapter: Pick<
        TreeSelectAdapter,
        'registerClickOutsideHandler' | 'unregisterClickOutsideHandler' | 'rePositionDropdown'
      > = {
        registerClickOutsideHandler: (cb) => {
          adapter.unregisterClickOutsideHandler();
          clickOutsideHandler = (e: Event) => {
            // 当组件内部使用了expose时，使用ref得到的内容只有expose的那部分
            const optionInstance = optionsRef && optionsRef.value.getRef?.().vnode.el;
            const triggerDom = triggerRef && triggerRef.value;
            // eslint-disable-next-line
            const optionsDom = optionInstance;
            const target = e.target as Element;
            const path = e.composedPath && e.composedPath() || [target];
            // console.log(optionsRef.value, (optionInstance as HTMLElement).parentNode, target)
            if (
              optionsDom &&
              (
                !optionsDom.contains(target) ||
                !optionsDom.contains(target.parentNode)
              ) &&
              triggerDom &&
              !triggerDom.contains(target) &&
              !(path.includes(triggerDom) || path.includes(optionsDom))
            ) {
              cb(e);
            }
          };
          document.addEventListener('mousedown', clickOutsideHandler, false);
        },
        unregisterClickOutsideHandler: () => {
          document.removeEventListener('mousedown', clickOutsideHandler, false);
          clickOutsideHandler = null;
        },
        rePositionDropdown: () => {
          let { rePosKey } = state;
          rePosKey = rePosKey + 1;
          state.rePosKey = rePosKey;
        },
      };
      const treeAdapter: Pick<
        TreeSelectAdapter,
        'updateState' | 'notifySelect' | 'notifySearch' | 'cacheFlattenNodes' | 'notifyLoad' | 'notifyClear'
      > = {
        updateState: (states) => {
          Object.keys(states).forEach((key) => {
            state[key] = states[key];
          });
        },
        notifySelect: (selectKey, bool, node) => {
          props.onSelect && props.onSelect(selectKey, bool, node);
        },
        notifySearch: (input, filteredExpandedKeys, filteredNodes) => {
          props.onSearch && props.onSearch(input, filteredExpandedKeys, filteredNodes);
        },
        cacheFlattenNodes: (bool) => {
          state.cachedFlattenNodes = bool ? cloneDeep(state.flattenNodes) : undefined;
        },
        notifyLoad: (newLoadedKeys, data) => {
          const { onLoad } = props;
          isFunction(onLoad) && onLoad(newLoadedKeys, data);
        },
        notifyClear: (e: MouseEvent | KeyboardEvent) => {
          props.onClear && props.onClear(e);
        },
      };
      return {
        ...adapterInject<TreeSelectProps, TreeSelectState>(),
        ...filterAdapter,
        ...treeSelectAdapter,
        ...treeAdapter,
        updateLoadKeys: (data, resolve) => {
          // We need to get the latest state of loading/loaded keys
          const { loadingKeys } = foundation.handleNodeLoad(
            state.loadedKeys || new Set([]),
            state.loadingKeys || new Set([]),
            data,
            resolve
          );
          state.loadingKeys = loadingKeys;
        },
        updateState: (states) => {
          Object.keys(states).forEach((key) => {
            state[key] = states[key];
          });
        },
        openMenu: () => {
          state.isOpen = true;
          nextTick(() => {
            props.onVisibleChange(true);
          });
        },
        closeMenu: (cb) => {
          state.isOpen = false;
          nextTick(() => {
            cb && cb();
            props.onVisibleChange(false);
          });
        },
        getTriggerWidth: () => {
          const el = triggerRef.value;
          return el && el.getBoundingClientRect().width;
        },
        setOptionWrapperWidth: (width) => {
          state.dropdownMinWidth = width;
        },
        notifyChange: (value, node, e) => {
          props.onChange && props.onChange(value, node, e);
        },
        notifyChangeWithObject: (node, e) => {
          props.onChange && props.onChange(node, e);
        },
        notifyExpand: (expandedKeys, { expanded: bool, node }) => {
          props.onExpand && props.onExpand([...expandedKeys], { expanded: bool, node });
          if (bool && props.loadData) {
            onNodeLoad(node);
          }
        },
        notifyFocus: (...v) => {
          props.onFocus && props.onFocus(...v);
        },
        notifyBlur: (...v) => {
          props.onBlur && props.onBlur(...v);
        },
        toggleHovering: (bool) => {
          state.isHovering = bool;
        },
        updateInputFocus: (bool) => {
          if (bool) {
            if (inputRef.value) {
              const { preventScroll } = props;
              (inputRef.value as any).focus({ preventScroll });
            }
            if (tagInputRef.value) {
              tagInputRef.value.focus();
            }
          } else {
            if (inputRef.value) {
              (inputRef.value as any).blur();
            }
            if (tagInputRef.value) {
              tagInputRef.value.blur();
            }
          }
        },
        updateIsFocus: (bool) => {
          state.isFocus = bool;
        },
        setClearInputFlag: (flag: boolean) => {
          clearInputFlag = flag;
        },
        getClearInputFlag: () => {
          return clearInputFlag;
        }
      };
    }
    const adapter = adapter_();
    const foundation = new TreeSelectFoundation(adapter);
    const onMotionEnd = () => {
      adapter.rePositionDropdown();
    };

    // eslint-disable-next-line max-lines-per-function
    function getDerivedStateFromProps(props: TreeSelectProps, prevState: TreeSelectState) {
      const { prevProps, rePosKey } = prevState;
      const { keyMaps } = props;
      const needUpdate = (name: string) =>
        (!prevProps && name in props) || (prevProps && !isEqual(prevProps[name], props[name]));

      let treeData;
      const withObject = props.onChangeWithObject;
      let keyEntities = prevState.keyEntities || {};
      let valueEntities = prevState.cachedKeyValuePairs || {};
      const newState: Partial<TreeSelectState> = {
        prevProps: props,
      };
      const needUpdateTreeData = needUpdate('treeData');
      const needUpdateExpandedKeys = needUpdate('expandedKeys');
      const isExpandControlled = 'expandedKeys' in props;
      const isSearching = Boolean(props.filterTreeNode && prevState.inputValue && prevState.inputValue.length);
      // TreeNode
      if (needUpdateTreeData) {
        treeData = props.treeData;
        newState.treeData = treeData;
        const entitiesMap = convertDataToEntities(treeData, keyMaps);
        newState.keyEntities = {
          ...entitiesMap.keyEntities,
        };
        keyEntities = newState.keyEntities;
        newState.cachedKeyValuePairs = { ...entitiesMap.valueEntities };
        valueEntities = newState.cachedKeyValuePairs;
      }

      // if treeData keys changes, we won't show animation
      if (treeData && props.motion && !isEqual(Object.keys(newState.keyEntities), Object.keys(prevState.keyEntities))) {
        if (prevProps && props.motion) {
          newState.motionKeys = new Set([]);
          newState.motionType = null;
        }
      }
      const expandAllWhenDataChange = needUpdateTreeData && props.expandAll;
      if (!isSearching) {
        // expandedKeys
        if (needUpdateExpandedKeys || (prevProps && needUpdate('autoExpandParent'))) {
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
            normalizeValue(props.defaultValue, withObject, keyMaps),
            keyEntities,
            props.multiple,
            valueEntities
          );
        } else if (!prevProps && props.value) {
          newState.expandedKeys = calcExpandedKeysForValues(
            normalizeValue(props.value, withObject, keyMaps),
            keyEntities,
            props.multiple,
            valueEntities
          );
        }

        if (!newState.expandedKeys) {
          delete newState.expandedKeys;
        }

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
            keyMaps: keyMaps,
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
              const motionResult = calcMotionKeys(prevKeys, newState.filteredExpandedKeys, keyEntities);

              let { motionKeys } = motionResult;
              const { motionType } = motionResult;
              if (props.showFilteredOnly) {
                motionKeys = motionKeys.filter((key) => prevState.filteredShownKeys.has(key));
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

      // selectedKeys: single mode controlled
      const isMultiple = props.multiple;
      if (!isMultiple) {
        if (needUpdate('value')) {
          newState.selectedKeys = findKeysForValues(
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
          } else {
            newState.selectedKeys = updateKeys(prevState.selectedKeys, keyEntities);
          }
        }
      } else {
        // checkedKeys: multiple mode controlled || data changed
        let checkedKeyValues;

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
            checkedKeyValues = updateKeys(
              props.checkRelation === 'related' ? prevState.checkedKeys : prevState.realCheckedKeys,
              keyEntities
            );
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

      // loadedKeys
      if (needUpdate('loadedKeys')) {
        newState.loadedKeys = new Set(props.loadedKeys);
      }

      // ================== rePosKey ==================
      if (needUpdateTreeData || needUpdate('value')) {
        newState.rePosKey = rePosKey + 1;
      }

      // ================ disableStrictly =================
      if (treeData && props.disableStrictly && props.checkRelation === 'related') {
        newState.disabledKeys = calcDisabledKeys(keyEntities, keyMaps);
      }

      return newState;
    }

    watch(
      [
        () => props.loadedKeys,
        () => props.loadData,
        () => props.onLoad,
        () => props.arrowIcon,
        () => props.defaultOpen,
        () => props.defaultValue,
        () => props.defaultExpandAll,
        () => props.defaultExpandedKeys,
        () => props.expandAll,
        () => props.disabled,
        () => props.disableStrictly,
        () => props.filterTreeNode,
        () => props.multiple,
        () => props.searchPlaceholder,
        () => props.searchAutoFocus,
        () => props.virtualize,
        () => props.treeNodeFilterProp,
        () => props.onChange,
        () => props.onSearch,
        () => props.onSelect,
        () => props.onExpand,
        () => props.onChangeWithObject,
        () => props.onBlur,
        () => props.onFocus,
        () => props.value,
        () => props.expandedKeys,
        () => props.autoExpandParent,
        () => props.showClear,
        () => props.showSearchClear,
        () => props.autoAdjustOverflow,
        () => props.showFilteredOnly,
        () => props.motionExpand,
        () => props.emptyContent,
        () => props.leafOnly,
        () => props.treeData,
        () => props.dropdownClassName,
        () => props.dropdownStyle,
        () => props.motion,
        () => props.placeholder,
        () => props.maxTagCount,
        () => props.size,
        () => props.className,
        () => props.style,
        () => props.treeNodeLabelProp,
        () => props.suffix,
        () => props.prefix,
        () => props.insetLabel,
        () => props.insetLabelId,
        () => props.zIndex,
        () => props.getPopupContainer,
        () => props.dropdownMatchSelectWidth,
        () => props.validateStatus,
        () => props.mouseEnterDelay,
        () => props.mouseLeaveDelay,
        () => props.triggerRender,
        () => props.stopPropagation,
        () => props.outerBottomSlot,
        () => props.outerTopSlot,
        () => props.onVisibleChange,
        () => props.expandAction,
        () => props.searchPosition,
        () => props.clickToHide,
        () => props.renderLabel,
        () => props.renderFullLabel,
        () => props.labelEllipsis,
        () => props.optionListStyle,
        () => props.searchRender,
        () => props.renderSelectedItem,
        () => props.checkRelation,
        () => slots.defautl,
      ],
      () => {
        const newState = getDerivedStateFromProps({ ...props }, { ...state } as any);
        Object.keys(newState).forEach((key) => {
          // @ts-ignore
          state[key] = newState[key];
        });
      },
      { immediate: true }
    );

    onMounted(() => {
      foundation.init();
    });

    onUnmounted(() => {
      foundation.destroy();
    });

    const renderSuffix = () => {
      const { suffix }: any = props;
      const suffixWrapperCls = cls({
        [`${prefixcls}-suffix`]: true,
        [`${prefixcls}-suffix-text`]: suffix && isString(suffix),
        [`${prefixcls}-suffix-icon`]: isSemiIcon(suffix),
      });
      return (
        <div class={suffixWrapperCls} x-semi-prop="suffix">
          {suffix}
        </div>
      );
    };

    const renderPrefix = () => {
      const { prefix, insetLabel, insetLabelId }: any = props;
      const labelNode = prefix || insetLabel;
      const prefixWrapperCls = cls({
        [`${prefixcls}-prefix`]: true,
        // to be doublechecked
        [`${prefixcls}-inset-label`]: insetLabel,
        [`${prefixcls}-prefix-text`]: labelNode && isString(labelNode),
        [`${prefixcls}-prefix-icon`]: isSemiIcon(labelNode),
      });

      return (
        <div class={prefixWrapperCls} id={insetLabelId} x-semi-prop="prefix,insetLabel">
          {labelNode}
        </div>
      );
    };

    const renderContent = () => {
      const { dropdownMinWidth } = state;
      const { dropdownStyle, dropdownClassName } = props;
      const style = {
        minWidth: isNaN(dropdownMinWidth) ? dropdownMinWidth : dropdownMinWidth + 'px',
        ...dropdownStyle,
      };
      const popoverCls = cls(dropdownClassName, `${prefixcls}-popover`);
      return (
        <div class={popoverCls} style={style}>
          {renderTree()}
        </div>
      );
    };

    const removeTag = (removedKey: TreeNodeData['key']) => {
      foundation.removeTag(removedKey);
    };

    const handleClick = (e: MouseEvent) => {
      foundation.handleClick(e);
    };

    const getDataForKeyNotInKeyEntities = (key: string) => {
      return foundation.getDataForKeyNotInKeyEntities(key);
    };

    /* istanbul ignore next */
    const handleSelectionEnterPress = (e: KeyboardEvent) => {
      foundation.handleSelectionEnterPress(e);
    };

    const hasValue = (): boolean => {
      const { multiple, checkRelation } = props;
      const { realCheckedKeys, checkedKeys, selectedKeys } = state;
      let hasValue = false;
      if (multiple) {
        if (checkRelation === 'related') {
          hasValue = Boolean(checkedKeys.size);
        } else if (checkRelation === 'unRelated') {
          hasValue = Boolean(realCheckedKeys.size);
        }
      } else {
        hasValue = Boolean(selectedKeys.length);
      }
      return hasValue;
    };

    const showClearBtn = () => {
      const { showClear, disabled, searchPosition } = props;
      const { inputValue, isOpen, isHovering } = state;
      const triggerSearchHasInputValue = searchPosition === strings.SEARCH_POSITION_TRIGGER && inputValue;

      return showClear && (hasValue() || triggerSearchHasInputValue) && !disabled && (isOpen || isHovering);
    };

    const renderTagList = (triggerRenderKeys: string[]) => {
      const { keyEntities, disabledKeys } = state;
      const {
        treeNodeLabelProp,
        leafOnly,
        disabled,
        disableStrictly,
        size,
        renderSelectedItem: propRenderSelectedItem,
        keyMaps,
      } = props;
      const realLabelName = get(keyMaps, 'label', treeNodeLabelProp);
      const renderSelectedItem = isFunction(propRenderSelectedItem)
        ? propRenderSelectedItem
        : (item: TreeNodeData) => ({
            isRenderInTag: true,
            content: get(item, realLabelName, null),
          });

      const tagList: VueJsxNodeSingle[] = [];
      // eslint-disable-next-line @typescript-eslint/no-shadow
      triggerRenderKeys.forEach((key: TreeNodeData['key'], index) => {
        const item =
          keyEntities[key] && keyEntities[key].key === key ? keyEntities[key].data : getDataForKeyNotInKeyEntities(key);
        const onClose = (tagContent: any, e: MouseEvent) => {
          if (e && typeof e.preventDefault === 'function') {
            // make sure that tag will not hidden immediately in controlled mode
            e.preventDefault();
          }
          removeTag(key);
        };
        const { content, isRenderInTag } = item
          ? (renderSelectedItem as RenderSelectedItemInMultiple)(item, { index, onClose })
          : ({} as any);
        if (!content) {
          return;
        }
        const isDisabled = disabled || item.disabled || (disableStrictly && disabledKeys.has(item.key));
        const tag: Partial<TagProps> & VueHTMLAttributes = {
          closable: !isDisabled,
          color: 'white',
          visible: true,
          onClose,
          key: `tag-${key}-${index}`,
          size: size === 'small' ? 'small' : 'large',
        };
        if (isRenderInTag) {
          // pass VueJsxNode list to tagList when using tagGroup custom mode
          tagList.push(<Tag {...tag}>{content}</Tag>);
        } else {
          tagList.push(content as VNode);
        }
      });
      return tagList;
    };

    /**
     * When single selection and the search box is on trigger, the items displayed in the rendered search box
     */
    const renderSingleTriggerSearchItem = () => {
      const { placeholder, disabled } = props;
      const { inputTriggerFocus } = state;
      const renderText = foundation.getRenderTextInSingle();
      const spanCls = cls(`${prefixcls}-selection-TriggerSearchItem`, {
        [`${prefixcls}-selection-TriggerSearchItem-placeholder`]: (inputTriggerFocus || !renderText) && !disabled,
        [`${prefixcls}-selection-TriggerSearchItem-disabled`]: disabled,
      });
      return <span class={spanCls} onClick={foundation.onClickSingleTriggerSearchItem}>
        {renderText ? renderText : placeholder}
      </span>;
    };

    /**
     * Single selection and the search box content rendered when the search box is on trigger
     */
    const renderSingleTriggerSearch = () => {
      const { inputValue } = state;
      return (
        <>
          {renderInput()}
          {!inputValue && renderSingleTriggerSearchItem()}
        </>
      );
    };

    const renderSelectContent = (triggerRenderKeys: string[]) => {
      const {
        multiple,
        placeholder,
        maxTagCount,
        searchPosition,
        filterTreeNode,
        showRestTagsPopover,
        restTagsPopoverProps,
      } = props;
      const isTriggerPositionSearch = filterTreeNode && searchPosition === strings.SEARCH_POSITION_TRIGGER;
      // searchPosition = trigger
      if (isTriggerPositionSearch) {
        return multiple ? renderTagInput(triggerRenderKeys) : renderSingleTriggerSearch();
      }
      // searchPosition = dropdown and single seleciton
      if (!multiple || !hasValue()) {
        const renderText = foundation.getRenderTextInSingle();
        const spanCls = cls(`${prefixcls}-selection-content`, {
          [`${prefixcls}-selection-placeholder`]: !renderText,
        });
        return <span class={spanCls}>{renderText ? renderText : placeholder}</span>;
      }
      // searchPosition = dropdown and multiple seleciton
      const tagList = renderTagList(triggerRenderKeys);
      // mode=custom to return tagList directly
      return (
        <TagGroup
          maxTagCount={maxTagCount}
          tagList={tagList as any}
          size="large"
          mode="custom"
          showPopover={showRestTagsPopover}
          popoverProps={restTagsPopoverProps}
        />
      );
    };

    const handleClear = (e: MouseEvent) => {
      e && e.stopPropagation();
      foundation.handleClear(e);
    };

    /* istanbul ignore next */
    const handleClearEnterPress = (e: KeyboardEvent) => {
      e && e.stopPropagation();
      foundation.handleClearEnterPress(e);
    };

    const handleMouseOver = (e: MouseEvent) => {
      foundation.toggleHoverState(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      foundation.toggleHoverState(false);
    };

    const search = (value: string) => {
      const { isOpen } = state;
      if (!isOpen) {
        foundation.open();
      }
      foundation.handleInputChange(value);
    };

    const close = () => {
      foundation.close(null);
    };

    const renderArrow = () => {
      const showClearBtn_ = showClearBtn();
      const { arrowIcon } = props;
      if (showClearBtn_) {
        return null;
      }
      return arrowIcon ? (
        <div class={cls(`${prefixcls}-arrow`)} x-semi-prop="arrowIcon">
          {arrowIcon}
        </div>
      ) : null;
    };

    const renderClearBtn = () => {
      const showClearBtn_ = showClearBtn();
      const { clearIcon } = props;
      const clearCls = cls(`${prefixcls}-clearbtn`);
      if (showClearBtn_) {
        return (
          <div
            role="button"
            tabindex={0}
            aria-label="Clear TreeSelect value"
            class={clearCls}
            onClick={handleClear}
            onKeypress={handleClearEnterPress}
          >
            {clearIcon ? clearIcon : <IconClear />}
          </div>
        );
      }
      return null;
    };

    const renderSelection = () => {
      const {
        disabled,
        multiple,
        filterTreeNode,
        validateStatus,
        prefix,
        suffix,
        style,
        size,
        insetLabel,
        className,
        placeholder,
        showClear,
        leafOnly,
        searchPosition,
        triggerRender,
        borderless,
        autoMergeValue,
        checkRelation,
        ...rest
      } = props;
      const { inputValue, selectedKeys, checkedKeys, keyEntities, isFocus, realCheckedKeys } = state;
      const filterable = Boolean(filterTreeNode);
      const useCustomTrigger = typeof triggerRender === 'function';
      const mouseEvent: VueHTMLAttributes = showClear
        ? {
            onMouseenter: (e: MouseEvent) => handleMouseOver(e),
            onMouseleave: (e: MouseEvent) => handleMouseLeave(e),
          }
        : {};
      const isTriggerPositionSearch = searchPosition === strings.SEARCH_POSITION_TRIGGER && filterable;
      const isEmptyTriggerSearch = isTriggerPositionSearch && isEmpty(checkedKeys);
      const isValueTriggerSearch = isTriggerPositionSearch && !isEmpty(checkedKeys);
      const classNames = useCustomTrigger
        ? cls(className)
        : cls(
            prefixcls,
            {
              [`${prefixcls}-borderless`]: borderless,
              [`${prefixcls}-focus`]: isFocus,
              [`${prefixcls}-disabled`]: disabled,
              [`${prefixcls}-single`]: !multiple,
              [`${prefixcls}-multiple`]: multiple,
              [`${prefixcls}-multiple-tagInput-empty`]: multiple && isEmptyTriggerSearch,
              [`${prefixcls}-multiple-tagInput-notEmpty`]: multiple && isValueTriggerSearch,
              [`${prefixcls}-filterable`]: filterable,
              [`${prefixcls}-error`]: validateStatus === 'error',
              [`${prefixcls}-warning`]: validateStatus === 'warning',
              [`${prefixcls}-small`]: size === 'small',
              [`${prefixcls}-large`]: size === 'large',
              [`${prefixcls}-with-prefix`]: prefix || insetLabel,
              [`${prefixcls}-with-suffix`]: suffix,
              [`${prefixcls}-with-suffix`]: suffix,
            },
            className
          );
      let inner: VNode | VNode[];
      let triggerRenderKeys = [];
      if (multiple) {
        if (!autoMergeValue) {
          triggerRenderKeys =[...checkedKeys];
        } else if (checkRelation === 'related') {
          triggerRenderKeys = normalizeKeyList([...checkedKeys], keyEntities, leafOnly, true);
        } else if (checkRelation === 'unRelated') {
          triggerRenderKeys = [...realCheckedKeys];
        }
      } else {
        triggerRenderKeys = selectedKeys;
      }
      if (useCustomTrigger) {
        inner = <Trigger
          inputValue={inputValue}
          value={triggerRenderKeys.map((key: string) => get(keyEntities, [key, 'data']))}
          disabled={disabled}
          placeholder={placeholder}
          onClear={handleClear}
          componentName={'TreeSelect'}
          triggerRender={triggerRender}
          componentProps={{ ...props }}
          onSearch={search}
          onRemove={removeTag}
        />;
      } else {
        inner = [
          <Fragment key={'prefix'}>{prefix || insetLabel ? renderPrefix() : null}</Fragment>,
          <Fragment key={'selection'}>
            <div class={`${prefixcls}-selection`}>{renderSelectContent(triggerRenderKeys)}</div>
          </Fragment>,
          <Fragment key={'suffix'}>{suffix ? renderSuffix() : null}</Fragment>,
          <Fragment key={'clearBtn'}>
            {
              (showClear || (isTriggerPositionSearch && inputValue)) ?
                renderClearBtn() :
                null
            }
          </Fragment>,
          <Fragment key={'arrow'}>{renderArrow()}</Fragment>,
        ];
      }

      const tabindex = disabled ? null : 0;
      /**
       * Reasons for disabling the a11y eslint rule:
       * The following attributes(aria-controls,aria-expanded) will be automatically added by Tooltip, no need to declare here
       */
      return (
        <div
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          aria-disabled={disabled}
          aria-haspopup="tree"
          tabindex={tabindex}
          class={classNames}
          style={style}
          ref={triggerRef}
          onClick={handleClick}
          onKeypress={handleSelectionEnterPress}
          aria-invalid={props['aria-invalid']}
          aria-errormessage={props['aria-errormessage']}
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          aria-describedby={props['aria-describedby']}
          aria-required={props['aria-required']}
          {...mouseEvent}
          {...getDataAttr()}
        >
          {{ default: () => inner }}
        </div>
      );
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const renderTagItem = (key: string, idx: number) => {
      const { keyEntities, disabledKeys } = state;
      const {
        size,
        leafOnly,
        disabled,
        disableStrictly,
        renderSelectedItem: propRenderSelectedItem,
        treeNodeLabelProp,
        keyMaps,
      } = props;
      const realLabelName = get(keyMaps, 'label', treeNodeLabelProp);
      const keyList = normalizeKeyList([key], keyEntities, leafOnly, true);
      const nodes = keyList.map((i) =>
        keyEntities[key] && keyEntities[key].key === key ? keyEntities[key].data : getDataForKeyNotInKeyEntities(key)
      );
      const value = getValueOrKey(nodes, keyMaps);
      const tagCls = cls(`${prefixcls}-selection-tag`, {
        [`${prefixcls}-selection-tag-disabled`]: disabled,
      });
      const nodeHaveData = !isEmpty(nodes) && !isEmpty(nodes[0]);
      const isDisableStrictlyNode = disableStrictly && nodeHaveData && disabledKeys.has(nodes[0].key);
      const closable = nodeHaveData && !nodes[0].disabled && !disabled && !isDisableStrictlyNode;
      const onClose = (tagChildren: VueJsxNode, e: MouseEvent) => {
        // When value has not changed, prevent clicking tag closeBtn to close tag
        e.preventDefault();
        removeTag(key);
      };
      const tagProps: Partial<TagProps> & VueHTMLAttributes = {
        size: size === 'small' ? 'small' : 'large',
        key: `tag-${value}-${idx}`,
        color: 'white',
        className: tagCls,
        closable,
        onClose,
      };
      const item = nodes[0];
      const renderSelectedItem = isFunction(propRenderSelectedItem)
        ? propRenderSelectedItem
        : (selectedItem: TreeNodeData) => ({
            isRenderInTag: true,
            content: get(selectedItem, treeNodeLabelProp, null),
          });
      if (isFunction(renderSelectedItem)) {
        const { content, isRenderInTag } = item
          ? (renderSelectedItem as RenderSelectedItemInMultiple)(item, { index: idx, onClose })
          : ({} as any);
        if (isRenderInTag) {
          return <Tag {...tagProps}>{content}</Tag>;
        } else {
          return content;
        }
      }
      return <Tag {...tagProps}>{value}</Tag>;
    };

    const renderTagInput = (triggerRenderKeys: string[]) => {
      const {
        disabled,
        size,
        searchAutoFocus,
        placeholder,
        maxTagCount,
        showRestTagsPopover,
        restTagsPopoverProps,
        searchPosition,
        filterTreeNode,
        preventScroll,
      } = props;
      const {
        inputValue,
      } = state;
      // auto focus search input divide into two parts
      // 1. filterTreeNode && searchPosition === strings.SEARCH_POSITION_TRIGGER
      //    Implemented by passing autofocus to the underlying input's autofocus
      // 2. filterTreeNode && searchPosition === strings.SEARCH_POSITION_DROPDOWN
      //    Due to the off-screen rendering in the tooltip implementation mechanism, if it is implemented through the
      //    autofocus of the input, when the option panel is opened, the page will scroll to top, so it is necessary
      //    to call the focus method through ref in the onVisibleChange callback of the Popover to achieve focus
      const autoFocus =
        filterTreeNode && searchPosition === strings.SEARCH_POSITION_TRIGGER ? searchAutoFocus : undefined;
      return (
        <TagInput
          maxTagCount={maxTagCount}
          disabled={disabled}
          onInputChange={(v) => search(v)}
          ref={tagInputRef}
          placeholder={placeholder}
          value={triggerRenderKeys}
          inputValue={inputValue}
          size={size}
          showRestTagsPopover={showRestTagsPopover}
          restTagsPopoverProps={restTagsPopoverProps}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          renderTagItem={(itemKey, index) => renderTagItem(itemKey, index)}
          onRemove={(itemKey) => removeTag(itemKey)}
          expandRestTagsOnClick={false}
          preventScroll={preventScroll}
        />
      );
    };

    // render Tree
    const renderInput = () => {
      const {
        searchPlaceholder,
        searchRender,
        showSearchClear,
        searchPosition,
        searchAutoFocus,
        multiple,
        disabled,
        preventScroll,
      } = props;
      const isDropdownPositionSearch = searchPosition === strings.SEARCH_POSITION_DROPDOWN;
      const inputcls = cls({
        [`${prefixTree}-input`]: isDropdownPositionSearch,
        [`${prefixcls}-inputTrigger`]: !isDropdownPositionSearch,
      });
      const { inputValue } = state;
      const baseInputProps = {
        value: inputValue,
        className: inputcls,
        preventScroll,
        onChange: (value: string) => search(value),
      };
      const inputDropdownProps = {
        showClear: showSearchClear,
        prefix: <IconSearch />,
      };
      const inputTriggerProps = {
        autofocus: searchAutoFocus,
        onFocus: (e: FocusEvent) => foundation.handleInputTriggerFocus(),
        onBlur: (e: FocusEvent) => foundation.handleInputTriggerBlur(),
        disabled,
      };
      const realInputProps = isDropdownPositionSearch ? inputDropdownProps : inputTriggerProps;
      const wrapperCls = cls({
        [`${prefixTree}-search-wrapper`]: isDropdownPositionSearch,
        [`${prefixcls}-triggerSingleSearch-wrapper`]: !isDropdownPositionSearch && !multiple,
      });
      const useCusSearch = typeof searchRender === 'function' || typeof searchRender === 'boolean';
      if (useCusSearch && !searchRender) {
        return null;
      }
      return (
        <div class={wrapperCls}>
          <LocaleConsumer componentName="TreeSelect">
            {(locale: Locale['TreeSelect']) => {
              const placeholder = isDropdownPositionSearch ? searchPlaceholder || locale.searchPlaceholder : '';
              if (useCusSearch) {
                return (searchRender as any)({ ...realInputProps, ...baseInputProps, placeholder });
              }
              return (
                <Input
                  aria-label="Filter TreeSelect item"
                  ref={inputRef as any}
                  // autofocus={searchAutoFocus}
                  placeholder={placeholder}
                  {...baseInputProps}
                  {...realInputProps}
                />
              );
            }}
          </LocaleConsumer>
        </div>
      );
    };

    const renderEmpty = () => {
      const { emptyContent } = props;
      if (emptyContent) {
        return <TreeNode key={'treeSelectTreeNode'} empty emptyContent={props.emptyContent} />;
      } else {
        return (
          <LocaleConsumer componentName="Tree">
            {(locale: Locale['Tree']) => <TreeNode key={'treeSelectTreeNode'} empty emptyContent={locale.emptyText} />}
          </LocaleConsumer>
        );
      }
    };

    const onNodeLoad = (data: TreeNodeData) => new Promise((resolve) => foundation.setLoadKeys(data, resolve));

    const onNodeSelect = (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => {
      foundation.handleNodeSelect(e, treeNode);
    };

    const onNodeCheck = (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => {
      foundation.handleNodeSelect(e, treeNode);
    };

    const onNodeExpand = (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => {
      foundation.handleNodeExpand(e, treeNode);
    };

    const getTreeNodeRequiredProps = () => {
      const { expandedKeys, selectedKeys, checkedKeys, halfCheckedKeys, keyEntities, filteredKeys } = state;
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
      const { data } = treeNode;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { key }: { key: string } = data;
      return key;
    };

    /* Event handler function after popover visible change */
    const handlePopoverVisibleChange = isVisible => {
      foundation.handlePopoverVisibleChange(isVisible);
    }

    const afterClose = () => {
      foundation.handleAfterClose();
    }

    const renderTreeNode = (treeNode: FlattenNode, ind: number, style: CSSProperties) => {
      const { data, key } = treeNode;
      const treeNodeProps = foundation.getTreeNodeProps(key);
      const { showLine } = props;
      if (!treeNodeProps) {
        return null;
      }
      const props_: any = pick(treeNode, ['key', 'label', 'disabled', 'isLeaf', 'icon', 'isEnd']);
      const { keyMaps } = props_;
      const children = data[get(keyMaps, 'children', 'children')];
      !isUndefined(children) && (props_.children = children);
      return <TreeNode {...treeNodeProps} {...data} {...props_} data={data} style={style} showLine={showLine} />;
    };

    const itemKey = (index: number, data: Record<string, any>) => {
      const { visibleOptions } = data;
      // Find the item at the specified index.
      const item = visibleOptions[index];
      // Return a value that uniquely identifies this item.
      return item.key;
    };

    const renderNodeList = () => {
      const { flattenNodes, cachedFlattenNodes, motionKeys, motionType, filteredKeys } = state;
      const { direction } = context.value;
      const { virtualize, motionExpand } = props;
      const isExpandControlled = 'expandedKeys' in getProps(props);
      if (!virtualize || isEmpty(virtualize)) {
        return (
          <NodeList
            flattenNodes={flattenNodes as FlattenNode[]}
            flattenList={cachedFlattenNodes}
            motionKeys={motionExpand ? motionKeys : new Set([])}
            motionType={motionType}
            // When motionKeys is empty, but filteredKeys is not empty (that is, the search hits), this situation should be distinguished from ordinary motionKeys
            searchTargetIsDeep={isExpandControlled && motionExpand && isEmpty(motionKeys) && !isEmpty(filteredKeys)}
            onMotionEnd={onMotionEnd}
            renderTreeNode={renderTreeNode}
          />
        );
      }

      const data = {
        visibleOptions: flattenNodes,
        renderOption: renderTreeNode,
      };

      return (
        <AutoSizer
          defaultHeight={styleNum(virtualize.height)}
          defaultWidth={styleNum(virtualize.width)}
          children={({ height, width }) => (
            <VirtualList
              itemCount={flattenNodes.length}
              itemSize={virtualize.itemSize}
              height={height as any}
              width={width}
              // @ts-ignore avoid strict check of itemKey
              itemKey={itemKey}
              itemData={data}
              className={`${prefixTree}-virtual-list`}
              style={{ direction }}
            >
              {VirtualRow}
            </VirtualList>
          )}
        ></AutoSizer>
      );
    };

    const renderTree = () => {
      const {
        keyEntities,
        motionKeys,
        motionType,
        inputValue,
        filteredKeys,
        flattenNodes,
        checkedKeys,
        realCheckedKeys,
      } = state;
      const {
        loadData,
        filterTreeNode,
        disabled,
        multiple,
        showFilteredOnly,
        motionExpand,
        outerBottomSlot,
        outerTopSlot,
        expandAction,
        labelEllipsis,
        virtualize,
        optionListStyle,
        searchPosition,
        renderLabel,
        renderFullLabel,
        checkRelation,
      } = props;
      const wrapperCls = cls(`${prefixTree}-wrapper`);
      const listCls = cls(`${prefixTree}-option-list`, {
        [`${prefixTree}-option-list-block`]: true,
      });
      const searchNoRes = Boolean(inputValue) && !filteredKeys.size;
      const noData = isEmpty(flattenNodes) || (showFilteredOnly && searchNoRes);
      const isDropdownPositionSearch = searchPosition === strings.SEARCH_POSITION_DROPDOWN;
      return (
        <TreeContext.Provider
          value={{
            loadData,
            treeDisabled: disabled,
            motion: motionExpand,
            motionKeys,
            motionType,
            expandAction,
            filterTreeNode,
            keyEntities,
            onNodeClick: onNodeClick,
            onNodeDoubleClick: onNodeDoubleClick,
            // tree node will call this function when treeNode is right clicked
            onNodeRightClick: noop,
            onNodeExpand: onNodeExpand,
            onNodeSelect: onNodeSelect,
            onNodeCheck: onNodeCheck,
            renderTreeNode: renderTreeNode,
            multiple,
            showFilteredOnly,
            isSearching: Boolean(inputValue),
            renderLabel,
            renderFullLabel,
            labelEllipsis: typeof labelEllipsis === 'undefined' ? virtualize : labelEllipsis,
          }}
        >
          <div class={wrapperCls}>
            {outerTopSlot}
            {!outerTopSlot && filterTreeNode && isDropdownPositionSearch && renderInput()}
            <div class={listCls} role="tree" aria-multiselectable={multiple ? true : false} style={optionListStyle}>
              {noData ? (
                renderEmpty()
              ) : multiple ? (
                <CheckboxGroup value={Array.from(checkRelation === 'related' ? checkedKeys : realCheckedKeys)}>
                  {renderNodeList()}
                </CheckboxGroup>
              ) : (
                renderNodeList()
              )}
            </div>
            {outerBottomSlot}
          </div>
        </TreeContext.Provider>
      );
    };

    return () => {
      const content = renderContent();
      const {
        motion,
        zIndex,
        mouseLeaveDelay,
        mouseEnterDelay,
        autoAdjustOverflow,
        stopPropagation,
        getPopupContainer,
        dropdownMargin,
        position,
      } = props;
      const { isOpen, rePosKey } = state;
      const selection = renderSelection();
      const pos = position ? position : 'bottomLeft';
      return (
        <Popover
          stopPropagation={stopPropagation}
          getPopupContainer={getPopupContainer}
          zIndex={zIndex}
          motion={motion}
          margin={dropdownMargin}
          ref={optionsRef}
          content={content}
          visible={isOpen}
          trigger="custom"
          rePosKey={rePosKey}
          position={pos}
          autoAdjustOverflow={autoAdjustOverflow}
          mouseLeaveDelay={mouseLeaveDelay}
          mouseEnterDelay={mouseEnterDelay}
          onVisibleChange={handlePopoverVisibleChange}
          afterClose={afterClose}
        >
          {selection}
        </Popover>
      );
    };
  },
  {
    props: vuePropsType,
    name: 'TreeSelect',
  }
);

export default TreeSelect;
