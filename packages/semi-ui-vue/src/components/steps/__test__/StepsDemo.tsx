import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Steps, {Direction} from "../index";
import Step from "../step";

interface StepsDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const StepsDemo = defineComponent<StepsDemoProps>((props, {}) => {
  const slots = useSlots()

  function onChange(v) {
    console.log(v)
  }

  return () => (
    <div>
      <Steps current={1} onChange={onChange}>
        <Step title="Finished" description="This is a description" />
        <Step title="In Progress" description="This is a description" />
        <Step title="Waiting" description="This is a description" />
      </Steps>
      <Steps direction={'vertical'}  type="basic" current={1} onChange={onChange}>
        <Step title="Finished" description="This is a description" />
        <Step title="In Progress" description="This is a description" />
        <Step title="Waiting" description="This is a description" />
      </Steps>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Steps type="nav" current={1} style={{ margin: 'auto' }} onChange={onChange}>
          <Step title="注册账号" />
          <Step title="这个项目的文字比较多多多多" />
          <Step title="产品用途" />
          <Step title="期待尝试功能" />
        </Steps>
      </div>
    </div>
  )
})

StepsDemo.props = vuePropsType
StepsDemo.name = 'StepsDemo'

export default StepsDemo

