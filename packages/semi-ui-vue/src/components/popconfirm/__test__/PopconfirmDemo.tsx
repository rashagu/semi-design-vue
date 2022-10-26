import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Toast from '../../toast'
import Popconfirm from '../index'
import Button from "../../button";

interface PopconfirmDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const PopconfirmDemo = defineComponent<PopconfirmDemoProps>((props, {}) => {

  const slots = useSlots()
  const onConfirm = () => {
    Toast.success('确认保存！');
  };

  const onCancel = () => {
    Toast.warning('取消保存！');
  };
  return () => (
    <div style={{paddingLeft: '100px'}}>
      <Popconfirm
        title="确定是否要保存此修改？"
        content="此修改将不可逆"
        onConfirm={onConfirm}
        onCancel={onCancel}
      >
        <Button className={'test'}>保存</Button>
      </Popconfirm>
    </div>
  )
})

PopconfirmDemo.props = vuePropsType
PopconfirmDemo.name = 'PopconfirmDemo'

export default PopconfirmDemo

