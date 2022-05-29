import {defineComponent, ref, h} from 'vue'
import AreaSelect from "../AreaSelect";

interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}
const AreaSelectDemo = defineComponent<ExampleProps>((props, {slots}) => {

  return () => (
    <div id={'a'}>
      <AreaSelect defaultValue={''} onChange={()=>{}}/>
    </div>
  )
})


AreaSelectDemo.props = VuePropsType

export default AreaSelectDemo
