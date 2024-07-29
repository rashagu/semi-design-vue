import { CombineProps } from '../../interface';
import * as PropTypes from '../../PropTypes';
import { PropType } from 'vue';
import type { ChatBoxProps, ChatProps, CommonChatsProps } from '../interface';
import { omit } from 'lodash';

interface ChatContentProps extends CommonChatsProps {}
export const chatContentVuePropsType: CombineProps<ChatContentProps> = {
  role: String,
  align: PropTypes.string as PropType<ChatContentProps['align']>,
  mode: PropTypes.string as PropType<ChatContentProps['mode']>,
  chats: PropTypes.array,
  roleConfig: PropTypes.object,
  onMessageDelete: PropTypes.func as PropType<ChatContentProps['onMessageDelete']>,
  onChatsChange: PropTypes.func as PropType<ChatProps['onChatsChange']>,
  onMessageBadFeedback: PropTypes.func as PropType<ChatContentProps['onMessageBadFeedback']>,
  onMessageGoodFeedback: PropTypes.func as PropType<ChatContentProps['onMessageGoodFeedback']>,
  onMessageReset: PropTypes.func as PropType<ChatContentProps['onMessageReset']>,
  onMessageCopy: PropTypes.func as PropType<ChatContentProps['onMessageCopy']>,
  chatBoxRenderConfig: PropTypes.object,
  customMarkDownComponents: PropTypes.object,
}


export const chatBoxPropTypes: CombineProps<ChatBoxProps> = {
  ...omit(chatContentVuePropsType, 'chats'),
  toast: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  previousMessage: PropTypes.object,
  message: PropTypes.object,
  lastChat: PropTypes.bool,
  customMarkDownComponents: PropTypes.object,
};
