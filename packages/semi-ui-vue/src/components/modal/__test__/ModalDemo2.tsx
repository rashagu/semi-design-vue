import {defineComponent, ref, h, Fragment, useSlots, onMounted} from 'vue'
import Modal from "../index";
import Button from "../../button";

interface ModalDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ModalDemo2 = defineComponent((props, {}) => {

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

  const vv = ref('content')
  const Demo = ()=><div id="content">{vv.value}</div>

  const popupContainer = ref()
  return () => (
    <div ref={popupContainer}>
      <div>

        <Button
          //@ts-ignore
          role={'bt'}
          onClick={showDialog}
        >打开弹窗
        </Button>
        <Modal
          getPopupContainer={()=>popupContainer.value}
          title="基本对话框"
          visible={visible.value}
          onOk={handleOk}
          afterClose={handleAfterClose} //>=1.16.0
          onCancel={handleCancel}
          closeOnEsc={true}
        >
          <Button onClick={()=>vv.value = 'qweqwe'}>test</Button>
          <Demo/>
          This is the content of a basic modal.
          <br />
          More content...
        </Modal>
      </div>
    </div>
  )
})


export default ModalDemo2

