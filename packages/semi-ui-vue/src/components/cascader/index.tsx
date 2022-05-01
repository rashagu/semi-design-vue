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
  watch
} from 'vue'
import cls from 'classnames';
import CascaderFoundation, {
  BasicCascaderData, BasicEntity,
  BasicValue,
  ShowNextType
} from '@douyinfe/semi-foundation/cascader/foundation';
import type {
  /* Corresponding to the state of react */
  BasicCascaderInnerData,
  /* Corresponding to the props of react */
  BasicCascaderProps,
  BasicTriggerRenderProps,
  BasicScrollPanelProps,
  CascaderAdapter,
  CascaderType
} from '@douyinfe/semi-foundation/cascader/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/cascader/constants';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import { isSet, isEqual, isString, isEmpty, isFunction, isNumber, noop, flatten } from 'lodash';
import '@douyinfe/semi-foundation/cascader/cascader.scss';
import { IconClear, IconChevronDown } from '@kousum/semi-icons-vue';
import { findKeysForValues, convertDataToEntities, calcMergeType } from '@douyinfe/semi-foundation/cascader/util';
import { calcCheckedKeys, normalizeKeyList, calcDisabledKeys } from '@douyinfe/semi-foundation/tree/treeUtil';
import BaseComponent, {useBaseComponent, ValidateStatus} from '../_base/BaseComponent';
import Input from '../input';
import Popover, { PopoverProps } from '../popover';
import Item, { CascaderData, Entities, Entity, Data } from './Item';
import Trigger from '../trigger';
import Tag from '../tag';
import TagInput, {TagInputProps} from '../tagInput';
import { Motion } from '../_base/base';
import { isSemiIcon } from '../_utils/index';
import {AriaAttributes} from "../AriaAttributes";

export type { CascaderType, ShowNextType } from '@douyinfe/semi-foundation/cascader/foundation';
export type { CascaderData, Entity, Data, CascaderItemProps } from './Item';

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
  motion?: Motion;
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
  triggerRender?: (props: TriggerRenderProps) => VNode | string;
  onListScroll?: (e: any, panel: ScrollPanelProps) => void;
  loadData?: (selectOptions: CascaderData[]) => Promise<void>;
  onLoad?: (newLoadedKeys: Set<string>, data: CascaderData) => void;
  onChange?: (value: Value) => void;
  onExceed?: (checkedItem: Entity[]) => void;
  displayRender?: (selected: Array<string> | Entity, idx?: number) => VNode | string;
  onBlur?: (e: MouseEvent) => void;
  onFocus?: (e: MouseEvent) => void;
  validateStatus?: ValidateStatus;
}

export interface CascaderState extends BasicCascaderInnerData {
  keyEntities: Entities;
  prevProps: CascaderProps;
  treeData?: Array<CascaderData>;
}

const prefixcls = cssClasses.PREFIX;
const resetkey = 0;


export const vuePropsType = {
  'aria-describedby': String,
  'aria-errormessage': String,
  'aria-invalid': String,
  'aria-labelledby': String,
  'aria-required': String,
  defaultValue: [Object,String,Number],
  dropdownStyle: [Object, String],
  emptyContent: [Object, String],
  children: [Object, String],
  // TODO 当type中包含Boolean时，默认值为false而不是undefined
  value: [Object,String,Number],
  prefix: [Object, String],
  suffix: [Object, String],
  id: [ String ],
  insetLabel: [Object, String],
  insetLabelId: [String],
  style: [Object, String],
  bottomSlot: [Object, String],
  topSlot: [Object, String],
  triggerRender: Function,
  loadData: Function,
  onLoad: Function,
  onChange: Function,
  displayRender: Function,
  onBlur: Function,
  onFocus: Function,

  leafOnly: {
    type: Boolean,
    default: false
  },
  arrowIcon: {
    type: Object,
    default: <IconChevronDown />
  },
  stopPropagation: {
    type: Boolean,
    default: true
  },
  motion: {
    type: [Object,Boolean,String,Number],
    default: true
  },
  defaultOpen: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number,
    default: popoverNumbers.DEFAULT_Z_INDEX
  },
  showClear: {
    type: Boolean,
    default: false
  },
  autoClearSearchValue: {
    type: Boolean,
    default: true
  },
  changeOnSelect: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disableStrictly: {
    type: Boolean,
    default: false
  },
  autoMergeValue: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  filterTreeNode: {
    type: Boolean,
    default: false
  },
  filterLeafOnly: {
    type: Boolean,
    default: true
  },
  showRestTagsPopover: {
    type: Boolean,
    default: false
  },
  restTagsPopoverProps: {
    type: Object,
    default: {}
  },
  separator: {
    type: String,
    default: '/'
  },
  size: {
    type: String,
    default: 'default'
  },
  treeNodeFilterProp: {
    type: String,
    default: 'label'
  },
  displayProp: {
    type: String,
    default: 'label'
  },
  treeData: {
    type: Array,
    default: []
  },
  showNext: {
    type: String,
    default: strings.SHOW_NEXT_BY_CLICK,
  },
  onExceed: {
    type: Function,
    default: noop
  },
  onClear: {
    type: Function,
    default: noop
  },
  onDropdownVisibleChange: {
    type: Function,
    default: noop
  },
  onListScroll: {
    type: Function,
    default: noop
  },
  enableLeafClick: {
    type: Boolean,
    default: false
  },
  placeholder: String,
  'aria-label': {
    type: String,
    default: 'Cascader'
  },

  mouseEnterDelay: Number,
  mouseLeaveDelay: Number,
  dropdownClassName: String,
  searchPlaceholder: String,
  className: String,
  maxTagCount: Number,
  max: Number,
  autoAdjustOverflow: Boolean,
  onChangeWithObject: Boolean,
  getPopupContainer: Function,
  onSearch: Function,
  onSelect: Function,
}
const Index = defineComponent<CascaderProps>((props, {}) => {
  const slots = useSlots()

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
  const {cache, adapter: adapterInject, log, context} = useBaseComponent<CascaderProps>(props, state)

  const foundation = new CascaderFoundation(adapter());
  function adapter(): CascaderAdapter {
    const filterAdapter: Pick<CascaderAdapter, 'updateInputValue' | 'updateInputPlaceHolder' | 'focusInput'> = {
      updateInputValue: value => {
        state.inputValue = value
      },
      updateInputPlaceHolder: value => {
        state.inputPlaceHolder = value
      },
      focusInput: () => {
        if (inputRef.value) {
          // TODO: check the reason
          (inputRef.value as any).focus();
        }
      },
    };
    const cascaderAdapter: Pick<CascaderAdapter,
      'registerClickOutsideHandler'
      | 'unregisterClickOutsideHandler'
      | 'rePositionDropdown'
      > = {
      registerClickOutsideHandler: cb => {
        const clickOutsideHandler_ = (e: Event) => {
          const optionInstance = optionsRef.value;
          const triggerDom = triggerRef.value;
          const optionsDom = optionInstance.content.el;
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
        state.rePosKey = rePosKey
      },
    };
    return {
      ...adapterInject<CascaderProps, CascaderState>(),
      ...filterAdapter,
      ...cascaderAdapter,
      updateStates: states => {
        for (let key in states){
          state[key] = states[key]
        }
      },
      openMenu: () => {
        state.isOpen = true
      },
      closeMenu: cb => {
        state.isOpen = false
        cb && cb()
      },
      updateSelection: selectedKeys => {
        state.selectedKeys = selectedKeys
      },
      notifyChange: value => {
        props.onChange && props.onChange(value);
      },
      notifySelect: selected => {
        props.onSelect && props.onSelect(selected);
      },
      notifyOnSearch: input => {
        props.onSearch && props.onSearch(input);
      },
      notifyFocus: (...v) => {
        props.onFocus && props.onFocus(...v);
      },
      notifyBlur: (...v) => {
        props.onBlur && props.onBlur(...v);
      },
      notifyDropdownVisibleChange: visible => {
        props.onDropdownVisibleChange(visible);
      },
      toggleHovering: bool => {
        state.isHovering = bool
      },
      notifyLoadData: (selectedOpt, callback) => {
        const { loadData } = props;
        if (loadData) {
          new Promise<void>(resolve => {
            loadData(selectedOpt).then(() => {
              callback();
              state.loading = true
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
      notifyOnExceed: data => props.onExceed(data),
      notifyClear: () => props.onClear(),
    };
  }

  function getDerivedStateFromProps(props: CascaderProps, prevState: CascaderState) {
    const {
      multiple,
      value,
      defaultValue,
      onChangeWithObject,
      leafOnly,
      autoMergeValue,
    } = props;
    const { prevProps } = prevState;
    let keyEntities = prevState.keyEntities || {};
    const newState: Partial<CascaderState> = { };
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
        let realKeys: Array<string> | Set<string> = prevState.checkedKeys;
        // when data was updated
        if (needUpdateValue) {
          // normallizedValue is used to save the value in two-dimensional array format
          let normallizedValue: SimpleValueType[][] = [];
          const realValue = needUpdate('value') ? value : defaultValue;
          // eslint-disable-next-line max-depth
          if (Array.isArray(realValue)) {
            normallizedValue = Array.isArray(realValue[0]) ?
              realValue as SimpleValueType[][] :
              [realValue] as SimpleValueType[][];
          } else {
            normallizedValue = [[realValue]];
          }
          // formatValuePath is used to save value of valuePath
          const formatValuePath: (string | number)[][] = [];
          normallizedValue.forEach((valueItem: SimpleValueType[]) => {
            const formatItem: (string | number)[] = onChangeWithObject ?
              (valueItem as CascaderData[]).map(i => i.value) :
              valueItem as (string | number)[];
            formatValuePath.push(formatItem);
          });
          // formatKeys is used to save key of value
          const formatKeys: any[] = [];
          formatValuePath.forEach(v => {
            const formatKeyItem = findKeysForValues(v, keyEntities);
            !isEmpty(formatKeyItem) && formatKeys.push(formatKeyItem);
          });
          realKeys = formatKeys;
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

  onMounted(()=>{
    foundation.init();
  })


  onUnmounted(()=>{
    foundation.destroy();
  })

  watch(()=>props.treeData,()=>{
    foundation.collectOptions();
  })

  watch(()=>props.value,()=>{
    foundation.handleValueChange(props.value);
  })

  const handleInputChange = (value: string) => {
    foundation.handleInputChange(value);
  };

  const handleTagRemove = (e: any, tagValuePath: Array<string | number>) => {
    foundation.handleTagRemove(e, tagValuePath as string[]);
  };

  const renderTagItem = (value: string | Array<string>, idx: number, type: string) => {
    const { keyEntities, disabledKeys } = state;
    const { size, disabled, displayProp, displayRender, disableStrictly } = props;
    const nodeKey = type === strings.IS_VALUE ?
      findKeysForValues(value, keyEntities)[0] :
      value;
    const isDsiabled = disabled ||
      keyEntities[nodeKey].data.disabled ||
      (disableStrictly && disabledKeys.has(nodeKey));
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
            {displayProp === 'label' && keyEntities[nodeKey].data.label}
            {displayProp === 'value' && keyEntities[nodeKey].data.value}
          </Tag>
        );
      }
    }
    return null;
  };

  function renderTagInput() {
    const {
      size,
      disabled,
      placeholder,
      maxTagCount,
      showRestTagsPopover,
      restTagsPopoverProps,
    } = props;
    const {
      inputValue,
      checkedKeys,
      keyEntities,
      resolvedCheckedKeys
    } = state;
    const tagInputcls = cls(`${prefixcls}-tagInput-wrapper`);
    const tagValue: Array<Array<string>> = [];
    const realKeys = mergeType === strings.NONE_MERGE_TYPE
      ? checkedKeys
      : resolvedCheckedKeys;
    [...realKeys].forEach(checkedKey => {
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
        onRemove={v => handleTagRemove(null, v as unknown as (string | number)[])}
        placeholder={placeholder}
      />
    );
  }

  function renderInput() {
    const { size, disabled } = props;
    const inputcls = cls(`${prefixcls}-input`);
    const { inputValue, inputPlaceHolder } = state;
    const inputProps = {
      disabled,
      value: inputValue,
      className: inputcls,
      onChange: handleInputChange,
      placeholder: inputPlaceHolder,
    };
    const wrappercls = cls({
      [`${prefixcls}-search-wrapper`]: true,
    });
    return (
      <div class={wrappercls}>
        <Input
          ref={inputRef as any}
          size={size}
          {...inputProps}
        />
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

  const renderContent = () => {
    const {
      inputValue,
      isSearching,
      activeKeys,
      selectedKeys,
      checkedKeys,
      halfCheckedKeys,
      loadedKeys,
      loadingKeys
    } = state;
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
      multiple
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
        />
        {bottomSlot}
      </div>
    );
    return content;
  };

  const renderPlusN = (hiddenTag: Array<VNode | string>) => {
    const { disabled, showRestTagsPopover, restTagsPopoverProps } = props;
    const plusNCls = cls(`${prefixcls}-selection-n`, {
      [`${prefixcls}-selection-n-disabled`]: disabled
    });
    const renderPlusNChildren = (
      <span class={plusNCls}>
                +{hiddenTag.length}
            </span>
    );
    return (
      showRestTagsPopover && !disabled ?
        (
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
        ) :
        renderPlusNChildren
    );
  };

  const renderMultipleTags = () => {
    const { autoMergeValue, maxTagCount } = props;
    const { checkedKeys, resolvedCheckedKeys } = state;
    const realKeys = mergeType === strings.NONE_MERGE_TYPE
      ? checkedKeys
      : resolvedCheckedKeys;
    const displayTag: Array<VNode |string> = [];
    const hiddenTag: Array<VNode |string> = [];
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

  const renderDisplayText = (): JSX.Element[] | VNode |string | VNode[] => {
    const { displayProp, separator, displayRender } = props;
    const { selectedKeys } = state;
    let displayText: JSX.Element[] | string | VNode = '';
    if (selectedKeys.size) {
      const displayPath = foundation.getItemPropPath([...selectedKeys][0], displayProp);
      if (displayRender && typeof displayRender === 'function') {
        displayText = displayRender(displayPath);
      } else {
        displayText = displayPath.map((path: VNode |string, index: number)=>(
          <Fragment key={`${path}-${index}`}>
            {
              index<displayPath.length-1
                ? <>{path}{separator}</>
                : path
            }
          </Fragment>
        ));
      }
    }
    return displayText;
  }

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
    return <div class={suffixWrapperCls}>{suffix}</div>;
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

    return <div class={prefixWrapperCls} id={insetLabelId}>{labelNode}</div>;
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
  const  handleClearEnterPress = (e: KeyboardEvent) => {
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
        <div
          class={clearCls}
          onClick={handleClear}
          onKeypress={handleClearEnterPress}
          role='button'
          tabindex={0}
        >
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
    return arrowIcon ? <div class={cls(`${prefixcls}-arrow`)}>{arrowIcon}</div> : null;
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
    } = props;
    const { isOpen, isFocus, isInput, checkedKeys } = state;
    const filterable = Boolean(filterTreeNode);
    const useCustomTrigger = typeof triggerRender === 'function';
    const classNames = useCustomTrigger ?
      cls(className) :
      cls(prefixcls, className, {
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
    const mouseEvent = showClear ?
      {
        onMouseEnter: () => handleMouseOver(),
        onMouseLeave: () => handleMouseLeave(),
      } :
      {};
    const sectionCls = cls(`${prefixcls}-selection`, {
      [`${prefixcls}-selection-multiple`]: multiple && !isEmpty(checkedKeys),
    });
    const inner = useCustomTrigger ?
      renderCustomTrigger() :
      [
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
        onClick={e => foundation.handleClick(e)}
        onKeypress={e => foundation.handleSelectionEnterPress(e)}
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={props["aria-describedby"]}
        aria-required={props['aria-required']}
        id={id}
        {...mouseEvent}
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role='combobox'
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
    } = props;
    const { isOpen, rePosKey } = state;
    const { direction } = context;
    const content = renderContent();
    const selection = renderSelection();
    const pos = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    const mergedMotion: Motion = foundation.getMergedMotion();
    return (
      <Popover
        getPopupContainer={getPopupContainer}
        zIndex={zIndex}
        motion={mergedMotion}
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
      >
        {selection}
      </Popover>
    );
  }
})

Index.props = vuePropsType

export default Index

