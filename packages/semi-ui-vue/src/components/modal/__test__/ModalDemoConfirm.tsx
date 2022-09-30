import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Button from "../../button";
import Modal from "../index";
import {IconSend} from "@kousum/semi-icons-vue";

interface ModalDemoConfirmProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ModalDemoConfirm = defineComponent<ModalDemoConfirmProps>((props, {}) => {

  const slots = useSlots()
  function success() {
    Modal.success({ title: 'This is a success message', content: 'bla bla bla...' });
  }

  function info() {
    Modal.info({ title: 'Here is some info', content: 'bla bla bla...' });
  }

  function error() {
    Modal.error({ title: 'Unfortunately, there is an error', content: 'bla bla bla...' });
  }

  function warning() {
    Modal.warning({ title: 'Warning: be cautious ahead', content: 'bla bla bla...' });
  }

  function confirm() {
    Modal.confirm({ title: 'Are you sure ?', content: 'bla bla bla...' });
  }

  function custom() {
    Modal.info({
      title: 'This is a custom modal',
      content: 'bla bla bla...',
      icon: <IconSend />,
      cancelButtonProps: { theme: 'borderless' },
      okButtonProps: { theme: 'solid' },
    });
  }

  return () => (
    <div>
      <div>
        <Button onClick={info}>Info</Button>
        <br />
        <br />
        <Button onClick={success}>Success</Button>
        <br />
        <br />
        <Button onClick={error} type="danger">
          Error
        </Button>
        <br />
        <br />
        <Button onClick={warning} type="warning">
          Warning
        </Button>
        <br />
        <br />
        <Button onClick={confirm} type="primary">
          Confirm
        </Button>
        <br />
        <br />
        <Button onClick={custom}>Custom</Button>
      </div>
    </div>
  )
})

ModalDemoConfirm.props = vuePropsType
ModalDemoConfirm.name = 'ModalDemoConfirm'

export default ModalDemoConfirm

