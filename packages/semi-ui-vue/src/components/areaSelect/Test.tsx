import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

import BaseButton, { ButtonProps as BaseButtonProps, vuePropsType as RR} from '../button/Button';
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Test = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  console.log()
  return () => (
    <BaseButton>
      Test
    </BaseButton>
  )
})

Test.props = vuePropsType

export default Test

