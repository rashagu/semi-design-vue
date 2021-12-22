import {defineComponent, ref, h, onMounted,} from 'vue'
// import Button from "./packages/components/button/Demo";
import IconTest from "./__test__/IconTest";
import TootipDemo from "./packages/components/tooltip/__test__/TootipDemo";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  return () => (
    <div id={'a'}  style={{color:'#E91E63',width: 100, display:'flex', flexWrap:'wrap'}}>
      {/*<Button />*/}

      {/*<IconTest />*/}
      <TootipDemo />
    </div>
  )
})


App.props = VuePropsType

export default App
