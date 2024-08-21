import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  Fragment,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  shallowRef,
  toRaw,
  useSlots,
  VNode,
  watch,
} from 'vue';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { FixedSizeList as List } from '@kousum/vue3-window';
import cls from 'classnames';
import SelectFoundation, { SelectAdapter } from '@douyinfe/semi-foundation/select/foundation';
import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/select/constants';
import { useBaseComponent, useHasInProps, type ValidateStatus } from '../_base/baseComponent';
import { get, isEqual, isFunction, isNumber, isString, noop } from 'lodash';
import Tag from '../tag';
import TagGroup from '../tag/group';
import OverflowList from '../overflowList/index';
import Space from '../space/index';
import Text from '../typography/text';
import { LocaleConsumerFunc } from '../locale/localeConsumer';
import Popover from '../popover/index';
import type { PopoverProps } from '../popover';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import Event from '@douyinfe/semi-foundation/utils/Event';
import { getOptionsFromGroup } from './utils';
import VirtualRow from './virtualRow';

import Input, { InputProps } from '../input';
import type { OptionProps } from './option';
import Option from './option';
import OptionGroup from './optionGroup';
import Spin from '../spin';
import Trigger from '../trigger';
import { IconChevronDown, IconClear, IconSearch } from '@kousum/semi-icons-vue';
import { getActiveElement, getFocusableElements, getFragmentChildren, isSemiIcon } from '../_utils';
import { Subtract } from 'utility-types';

import warning from '@douyinfe/semi-foundation/utils/warning';
import { getUuidShort } from '@douyinfe/semi-foundation/utils/uuid';

import '@douyinfe/semi-foundation/select/select.scss';
import { Locale } from '../locale/interface';
import type { Position } from '@douyinfe/semi-foundation/tooltip/foundation';
import type { TooltipProps } from '../tooltip';
import { AriaAttributes } from '../AriaAttributes';
import { CombineProps, VueJsxNode } from '../interface';

export type { OptionProps } from './option';
export type { OptionGroupProps } from './optionGroup';
export type { VirtualRowProps } from './virtualRow';

const prefixcls = cssClasses.PREFIX;
const LocaleConsumer = LocaleConsumerFunc<Locale['Select']>();
const key = 0;

type ExcludeInputType = {
  value?: InputProps['value'];
  onFocus?: InputProps['onFocus'];
  onChange?: InputProps['onChange'];
};

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

export interface SelectedItemProps {
  value: OptionProps['value'];
  label: OptionProps['label'];
  _show?: boolean;
  _selected: boolean;
  _scrollIndex?: number;
}

export interface TriggerRenderProps {
  value: SelectedItemProps[];
  inputValue: string;
  onSearch: (inputValue: string) => void;
  onClear: () => void;
  onRemove: (option: OptionProps) => void;
  disabled: boolean;
  placeholder: string;
  componentProps: Record<string, any>;
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
export type RenderMultipleSelectedItemFn = (
  optionNode: Record<string, any>,
  multipleProps: { index: number; disabled: boolean; onClose: (tagContent: VNode, e: MouseEvent) => void }
) => { isRenderInTag: boolean; content: VNode };

export type RenderSelectedItemFn = RenderSingleSelectedItemFn | RenderMultipleSelectedItemFn;

export type SelectProps = {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-label'?: AriaAttributes['aria-label'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  id?: string;
  autoFocus?: boolean;
  autoClearSearchValue?: boolean;
  arrowIcon?: VueJsxNode;
  borderless?: boolean;
  clearIcon?: VueJsxNode;
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
  expandRestTagsOnClick?: boolean;
  onDropdownVisibleChange?: (visible: boolean) => void;
  zIndex?: number;
  position?: Position;
  onSearch?: (value: string, event: KeyboardEvent | MouseEvent) => void;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  dropdownMargin?: PopoverProps['margin'];
  ellipsisTrigger?: boolean;
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
  searchPosition?: string;
  searchPlaceholder?: string;
  prefix?: VNode | string;
  insetLabel?: VNode | string;
  insetLabelId?: string;
  inputProps?: Subtract<InputProps, ExcludeInputType>;
  showClear?: boolean;
  showArrow?: boolean;
  renderSelectedItem?: RenderSelectedItemFn;
  renderCreateItem?: (inputValue: OptionProps['value'], focus: boolean, style?: CSSProperties) => VNode;
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
  triggerRender?: (props?: TriggerRenderProps) => VNode;
  onClear?: () => void;
  virtualize?: virtualListProps;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onListScroll?: (e: Event) => void;
  preventScroll?: boolean;
  showRestTagsPopover?: boolean;
  restTagsPopoverProps?: PopoverProps;
  isInInputGroup?: boolean;
} & Pick<
  TooltipProps,
  | 'spacing'
  | 'getPopupContainer'
  | 'motion'
  | 'autoAdjustOverflow'
  | 'mouseLeaveDelay'
  | 'mouseEnterDelay'
  | 'stopPropagation'
>;

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
  isFullTags: boolean;
  // The number of really-hidden items when maxTagCount is set
  overflowItemCount: number;
}

// Notes: Use the label of the option as the identifier, that is, the option in Select, the value is allowed to be the same, but the label must be unique

const propTypes: CombineProps<SelectProps> = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-labelledby': PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-required': PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoClearSearchValue: PropTypes.bool,
  borderless: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  placeholder: PropTypes.node as PropType<SelectProps['placeholder']>,
  onChange: PropTypes.func as PropType<SelectProps['onChange']>,
  multiple: PropTypes.bool,
  // Whether to turn on the input box filtering function, when it is a function, it represents a custom filtering function
  filter: [PropTypes.func, PropTypes.bool] as PropType<SelectProps['filter']>,
  // How many tags can you choose?
  max: PropTypes.number,
  // How many tabs are displayed at most, and the rest are displayed in + N
  maxTagCount: PropTypes.number,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  size: String as PropType<SelectProps['size']>,
  disabled: PropTypes.bool,
  emptyContent: PropTypes.node as PropType<SelectProps['emptyContent']>,
  onDropdownVisibleChange: PropTypes.func as PropType<SelectProps['onDropdownVisibleChange']>,
  zIndex: PropTypes.number,
  position: String as PropType<SelectProps['position']>,
  onSearch: PropTypes.func as PropType<SelectProps['onSearch']>,
  getPopupContainer: PropTypes.func as PropType<SelectProps['getPopupContainer']>,
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.object,
  outerTopSlot: PropTypes.node as PropType<SelectProps['outerTopSlot']>,
  innerTopSlot: PropTypes.node as PropType<SelectProps['innerTopSlot']>,
  inputProps: PropTypes.object,
  outerBottomSlot: PropTypes.node as PropType<SelectProps['outerBottomSlot']>,
  innerBottomSlot: PropTypes.node as PropType<SelectProps['innerBottomSlot']>, // Options slot
  optionList: PropTypes.array as PropType<SelectProps['optionList']>, // O
  dropdownMatchSelectWidth: PropTypes.bool,
  loading: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  validateStatus: String as PropType<SelectProps['validateStatus']>,
  defaultActiveFirstOption: PropTypes.bool,
  triggerRender: PropTypes.func as PropType<SelectProps['triggerRender']>,
  stopPropagation: PropTypes.bool,
  // motion doesn't need to be exposed
  motion: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]),

  onChangeWithObject: PropTypes.bool,

  suffix: PropTypes.node as PropType<SelectProps['suffix']>,
  prefix: PropTypes.node as PropType<SelectProps['prefix']>,
  insetLabel: PropTypes.node as PropType<SelectProps['insetLabel']>,
  insetLabelId: PropTypes.string,
  showClear: PropTypes.bool,
  showArrow: PropTypes.bool,

  renderSelectedItem: PropTypes.func as PropType<SelectProps['renderSelectedItem']>,

  allowCreate: PropTypes.bool,
  renderCreateItem: PropTypes.func as PropType<SelectProps['renderCreateItem']>,

  onMouseEnter: PropTypes.func as PropType<SelectProps['onMouseEnter']>,
  onMouseLeave: PropTypes.func as PropType<SelectProps['onMouseLeave']>,
  clickToHide: PropTypes.bool,
  onExceed: PropTypes.func as PropType<SelectProps['onExceed']>,
  onCreate: PropTypes.func as PropType<SelectProps['onCreate']>,
  remote: PropTypes.bool,
  onDeselect: PropTypes.func as PropType<SelectProps['onDeselect']>,
  // The main difference between onSelect and onChange is that when multiple selections are selected, onChange contains all options, while onSelect only contains items for the current operation
  onSelect: PropTypes.func as PropType<SelectProps['onSelect']>,
  autoAdjustOverflow: PropTypes.bool,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  onBlur: PropTypes.func as PropType<SelectProps['onBlur']>,
  onFocus: PropTypes.func as PropType<SelectProps['onFocus']>,
  onClear: PropTypes.func as PropType<SelectProps['onClear']>,

  virtualize: PropTypes.object,
  renderOptionItem: PropTypes.func as PropType<SelectProps['renderOptionItem']>,
  onListScroll: PropTypes.func as PropType<SelectProps['onListScroll']>,
  arrowIcon: PropTypes.node,
  preventScroll: PropTypes.bool,
  // open: PropTypes.bool,
  // tagClosable: PropTypes.bool,

  showRestTagsPopover: PropTypes.bool,
  restTagsPopoverProps: PropTypes.object,

  id: String,
  expandRestTagsOnClick: PropTypes.bool,
  ellipsisTrigger: PropTypes.bool,

  searchPosition: String,
  searchPlaceholder: String,
  clearIcon: PropTypes.node,
  dropdownMargin: [PropTypes.number, PropTypes.object,],
  isInInputGroup: Boolean,
};

const defaultProps: Partial<SelectProps> = {
  stopPropagation: true,
  motion: true,
  borderless: false,
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
  searchPosition: strings.SEARCH_POSITION_TRIGGER,
  remote: false,
  autoAdjustOverflow: true,
  autoClearSearchValue: true,
  arrowIcon: <IconChevronDown aria-label="" />,

  // Radio selection is different from the default renderSelectedItem for multiple selection, so it is not declared here
  // renderSelectedItem: (optionNode) => optionNode.label,
  // The default creator rendering is related to i18, so it is not declared here
  // renderCreateItem: (input) => input

  showRestTagsPopover: false,
  restTagsPopoverProps: {},
  expandRestTagsOnClick: false,
  ellipsisTrigger: false,
};
export const vuePropsType = vuePropsMake<SelectProps>(propTypes, defaultProps);
const Index = defineComponent({
  props: { ...vuePropsType, children: Array as PropType<VNode[]> },
  name: 'Select_',
  setup(props, { expose }) {
    const slots = useSlots();

    const state = reactive<SelectState>({
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
      isFullTags: false,
      overflowItemCount: 0,
    });
    let selectOptionListID = '';
    let selectID = '';
    let virtualizeListRef = ref();
    let inputRef = ref();
    let dropdownInputRef = ref();
    let triggerRef = ref();
    let optionsRef = ref();
    const optionContainerEl = ref();
    let clickOutsideHandler: (e: MouseEvent) => void;
    let foundation: SelectFoundation;
    /* Generate random string */
    clickOutsideHandler = null;
    warning(
      'optionLabelProp' in props,
      "[Semi Select] 'optionLabelProp' has already been deprecated, please use 'renderSelectedItem' instead."
    );

    warning(
      'labelInValue' in props,
      "[Semi Select] 'labelInValue' has already been deprecated, please use 'onChangeWithObject' instead."
    );

    const { hasInProps } = useHasInProps();
    const eventManager = new Event();
    // TODO context
    const { adapter: adapterInject, context: context_, getDataAttr } = useBaseComponent<SelectProps>(props, state);
    const setOptionContainerEl = (node: HTMLDivElement) => (optionContainerEl.value = node);

    function adapter(): SelectAdapter<SelectProps, SelectState> {
      const keyboardAdapter = {
        registerKeyDown: (cb: () => void) => {
          const keyboardEventSet = {
            onKeyDown: cb,
          };
          state.keyboardEventSet = keyboardEventSet;
        },
        unregisterKeyDown: () => {
          state.keyboardEventSet = {};
        },
        updateFocusIndex: (focusIndex: number) => {
          state.focusIndex = focusIndex;
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        scrollToFocusOption: () => {},
      };

      const filterAdapter = {
        updateInputValue: (value: string) => {
          state.inputValue = value;
        },
        toggleInputShow: (showInput: boolean, cb: (...args: any) => void) => {
          state.showInput = showInput;
          nextTick(() => {
            cb?.();
          });
        },
        focusInput: () => {
          const { preventScroll } = props;
          if (inputRef.value && inputRef.value.$el) {
            inputRef.value.$el.children[0].focus({ preventScroll });
          }
        },
        focusDropdownInput: () => {
          const { preventScroll } = props;
          if (dropdownInputRef.value) {
            dropdownInputRef.value.focus({ preventScroll });
          }
        },
      };
      const multipleAdapter = {
        notifyMaxLimit: (option: OptionProps) => props.onExceed(option),
        getMaxLimit: () => props.max,
        registerClickOutsideHandler: (cb: (e: MouseEvent) => void) => {
          const clickOutsideHandler_: (e: MouseEvent) => void = (e) => {
            // @ts-ignore TODO 比较重要的不同点 关于获取组建dom的 使用expose 得到的结果就不一样了
            const optionInstance = optionsRef.value && optionsRef.value.getRef?.().vnode.el;
            const triggerDom = triggerRef.value as Element;
            const optionsDom = optionInstance;
            const target = e.target as Element;
            const path = ((e as any).composedPath && (e as any).composedPath()) || [target];
            if (
              !(optionsDom && optionsDom.contains(target)) &&
              !(triggerDom && triggerDom.contains(target)) &&
              !(path.includes(triggerDom) || path.includes(optionsDom))
            ) {
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
          let { optionKey } = state;
          optionKey = optionKey + 1;
          state.optionKey = optionKey;
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
        on: (eventName, eventCallback) => eventManager.on(eventName, eventCallback),
        off: (eventName) => eventManager.off(eventName),
        once: (eventName, eventCallback) => eventManager.once(eventName, eventCallback),
        emit: (eventName) => eventManager.emit(eventName),
        // Collect all subitems, each item is visible by default when collected, and is not selected
        //slots.default?slots.default():null
        getOptionsFromChildren: () => {
          let optionGroups = [];
          let options = [];
          const { optionList } = props;
          if (optionList && optionList.length) {
            options = optionList.map((itemOpt, index) => ({
              _show: true,
              _selected: false,
              _scrollIndex: index,
              ...itemOpt,
            }));
            optionGroups[0] = { children: options, label: '' };
          } else {
            const result = getOptionsFromGroup(props.children);
            optionGroups = result.optionGroups;
            options = result.options;
          }
          state.optionGroups = optionGroups;
          return toRaw(options);
        },
        updateOptions: (options: OptionProps[]) => {
          state.options = options;
        },
        openMenu: (cb?: () => void) => {
          state.isOpen = true;
          nextTick(() => {
            cb?.();
          });
        },
        closeMenu: () => {
          state.isOpen = false;
        },
        getTriggerWidth: () => {
          const el = triggerRef.value;
          return el && el.getBoundingClientRect().width;
        },
        setOptionWrapperWidth: (width: number) => {
          state.dropdownMinWidth = width;
        },
        updateSelection: (selections: Map<OptionProps['label'], any>) => {
          setTimeout(()=>{
            state.selections = selections;
          })
        },
        // clone Map, important!!!, prevent unexpected modify on state
        getSelections: () => new Map(toRaw(state.selections)),

        notifyChange: (value: OnChangeValueType | OnChangeValueType[]) => {
          props.onChange(value);
        },
        notifySelect: (value: OptionProps['value'], option: OptionProps) => {
          delete option._parentGroup;
          props.onSelect(value, option);
        },
        notifyDropdownVisibleChange: (visible: boolean) => {
          props.onDropdownVisibleChange(visible);
        },
        notifySearch: (input: string, event: MouseEvent | KeyboardEvent) => {
          props.onSearch(input, event);
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
          state.isHovering = isHovering;
        },
        updateFocusState: (isFocus: boolean) => {
          state.isFocus = isFocus;
        },
        updateOverflowItemCount: (overflowItemCount: number) => {
          state.overflowItemCount = overflowItemCount;
        },
        focusTrigger: () => {
          try {
            const { preventScroll } = props;
            const el = triggerRef.value as any;
            el.focus({ preventScroll });
          } catch (error) {}
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
          state.isFocusInContainer = isFocusInContainer;
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
          let destNode = optionContainerEl.value?.querySelector(
            `#${prefixcls}-${selectOptionListID} ${optionClassName}`
          ) as HTMLDivElement;
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
            destParent.scrollTop =
              destNode.offsetTop - destParent.offsetTop - destParent.clientHeight / 2 + destNode.clientHeight / 2;
          }
        },
      };
    }

    const theAdapter = adapter();
    foundation = new SelectFoundation(theAdapter);

    onMounted(() => {
      foundation.init();
      selectOptionListID = getUuidShort();
      selectID = props.id || getUuidShort();
    });

    onUnmounted(() => {
      foundation.destroy();
    });

    watch(
      [() => props.value, () => props.optionList, ()=>props.children],
      (value, [prevPropsValue, prevPropsOptionList, preChildren_]) => {
        // TODO Children VNode 更新时
        const prevChildrenKeys = preChildren_.map((child: any) => child.key);
        const nowChildrenKeys = props.children.map((child: any) => child.key);
        // const prevChildrenKeys = [];
        // const nowChildrenKeys = [];

        let isOptionsChanged = false;

        if (!isEqual(prevChildrenKeys, nowChildrenKeys) || !isEqual(prevPropsOptionList, props.optionList)) {
          isOptionsChanged = true;
          foundation.handleOptionListChange();
        }

        // Add isOptionChanged: There may be cases where the value is unchanged, but the optionList is updated. At this time, the label corresponding to the value may change, and the selected item needs to be updated
        if (prevPropsValue !== props.value || isOptionsChanged) {
          if (hasInProps('value')) {
            foundation.handleValueChange(props.value as any);
          } else {
            foundation.handleOptionListChangeHadDefaultValue();
          }
        }
      }
    );
    // watch(() => props.value, ()=>{
    //   if ('value' in theAdapter.getProps()) {
    //     foundation.handleValueChange(props.value as any);
    //   } else {
    //     foundation.handleOptionListChangeHadDefaultValue();
    //   }
    // })

    const handleInputChange = (value: string, event: Event) => {
      foundation.handleInputChange(value, event);
    };

    function renderTriggerInput() {
      const { size, multiple, disabled, inputProps, filter } = props;
      const inputPropsCls = get(inputProps, 'className');
      const inputcls = cls(
        `${prefixcls}-input`,
        {
          [`${prefixcls}-input-single`]: !multiple,
          [`${prefixcls}-input-multiple`]: multiple,
        },
        inputPropsCls
      );
      const { inputValue, focusIndex } = state;

      const selectInputProps: Record<string, any> = {
        value: inputValue,
        disabled,
        className: inputcls,
        onChange: handleInputChange,
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
          aria-activedescendant={focusIndex !== -1 ? `${selectID}-option-${focusIndex}` : ''}
          onFocus={(e: FocusEvent) => {
            if (multiple && Boolean(filter)) {
              state.isFocus = true;
            }
            // prevent event bubbling which will fire trigger onFocus event
            e.stopPropagation();
            // e.nativeEvent.stopImmediatePropagation();
          }}
          {...selectInputProps}
        />
      );
    }

    function renderDropdownInput() {
      const { size, multiple, disabled, inputProps, filter, searchPosition, searchPlaceholder } = props;
      const { inputValue, focusIndex } = state;
      const wrapperCls = cls(`${prefixcls}-dropdown-search-wrapper`, {});
      const inputPropsCls = get(inputProps, 'className');
      const inputCls = cls(
        `${prefixcls}-dropdown-input`,
        {
          [`${prefixcls}-dropdown-input-single`]: !multiple,
          [`${prefixcls}-dropdown-input-multiple`]: multiple,
        },
        inputPropsCls
      );

      const selectInputProps: Record<string, any> = {
        value: inputValue,
        disabled,
        className: inputCls,
        onChange: handleInputChange,
        placeholder: searchPlaceholder,
        showClear: true,
        ...inputProps,
        /**
         * When searchPosition is trigger, the keyboard events are bound to the outer trigger div, so there is no need to listen in input.
         * When searchPosition is dropdown, the popup and the outer trigger div are not parent- child relationships,
         * and bubbles cannot occur, so onKeydown needs to be listened in input.
         *  */
        onKeyDown: (e) => foundation._handleKeyDown(e),
      };

      return (
        <div class={wrapperCls}>
          <Input
            ref={dropdownInputRef}
            prefix={<IconSearch></IconSearch>}
            aria-activedescendant={focusIndex !== -1 ? `${selectID}-option-${focusIndex}` : ''}
            {...selectInputProps}
          />
        </div>
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
    expose({
      close,
      open,
      clearInput,
      selectAll,
      deselectAll,
      focus,
    });

    function onSelect(option: OptionProps, optionIndex: number, e: any) {
      foundation.onSelect(toRaw(option), optionIndex, e);
    }

    function onClear(e: MouseEvent) {
      e.stopImmediatePropagation();
      foundation.handleClearClick(e as any);
    }

    function onClearBtnEnterPress(e: KeyboardEvent) {
      foundation.handleClearBtnEnterPress(e as any);
    }

    function search(value: string, event: Event) {
      handleInputChange(value, event);
    }

    function renderEmpty() {
      return <Option empty={true} emptyContent={props.emptyContent} />;
    }

    function renderLoading() {
      const loadingWrapperCls = `${prefixcls}-loading-wrapper`;
      return (
        <div class={loadingWrapperCls}>
          <Spin />
        </div>
      );
    }

    function renderOption(option: OptionProps, optionIndex: number, style?: CSSProperties) {
      const { focusIndex, inputValue } = state;
      const { renderOptionItem } = props;
      let optionContent;
      const isFocused = optionIndex === focusIndex;
      let optionStyle = style || {};
      if (option.style) {
        optionStyle = { ...optionStyle, ...option.style };
      }
      if (option._inputCreateOnly) {
        optionContent = renderCreateOption(option, isFocused, optionIndex, style);
      } else {
        // use another name to make sure that 'key' in optionList still exist when we call onChange
        if ('key_' in option) {
          option._keyInOptionList = option.key_;
        }
        optionContent = (
          <Option
            showTick
            {...option}
            optionRest={option}
            selected={option._selected}
            onSelect={(v: OptionProps, e: MouseEvent) => onSelect(v, optionIndex, e)}
            focused={isFocused}
            onMouseEnter={() => onOptionHover(optionIndex)}
            style={optionStyle}
            key={
              (option._keyInOptionList ||
              option._keyInJsx ||
              (((option.label as string) + option.value) as string) + optionIndex) as any
            }
            renderOptionItem={renderOptionItem}
            inputValue={inputValue}
            semiOptionId={`${selectID}-option-${optionIndex}`}
          >
            {option.label}
          </Option>
        );
      }
      return optionContent;
    }

    function renderCreateOption(option: OptionProps, isFocused: boolean, optionIndex: number, style: CSSProperties) {
      const { renderCreateItem } = props;
      // default render method
      if (typeof renderCreateItem === 'undefined') {
        const defaultCreateItem = (
          <Option
            key={option.key_ || (((option.label as string) + option.value) as string)}
            onSelect={(v: OptionProps, e: MouseEvent) => onSelect(v, optionIndex, e)}
            onMouseEnter={() => onOptionHover(optionIndex)}
            showTick
            {...option}
            optionRest={option}
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

      const customCreateItem = renderCreateItem(option.value, isFocused, style);

      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
        <div
          role="button"
          aria-label="Use the input box to create an optional item"
          onClick={(e) => onSelect(option, optionIndex, e)}
          key={option.key_ || option.label}
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
          const groupContent = <OptionGroup {...parentGroup} key={parentGroup.label as any} />;
          groupStatus.set(parentGroup.label, true);
          content.push(groupContent);
        }
        content.push(optionContent);
      });

      return content;
    }

    function renderVirtualizeList(visibleOptions: OptionProps[]) {
      const { virtualize } = props;
      const { direction } = context_.value;
      const { height, width, itemSize } = virtualize;

      return (
        <List
          ref={virtualizeListRef}
          height={height || numbers.LIST_HEIGHT}
          itemCount={visibleOptions.length}
          itemSize={itemSize}
          itemData={{ visibleOptions, renderOption: renderOption }}
          width={width}
          style={{ direction }}
        >
          {VirtualRow}
        </List>
      );
    }

    function renderOptions(children?: VNode[]) {
      const { dropdownMinWidth, options, selections } = state;
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
        emptyContent,
        searchPosition,
        filter,
      } = props;

      // Do a filter first, instead of directly judging in forEach, so that the focusIndex can correspond to
      const visibleOptions = toRaw(options).filter((item) => item._show);
      let listContent: JSX.Element | JSX.Element[] = renderWithGroup(visibleOptions);
      if (virtualize) {
        listContent = renderVirtualizeList(visibleOptions);
      }

      const style = {
        minWidth: typeof dropdownMinWidth === 'string' ? dropdownMinWidth : dropdownMinWidth + 'px',
        ...dropdownStyle,
      };

      const optionListCls = cls({
        [`${prefixcls}-option-list`]: true,
        [`${prefixcls}-option-list-chosen`]: selections.size,
      });

      const isEmpty = !options.length || !toRaw(options).some((item) => item._show);
      return (
        <div
          id={`${prefixcls}-${selectOptionListID}`}
          class={dropdownClassName}
          style={style}
          ref={setOptionContainerEl as any}
          onKeydown={(e) => foundation.handleContainerKeyDown(e)}
        >
          {outerTopSlot ? (
            <div
              class={`${prefixcls}-option-list-outer-top-slot`}
              onMouseenter={() => foundation.handleSlotMouseEnter()}
            >
              {outerTopSlot}
            </div>
          ) : null}
          {searchPosition === strings.SEARCH_POSITION_DROPDOWN && filter ? renderDropdownInput() : null}
          <div
            style={{ maxHeight: `${maxHeight}px` }}
            class={optionListCls}
            role="listbox"
            aria-multiselectable={multiple}
            onScroll={(e) => foundation.handleListScroll(e)}
          >
            {innerTopSlot ? (
              <div
                class={`${prefixcls}-option-list-inner-top-slot`}
                onMouseenter={() => foundation.handleSlotMouseEnter()}
              >
                {innerTopSlot}
              </div>
            ) : null}
            {loading ? renderLoading() : isEmpty ? renderEmpty() : listContent}
            {innerBottomSlot ? (
              <div
                class={`${prefixcls}-option-list-inner-bottom-slot`}
                onMouseenter={() => foundation.handleSlotMouseEnter()}
              >
                {innerBottomSlot}
              </div>
            ) : null}
          </div>
          {outerBottomSlot ? (
            <div
              class={`${prefixcls}-option-list-outer-bottom-slot`}
              onMouseenter={() => foundation.handleSlotMouseEnter()}
            >
              {outerBottomSlot}
            </div>
          ) : null}
        </div>
      );
    }

    function renderSingleSelection(selections: Map<OptionProps['label'], any>, filterable: boolean) {
      let { renderSelectedItem, searchPosition } = props;
      const { placeholder } = props;
      const { showInput, inputValue } = state;
      let renderText: any = '';

      const selectedItems = [...selections];

      if (typeof renderSelectedItem === 'undefined') {
        renderSelectedItem = ((optionNode: OptionProps) => optionNode.label) as RenderSelectedItemFn;
      }

      if (selectedItems.length) {
        const selectedItem = selectedItems[0][1];
        renderText = (renderSelectedItem as RenderSingleSelectedItemFn)(selectedItem);
      }

      const showInputInTrigger = searchPosition === strings.SEARCH_POSITION_TRIGGER;

      const spanCls = cls({
        [`${prefixcls}-selection-text`]: true,
        [`${prefixcls}-selection-placeholder`]: !renderText && renderText !== 0,
        [`${prefixcls}-selection-text-hide`]: inputValue && showInput && showInputInTrigger, // show Input
        [`${prefixcls}-selection-text-inactive`]: !inputValue && showInput && showInputInTrigger, // Stack Input & RenderText(opacity 0.4)
      });

      const contentWrapperCls = `${prefixcls}-content-wrapper`;
      return (
        <div class={contentWrapperCls}>
          {
            <span class={spanCls} x-semi-prop="placeholder" key={renderText}>
              {renderText || renderText === 0 ? renderText : placeholder}
            </span>
          }
          {filterable && showInput && showInputInTrigger ? renderTriggerInput() : null}
        </div>
      );
    }

    const getTagItem = (item: any, i: number, renderSelectedItem: RenderSelectedItemFn) => {
      const { size, disabled: selectDisabled } = props;
      const label = item[0];
      const { value } = item[1];
      const disabled = item[1].disabled || selectDisabled;
      const onClose = (tagContent: VueJsxNode, e: MouseEvent) => {
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault(); // make sure that tag will not hidden immediately in controlled mode
        }
        foundation.removeTag({ label, value });
      };
      const { content, isRenderInTag } = (renderSelectedItem as RenderMultipleSelectedItemFn)(item[1], {
        index: i,
        disabled,
        onClose,
      });
      const basic = {
        disabled,
        closable: !disabled,
        onClose,
      };
      if (isRenderInTag) {
        return (
          <Tag {...basic} color="white" size={size || 'large'} key={value} tabIndex={-1}>
            {content}
          </Tag>
        );
      } else {
        return <Fragment key={value}>{content}</Fragment>;
      }
    };

    function renderTag(item: [VueJsxNode, any], i: number, isCollapseItem?: boolean) {
      const { size, disabled: selectDisabled } = props;
      let { renderSelectedItem } = props;
      const label = item[0];
      const { value } = item[1];
      const disabled = item[1].disabled || selectDisabled;
      const onClose = (tagContent: VueJsxNode, e: MouseEvent) => {
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault(); // make sure that tag will not hidden immediately in controlled mode
        }
        foundation.removeTag({ label, value });
      };

      if (typeof renderSelectedItem === 'undefined') {
        renderSelectedItem = (optionNode: OptionProps) =>
          ({
            isRenderInTag: true,
            content: optionNode.label,
          }) as any;
      }
      const { content, isRenderInTag } = (renderSelectedItem as RenderMultipleSelectedItemFn)(item[1], {
        index: i,
        disabled,
        onClose,
      });
      const basic = {
        disabled,
        closable: !disabled,
        onClose,
      };
      const realContent =
        isCollapseItem && !isFunction(props.renderSelectedItem) ? (
          <Text
            size="small"
            ellipsis={{ rows: 1, showTooltip: { type: 'popover', opts: { style: { width: 'auto', fontSize: 12 } } } }}
          >
            {content}
          </Text>
        ) : (
          content
        );
      if (isRenderInTag) {
        return (
          <Tag {...basic} color="white" size={size || 'large'} key={value} style={{ maxWidth: '100%' }}>
            {realContent}
          </Tag>
        );
      } else {
        return <Fragment key={value}>{realContent}</Fragment>;
      }
    }

    function renderNTag(n: number, restTags: [VueJsxNode, any][]) {
      const { size, showRestTagsPopover, restTagsPopoverProps } = props;
      let nTag = (
        <Tag
          closable={false}
          size={size || 'large'}
          color="grey"
          className={`${prefixcls}-content-wrapper-collapse-tag`}
          key={`_+${n}`}
          style={{ marginRight: 0, flexShrink: 0 }}
        >
          +{n}
        </Tag>
      );

      if (showRestTagsPopover) {
        nTag = (
          <Popover
            showArrow
            content={
              <Space spacing={2} wrap style={{ maxWidth: '400px' }}>
                {restTags.map((tag, index) => renderTag(tag, index))}
              </Space>
            }
            trigger="hover"
            position="top"
            autoAdjustOverflow
            {...restTagsPopoverProps}
            key={`_+${n}_Popover`}
          >
            {nTag}
          </Popover>
        );
      }
      return nTag;
    }

    function renderOverflow(items: [VueJsxNode, any][], index: number) {
      const isCollapse = true;
      return items.length && items[0] ? renderTag(items[0], index, isCollapse) : null;
    }

    function handleOverflow(items: [VueJsxNode, any][]) {
      const { overflowItemCount, selections } = state;
      const { maxTagCount } = props;
      const newOverFlowItemCount =
        selections.size - maxTagCount > 0 ? selections.size - maxTagCount + items.length - 1 : items.length - 1;
      if (overflowItemCount !== newOverFlowItemCount) {
        foundation.updateOverflowItemCount(selections.size, newOverFlowItemCount);
      }
    }

    function renderCollapsedTags(selections: [VueJsxNode, any][], length: number | undefined) {
      const { overflowItemCount } = state;
      const normalTags = typeof length === 'number' ? selections.slice(0, length) : selections;
      return (
        <div class={`${prefixcls}-content-wrapper-collapse`}>
          <OverflowList
            items={normalTags}
            key={String(selections.length)}
            overflowRenderer={(overflowItems) => renderOverflow(overflowItems as [VueJsxNode, any][], length - 1)}
            onOverflow={(overflowItems) => handleOverflow(overflowItems as [VueJsxNode, any][])}
            visibleItemRenderer={(item, index) => renderTag(item as [VueJsxNode, any], index)}
          />
          {overflowItemCount > 0 &&
            renderNTag(overflowItemCount, selections.slice(selections.length - overflowItemCount))}
        </div>
      );
    }

    function renderOneLineTags(selectedItems: [VueJsxNode, any][], n: number | undefined) {
      let { renderSelectedItem } = props;
      const { showRestTagsPopover, restTagsPopoverProps, maxTagCount } = props;
      const { isFullTags } = state;
      let tagContent: VueJsxNode;

      if (typeof renderSelectedItem === 'undefined') {
        renderSelectedItem = (optionNode: OptionProps) =>
          ({
            isRenderInTag: true,
            content: optionNode.label,
          }) as any;
      }
      if (showRestTagsPopover) {
        // showRestTagsPopover = true，
        const mapItems = isFullTags ? selectedItems : selectedItems.slice(0, maxTagCount);
        const tags = mapItems.map((item, i) => {
          return getTagItem(item, i, renderSelectedItem);
        });

        tagContent = (
          <TagGroup
            tagList={tags}
            maxTagCount={n}
            restCount={isFullTags ? undefined : selectedItems.length - maxTagCount}
            size="large"
            mode="custom"
            showPopover={showRestTagsPopover}
            popoverProps={restTagsPopoverProps}
            onPlusNMouseEnter={() => {
              foundation.updateIsFullTags();
            }}
          />
        );
      } else {
        // If maxTagCount is set, showRestTagsPopover is false/undefined,
        // then there is no popover when hovering, no extra Tags are displayed,
        // only the tags and restCount displayed in the trigger need to be passed in
        const mapItems = selectedItems.slice(0, maxTagCount);
        const tags = mapItems.map((item, i) => {
          return getTagItem(item, i, renderSelectedItem);
        });
        tagContent = (
          <TagGroup
            tagList={tags}
            maxTagCount={n}
            restCount={selectedItems.length - maxTagCount}
            size="large"
            mode="custom"
          />
        );
      }
      return tagContent;
    }

    function renderMultipleSelection(selections: Map<OptionProps['label'], any>, filterable: boolean) {
      let { renderSelectedItem, searchPosition } = props;
      const { placeholder, maxTagCount, expandRestTagsOnClick, ellipsisTrigger } = props;
      const { inputValue, isOpen } = state;

      const selectedItems = [...selections];

      if (typeof renderSelectedItem === 'undefined') {
        // renderSelectedItem = (optionNode: OptionProps) => ({
        //   isRenderInTag: true,
        //   content: optionNode.label,
        // });
      }

      const contentWrapperCls = cls({
        [`${prefixcls}-content-wrapper`]: true,
        [`${prefixcls}-content-wrapper-one-line`]: maxTagCount && !isOpen,
        [`${prefixcls}-content-wrapper-empty`]: !selectedItems.length,
      });

      const spanCls = cls({
        [`${prefixcls}-selection-text`]: true,
        [`${prefixcls}-selection-placeholder`]: !selectedItems.length,
        [`${prefixcls}-selection-text-hide`]: selectedItems && selectedItems.length,
      });
      const placeholderText = placeholder && !inputValue ? <span class={spanCls}>{placeholder}</span> : null;
      const n = selectedItems.length > maxTagCount ? maxTagCount : undefined;
      const NotOneLine = !maxTagCount;

      const oneLineTags = ellipsisTrigger ? renderCollapsedTags(selectedItems, n) : renderOneLineTags(selectedItems, n);

      const tagContent =
        NotOneLine || (expandRestTagsOnClick && isOpen)
          ? selectedItems.map((item, i) => renderTag(item, i))
          : oneLineTags;

      const showTriggerInput = filterable && searchPosition === strings.SEARCH_POSITION_TRIGGER;

      return (
        <Fragment>
          <div class={contentWrapperCls}>
            {selectedItems && selectedItems.length ? tagContent : placeholderText}
            {!filterable ? null : renderTriggerInput()}
          </div>
        </Fragment>
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
      const { virtualize } = props;
      const { selections } = state;
      if (!status) {
        return;
      }
      if (virtualize) {
        let minItemIndex = -1;
        toRaw(selections).forEach((item) => {
          const itemIndex = get(item, '_scrollIndex');
          /* When the itemIndex is legal */
          if (isNumber(itemIndex) && itemIndex >= 0) {
            minItemIndex = minItemIndex !== -1 && minItemIndex < itemIndex ? minItemIndex : itemIndex;
          }
        });
        if (minItemIndex !== -1) {
          try {
            virtualizeListRef.value.scrollToItem(minItemIndex, 'center');
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        foundation.updateScrollTop();
      }
    }

    function renderSuffix() {
      const { suffix } = props;
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
    }

    function renderPrefix() {
      const { prefix, insetLabel, insetLabelId } = props;
      const labelNode = (prefix || insetLabel) as any;

      const prefixWrapperCls = cls({
        [`${prefixcls}-prefix`]: true,
        [`${prefixcls}-inset-label`]: insetLabel,
        [`${prefixcls}-prefix-text`]: labelNode && isString(labelNode),
        [`${prefixcls}-prefix-icon`]: isSemiIcon(labelNode),
      });

      return (
        <div class={prefixWrapperCls} id={insetLabelId} x-semi-prop="prefix,insetLabel">
          {labelNode}
        </div>
      );
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
        clearIcon,
        borderless,
        ...rest
      } = props;

      const { selections, isOpen, keyboardEventSet, inputValue, isHovering, isFocus, showInput, focusIndex } = state;
      const useCustomTrigger = typeof triggerRender === 'function';
      const filterable = Boolean(filter); // filter（boolean || function）
      const selectionCls = useCustomTrigger
        ? cls(className)
        : cls(prefixcls, className, {
            [`${prefixcls}-borderless`]: borderless,
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

      const showClear = props.showClear && (selections.size || inputValue) && !disabled && (isHovering || isOpen);

      const arrowContent = showArrow ? (
        <div class={`${prefixcls}-arrow`} x-semi-prop="arrowIcon">
          {arrowIcon}
        </div>
      ) : (
        <div class={`${prefixcls}-arrow-empty`} />
      );
      const clear = clearIcon ? clearIcon : <IconClear />;
      const inner = useCustomTrigger ? (
        <Trigger
          value={Array.from(toRaw(selections).values())}
          inputValue={inputValue}
          onChange={handleInputChange}
          onSearch={handleInputChange}
          onRemove={(item) => foundation.removeTag(item)}
          onClear={onClear}
          disabled={disabled}
          triggerRender={triggerRender}
          placeholder={placeholder as any}
          componentName="Select"
          componentProps={{ ...props }}
        />
      ) : (
        [
          <Fragment key="prefix">{prefix || insetLabel ? renderPrefix() : null}</Fragment>,
          <Fragment key="selection">
            <div class={cls(`${prefixcls}-selection`)}>
              {multiple
                ? renderMultipleSelection(toRaw(selections), filterable)
                : renderSingleSelection(toRaw(selections), filterable)}
            </div>
          </Fragment>,
          <Fragment key="clearicon">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            {showClear ? (
              <div class={cls(`${prefixcls}-clear`)} onClick={onClear}>
                {clear}
              </div>
            ) : (
              arrowContent
            )}
          </Fragment>,
          <Fragment key="suffix">{suffix ? renderSuffix() : null}</Fragment>,
        ]
      );
      /**
       *
       * In disabled, searchable single-selection and display input, and searchable multi-selection
       * make combobox not focusable by tab key
       *
       * 在disabled，可搜索单选且显示input框，以及可搜索多选情况下
       * 让combobox无法通过tab聚焦
       */
      const tabIndex = disabled || (filterable && showInput) || (filterable && multiple) ? -1 : 0;

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
          ref={(ref) => (triggerRef.value = ref)}
          onClick={(e) => foundation.handleClick(e)}
          style={style}
          id={id}
          tabindex={tabIndex}
          aria-activedescendant={focusIndex !== -1 ? `${selectID}-option-${focusIndex}` : ''}
          onMouseenter={onMouseEnter}
          onMouseleave={onMouseLeave}
          onFocus={(e) => foundation.handleTriggerFocus(e)}
          onBlur={(e) => foundation.handleTriggerBlur(e as any)}
          onKeypress={onKeyPress}
          {...keyboardEventSet}
          {...getDataAttr()}
        >
          {inner}
        </div>
      );
    }

    return () => {
      const { direction } = context_.value;
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
        dropdownMargin,
      } = props;
      const { isOpen, optionKey } = state;
      const optionList = renderOptions(props.children ? props.children : null);
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
          disableArrowKeyDown={true}
          onVisibleChange={(status) => handlePopoverVisibleChange(status)}
          afterClose={() => foundation.handlePopoverClose()}
        >
          {selection}
        </Popover>
      );
    };
  },
});

const Select = defineComponent({
  props: { ...vuePropsType },
  name: 'Select',
  setup(props, {slots}){
    const {getProps} = useHasInProps()

    return ()=>{
      const children = getFragmentChildren(slots);
      return <Index {...getProps(props)} children={children || []}/>
    }
  }
});
export type SelectType = typeof Select & {
  Option: typeof Option
}
const baseSelect = Select as SelectType
baseSelect.Option = Option
export default baseSelect
export { Option as SelectOption, OptionGroup as SelectOptionGroup };
