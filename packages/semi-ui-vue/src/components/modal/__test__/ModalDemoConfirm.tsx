import {defineComponent, ref, h, Fragment, useSlots, onMounted} from 'vue'
import Button from "../../button";
import {ModalConfirm} from "../index";
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
    ModalConfirm.success({ title: 'This is a success message', content: 'bla bla bla...' });
  }

  function info() {
    ModalConfirm.info({ title: 'Here is some info', content: 'bla bla bla...' });
  }

  function error() {
    ModalConfirm.error({ title: 'Unfortunately, there is an error', content: 'bla bla bla...' });
  }

  function warning() {
    ModalConfirm.warning({ title: 'Warning: be cautious ahead', content: 'bla bla bla...' });
  }

  const container = ref()
  function confirm() {
    ModalConfirm.confirm({
      getContainerContext: ()=>container.value,
      title: 'Are you sure ?',
      content: 'bla bla bla...',
    });
  }

  function custom() {
    ModalConfirm.info({
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
          <div data-testid="custom-element" >Confirm</div>
        </Button>
        <br />
        <br />
        <Button onClick={custom}>Custom</Button>
      </div>
      <div ref={container}>

      </div>
    </div>
  )
})

ModalDemoConfirm.props = vuePropsType
ModalDemoConfirm.name = 'ModalDemoConfirm'

export default ModalDemoConfirm

