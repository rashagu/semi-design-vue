import {defineComponent, ref, h, Fragment, reactive} from 'vue'
import * as PropTypes from '../PropTypes';
import classNames from 'classnames';
import { strings } from '@douyinfe/semi-foundation/timePicker/constants';
import { noop } from 'lodash';

import Input from '../input';
import BaseComponent, {BaseProps, useBaseComponent} from '../_base/baseComponent';
import InputFoundation, { TimeInputAdapter } from '@douyinfe/semi-foundation/timePicker/inputFoundation';
import { IconClock } from '@kousum/semi-icons-vue';
import { TimePickerProps } from './TimePicker';


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
  'validateStatus'> & BaseProps & {
  onChange?: (value: string) => void;
  onEsc?: () => void;
  onClick?: any;
  defaultOpenValue?: boolean;
  currentSelectPanel?: string;
  timeStampValue?: any;
  invalid?: boolean;
};


export const vuePropsType = {
  value:String,
  format: {type: PropTypes.string, default:strings.DEFAULT_FORMAT},
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  clearText: PropTypes.string,
  inputReadOnly: {type: PropTypes.bool, default: false},
  hourOptions: PropTypes.array,
  minuteOptions: PropTypes.array,
  secondOptions: PropTypes.array,
  disabledHours: {type: PropTypes.func, default: noop},
  disabledMinutes: {type: PropTypes.func, default: noop},
  disabledSeconds: {type: PropTypes.func, default: noop},
  onChange: {type: PropTypes.func, default: noop},
  onFocus: {type: PropTypes.func, default: noop},
  onBlur: {type: PropTypes.func, default: noop},
  onEsc: PropTypes.func,
  onClick: {type: PropTypes.func, default: noop},
  defaultOpenValue: PropTypes.object,
  currentSelectPanel: PropTypes.string,
  focusOnOpen: PropTypes.bool,
  timeStampValue: PropTypes.any,
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  insetLabel: PropTypes.node,
  validateStatus: PropTypes.string,
}
const TimeInput = defineComponent<TimeInputProps>((props, {slots}) => {
  const state = reactive({
    // focusing: props.focusOnOpen,
  });
  const {cache, adapter: adapterInject, log, context} = useBaseComponent<TimeInputProps>(props, state)

  function adapter(): TimeInputAdapter {
    return {
      ...adapterInject<TimeInputProps>(),
      notifyChange: (...args) => props.onChange(...args),
      notifyFocus: (...args) => props.onFocus(...args),
      notifyBlur: (...args) => props.onBlur(...args),
    };
  }
  const foundation: InputFoundation = new InputFoundation(adapter());



  const setRef = (node: HTMLElement) => adapter().setCache('inputNode', node);

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
    console.log(value)
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
        onBlur={onBlur || handleBlur}
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
})

TimeInput.props = vuePropsType

export default TimeInput

