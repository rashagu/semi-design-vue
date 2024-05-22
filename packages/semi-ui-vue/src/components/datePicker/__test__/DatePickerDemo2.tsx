import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { Form, FormDatePicker } from '../../form';
import DatePicker from '../index';

interface DatePickerDemo2Props {
  name?: string;
}

export const vuePropsType: ComponentObjectPropsOptions<DatePickerDemo2Props> = {
  name: String,
};
const DatePickerDemo2 = defineComponent<DatePickerDemo2Props>((props, {}) => {
  const slots = useSlots();


  return () => (
    <div>
      <Form>
        <FormDatePicker field='ssss'/>
      </Form>
      <DatePicker type={'month'}/>
    </div>
  );
}, {
  props: vuePropsType,
  name: 'DatePickerDemo2',
});


export default DatePickerDemo2;

