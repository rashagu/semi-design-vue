import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const index = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      index
    </div>
  )
})

index.props = vuePropsType

export default index

