import {defineComponent, ref, h, Fragment} from 'vue'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Test = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      Test
    </div>
  )
})

Test.props = vuePropsType

export default Test

