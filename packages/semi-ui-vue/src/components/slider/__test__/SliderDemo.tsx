import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Slider from "../index";

interface SliderDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const SliderDemo = defineComponent<SliderDemoProps>((props, {}) => {
  const slots = useSlots()


  return () => (
    <div>
      <div>
        <div style={{ height: '300px', marginLeft: '30px', marginTop: '10px', paddingRight: '30px', display: 'inline-block' }}>
          <Slider vertical={true}></Slider>
        </div>
        {/*<div style={{ height: '300px', marginLeft: '30px', marginTop: '10px', paddingRight: '30px', display: 'inline-block' }}>*/}
        {/*  <Slider vertical verticalReverse></Slider>*/}
        {/*</div>*/}
        {/*<div style={{ height: '300px', marginLeft: '30px', marginTop: '10px', paddingRight: '30px', display: 'inline-block' }}>*/}
        {/*  <Slider vertical range defaultValue={[20, 60]}></Slider>*/}
        {/*</div>*/}
        {/*<div style={{ height: '300px', marginLeft: '30px', marginTop: '10px', paddingRight: '30px', display: 'inline-block' }}>*/}
        {/*  <Slider vertical verticalReverse range defaultValue={[20, 60]}></Slider>*/}
        {/*</div>*/}
        {/*<div style={{ height: '300px', marginLeft: '30px', marginTop: '10px', paddingRight: '30px', display: 'inline-block' }}>*/}
        {/*  <Slider vertical range marks={{ 20: '20°C', 40: '40°C' }} step={10} defaultValue={[20, 60]}></Slider>*/}
        {/*</div>*/}
        {/*<div style={{ height: '300px', marginLeft: '30px', marginTop: '10px', paddingRight: '30px', display: 'inline-block' }}>*/}
        {/*  <Slider vertical verticalReverse range marks={{ 20: '20°C', 40: '40°C' }} step={10} defaultValue={[20, 60]}></Slider>*/}
        {/*</div>*/}
      </div>
    </div>
  )
})

SliderDemo.props = vuePropsType
SliderDemo.name = 'SliderDemo'

export default SliderDemo

