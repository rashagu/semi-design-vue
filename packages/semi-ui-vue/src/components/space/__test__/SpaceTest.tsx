import {defineComponent, ref, h, Fragment} from 'vue'
import Space from '../Index'
import Button from "../../button/Index";
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const SpaceTest = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      <Space align='baseline'>
        <Button onClick={()=>{alert('button')}}>按钮</Button>
        <Button>按钮</Button>
        <div style={{
          width: 100,
          height: 100,
          backgroundColor:'lightblue',
          display: 'flex',
          alignItems: 'center'
        }}>div</div>
        <div>asd</div>
      </Space>
    </div>
  )
})

SpaceTest.props = vuePropsType

export default SpaceTest

