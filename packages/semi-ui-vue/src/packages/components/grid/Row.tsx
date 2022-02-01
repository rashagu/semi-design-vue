import {defineComponent, ref, h, Fragment} from 'vue'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Row = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      Row
    </div>
  )
})

Row.props = vuePropsType

export default Row

