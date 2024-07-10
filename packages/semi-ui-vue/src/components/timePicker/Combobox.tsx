import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  reactive,
  onMounted,
  watch,
  ComponentObjectPropsOptions,
  PropType,
} from 'vue';

import { format as dateFnsFormat } from 'date-fns';
import { noop, omit } from 'lodash';

import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import { strings } from '@douyinfe/semi-foundation/timePicker/constants';
import ScrollList from '../scrollList/index';
import { scrollItemFunc } from '../scrollList/scrollItem';
import ComboboxFoundation, { formatOption } from '@douyinfe/semi-foundation/timePicker/ComboxFoundation';
import LocaleConsumer from '../locale/localeConsumer';
import type { TimePickerProps } from './TimePicker';
import { Locale } from '../locale/interface';
import { vuePropsMake } from '../PropTypes';
import * as PropTypes from '../PropTypes';
import { timePickerPropTypes } from './propTypes';
import { CombineProps } from '../interface';
const ScrollItemFormatOptionReturn = scrollItemFunc<FormatOptionReturn>();
const ScrollItemAMPMOptionItem = scrollItemFunc<AMPMOptionItem>();

export type ComboboxProps = Pick<
  TimePickerProps,
  | 'format'
  | 'prefixCls'
  | 'disabledHours'
  | 'disabledMinutes'
  | 'disabledSeconds'
  | 'hideDisabledOptions'
  | 'use12Hours'
  | 'scrollItemProps'
  | 'panelFooter'
  | 'panelHeader'
> &
  BaseProps & {
    defaultOpenValue?: TimePickerProps['value'];
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    onChange?: (value: { isAM: boolean; value: string; timeStampValue: number }) => void;
    onCurrentSelectPanelChange?: (range: string) => void;
    isAM?: boolean;
    timeStampValue?: any;
    class?: string;
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

const staticPropTypes: CombineProps<ComboboxProps> = {
  class: [PropTypes.string, PropTypes.object],
  className: PropTypes.string,
  style: [PropTypes.string, PropTypes.object] as PropType<ComboboxProps['style']>,
  format: PropTypes.string,
  defaultOpenValue: PropTypes.object,
  prefixCls: PropTypes.string,
  onChange: PropTypes.func as PropType<ComboboxProps['onChange']>,
  showHour: PropTypes.bool,
  showMinute: PropTypes.bool,
  showSecond: PropTypes.bool,
  disabledHours: PropTypes.func as PropType<ComboboxProps['disabledHours']>,
  disabledMinutes: PropTypes.func as PropType<ComboboxProps['disabledMinutes']>,
  disabledSeconds: PropTypes.func as PropType<ComboboxProps['disabledSeconds']>,
  hideDisabledOptions: PropTypes.bool,
  onCurrentSelectPanelChange: PropTypes.func as PropType<ComboboxProps['onCurrentSelectPanelChange']>,
  use12Hours: PropTypes.bool,
  isAM: PropTypes.bool,
  timeStampValue: PropTypes.any,
  scrollItemProps: PropTypes.object,

  panelHeader: PropTypes.string as PropType<ComboboxProps['panelHeader']>,

  ...omit(timePickerPropTypes, [
    'prefixCls',
    'format',
    'style',
    'disabledHours',
    'disabledMinutes',
    'disabledSeconds',
    'hideDisabledOptions',
    'onChange',
    'use12Hours',
    'scrollItemProps',
  ]),
  panelFooter: PropTypes.node as PropType<ComboboxProps['panelFooter']>,
};

const staticDefaultProps = {
  disabledHours: noop,
  disabledMinutes: noop,
  disabledSeconds: noop,
  format: strings.DEFAULT_FORMAT,
};
export const vuePropsType = vuePropsMake(staticPropTypes, staticDefaultProps);
const Combobox = defineComponent({
  props: vuePropsType,
  name: 'Combobox',
  setup(props, {}) {
    const slots = useSlots();
    const state = reactive<ComboboxState>({
      hourOptions: [],
      minuteOptions: [],
      secondOptions: [],
      showHour: false,
      showMinute: false,
      showSecond: false,
    });

    const { adapter: adapterInject } = useBaseComponent<ComboboxProps>(props, state);

    const foundation = new ComboboxFoundation(adapterInject());

    function setState() {
      const foundationState = foundation.initData();
      Object.keys(foundationState).forEach((key) => {
        state[key] = foundationState[key];
      });
    }

    setState();

    watch([() => props.timeStampValue, () => props.format], ([], [prevPropsTimeStampValue, prevPropsFormat]) => {
      if (prevPropsTimeStampValue !== props.timeStampValue || prevPropsFormat !== props.format) {
        setState();
      }
    });

    const cacheRefCurrent = (key: string, current: any) => {
      if (key && typeof key === 'string') {
        adapterInject().setCache(key, current);
      }
    };

    const reselect = () => {
      const currentKeys = ['ampm', 'hour', 'minute', 'second'];

      currentKeys.forEach((key) => {
        const current = adapterInject().getCache(key);

        if (current && current.scrollToIndex) {
          current.scrollToIndex();
        }
      });
    };

    const onItemChange = ({ type, value, disabled }: { type?: string; value: string; disabled?: boolean }) => {
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

      let hourOptionsAdj, hourAdj;
      if (use12Hours) {
        hourOptionsAdj = [12].concat(hourOptions.filter((h) => h < 12 && h > 0));
        hourAdj = hour % 12 || 12;
      } else {
        hourOptionsAdj = hourOptions;
        hourAdj = hour;
      }

      const transformHour = (value: string) => value + locale.hour;

      const className = `${prefixCls}-list-hour`;
      return (
        <ScrollItemFormatOptionReturn
          ref={(current) => cacheRefCurrent('hour', current)}
          mode={'normal'}
          transform={transformHour}
          className={className}
          list={hourOptionsAdj.map((option) => formatOption(option, disabledOptions))}
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
          ref={(current) => cacheRefCurrent('minute', current)}
          mode={'normal'}
          transform={transformMinute}
          list={minuteOptions.map((option) => formatOption(option, disabledOptions))}
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
          ref={(current) => cacheRefCurrent('second', current)}
          mode={'normal'}
          transform={transformSecond}
          list={secondOptions.map((option) => formatOption(option, disabledOptions))}
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
          ref={(current) => cacheRefCurrent('ampm', current)}
          mode={'normal'}
          className={className}
          list={AMPMOptions}
          selectedIndex={selected}
          type="ampm"
          onSelect={onItemChange}
          {...scrollItemProps}
        />
      );
    }

    const getDisplayDateFromTimeStamp = (timeStampValue: Date | string) =>
      foundation.getDisplayDateFromTimeStamp(timeStampValue);

    return () => {
      const { timeStampValue, panelHeader, panelFooter } = props;

      const value = getDisplayDateFromTimeStamp(timeStampValue);
      return (
        <LocaleConsumer componentName="TimePicker">
          {(locale: Locale['TimePicker'], localeCode: Locale['code']) => (
            <ScrollList
              header={panelHeader}
              footer={panelFooter}
              x-semi-header-alias="panelHeader"
              x-semi-footer-alias="panelFooter"
            >
              {renderAMPMSelect(locale, localeCode)}
              {renderHourSelect(value.getHours(), locale)}
              {renderMinuteSelect(value.getMinutes(), locale)}
              {renderSecondSelect(value.getSeconds(), locale)}
            </ScrollList>
          )}
        </LocaleConsumer>
      );
    };
  },
});

export default Combobox;
