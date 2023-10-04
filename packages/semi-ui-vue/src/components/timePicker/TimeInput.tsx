import {defineComponent, ref, h, Fragment, reactive, onMounted, watch, ComponentObjectPropsOptions, PropType} from 'vue'
import * as PropTypes from '../PropTypes';
import classNames from 'classnames';
import { strings } from '@douyinfe/semi-foundation/timePicker/constants';
import { noop } from 'lodash';

import Input from '../input';
import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import InputFoundation, { TimeInputAdapter } from '@douyinfe/semi-foundation/timePicker/inputFoundation';
import { IconClock } from '@kousum/semi-icons-vue';
import { TimePickerProps } from './TimePicker';
import {vuePropsMake} from "../PropTypes";


export type TimeInputProps = Pick<TimePickerProps,
  'value' |
  'format' |
  'prefixCls' |
  'placeholder' |
  'clearText' |
  'inputReadOnly' |
  'disabled' |
  'type' |
  'timeZone' |
  'defaultOpen' |
  'disabledHours' |
  'disabledMinutes' |
  'disabledSeconds' |
  'dateFnsLocale' |
  'onFocus' |
  'onBlur' |
  'focusOnOpen' |
  'locale' |
  'localeCode' |
  'insetLabel' |
  'validateStatus' |
  'borderless'|
  'preventScroll'> & BaseProps & {
  onChange?: (value: string) => void;
  onEsc?: () => void;
  onClick?: any;
  defaultOpenValue?: boolean;
  currentSelectPanel?: string;
  timeStampValue?: any;
  invalid?: boolean;

  hourOptions?:any[]
  minuteOptions?:any[]
  secondOptions?:any[]
};


const propTypes:ComponentObjectPropsOptions<TimeInputProps> = {
  value:String,
  borderless: PropTypes.bool,
  format: {type: PropTypes.string, default:strings.DEFAULT_FORMAT},
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  clearText: PropTypes.string,
  inputReadOnly: {type: PropTypes.bool, default: false},
  hourOptions: PropTypes.array as PropType<TimeInputProps['hourOptions']>,
  minuteOptions: PropTypes.array as PropType<TimeInputProps['minuteOptions']>,
  secondOptions: PropTypes.array as PropType<TimeInputProps['secondOptions']>,
  disabledHours: {type: PropTypes.func as PropType<TimeInputProps['disabledHours']>, default: noop},
  disabledMinutes: {type: PropTypes.func as PropType<TimeInputProps['disabledMinutes']>, default: noop},
  disabledSeconds: {type: PropTypes.func as PropType<TimeInputProps['disabledSeconds']>, default: noop},
  onChange: {type: PropTypes.func as PropType<TimeInputProps['onChange']>, default: noop},
  onFocus: {type: PropTypes.func, default: noop},
  onBlur: {type: PropTypes.func, default: noop},
  onEsc: PropTypes.func as PropType<TimeInputProps['onEsc']>,
  onClick: {type: PropTypes.func, default: noop},
  defaultOpenValue: PropTypes.object,
  currentSelectPanel: PropTypes.string,
  focusOnOpen: PropTypes.bool,
  timeStampValue: PropTypes.any,
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  insetLabel: PropTypes.node as PropType<TimeInputProps['insetLabel']>,
  validateStatus: PropTypes.string as PropType<TimeInputProps['validateStatus']>,
  preventScroll: PropTypes.bool,
}
const defaultProps = {
  borderless: false,
  inputReadOnly: false,
  onChange: noop,
  onBlur: noop,
  onFocus: noop,
  onClick: noop,
  disabledHours: noop,
  disabledMinutes: noop,
  disabledSeconds: noop,
  format: strings.DEFAULT_FORMAT,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const TimeInput = defineComponent<TimeInputProps>((props, {slots}) => {
  const state = reactive<Record<any, any>>({
    // focusing: props.focusOnOpen,
  });
  const {adapter: adapterInject, isControlled} = useBaseComponent<TimeInputProps>(props, state)

  function adapter_(): TimeInputAdapter {
    return {
      ...adapterInject<TimeInputProps>(),
      notifyChange: (...args) => props.onChange(...args),
      notifyFocus: (...args) => props.onFocus(...args),
      notifyBlur: (...args) => props.onBlur(...args),
    };
  }
  const adapter = adapter_()
  const foundation: InputFoundation = new InputFoundation(adapter);

  onMounted(()=>{
    const { focusOnOpen, preventScroll } = props;
    if (focusOnOpen) {
      const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
      requestAnimationFrame(() => {
        const inputNode = adapter.getCache('inputNode');
        if (inputNode) {
          inputNode.focus({ preventScroll });
          inputNode.select();
        }
      });
    }
  })

  watch([
    ()=>props.timeStampValue,
    ()=>state.timeStampValue,
    ()=>props.value,
  ], (value, [a,b,prevPropsValue])=>{
    const { timeStampValue } = props;

    if (isControlled('timeStampValue') && timeStampValue !== state.timeStampValue) {
      foundation.restoreCursor();
    }

    if (props.value !== prevPropsValue) {
      foundation.restoreCursor();
    }
  }, {immediate: true})

  const setRef = (node: HTMLElement) => adapter.setCache('inputNode', node);

  const handleClick: any = e => props.onClick(e);

  const handleFocus: any = e => foundation.handleFocus(e);

  const handleBlur: any = e => foundation.handleBlur(e);

  const handleChange = (v: string) => foundation.handleChange(v);

  function getInput() {
    const {
      prefixCls,
      placeholder,
      inputReadOnly,
      onFocus,
      disabled,
      type,
      locale,
      localeCode,
      insetLabel,
      validateStatus,
      value,
      onChange,
      invalid,
      format,
      clearText,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      onEsc,
      defaultOpenValue,
      currentSelectPanel,
      focusOnOpen,
      timeStampValue,
      timeZone,
      defaultOpen,
      dateFnsLocale,
      onBlur,
      ...rest
    } = props;
    // const { focusing } = state;
    const inputCls = classNames(`${prefixCls}-input`, {
      [`${prefixCls}-input-invalid`]: invalid,
      [`${prefixCls}-input-readonly`]: inputReadOnly,
    });
    const mergeValidateStatus = invalid ? 'error' : validateStatus;
    // debugger
    return (
      <Input
        {...rest}
        hideSuffix
        className={inputCls}
        ref={setRef as any}
        value={value as any}
        placeholder={placeholder || locale.placeholder[type]}
        readonly={Boolean(inputReadOnly)}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        suffix={<IconClock onClick={handleClick} />}
        validateStatus={mergeValidateStatus}
        disabled={disabled}
        insetLabel={insetLabel}
      />
    );
  }


  return () => {
    const { prefixCls } = props;
    return <div class={`${prefixCls}-input-wrap`}>{getInput()}</div>;
  }
}, {
  props: vuePropsType,
  name: 'TimeInput'
})


export default TimeInput

