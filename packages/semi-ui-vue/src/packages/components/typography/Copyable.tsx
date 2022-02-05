import {defineComponent, ref, h, Fragment} from 'vue'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Copyable = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      Copyable
    </div>
  )
})

Copyable.props = vuePropsType

export default Copyable

