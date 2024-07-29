import { defineComponent, ref, h, Fragment, useSlots, CSSProperties } from 'vue';
import { CombineProps } from '../../interface';
import * as PropTypes from '../../PropTypes';
import cls from 'classnames';
import type { ChatBoxProps } from '../interface';
import ChatBoxAvatar from './chatBoxAvatar';
import ChatBoxTitle from './chatBoxTitle';
import ChatBoxContent from './chatBoxContent';
import ChatBoxAction from './chatBoxAction';
import { cssClasses, strings } from '@douyinfe/semi-foundation/chat/constants';
import { useMemo } from '../../_utils/useMemo';
import { chatBoxPropTypes } from './chatPropsType';
import { vuePropsMake } from '../../PropTypes';

const { PREFIX_CHAT_BOX } = cssClasses;
const { ROLE, CHAT_ALIGN } = strings;

const vuePropsType = vuePropsMake(chatBoxPropTypes, {chatBoxRenderConfig:{}})
const index = defineComponent({
  props: { ...vuePropsType },
  name: 'index',
  setup(props, { attrs }) {
    const slots = useSlots();

    const continueSend = useMemo(() => {
      return props.message?.role === props.previousMessage?.role;
    }, [() => props.message.role, () => props.previousMessage]);

    const info = useMemo(() => {
      let info = {};
      if (props.roleConfig) {
        info = props.roleConfig[props.message.role] ?? {};
      }
      return info;
    }, [() => props.message.role, () => props.roleConfig]);

    const avatarNode = useMemo(() => {
      return (
        <ChatBoxAvatar
          continueSend={continueSend.value}
          role={info.value}
          customRenderFunc={props.chatBoxRenderConfig.renderChatBoxAvatar}
        />
      );
    }, [info, () => props.chatBoxRenderConfig.renderChatBoxAvatar]);

    const titleNode = useMemo(() => {
      return (
        <ChatBoxTitle
          role={info.value}
          message={props.message}
          customRenderFunc={props.chatBoxRenderConfig.renderChatBoxTitle}
        />
      );
    }, [info, () => props.message, ()=>props.chatBoxRenderConfig.renderChatBoxTitle]);

    const contentNode = useMemo(() => {
      return (
        <ChatBoxContent
          mode={props.mode}
          role={info.value}
          message={props.message}
          customMarkDownComponents={props.customMarkDownComponents}
          customRenderFunc={props.chatBoxRenderConfig.renderChatBoxContent}
        />
      );
    }, [() => props.message, info, () => props.chatBoxRenderConfig.renderChatBoxContent]);

    const actionNode = useMemo(() => {
      return (
        <ChatBoxAction
          toast={props.toast}
          role={info.value}
          message={props.message}
          lastChat={props.lastChat}
          onMessageBadFeedback={props.onMessageBadFeedback}
          onMessageCopy={props.onMessageCopy}
          onChatsChange={props.onChatsChange}
          onMessageDelete={props.onMessageDelete}
          onMessageGoodFeedback={props.onMessageGoodFeedback}
          onMessageReset={props.onMessageReset}
          customRenderFunc={props.chatBoxRenderConfig.renderChatBoxAction}
        />
      );
    }, [
      () => props.message,
      info,
      () => props.lastChat,
      () => props.onMessageBadFeedback,
      () => props.onMessageGoodFeedback,
      () => props.onMessageCopy,
      () => props.onChatsChange,
      () => props.onMessageDelete,
      () => props.onMessageReset,
      () => props.chatBoxRenderConfig.renderChatBoxAction,
    ]);

    const containerCls = useMemo(
      () =>
        cls(PREFIX_CHAT_BOX, {
          [`${PREFIX_CHAT_BOX}-right`]: props.message.role === ROLE.USER && props.align === CHAT_ALIGN.LEFT_RIGHT,
        }),
      [()=>props.message.role, ()=>props.align]
    );

    return () => {
      const {
        message,
        lastChat,
        align,
        toast,
        mode,
        roleConfig,
        onMessageBadFeedback,
        onMessageGoodFeedback,
        onMessageCopy,
        onChatsChange,
        onMessageDelete,
        onMessageReset,
        chatBoxRenderConfig = {},
        customMarkDownComponents,
        previousMessage,
      } = props;
      const { renderChatBoxAvatar, renderChatBoxAction, renderChatBoxContent, renderChatBoxTitle, renderFullChatBox } =
        chatBoxRenderConfig;

      if (typeof renderFullChatBox !== 'function') {
        return (
          <div class={containerCls.value}>
            {avatarNode.value}
            <div class={`${PREFIX_CHAT_BOX}-wrap`}>
              {!continueSend.value && titleNode.value}
              {contentNode.value}
              {actionNode.value}
            </div>
          </div>
        );
      } else {
        return renderFullChatBox({
          message,
          role: info,
          defaultNodes: {
            avatar: avatarNode.value,
            title: titleNode.value,
            content: contentNode.value,
            action: actionNode.value,
          },
          className: containerCls.value,
        });
      }
    };
  },
});

export default index;
