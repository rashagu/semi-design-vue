import {defineComponent, ref, h, onMounted,} from 'vue'
import * as icons  from "../icons/index";

export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  const domArr = ref<{vNode:JSX.Element,name:string}[]>([])

  onMounted(()=>{
    const iconsObj:any = icons;
    for(let i in icons){
      const Dom = iconsObj[i];
      domArr.value.push({vNode:<Dom size={'extra-large'} />,name:Dom.name})
    }
  })
  return () => (
    <div id={'a'}  style={{ display:'flex', flexWrap:'wrap',}}>
      {/*<Button />*/}
      {domArr.value.map((item, index)=>{
        return (
          <div key={index} style={{width:'20%'}}>
            {item.vNode}：
            {item.name}
          </div>
        )
      })}
    </div>
  )
})


// @ts-ignore
App.props = VuePropsType

export default App
