import {defineComponent, ref, h, onMounted,} from 'vue'
import IconTest from "./__test__/IconTest";
import Icon from './icons/components/Icon'
import Accordion from './doc-accordion.vue'
import {IconAccessibility} from "./icons";
export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  return () => (
    <div  style={{display:'flex', flexWrap:'wrap',}}>
      <IconTest />
      {/*<IconAccessibility />*/}
      <Icon svg={<Accordion/>}></Icon>
      <div class={'aa'}>123</div>
    </div>
  )
})


// @ts-ignore
App.props = VuePropsType

export default App
