import { defineComponent, ref, h, Fragment, useSlots, VNode, PropType } from 'vue';
import { CombineProps } from '../../interface';
import type { Message, Metadata, RenderTitleProps } from '../interface';
import { cssClasses } from '@douyinfe/semi-foundation/chat/constants';
const { PREFIX_CHAT_BOX } = cssClasses;

interface ChatBoxTitleProps {
  // children?: VNode | undefined | any;
  role?: Metadata;
  message?: Message;
  customRenderFunc?: (props: RenderTitleProps) => VNode;
}

export const vuePropsType: CombineProps<ChatBoxTitleProps> = {
  role: Object as PropType<ChatBoxTitleProps['message']>,
  message: Object as PropType<ChatBoxTitleProps['message']>,
  customRenderFunc: Function as PropType<ChatBoxTitleProps['customRenderFunc']>,
};
const chatBoxTitle = defineComponent({
  props: { ...vuePropsType },
  name: 'chatBoxTitle',
  setup(props, { attrs }) {
    const slots = useSlots();

    return () => {
      const { role, message, customRenderFunc } = props;
      const title = <span class={`${PREFIX_CHAT_BOX}-title`}>{role?.name}</span>;

      if (customRenderFunc && typeof customRenderFunc === 'function') {
        return customRenderFunc({
          role,
          message,
          defaultTitle: title,
        });
      }
      return title;
    };
  },
});

export default chatBoxTitle;
