import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import TimePicker from '../index';

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TimePickerDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      <TimePicker placeholder={'请选择时间'} />
    </div>
  )
})

TimePickerDemo.props = vuePropsType

export default TimePickerDemo

