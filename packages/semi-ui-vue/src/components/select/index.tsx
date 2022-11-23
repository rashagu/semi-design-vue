import {
  defineComponent,
  ref,
  h,
  Fragment,
  VNode,
  CSSProperties,
  reactive,
  onMounted,
  onUnmounted,
  watch,
  getCurrentInstance, Component, ComponentPublicInstance, nextTick, useSlots
} from 'vue'
import * as PropTypes from '../PropTypes'
import {FixedSizeList as List} from '@kousum/vue3-window'
import cls from 'classnames';
import SelectFoundation, {SelectAdapter} from '@douyinfe/semi-foundation/select/foundation';
import {cssClasses, strings, numbers} from '@douyinfe/semi-foundation/select/constants';
import {useBaseComponent, ValidateStatus} from '../_base/baseComponent';
import {isEqual, isString, noop, get, isNumber} from 'lodash';
import Tag from '../tag';
import TagGroup from '../tag/group';
import LocaleConsumer_ from '../locale/localeConsumer';
import Popover from '../popover';
import {numbers as popoverNumbers} from '@douyinfe/semi-foundation/popover/constants';
import {getOptionsFromGroup} from './utils';
import VirtualRow from './virtualRow';

import Input, {InputProps, InputState} from '../input';
import Option from './option';
import type {OptionProps} from './option';
import OptionGroup from './optionGroup';
import Spin from '../spin';
import Trigger from '../trigger';
import {IconChevronDown, IconClear} from '@kousum/semi-icons-vue';
import { isSemiIcon, getFocusableElements, getActiveElement } from '../_utils';
import {Subtract} from 'utility-types';

import warning from '@douyinfe/semi-foundation/utils/warning';
import { getUuidShort } from '@douyinfe/semi-foundation/utils/uuid';

import '@douyinfe/semi-foundation/select/select.scss';
import {Locale} from '../locale/interface';
import type {Position} from '@douyinfe/semi-foundation/tooltip/foundation';
import type {TooltipProps} from '../tooltip';
import {AriaAttributes} from "../AriaAttributes";
import {vuePropsMake} from "../PropTypes";

export type {OptionGroupProps} from './optionGroup';
export type {VirtualRowProps} from './virtualRow';

const prefixcls = cssClasses.PREFIX;
const LocaleConsumer = LocaleConsumer_<Locale['Select']>()
const key = 0;

type ExcludeInputType = {
  value?: InputProps['value'];
  onFocus?: InputProps['onFocus'];
  onChange?: InputProps['onChange'];
}

type OnChangeValueType = string | number | Record<string, any>;

export interface optionRenderProps {
  key?: any;
  label?: string | VNode | VNode[] | number;
  value?: string | number;
  style?: CSSProperties;
  className?: string;
  selected?: boolean;
  focused?: boolean;
  show?: boolean;
  disabled?: boolean;
  onMouseEnter?: (e: MouseEvent) => any;
  onClick?: (e: MouseEvent) => any;

  [x: string]: any;
}

export interface selectMethod {
  clearInput?: () => void;
  selectAll?: () => void;
  deselectAll?: () => void;
  focus?: () => void;
  close?: () => void;
  open?: () => void;
}

export type SelectSize = 'small' | 'large' | 'default';

export interface virtualListProps {
  itemSize?: number;
  height?: number;
  width?: string | number;
}

export type RenderSingleSelectedItemFn = (optionNode: Record<string, any>) => VNode;
export type RenderMultipleSelectedItemFn = (optionNode: Record<string, any>, multipleProps: { index: number; disabled: boolean; onClose: (tagContent: VNode, e: MouseEvent) => void }) => { isRenderInTag: boolean; content: VNode };

export type RenderSelectedItemFn = RenderSingleSelectedItemFn | RenderMultipleSelectedItemFn;

export type SelectProps = {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  id?: string;
  autoFocus?: boolean;
  autoClearSearchValue?: boolean;
  arrowIcon?: VNode;
  defaultValue?: string | number | any[] | Record<string, any>;
  value?: string | number | any[] | Record<string, any>;
  placeholder?: VNode | string;
  onChange?: (value: SelectProps['value']) => void;
  multiple?: boolean;
  filter?: boolean | ((inpueValue: string, option: OptionProps) => boolean);
  max?: number;
  maxTagCount?: number;
  maxHeight?: string | number;
  style?: CSSProperties;
  className?: string;
  size?: SelectSize;
  disabled?: boolean;
  emptyContent?: VNode;
  onDropdownVisibleChange?: (visible: boolean) => void;
  zIndex?: number;
  position?: Position;
  onSearch?: (value: string) => void;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  outerTopSlot?: VNode;
  innerTopSlot?: VNode;
  outerBottomSlot?: VNode;
  innerBottomSlot?: VNode;
  optionList?: OptionProps[];
  dropdownMatchSelectWidth?: boolean;
  loading?: boolean;
  defaultOpen?: boolean;
  validateStatus?: ValidateStatus;
  defaultActiveFirstOption?: boolean;
  onChangeWithObject?: boolean;
  suffix?: VNode | string;
  prefix?: VNode | string;
  insetLabel?: VNode | string;
  insetLabelId?: string;
  inputProps?: Subtract<InputProps, ExcludeInputType>;
  showClear?: boolean;
  showArrow?: boolean;
  renderSelectedItem?: RenderSelectedItemFn;
  renderCreateItem?: (inputValue: OptionProps['value'], focus: boolean) => VNode;
  renderOptionItem?: (props: optionRenderProps) => VNode;
  onMouseEnter?: (e: MouseEvent) => any;
  onMouseLeave?: (e: MouseEvent) => any;
  clickToHide?: boolean;
  onExceed?: (option: OptionProps) => void;
  onCreate?: (option: OptionProps) => void;
  remote?: boolean;
  onDeselect?: (value: SelectProps['value'], option: Record<string, any>) => void;
  onSelect?: (value: SelectProps['value'], option: Record<string, any>) => void;
  allowCreate?: boolean;
  triggerRender?: (props?: any) => VNode;
  onClear?: () => void;
  virtualize?: virtualListProps;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onListScroll?: (e: Event) => void;
  preventScroll?: boolean;
} & Pick<TooltipProps,
  | 'spacing'
  | 'getPopupContainer'
  | 'motion'
  | 'autoAdjustOverflow'
  | 'mouseLeaveDelay'
  | 'mouseEnterDelay'
  | 'stopPropagation'>;

export interface SelectState {
  isOpen: boolean;
  isFocus: boolean;
  options: Array<OptionProps>;
  selections: Map<OptionProps['label'], any>; // A collection of all currently selected items, k: label, v: {value,... otherProps}
  dropdownMinWidth: number;
  optionKey: number;
  inputValue: string;
  showInput: boolean;
  focusIndex: number;
  keyboardEventSet: any; // {}
  optionGroups: Array<any>;
  isHovering: boolean;
  isFocusInContainer: boolean;
}

// Notes: Use the label of the option as the identifier, that is, the option in Select, the value is allowed to be the same, but the label must be unique


const propTypes = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoClearSearchValue: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  placeholder: PropTypes.node,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  // Whether to turn on the input box filtering function, when it is a function, it represents a custom filtering function
  filter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  // How many tags can you choose?
  max: PropTypes.number,
  // How many tabs are displayed at most, and the rest are displayed in + N
  maxTagCount: PropTypes.number,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  size: String,
  disabled: PropTypes.bool,
  emptyContent: PropTypes.node,
  onDropdownVisibleChange: PropTypes.func,
  zIndex: PropTypes.number,
  position: String,
  onSearch: PropTypes.func,
  getPopupContainer: PropTypes.func,
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.object,
  outerTopSlot: PropTypes.node,
  innerTopSlot: PropTypes.node,
  inputProps: PropTypes.object,
  outerBottomSlot: PropTypes.node,
  innerBottomSlot: PropTypes.node, // Options slot
  optionList: PropTypes.array,
  dropdownMatchSelectWidth: PropTypes.bool,
  loading: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  validateStatus: String,
  defaultActiveFirstOption: PropTypes.bool,
  triggerRender: PropTypes.func,
  stopPropagation: PropTypes.bool,
  // motion doesn't need to be exposed
  motion: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]),

  onChangeWithObject: PropTypes.bool,

  suffix: PropTypes.node,
  prefix: PropTypes.node,
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  showClear: PropTypes.bool,
  showArrow: PropTypes.bool,

  renderSelectedItem: PropTypes.func,

  allowCreate: PropTypes.bool,
  renderCreateItem: PropTypes.func,

  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  clickToHide: PropTypes.bool,
  onExceed: PropTypes.func,
  onCreate: PropTypes.func,
  remote: PropTypes.bool,
  onDeselect: PropTypes.func,
  // The main difference between onSelect and onChange is that when multiple selections are selected, onChange contains all options, while onSelect only contains items for the current operation
  onSelect: PropTypes.func,
  autoAdjustOverflow: PropTypes.bool,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  spacing: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClear: PropTypes.func,

  virtualize: PropTypes.object,
  renderOptionItem: PropTypes.func,
  onListScroll: PropTypes.func,
  arrowIcon: PropTypes.node,
  preventScroll: PropTypes.bool,
  // open: PropTypes.bool,
  // tagClosable: PropTypes.bool,

  id: String,



};

const defaultProps: Partial<SelectProps> = {

  stopPropagation: true,
  motion: true,
  zIndex: popoverNumbers.DEFAULT_Z_INDEX,
  // position: 'bottomLeft',
  filter: false,
  multiple: false,
  disabled: false,
  defaultOpen: false,
  allowCreate: false,
  placeholder: '',
  onDropdownVisibleChange: noop,
  onChangeWithObject: false,
  onChange: noop,
  onSearch: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onDeselect: noop,
  onSelect: noop,
  onCreate: noop,
  onExceed: noop,
  onFocus: noop,
  onBlur: noop,
  onClear: noop,
  onListScroll: noop,
  maxHeight: numbers.LIST_HEIGHT,
  dropdownMatchSelectWidth: true,
  defaultActiveFirstOption: true, // In order to meet the needs of A11y, change to true
  showArrow: true,
  showClear: false,
  remote: false,
  autoAdjustOverflow: true,
  autoClearSearchValue: true,
  arrowIcon: <IconChevronDown aria-label='' />,

  // Radio selection is different from the default renderSelectedItem for multiple selection, so it is not declared here
  // renderSelectedItem: (optionNode) => optionNode.label,
  // The default creator rendering is related to i18, so it is not declared here
  // renderCreateItem: (input) => input
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Index = defineComponent<SelectProps>((props, {}) => {
  const slots = useSlots()

  const state = reactive({
    isOpen: false,
    isFocus: false,
    options: [], // All options
    selections: new Map(), // A collection of all currently selected items, k: label, v: {value,... otherProps}
    dropdownMinWidth: null,
    optionKey: key,
    inputValue: '',
    showInput: false,
    focusIndex: props.defaultActiveFirstOption ? 0 : -1,
    keyboardEventSet: {},
    optionGroups: [],
    isHovering: false,
    isFocusInContainer: false,
  })
  let selectOptionListID = '';
  let selectID = '';
  let virtualizeListRef = ref()
  let inputRef = ref()
  let triggerRef = ref()
  let optionsRef = ref<InstanceType<typeof Popover> | null>()
  const optionContainerEl = ref()
  let clickOutsideHandler: (e: MouseEvent) => void;
  let foundation: SelectFoundation;
  /* Generate random string */
  clickOutsideHandler = null;
  warning(
    'optionLabelProp' in props,
    '[Semi Select] \'optionLabelProp\' has already been deprecated, please use \'renderSelectedItem\' instead.'
  );

  warning(
    'labelInValue' in props,
    '[Semi Select] \'labelInValue\' has already been deprecated, please use \'onChangeWithObject\' instead.'
  );

  // TODO context
  const {adapter: adapterInject, context: context_} = useBaseComponent<SelectProps>(props, state)
  const setOptionContainerEl = (node: HTMLDivElement) => (optionContainerEl.value = node);

  function adapter(): SelectAdapter<SelectProps, SelectState> {
    const keyboardAdapter = {
      registerKeyDown: (cb: () => void) => {
        const keyboardEventSet = {
          onKeyDown: cb,
        };
        state.keyboardEventSet = keyboardEventSet
      },
      unregisterKeyDown: () => {
        state.keyboardEventSet = {}
      },
      updateFocusIndex: (focusIndex: number) => {
        state.focusIndex = focusIndex
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      scrollToFocusOption: () => {
      },
    };

    const filterAdapter = {
      updateInputValue: (value: string) => {
        state.inputValue = value
      },
      toggleInputShow: (showInput: boolean, cb: (...args: any) => void) => {
        state.showInput = showInput
        nextTick(()=>{
          cb?.()
        })
      },
      focusInput: () => {
        if (inputRef.value && inputRef.value.$el) {
          inputRef.value.$el.children[0].focus();
        }
      },
    };
    const multipleAdapter = {
      notifyMaxLimit: (option: OptionProps) => props.onExceed(option),
      getMaxLimit: () => props.max,
      registerClickOutsideHandler: (cb: (e: MouseEvent) => void) => {
        const clickOutsideHandler_: (e: MouseEvent) => void = e => {
          // @ts-ignore TODO 比较重要的不同点 关于获取组建dom的
          const optionInstance = optionsRef.value && optionsRef.value?.content?.el;
          const triggerDom = (triggerRef.value) as Element;
          // eslint-disable-next-line react/no-find-dom-node
          const optionsDom = optionInstance;
          // let isInPanel = optionsDom && optionsDom.contains(e.target);
          // let isInTrigger = triggerDom && triggerDom.contains(e.target);
          if (optionsDom && !optionsDom.contains(e.target as Node) &&
            triggerDom && !triggerDom.contains(e.target as Node)) {
            cb(e);
          }
        };
        clickOutsideHandler = clickOutsideHandler_;
        document.addEventListener('mousedown', clickOutsideHandler_ as any, false);
      },
      unregisterClickOutsideHandler: () => {
        if (clickOutsideHandler) {
          document.removeEventListener('mousedown', clickOutsideHandler as any, false);
          clickOutsideHandler = null;
        }
      },
      rePositionDropdown: () => {
        let {optionKey} = state;
        optionKey = optionKey + 1;
        state.optionKey = optionKey
      },
      notifyDeselect: (value: OptionProps['value'], option: OptionProps) => {
        delete option._parentGroup;
        props.onDeselect(value, option);
      },
    };
    return {
      ...adapterInject<SelectProps, SelectState>(),
      ...keyboardAdapter,
      ...filterAdapter,
      ...multipleAdapter,
      // Collect all subitems, each item is visible by default when collected, and is not selected
      //slots.default?slots.default():null
      getOptionsFromChildren: (children = slots.default?.()) => {
        // if (!children) {
        //   // @ts-ignore
        //   // children = getCurrentInstance()?.vnode?.children?.default ? getCurrentInstance().vnode.children.default() : null
        //   if (children && Array.isArray(children[0])){
        //     children = children[0]
        //   }
        // }
        let optionGroups = [];
        let options = [];
        const {optionList} = props;
        if (optionList && optionList.length) {
          options = optionList.map((itemOpt, index) => ({
            _show: true,
            _selected: false,
            _scrollIndex: index,
            ...itemOpt
          }));
          optionGroups[0] = {children: options, label: ''};
        } else {
          const result = getOptionsFromGroup(children);
          optionGroups = result.optionGroups;
          options = result.options;
        }
        state.optionGroups = optionGroups
        return options;
      },
      updateOptions: (options: OptionProps[]) => {
        state.options = options
      },
      openMenu: () => {
        state.isOpen = true
      },
      closeMenu: () => {
        state.isOpen = false
      },
      getTriggerWidth: () => {
        const el = triggerRef.value;
        return el && el.getBoundingClientRect().width;
      },
      setOptionWrapperWidth: (width: number) => {
        console.log(width)
        state.dropdownMinWidth = width
      },
      updateSelection: (selections: Map<OptionProps['label'], any>) => {
        // TODO 直接赋值会有问题
        setTimeout(()=>{
          state.selections = selections
        })
      },
      // clone Map, important!!!, prevent unexpected modify on state
      getSelections: () => new Map(state.selections),

      notifyChange: (value: OnChangeValueType | OnChangeValueType[]) => {
        console.log(props)
        props.onChange(value);
      },
      notifySelect: (value: OptionProps['value'], option: OptionProps) => {
        delete option._parentGroup;
        props.onSelect(value, option);
      },
      notifyDropdownVisibleChange: (visible: boolean) => {
        props.onDropdownVisibleChange(visible);
      },
      notifySearch: (input: string) => {
        props.onSearch(input);
      },
      notifyCreate: (input: OptionProps) => {
        props.onCreate(input);
      },
      notifyMouseEnter: (e: MouseEvent) => {
        props.onMouseEnter(e);
      },
      notifyMouseLeave: (e: MouseEvent) => {
        props.onMouseLeave(e);
      },
      notifyFocus: (event: FocusEvent) => {
        props.onFocus(event);
      },
      notifyBlur: (event: FocusEvent) => {
        props.onBlur(event);
      },
      notifyClear: () => {
        props.onClear();
      },
      notifyListScroll: (e: any) => {
        props.onListScroll(e);
      },
      updateHovering: (isHovering: boolean) => {
        state.isHovering = isHovering
      },
      updateFocusState: (isFocus: boolean) => {
        state.isFocus = isFocus;
      },
      focusTrigger: () => {
        try {
          const el = (triggerRef.value) as any;
          el.focus();
        } catch (error) {

        }
      },
      getContainer: () => {
        return optionContainerEl.value;
      },
      getFocusableElements: (node: HTMLDivElement) => {
        return getFocusableElements(node);
      },
      getActiveElement: () => {
        return getActiveElement();
      },
      setIsFocusInContainer: (isFocusInContainer: boolean) => {
        state.isFocusInContainer = isFocusInContainer
      },
      getIsFocusInContainer: () => {
        return state.isFocusInContainer;
      },
      updateScrollTop: (index?: number) => {
        // eslint-disable-next-line max-len
        let optionClassName = `.${prefixcls}-option-selected`;
        if (index !== undefined) {
          optionClassName = `.${prefixcls}-option:nth-child(${index})`;
        }
        let destNode = document.querySelector(`#${prefixcls}-${selectOptionListID} ${optionClassName}`) as HTMLDivElement;
        if (Array.isArray(destNode)) {
          // eslint-disable-next-line prefer-destructuring
          destNode = destNode[0];
        }
        if (destNode) {
          /**
           * Scroll the first selected item into view.
           * The reason why ScrollIntoView is not used here is that it may cause page to move.
           */
          const destParent = destNode.parentNode as HTMLDivElement;
          destParent.scrollTop = destNode.offsetTop -
            destParent.offsetTop -
            (destParent.clientHeight / 2) +
            (destNode.clientHeight / 2);
        }
      },
    };
  }

  const theAdapter = adapter()
  foundation = new SelectFoundation(theAdapter);

  onMounted(() => {
    foundation.init();
    selectOptionListID = getUuidShort();
    selectID = props.id || getUuidShort();
  })

  onUnmounted(() => {
    foundation.destroy();
  })
  watch(()=>slots.default, ()=>{
    console.log(slots.default)
  })

  watch([() => props.value, () => props.optionList], ([prevPropsValue, prevPropsOptionList],) => {
    const instance = getCurrentInstance()
    // TODO Children VNode 更新时
    // const prevChildrenKeys = React.Children.toArray(prevProps.children).map((child: any) => child.key);
    // const nowChildrenKeys = React.Children.toArray(props.children).map((child: any) => child.key);
    const prevChildrenKeys = [];
    const nowChildrenKeys = [];

    let isOptionsChanged = false;

    if (!isEqual(prevChildrenKeys, nowChildrenKeys) || !isEqual(prevPropsOptionList, props.optionList)) {
      isOptionsChanged = true;
      foundation.handleOptionListChange();
    }

    // Add isOptionChanged: There may be cases where the value is unchanged, but the optionList is updated. At this time, the label corresponding to the value may change, and the selected item needs to be updated
    if (prevPropsValue !== props.value || isOptionsChanged) {
      if ('value' in props) {
        foundation.handleValueChange(props.value as any);
      } else {
        foundation.handleOptionListChangeHadDefaultValue();
      }
    }
  })


  const handleInputChange = (e: Event) => {
    // @ts-ignore
    foundation.handleInputChange(e.target.value)
  };

  function renderInput() {
    const {size, multiple, disabled, inputProps} = props;
    const inputPropsCls = get(inputProps, 'className');
    const inputcls = cls(`${prefixcls}-input`, {
      [`${prefixcls}-input-single`]: !multiple,
      [`${prefixcls}-input-multiple`]: multiple,
    }, inputPropsCls);
    const {inputValue} = state;

    const selectInputProps: Record<string, any> = {
      value: inputValue,
      disabled,
      className: inputcls,
      onInput: handleInputChange,
      ...inputProps,
    };

    let style = {};
    // Multiple choice mode
    if (multiple) {
      style = {
        width: inputValue ? `${inputValue.length * 16}px` : '2px',
      };
      selectInputProps.style = style;
    }
    return (
      <Input
        ref={inputRef as any}
        size={size}
        onFocus={(e: FocusEvent) => {
          // prevent event bubbling which will fire trigger onFocus event
          e.stopPropagation();
          // e.nativeEvent.stopImmediatePropagation();
        }}
        {...selectInputProps}
      />
    );
  }

  function close() {
    foundation.close();
  }

  function open() {
    foundation.open();
  }

  function clearInput() {
    foundation.clearInput();
  }

  function selectAll() {
    foundation.selectAll();
  }

  function deselectAll() {
    foundation.clearSelected();
  }

  function focus() {
    foundation.focus();
  }

  function onSelect(option: OptionProps, optionIndex: number, e: any) {
    foundation.onSelect(option, optionIndex, e);
  }

  function onClear(e: MouseEvent) {
    e.stopImmediatePropagation();
    foundation.handleClearClick(e as any);
  }

  function onClearBtnEnterPress(e: KeyboardEvent) {
    foundation.handleClearBtnEnterPress(e as any);
  }

  function renderEmpty() {
    return <Option empty={true} emptyContent={props.emptyContent}/>;
  }

  function renderLoading() {
    const loadingWrapperCls = `${prefixcls}-loading-wrapper`;
    return (
      <div class={loadingWrapperCls}>
        <Spin/>
      </div>
    );
  }

  function renderOption(option: OptionProps, optionIndex: number, style?: CSSProperties) {
    const {focusIndex, inputValue} = state;
    const {renderOptionItem} = props;
    let optionContent;
    const isFocused = optionIndex === focusIndex;
    let optionStyle = style || {};
    if (option.style) {
      optionStyle = {...optionStyle, ...option.style};
    }
    if (option._inputCreateOnly) {
      optionContent = renderCreateOption(option, isFocused, optionIndex, style);
    } else {
      // use another name to make sure that 'key' in optionList still exist when we call onChange
      if ('key' in option) {
        option._keyInOptionList = option.key;
      }
      optionContent = (
        <Option
          showTick
          {...option}
          selected={option._selected}
          onSelect={(v: OptionProps, e: MouseEvent) => onSelect(v, optionIndex, e)}
          focused={isFocused}
          onMouseEnter={() => onOptionHover(optionIndex)}
          style={optionStyle}
          key={option.key || option.label as string + option.value as string + optionIndex}
          renderOptionItem={renderOptionItem}
          inputValue={inputValue}
        >
          {option.label}
        </Option>
      );
    }
    return optionContent;
  }

  function renderCreateOption(option: OptionProps, isFocused: boolean, optionIndex: number, style: CSSProperties) {
    const {renderCreateItem} = props;
    // default render method
    if (typeof renderCreateItem === 'undefined') {
      const defaultCreateItem = (
        <Option
          key={option.key || option.label as string + option.value as string}
          onSelect={(v: OptionProps, e: MouseEvent) => onSelect(v, optionIndex, e)}
          onMouseEnter={() => onOptionHover(optionIndex)}
          showTick
          {...option}
          focused={isFocused}
          style={style}
        >
          <LocaleConsumer componentName="Select">
            {(locale: Locale['Select']) => (
              <>
                <span class={`${prefixcls}-create-tips`}>{locale.createText}</span>
                {option.value}
              </>
            )}
          </LocaleConsumer>
        </Option>
      );
      return defaultCreateItem;
    }

    const customCreateItem = renderCreateItem(option.value, isFocused);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
      <div
        role="button"
        aria-label="Use the input box to create an optional item"
        onClick={e => onSelect(option, optionIndex, e)}
        key={option.key || option.label}
      >
        {customCreateItem}
      </div>
    );
  }

  function onOptionHover(optionIndex: number) {
    foundation.handleOptionMouseEnter(optionIndex);
  }

  function renderWithGroup(visibleOptions: OptionProps[]) {
    const content: JSX.Element[] = [];
    const groupStatus = new Map();

    visibleOptions.forEach((option, optionIndex) => {
      const parentGroup = option._parentGroup;
      const optionContent = renderOption(option, optionIndex);
      if (parentGroup && !groupStatus.has(parentGroup.label)) {
        // when use with OptionGroup and group content not already insert
        const groupContent = <OptionGroup {...parentGroup} key={parentGroup.label}/>;
        groupStatus.set(parentGroup.label, true);
        content.push(groupContent);
      }
      content.push(optionContent);
    });

    return content;
  }

  function renderVirtualizeList(visibleOptions: OptionProps[]) {
    const {virtualize} = props;
    const {direction} = context_.value;
    const {height, width, itemSize} = virtualize;

    return (
      <List
        ref={virtualizeListRef}
        height={height || numbers.LIST_HEIGHT}
        itemCount={visibleOptions.length}
        itemSize={itemSize}
        itemData={{visibleOptions, renderOption: renderOption}}
        width={width}
        style={{direction}}
      >
        {VirtualRow}
      </List>
    );
  }

  function renderOptions(children?: VNode[]) {
    const {dropdownMinWidth, options, selections} = state;
    const {
      maxHeight,
      dropdownClassName,
      dropdownStyle,
      outerTopSlot,
      innerTopSlot,
      outerBottomSlot,
      innerBottomSlot,
      loading,
      virtualize,
      multiple,
    } = props;


    // Do a filter first, instead of directly judging in forEach, so that the focusIndex can correspond to
    const visibleOptions = options.filter(item => item._show);
    let listContent: JSX.Element | JSX.Element[] = renderWithGroup(visibleOptions);
    if (virtualize) {
      listContent = renderVirtualizeList(visibleOptions);
    }

    const style = {minWidth: dropdownMinWidth, ...dropdownStyle};

    const optionListCls = cls({
      [`${prefixcls}-option-list`]: true,
      [`${prefixcls}-option-list-chosen`]: selections.size,
    });

    const isEmpty = !options.length || !options.some(item => item._show);
    return (
      <div id={`${prefixcls}-${selectOptionListID}`} class={dropdownClassName} style={style}>
        {outerTopSlot}
        <div
          style={{maxHeight: `${maxHeight}px`}}
          class={optionListCls}
          role="listbox"
          aria-multiselectable={multiple}
          onScroll={e => foundation.handleListScroll(e)}
        >
          {innerTopSlot}
          {!loading ? listContent : renderLoading()}
          {isEmpty && !loading ? renderEmpty() : null}
          {innerBottomSlot}
        </div>
        {outerBottomSlot}
      </div>
    );
  }

  function renderSingleSelection(selections: Map<OptionProps['label'], any>, filterable: boolean) {
    let {renderSelectedItem} = props;
    const {placeholder} = props;
    const {showInput, inputValue} = state;
    let renderText: any = '';

    const selectedItems = [...selections];

    if (typeof renderSelectedItem === 'undefined') {
      renderSelectedItem = ((optionNode: OptionProps) => optionNode.label) as RenderSelectedItemFn;
    }

    if (selectedItems.length) {
      const selectedItem = selectedItems[0][1];
      renderText = (renderSelectedItem as RenderSingleSelectedItemFn)(selectedItem);
    }

    const spanCls = cls({
      [`${prefixcls}-selection-text`]: true,
      [`${prefixcls}-selection-placeholder`]: !renderText && renderText !== 0,
      [`${prefixcls}-selection-text-hide`]: inputValue && showInput, // show Input
      [`${prefixcls}-selection-text-inactive`]: !inputValue && showInput, // Stack Input & RenderText(opacity 0.4)
    });

    const contentWrapperCls = `${prefixcls}-content-wrapper`;
    return (
      <div class={contentWrapperCls}>
        {<span class={spanCls}>{renderText || renderText === 0 ? renderText : placeholder}</span>}
        {filterable && showInput ? renderInput() : null}
      </div>
    );
  }

  function renderMultipleSelection(selections: Map<OptionProps['label'], any>, filterable: boolean) {
    let {renderSelectedItem} = props;
    const {placeholder, maxTagCount, size} = props;
    const {inputValue} = state;
    const selectDisabled = props.disabled;
    const renderTags = [];

    const selectedItems = [...selections];

    if (typeof renderSelectedItem === 'undefined') {
      renderSelectedItem = (optionNode) => ({
        isRenderInTag: true,
        content: optionNode.label,
      });
    }

    const mapItems = maxTagCount ? selectedItems.slice(0, maxTagCount) : selectedItems; // no need to render rest tag when maxTagCount is setting

    const tags = mapItems.map((item, i) => {
      const label = item[0];
      const {value} = item[1];
      const disabled = item[1].disabled || selectDisabled;
      const onClose = (tagContent: VNode, e: MouseEvent) => {
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault(); // make sure that tag will not hidden immediately in controlled mode
        }
        foundation.removeTag({label, value});
      };
      const {content, isRenderInTag} = (renderSelectedItem as RenderMultipleSelectedItemFn)(item[1], {
        index: i,
        disabled,
        onClose
      });
      const basic = {
        disabled,
        closable: !disabled,
        onClose,
      };
      if (isRenderInTag) {
        return (
          <Tag {...basic} color="white" size={size || 'large'} key={value}>
            {content}
          </Tag>
        );
      } else {
        return <Fragment key={value}>{content}</Fragment>;
      }
    });

    const contentWrapperCls = cls({
      [`${prefixcls}-content-wrapper`]: true,
      [`${prefixcls}-content-wrapper-one-line`]: maxTagCount,
      [`${prefixcls}-content-wrapper-empty`]: !tags.length,
    });

    const spanCls = cls({
      [`${prefixcls}-selection-text`]: true,
      [`${prefixcls}-selection-placeholder`]: !tags.length,
      [`${prefixcls}-selection-text-hide`]: tags && tags.length,
      // [prefixcls + '-selection-text-inactive']: !inputValue && !tags.length,
    });
    const placeholderText = placeholder && !inputValue ? <span class={spanCls}>{placeholder}</span> : null;
    const n = selectedItems.length > maxTagCount ? maxTagCount : undefined;

    const NotOneLine = !maxTagCount; // Multiple lines (that is, do not set maxTagCount), do not use TagGroup, directly traverse with Tag, otherwise Input cannot follow the correct position

    const tagContent = NotOneLine ? tags :
      <TagGroup tagList={tags} maxTagCount={n} restCount={maxTagCount ? selectedItems.length - maxTagCount : undefined}
                size="large" mode="custom"/>;

    return (
      <div class={contentWrapperCls}>
        {tags && tags.length ? tagContent : placeholderText}
        {!filterable ? null : renderInput()}
      </div>
    );
  }

  function onMouseEnter(e: MouseEvent) {
    foundation.handleMouseEnter(e as any);
  }

  function onMouseLeave(e: MouseEvent) {
    foundation.handleMouseLeave(e as any);
  }

  function onKeyPress(e: KeyboardEvent) {
    foundation.handleKeyPress(e as any);
  }

  /* Processing logic when popover visible changes */
  function handlePopoverVisibleChange(status) {
    const {virtualize} = props;
    const {selections} = state;
    if (!status) {
      return;
    }
    if (virtualize) {
      let minItemIndex = -1;
      selections.forEach(item => {
        const itemIndex = get(item, '_scrollIndex');
        /* When the itemIndex is legal */
        if (isNumber(itemIndex) && itemIndex >= 0) {
          minItemIndex = minItemIndex !== -1 && minItemIndex < itemIndex
            ? minItemIndex
            : itemIndex;
        }
      });
      if (minItemIndex !== -1) {
        try {
          virtualizeListRef.value.$el.scrollToItem(minItemIndex, 'center');
        } catch (error) {
        }
      }
    } else {
      foundation.updateScrollTop();
    }
  }

  function renderSuffix() {
    const {suffix} = props;
    const suffixWrapperCls = cls({
      [`${prefixcls}-suffix`]: true,
      [`${prefixcls}-suffix-text`]: suffix && isString(suffix),
      [`${prefixcls}-suffix-icon`]: isSemiIcon(suffix),
    });
    return <div class={suffixWrapperCls}>{suffix}</div>;
  }

  function renderPrefix() {
    const {prefix, insetLabel, insetLabelId} = props;
    const labelNode = (prefix || insetLabel) as any;

    const prefixWrapperCls = cls({
      [`${prefixcls}-prefix`]: true,
      [`${prefixcls}-inset-label`]: insetLabel,
      [`${prefixcls}-prefix-text`]: labelNode && isString(labelNode),
      [`${prefixcls}-prefix-icon`]: isSemiIcon(labelNode),
    });

    return <div class={prefixWrapperCls} id={insetLabelId}>{labelNode}</div>;
  }

  function renderSelection() {
    const {
      disabled,
      multiple,
      filter,
      style,
      id,
      size,
      className,
      validateStatus,
      showArrow,
      suffix,
      prefix,
      insetLabel,
      placeholder,
      triggerRender,
      arrowIcon,
    } = props;

    const {selections, isOpen, keyboardEventSet, inputValue, isHovering, isFocus} = state;
    const useCustomTrigger = typeof triggerRender === 'function';
    const filterable = Boolean(filter); // filter（boolean || function）
    const selectionCls = useCustomTrigger ?
      cls(className) :
      cls(prefixcls, className, {
        [`${prefixcls}-open`]: isOpen,
        [`${prefixcls}-focus`]: isFocus,
        [`${prefixcls}-disabled`]: disabled,
        [`${prefixcls}-single`]: !multiple,
        [`${prefixcls}-multiple`]: multiple,
        [`${prefixcls}-filterable`]: filterable,
        [`${prefixcls}-small`]: size === 'small',
        [`${prefixcls}-large`]: size === 'large',
        [`${prefixcls}-error`]: validateStatus === 'error',
        [`${prefixcls}-warning`]: validateStatus === 'warning',
        [`${prefixcls}-no-arrow`]: !showArrow,
        [`${prefixcls}-with-prefix`]: prefix || insetLabel,
        [`${prefixcls}-with-suffix`]: suffix,
      });

    const showClear = props.showClear &&
      (selections.size || inputValue) && !disabled && (isHovering || isOpen);

    const arrowContent = showArrow ? (
      <div class={`${prefixcls}-arrow`}>
        {arrowIcon}
      </div>
    ) : (
      <div class={`${prefixcls}-arrow-empty`}/>
    );
    const inner = useCustomTrigger ? (
      <Trigger
        value={Array.from(selections.values())}
        inputValue={inputValue}
        onChange={handleInputChange}
        onClear={onClear}
        disabled={disabled}
        triggerRender={triggerRender}
        placeholder={placeholder as any}
        componentName="Select"
        componentProps={{...props}}
      />
    ) : (
      [
        <Fragment key="prefix">{prefix || insetLabel ? renderPrefix() : null}</Fragment>,
        <Fragment key="selection">
          <div class={cls(`${prefixcls}-selection`)}>
            {multiple ?
              renderMultipleSelection(selections, filterable) :
              renderSingleSelection(selections, filterable)}
          </div>
        </Fragment>,
        <Fragment key="clearicon">
          {showClear ? (
            <div
              role="button"
              aria-label="Clear selected value"
              tabindex={0}
              class={cls(`${prefixcls}-clear`)}
              onClick={onClear}
              onKeypress={onClearBtnEnterPress}
            >
              <IconClear/>
            </div>
          ) : arrowContent}
        </Fragment>,
        <Fragment key="suffix">{suffix ? renderSuffix() : null}</Fragment>,
      ]
    );

    const tabIndex = disabled ? null : 0;
    return (
      <div
        role="combobox"
        aria-disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={`${prefixcls}-${selectOptionListID}`}
        aria-haspopup="listbox"
        aria-label="select value"
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={props['aria-describedby']}
        aria-required={props['aria-required']}
        class={selectionCls}
        ref={ref => (triggerRef.value = ref)}
        onClick={e => foundation.handleClick(e)}
        style={style}
        id={id}
        tabindex={tabIndex}
        onMouseenter={onMouseEnter}
        onMouseleave={onMouseLeave}
        // onFocus={e => foundation.handleTriggerFocus(e)}
        onBlur={e => foundation.handleTriggerBlur(e as any)}
        onKeypress={onKeyPress}
        {...keyboardEventSet}
      >
        {inner}
      </div>
    );
  }


  return () => {
    const {direction} = context_.value;
    const defaultPosition = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    const {
      position = defaultPosition,
      zIndex,
      getPopupContainer,
      motion,
      autoAdjustOverflow,
      mouseLeaveDelay,
      mouseEnterDelay,
      spacing,
      stopPropagation,
    } = props;
    const {isOpen, optionKey} = state;
    const optionList = renderOptions(slots.default ? slots.default() : null);
    const selection = renderSelection();
    return (
      <Popover
        getPopupContainer={getPopupContainer}
        motion={motion}
        autoAdjustOverflow={autoAdjustOverflow}
        mouseLeaveDelay={mouseLeaveDelay}
        mouseEnterDelay={mouseEnterDelay}
        // transformFromCenter TODO: check no such property
        zIndex={zIndex}
        ref={optionsRef}
        content={optionList}
        visible={isOpen}
        trigger="custom"
        rePosKey={optionKey}
        position={position}
        spacing={spacing}
        stopPropagation={stopPropagation}
        onVisibleChange={status => handlePopoverVisibleChange(status)}
      >
        {selection}
      </Popover>
    );
  }
})

Index.props = vuePropsType

export default Index

