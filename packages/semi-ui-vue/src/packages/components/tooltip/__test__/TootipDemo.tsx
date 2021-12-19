import {defineComponent, ref, h, onActivated, Fragment} from 'vue'
import Tooltip from "../Index"
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TootipDemo = defineComponent<ExampleProps>((props, {slots}) => {

  return ()=>(
    <div style={{padding:'10rem'}}>

      <Tooltip content={'hi bytedance'} motion>
        <div style={{color:'red'}}>123123</div>
      </Tooltip>
    </div>
  );
})

TootipDemo.props = vuePropsType

export default TootipDemo

