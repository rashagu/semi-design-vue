import Divider from '../divider';
import ChatBox from './chatBox';
import { cssClasses, strings } from '@douyinfe/semi-foundation/chat/constants';
import { Locale } from '../locale/interface';

import { defineComponent, Fragment, PropType } from 'vue';
import { LocaleConsumerFunc } from '../locale/localeConsumer';
import { chatContentVuePropsType } from './chatBox/chatPropsType';
import Toast from '../toast';
const LocaleConsumer = LocaleConsumerFunc<Locale['Chat']>();

const { PREFIX_DIVIDER, PREFIX } = cssClasses;
const { ROLE } = strings;


const ChatContent = defineComponent({
  props: {...chatContentVuePropsType},
  name: 'ChatContent',
  setup(props) {
    const [toast, contextHolder] = Toast.useToast();
    return () => {
      const {
        chats,
        onMessageBadFeedback,
        onMessageCopy,
        mode,
        onChatsChange,
        onMessageDelete,
        onMessageGoodFeedback,
        onMessageReset,
        roleConfig,
        chatBoxRenderConfig,
        align,
        customMarkDownComponents, renderDivider,
      } = props;
      return (
        <Fragment>
          {chats.map((item, index) => {
            const lastMessage = index === chats.length - 1;
            return item.role === ROLE.DIVIDER ? (
              renderDivider ? renderDivider(item) : <Divider key={item.id} className={PREFIX_DIVIDER}>
                <LocaleConsumer componentName="Chat">
                  {(locale: Locale['Chat']) => locale['clearContext']}
                </LocaleConsumer>
              </Divider>
            ) : (
              <ChatBox
                previousMessage={index ? chats[index - 1] : undefined}
                toast={toast}
                align={align}
                mode={mode}
                key={item.id}
                message={item}
                roleConfig={roleConfig}
                onMessageBadFeedback={onMessageBadFeedback}
                onMessageCopy={onMessageCopy}
                onChatsChange={onChatsChange}
                onMessageDelete={onMessageDelete}
                onMessageGoodFeedback={onMessageGoodFeedback}
                onMessageReset={onMessageReset}
                lastChat={lastMessage}
                customMarkDownComponents={customMarkDownComponents}
                chatBoxRenderConfig={chatBoxRenderConfig}
              />
            );
          })}
          <div class={`${PREFIX}-toast`}>{contextHolder.value as any}</div>
        </Fragment>
      );
    };
  },
});

export default ChatContent;
