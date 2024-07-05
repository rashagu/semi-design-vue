import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Button from "../../button";
import ConfigProvider from "../../configProvider";
import en_GB from "../../locale/source/en_GB";
import useModal from "../useModal";

interface ModalDemoConfirmProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ModalDemoConfirm = defineComponent((props, {}) => {
  const [modal, contextHolder] = useModal();
  const config = { title: 'This is a success message', content: 'Context consumer' };

  modal.confirm(config);
  function onClick() {
    let a = modal.confirm(config);
    setTimeout(()=>{
      // a.destroy()
      console.log(a)
    }, 3000)
  }
  return () => (
    <div>
      <ConfigProvider locale={en_GB}>
        <div>
          <Button
            onClick={onClick}
          >
            Confirm Modal Hook
          </Button>
        </div>
        {contextHolder.value}
      </ConfigProvider>
    </div>
  )
}, {
  props: vuePropsType,
  name: 'ModalDemoConfirm'
})



export default ModalDemoConfirm

