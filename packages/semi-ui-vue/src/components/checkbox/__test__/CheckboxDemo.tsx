import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Checkbox from '../index'
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const CheckboxDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      <Checkbox onChange={checked => console.log(checked)} aria-label="Checkbox 示例">Semi Design</Checkbox>
    </div>
  )
})

CheckboxDemo.props = vuePropsType

export default CheckboxDemo

