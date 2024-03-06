import {defineComponent, ref, h, Fragment} from 'vue'
import {Radio, Group as RadioGroup} from '../index'
import Space from '../../space'
import {Form, FormRadio, FormRadioGroup} from "../../form";

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
      <h4>受控</h4>
      <RadioGroup
        type="button"
        buttonSize="middle"
        aria-label="单选组合示例"
        value={value.value}
        onChange={(v) => {
          console.log(v.target.value);
        }}
      >
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>

      <h4>卡片</h4>
      <RadioGroup
        type="card"
        defaultValue={2}
        direction="horizontal"
        aria-label="单选组合示例"
        name="demo-radio-group-card"
      >
        <Radio
          value={1}
          disabled
          extra="Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统"
          style={{ width: '280px' }}
        >
          单选框标题
        </Radio>
        <Radio
          value={2}
          extra="Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统"
          style={{ width: '280px' }}
        >
          单选框标题
        </Radio>
        <Radio
          value={3}
          extra="Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统"
          style={{ width: 280 }}
        >
          单选框标题
        </Radio>
      </RadioGroup>

      <h4>单选示例</h4>
      <Radio aria-label="单选示例">Radio</Radio>
      <br />
      <br />
      <h4>v-model</h4>
      <RadioGroup type="button" buttonSize="middle" aria-label="单选组合示例" v-model={[value.value, 'value']}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>
      <br />
      <Form>
        <FormRadioGroup type="button" buttonSize="middle" field={'sd'} initValue={1} aria-label="单选组合示例">
          <FormRadio value={1}>A</FormRadio>
          <FormRadio value={2}>B</FormRadio>
          <FormRadio value={3}>C</FormRadio>
          <FormRadio value={4}>D</FormRadio>
        </FormRadioGroup>
      </Form>
      <br />
      <h4>defaultValue</h4>
      <RadioGroup aria-label="单选组合示例" defaultValue={value.value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>
      <br />
      <br />
      <Space vertical spacing="loose" align="start">
        <RadioGroup type="button" buttonSize="small" defaultValue={1} aria-label="单选组合示例">
          <Radio value={1}>即时推送</Radio>
          <Radio value={2}>定时推送</Radio>
          <Radio value={3}>动态推送</Radio>
        </RadioGroup>
        <RadioGroup type="button" buttonSize="middle" defaultValue={1} aria-label="单选组合示例">
          <Radio value={1}>即时推送</Radio>
          <Radio value={2}>定时推送</Radio>
          <Radio value={3}>动态推送</Radio>
        </RadioGroup>
        <RadioGroup type="button" buttonSize="large" defaultValue={1} aria-label="单选组合示例">
          <Radio value={1}>即时推送</Radio>
          <Radio value={2}>定时推送</Radio>
          <Radio value={3}>动态推送</Radio>
        </RadioGroup>
      </Space>
      <br />
      <br />
    </div>
  );
})

// @ts-ignore
RadioDemo.props = vuePropsType

export default RadioDemo

