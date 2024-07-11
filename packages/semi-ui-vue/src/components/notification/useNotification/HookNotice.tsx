import Notice from '../notice';
import { NoticeInstance } from '@douyinfe/semi-foundation/notification/notificationFoundation';
import { ComponentObjectPropsOptions, defineComponent, h, PropType, ref, useSlots, watch } from 'vue';
import { CombineProps } from '../../interface';

export interface HookNoticeProps extends NoticeInstance {
  afterClose: (id: string) => void;
}

export const vuePropsType = {
  id: String,
  afterClose: {
    type: Function as PropType<HookNoticeProps['afterClose']>,
    required: true,
  },
  motion: [Object, String, Boolean] as PropType<HookNoticeProps['motion']>,
};
const HookNotice = defineComponent({
  props: { ...vuePropsType },
  name: 'HookNotice',
  setup(props, { expose, attrs }) {
    const slots = useSlots();
    const visible = ref(true);

    function setVisible(val: boolean) {
      visible.value = val;
    }
    const close = () => {
      setVisible(false);
    };
    watch(
      visible,
      () => {
        if (!visible.value) {
          props.afterClose(String(props.id));
        }
      },
      { immediate: true }
    );

    return () => {
      const { afterClose, ...config } = attrs;

      return visible ? <Notice {...config} onHookClose={close} /> : null;
    };
  },
});

export default HookNotice;
