import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

import LocaleConsumer from '../locale/localeConsumer';
import BaseTimePicker, {defaultProps, propTypes} from './TimePicker';
import type {TimePickerProps as BasePickerProps, BaseValueType } from './TimePicker';

import type { ValidateStatus } from '../_base/baseComponent';
import type { ScrollItemProps } from '../scrollList';
import { get } from 'lodash';
import { Locale } from '../locale/interface';
import {vuePropsMake} from "../PropTypes";
import Context from "../configProvider/context";


export type { TimeInputProps } from './TimeInput';
export type { TimePickerProps } from './TimePicker';

export {
  BaseValueType,
  ScrollItemProps,
  ValidateStatus
};

export type LocalePickerProps = BasePickerProps;

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const index = defineComponent<LocalePickerProps>((props, {}) => {
  const slots = useSlots()

  return () =>  {
    const { type } = props;
    return (
      <Context.Consumer>
        {({ timeZone }: { timeZone?: string | number }) => (
          <LocaleConsumer componentName="TimePicker">
            {(locale: Locale['TimePicker'], localeCode: string, dateFnsLocale: Locale['dateFnsLocale']) => (
              <BaseTimePicker
                timeZone={timeZone}
                placeholder={get(locale, ['placeholder', type])}
                {...props}
                locale={locale}
                localeCode={localeCode}
                dateFnsLocale={dateFnsLocale}
              />
            )}
          </LocaleConsumer>
        )}
      </Context.Consumer>
    );
  }
})

index.props = vuePropsType

export default index

