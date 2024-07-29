import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import Toast from '../index';
import Button from '../../button';

interface ToastUseDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<ToastUseDemoProps> = {
  name: String,
};
const ToastUseDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'ToastUseDemo',
  setup(props, { attrs }) {
    const slots = useSlots();
    const [toast, contextHolder] = Toast.useToast();
    const config = {
      duration: 0,
      title: 'This is a success message',
      content: <div>sdsd</div>,
    };
    let id = '';

    return () => {
      return (
        <div>
          <div>
            <Button
              onClick={() => {
                id = toast.success(config);
              }}
            >
              Hook Toast
            </Button>
          </div>
          <Button
            onClick={() => {
              toast.close(id);
            }}
          >
            close
          </Button>
          {contextHolder.value}
        </div>
      );
    };
  },
});

export default ToastUseDemo;
