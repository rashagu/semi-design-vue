import {defineComponent, ref, h, Fragment} from 'vue'
import Popover from '../index'
import Button from "../../button/Button";
import Space from '../../space'
import Input from "../../input";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const POSITION_SET: string[] = [
  'top',
  'topLeft',
  'topRight',
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'leftTopOver',
  'rightTopOver',
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
        <Popover
          content={
            <div style={{padding: '20px'}}>
              <p>Hi Bytedancer!</p>
              <Input />
            </div>
          }
          trigger="click"
          position={'top'}
        >
          <Input />
        </Popover>
      </div>
    </div>
  )
})

PopoverTest.props = vuePropsType

export default PopoverTest

