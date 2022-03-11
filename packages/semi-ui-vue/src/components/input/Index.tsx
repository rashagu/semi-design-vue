import {defineComponent, ref, h, InputHTMLAttributes, VNode, CSSProperties, reactive, watch, onMounted} from 'vue'
import cls from 'classnames';
import InputFoundation from '@douyinfe/semi-foundation/input/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/input/constants';
import { isSemiIcon } from '../_utils';
import BaseComponent, {useBaseComponent} from '../_base/BaseComponent';
import '@douyinfe/semi-foundation/input/input.scss';
import { isString, noop, isFunction } from 'lodash';
import { IconClear, IconEyeOpened, IconEyeClosedSolid } from '@kousum/semi-icons-vue';
import {TooltipProps} from "../tooltip/Index";

const prefixCls = cssClasses.PREFIX;

const sizeSet = strings.SIZE;
const statusSet = strings.STATUS;
const modeSet = strings.MODE;

export type InputSize = 'small' | 'large' | 'default';
export type InputMode = 'password';
// still keep success as ValidateStatus optional value because form will pass success as props.validateStatus in sometime
// Although we do not consume success in the input to configure special styles, we should allow it as a legal props value, otherwise a warning will be thrown
export type ValidateStatus = "default" | "error" | "warning" | "success";





export interface InputProps extends
  Omit<InputHTMLAttributes, 'onChange' | 'prefix' | 'size' | 'autoFocus' | 'placeholder' | 'onFocus' | 'onBlur'> {
  'aria-label'?: any;
  'aria-describedby'?: any;
  'aria-errormessage'?: any;
  'aria-invalid'?: any;
  'aria-labelledby'?: any;
  'aria-required'?: any;
  addonBefore?: VNode;
  addonAfter?: VNode;
  prefix?: VNode | string;
  suffix?: VNode;
  mode?: InputMode;
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  type?: string;
  showClear?: boolean;
  hideSuffix?: boolean;
  placeholder?: string;
  insetLabel?: VNode;
  insetLabelId?: string;
  size?: InputSize;
  className?: string;
  style?: CSSProperties;
  validateStatus?: ValidateStatus;
  onClear?: (e: MouseEvent) => void;
  onChange?: (value: string, e: HashChangeEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e:FocusEvent) => void;
  onInput?: (e: Event) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
  onEnterPress?: (e: KeyboardEvent) => void;
  inputStyle?: CSSProperties;
  getValueLength?: (value: string) => number;
  forwardRef?: ((instance: any) => void) | any | null;
  minlength?: number,
  maxlength?: number,
}

export interface InputState {
  value: string | number;
  cachedValue: string | number;
  disabled: boolean;
  props: Record<string, any>;
  paddingLeft: string;
  isFocus: boolean;
  isHovering: boolean;
  eyeClosed: boolean;
  minlength: number;
  maxlength: number;
}



export const VuePropsType = {
  'aria-label': String,
  'aria-labelledby': String,
  'aria-invalid': Boolean,
  'aria-errormessage': String,
  'aria-describedby': String,
  'aria-required': Boolean,
  addonBefore: {
    type: [String, Object],
    default:''
  },
  addonAfter: {
    type: [String, Object],
    default:''
  },
  prefix: {
    type: [String, Object],
    default:''
  },
  suffix: {
    type: [String, Object],
    default:''
  },
  mode: String,
  value: {
    type:[String,Boolean, Object,Array, undefined],
// @ts-ignore
    default: undefined,
  },
  defaultValue: {
    type:[String,Boolean, Object,Array, undefined],
// @ts-ignore
    default: undefined,
  },
  disabled: {type:Boolean,default:false},
  readonly: {type:Boolean,default:false},
  autofocus: Boolean,
  type: {type:String,default:'text'},
  showClear: {type:Boolean,default:false},
  hideSuffix: {type:Boolean,default:false},
  placeholder: {
    type: String,
    default:''
  },
  size: {type:String,default:'default'},
  className: {
    type: [String, Object],
    default:''
  },
  style: Object,
  validateStatus: {type:String,default:'default'},
  'onUpdate:value': Function,
  onClear: {type:Function, default:noop},
  onChange: {type:Function, default:noop},
  onBlur: {type:Function, default:noop},
  onFocus: {type:Function, default:noop},
  onInput: {type:Function, default:noop},
  onKeyDown: {type:Function, default:noop},
  onKeyUp: {type:Function, default:noop},
  onKeyPress: {type:Function, default:noop},
  onEnterPress: {type:Function, default:noop},
  insetLabel: Object,
  insetLabelId: String,
  inputStyle: Object,
  getValueLength: {type:Function, default:noop},
  minlength: Number,
  maxlength: Number,
}

export interface InputState {
  value: string|number;
  cachedValue: string|number;
  disabled: boolean;
  props: Record<string, any>;
  paddingLeft: string;
  isFocus: boolean;
  isHovering: boolean;
  eyeClosed: boolean;
  minlength: number;
  maxlength: number;
}

// Vue在这里的话 state 更新会导致整体重新渲染 导致value 无法更新到最新的
const Input = defineComponent<InputProps>((props, {slots}) => {

  const onUpdateValueFunc = props["onUpdate:value"]
  const state = reactive<InputState>({
    value: props.value || props.defaultValue ,
    cachedValue: null, // Cache current props.value value
    disabled: false,
    props: {},
    paddingLeft: '',
    isFocus: false,
    isHovering: false,
    eyeClosed: props.mode === 'password',
    minlength: props.minlength,
    maxlength: props.maxlength,
  })
  const {cache, adapter: adapterInject, log, context} = useBaseComponent<InputProps>(props, state)

  const theAdapter = adapter()
  // watch(()=>state.value,()=>{
  //   console.log(state.value)
  // })

  function adapter() {
    return {
      ...adapterInject<InputProps, InputState>(),
      setValue: (value: string) => {
        // console.log('setValue',value)
        if (onUpdateValueFunc){
          onUpdateValueFunc(value)
        }
        state.value = value
      },
      setEyeClosed: (value: boolean) => state.eyeClosed = value,
      toggleFocusing: (isFocus: boolean) => {
        const input = inputRef.value
        if (isFocus) {
          input && input.focus();
        } else {
          input && input.blur();
        }
        state.isFocus = isFocus;
      },
      toggleHovering: (isHovering: boolean) => state.isHovering = isHovering,
      getIfFocusing: () => state.isFocus,
      notifyChange: (cbValue: string, e: any) => props.onChange(cbValue, e),
      notifyBlur: (val: string, e: any) => props.onBlur(e),
      notifyFocus: (val: string, e: any) => props.onFocus(e),
      notifyInput: (e: any) => props.onInput(e),
      notifyKeyPress: (e: any) => props.onKeyPress(e),
      notifyKeyDown: (e: any) => props.onKeyDown(e),
      notifyKeyUp: (e: any) => props.onKeyUp(e),
      notifyEnterPress: (e: any) => props.onEnterPress(e),
      notifyClear: (e: any) => props.onClear(e),
      setPaddingLeft: (paddingLeft: string) => state.paddingLeft = paddingLeft,
      setMinLength: (minlength: number) => state.minlength,
      isEventTarget: (e: any) => e && e.target === e.currentTarget
    };
  }
  let inputRef = ref(null);
  let prefixRef = ref(null);
  let suffixRef = ref(null);
  let foundation =  new InputFoundation(theAdapter);


  function getDerivedStateFromProps(props: InputProps, state: InputState) {
    const willUpdateStates: Partial<InputState> = {};

    if (props.value !== state.cachedValue) {
      willUpdateStates.value = props.value;
      willUpdateStates.cachedValue = props.value;
    }

    return willUpdateStates;
  }

  watch(() => props.mode, (prevPropsMode, nextPropsMode) => {
    if (prevPropsMode !== nextPropsMode) {
      handleModeChange(nextPropsMode);
    }
  })



  const handleClear = (e: any) => {
    foundation.handleClear(e);
  };

  const handleClearEnterPress = (e: any) => {
    foundation.handleClearEnterPress(e);
  };

  const handleClick = (e: any) => {
    foundation.handleClick(e);
  };

  const handleMouseOver = (e: any) => {
    state.isHovering = true;
  };

  const handleMouseLeave = (e: any) => {
    state.isHovering = false;
  };

  const handleModeChange = (mode: string) => {
    foundation.handleModeChange(mode);
  };

  const handleClickEye = (e: any) => {
    foundation.handleClickEye(e);
  };

  const handleMouseDown = (e: any) => {
    foundation.handleMouseDown(e);
  };

  const handleMouseUp = (e: any) => {
    foundation.handleMouseUp(e);
  };

  const handleModeEnterPress = (e: any) => {
    foundation.handleModeEnterPress(e);
  }

  const handleClickPrefixOrSuffix = (e: any) => {
    foundation.handleClickPrefixOrSuffix(e);
  };

  const handlePreventMouseDown = (e: any) => {
    foundation.handlePreventMouseDown(e);
  };

  function renderPrepend() {
    const { addonBefore } = props;
    if (addonBefore) {
      const prefixWrapperCls = cls({
        [`${prefixCls}-prepend`]: true,
        [`${prefixCls}-prepend-text`]: addonBefore && isString(addonBefore),
        [`${prefixCls}-prepend-icon`]: isSemiIcon(addonBefore),
      });
      return <div class={prefixWrapperCls}>{addonBefore}</div>;
    }
    return null;
  }

  function renderAppend() {
    const { addonAfter } = props;
    if (addonAfter) {
      const prefixWrapperCls = cls({
        [`${prefixCls}-append`]: true,
        [`${prefixCls}-append-text`]: addonAfter && isString(addonAfter),
        [`${prefixCls}-append-icon`]: isSemiIcon(addonAfter),
      });
      return <div class={prefixWrapperCls}>{addonAfter}</div>;
    }
    return null;
  }

  function renderClearBtn() {
    const clearCls = cls(`${prefixCls}-clearbtn`);
    const allowClear = foundation.isAllowClear()
    // use onMousedown to fix issue 1203
    // console.debug(allowClear)
    if (allowClear) {
      return (
        <div
          role="button"
          tabindex={0}
          aria-label="Clear input value"
          class={clearCls}
          onMousedown={handleClear}
          onKeypress={handleClearEnterPress}
        >
          <IconClear />
        </div>
      );
    }
    return null;
  }

  function renderModeBtn() {
    const { value, isFocus, isHovering, eyeClosed } = state;
    const { mode, disabled } = props;
    const modeCls = cls(`${prefixCls}-modebtn`);
    const modeIcon = eyeClosed ? <IconEyeClosedSolid /> : <IconEyeOpened />;
    const showModeBtn = mode === 'password' && value && !disabled && (isFocus || isHovering);
    const ariaLabel = eyeClosed ? 'Show password' : 'Hidden password';
    if (showModeBtn) {
      return (
        <div
          role="button"
          tabindex={0}
          aria-label={ariaLabel}
          class={modeCls}
          onClick={handleClickEye}
          onMousedown={handleMouseDown}
          onMouseup={handleMouseUp}
          onKeypress={handleModeEnterPress}
        >
          {modeIcon}
        </div>
      );
    }
    return null;
  }

  function renderPrefix() {
    const { prefix, insetLabel, insetLabelId } = props;
    const labelNode = prefix || insetLabel;
    if (!labelNode) {
      return null;
    }
    const prefixWrapperCls = cls({
      [`${prefixCls}-prefix`]: true,
      [`${prefixCls}-inset-label`]: insetLabel,
      [`${prefixCls}-prefix-text`]: labelNode && isString(labelNode),
      [`${prefixCls}-prefix-icon`]: isSemiIcon(labelNode),
    });

    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    return <div class={prefixWrapperCls} onMousedown={handlePreventMouseDown} onClick={handleClickPrefixOrSuffix} id={insetLabelId}>{labelNode}</div>;
  }

  function showClearBtn() {
    const { value, isFocus, isHovering } = state;
    const { disabled, showClear } = props;
    return Boolean(value) && showClear && !disabled && (isFocus || isHovering);
  }

  function renderSuffix(suffixAllowClear: boolean) {
    const { suffix, hideSuffix } = props;
    if (!suffix) {
      return null;
    }
    const suffixWrapperCls = cls({
      [`${prefixCls }-suffix`]: true,
      [`${prefixCls }-suffix-text`]: suffix && isString(suffix),
      [`${prefixCls }-suffix-icon`]: isSemiIcon(suffix),
      [`${prefixCls}-suffix-hidden`]: suffixAllowClear && Boolean(hideSuffix),
    });
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    return <div class={suffixWrapperCls} onMousedown={handlePreventMouseDown} onClick={handleClickPrefixOrSuffix}>{suffix}</div>;
  }




  //
  watch(()=>props.value, ()=>{
    if (props.value!==null && props.value!==undefined){
      state.value = props.value
    }
  })

  // onMounted(()=>{
  //   console.log(props, props["onUpdate:value"])
  // })
  return () => {

    const {
      addonAfter,
      addonBefore,
      autofocus,
      className,
      disabled,
      placeholder,
      prefix,
      mode,
      insetLabel,
      insetLabelId,
      validateStatus,
      type,
      readonly,
      size,
      suffix,
      style,
      showClear,
      onEnterPress,
      onClear,
      hideSuffix,
      inputStyle,
      forwardRef,
      maxlength,
      getValueLength,
      value: propsValue,
      defaultValue: propsDefaultValue,
      ...rest
    } = props;
    const { value, paddingLeft, isFocus, minlength: stateMinLength } = state;
    const suffixAllowClear = showClearBtn();
    const suffixIsIcon = isSemiIcon(suffix);
    const ref_ = forwardRef || inputRef;
    const wrapperPrefix = `${prefixCls}-wrapper`;
    const wrapperCls = cls(wrapperPrefix, className, {
      [`${prefixCls}-wrapper__with-prefix`]: prefix || insetLabel,
      [`${prefixCls}-wrapper__with-suffix`]: suffix,
      [`${prefixCls}-wrapper__with-suffix-hidden`]: suffixAllowClear && Boolean(hideSuffix),
      [`${prefixCls}-wrapper__with-suffix-icon`]: suffixIsIcon,
      [`${prefixCls}-wrapper__with-append`]: addonBefore,
      [`${prefixCls}-wrapper__with-prepend`]: addonAfter,
      [`${prefixCls}-wrapper__with-append-only`]: addonBefore && !addonAfter,
      [`${prefixCls}-wrapper__with-prepend-only`]: !addonBefore && addonAfter,
      [`${wrapperPrefix}-readonly`]: readonly,
      [`${wrapperPrefix}-disabled`]: disabled,
      [`${wrapperPrefix}-warning`]: validateStatus === 'warning',
      [`${wrapperPrefix}-error`]: validateStatus === 'error',
      [`${wrapperPrefix}-focus`]: isFocus,
      [`${wrapperPrefix}-clearable`]: showClear,
      [`${wrapperPrefix}-modebtn`]: mode === 'password',
      [`${wrapperPrefix}-hidden`]: type === 'hidden',
      [`${wrapperPrefix}-${size}`]: size,
    });
    const inputCls = cls(prefixCls, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-sibling-clearbtn`]: foundation.isAllowClear(),
      [`${prefixCls}-sibling-modebtn`]: mode === 'password',
    });
    // console.debug(value === null || value === undefined)
    // const inputValue = value === null || value === undefined ? '' : value;
    const inputProps: InputHTMLAttributes = {
      ...rest,
      style: { paddingLeft, ...inputStyle },
      autofocus: autofocus,
      class: inputCls,
      disabled,
      readonly: readonly,
      type: foundation.handleInputType(type),
      placeholder: placeholder as string,
      onInput: (e:any) => {
        // console.log(e.target.value)
        foundation.setValue(e.target.value)
        foundation.handleInput(e);
      },
      onChange: (e:any) => {
        // console.debug(e.target.value, e, props)
        foundation.handleChange(e.target.value, e)
      },
      onFocus: (e:any) => foundation.handleFocus(e),
      onBlur: (e:any) => foundation.handleBlur(e),
      onKeyup: (e:any) => foundation.handleKeyUp(e),
      onKeydown: (e:any) => foundation.handleKeyDown(e),
      onKeypress: (e:any) => foundation.handleKeyPress(e),
    };
    if (!isFunction(getValueLength)) {
      inputProps.maxlength = maxlength;
    }
    if (stateMinLength) {
      inputProps.minlength = stateMinLength;
    }
    if (validateStatus === 'error') {
      inputProps['aria-invalid'] = "true";
    }
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        class={wrapperCls}
        style={style}
        onMouseenter={(e:any) => handleMouseOver(e)}
        onMouseleave={(e:any) => handleMouseLeave(e)}
        onClick={(e) => handleClick(e)}
      >
        {renderPrepend()}
        {renderPrefix()}
        <input {...inputProps} value={state.value} ref={ref_}/>
        {renderClearBtn()}
        {renderSuffix(suffixAllowClear)}
        {renderModeBtn()}
        {renderAppend()}
      </div>
    );
  }
})


Input.props = VuePropsType


// const ForwardInput = defineComponent<InputProps>((props, {slots}) => {
//   console.log(props.ref)
//   return <Input {...props} forwardRef={ref} />
// })
// const ForwardInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'forwardRef'>>((props, ref) => <Input {...props} forwardRef={ref} />);

// export default ForwardInput;

export default Input
export { Input, };
