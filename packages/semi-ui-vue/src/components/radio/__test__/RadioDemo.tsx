import {defineComponent, ref, h, Fragment} from 'vue'
import {Radio, Group as RadioGroup} from '../Index'
import Space from '../../space/Index'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const RadioDemo = defineComponent<ExampleProps>((props, {slots}) => {

  const value = ref(1)
  return () => (
    <div>
      <h4>单选示例</h4>
      <Radio aria-label="单选示例">Radio</Radio>
      <br/>
      <br/>
      <h4>v-model</h4>
      <RadioGroup aria-label="单选组合示例" v-model={[value.value, 'value']}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>
      <br/>
      <br/>
      <h4>defaultValue</h4>
      <RadioGroup aria-label="单选组合示例" defaultValue={value.value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>
      <br/>
      <br/>
      <Space vertical spacing='loose' align='start'>
        <RadioGroup type='button' buttonSize='small' defaultValue={1} aria-label="单选组合示例">
          <Radio value={1}>即时推送</Radio>
          <Radio value={2}>定时推送</Radio>
          <Radio value={3}>动态推送</Radio>
        </RadioGroup>
        <RadioGroup type='button' buttonSize='middle' defaultValue={1} aria-label="单选组合示例">
          <Radio value={1}>即时推送</Radio>
          <Radio value={2}>定时推送</Radio>
          <Radio value={3}>动态推送</Radio>
        </RadioGroup>
        <RadioGroup type='button' buttonSize='large' defaultValue={1} aria-label="单选组合示例">
          <Radio value={1}>即时推送</Radio>
          <Radio value={2}>定时推送</Radio>
          <Radio value={3}>动态推送</Radio>
        </RadioGroup>
      </Space>
      <br/>
      <br/>
    </div>
  )
})

RadioDemo.props = vuePropsType

export default RadioDemo

