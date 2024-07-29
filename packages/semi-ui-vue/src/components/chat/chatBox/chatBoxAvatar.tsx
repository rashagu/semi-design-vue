import { defineComponent, ref, h, Fragment, useSlots, VNode, PropType } from 'vue';
import { CombineProps } from '../../interface';
import Avatar from '../../avatar';
import { Metadata } from '../interface';
import { cssClasses } from '@douyinfe/semi-foundation/chat/constants';
import cls from 'classnames';

const { PREFIX_CHAT_BOX } = cssClasses;

interface ChatBoxAvatarProps {
  // children?: string;
  role?: Metadata;
  continueSend?: boolean;
  customRenderFunc?: (props: { role?: Metadata; defaultAvatar?: VNode }) => VNode;
}

export const vuePropsType: CombineProps<ChatBoxAvatarProps> = {
  role: Object,
  continueSend: Boolean,
  customRenderFunc: Function as PropType<ChatBoxAvatarProps['customRenderFunc']>,
};
const chatBoxAvatar = defineComponent({
  props: { ...vuePropsType },
  name: 'chatBoxAvatar',
  setup(props, { attrs }) {
    const slots = useSlots();

    return () => {
      const { avatar, color } = props.role;
      const node = (
        <Avatar
          className={cls(`${PREFIX_CHAT_BOX}-avatar`, {
            [`${PREFIX_CHAT_BOX}-avatar-hidden`]: props.continueSend,
          })}
          src={avatar}
          size="extra-small"
        ></Avatar>
      );
      if (props.customRenderFunc && typeof props.customRenderFunc === 'function') {
        return props.customRenderFunc({
          role: props.role,
          defaultAvatar: node,
        });
      }
      return node;
    };
  },
});

export default chatBoxAvatar;
