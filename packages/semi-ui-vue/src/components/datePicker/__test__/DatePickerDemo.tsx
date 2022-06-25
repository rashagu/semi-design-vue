import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import DatePicker from '../index'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}

const DatePickerDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      <DatePicker onChange={(date, dateString) => console.log(dateString)} />
    </div>
  )
})

DatePickerDemo.props = vuePropsType

export default DatePickerDemo

