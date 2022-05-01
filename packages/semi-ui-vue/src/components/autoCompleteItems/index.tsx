import {defineComponent, ref, h, Fragment, VNode, CSSProperties, reactive, onMounted, onUnmounted, watch} from 'vue'
import cls from 'classnames';
import { isEqual, noop } from 'lodash';
import { strings, cssClasses } from '@douyinfe/semi-foundation/autoComplete/constants';
import AutoCompleteFoundation, { AutoCompleteAdapter, StateOptionItem, DataItem } from '@douyinfe/semi-foundation/autoComplete/foundation';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import BaseComponent, {useBaseComponent, ValidateStatus} from '../_base/BaseComponent';

import { Position } from '@douyinfe/semi-foundation/tooltip/foundation';
import Spin from '../spin';
import Popover from '../popover';
import Input from '../input';
import Trigger from '../trigger';

import Option from '../select/Option';
import warning from '@douyinfe/semi-foundation/utils/warning';
import '@douyinfe/semi-foundation/autoComplete/autoComplete.scss';
import { Motion } from '../_base/base';
import {AriaAttributes} from "../AriaAttributes";
import {TooltipProps} from "../tooltip";

const prefixCls = cssClasses.PREFIX;
const sizeSet = strings.SIZE;
const positionSet = strings.POSITION;
const statusSet = strings.STATUS;


/**
 * AutoComplete is an enhanced Input (candidates suggest that users can choose or not),
 * and the Select positioning that supports Search is still a selector.
 * 1. When you click to expand, Select will clear all input values, but AutoComplete will not
 * 2. AutoComplete's renderSelectedItem only supports simple string returns, while Select's renderSelectedItem can return VNode | string
 * 3. Select props.value supports incoming object, but autoComplete only supports string (because the value needs to be displayed in Input)
 */

export interface BaseDataItem extends DataItem {
  label?: VNode | string;
}

export type AutoCompleteItems = BaseDataItem | string | number;
export interface AutoCompleteProps<T extends AutoCompleteItems> {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-label'?: AriaAttributes['aria-label'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  autoAdjustOverflow?: boolean;
  autoFocus?: boolean;
  className?: string;
  data?: T[];
  disabled?: boolean;
  defaultOpen?: boolean;
  defaultValue?: T;
  defaultActiveFirstOption?: boolean;
  dropdownMatchSelectWidth?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  emptyContent?: VNode | string | null;
  getPopupContainer?: () => HTMLElement;
  insetLabel?: VNode | string;
  insetLabelId?: string;
  id?: string;
  loading?: boolean;
  motion?: Motion;
  maxHeight?: string | number;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (value: string | number) => void;
  onSearch?: (inputValue: string) => void;
  onSelect?: (value: T) => void;
  onClear?: () => void;
  onChangeWithObject?: boolean;
  onSelectWithObject?: boolean;
  onDropdownVisibleChange?: (visible: boolean) => void;
  prefix?: VNode | string;
  placeholder?: string;
  position?: Position;
  renderItem?: (option: T) => VNode | string;
  renderSelectedItem?: (option: T) => string;
  size?: 'small' | 'default' | 'large';
  style?: CSSProperties;
  suffix?: VNode | string;
  showClear?: boolean;
  triggerRender?: (props?: any) => VNode | string;
  stopPropagation?: boolean | string;
  value?: string | number;
  validateStatus?: ValidateStatus;
  zIndex?: number;
}


interface KeyboardEventType {
  onKeydown?: any;
}

interface AutoCompleteState {
  dropdownMinWidth: null | number;
  inputValue: string | undefined | number;
  options: StateOptionItem[];
  visible: boolean;
  focusIndex: number;
  selection: Map<any, any>;
  rePosKey: number;
  keyboardEventSet?: KeyboardEventType;
}



export const vuePropsType = {
  label: [String, Object],
  'aria-describedby': String,
  'aria-errormessage': String,
  'aria-invalid': String,
  'aria-label': String,
  'aria-labelledby': String,
  'aria-required': String,
  autoAdjustOverflow: Boolean,
  autoFocus:{
    type: Boolean,
    default: false,
  },
  className: String,
  data: {
    type: Array,
    default: [],
  },
  disabled:{
    type: Boolean,
    default: false,
  },
  defaultOpen: Boolean,
  defaultValue:[Object,Array,],
  defaultActiveFirstOption:{
    type: Boolean,
    default: true,
  },
  dropdownMatchSelectWidth:{
    type: Boolean,
    default: true,
  },
  dropdownClassName: String,
  dropdownStyle: [Object, String, ],
  emptyContent:{
    type: [Object, String, Number,],
    default: null
  },
  getPopupContainer:Function,
  insetLabel: [Object, String, Number,],
  insetLabelId: String,
  id: String,
  loading:{
    type: Boolean,
    default: false,
  },
  motion:{
    type: [Boolean, String, Object],
    default: true,
  },
  maxHeight:{
    type: [Number, String],
    default: 300,
  },
  mouseEnterDelay:Number,
  mouseLeaveDelay:Number,
  onFocus: {
    type: Function,
    default: noop
  },
  onBlur: {
    type: Function,
    default: noop
  },
  onChange: {
    type: Function,
    default: noop
  },
  onSearch: {
    type: Function,
    default: noop
  },
  onSelect: {
    type: Function,
    default: noop
  },
  onClear: {
    type: Function,
    default: noop
  },
  onChangeWithObject:{
    type: Boolean,
    default: false,
  },
  onSelectWithObject:{
    type: Boolean,
    default: false,
  },
  onDropdownVisibleChange: {
    type: Function,
    default: noop
  },
  prefix:[Number, String, Object],
  placeholder: String,
  position:{
    type: String,
    default: 'bottomLeft',
  },
  renderItem: Function,
  renderSelectedItem: Function,
  size:{
    type: String,
    default: 'default',
  },
  style:[String, Object],
  suffix:[Number, String, Object],
  showClear:{
    type: Boolean,
    default: false,
  },
  triggerRender:Function,
  stopPropagation:{
    type: [Boolean, String],
    default: true,
  },
  value:[Number, String],
  validateStatus:{
    type: String,
    default: 'default',
  },
  zIndex:{
    type: Number,
    default: popoverNumbers.DEFAULT_Z_INDEX,
  },
}
const Index = defineComponent<AutoCompleteProps<any>>((props, {slots}) => {

  const triggerRef = ref(null)
  const optionsRef = ref(null)

  let clickOutsideHandler: () => void | null;

  const initRePosKey = 1;
  const state = reactive<AutoCompleteState>({
    dropdownMinWidth: null,
    inputValue: '',
    // option list
    options: [],
    // popover visible
    visible: false,
    // current focus option index
    focusIndex: props.defaultActiveFirstOption ? 0 : -1,
    // current selected options
    selection: new Map(),
    rePosKey: initRePosKey,
  });
  warning(
    'triggerRender' in props && typeof props.triggerRender === 'function',
    `[Semi AutoComplete] 
            - If you are using the following props: 'suffix', 'prefix', 'showClear', 'validateStatus', and 'size', 
            please notice that they will be removed in the next major version.
            Please use 'componentProps' to retrieve these props instead.
            - If you are using 'onBlur', 'onFocus', please try to avoid using them and look for changes in the future.`
  );
  const {cache, adapter: adapterInject, log, context} = useBaseComponent<AutoCompleteProps<any>>(props, state)
  const theAdapter = adapter()
  const foundation = new AutoCompleteFoundation(adapter());
  function adapter(): AutoCompleteAdapter<AutoCompleteProps<any>, AutoCompleteState> {
    const keyboardAdapter = {
      registerKeyDown: (cb: any): void => {
        const keyboardEventSet = {
          onKeydown: cb,
        };
        state.keyboardEventSet = keyboardEventSet
      },
      unregisterKeyDown: (cb: any): void => {
        state.keyboardEventSet = {}
      },
      updateFocusIndex: (focusIndex: number): void => {
        state.focusIndex = focusIndex
      },
    };
    return  {
      ...adapterInject<AutoCompleteProps<any>, AutoCompleteState>(),
      ...keyboardAdapter,
      getTriggerWidth: () => {
        // //console.log(triggerRef.value)
        const el = triggerRef.value;
        return el && el.getBoundingClientRect().width;
      },
      setOptionWrapperWidth: width => {
        // //console.log(width)
        state.dropdownMinWidth = width
      },
      updateInputValue: inputValue => {
        state.inputValue = inputValue
      },
      toggleListVisible: isShow => {
        //console.log(isShow)
        state.visible = isShow
      },
      updateOptionList: optionList => {
        // //console.log(optionList)
        state.options = optionList
      },
      updateSelection: selection => {
        state.selection = selection
      },
      notifySearch: inputValue => {
        props.onSearch(inputValue);
      },
      notifyChange: value => {
        props.onChange(value);
      },
      notifySelect: (option: StateOptionItem | string | number): void => {
        props.onSelect(option as any);
      },
      notifyDropdownVisibleChange: (isVisible: boolean): void => {
        props.onDropdownVisibleChange(isVisible);
      },
      notifyClear: () => {
        props.onClear();
      },
      notifyFocus: (event: FocusEvent) => {
        props.onFocus(event);
      },
      notifyBlur: (event: FocusEvent) => {
        props.onBlur(event);
      },
      rePositionDropdown: () => {
        let { rePosKey } = state;
        rePosKey = rePosKey + 1;
        state.rePosKey = rePosKey
      },
    }
  }

  onMounted(()=>{
    // //console.log(props.dropdownMatchSelectWidth)
    foundation.init();
  })
  onUnmounted(()=>{
    foundation.destroy();
  })

  watch(()=>props.data,()=>{
    foundation.handleDataChange(props.data);
  })
  watch(()=>props.value,()=>{
    foundation.handleValueChange(props.value);
  })


  const onSelect = (option: StateOptionItem, optionIndex: number, e: MouseEvent | KeyboardEvent): void => {
    //console.log('onSelect')
    foundation.handleSelect(option, optionIndex);
  };

  const onSearch = (value: any): void => {
    foundation.handleSearch(value);
  };

  const onBlur = (e:FocusEvent): void => foundation.handleBlur(e);

  const onFocus = (e:FocusEvent): void => foundation.handleFocus(e);

  const onInputClear = (): void =>{
    // //console.log('onInputClear')
    foundation.handleClear()
  };

  const handleInputClick = (e: MouseEvent): void => foundation.handleInputClick(e);

  function renderInput(): VNode | string {
    const {
      size,
      prefix,
      insetLabel,
      insetLabelId,
      suffix,
      placeholder,
      style,
      className,
      showClear,
      disabled,
      triggerRender,
      validateStatus,
      autoFocus,
      value,
      id,
    } = props;
    const { inputValue, keyboardEventSet, selection } = state;

    const useCustomTrigger = typeof triggerRender === 'function';

    const outerProps = {
      style,
      className: useCustomTrigger
        ? cls(className)
        : cls(
          {
            [prefixCls]: true,
            [`${prefixCls}-disabled`]: disabled,
          },
          className
        ),
      onClick: handleInputClick,
      ref: triggerRef,
      id,
      ...keyboardEventSet,
    };

    const innerProps = {
      disabled,
      placeholder,
      autofocus: autoFocus,
      onChange: onSearch,
      onClear: onInputClear,
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-invalid': props['aria-invalid'],
      'aria-errormessage': props['aria-errormessage'],
      'aria-describedby': props['aria-describedby'],
      'aria-required': props['aria-required'],
      // TODO: remove in next major version
      suffix,
      prefix: prefix || insetLabel,
      insetLabelId,
      showClear,
      validateStatus,
      size,
      onBlur: onBlur,
      onFocus: onFocus,
    };

    return (
      <div {...outerProps}>
        {typeof triggerRender === 'function' ? (
          <Trigger
            {...innerProps}
            inputValue={(typeof value !== 'undefined' ? value : inputValue) as string}
            value={Array.from(selection.values())}
            triggerRender={triggerRender}
            componentName="AutoComplete"
            componentProps={{ ...props }}
          />
        ) : (
          <Input {...innerProps} value={typeof value !== 'undefined' ? value : inputValue} />
        )}
      </div>
    );
  }

  function renderLoading() {
    const loadingWrapperCls = `${prefixCls}-loading-wrapper`;
    return (
      <div class={loadingWrapperCls}>
        <Spin />
      </div>
    );
  }

  function renderOption(option: StateOptionItem, optionIndex: number): VNode | string {
    const { focusIndex } = state;
    const isFocused = optionIndex === focusIndex;

    return (
      <Option
        showTick={false}
        onSelect={(v: StateOptionItem, e: MouseEvent | KeyboardEvent) => onSelect(v, optionIndex, e)}
        // selected={selection.has(option.label)}
        focused={isFocused}
        onMouseEnter={() => foundation.handleOptionMouseEnter(optionIndex)}
        key={option.key || option.label + option.value + optionIndex}
        {...option}
      >
        {option.label}
      </Option>
    );
  }

  function renderOptionList(): VNode | string {
    const { maxHeight, dropdownStyle, dropdownClassName, loading, emptyContent } = props;
    const { options, dropdownMinWidth } = state;
    const listCls = cls(
      {
        [`${prefixCls}-option-list`]: true,
      },
      dropdownClassName
    );

    let optionsNode;

    if (options.length === 0) {
      optionsNode = emptyContent;
    } else {
      optionsNode = options.filter(option => option.show).map((option, i) => renderOption(option, i));
    }

    //console.log(dropdownMinWidth)
    const style = {
      maxHeight: typeof maxHeight === 'number'?maxHeight+'px':maxHeight,
      minWidth: typeof dropdownMinWidth === 'number'?dropdownMinWidth+'px':dropdownMinWidth,
      ...dropdownStyle,
    };
    return (
      <div class={listCls} role="listbox" style={style}>
        {!loading ? optionsNode : renderLoading()}
      </div>
    );
  }


  return () => {
    const {
      position,
      motion,
      zIndex,
      mouseEnterDelay,
      mouseLeaveDelay,
      autoAdjustOverflow,
      stopPropagation,
      getPopupContainer,
    } = props;
    const { visible, rePosKey } = state;
    const input = renderInput();
    const optionList = renderOptionList();
    return (
      <Popover
        mouseEnterDelay={mouseEnterDelay}
        mouseLeaveDelay={mouseLeaveDelay}
        autoAdjustOverflow={autoAdjustOverflow}
        trigger="custom"
        motion={motion}
        visible={visible}
        content={optionList}
        position={position}
        ref={optionsRef}
        // TransformFromCenter TODO: need to confirm
        zIndex={zIndex}
        stopPropagation={stopPropagation}
        getPopupContainer={getPopupContainer}
        rePosKey={rePosKey}
      >
        {input}
      </Popover>
    );
  }
})

Index.props = vuePropsType

export default Index

