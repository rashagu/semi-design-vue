import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Test = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      Test
    </div>
  )
})

Test.props = vuePropsType
Test.name = 'Test'

export default Test

