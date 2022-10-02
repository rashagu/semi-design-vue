import {defineComponent, ref, h, Fragment, useSlots, reactive, onMounted, watch} from 'vue'

import { format as dateFnsFormat } from 'date-fns';
import { noop } from 'lodash';

import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import { strings } from '@douyinfe/semi-foundation/timePicker/constants';
import ScrollList from '../scrollList/index';
import {scrollItemFunc} from '../scrollList/scrollItem';
import ComboboxFoundation, { formatOption } from '@douyinfe/semi-foundation/timePicker/ComboxFoundation';
import LocaleConsumer_ from '../locale/localeConsumer';
import { TimePickerProps } from './TimePicker';
import { Locale } from '../locale/interface';
import {vuePropsMake} from "../PropTypes";
import * as PropTypes from "../PropTypes";
import {InputProps} from "../input";
const ScrollItemFormatOptionReturn = scrollItemFunc<FormatOptionReturn>()
const ScrollItemAMPMOptionItem = scrollItemFunc<AMPMOptionItem>()
const LocaleConsumer = LocaleConsumer_()
export type ComboboxProps = Pick<TimePickerProps, 'format' | 'prefixCls' | 'disabledHours' |
  'disabledMinutes' |
  'disabledSeconds' |
  'hideDisabledOptions' |
  'use12Hours' |
  'scrollItemProps' |
  'panelFooter' |
  'panelHeader'> & BaseProps & {
  defaultOpenValue?: TimePickerProps['value'];
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
  onChange?: (value: { isAM: boolean; value: string; timeStampValue: number }) => void;
  onCurrentSelectPanelChange?: (range: string) => void;
  isAM?: boolean;
  timeStampValue?: any;
};

export interface ComboboxState {
  showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
  hourOptions: number[];
  minuteOptions: number[];
  secondOptions: number[];
}

export type FormatOptionReturn = ReturnType<typeof formatOption>;
export interface AMPMOptionItem {
  value: string;
  text: string;
}


const defaultProps = {
  disabledHours: noop,
  disabledMinutes: noop,
  disabledSeconds: noop,
  format: strings.DEFAULT_FORMAT,
};


const staticPropTypes = {
  format: PropTypes.string,
  defaultOpenValue: PropTypes.object,
  prefixCls: PropTypes.string,
  onChange: PropTypes.func,
  showHour: PropTypes.bool,
  showMinute: PropTypes.bool,
  showSecond: PropTypes.bool,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  hideDisabledOptions: PropTypes.bool,
  onCurrentSelectPanelChange: PropTypes.func,
  use12Hours: PropTypes.bool,
  isAM: PropTypes.bool,
  timeStampValue: PropTypes.any,
  scrollItemProps: PropTypes.object,
};

const staticDefaultProps = {
  disabledHours: noop,
  disabledMinutes: noop,
  disabledSeconds: noop,
  format: strings.DEFAULT_FORMAT,
};
export const vuePropsType = vuePropsMake(staticPropTypes, staticDefaultProps)
const Combobox = defineComponent<ComboboxProps>((props, {}) => {
  const slots = useSlots()
  const state = reactive<ComboboxState>({
    hourOptions: [],
    minuteOptions: [],
    secondOptions: [],
    showHour: false,
    showMinute: false,
    showSecond: false
  })

  const {cache, adapter: adapterInject, log, context} = useBaseComponent<ComboboxProps>(props, state)

  const foundation = new ComboboxFoundation(adapterInject());

  function setState() {
    const foundationState = foundation.initData()
    for (const foundationKey in foundationState) {
      state[foundationKey] = foundationState[foundationKey]
    }
  }
  setState()

  watch([()=>props.timeStampValue, ()=>props.format], ()=>{
    setState()
  })





  const cacheRefCurrent = (key: string, current: any) => {
    if (key && typeof key === 'string') {
      adapterInject().setCache(key, current);
    }
  };

  const reselect = () => {
    const currentKeys = ['ampm', 'hour', 'minute', 'second'];

    currentKeys.forEach(key => {
      const current = adapterInject().getCache(key);

      if (current && current.scrollToIndex) {
        current.scrollToIndex();
      }
    });
  };

  const  onItemChange = ({ type, value, disabled }: { type?: string; value: string; disabled?: boolean; }) => {
    console.log({ type, value, disabled })
    // eslint-disable-next-line prefer-const
    let { onChange, use12Hours, isAM, format, timeStampValue } = props;
    const transformValue = foundation.getDisplayDateFromTimeStamp(timeStampValue);
    // TODO: foundation
    if (type === 'hour') {
      if (use12Hours) {
        if (isAM) {
          transformValue.setHours(Number(value) % 12);
        } else {
          transformValue.setHours((Number(value) % 12) + 12);
        }
      } else {
        transformValue.setHours(Number(value));
      }
    } else if (type === 'minute') {
      transformValue.setMinutes(Number(value));
    } else if (type === 'ampm') {
      const ampm = value.toUpperCase();
      if (use12Hours) {
        if (ampm === 'PM') {
          isAM = false;
          transformValue.getHours() < 12 && transformValue.setHours((transformValue.getHours() % 12) + 12);
        }

        if (ampm === 'AM') {
          isAM = true;
          transformValue.getHours() >= 12 && transformValue.setHours(transformValue.getHours() - 12);
        }
      }
    } else {
      transformValue.setSeconds(Number(value));
    }


    onChange &&
    onChange({
      isAM,
      value: dateFnsFormat(transformValue, format && format.replace(/(\s+)A/g, '$1a')), // dateFns only supports "h: mm: ss a"
      timeStampValue: Number(transformValue),
    });
  };

  const onEnterSelectPanel = (range: string) => {
    const { onCurrentSelectPanelChange } = props;

    onCurrentSelectPanelChange(range);
  };

  function renderHourSelect(hour: number, locale: Locale['TimePicker']) {
    const { prefixCls, disabledHours, use12Hours, scrollItemProps } = props;

    const { showHour, hourOptions } = state;

    if (!showHour) {
      return null;
    }
    const disabledOptions = disabledHours();

    let hourOptionsAdj,
      hourAdj;
    if (use12Hours) {
      hourOptionsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
      hourAdj = hour % 12 || 12;
    } else {
      hourOptionsAdj = hourOptions;
      hourAdj = hour;
    }

    console.log(hourAdj)
    const transformHour = (value: string) => value + locale.hour;

    const className = `${prefixCls}-list-hour`;
    return (
      <ScrollItemFormatOptionReturn
        key={1}
        ref={current => cacheRefCurrent('hour', current)}
        mode={'wheel'}
        transform={transformHour}
        cycled={true}
        className={className}
        list={hourOptionsAdj.map(option => formatOption(option, disabledOptions))}
        selectedIndex={hourOptionsAdj.indexOf(hourAdj)}
        type="hour"
        onSelect={onItemChange}
        {...scrollItemProps}
      />
    );
  }

  function renderMinuteSelect(minute: number, locale: Locale['TimePicker']) {
    const { prefixCls, disabledMinutes, timeStampValue, scrollItemProps } = props;

    const { showMinute, minuteOptions } = state;

    if (!showMinute) {
      return null;
    }
    const value = new Date(timeStampValue);
    const disabledOptions = disabledMinutes && disabledMinutes(value.getHours());

    const className = `${prefixCls}-list-minute`;

    const transformMinute = (min: string) => min + locale.minute;

    return (
      <ScrollItemFormatOptionReturn
        key={2}
        ref={current => cacheRefCurrent('minute', current)}
        mode={'wheel'}
        transform={transformMinute}
        cycled={true}
        list={minuteOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={onItemChange}
        className={className}
        {...scrollItemProps}
      />
    );
  }

  function renderSecondSelect(second: number, locale: Locale['TimePicker']) {
    const { prefixCls, disabledSeconds, timeStampValue, scrollItemProps } = props;

    const { showSecond, secondOptions } = state;

    if (!showSecond) {
      return null;
    }
    const value = new Date(timeStampValue);

    const disabledOptions = disabledSeconds && disabledSeconds(value.getHours(), value.getMinutes());

    const className = `${prefixCls}-list-second`;

    const transformSecond = (sec: number) => String(sec) + locale.second;

    return (
      <ScrollItemFormatOptionReturn
        key={3}
        ref={current => cacheRefCurrent('second', current)}
        mode={'wheel'}
        transform={transformSecond}
        cycled={true}
        list={secondOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={secondOptions.indexOf(second)}
        className={className}
        type="second"
        onSelect={onItemChange}
        {...scrollItemProps}
      />
    );
  }

  function renderAMPMSelect(locale: Locale['TimePicker'], localeCode: string) {
    const { prefixCls, use12Hours, isAM, scrollItemProps } = props;
    if (!use12Hours) {
      return null;
    }

    const AMPMOptions: AMPMOptionItem[] = [
      {
        value: 'AM',
        text: locale.AM || '上午',
      },
      {
        value: 'PM',
        text: locale.PM || '下午',
      },
    ];

    const selected = isAM ? 0 : 1;

    const className = `${prefixCls}-list-ampm`;

    return (
      <ScrollItemAMPMOptionItem
        key={0}
        ref={current => cacheRefCurrent('ampm', current)}
        mode={'wheel'}
        className={className}
        cycled={false}
        list={AMPMOptions}
        selectedIndex={selected}
        type="ampm"
        onSelect={onItemChange}
        {...scrollItemProps}
      />
    );
  }

  const getDisplayDateFromTimeStamp = (timeStampValue: Date | string) => foundation.getDisplayDateFromTimeStamp(timeStampValue);



  return () => {
    const { timeStampValue, panelHeader, panelFooter } = props;

    console.log(timeStampValue)
    const value = getDisplayDateFromTimeStamp(timeStampValue);
    return (
      <div>
        <LocaleConsumer componentName="TimePicker">
          {(locale: Locale['TimePicker'], localeCode: Locale['code']) => (
            <ScrollList header={panelHeader} footer={panelFooter}>
              {renderAMPMSelect(locale, localeCode)}
              {renderHourSelect(value.getHours(), locale)}
              {renderMinuteSelect(value.getMinutes(), locale)}
              {renderSecondSelect(value.getSeconds(), locale)}
            </ScrollList>
          )}
        </LocaleConsumer>
      </div>
    );
  }
})

Combobox.props = vuePropsType

export default Combobox

