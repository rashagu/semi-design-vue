import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  CSSProperties,
  VNode,
  reactive,
  onMounted,
  onUnmounted,
  watch,
  nextTick, ComponentObjectPropsOptions, PropType,
} from 'vue';
import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import CascaderFoundation, {
  BasicCascaderData,
  BasicEntity,
  BasicValue,
  ShowNextType,
} from '@douyinfe/semi-foundation/cascader/foundation';
import type {
  /* Corresponding to the state of react */
  BasicCascaderInnerData,
  /* Corresponding to the props of react */
  BasicCascaderProps,
  BasicTriggerRenderProps,
  BasicScrollPanelProps,
  CascaderAdapter,
  CascaderType,
} from '@douyinfe/semi-foundation/cascader/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/cascader/constants';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import { isSet, isEqual, isString, isEmpty, isFunction, isNumber, noop, flatten } from 'lodash';
import '@douyinfe/semi-foundation/cascader/cascader.scss';
import { IconClear, IconChevronDown } from '@kousum/semi-icons-vue';
import { findKeysForValues, convertDataToEntities, calcMergeType } from '@douyinfe/semi-foundation/cascader/util';
import { calcCheckedKeys, normalizeKeyList, calcDisabledKeys } from '@douyinfe/semi-foundation/tree/treeUtil';
import { getProps, useBaseComponent, ValidateStatus } from '../_base/baseComponent';
import Input from '../input';
import Popover, { PopoverProps } from '../popover';
import Item, { CascaderData, Entities, Entity, Data, FilterRenderProps } from './item';
import Trigger from '../trigger';
import Tag from '../tag';
import TagInput, { TagInputProps } from '../tagInput';
import { Motion } from '../_base/base';
import { isSemiIcon } from '../_utils/index';
import { Position } from '../tooltip/index';
import { AriaAttributes } from '../AriaAttributes';
import { vuePropsMake } from '../PropTypes';
import { VueJsxNode } from '../interface';

export type { CascaderType, ShowNextType } from '@douyinfe/semi-foundation/cascader/foundation';
export type { CascaderData, Entity, Data, CascaderItemProps, FilterRenderProps } from './item';

export interface ScrollPanelProps extends BasicScrollPanelProps {
  activeNode: CascaderData;
}

export interface TriggerRenderProps extends BasicTriggerRenderProps {
  componentProps: CascaderProps;
  onClear: (e: MouseEvent) => void;
}

/* The basic type of the value of CascaderDemo */
export type SimpleValueType = string | number | CascaderData;

/* The value of CascaderDemo */
export type Value = SimpleValueType | Array<SimpleValueType> | Array<Array<SimpleValueType>>;

export interface CascaderProps extends BasicCascaderProps {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  'aria-label'?: AriaAttributes['aria-label'];
  arrowIcon?: VNode | string;
  defaultValue?: Value;
  dropdownStyle?: CSSProperties;
  emptyContent?: VNode | string;
  motion?: boolean;
  filterTreeNode?: ((inputValue: string, treeNodeString: string, data?: CascaderData) => boolean) | boolean;
  filterSorter?: (first: CascaderData, second: CascaderData, inputValue: string) => number;
  filterRender?: (props: FilterRenderProps) => VueJsxNode;
  treeData?: Array<CascaderData>;
  restTagsPopoverProps?: PopoverProps;
  children?: VNode | string;
  value?: Value;
  prefix?: VNode | string;
  suffix?: VNode | string;
  id?: string;
  insetLabel?: VNode | string;
  insetLabelId?: string;
  style?: CSSProperties;
  bottomSlot?: VNode | string;
  topSlot?: VNode | string;
  triggerRender?: (props: TriggerRenderProps) => VueJsxNode;
  onListScroll?: (e: any, panel: ScrollPanelProps) => void;
  loadData?: (selectOptions: CascaderData[]) => Promise<void>;
  onLoad?: (newLoadedKeys: Set<string>, data: CascaderData) => void;
  onChange?: (value: Value) => void;
  onExceed?: (checkedItem: Entity[]) => void;
  displayRender?: (selected: Array<string> | Entity, idx?: number) => VNode | string;
  onBlur?: (e: MouseEvent) => void;
  onFocus?: (e: MouseEvent) => void;
  validateStatus?: ValidateStatus;
  position?: Position;

  loadedKeys?: any
  autoClearSearchValue?: boolean
}

export interface CascaderState extends BasicCascaderInnerData {
  keyEntities: Entities;
  prevProps: CascaderProps;
  treeData?: Array<CascaderData>;
}

const prefixcls = cssClasses.PREFIX;
const resetkey = 0;

const propTypes:ComponentObjectPropsOptions<CascaderProps> = {
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-errormessage': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-required': PropTypes.bool,
  'aria-label': PropTypes.string,
  arrowIcon: PropTypes.node as PropType<CascaderProps['arrowIcon']>,
  borderless: PropTypes.bool,
  changeOnSelect: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.object,
  emptyContent: PropTypes.node as PropType<CascaderProps['emptyContent']>,
  motion: PropTypes.bool,
  /* show search input, if passed in a function, used as custom filter */
  filterTreeNode: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  filterLeafOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  size: String as PropType<CascaderProps['size']>,
  style: PropTypes.object,
  className: PropTypes.string,
  treeData: [String, Number, Object, Array] as PropType<CascaderProps['treeData']>,
  treeNodeFilterProp: PropTypes.string,
  suffix: PropTypes.node as PropType<CascaderProps['suffix']>,
  prefix: PropTypes.node as PropType<CascaderProps['prefix']>,
  insetLabel: PropTypes.node as PropType<CascaderProps['insetLabel']>,
  insetLabelId: PropTypes.string,
  id: PropTypes.string,
  displayProp: PropTypes.string,
  displayRender: PropTypes.func as PropType<CascaderProps['displayRender']>,
  onChange: PropTypes.func as PropType<CascaderProps['onChange']>,
  onSearch: PropTypes.func as PropType<CascaderProps['onSearch']>,
  onSelect: PropTypes.func as PropType<CascaderProps['onSelect']>,
  onBlur: PropTypes.func as PropType<CascaderProps['onBlur']>,
  onFocus: PropTypes.func as PropType<CascaderProps['onFocus']>,
  children: PropTypes.node as PropType<CascaderProps['children']>,
  getPopupContainer: PropTypes.func as PropType<CascaderProps['getPopupContainer']>,
  zIndex: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  validateStatus: PropTypes.string as PropType<CascaderProps['validateStatus']>,
  showNext: PropTypes.string as PropType<CascaderProps['showNext']>,
  stopPropagation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showClear: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  autoAdjustOverflow: PropTypes.bool,
  onDropdownVisibleChange: PropTypes.func as PropType<CascaderProps['onDropdownVisibleChange']>,
  triggerRender: PropTypes.func as PropType<CascaderProps['triggerRender']>,
  onListScroll: PropTypes.func as PropType<CascaderProps['onListScroll']>,
  onChangeWithObject: PropTypes.bool,
  bottomSlot: PropTypes.node as PropType<CascaderProps['bottomSlot']>,
  topSlot: PropTypes.node as PropType<CascaderProps['topSlot']>,
  multiple: PropTypes.bool,
  autoMergeValue: PropTypes.bool,
  maxTagCount: PropTypes.number,
  showRestTagsPopover: PropTypes.bool,
  restTagsPopoverProps: PropTypes.object,
  max: PropTypes.number,
  separator: PropTypes.string,
  onExceed: PropTypes.func as PropType<CascaderProps['onExceed']>,
  onClear: PropTypes.func as PropType<CascaderProps['onClear']>,
  loadData: PropTypes.func as PropType<CascaderProps['loadData']>,
  onLoad: PropTypes.func as PropType<CascaderProps['onLoad']>,
  loadedKeys: PropTypes.array as PropType<any>,
  disableStrictly: PropTypes.bool,
  leafOnly: PropTypes.bool,
  enableLeafClick: PropTypes.bool,
  preventScroll: PropTypes.bool,
  position: PropTypes.string as PropType<CascaderProps['position']>,

  autoClearSearchValue: {
    type: Boolean,
    default: true,
  },

  mouseEnterDelay: Number,
  mouseLeaveDelay: Number,
};
const defaultProps = {
  borderless: false,
  leafOnly: false,
  arrowIcon: <IconChevronDown />,
  stopPropagation: true,
  motion: true,
  defaultOpen: false,
  zIndex: popoverNumbers.DEFAULT_Z_INDEX,
  showClear: false,
  autoClearSearchValue: true,
  changeOnSelect: false,
  disableStrictly: false,
  autoMergeValue: true,
  multiple: false,
  filterTreeNode: false,
  filterLeafOnly: true,
  showRestTagsPopover: false,
  restTagsPopoverProps: {},
  separator: ' / ',
  size: 'default' as const,
  treeNodeFilterProp: 'label' as const,
  displayProp: 'label' as const,
  treeData: [] as Array<CascaderData>,
  showNext: strings.SHOW_NEXT_BY_CLICK,
  onExceed: noop,
  onClear: noop,
  onDropdownVisibleChange: noop,
  onListScroll: noop,
  enableLeafClick: false,
  'aria-label': 'Cascader',
};

export const vuePropsType = vuePropsMake<CascaderProps>(propTypes, defaultProps);
const Index = defineComponent<CascaderProps>((props, { expose }) => {
  const slots = useSlots();

  const state = reactive<CascaderState>({
    disabledKeys: new Set(),
    isOpen: props.defaultOpen,
    /* By changing rePosKey, the dropdown position can be refreshed */
    rePosKey: resetkey,
    /* A data structure for storing cascader data items */
    keyEntities: {},
    /* Selected and show tick icon */
    selectedKeys: new Set([]),
    /* The key of the activated node */
    activeKeys: new Set([]),
    /* The key of the filtered node */
    filteredKeys: new Set([]),
    /* Value of input box */
    inputValue: '',
    /* Is searching */
    isSearching: false,
    /* The placeholder of input box */
    inputPlaceHolder: props.searchPlaceholder || props.placeholder,
    /* Cache props */
    prevProps: {},
    /* Is hovering */
    isHovering: false,
    /* Key of checked node, when multiple */
    checkedKeys: new Set([]),
    /* Key of half checked node, when multiple */
    halfCheckedKeys: new Set([]),
    /* Auto merged checkedKeys or leaf checkedKeys, when multiple */
    resolvedCheckedKeys: new Set([]),
    /* Keys of loaded item */
    loadedKeys: new Set(),
    /* Keys of loading item */
    loadingKeys: new Set(),
    /* Mark whether this rendering has triggered asynchronous loading of data */
    loading: false,
    isFocus: undefined,
    isInput: undefined,
  });
  const options: any = {};
  const isEmpty_: boolean = false;
  const mergeType: string = calcMergeType(props.autoMergeValue, props.leafOnly);
  const inputRef = ref(null);
  const triggerRef = ref(null);
  const optionsRef = ref(null);
  let clickOutsideHandler: any = null;
  // TODO context
  const { adapter: adapterInject, context } = useBaseComponent<CascaderProps>(props, state);

  const foundation = new CascaderFoundation(adapter());
  function adapter(): CascaderAdapter {
    const filterAdapter: Pick<CascaderAdapter, 'updateInputValue' | 'updateInputPlaceHolder' | 'focusInput' | 'blurInput'> = {
      updateInputValue: (value) => {
        state.inputValue = value;
      },
      updateInputPlaceHolder: (value) => {
        state.inputPlaceHolder = value;
      },
      focusInput: () => {
        const { preventScroll } = props;
        if (inputRef.value) {
          // TODO: check the reason
          (inputRef.value as any).focus({ preventScroll });
        }
      },
      blurInput: () => {
        if (inputRef.value) {
          (inputRef.value as any).blur();
        }
      },
    };
    const cascaderAdapter: Pick<
      CascaderAdapter,
      'registerClickOutsideHandler' | 'unregisterClickOutsideHandler' | 'rePositionDropdown'
    > = {
      registerClickOutsideHandler: (cb) => {
        const clickOutsideHandler_ = (e: Event) => {
          const optionInstance = optionsRef.value;
          const triggerDom = triggerRef.value;
          // 当组件内部使用了expose时，使用ref得到的内容只有expose的那部分
          const optionsDom = optionInstance?.getRef?.().vnode.el;
          const target = e.target as Element;
          if (
            optionsDom &&
            (!optionsDom.contains(target) || !optionsDom.contains(target.parentNode)) &&
            triggerDom &&
            !triggerDom.contains(target)
          ) {
            cb(e);
          }
        };
        clickOutsideHandler = clickOutsideHandler_;
        document.addEventListener('mousedown', clickOutsideHandler, false);
      },
      unregisterClickOutsideHandler: () => {
        document.removeEventListener('mousedown', clickOutsideHandler, false);
      },
      rePositionDropdown: () => {
        let { rePosKey } = state;
        rePosKey = rePosKey + 1;
        state.rePosKey = rePosKey;
      },
    };
    return {
      ...adapterInject<CascaderProps, CascaderState>(),
      ...filterAdapter,
      ...cascaderAdapter,
      updateStates: (states) => {
        for (let key in states) {
          state[key] = states[key];
        }
      },
      openMenu: () => {
        state.isOpen = true;
      },
      closeMenu: (cb) => {
        state.isOpen = false;
        cb && cb();
      },
      updateSelection: (selectedKeys) => {
        state.selectedKeys = selectedKeys;
      },
      notifyChange: (value) => {
        props.onChange && props.onChange(value);
      },
      notifySelect: (selected) => {
        props.onSelect && props.onSelect(selected);
      },
      notifyOnSearch: (input) => {
        props.onSearch && props.onSearch(input);
      },
      notifyFocus: (...v) => {
        props.onFocus && props.onFocus(...v);
      },
      notifyBlur: (...v) => {
        props.onBlur && props.onBlur(...v);
      },
      notifyDropdownVisibleChange: (visible) => {
        props.onDropdownVisibleChange(visible);
      },
      toggleHovering: (bool) => {
        state.isHovering = bool;
      },
      notifyLoadData: (selectedOpt, callback) => {
        const { loadData } = props;
        if (loadData) {
          new Promise<void>((resolve) => {
            loadData(selectedOpt).then(() => {
              callback();
              state.loading = true;
              resolve();
            });
          });
        }
      },
      notifyOnLoad: (newLoadedKeys, data) => {
        const { onLoad } = props;
        onLoad && onLoad(newLoadedKeys, data);
      },
      notifyListScroll: (e, { panelIndex, activeNode }) => {
        props.onListScroll(e, { panelIndex, activeNode });
      },
      notifyOnExceed: (data) => props.onExceed(data),
      notifyClear: () => props.onClear(),
      toggleInputShow: (showInput: boolean, cb: (...args: any) => void) => {
        state.showInput = showInput;
        nextTick(() => {
          cb();
        });
      },
      updateFocusState: (isFocus: boolean) => {
        state.isFocus = isFocus;
      },
    };
  }

  // watch props OK
  function getDerivedStateFromProps(props: CascaderProps) {
    const { multiple, value, defaultValue, onChangeWithObject, leafOnly, autoMergeValue } = props;
    const { prevProps } = state;
    let keyEntities = state.keyEntities || {};
    const newState: Partial<CascaderState> = {};
    const needUpdate = (name: string) => {
      const firstInProps = isEmpty(prevProps) && name in props;
      const nameHasChange = prevProps && !isEqual(prevProps[name], props[name]);
      return firstInProps || nameHasChange;
    };
    const needUpdateData = () => {
      const firstInProps = !prevProps && 'treeData' in props;
      const treeDataHasChange = prevProps && prevProps.treeData !== props.treeData;
      return firstInProps || treeDataHasChange;
    };
    const getRealKeys = (realValue: Value, keyEntities: Entities) => {
      // normallizedValue is used to save the value in two-dimensional array format
      let normallizedValue: SimpleValueType[][] = [];
      if (Array.isArray(realValue)) {
        normallizedValue = Array.isArray(realValue[0])
          ? (realValue as SimpleValueType[][])
          : ([realValue] as SimpleValueType[][]);
      } else {
        if (realValue !== undefined) {
          normallizedValue = [[realValue]];
        }
      }
      // formatValuePath is used to save value of valuePath
      const formatValuePath: (string | number)[][] = [];
      normallizedValue.forEach((valueItem: SimpleValueType[]) => {
        const formatItem: (string | number)[] = onChangeWithObject
          ? (valueItem as CascaderData[]).map((i) => i?.value)
          : (valueItem as (string | number)[]);
        formatValuePath.push(formatItem);
      });
      // formatKeys is used to save key of value
      const formatKeys: any[] = [];
      formatValuePath.forEach((v) => {
        const formatKeyItem = findKeysForValues(v, keyEntities);
        !isEmpty(formatKeyItem) && formatKeys.push(formatKeyItem);
      });
      return formatKeys;
    };
    const needUpdateTreeData = needUpdate('treeData') || needUpdateData();
    const needUpdateValue = needUpdate('value') || (isEmpty(prevProps) && defaultValue);
    if (multiple) {
      // when value and treedata need updated
      if (needUpdateTreeData || needUpdateValue) {
        // update state.keyEntities
        if (needUpdateTreeData) {
          newState.treeData = props.treeData;
          keyEntities = convertDataToEntities(props.treeData);
          newState.keyEntities = keyEntities;
        }
        let realKeys: Array<string> | Set<string> = state.checkedKeys;
        // when data was updated
        if (needUpdateValue) {
          const realValue = needUpdate('value') ? value : defaultValue;
          realKeys = getRealKeys(realValue, keyEntities);
        } else {
          // needUpdateValue is false
          // if treeData is updated & Cascader is controlled, realKeys should be recalculated
          if (needUpdateTreeData && 'value' in getProps(props)) {
            const realValue = value;
            realKeys = getRealKeys(realValue, keyEntities);
          }
        }
        if (isSet(realKeys)) {
          realKeys = [...realKeys];
        }
        const calRes = calcCheckedKeys(flatten(realKeys), keyEntities);
        const checkedKeys = new Set(calRes.checkedKeys);
        const halfCheckedKeys = new Set(calRes.halfCheckedKeys);
        // disableStrictly
        if (props.disableStrictly) {
          newState.disabledKeys = calcDisabledKeys(keyEntities);
        }
        const isLeafOnlyMerge = calcMergeType(autoMergeValue, leafOnly) === strings.LEAF_ONLY_MERGE_TYPE;
        newState.prevProps = props;
        newState.checkedKeys = checkedKeys;
        newState.halfCheckedKeys = halfCheckedKeys;
        newState.resolvedCheckedKeys = new Set(normalizeKeyList(checkedKeys, keyEntities, isLeafOnlyMerge));
      }
    }
    return newState;
  }
  watch(
    () => props,
    (val) => {
      const newState = getDerivedStateFromProps(props);
      newState &&
        Object.keys(newState).forEach((key) => {
          state[key] = newState[key];
        });
    },
    { deep: true }
  );

  onMounted(() => {
    foundation.init();
  });

  onUnmounted(() => {
    foundation.destroy();
  });

  watch([() => props.treeData, () => props.value], (value, [prevPropsTreeData, prevPropsValue]) => {
    let isOptionsChanged = false;
    if (!isEqual(prevPropsTreeData, props.treeData)) {
      isOptionsChanged = true;
      foundation.collectOptions();
    }
    if (prevPropsValue !== props.value && !isOptionsChanged) {
      foundation.handleValueChange(props.value);
    }
  });

  const handleInputChange = (value: string) => {
    foundation.handleInputChange(value);
  };

  const handleTagRemove = (e: any, tagValuePath: Array<string | number>) => {
    foundation.handleTagRemove(e, tagValuePath as string[]);
  };

  const handleRemoveByKey = (key) => {
    const { keyEntities } = state;
    handleTagRemove(null, keyEntities[key].valuePath);
  };

  const renderTagItem = (value: string | Array<string>, idx: number, type: string) => {
    const { keyEntities, disabledKeys } = state;
    const { size, disabled, displayProp, displayRender, disableStrictly } = props;
    const nodeKey = type === strings.IS_VALUE ? findKeysForValues(value, keyEntities)[0] : value;
    const isDsiabled = disabled || keyEntities[nodeKey].data.disabled || (disableStrictly && disabledKeys.has(nodeKey));
    if (!isEmpty(keyEntities) && !isEmpty(keyEntities[nodeKey])) {
      const tagCls = cls(`${prefixcls}-selection-tag`, {
        [`${prefixcls}-selection-tag-disabled`]: isDsiabled,
      });
      // custom render tags
      if (isFunction(displayRender)) {
        return displayRender(keyEntities[nodeKey], idx);
        // default render tags
      } else {
        return (
          <Tag
            size={size === 'default' ? 'large' : size}
            key={`tag-${nodeKey}-${idx}`}
            color="white"
            className={tagCls}
            closable
            onClose={(tagChildren, e) => {
              // When value has not changed, prevent clicking tag closeBtn to close tag
              e.preventDefault();
              handleTagRemove(e, keyEntities[nodeKey].valuePath);
            }}
          >
            {keyEntities[nodeKey].data[displayProp]}
          </Tag>
        );
      }
    }
    return null;
  };

  function renderTagInput() {
    const { size, disabled, placeholder, maxTagCount, showRestTagsPopover, restTagsPopoverProps } = props;
    const { inputValue, checkedKeys, keyEntities, resolvedCheckedKeys } = state;
    const tagInputcls = cls(`${prefixcls}-tagInput-wrapper`);
    const tagValue: Array<Array<string>> = [];
    const realKeys = mergeType === strings.NONE_MERGE_TYPE ? checkedKeys : resolvedCheckedKeys;
    [...realKeys].forEach((checkedKey) => {
      if (!isEmpty(keyEntities[checkedKey])) {
        tagValue.push(keyEntities[checkedKey].valuePath);
      }
    });
    return (
      <TagInput
        className={tagInputcls}
        ref={inputRef as any}
        disabled={disabled}
        size={size}
        // TODO Modify logic, not modify type
        value={tagValue as unknown as string[]}
        showRestTagsPopover={showRestTagsPopover}
        restTagsPopoverProps={restTagsPopoverProps}
        maxTagCount={maxTagCount}
        renderTagItem={(value, index) => renderTagItem(value, index, strings.IS_VALUE)}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        // TODO Modify logic, not modify type
        onRemove={(v) => handleTagRemove(null, v as unknown as (string | number)[])}
        placeholder={placeholder}
        expandRestTagsOnClick={false}
      />
    );
  }

  function renderInput() {
    const { size, disabled } = props;
    const inputcls = cls(`${prefixcls}-input`);
    const { inputValue, inputPlaceHolder, showInput } = state;
    const inputProps = {
      disabled,
      value: inputValue,
      className: inputcls,
      onChange: handleInputChange,
    };
    const wrappercls = cls({
      [`${prefixcls}-search-wrapper`]: true,
      [`${prefixcls}-search-wrapper-${size}`]: size !== 'default',
    });

    const displayText = renderDisplayText();
    const spanCls = cls({
      [`${prefixcls}-selection-placeholder`]: !displayText,
      [`${prefixcls}-selection-text-hide`]: showInput && inputValue,
      [`${prefixcls}-selection-text-inactive`]: showInput && !inputValue,
    });

    return (
      <div class={wrappercls}>
        <span class={spanCls}>{displayText ? displayText : inputPlaceHolder}</span>
        {showInput && <Input ref={inputRef} size={size} {...inputProps} />}
      </div>
    );
  }

  const handleItemClick = (e: MouseEvent | KeyboardEvent, item: Entity | Data) => {
    foundation.handleItemClick(e, item);
  };

  const handleItemHover = (e: MouseEvent, item: Entity) => {
    foundation.handleItemHover(e, item);
  };

  const onItemCheckboxClick = (item: Entity | Data) => {
    foundation.onItemCheckboxClick(item);
  };

  const handleListScroll = (e: any, ind: number) => {
    foundation.handleListScroll(e, ind);
  };

  function close(e?: any) {
    foundation.close(e);
  }

  function open() {
    foundation.open();
  }
  function focus() {
    foundation.focus();
  }

  function blur() {
    foundation.blur();
  }


  expose({
    focus,
    blur,
    close,
    open,
  });

  const renderContent = () => {
    const { inputValue, isSearching, activeKeys, selectedKeys, checkedKeys, halfCheckedKeys, loadedKeys, loadingKeys } =
      state;
    const {
      filterTreeNode,
      dropdownClassName,
      dropdownStyle,
      loadData,
      emptyContent,
      separator,
      topSlot,
      bottomSlot,
      showNext,
      multiple,
      filterRender,
    } = props;
    const searchable = Boolean(filterTreeNode) && isSearching;
    const popoverCls = cls(dropdownClassName, `${prefixcls}-popover`);
    const renderData = foundation.getRenderData();
    const content = (
      <div class={popoverCls} role="listbox" style={dropdownStyle}>
        {topSlot}
        <Item
          activeKeys={activeKeys}
          selectedKeys={selectedKeys}
          separator={separator}
          loadedKeys={loadedKeys}
          loadingKeys={loadingKeys}
          onItemClick={handleItemClick}
          onItemHover={handleItemHover}
          showNext={showNext}
          onItemCheckboxClick={onItemCheckboxClick}
          onListScroll={handleListScroll}
          searchable={searchable}
          keyword={inputValue}
          emptyContent={emptyContent}
          loadData={loadData}
          data={renderData}
          multiple={multiple}
          checkedKeys={checkedKeys}
          halfCheckedKeys={halfCheckedKeys}
          filterRender={filterRender}
        />
        {bottomSlot}
      </div>
    );
    return content;
  };

  const renderPlusN = (hiddenTag: (VNode | string)[]) => {
    const { disabled, showRestTagsPopover, restTagsPopoverProps } = props;
    const plusNCls = cls(`${prefixcls}-selection-n`, {
      [`${prefixcls}-selection-n-disabled`]: disabled,
    });
    const renderPlusNChildren = <span class={plusNCls}>+{hiddenTag.length}</span>;
    return showRestTagsPopover && !disabled ? (
      <Popover
        content={hiddenTag}
        showArrow
        trigger="hover"
        position="top"
        autoAdjustOverflow
        {...restTagsPopoverProps}
      >
        {renderPlusNChildren}
      </Popover>
    ) : (
      renderPlusNChildren
    );
  };

  const renderMultipleTags = () => {
    const { autoMergeValue, maxTagCount } = props;
    const { checkedKeys, resolvedCheckedKeys } = state;
    const realKeys = mergeType === strings.NONE_MERGE_TYPE ? checkedKeys : resolvedCheckedKeys;
    const displayTag: Array<VNode | string> = [];
    const hiddenTag: Array<VNode | string> = [];
    [...realKeys].forEach((checkedKey, idx) => {
      const notExceedMaxTagCount = !isNumber(maxTagCount) || maxTagCount >= idx + 1;
      const item = renderTagItem(checkedKey, idx, strings.IS_KEY);
      if (notExceedMaxTagCount) {
        displayTag.push(item);
      } else {
        hiddenTag.push(item);
      }
    });
    return (
      <>
        {displayTag}
        {!isEmpty(hiddenTag) && renderPlusN(hiddenTag)}
      </>
    );
  };

  const renderDisplayText = (): JSX.Element[] | VNode | string | VNode[] => {
    const { displayProp, separator, displayRender } = props;
    const { selectedKeys } = state;
    let displayText: JSX.Element[] | string | VNode = '';
    if (selectedKeys.size) {
      const displayPath = foundation.getItemPropPath([...selectedKeys][0], displayProp);
      if (displayRender && typeof displayRender === 'function') {
        displayText = displayRender(displayPath);
      } else {
        displayText = displayPath.map((path: VNode | string, index: number) => (
          <Fragment key={`${path}-${index}`}>
            {index < displayPath.length - 1 ? (
              <>
                {path}
                {separator}
              </>
            ) : (
              path
            )}
          </Fragment>
        ));
      }
    }
    return displayText;
  };

  const renderSelectContent = () => {
    const { placeholder, filterTreeNode, multiple } = props;
    const { checkedKeys } = state;
    const searchable = Boolean(filterTreeNode);
    if (!searchable) {
      if (multiple) {
        if (isEmpty(checkedKeys)) {
          return <span class={`${prefixcls}-selection-placeholder`}>{placeholder}</span>;
        }
        return renderMultipleTags();
      } else {
        const displayText = renderDisplayText();
        const spanCls = cls({
          [`${prefixcls}-selection-placeholder`]: !displayText,
        });
        return <span class={spanCls}>{displayText ? displayText : placeholder}</span>;
      }
    }
    const input = multiple ? renderTagInput() : renderInput();
    return input;
  };

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
    const { prefix, insetLabel, insetLabelId } = props;
    const labelNode: any = prefix || insetLabel;

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

  const renderCustomTrigger = () => {
    const { disabled, triggerRender, multiple } = props;
    const { selectedKeys, inputValue, inputPlaceHolder, resolvedCheckedKeys, checkedKeys } = state;
    let realValue;
    if (multiple) {
      if (mergeType === strings.NONE_MERGE_TYPE) {
        realValue = checkedKeys;
      } else {
        realValue = resolvedCheckedKeys;
      }
    } else {
      realValue = [...selectedKeys][0];
    }
    return (
      <Trigger
        value={realValue}
        inputValue={inputValue}
        onChange={handleInputChange}
        onClear={handleClear}
        placeholder={inputPlaceHolder}
        disabled={disabled}
        triggerRender={triggerRender}
        componentName={'Cascader'}
        componentProps={{ ...props }}
        onSearch={handleInputChange}
        onRemove={handleRemoveByKey}
      />
    );
  };

  const handleMouseOver = () => {
    foundation.toggleHoverState(true);
  };

  const handleMouseLeave = () => {
    foundation.toggleHoverState(false);
  };

  const handleClear = (e: MouseEvent) => {
    e && e.stopPropagation();
    foundation.handleClear();
  };

  /**
   * A11y: simulate clear button click
   */
  const handleClearEnterPress = (e: KeyboardEvent) => {
    e && e.stopPropagation();
    foundation.handleClearEnterPress(e);
  };

  const showClearBtn = () => {
    const { showClear, disabled, multiple } = props;
    const { selectedKeys, isOpen, isHovering, checkedKeys } = state;
    const hasValue = selectedKeys.size;
    const multipleWithHaveValue = multiple && checkedKeys.size;
    return showClear && (hasValue || multipleWithHaveValue) && !disabled && (isOpen || isHovering);
  };

  const renderClearBtn = () => {
    const clearCls = cls(`${prefixcls}-clearbtn`);
    const allowClear = showClearBtn();
    if (allowClear) {
      return (
        <div class={clearCls} onClick={handleClear} onKeypress={handleClearEnterPress} role="button" tabindex={0}>
          <IconClear />
        </div>
      );
    }
    return null;
  };

  const renderArrow = () => {
    const { arrowIcon } = props;
    const showClearBtn_ = showClearBtn();
    if (showClearBtn_) {
      return null;
    }
    return arrowIcon ? (
      <div class={cls(`${prefixcls}-arrow`)} x-semi-prop="arrowIcon">
        {arrowIcon}
      </div>
    ) : null;
  };

  const renderSelection = () => {
    const {
      disabled,
      multiple,
      filterTreeNode,
      style,
      size,
      className,
      validateStatus,
      prefix,
      suffix,
      insetLabel,
      triggerRender,
      showClear,
      id,
      borderless,
    } = props;
    const { isOpen, isFocus, isInput, checkedKeys } = state;
    const filterable = Boolean(filterTreeNode);
    const useCustomTrigger = typeof triggerRender === 'function';
    const classNames = useCustomTrigger
      ? cls(className)
      : cls(prefixcls, className, {
          [`${prefixcls}-borderless`]: borderless,
          [`${prefixcls}-focus`]: isFocus || (isOpen && !isInput),
          [`${prefixcls}-disabled`]: disabled,
          [`${prefixcls}-single`]: true,
          [`${prefixcls}-filterable`]: filterable,
          [`${prefixcls}-error`]: validateStatus === 'error',
          [`${prefixcls}-warning`]: validateStatus === 'warning',
          [`${prefixcls}-small`]: size === 'small',
          [`${prefixcls}-large`]: size === 'large',
          [`${prefixcls}-with-prefix`]: prefix || insetLabel,
          [`${prefixcls}-with-suffix`]: suffix,
        });
    const mouseEvent = showClear
      ? {
          onMouseEnter: () => handleMouseOver(),
          onMouseLeave: () => handleMouseLeave(),
        }
      : {};
    const sectionCls = cls(`${prefixcls}-selection`, {
      [`${prefixcls}-selection-multiple`]: multiple && !isEmpty(checkedKeys),
    });
    const inner = useCustomTrigger
      ? renderCustomTrigger()
      : [
          <Fragment key={'prefix'}>{prefix || insetLabel ? renderPrefix() : null}</Fragment>,
          <Fragment key={'selection'}>
            <div class={sectionCls}>{renderSelectContent()}</div>
          </Fragment>,
          <Fragment key={'clearbtn'}>{renderClearBtn()}</Fragment>,
          <Fragment key={'suffix'}>{suffix ? renderSuffix() : null}</Fragment>,
          <Fragment key={'arrow'}>{renderArrow()}</Fragment>,
        ];
    /**
     * Reasons for disabling the a11y eslint rule:
     * The following attributes(aria-controls,aria-expanded) will be automatically added by Tooltip, no need to declare here
     */
    return (
      <div
        class={classNames}
        style={style}
        ref={triggerRef}
        onClick={(e) => foundation.handleClick(e)}
        onKeypress={(e) => foundation.handleSelectionEnterPress(e)}
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={props['aria-describedby']}
        aria-required={props['aria-required']}
        id={id}
        {...mouseEvent}
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="combobox"
        tabindex={0}
      >
        {inner}
      </div>
    );
  };

  return () => {
    const {
      zIndex,
      getPopupContainer,
      autoAdjustOverflow,
      stopPropagation,
      mouseLeaveDelay,
      mouseEnterDelay,
      position,
      motion,
    } = props;
    const { isOpen, rePosKey } = state;
    const { direction } = context.value;
    const content = renderContent();
    const selection = renderSelection();
    const pos = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    return (
      <Popover
        getPopupContainer={getPopupContainer}
        zIndex={zIndex}
        motion={motion}
        ref={optionsRef}
        content={content}
        visible={isOpen}
        trigger="custom"
        rePosKey={rePosKey}
        position={pos}
        autoAdjustOverflow={autoAdjustOverflow}
        stopPropagation={stopPropagation}
        mouseLeaveDelay={mouseLeaveDelay}
        mouseEnterDelay={mouseEnterDelay}
        afterClose={() => foundation.updateSearching(false)}
      >
        {selection}
      </Popover>
    );
  };
}, {
  props: vuePropsType
});


export default Index;
