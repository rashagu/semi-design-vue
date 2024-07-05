import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import TagInput from '../index'
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TagInputDemo = defineComponent((props, {}) => {
  const slots = useSlots()

  const value = ref(['抖音','火山','西瓜视频'])
  return () => (
    <div>
      <TagInput
        value={value.value}
        placeholder='请输入...'
        onChange={v => {
          console.log(v)
          value.value = v
        }}
      />
      <TagInput
        draggable
        defaultValue={['抖音','火山','西瓜视频']}
        placeholder='请输入...'
        onChange={v => console.log(v)}
      />
    </div>
  )
})



export default TagInputDemo

