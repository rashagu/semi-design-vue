import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  reactive,
  watch,
  onMounted,
  onUnmounted,
  PropType,
  nextTick,
} from 'vue';
import { CombineProps } from '../interface';
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import type { ChatProps, ChatState, Message } from './interface';
import InputBox from './inputBox';
import '@douyinfe/semi-foundation/chat/chat.scss';
import Hint from './hint';
import { IconChevronDown, IconDisc } from '@kousum/semi-icons-vue';
import ChatContent from './chatContent';
import { cssClasses, strings } from '@douyinfe/semi-foundation/chat/constants';
import ChatFoundation, { ChatAdapter } from '@douyinfe/semi-foundation/chat/foundation';
import type { FileItem } from '../upload';
import { Locale } from '../locale/interface';
import { vuePropsMake } from '../PropTypes';
import { LocaleConsumerFunc } from '../locale/localeConsumer';
import Button from '../button';
import { useBaseComponent } from '../_base/baseComponent';
const LocaleConsumer = LocaleConsumerFunc<Locale['Chat']>();

const prefixCls = cssClasses.PREFIX;
const { CHAT_ALIGN, MODE, SEND_HOT_KEY, MESSAGE_STATUS } = strings;

export const chatPropTypes: CombineProps<ChatProps> = {
  role: String,
  className: PropTypes.string,
  style: PropTypes.object,
  roleConfig: PropTypes.object,
  chats: PropTypes.array,
  hints: PropTypes.array,
  renderHintBox: PropTypes.func as PropType<ChatProps['renderHintBox']>,
  onChatsChange: PropTypes.func as PropType<ChatProps['onChatsChange']>,
  align: PropTypes.string as PropType<ChatProps['align']>,
  chatBoxRenderConfig: PropTypes.object,
  customMarkDownComponents: PropTypes.object,
  onClear: PropTypes.func as PropType<ChatProps['onClear']>,
  onMessageDelete: PropTypes.func as PropType<ChatProps['onMessageDelete']>,
  onMessageReset: PropTypes.func as PropType<ChatProps['onMessageReset']>,
  onMessageCopy: PropTypes.func as PropType<ChatProps['onMessageCopy']>,
  onMessageGoodFeedback: PropTypes.func as PropType<ChatProps['onMessageGoodFeedback']>,
  onMessageBadFeedback: PropTypes.func as PropType<ChatProps['onMessageBadFeedback']>,
  onInputChange: PropTypes.func as PropType<ChatProps['onMessageBadFeedback']>,
  inputContentConvert: PropTypes.func as PropType<ChatProps['inputContentConvert']>,
  onMessageSend: PropTypes.func as PropType<ChatProps['onMessageSend']>,
  InputBoxStyle: PropTypes.object as PropType<ChatProps['InputBoxStyle']>,
  onHintClick: PropTypes.func as PropType<ChatProps['onHintClick']>,
  onStopGenerator: PropTypes.func as PropType<ChatProps['onStopGenerator']>,
  inputBoxStyle: PropTypes.object as PropType<ChatProps['inputBoxStyle']>,
  renderInputArea: PropTypes.func as PropType<ChatProps['renderInputArea']>,
  sendHotKey: PropTypes.string as PropType<ChatProps['sendHotKey']>,
  inputBoxCls: PropTypes.string,
  renderFullInputBox: PropTypes.func as PropType<ChatProps['renderFullInputBox']>,
  placeholder: PropTypes.string,
  topSlot: (PropTypes.node || PropTypes.array) as PropType<ChatProps['topSlot']>,
  bottomSlot: (PropTypes.node || PropTypes.array) as PropType<ChatProps['bottomSlot']>,
  showStopGenerate: PropTypes.bool,
  showClearContext: PropTypes.bool,
  hintStyle: PropTypes.object,
  hintCls: PropTypes.string,
  uploadProps: PropTypes.object,
  uploadTipProps: PropTypes.object,
  mode: PropTypes.string as PropType<ChatProps['mode']>,
  renderDivider: PropTypes.func as PropType<ChatProps['renderDivider']>,
};
const defaultProps = {
  align: CHAT_ALIGN.LEFT_RIGHT,
  showStopGenerate: false,
  mode: MODE.BUBBLE,
  showClearContext: false,
  sendHotKey: SEND_HOT_KEY.ENTER,
};
const vuePropsType = vuePropsMake(chatPropTypes, defaultProps);
const index = defineComponent({
  props: { ...vuePropsType },
  name: 'index',
  setup(props, { attrs }) {
    const slots = useSlots();
    const containerRef = ref();
    let animation: any;
    let wheelEventHandler: any;
    const uploadRef = ref();
    const dropAreaRef = ref();
    const scrollTargetRef = ref();

    const state = reactive({
      backBottomVisible: false,
      chats: [],
      cacheHints: [],
      wheelScroll: false,
      uploadAreaVisible: false,
    });
    const { adapter: adapterInject } = useBaseComponent(props, state);
    function adapter_(): ChatAdapter {
      return {
        ...adapterInject(),
        getContainerRef: () => {
          return containerRef.value
        },
        setWheelScroll: (flag: boolean) => {
          state.wheelScroll = flag
        },
        notifyChatsChange: (chats: Message[]) => {
          const { onChatsChange } = props;
          onChatsChange && onChatsChange(chats);
        },
        notifyLikeMessage: (message: Message) => {
          const { onMessageGoodFeedback } = props;
          onMessageGoodFeedback && onMessageGoodFeedback(message);
        },
        notifyDislikeMessage: (message: Message) => {
          const { onMessageBadFeedback } = props;
          onMessageBadFeedback && onMessageBadFeedback(message);
        },
        notifyCopyMessage: (message: Message) => {
          const { onMessageCopy } = props;
          onMessageCopy && onMessageCopy(message);
        },
        notifyClearContext: () => {
          const { onClear } = props;
          onClear && onClear();
        },
        notifyMessageSend: (content: string, attachment: any[]) => {
          const { onMessageSend } = props;
          onMessageSend && onMessageSend(content, attachment);
        },
        notifyInputChange: (props_: { inputValue: string; attachment: any[] }) => {
          const { onInputChange } = props;
          onInputChange && onInputChange(props_);
        },
        setBackBottomVisible: (visible: boolean) => {

          if (state.backBottomVisible !== visible) {
            state.backBottomVisible = visible
          }
        },
        registerWheelEvent: () => {
          adapter.unRegisterWheelEvent();
          const containerElement = containerRef.value;
          if (!containerElement) {
            return;
          }
          wheelEventHandler = (e: any) => {
            /**
             * Why use this.scrollTargetRef.current and wheel's currentTarget target comparison?
             * Both scroll and wheel events are on the container
             * his.scrollTargetRef.current is the object where scrolling actually occurs
             * wheel's currentTarget is the container,
             * Only when the wheel event occurs and there is scroll, the following logic(show scroll bar) needs to be executed
             */
            if (scrollTargetRef?.value !== e.currentTarget) {
              return;
            }
            adapter.setWheelScroll(true);
            adapter.unRegisterWheelEvent();
          };

          containerElement.addEventListener('wheel', wheelEventHandler);
        },
        unRegisterWheelEvent: () => {
          if (wheelEventHandler) {
            const containerElement = containerRef.value;
            if (!containerElement) {
              return;
            } else {
              containerElement.removeEventListener('wheel', wheelEventHandler);
            }
            wheelEventHandler = null;
          }
        },
        notifyStopGenerate: (e: MouseEvent) => {
          const { onStopGenerator } = props;
          onStopGenerator && onStopGenerator(e);
        },
        notifyHintClick: (hint: string) => {
          const { onHintClick } = props;
          onHintClick && onHintClick(hint);
        },
        setUploadAreaVisible: (visible: boolean) => {
          state.uploadAreaVisible = visible
        },
        manualUpload: (file: File[]) => {
          const uploadComponent = uploadRef.value;
          if (uploadComponent) {
            uploadComponent.insert(file);
          }
        },
        getDropAreaElement: () => {
          return dropAreaRef?.value;
        },
      };
    }
    const adapter = adapter_();
    const foundation = new ChatFoundation(adapter);
    function getDerivedStateFromProps(nextProps: ChatProps, prevState: ChatState) {
      const { chats, hints } = nextProps;
      const newState = {} as any;
      if (chats !== prevState.chats) {
        newState.chats = chats ?? [];
      }
      if (hints !== prevState.cacheHints) {
        newState.cacheHints = hints;
      }
      if (Object.keys(newState).length) {
        return newState;
      }
      return null;
    }

    watch([() => props.chats, () => props.hints, () => state.chats, () => state.cacheHints], (val) => {
      const newState = getDerivedStateFromProps({ ...props }, { ...state });
      if (newState) {
        Object.keys(newState).forEach((key) => {
          state[key] = newState[key];
        });
      }
    }, {immediate: true});

    onMounted(() => {
      foundation.init();
    });
    onUnmounted(() => {
      foundation.destroy();
    });

    function resetMessage() {
      foundation.resetMessage(null);
    }

    function clearContext() {
      foundation.clearContext(null);
    }

    function scrollToBottom(animation: boolean) {
      if (animation) {
        foundation.scrollToBottomWithAnimation();
      } else {
        foundation.scrollToBottomImmediately();
      }
    }

    function sendMessage(content: string, attachment: FileItem[]) {
      foundation.onMessageSend(content, attachment);
    }

    watch(
      [() => props.chats, () => props.hints, () => state.chats, () => state.cacheHints, () => state.wheelScroll],
      (value, oldValue, onCleanup) => {
        const { chats: newChats, hints: newHints } = props;
        const { chats: oldChats, cacheHints } = { chats: oldValue[2], cacheHints: oldValue[3] };
        const { wheelScroll } = state;
        let shouldScroll = false;
        if (newChats !== oldChats) {
          if (Array.isArray(newChats) && Array.isArray(oldChats)) {
            const newLastChat = newChats[newChats.length - 1];
            const oldLastChat = oldChats[oldChats.length - 1];
            if (newChats.length > oldChats.length) {
              if (oldChats.length === 0 || newLastChat.id !== oldLastChat.id) {
                shouldScroll = true;
              }
            } else if (newChats.length === oldChats.length &&
              (newLastChat.status !== 'complete' || newLastChat.status !== oldLastChat.status)
            ) {
              shouldScroll = true;
            }
          }
        }
        if (newHints !== cacheHints) {
          if (newHints.length > cacheHints.length) {
            shouldScroll = true;
          }
        }
        if (!wheelScroll && shouldScroll) {
          nextTick(()=>{
            foundation.scrollToBottomImmediately();
          })
        }
      }
    );

    function containerScroll(e: Event){
      scrollTargetRef.value = e.target as HTMLElement;
      foundation.containerScroll(e)
    }
    return () => {
      const {
        topSlot,
        bottomSlot,
        roleConfig,
        hints,
        onChatsChange,
        onMessageCopy,
        renderInputArea,
        chatBoxRenderConfig,
        align,
        renderHintBox,
        style,
        className,
        showStopGenerate,
        customMarkDownComponents,
        mode,
        showClearContext,
        placeholder,
        inputBoxCls,
        inputBoxStyle,
        hintStyle,
        hintCls,
        uploadProps,
        uploadTipProps,
        sendHotKey, renderDivider
      } = props;
      const { backBottomVisible, chats, wheelScroll, uploadAreaVisible } = state;
      let showStopGenerateFlag = false;
      const lastChat = chats.length > 0 && chats[chats.length - 1];
      let disableSend = false;
      if (lastChat && showStopGenerate) {
        const lastChatOnGoing = lastChat?.status && [MESSAGE_STATUS.LOADING, MESSAGE_STATUS.INCOMPLETE].includes(lastChat?.status);
        disableSend = lastChatOnGoing;
        showStopGenerate && (showStopGenerateFlag = lastChatOnGoing);
      }
      return (
        <div class={cls(`${prefixCls}`, className)} style={style} onDragover={foundation.handleDragOver}>
          {uploadAreaVisible && (
            <div
              ref={dropAreaRef}
              class={`${prefixCls}-dropArea`}
              onDragover={foundation.handleContainerDragOver}
              onDrop={foundation.handleContainerDrop}
              onDragleave={foundation.handleContainerDragLeave}
            >
              <span class={`${prefixCls}-dropArea-text`}>
                <LocaleConsumer componentName="Chat">
                  {(locale: Locale['Chat']) => locale['dropAreaText']}
                </LocaleConsumer>
              </span>
            </div>
          )}
          <div class={`${prefixCls}-inner`}>
            {/* top slot */}
            {topSlot}
            {/* chat area */}
            <div class={`${prefixCls}-content`}>
              <div
                data-testid={"chat-container-scroll"}
                class={cls(`${prefixCls}-container`, {
                  'semi-chat-container-scroll-hidden': !wheelScroll,
                })}
                onScroll={containerScroll}
                ref={containerRef}
              >
                <ChatContent
                  align={align}
                  mode={mode}
                  chats={chats}
                  roleConfig={roleConfig}
                  customMarkDownComponents={customMarkDownComponents}
                  onMessageDelete={foundation.deleteMessage}
                  onChatsChange={onChatsChange}
                  onMessageBadFeedback={foundation.dislikeMessage}
                  onMessageGoodFeedback={foundation.likeMessage}
                  onMessageReset={foundation.resetMessage}
                  onMessageCopy={onMessageCopy}
                  chatBoxRenderConfig={chatBoxRenderConfig}
                  renderDivider={renderDivider}
                />
                {/* hint area */}
                {!!hints?.length && (
                  <Hint
                    className={hintCls}
                    style={hintStyle}
                    value={hints}
                    onHintClick={foundation.onHintClick}
                    renderHintBox={renderHintBox}
                  />
                )}
              </div>
            </div>
            {backBottomVisible && !showStopGenerateFlag && (
              <span class={`${prefixCls}-action`}>
                <Button
                  class={`${prefixCls}-action-content ${prefixCls}-action-backBottom`}
                  icon={<IconChevronDown size="extra-large" />}
                  type="tertiary"
                  onClick={foundation.scrollToBottomWithAnimation}
                />
              </span>
            )}
            {showStopGenerateFlag && (
              <span class={`${prefixCls}-action`}>
                <Button
                  class={`${prefixCls}-action-content ${prefixCls}-action-stop`}
                  icon={<IconDisc size="extra-large" />}
                  type="tertiary"
                  onClick={foundation.stopGenerate}
                >
                  <LocaleConsumer componentName="Chat">
                    {(locale: Locale['Chat']) => locale['stop']}
                  </LocaleConsumer>
                </Button>
              </span>
            )}
            {/* input area */}
            <InputBox
              showClearContext={showClearContext}
              uploadRef={uploadRef}
              manualUpload={adapter.manualUpload}
              style={inputBoxStyle}
              class={inputBoxCls}
              placeholder={placeholder}
              disableSend={disableSend}
              onClearContext={foundation.clearContext}
              onSend={foundation.onMessageSend}
              onInputChange={foundation.onInputChange}
              renderInputArea={renderInputArea}
              uploadProps={uploadProps}
              uploadTipProps={uploadTipProps}
              sendHotKey={sendHotKey}
            />
            {bottomSlot}
          </div>
        </div>
      );
    };
  },
});

export default index;
