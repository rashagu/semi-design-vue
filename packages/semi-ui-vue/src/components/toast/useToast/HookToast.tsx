import Toast, { propTypes } from '../toast';
import { ToastInstance } from '@douyinfe/semi-foundation/toast/toastFoundation';
import { ComponentObjectPropsOptions, defineComponent, h, PropType, ref, useSlots, watch } from 'vue';
import { CombineProps } from '../../interface';

interface HookToastProps extends ToastInstance {
  afterClose: (id: string) => void;
}

export const vuePropsType: CombineProps<HookToastProps> = {
  ...propTypes,
  content: undefined,
  id: String as PropType<HookToastProps['id']>,
  motion: Boolean as PropType<HookToastProps['motion']>,
  afterClose: {
    type: Function as PropType<HookToastProps['afterClose']>,
    required: true,
  },
};
const HookToast = defineComponent({
  props: vuePropsType,
  name: 'HookToast',
  setup(props, { attrs }) {
    const slots = useSlots();
    const config: any = attrs;

    const visible = ref();

    const close = () => {
      visible.value = false;
    };

    // React.useImperativeHandle(ref, () => ({
    //     close: () => {
    //         visible.value = false
    //     }
    // }));

    watch(visible, () => {
      if (!visible.value) {
        props.afterClose(config.id);
      }
    });
    return () => {
      return visible ? <Toast {...config} close={close} /> : null;
    };
  },
});

export default HookToast;
