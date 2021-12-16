import {defineComponent, ref, h, onMounted,} from 'vue'
import * as icons  from "@kousum/semi-icons-vue";

export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  const domArr = ref<any[]>([])

  onMounted(()=>{
    const iconsObj:any = icons;
    for(let i in icons){
      const Dom = iconsObj[i];
      domArr.value.push(()=><Dom size={'extra-large'} />)
    }
  })
  return () => (
    <div id={'a'}  style={{color:'#E91E63', display:'flex', flexWrap:'wrap',}}>
      {/*<Button />*/}
      {domArr.value.map((item:any, index:any)=>{
        return (
          <div key={index}>
            {item()}
          </div>
        )
      })}
    </div>
  )
})


App.props = VuePropsType

export default App
