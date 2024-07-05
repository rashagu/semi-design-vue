import {defineComponent, ref, h, Fragment, useSlots, onMounted} from 'vue'
import BackTop from "../index";
import {IconArrowUp} from "@kousum/semi-icons-vue";

interface BacktopDeemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const BacktopDemo = defineComponent((props, {}) => {
  const slots = useSlots()

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '30px',
    borderRadius: '100%',
    backgroundColor: '#0077fa',
    color: '#fff',
    bottom: '100px',
  };

  const containerDiv = ref()
  onMounted(()=>{
    (containerDiv.value as HTMLElement).scrollTop = 9999
  })
  return () => (
    <div ref={containerDiv} style={{height: '500px', overflow: 'auto'}}>
      <div style={{height: '9999px'}}>
        <div>
                <span>
                    Scroll down to see the bottom-right <span style={{ color: '#0077fa' }}>blue circular</span> button.
                </span>
          <BackTop target={()=>containerDiv.value} style={style}>
            <IconArrowUp />
          </BackTop>
        </div>
      </div>
    </div>
  )
})

// @ts-ignore
BacktopDemo.props = vuePropsType
// @ts-ignore
BacktopDemo.name = 'BacktopDemo'

export default BacktopDemo

