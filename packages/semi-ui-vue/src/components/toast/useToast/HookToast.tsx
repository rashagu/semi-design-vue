import Toast, { propTypes } from '../toast';
import { ToastInstance } from '@douyinfe/semi-foundation/toast/toastFoundation';
import { ComponentObjectPropsOptions, defineComponent, h, onMounted, PropType, ref, useSlots, watch } from 'vue';
import { CombineProps } from '../../interface';
import { useHasInProps } from '../../_base/baseComponent';

interface HookToastProps extends ToastInstance {
  afterClose: (id: string) => void;
  onMyMounted: (data: {close: any})=>void
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
  onMyMounted: {
    type: Function as PropType<HookToastProps['onMyMounted']>,
    required: true
  },
};
const HookToast = defineComponent({
  props: { ...vuePropsType },
  name: 'HookToast',
  setup(props, { expose }) {
    const slots = useSlots();
    const {getProps} = useHasInProps()

    const visible = ref();

    const close = () => {
      visible.value = false;
    };
    onMounted(()=>{
      props.onMyMounted({
        close: () => {
          visible.value = false
        }
      })
    })


    watch(visible, () => {
      if (!visible.value) {
        props.afterClose(props.id);
      }
    });


    return () => {
      const { afterClose, ...config } = getProps(props);
      return visible ? <Toast {...config} close={close} /> : null;
    };
  },
});

export default HookToast;
