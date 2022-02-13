import {defineComponent, ref, h, Fragment} from 'vue'

interface ExampleProps {
  name?: string
  forwardRef:any
}

export const vuePropsType = {
  name: String,
  forwardRef:Object
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

