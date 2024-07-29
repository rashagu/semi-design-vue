import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  PropType,
  VNode,
  shallowRef,
  reactive,
  onMounted,
  onUnmounted,
} from 'vue';
import * as PropTypes from '../../PropTypes';
import { CombineProps } from '../../interface';
import type { ChatBoxProps, Message } from '../interface';
import { IconThumbUpStroked,
  IconDeleteStroked,
  IconCopyStroked,
  IconLikeThumb,
  IconRedoStroked
} from '@kousum/semi-icons-vue';

import copy from 'copy-text-to-clipboard';
import { cssClasses, strings } from '@douyinfe/semi-foundation/chat/constants';
import ChatBoxActionFoundation, { ChatBoxActionAdapter } from '@douyinfe/semi-foundation/chat/chatBoxActionFoundation';
import { LocaleConsumerFunc } from '../../locale/localeConsumer';
import { Locale } from "../../locale/interface";
import cls from 'classnames';
import { chatBoxPropTypes } from './chatPropsType';
import Button from '../../button';
import Popconfirm from '../../popconfirm';
import { useBaseComponent } from '../../_base/baseComponent';
const LocaleConsumer = LocaleConsumerFunc<Locale["Chat"]>()

const { PREFIX_CHAT_BOX_ACTION } = cssClasses;
const { ROLE, MESSAGE_STATUS } = strings;

interface ChatBoxActionProps extends ChatBoxProps {
  customRenderFunc?: (props: { message?: Message; defaultActions?: VNode | VNode[]; className: string }) => VNode
  showReset?: boolean
}

interface ChatBoxActionState {
  visible: boolean;
  showAction: boolean
}

export const vuePropsType: CombineProps<ChatBoxActionProps> = {
  ...chatBoxPropTypes,
  role: PropTypes.object as PropType<ChatBoxActionProps['role']>,
  message: PropTypes.object,
  showReset: PropTypes.bool,
  onMessageBadFeedback: PropTypes.func as PropType<ChatBoxActionProps['onMessageBadFeedback']>,
  onMessageGoodFeedback: PropTypes.func as PropType<ChatBoxActionProps['onMessageGoodFeedback']>,
  onMessageCopy: PropTypes.func as PropType<ChatBoxActionProps['onMessageCopy']>,
  onChatsChange: PropTypes.func as PropType<ChatBoxActionProps['onChatsChange']>,
  onMessageDelete: PropTypes.func as PropType<ChatBoxActionProps['onMessageDelete']>,
  onMessageReset: PropTypes.func as PropType<ChatBoxActionProps['onMessageReset']>,
  customRenderFunc: PropTypes.func as PropType<ChatBoxActionProps['customRenderFunc']>,
};
const chatBoxAction = defineComponent({
  props: {...vuePropsType},
  name: 'chatBoxAction',
  setup(props, { attrs }) {
    const slots = useSlots();
    let copySuccessNode: VNode = null;
    const containerRef = shallowRef();
    let popconfirmTriggerRef = shallowRef();
    let clickOutsideHandler: any = null;

    const state = reactive<ChatBoxActionState>({
      visible: false,
      showAction: false,
    })
    onMounted(()=>{
      copySuccessNode = <LocaleConsumer componentName="Chat" >
        {(locale: Locale["Chat"]) => locale['copySuccess']}
      </LocaleConsumer>;
    })
    onUnmounted(()=>{
      foundation.destroy();
    })
    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state)
    function adapter_(): ChatBoxActionAdapter<ChatBoxActionProps, ChatBoxActionState> {
      return {
        ...adapterInject(),
        notifyDeleteMessage: () => {
          const { message, onMessageDelete } = props;
          onMessageDelete?.(message);
        },
        notifyMessageCopy: () => {
          const { message, onMessageCopy } = props;
          onMessageCopy?.(message);
        },
        copyToClipboardAndToast: () => {
          const { message = {}, toast } = props;
          if (typeof message.content === 'string') {
            copy(message.content);
          } else if (Array.isArray(message.content)) {
            const content = message.content?.map(item => item.text).join('');
            copy(content);
          }
          toast.success({
            content: copySuccessNode
          });
        },
        notifyLikeMessage: () => {
          const { message, onMessageGoodFeedback } = props;
          onMessageGoodFeedback?.(message);
        },
        notifyDislikeMessage: () => {
          const { message, onMessageBadFeedback } = props;
          onMessageBadFeedback?.(message);
        },
        notifyResetMessage: () => {
          const { message, onMessageReset } = props;
          onMessageReset?.(message);
        },
        setVisible: (visible) => {
          state.visible = visible
        },
        setShowAction: (showAction) => {
          state.showAction = showAction
        },
        registerClickOutsideHandler: (cb: () => void) => {
          if (clickOutsideHandler) {
            adapter.unregisterClickOutsideHandler();
          }
          clickOutsideHandler = (e: MouseEvent): any => {
            let el = popconfirmTriggerRef.value;
            const target = e.target as Element;
            const path = (e as any).composedPath && (e as any).composedPath() || [target];
            if (
              el && !(el as any).contains(target) &&
              ! path.includes(el)
            ) {
              cb();
            }
          };
          window.addEventListener('mousedown', clickOutsideHandler);
        },
        unregisterClickOutsideHandler: () => {
          if (clickOutsideHandler) {
            window.removeEventListener('mousedown', clickOutsideHandler);
            clickOutsideHandler = null;
          }
        },
      };
    }
    const adapter = adapter_()
    const foundation = new ChatBoxActionFoundation(adapter);

    const copyNode = () => {
      return <Button
        key={'copy'}
        theme='borderless'
        icon={<IconCopyStroked />}
        type='tertiary'
        onClick={foundation.copyMessage}
        className={`${PREFIX_CHAT_BOX_ACTION}-btn`}
      />;
    }

    const likeNode = () => {
      const { message = {} } = props;
      const { like } = message;
      return <Button
        key={'like'}
        theme='borderless'
        icon={like ? <IconLikeThumb /> : <IconThumbUpStroked /> }
        type='tertiary'
        className={`${PREFIX_CHAT_BOX_ACTION}-btn`}
        onClick={foundation.likeMessage}
      />;
    }

    const dislikeNode = () => {
      const { message = {} } = props;
      const { dislike } = message;
      return <Button
        theme='borderless'
        key={'dislike'}
        icon={dislike ? <IconLikeThumb className={`${PREFIX_CHAT_BOX_ACTION}-icon-flip`} /> : <IconThumbUpStroked className={'semi-chat-chatBox-action-icon-flip'} />}
        type='tertiary'
        className={`${PREFIX_CHAT_BOX_ACTION}-btn`}
        onClick={foundation.dislikeMessage}
      />;
    }

    const resetNode = () => {
      return <Button
        key={'reset'}
        theme='borderless'
        icon={<IconRedoStroked className={`${PREFIX_CHAT_BOX_ACTION}-icon-redo`}/>}
        type='tertiary'
        onClick={foundation.resetMessage}
        className={`${PREFIX_CHAT_BOX_ACTION}-btn`}
      />;
    }

    const deleteNode = () => {
      const deleteMessage = (<LocaleConsumer componentName="Chat" >
        {(locale: Locale["Chat"]) => locale['deleteConfirm']}
      </LocaleConsumer>);
      return (
        <Popconfirm
          trigger="custom"
          visible={state.visible}
          key={'delete'}
          title={deleteMessage}
          onConfirm={foundation.deleteMessage}
          onCancel={foundation.hideDeletePopup}
          position="top"
        >
          <span ref={popconfirmTriggerRef} class={`${PREFIX_CHAT_BOX_ACTION}-delete-wrap`}>
            <Button
              theme="borderless"
              icon={<IconDeleteStroked />}
              type="tertiary"
              className={`${PREFIX_CHAT_BOX_ACTION}-btn`}
              onClick={foundation.showDeletePopup}
            />
          </span>
        </Popconfirm>
      );
    }

    return () => {
      const { message = {}, lastChat } = props;
      const { showAction } = state;
      const { role, status = MESSAGE_STATUS.COMPLETE } = message;
      const complete = status === MESSAGE_STATUS.COMPLETE ;
      const showFeedback = role !== ROLE.USER && complete;
      const showReset = lastChat && role === ROLE.ASSISTANT;
      const finished = status !== MESSAGE_STATUS.LOADING && status !== MESSAGE_STATUS.INCOMPLETE;
      const wrapCls = cls(PREFIX_CHAT_BOX_ACTION, {
        [`${PREFIX_CHAT_BOX_ACTION}-show`]: showReset && finished || showAction,
        [`${PREFIX_CHAT_BOX_ACTION}-hidden`]: !finished,
      });
      const { customRenderFunc } = props;
      if (customRenderFunc) {
        const actionNodes = [];
        complete && actionNodes.push(copyNode());
        showFeedback && actionNodes.push(likeNode());
        showFeedback && actionNodes.push(dislikeNode());
        showReset && actionNodes.push(resetNode());
        actionNodes.push(deleteNode());
        return customRenderFunc({
          message,
          defaultActions: actionNodes,
          className: wrapCls
        });
      }
      return <div class={wrapCls} ref={containerRef}>
        {complete && copyNode()}
        {showFeedback && likeNode()}
        {showFeedback && dislikeNode()}
        {showReset && resetNode()}
        {deleteNode()}
      </div>;
    };
  },
});


export default chatBoxAction;

