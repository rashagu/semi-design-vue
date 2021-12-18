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
    <Tooltip content={'hi bytedance'}>
      <div>123123</div>
    </Tooltip>
  );
})

TootipDemo.props = vuePropsType

export default TootipDemo

