import { defineComponent, h, useSlots } from 'vue';

import { numbers, strings } from '@douyinfe/semi-foundation/datePicker/constants';
import DatePicker, { DatePickerProps, vuePropsTypeDatePickerProps } from './datePicker';
import LocaleConsumer from '../locale/localeConsumer';
import type { Locale } from '../locale/interface';
import Context from '../configProvider/context';

export type {
  BaseValueType,
  DayStatusType,
  DisabledDateOptions,
  DisabledDateType,
  DisabledTimeType,
  InputSize,
  Position,
  PresetType,
  PresetsType,
  TriggerRenderProps,
  ValidateStatus,
  ValueType,
} from '@douyinfe/semi-foundation/datePicker/foundation';
export type { DateInputProps } from './dateInput';
export type { DatePickerProps } from './datePicker';
export type { MonthProps } from './month';
export type { MonthsGridProps } from './monthsGrid';
export type { QuickControlProps } from './quickControl';
export type { YearAndMonthProps } from './yearAndMonth';
export type { InsetInputProps } from '@douyinfe/semi-foundation/datePicker/inputFoundation';
export type { DatePicker as BaseDatePicker };
import { useHasInProps } from '../_base/baseComponent';

export const vuePropsType = {
  ...vuePropsTypeDatePickerProps,
  forwardRef: [Object, Function],
};
const index = defineComponent({
  props: vuePropsType,
  name: 'DatePickerIndex',
  setup(props, {}) {
    const slots = useSlots();
    const { getProps } = useHasInProps();
    return () => {
      const propsObj: DatePickerProps = getProps(props);
      const { type, format, rangeSeparator } = propsObj;

      if (typeof format === 'string' && format) {
        if (!/[Hhms]+/.test(format)) {
          if (type === 'dateTime') {
            propsObj.type = 'date';
          } else if (type === 'dateTimeRange') {
            propsObj.type = 'dateRange';
          }
        }
      }

      // Add spaces at both ends to prevent conflicts with characters in the date when separating
      if (rangeSeparator && typeof rangeSeparator === 'string') {
        propsObj.rangeSeparator = ` ${rangeSeparator.trim()} `;
      }

      if (propsObj.insetInput) {
        if (!propsObj.position) {
          propsObj.position = strings.POSITION_INLINE_INPUT;
        }
        /**
         * When insetInput is `true` and `position` includes `over`, use 1px `spacing` to solve the problem of border-radius leakage in the upper left corner
         *
         * @see https://user-images.githubusercontent.com/26477537/158817185-126a5f33-41f7-414a-8e36-8d1be2dda5cd.png
         */
        if (propsObj.position.includes('Over') && !propsObj.spacing) {
          propsObj.spacing = numbers.SPACING_INSET_INPUT;
        }
      }

      return (
        <Context.Consumer>
          {({ timeZone }: { timeZone?: string | number }) => (
            <LocaleConsumer componentName={'DatePicker'}>
              {(locale: Locale['DatePicker'], localeCode: string, dateFnsLocale: Locale['dateFnsLocale']) => {
                return (
                  <DatePicker
                    {...{
                      ...propsObj,
                      timeZone: timeZone,
                      localeCode: localeCode,
                      locale: locale,
                      dateFnsLocale: dateFnsLocale,
                    }}
                    // @ts-ignore
                    ref={props.forwardRef}
                  />
                );
              }}
            </LocaleConsumer>
          )}
        </Context.Consumer>
      );
    };
  },
});

export default index;
