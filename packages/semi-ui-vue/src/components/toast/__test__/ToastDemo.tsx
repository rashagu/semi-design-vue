import {defineComponent, ref, h, Fragment, useSlots, onMounted} from 'vue'
import Button from "../../button";
import Toast, {ToastList, useToastHook} from "../index";
import {throttle} from "lodash";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ToastDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const Toast = useToastHook()
  Toast.info({
    content:<div class={"test_class1"}>useToastHook</div>
  })
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
  const throttled = throttle(() => Toast.info(throttleOpts), 10000, {trailing: false});

  Toast.info(opts.value)




  // 有bug，而且没有动画，不建议使用
  const [toast_, contextHolder] = Toast.useToast();
  const config = {
    duration: 0,
    title: 'This is a success message',
    content: 123,
  };
  return () => (
    <div>

      <ToastList ref={(instance: any) => {
        instance.add({...{
            motion: true,
            zIndex: 1010,
            content: 'test',
          }, id: 'id'});
      }}/>
      <div>
        <Button onClick={() => {
          Toast.info(opts.value)
          setTimeout(() => {
            opts.value = {
              content: 'Hi, Bytedansssssssssssce dance dance',
              duration: 3,
            }
          }, 1000)
        }}>Display Toast</Button>
        <br/>


        <br/>
        <Button onClick={throttled} className={'Throttled'}>Throttled Toast</Button>


        <div>
          <Button
            onClick={() => {
              toast_.success(config);
            }}
          >
            Hook Toast
          </Button>
        </div>
        {contextHolder.value}
      </div>
    </div>
  )
})

// ToastDemo.props = vuePropsType
// ToastDemo.name = 'ToastDemo'

export default ToastDemo

