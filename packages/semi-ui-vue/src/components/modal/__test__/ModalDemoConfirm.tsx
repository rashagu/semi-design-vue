import {defineComponent, ref, h, Fragment, useSlots, onMounted} from 'vue'
import Button from "../../button";
import {ModalClass} from "../index";
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
    ModalClass.success({ title: 'This is a success message', content: 'bla bla bla...' });
  }

  function info() {
    ModalClass.info({ title: 'Here is some info', content: 'bla bla bla...' });
  }

  function error() {
    ModalClass.error({ title: 'Unfortunately, there is an error', content: 'bla bla bla...' });
  }

  function warning() {
    ModalClass.warning({ title: 'Warning: be cautious ahead', content: 'bla bla bla...' });
  }

  const container = ref()
  function confirm() {
    ModalClass.confirm({
      getContainerContext: ()=>container.value,
      title: 'Are you sure ?',
      content: 'bla bla bla...',
    });
  }

  function custom() {
    ModalClass.info({
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
},{
  props: vuePropsType,
  name: 'ModalDemoConfirm'
})


export default ModalDemoConfirm

