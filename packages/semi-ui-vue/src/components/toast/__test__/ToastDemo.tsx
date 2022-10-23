import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Button from "../../button";
import Toast from "../index";
import {throttle} from "lodash";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ToastDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  // const Toast = useToastHook()
  const opts = ref({
    content: 'Hi, Bytedance dance dance',
    duration: 3,
  });

  const handleClose = () => {
    throttled.cancel();
  };
  const throttleOpts = {
    content: 'Hi, Bytedance dance dance',
    duration: 10,
    onClose: handleClose,
  };
  const throttled = throttle(() => Toast.info(throttleOpts), 10000, { trailing: false });

  return () => (
    <div>
      <div>
        <Button onClick={() => {
          Toast.info(opts.value)
          setTimeout(()=>{
            opts.value = {
              content: 'Hi, Bytedansssssssssssce dance dance',
              duration: 3,
            }
          }, 1000)
        }}>Display Toast</Button>
        <br />
        <br />
        <Button onClick={throttled}>Throttled Toast</Button>
      </div>
    </div>
  )
})

ToastDemo.props = vuePropsType
ToastDemo.name = 'ToastDemo'

export default ToastDemo

