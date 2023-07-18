import {defineComponent, ref, h, Fragment} from 'vue'
import Space from '../index'
import Button from "../../button";
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
},{
  name:'SpaceTest'
})



export default SpaceTest

