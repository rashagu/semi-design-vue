import {
  defineComponent,
  ref,
  h,
  TextareaHTMLAttributes,
  reactive,
  watch,
  CSSProperties,
  onMounted,
  onUnmounted, VNode
} from 'vue'
import * as PropTypes from '../PropTypes';

import cls from 'classnames';
import TextAreaFoundation from '@douyinfe/semi-foundation/input/textareaFoundation';
import {cssClasses} from '@douyinfe/semi-foundation/input/constants';
import {useBaseComponent, ValidateStatus} from '../_base/baseComponent';
import '@douyinfe/semi-foundation/input/textarea.scss';
import {noop, omit, isFunction} from 'lodash';
import {IconClear} from '@kousum/semi-icons-vue';
import {vuePropsMake} from "../PropTypes";

const prefixCls = cssClasses.PREFIX;

type OmitTextareaAttr =
  | 'onChange'
  | 'onInput'
  | 'prefix'
  | 'size'
  | 'onFocus'
  | 'onBlur'
  | 'onKeydown'
  | 'onKeypress'
  | 'onKeyup';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes, OmitTextareaAttr> {
  style?: CSSProperties;
  autosize?: boolean;
  borderless?: boolean;
  placeholder?: string;
  value?: string;
  rows?: number;
  cols?: number;
  maxCount?: number;
  validateStatus?: ValidateStatus;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  showCounter?: boolean;
  showClear?: boolean;
  onClear?: (e: Event) => void;
  onChange?: (value: string, e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onKeyDown?: (e: Event) => void;
  onKeyUp?: (e: Event) => void;
  onKeyPress?: (e: Event) => void;
  onEnterPress?: (e: Event) => void;
  onPressEnter?: (e: Event) => void;
  onResize?: (data: { height: number }) => void;
  getValueLength?: (value: string) => number;
  forwardRef?: ((instance: HTMLTextAreaElement) => void) | any | null;
  minlength?: number,
  maxlength?: number,
  class?: string,

}

export interface TextAreaState {
  value: string;
  isFocus: boolean;
  isHover: boolean;
  height: number;
  minlength: number;
  maxlength: number;
  cachedValue?: string;
}

const propTypes = {
  autosize: PropTypes.bool,
  borderless: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  maxCount: PropTypes.number,
  onEnterPress: PropTypes.func,
  validateStatus: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  showClear: PropTypes.bool,
  onClear: PropTypes.func,
  onResize: PropTypes.func,
  getValueLength: PropTypes.func,
  // TODO
  // resize: PropTypes.bool,


  class: {type: String, default: ''},
  defaultValue: {
    type: [String, Boolean, Object, Array, undefined],
// @ts-ignore
    default: undefined,
  },
  disabled: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  showCounter: {type: Boolean, default: false},
  minlength: Number,
  maxlength: Number,
  'onUpdate:value': Function,
  onChange: {
    type: Function,
    default: noop,
  },
  onBlur: {
    type: Function,
    default: noop,
  },
  onFocus: {
    type: Function,
    default: noop,
  },
  onInput: {
    type: Function,
    default: noop,
  },
  onKeyDown: {
    type: Function,
    default: noop,
  },
  onKeyUp: {
    type: Function,
    default: noop,
  },
  onKeyPress: {
    type: Function,
    default: noop,
  },
  onPressEnter: {
    type: Function,
    default: noop,
  },
  forwardRef: {
    type: Function,
    default: noop,
  },
};

const defaultProps = {
  autosize: false,
  borderless: false,
  rows: 4,
  cols: 20,
  showCounter: false,
  showClear: false,
  onEnterPress: noop,
  onChange: noop,
  onBlur: noop,
  onFocus: noop,
  onKeyDown: noop,
  onResize: noop,
  onClear: noop,
  // resize: false,
};

const VuePropsType = vuePropsMake(propTypes, defaultProps)
const TextArea = defineComponent<TextAreaProps>((props, {slots}) => {
  let focusing = false;
  let libRef = ref(null);
  let _resizeLock = false;
  let _resizeListener: any;

  const onUpdateValueFunc = props["onUpdate:value"]
  const state = reactive<TextAreaState>({
    value: '',
    isFocus: false, maxlength: 0,
    isHover: false,
    height: 0,
    minlength: props.minlength
  })
  const {adapter: adapterInject} = useBaseComponent<TextAreaProps>(props, state)

  const theAdapter = adapter()
  watch(() => state.value, () => {
    if (props.autosize) {
      foundation.resizeTextarea();
    }
  })

  function adapter() {
    return {
      ...adapterInject(),
      setValue: (value: string) => {
        if (onUpdateValueFunc) {
          onUpdateValueFunc(value)
        }
        state.value = value
      },
      getRef: () => libRef.value,
      toggleFocusing: (focusing: boolean) => state.isFocus = focusing,
      toggleHovering: (hovering: boolean) => state.isHover = hovering,
      notifyChange: (val: string, e: any) => {
        props.onChange(val, e);
      },
      notifyClear: (e: any) => props.onClear(e),
      notifyBlur: (val: string, e: any) => props.onBlur(e),
      notifyFocus: (val: string, e: any) => props.onFocus(e),
      notifyKeyDown: (e: any) => {
        props.onKeyDown(e);
      },
      notifyHeightUpdate: (height: number) => {
        state.height = height
        props.onResize({height});
      },
      notifyPressEnter: (e: any) => {
        props.onEnterPress && props.onEnterPress(e);
      },
      setMinLength: (minlength: number) => state.minlength = minlength,
    };
  }


  // ok
  function getDerivedStateFromProps(props: TextAreaProps, state: TextAreaState) {
    const willUpdateStates: Partial<TextAreaState> = {};

    if (props.value !== state.cachedValue) {
      willUpdateStates.value = props.value;
      willUpdateStates.cachedValue = props.value;
    }

    return willUpdateStates;
  }
  watch(()=>props.value, (val)=>{
    const newState = getDerivedStateFromProps(props, state)
    if (newState){
      Object.keys(newState).forEach(key=>{
        state[key] = newState[key]
      })
    }
  }, {immediate: true})

  onMounted(() => {

    foundation.init();
    _resizeListener = null;
    if (props.autosize) {
      // Working around Firefox bug which runs resize listeners even when other JS is running at the same moment
      // causing competing rerenders (due to setState in the listener) in React.
      // More can be found here - facebook/react#6324
      // // Reference to https://github.com/andreypopp/react-textarea-autosize/
      _resizeListener = () => {
        if (_resizeLock) {
          return;
        }
        _resizeLock = true;
        foundation.resizeTextarea(() => {
          _resizeLock = false;
        });
      };
      window.addEventListener('resize', _resizeListener);
    }
  })


  onUnmounted(() => {
    foundation.destroy();
    _resizeListener && window.removeEventListener('resize', _resizeListener);
  })

  watch([() => props.value, () => props.autosize,], (value, [prevValue, prevAutosize]) => {

    if (props.value !== prevValue && props.autosize) {
      foundation.resizeTextarea();
    }
  })


  const handleClear = (e: Event) => {
    foundation.handleClear(e);
  };

  function renderClearBtn() {
    const {showClear} = props;
    const displayClearBtn = foundation.isAllowClear();
    const clearCls = cls(`${prefixCls}-clearbtn`, {
      [`${prefixCls}-clearbtn-hidden`]: !displayClearBtn,
    });
    if (showClear) {
      return (
        <div
          class={clearCls}
          onClick={handleClear}
        >
          <IconClear/>
        </div>
      );
    }
    return null;
  }

  function renderCounter() {
    let counter: VNode,
      current: number,
      total: number,
      countCls: string;
    const {showCounter, maxCount, getValueLength} = props;
    if (showCounter || maxCount) {
      const {value} = state;
      // eslint-disable-next-line no-nested-ternary
      current = value ? isFunction(getValueLength) ? getValueLength(value) : value.length : 0;
      total = maxCount || null;
      countCls = cls(
        `${prefixCls}-textarea-counter`,
        {
          [`${prefixCls}-textarea-counter-exceed`]: current > total
        }
      );
      counter = (
        <div
          class={countCls}
        >
          {current}{total ? '/' : null}{total}
        </div>
      );
    } else {
      counter = null;
    }
    return counter;
  }

  // TODO later
  const setRef = (node: any) => {
    (libRef.value as any) = node;
    const {forwardRef} = props;
    if (typeof forwardRef === 'function') {
      forwardRef(node);
    } else if (forwardRef && typeof forwardRef === 'object') {
      // TODO
      forwardRef.current = node;
    }
  };


  let foundation: TextAreaFoundation = new TextAreaFoundation(theAdapter);


  return () => {
    const {
      autosize,
      placeholder,
      onEnterPress,
      onResize,
      // resize,
      disabled,
      readonly,
      class: className,
      showCounter,
      validateStatus,
      maxCount,
      defaultValue,
      style,
      forwardRef,
      getValueLength,
      maxlength,
      minlength,
      showClear,
      borderless,
      ...rest
    } = props;
    const {isFocus, value, minlength: stateMinLength} = state;
    const wrapperCls = cls(
      className,
      `${prefixCls}-textarea-wrapper`,
      {
        [`${prefixCls}-textarea-borderless`]: borderless,
        [`${prefixCls}-textarea-wrapper-disabled`]: disabled,
        [`${prefixCls}-textarea-wrapper-readonly`]: readonly,
        [`${prefixCls}-textarea-wrapper-${validateStatus}`]: Boolean(validateStatus),
        [`${prefixCls}-textarea-wrapper-focus`]: isFocus,
        // [`${prefixCls}-textarea-wrapper-resize`]: !autosize && resize,
      }
    );
    // const ref = this.props.forwardRef || this.textAreaRef;
    const itemCls = cls(
      `${prefixCls}-textarea`,
      {
        [`${prefixCls}-textarea-disabled`]: disabled,
        [`${prefixCls}-textarea-readonly`]: readonly,
        [`${prefixCls}-textarea-autosize`]: autosize,
        [`${prefixCls}-textarea-showClear`]: showClear,
      }
    );
    const itemProps = {
      ...omit(rest, 'insetLabel', 'insetLabelId', 'getValueLength', 'onClear', 'showClear'),
      className: itemCls,
      disabled,
      readOnly: readonly,
      placeholder: !placeholder ? null : placeholder,
      onInput: (e: any) => {
        // console.log(e)
        foundation._adapter.setValue(e.target.value)
      },
      onChange: (e: any) => foundation.handleChange(e.target.value, e),
      onFocus: (e: Event) => foundation.handleFocus(e),
      onBlur: (e: any) => foundation.handleBlur(e),
      onKeydown: (e: any) => {
        // console.log(e.target, foundation)
        // foundation.setInitValue()
        // foundation._adapter.setValue(e.target.value)
        foundation.handleKeyDown(e)
      },
      value: value === null || value === undefined ? '' : value,
    };
    if (!isFunction(getValueLength)) {
      (itemProps as any).maxLength = maxlength;
    }
    if (stateMinLength) {
      (itemProps as any).minLength = stateMinLength;
    }

    return (
      <div
        class={wrapperCls}
        style={style}
        onMouseenter={e => foundation.handleMouseEnter(e)}
        onMouseleave={e => foundation.handleMouseLeave(e)}
      >
        <textarea {...itemProps} ref={setRef}/>
        {renderClearBtn()}
        {renderCounter()}
      </div>
    );
  }
})


// @ts-ignore
TextArea.props = VuePropsType

export default TextArea
