import {defineComponent, ref, h, onMounted,} from 'vue'
import IconTest from "./__test__/IconTest";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  return () => (
    <div id={'a'}  style={{color:'#E91E63', display:'flex', flexWrap:'wrap',}}>
      <IconTest />
      <div class={'aa'}>123</div>
    </div>
  )
})


App.props = VuePropsType

export default App
