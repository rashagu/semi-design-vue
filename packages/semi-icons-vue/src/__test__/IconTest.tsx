import {defineComponent, ref, h, onMounted,} from 'vue'
// import {IconActivity} from "../../dist/es/icons";
import {IconActivity} from "../icons/icons";
// import * as icons  from "../packages/icons/icons/index";

export interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}

const App = defineComponent<ExampleProps>((props, {slots}) => {

  // const domArr = ref<JSX.Element[]>([])
  //
  // onMounted(()=>{
  //   const iconsObj:any = icons;
  //   for(let i in icons){
  //     const Dom = iconsObj[i];
  //     domArr.value.push(<Dom size={'extra-large'} />)
  //   }
  // })
  return () => (
    <div id={'a'}  style={{color:'#E91E63', display:'flex', flexWrap:'wrap',}}>
      <IconActivity />
      {/*/!*<Button />*!/*/}
      {/*{domArr.value.map((item:any, index:any)=>{*/}
      {/*  return (*/}
      {/*    <div key={index}>*/}
      {/*      {item}*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*})}*/}
    </div>
  )
})


App.props = VuePropsType

export default App
