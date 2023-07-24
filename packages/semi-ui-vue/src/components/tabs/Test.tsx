import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

interface TestProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Test = defineComponent<TestProps>((props, {}) => {
  const slots = useSlots()


  return () => (
    <div>
      Test
    </div>
  )
})



export default Test

