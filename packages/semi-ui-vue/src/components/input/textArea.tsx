import {
  defineComponent,
  ref,
  h,
  TextareaHTMLAttributes,
  reactive,
  watch,
  CSSProperties,
  onMounted,
  onUnmounted,
  VNode,
  ComponentObjectPropsOptions,
  PropType,
} from 'vue';
import * as PropTypes from '../PropTypes';

import cls from 'classnames';
import TextAreaFoundation from '@douyinfe/semi-foundation/input/textareaFoundation';
import { cssClasses } from '@douyinfe/semi-foundation/input/constants';
import { getProps, useBaseComponent, ValidateStatus } from '../_base/baseComponent';
import '@douyinfe/semi-foundation/input/textarea.scss';
import { noop, omit, isFunction, isUndefined, isObject, throttle } from 'lodash';
import type { DebouncedFunc } from 'lodash';
import { IconClear } from '@kousum/semi-icons-vue';
import { vuePropsMake } from '../PropTypes';
import ResizeObserver from '../resizeObserver';

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
  | 'onKeyUp'
  | 'onResize';

export type AutosizeRow = {
  minRows?: number;
  maxRows?: number;
};

export interface TextAreaProps extends Omit<TextareaHTMLAttributes, OmitTextareaAttr> {
  style?: CSSProperties;
  autosize?: boolean | AutosizeRow;
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
  autoFocus?: boolean;
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
  minlength?: number;
  maxlength?: number;
  class?: string;
  className?: string;
  'onUpdate:value'?: any;
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

const propTypes: ComponentObjectPropsOptions<TextAreaProps> = {
  autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  borderless: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  maxCount: PropTypes.number,
  onEnterPress: PropTypes.func as PropType<TextAreaProps['onEnterPress']>,
  validateStatus: PropTypes.string as PropType<TextAreaProps['validateStatus']>,
  className: PropTypes.string as PropType<TextAreaProps['className']>,
  style: PropTypes.object,
  showClear: PropTypes.bool,
  onClear: PropTypes.func as PropType<TextAreaProps['onClear']>,
  onResize: PropTypes.func as PropType<TextAreaProps['onResize']>,
  getValueLength: PropTypes.func as PropType<TextAreaProps['getValueLength']>,
  // TODO
  // resize: PropTypes.bool,

  class: { type: String, default: '' },
  defaultValue: {
    type: [String, Boolean, Object, Array, undefined] as PropType<TextAreaProps['defaultValue']>,
    // @ts-ignore
    default: undefined,
  },
  disabled: Boolean,
  readonly: Boolean,
  autoFocus: Boolean,
  showCounter: { type: Boolean, default: false },
  minlength: Number,
  maxlength: Number,
  'onUpdate:value': Function as PropType<TextAreaProps['onUpdate:value']>,
  onChange: {
    type: Function as PropType<TextAreaProps['onChange']>,
    default: noop,
  },
  onBlur: {
    type: Function as PropType<TextAreaProps['onBlur']>,
    default: noop,
  },
  onFocus: {
    type: Function as PropType<TextAreaProps['onFocus']>,
    default: noop,
  },
  onInput: {
    type: Function as PropType<TextAreaProps['onInput']>,
    default: noop,
  },
  onKeyDown: {
    type: Function as PropType<TextAreaProps['onKeyDown']>,
    default: noop,
  },
  onKeyUp: {
    type: Function as PropType<TextAreaProps['onKeyUp']>,
    default: noop,
  },
  onKeyPress: {
    type: Function as PropType<TextAreaProps['onKeyPress']>,
    default: noop,
  },
  onPressEnter: {
    type: Function as PropType<TextAreaProps['onPressEnter']>,
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

export const VuePropsType = vuePropsMake(propTypes, defaultProps);
const TextArea = defineComponent({
  props: VuePropsType,
  name: 'TextArea',
  setup(props, { slots }) {
    let focusing = false;
    let libRef = ref(null);
    const onUpdateValueFunc = props['onUpdate:value'];
    const initValue = 'value' in getProps(props) ? props.value : props.defaultValue;
    const state = reactive<TextAreaState>({
      value: initValue,
      isFocus: false,
      maxlength: 0,
      isHover: false,
      height: 0,
      minlength: props.minlength,
      cachedValue: props.value,
    });
    const { adapter: adapterInject } = useBaseComponent<TextAreaProps>(props, state);

    const theAdapter = adapter();
    watch(
      () => state.value,
      () => {
        if (props.autosize) {
          foundation.resizeTextarea();
        }
      }
    );

    function adapter() {
      return {
        ...adapterInject(),
        setValue: (value: string) => {
          if (onUpdateValueFunc) {
            onUpdateValueFunc(value);
          }
          state.value = value;
        },
        getRef: () => libRef.value,
        toggleFocusing: (focusing: boolean) => (state.isFocus = focusing),
        toggleHovering: (hovering: boolean) => (state.isHover = hovering),
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
          state.height = height;
          props.onResize({ height });
        },
        notifyPressEnter: (e: any) => {
          props.onEnterPress && props.onEnterPress(e);
        },
        setMinLength: (minlength: number) => (state.minlength = minlength),
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
    watch(
      () => props.value,
      (val) => {
        const newState = getDerivedStateFromProps({ ...props }, { ...state });
        if (newState) {
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      if (throttledResizeTextarea) {
        throttledResizeTextarea?.cancel?.();
        throttledResizeTextarea = null;
      }
    });

    // onUnmounted(() => {
    //   foundation.destroy();
    //   _resizeListener && window.removeEventListener('resize', _resizeListener);
    // })

    watch(
      [() => props.value, () => props.autosize, () => props.placeholder],
      (value, [prevValue, prevAutosize, prevPlaceholder]) => {
        if ((props.value !== prevValue || props.placeholder !== prevPlaceholder) && props.autosize) {
          foundation.resizeTextarea();
        }
      }
    );

    const handleClear = (e: Event) => {
      foundation.handleClear(e);
    };

    function renderClearBtn() {
      const { showClear } = props;
      const displayClearBtn = foundation.isAllowClear();
      const clearCls = cls(`${prefixCls}-clearbtn`, {
        [`${prefixCls}-clearbtn-hidden`]: !displayClearBtn,
      });
      if (showClear) {
        return (
          <div class={clearCls} onClick={handleClear}>
            <IconClear />
          </div>
        );
      }
      return null;
    }

    function renderCounter() {
      let counter: VNode, current: number, total: number, countCls: string;
      const { showCounter, maxCount, getValueLength } = props;
      if (showCounter || maxCount) {
        const { value } = state;
        // eslint-disable-next-line no-nested-ternary
        current = value ? (isFunction(getValueLength) ? getValueLength(value) : value.length) : 0;
        total = maxCount || null;
        countCls = cls(`${prefixCls}-textarea-counter`, {
          [`${prefixCls}-textarea-counter-exceed`]: current > total,
        });
        counter = (
          <div class={countCls}>
            {current}
            {total ? '/' : null}
            {total}
          </div>
        );
      } else {
        counter = null;
      }
      return counter;
    }

    // TODO later
    const setRef = (node: any) => {
      libRef.value = node;
      const { forwardRef } = props;
      if (typeof forwardRef === 'function') {
        forwardRef(node);
      } else if (forwardRef && typeof forwardRef === 'object') {
        // TODO
        forwardRef.current = node;
      }
    };

    let foundation: TextAreaFoundation = new TextAreaFoundation(theAdapter);
    let throttledResizeTextarea: DebouncedFunc<typeof foundation.resizeTextarea> = throttle(
      foundation.resizeTextarea,
      10
    );

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
        autoFocus,
        getValueLength,
        maxlength,
        minlength,
        showClear,
        borderless,
        ...rest
      } = props;
      const { isFocus, value, minlength: stateMinLength } = state;
      const wrapperCls = cls(className, `${prefixCls}-textarea-wrapper`, {
        [`${prefixCls}-textarea-borderless`]: borderless,
        [`${prefixCls}-textarea-wrapper-disabled`]: disabled,
        [`${prefixCls}-textarea-wrapper-readonly`]: readonly,
        [`${prefixCls}-textarea-wrapper-${validateStatus}`]: Boolean(validateStatus),
        [`${prefixCls}-textarea-wrapper-focus`]: isFocus,
        // [`${prefixCls}-textarea-wrapper-resize`]: !autosize && resize,
      });
      // const ref = this.props.forwardRef || this.textAreaRef;
      const itemCls = cls(`${prefixCls}-textarea`, {
        [`${prefixCls}-textarea-disabled`]: disabled,
        [`${prefixCls}-textarea-readonly`]: readonly,
        [`${prefixCls}-textarea-autosize`]: isObject(autosize) ? isUndefined(autosize?.maxRows) : autosize,
        [`${prefixCls}-textarea-showClear`]: showClear,
      });
      const itemProps = {
        ...omit(rest, 'insetLabel', 'insetLabelId', 'getValueLength', 'onClear', 'showClear'),
        className: itemCls,
        disabled,
        autofocus: autoFocus || props.autofocus,
        readOnly: readonly,
        placeholder: !placeholder ? null : placeholder,
        onInput: (e: any) => {
          // console.log(e)
          foundation.handleChange(e.target.value, e);
        },
        onChange: (e: any) => {
          // foundation.handleChange(e.target.value, e)
        },
        onFocus: (e: Event) => foundation.handleFocus(e),
        onBlur: (e: any) => foundation.handleBlur(e),
        onKeydown: (e: any) => {
          // console.log(e.target, foundation)
          // foundation.setInitValue()
          // foundation._adapter.setValue(e.target.value)
          foundation.handleKeyDown(e);
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
          onMouseenter={(e) => foundation.handleMouseEnter(e)}
          onMouseleave={(e) => foundation.handleMouseLeave(e)}
        >
          {autosize ? (
            <ResizeObserver onResize={throttledResizeTextarea}>
              <textarea {...itemProps} ref={setRef} />
            </ResizeObserver>
          ) : (
            <textarea {...itemProps} ref={setRef} />
          )}
          {renderClearBtn()}
          {renderCounter()}
        </div>
      );
    };
  },
});

export default TextArea;
