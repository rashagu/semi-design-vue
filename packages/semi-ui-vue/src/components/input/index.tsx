import {
  defineComponent,
  ref,
  h,
  InputHTMLAttributes,
  VNode,
  CSSProperties,
  reactive,
  watch,
  onMounted,
  Ref,
  ComponentObjectPropsOptions,
  PropType,
} from 'vue';
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import InputFoundation from '@douyinfe/semi-foundation/input/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/input/constants';
import { isSemiIcon, styleNum } from '../_utils';
import { useBaseComponent, useHasInProps } from '../_base/baseComponent';
import '@douyinfe/semi-foundation/input/input.scss';
import { isString, noop, isFunction, isUndefined } from 'lodash';
import { IconClear, IconEyeOpened, IconEyeClosedSolid } from '@kousum/semi-icons-vue';

const prefixCls = cssClasses.PREFIX;

const sizeSet = strings.SIZE;
const statusSet = strings.STATUS;
const modeSet = strings.MODE;

import type { InputGroupProps } from './inputGroup';
import type { TextAreaProps } from './textArea';
import { AriaAttributes } from '../AriaAttributes';
import { vuePropsMake } from '../PropTypes';
import { CombineProps, VueJsxNode } from '../interface';
export type { TextAreaProps, InputGroupProps };

export type InputSize = 'small' | 'large' | 'default';
export type InputMode = 'password';
// still keep success as ValidateStatus optional value because form will pass success as props.validateStatus in sometime
// Although we do not consume success in the input to configure special styles, we should allow it as a legal props value, otherwise a warning will be thrown
export type ValidateStatus = 'default' | 'error' | 'warning' | 'success';

export interface InputProps{
  role?: string,
  'aria-label'?: AriaAttributes['aria-label'];
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  addonBefore?: VueJsxNode;
  addonAfter?: VueJsxNode;
  prefix?: VueJsxNode;
  suffix?: VueJsxNode;
  mode?: InputMode;
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  autoFocus?: boolean;
  type?: string;
  showClear?: boolean;
  hideSuffix?: boolean;
  placeholder?: string;
  insetLabel?: VueJsxNode;
  insetLabelId?: string;
  size?: InputSize;
  className?: string;
  clearIcon?: VueJsxNode;
  style?: CSSProperties;
  validateStatus?: ValidateStatus;
  onClear?: (e: MouseEvent) => void;
  onChange?: (value: string, e: HashChangeEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onInput?: (e: Event) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
  onEnterPress?: (e: KeyboardEvent) => void;
  inputStyle?: CSSProperties;
  getValueLength?: (value: string) => number;
  forwardRef?: (((instance: any) => void) | any | null) | Ref;
  minlength?: number;
  maxlength?: number;
  preventScroll?: boolean /** internal prop, DatePicker use it */;
  showClearIgnoreDisabled?: boolean;
  borderless?: boolean;
  onlyBorder?: number;
  onCompositionstart?: any
  onCompositionend?: any
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

export const propTypes: CombineProps<InputProps> = {
  role: PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-errormessage': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-required': PropTypes.bool,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node,
  clearIcon: PropTypes.node,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  mode: String as PropType<InputProps['mode']>,
  value: PropTypes.any as PropType<InputProps['value']>,
  defaultValue: PropTypes.any as PropType<InputProps['defaultValue']>,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  showClear: PropTypes.bool,
  hideSuffix: PropTypes.bool,
  placeholder: PropTypes.any as PropType<InputProps['placeholder']>,
  size: String as PropType<InputProps['size']>,
  className: PropTypes.string,
  style: PropTypes.object,
  validateStatus: String as PropType<InputProps['validateStatus']>,
  onClear: PropTypes.func as PropType<InputProps['onClear']>,
  onChange: PropTypes.func as PropType<InputProps['onChange']>,
  onBlur: PropTypes.func as PropType<InputProps['onBlur']>,
  onFocus: PropTypes.func as PropType<InputProps['onFocus']>,
  onInput: PropTypes.func as PropType<InputProps['onInput']>,
  onKeyDown: PropTypes.func as PropType<InputProps['onKeyDown']>,
  onKeyUp: PropTypes.func as PropType<InputProps['onKeyUp']>,
  onKeyPress: PropTypes.func as PropType<InputProps['onKeyPress']>,
  onEnterPress: PropTypes.func as PropType<InputProps['onEnterPress']>,
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  inputStyle: PropTypes.object,
  getValueLength: PropTypes.func as PropType<InputProps['getValueLength']>,
  preventScroll: PropTypes.bool,
  borderless: PropTypes.bool,
  onlyBorder: PropTypes.number,

  minlength: Number,
  maxlength: Number,
  forwardRef: [PropTypes.object, PropTypes.func],
  showClearIgnoreDisabled: PropTypes.bool,
  onCompositionstart: PropTypes.func as PropType<InputProps['onCompositionstart']>,
  onCompositionend: PropTypes.func as PropType<InputProps['onCompositionend']>,
};

const defaultProps = {
  addonBefore: '',
  addonAfter: '',
  prefix: '',
  suffix: '',
  readonly: false,
  type: 'text',
  showClear: false,
  hideSuffix: false,
  placeholder: '',
  size: 'default',
  className: '',
  onClear: noop,
  onChange: noop,
  onBlur: noop,
  onFocus: noop,
  onInput: noop,
  onKeyDown: noop,
  onKeyUp: noop,
  onKeyPress: noop,
  onEnterPress: noop,
  validateStatus: 'default',
  borderless: false,
};
export const VuePropsType = vuePropsMake(propTypes, defaultProps);

// Vue在这里的话 state 更新会导致整体重新渲染 导致value 无法更新到最新的
const Input = defineComponent({
  props: VuePropsType,
  name: 'Input',
  setup(props, { slots, attrs }) {
    const { getProps } = useHasInProps();
    const initValue = 'value' in getProps(props) ? props.value : props.defaultValue;
    const state = reactive<InputState>({
      value: initValue,
      cachedValue: props.value, // Cache current props.value value
      disabled: false,
      props: {},
      paddingLeft: '',
      isFocus: false,
      isHovering: false,
      eyeClosed: props.mode === 'password',
      minlength: props.minlength,
      maxlength: props.maxlength,
    });
    const { adapter: adapterInject } = useBaseComponent<InputProps>(props, state);

    const theAdapter = adapter();
    // watch(()=>state.value,()=>{
    //   console.log(state.value)
    // })

    function adapter() {
      return {
        ...adapterInject<InputProps, InputState>(),
        setValue: (value: string) => {
          // const onUpdateValueFunc = props["onUpdate:value"]
          // // console.log('setValue',value)
          // if (onUpdateValueFunc){
          //   onUpdateValueFunc(value)
          // }
          state.value = value;
        },
        setEyeClosed: (value: boolean) => (state.eyeClosed = value),
        toggleFocusing: (isFocus: boolean) => {
          // const { preventScroll } = props;
          // const input = inputRef.value
          // if (isFocus) {
          //   input && input.focus({ preventScroll });
          // } else {
          //   input && input.blur();
          // }
          state.isFocus = isFocus;
        },
        focusInput: () => {
          const { preventScroll } = props;
          const input = inputRef && inputRef.value;
          input && input.focus({ preventScroll });
        },
        toggleHovering: (isHovering: boolean) => (state.isHovering = isHovering),
        getIfFocusing: () => state.isFocus,
        notifyChange: (cbValue: string, e: any) => {
          props.onChange(cbValue, e);
        },
        notifyBlur: (val: string, e: any) => props.onBlur(e),
        notifyFocus: (val: string, e: any) => props.onFocus(e),
        notifyInput: (e: any) => props.onInput(e),
        notifyKeyPress: (e: any) => props.onKeyPress(e),
        notifyKeyDown: (e: any) => props.onKeyDown(e),
        notifyKeyUp: (e: any) => props.onKeyUp(e),
        notifyEnterPress: (e: any) => props.onEnterPress(e),
        notifyClear: (e: any) => props.onClear(e),
        setMinLength: (minlength: number) => state.minlength,
        isEventTarget: (e: any) => e && e.target === e.currentTarget,
      };
    }
    let inputRef = ref(null);
    let prefixRef = ref(null);
    let suffixRef = ref(null);
    let foundation = new InputFoundation(theAdapter);

    // ok
    function getDerivedStateFromProps(props: InputProps, state: InputState) {
      const willUpdateStates: Partial<InputState> = {};

      if (props.value !== state.cachedValue) {
        willUpdateStates.value = props.value;
        willUpdateStates.cachedValue = props.value;
      }

      return willUpdateStates;
    }
    watch(
      () => props.value,
      (val) => {
        const newState = getDerivedStateFromProps({ ...getProps(props) }, { ...state });
        if (newState) {
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
        }
      },
      { immediate: true }
    );

    watch(
      () => props.mode,
      (prevPropsMode, nextPropsMode) => {
        if (prevPropsMode !== nextPropsMode) {
          handleModeChange(nextPropsMode);
        }
      }
    );

    onMounted(() => {
      foundation.init();
      const { disabled, autoFocus, preventScroll } = props;
      if (!disabled && (props.autoFocus || attrs.autofocus)) {
        inputRef.value.focus({ preventScroll });
      }
    });
    const handleClear = (e: any) => {
      foundation.handleClear(e);
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
    };

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
        return (
          <div class={prefixWrapperCls} x-semi-prop="addonBefore">
            {addonBefore}
          </div>
        );
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
        return (
          <div class={prefixWrapperCls} x-semi-prop="addonAfter">
            {addonAfter}
          </div>
        );
      }
      return null;
    }

    function renderClearBtn() {
      const clearCls = cls(`${prefixCls}-clearbtn`);
      const { clearIcon } = props;
      const allowClear = foundation.isAllowClear();
      // use onMousedown to fix issue 1203
      // console.debug(allowClear)
      if (allowClear) {
        return (
          <div class={clearCls} onMousedown={handleClear}>
            {clearIcon ? clearIcon : <IconClear />}
          </div>
        );
      }
      return null;
    }

    function renderModeBtn() {
      const { eyeClosed } = state;
      const { mode, disabled } = props;
      const modeCls = cls(`${prefixCls}-modebtn`);
      const modeIcon = eyeClosed ? <IconEyeClosedSolid /> : <IconEyeOpened />;
      // alway show password button for a11y
      const showModeBtn = mode === 'password' && !disabled;
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
      return (
        <div
          class={prefixWrapperCls}
          onMousedown={handlePreventMouseDown}
          onClick={handleClickPrefixOrSuffix}
          id={insetLabelId}
          x-semi-prop="prefix,insetLabel"
        >
          {labelNode}
        </div>
      );
    }

    // function showClearBtn() {
    //   const { value, isFocus, isHovering } = state;
    //   const { disabled, showClear } = props;
    //   return Boolean(value) && showClear && !disabled && (isFocus || isHovering);
    // }

    function renderSuffix(suffixAllowClear: boolean) {
      const { suffix, hideSuffix } = props;
      if (!suffix) {
        return null;
      }
      const suffixWrapperCls = cls({
        [`${prefixCls}-suffix`]: true,
        [`${prefixCls}-suffix-text`]: suffix && isString(suffix),
        [`${prefixCls}-suffix-icon`]: isSemiIcon(suffix),
        [`${prefixCls}-suffix-hidden`]: suffixAllowClear && Boolean(hideSuffix),
      });
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      return (
        <div
          class={suffixWrapperCls}
          onMousedown={handlePreventMouseDown}
          onClick={handleClickPrefixOrSuffix}
          x-semi-prop="suffix"
        >
          {suffix}
        </div>
      );
    }

    function getInputRef() {
      const { forwardRef } = props;
      if (!isUndefined(forwardRef)) {
        if (typeof forwardRef === 'function') {
          return (node: HTMLInputElement) => {
            forwardRef(node);
            inputRef.value = node;
          };
        } else if (Object.prototype.toString.call(forwardRef) === '[object Object]') {
          inputRef = forwardRef;
          return forwardRef;
        }
      }
      return inputRef.value;
    }

    // onMounted(()=>{
    //   console.log('onMounted')
    // })
    return () => {
      const {
        addonAfter,
        addonBefore,
        autoFocus,
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
        defaultValue,
        preventScroll,
        borderless,
        showClearIgnoreDisabled,
        onlyBorder,
        ...rest
      } = getProps(props);
      const { value, isFocus, minlength: stateMinLength } = state;
      const suffixAllowClear = foundation.isAllowClear();
      const suffixIsIcon = isSemiIcon(suffix);
      const ref_ = getInputRef();
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
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-only_border`]: onlyBorder !== undefined && onlyBorder !== null,
      });
      const inputCls = cls(prefixCls, {
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-sibling-clearbtn`]: foundation.isAllowClear(),
        [`${prefixCls}-sibling-modebtn`]: mode === 'password',
      });
      // console.debug(value === null || value === undefined)
      // const inputValue = value === null || value === undefined ? '' : value;
      const inputValue = value === null || value === undefined ? '' : value;
      const inputProps: InputHTMLAttributes = {
        ...attrs,
        ...rest,
        style: { ...inputStyle },
        autofocus: autoFocus,
        class: inputCls,
        disabled,
        readonly: readonly,
        type: foundation.handleInputType(type),
        placeholder: placeholder as string,
        onInput: (e: any) => {
          // console.log(e.target.value)
          // foundation.setValue(e.target.value);
          // foundation.handleInput(e);
          foundation.handleChange(e.target.value, e);
        },
        onChange: (e: any) => {
          // console.debug(e.target.value, e, props)
          // TODO 这里多调一次，会使AutoComplete这样的组件无法正常关闭下拉框
          // foundation.handleChange(e.target.value, e)
        },
        onFocus: (e: any) => foundation.handleFocus(e),
        onBlur: (e: any) => foundation.handleBlur(e),
        onKeyup: (e: any) => foundation.handleKeyUp(e),
        onKeydown: (e: any) => foundation.handleKeyDown(e),
        onKeypress: (e: any) => foundation.handleKeyPress(e),
        value: inputValue,
      };
      if (!isFunction(getValueLength)) {
        inputProps.maxlength = maxlength;
      }
      if (stateMinLength) {
        inputProps.minlength = stateMinLength;
      }
      if (validateStatus === 'error') {
        inputProps['aria-invalid'] = 'true';
      }

      let wrapperStyle = { ...style };
      if (onlyBorder !== undefined) {
        wrapperStyle = {
          borderWidth: styleNum(onlyBorder),
          ...style,
        };
      }

      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          class={wrapperCls}
          style={wrapperStyle}
          onMouseenter={(e: any) => handleMouseOver(e)}
          onMouseleave={(e: any) => handleMouseLeave(e)}
          onClick={(e) => handleClick(e)}
        >
          {renderPrepend()}
          {renderPrefix()}
          <input {...inputProps} ref={ref_} />
          {renderClearBtn()}
          {renderSuffix(suffixAllowClear)}
          {renderModeBtn()}
          {renderAppend()}
        </div>
      );
    };
  },
});

// const ForwardInput = defineComponent((props, {slots}) => {
//   console.log(props.ref)
//   return <Input {...props} forwardRef={ref} />
// })
// const ForwardInput = forwardRef<HTMLInputElement, Omit<InputProps, 'forwardRef'>>((props, ref) => <Input {...props} forwardRef={ref} />);

// export default ForwardInput;

export default Input;
export { Input };
