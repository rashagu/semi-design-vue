import {defineComponent, ref, h, Fragment, reactive, CSSProperties, VNode, nextTick, watch} from 'vue'
import * as PropTypes from '../PropTypes';
import classNames from 'classnames';
import {noop, get, values} from 'lodash';

import ConfigContext from '../configProvider/ConfigContextProvider';
import BaseComponent, {useBaseComponent, ValidateStatus} from '../_base/baseComponent';
import {strings, cssClasses} from '@douyinfe/semi-foundation/timePicker/constants';
import Popover from '../popover';
import {numbers as popoverNumbers} from '@douyinfe/semi-foundation/popover/constants';
import TimePickerFoundation, {TimePickerAdapter} from '@douyinfe/semi-foundation/timePicker/foundation';
import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import Combobox from './Combobox';
import TimeInput from './TimeInput';

import {PanelShape, PanelShapeDefaults} from './PanelShape';
import {TimeShape} from './TimeShape';

import '@douyinfe/semi-foundation/timePicker/timePicker.scss';
import Trigger from '../trigger';

import {InputSize} from '../input';
import type {Position} from '../tooltip';
import {ScrollItemProps} from '../scrollList/scrollItem';
import {Locale} from '../locale/interface';
import {Motion} from '../_base/base';
import {vuePropsMake} from "../PropTypes";
import {AriaAttributes} from "../AriaAttributes";
import {RadioGroupProps} from "../radio/RadioGroup";
import {AutoCompleteProps} from "../autoCompleteItems";

export interface Panel {
  panelHeader?: VNode | string;
  panelFooter?: VNode | string;
}

export type BaseValueType = string | number | Date;

export type Type = 'time' | 'timeRange';

export type TimePickerProps = {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  autoAdjustOverflow?: boolean;
  autoFocus?: boolean; // TODO: autoFocus did not take effect
  className?: string;
  clearText?: string;
  dateFnsLocale?: Locale['dateFnsLocale'];
  defaultOpen?: boolean;
  defaultValue?: BaseValueType | BaseValueType[];
  disabled?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  focusOnOpen?: boolean;
  format?: string;
  getPopupContainer?: () => HTMLElement;
  hideDisabledOptions?: boolean;
  hourStep?: number;
  id?: string;
  inputReadOnly?: boolean;
  inputStyle?: CSSProperties;
  insetLabel?: VNode | string;
  insetLabelId?: string;
  locale?: Locale['TimePicker'];
  localeCode?: string;
  minuteStep?: number;
  motion?: Motion;
  open?: boolean;
  panelFooter?: VNode | string;
  panelHeader?: VNode | string;
  panels?: Panel[]; // FIXME:
  placeholder?: string;
  popupClassName?: string;
  popupStyle?: CSSProperties;
  position?: Position;
  prefixCls?: string;
  rangeSeparator?: string;
  scrollItemProps?: ScrollItemProps<any>;
  secondStep?: number;
  showClear?: boolean;
  size?: InputSize;
  style?: CSSProperties;
  timeZone?: string | number;
  triggerRender?: (props?: any) => VNode | string;
  type?: Type;
  use12Hours?: boolean;
  validateStatus?: ValidateStatus;
  value?: BaseValueType | BaseValueType[];
  zIndex?: number | string;
  onBlur?: any;
  onChange?: TimePickerAdapter['notifyChange'];
  onChangeWithDateFirst?: boolean;
  onFocus?: any;
  onOpenChange?: (open: boolean) => void;
};

export interface TimePickerState {
  open: boolean;
  value: Date[];
  inputValue: string;
  currentSelectPanel: string | number;
  isAM: [boolean, boolean];
  showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
  invalid: boolean;
}

export const propTypes = {
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-errormessage': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-required': PropTypes.bool,
  prefixCls: PropTypes.string,
  clearText: {type: PropTypes.string, default: 'clear'},
  value: TimeShape,
  inputReadOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  showClear: PropTypes.bool,
  defaultValue: TimeShape,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onOpenChange: {type: PropTypes.func, default: noop},
  position: PropTypes.any,
  getPopupContainer: {type: PropTypes.func, default: () => document.body},
  placeholder: PropTypes.string,
  format: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  popupClassName: PropTypes.string,
  popupStyle: PropTypes.object,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  hideDisabledOptions: PropTypes.bool,
  onChange: PropTypes.func,
  use12Hours: PropTypes.bool,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  focusOnOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  panels: PropTypes.array,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  dateFnsLocale: PropTypes.object,
  zIndex: {
    type: [PropTypes.number, PropTypes.string],
    default: popoverNumbers.DEFAULT_Z_INDEX
  },
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  validateStatus: PropTypes.string,
  type: PropTypes.string,
  rangeSeparator: {type: PropTypes.string, default: strings.DEFAULT_RANGE_SEPARATOR},
  triggerRender: PropTypes.func,
  timeZone: [PropTypes.string, PropTypes.number],
  scrollItemProps: PropTypes.object,
  motion: [PropTypes.bool, PropTypes.func, PropTypes.object],
  autoAdjustOverflow: {type: PropTypes.bool, default: true},
  ...PanelShape,
  inputStyle: PropTypes.object,
}
export const defaultProps = {
  autoAdjustOverflow: true,
  getPopupContainer: () => document.body,
  showClear: true,
  zIndex: popoverNumbers.DEFAULT_Z_INDEX,
  rangeSeparator: strings.DEFAULT_RANGE_SEPARATOR,
  onOpenChange: noop,
  clearText: 'clear',
  prefixCls: cssClasses.PREFIX,
  inputReadOnly: false,
  style: {},
  className: '',
  popupClassName: '',
  popupStyle: {left: '0px', top: '0px'},
  disabledHours: () => [] as number[],
  disabledMinutes: () => [] as number[],
  disabledSeconds: () => [] as number[],
  hideDisabledOptions: false,
  // position: 'bottomLeft',
  onFocus: noop,
  onBlur: noop,
  onChange: noop,
  onChangeWithDateFirst: true,
  use12Hours: false,
  focusOnOpen: false,
  onKeyDown: noop,
  size: 'default' as const,
  type: strings.DEFAULT_TYPE,
  open: undefined,
  ...PanelShapeDefaults,
  // format: strings.DEFAULT_FORMAT,
  // open and value controlled
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
// console.log(vuePropsType)
// debugger
const TimePicker = defineComponent<TimePickerProps>((props, {slots}) => {

  console.log(props,'value' in (props as any))
  const {format = strings.DEFAULT_FORMAT} = props;
  const state = reactive<TimePickerState>({
    open: props.open || props.defaultOpen || false,
    value: [], // Date[]
    inputValue: '', // time string
    currentSelectPanel: 0,
    isAM: [true, false],
    showHour: Boolean(format.match(/HH|hh|H|h/g)),
    showMinute: Boolean(format.match(/mm/g)),
    showSecond: Boolean(format.match(/ss/g)),
    invalid: undefined
  })
  const timePickerRef = ref()
  const savePanelRef = ref()

  let clickOutSideHandler: (e: MouseEvent) => void;
  const {
    cache,
    adapter: adapterInject,
    log,
    context: context_,
    isControlled
  } = useBaseComponent<TimePickerProps>(props, state)

  const foundation: TimePickerFoundation = new TimePickerFoundation(adapter());

  function adapter(): TimePickerAdapter<TimePickerProps, TimePickerState> {
    return {
      ...adapterInject<TimePickerProps, TimePickerState>(),
      togglePanel: show => {
        state.open = show
      },
      registerClickOutSide: () => {
        if (clickOutSideHandler) {
          adapter().unregisterClickOutSide();
        }
        clickOutSideHandler = e => {
          // const panel = this.savePanelRef && this.savePanelRef.current;
          console.log(savePanelRef.value, e.target)
          const panel = savePanelRef.value;
          const isInPanel = e.target && panel && panel.contains(e.target as Node);
          // const isInTimepicker =
          //   timePickerRef &&
          //   timePickerRef.current &&
          //   timePickerRef.current.contains(e.target as Node);
          const isInTimepicker = timePickerRef.value.contains(e.target as Node);


          if (!isInTimepicker && !isInPanel) {
            const clickedOutside = true;
            foundation.handlePanelClose(clickedOutside, e);
          }
        };
        document.addEventListener('mousedown', clickOutSideHandler);
      },
      setInputValue: (inputValue, cb) => {
        state.inputValue = inputValue
        nextTick(() => {
          cb()
        })
      },
      unregisterClickOutSide: () => {
        if (clickOutSideHandler) {
          document.removeEventListener('mousedown', clickOutSideHandler);
          clickOutSideHandler = null;
        }
      },
      notifyOpenChange: (...args) => props.onOpenChange(...args),
      notifyChange: (agr1, arg2) => props.onChange && props.onChange(agr1, arg2),
      notifyFocus: (...args) => props.onFocus && props.onFocus(...args),
      notifyBlur: (...args) => props.onBlur && props.onBlur(...args),
      isRangePicker: () => props.type === strings.TYPE_TIME_RANGE_PICKER,
    };
  }

  // ok
  function getDerivedStateFromProps(nextProps: TimePickerProps, prevState: TimePickerState) {
    if ('open' in nextProps && nextProps.open !== prevState.open) {
      return {
        open: nextProps.open,
      };
    }
    return null;
  }
  watch(()=>props.open, (val)=>{
    const newState = getDerivedStateFromProps(props, state)
    if (newState){
      Object.keys(newState).forEach(key=>{
        state[key] = newState[key]
      })
    }
  })


  watch([() => props.value, () => props.timeZone], (value, oldValue) => {

    if (isControlled('value') && value[0] !== oldValue[0]) {
      foundation.refreshProps({
        ...props,
      });
    } else if (value[1] !== oldValue[1]) {
      foundation.refreshProps({
        timeZone: props.timeZone,
        __prevTimeZone: oldValue[1],
        value: state.value,
      });
    }
  })


  const onCurrentSelectPanelChange = (currentSelectPanel: string) => {
    state.currentSelectPanel = currentSelectPanel
  };

  const handlePanelChange = (
    value: { isAM: boolean; value: string; timeStampValue: number },
    index: number
  ) => {
    console.log(value)
    foundation.handlePanelChange(value, index)
  };

  const handleInput = (value: string) => {
    console.log(value)
    foundation.handleInputChange(value)
  };

  const createPanelProps = (index = 0) => {
    const {panels, panelFooter, panelHeader, locale} = props;

    const panelProps = {
      panelHeader,
      panelFooter,
    };

    if (adapter().isRangePicker()) {
      const defaultHeaderMap = {
        0: locale.begin,
        1: locale.end,
      };

      panelProps.panelHeader = get(
        panels,
        index,
        isNullOrUndefined(panelHeader) ? get(defaultHeaderMap, index, null) : panelHeader
      );
      panelProps.panelFooter = get(panels, index, panelFooter) as VNode;
    }

    return panelProps;
  };

  function getPanelElement() {
    const {prefixCls, type} = props;
    const {isAM, value} = state;
    console.log(state)

    const format = foundation.getDefaultFormatIfNeed();

    const props0 = {
      ...props,
      key: 0,
      format,
      isAM: isAM[0],
      timeStampValue: value[0],
      prefixCls: `${prefixCls}-panel`,
      onCurrentSelectPanelChange: onCurrentSelectPanelChange,
      ...createPanelProps(0),
      onChange: v => handlePanelChange(v, 0)
    }
    const timePanels = [
      <Combobox
        {...props0}
      />,
    ];

    if (type === strings.TYPE_TIME_RANGE_PICKER) {
      const props1 = {
        ...props,
        key: 1,
        format,
        isAM: isAM[1],
        timeStampValue: value[1],
        prefixCls: `${prefixCls}-panel`,
        onChange: v => handlePanelChange(v, 1),
        onCurrentSelectPanelChange: onCurrentSelectPanelChange,
        ...createPanelProps(1),
      }
      timePanels.push(
        <Combobox
          {...props1}
        />
      );
    }

    const wrapCls = classNames({
      [cssClasses.RANGE_PANEL_LISTS]: adapter().isRangePicker(),
    });

    return (
      <div ref={savePanelRef} class={wrapCls}>
        {timePanels.map(panel => panel)}
      </div>
    );
  }

  function getPopupClassName() {
    const {use12Hours, prefixCls, popupClassName} = props;
    const {showHour, showMinute, showSecond} = state;
    let selectColumnCount = 0;
    if (showHour) {
      selectColumnCount += 1;
    }
    if (showMinute) {
      selectColumnCount += 1;
    }
    if (showSecond) {
      selectColumnCount += 1;
    }
    if (use12Hours) {
      selectColumnCount += 1;
    }
    return classNames(
      `${prefixCls}-panel`,
      popupClassName,
      {
        [`${prefixCls}-panel-narrow`]: (!showHour || !showMinute || !showSecond) && !use12Hours,
        [cssClasses.RANGE_PICKER]: adapter().isRangePicker(),
      },
      `${prefixCls}-panel-column-${selectColumnCount}`
    );
  }

  function focus() {
    // TODO this.picker is undefined, confirm keep this func or not
    // picker.focus();
  }

  function blur() {
    // TODO picker is undefined, confirm keep this func or not
    // picker.blur();
  }

  const handlePanelVisibleChange = (visible: boolean) => foundation.handleVisibleChange(visible);

  const openPanel = () => {
    foundation.handlePanelOpen();
  };

  const handleFocus = (e: any) => {
    foundation.handleFocus(e);
  };

  const handleBlur = (e: any) => foundation.handleInputBlur(e);

  const setTimePickerRef: any = node => (timePickerRef.value = node);


  return () => {
    const {
      prefixCls,
      placeholder,
      disabled,
      defaultValue,
      className,
      popupStyle,
      size,
      style,
      locale,
      localeCode,
      zIndex,
      getPopupContainer,
      insetLabel,
      insetLabelId,
      inputStyle,
      showClear,
      panelHeader,
      panelFooter,
      rangeSeparator,
      onOpenChange,
      onChangeWithDateFirst,
      popupClassName: propPopupClassName,
      hideDisabledOptions,
      use12Hours,
      minuteStep,
      hourStep,
      secondStep,
      scrollItemProps,
      triggerRender,
      motion,
      autoAdjustOverflow,
      ...rest
    } = props;
    const format = foundation.getDefaultFormatIfNeed();
    const position = foundation.getPosition();
    const useCustomTrigger = typeof triggerRender === 'function';

    const {open, inputValue, invalid, value} = state;
    const popupClassName = getPopupClassName();

    const headerPrefix = classNames({
      [`${prefixCls}-header`]: true,
    });

    const panelPrefix = classNames({
      [`${prefixCls}-panel`]: true,
      [`${prefixCls}-panel-${size}`]: size,
    });

    const inputProps = {
      ...rest,
      disabled,
      prefixCls,
      size,
      showClear: disabled ? false : showClear,
      style: inputStyle,
      value: inputValue,
      onFocus: handleFocus,
      insetLabel,
      insetLabelId,
      format,
      locale,
      localeCode,
      invalid,
      placeholder,
      onChange: handleInput,
      onBlur: handleBlur,
    };

    const outerProps = {} as { onClick: () => void };

    if (useCustomTrigger) {
      outerProps.onClick = openPanel;
    }

    return (
      <div
        ref={setTimePickerRef}
        class={classNames({[prefixCls]: true}, className)}
        style={style}
        {...outerProps}
      >
        <Popover
          getPopupContainer={getPopupContainer}
          zIndex={zIndex as number}
          prefixCls={panelPrefix}
          contentClassName={popupClassName}
          style={popupStyle}
          content={getPanelElement()}
          trigger={'custom'}
          position={position}
          visible={disabled ? false : Boolean(open)}
          motion={motion}
          autoAdjustOverflow={autoAdjustOverflow}
        >
          {useCustomTrigger ? (
            <Trigger
              triggerRender={triggerRender}
              disabled={disabled}
              value={value}
              inputValue={inputValue}
              onChange={handleInput}
              placeholder={placeholder}
              componentName={'TimePicker'}
              componentProps={{...props}}
            />
          ) : (
            <span class={headerPrefix}>
                            <TimeInput {...inputProps} />
                        </span>
          )}
        </Popover>
      </div>
    );
  }
})

TimePicker.props = vuePropsType

export default TimePicker

