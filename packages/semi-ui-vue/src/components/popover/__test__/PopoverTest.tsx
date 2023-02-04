import {defineComponent, ref, h, Fragment} from 'vue'
import Popover from '../index'
import Button from "../../button/Button";
import Space from '../../space'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const POSITION_SET: string[] = [
  'top',
  // 'topLeft',
  // 'topRight',
  // 'left',
  // 'leftTop',
  // 'leftBottom',
  // 'right',
  // 'rightTop',
  // 'rightBottom',
  // 'bottom',
  // 'bottomLeft',
  // 'bottomRight',
  // 'leftTopOver',
  // 'rightTopOver',
]
const PopoverTest = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <div>
      <div
        style={{
          boxSizing: 'content-box',
          padding: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        <Space align='baseline'>
          {POSITION_SET.map((pos: any) => (
            <Popover
              showArrow={true}
              key={pos}
              content={
                <div style={{padding: '20px'}}>
                  <p>Hi Bytedancer!</p>
                </div>
              }
              trigger="click"
              position={pos}
            >
              <Button key={pos}>{pos}</Button>
            </Popover>
          ))}
        </Space>
      </div>
    </div>
  )
})

PopoverTest.props = vuePropsType

export default PopoverTest

