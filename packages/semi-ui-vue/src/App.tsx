import {defineComponent, ref, h, onMounted, watch,} from 'vue'
import Button from "./packages/components/button/Demo";
import IconTest from "./__test__/IconTest";
import TootipDemo from "./packages/components/tooltip/__test__/TootipDemo";
import DropdownDemo1 from "./packages/components/dropdown/__test__/DropdownDemo1";
import GridTest from "./packages/components/grid/__test__/GridTest";
import LayoutTest from "./packages/components/layout/__test__/LayoutTest";
import './docDemo.scss'
import SpaceTest from "./packages/components/space/__test__/SpaceTest";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  return () => (
    <div>
      <div style={{color:'#E91E63',width: 100, display:'flex', flexWrap:'wrap'}}>
        <Button />

        {/*<IconTest />*/}
        <TootipDemo />
      </div>
      <br/>
      <br/>
      <DropdownDemo1/>
      <br/>
      <GridTest />
      <LayoutTest/>
      <SpaceTest/>
    </div>
  )
})


App.props = VuePropsType

export default App
