import {defineComponent, ref, h, onMounted, watch,} from 'vue'
import Button from "./components/button/Demo";
import './docDemo.scss'
import IconTest from "./components/__test__/IconTest";
import TootipDemo from "./components/tooltip/__test__/TootipDemo";
import DropdownDemo1 from "./components/dropdown/__test__/DropdownDemo1";
import GridTest from "./components/grid/__test__/GridTest";
import LayoutTest from "./components/layout/__test__/LayoutTest";
import SpaceTest from "./components/space/__test__/SpaceTest";
import PopoverTest from "./components/popover/__test__/PopoverTest";
import TypeDemo from './components/typography/__test__/TypoDemo'
import InputDemo from "./components/input/__test__/InputDemo";
import RadioDemo from "./components/radio/__test__/RadioDemo";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  return () => (
    <div>
      <RadioDemo />

      <InputDemo />
      <TypeDemo />

      <div style={{color:'#E91E63',width: 100, display:'flex', flexWrap:'wrap'}}>
        <Button />
      </div>

      <IconTest />
      <br/>
      <TootipDemo />
      <br/>
      <br/>
      <DropdownDemo1/>
      <br/>
      <GridTest />
      <LayoutTest/>
      <SpaceTest/>
      <PopoverTest />
      <div class={'aa'}>123</div>
    </div>
  )
})


App.props = VuePropsType

export default App
