import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Modal from "../index";
import Button from "../../button";

interface ModalDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ModalDemo = defineComponent<ModalDemoProps>((props, {}) => {

  const slots = useSlots()
  const visible = ref(false);
  function setVisible(val) {
    visible.value = val
  }
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log('Ok button clicked');
  };
  const handleCancel = () => {
    setVisible(false);
    console.log('Cancel button clicked');
  };
  const handleAfterClose = () => {
    console.log('After Close callback executed');
  };

  return () => (
    <div>
      <Button onClick={showDialog}>打开弹窗</Button>
      <Modal
        title="基本对话框"
        visible={visible.value}
        onOk={handleOk}
        afterClose={handleAfterClose} //>=1.16.0
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        This is the content of a basic modal.
        <br />
        More content...
      </Modal>
    </div>
  )
})

ModalDemo.props = vuePropsType
ModalDemo.name = 'ModalDemo'

export default ModalDemo

