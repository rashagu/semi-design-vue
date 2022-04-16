import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import TagInput from '../Index'
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TagInputDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <TagInput
      defaultValue={['抖音','火山','西瓜视频']}
      placeholder='请输入...'
      onChange={v => console.log(v)}
    />
  )
})

TagInputDemo.props = vuePropsType

export default TagInputDemo

