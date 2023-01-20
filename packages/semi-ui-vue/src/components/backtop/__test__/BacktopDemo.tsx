import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import BackTop from "../index";
import {IconArrowUp} from "@kousum/semi-icons-vue";

interface BacktopDeemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const BacktopDemo = defineComponent<BacktopDeemoProps>((props, {}) => {
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
  return () => (
    <div  style={{height: '9999px'}}>
      <div>
                <span>
                    Scroll down to see the bottom-right <span style={{ color: '#0077fa' }}>blue circular</span> button.
                </span>
        <BackTop style={style}>
          <IconArrowUp />
        </BackTop>
      </div>
    </div>
  )
})

BacktopDemo.props = vuePropsType
BacktopDemo.name = 'BacktopDemo'

export default BacktopDemo

