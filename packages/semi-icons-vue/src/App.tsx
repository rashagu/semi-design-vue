import {defineComponent, ref, h, onMounted,} from 'vue'
import IconTest from "./__test__/IconTest";
import Icon from './icons/components/Icon'
import Accordion from './doc-accordion.vue'
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
      <Icon svg={<Accordion/>}></Icon>
      <div class={'aa'}>123</div>
    </div>
  )
})


// @ts-ignore
App.props = VuePropsType

export default App
