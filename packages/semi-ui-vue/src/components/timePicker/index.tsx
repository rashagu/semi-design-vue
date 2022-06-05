import {defineComponent, ref, h, Fragment, useSlots} from 'vue'


import LocaleConsumer from '../locale/localeConsumer';
import BaseTimePicker, { TimePickerProps as BasePickerProps, BaseValueType } from './TimePicker';
import { ValidateStatus } from '../_base/baseComponent';
import { ScrollItemProps } from '../scrollList/scrollItem';
import ConfigContext from '../configProvider/context';
import { get } from 'lodash';
import { Locale } from '../locale/interface';

export { TimeInputProps } from './TimeInput';
export { TimePickerProps } from './TimePicker';

export {
  BaseValueType,
  ScrollItemProps,
  ValidateStatus
};

export type LocalePickerProps = BasePickerProps;


export const vuePropsType = {
  name: String
}
const index = defineComponent<LocalePickerProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      index
    </div>
  )
})

index.props = vuePropsType

export default index

