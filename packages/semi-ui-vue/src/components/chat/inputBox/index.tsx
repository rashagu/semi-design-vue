import { defineComponent, ref, h, Fragment, useSlots, reactive, CSSProperties, VNode, PropType } from 'vue';
import { CombineProps } from '../../interface';
import cls from 'classnames';
import  * as PropTypes from '../../PropTypes';
import { FileItem } from '../../upload/interface';
import { InputBoxProps, InputBoxState, RenderInputAreaProps } from '../interface';
import { IconDeleteStroked, IconChainStroked, IconArrowUp } from '@kousum/semi-icons-vue';
import { cssClasses, strings } from "@douyinfe/semi-foundation/chat/constants";
import InputBoxFoundation, { InputBoxAdapter } from '@douyinfe/semi-foundation/chat/inputboxFoundation';
import Attachment from '../attachment';
import { vuePropsMake } from '../../PropTypes';
import Tooltip, { TooltipProps } from '../../tooltip';
import Upload, { UploadProps } from '../../upload';
import Button from '../../button';
import TextArea from '../../input/textArea';
import { useBaseComponent } from '../../_base/baseComponent';

const { PREFIX_INPUT_BOX } = cssClasses;
const { SEND_HOT_KEY } = strings;
const textAutoSize = { minRows: 1, maxRows: 5 };


export const propsType: CombineProps<InputBoxProps> = {
  showClearContext: PropTypes.bool,
  sendHotKey: PropTypes.string as PropType<InputBoxProps['sendHotKey']>,
  placeholder: {
    type: PropTypes.string,
    required: true
  },
  className: PropTypes.string,
  style: PropTypes.object,
  disableSend: PropTypes.bool,
  uploadRef: [PropTypes.object, PropTypes.func,],
  uploadProps: PropTypes.object as PropType<InputBoxProps['uploadProps']>,
  uploadTipProps: PropTypes.object as PropType<InputBoxProps['uploadTipProps']>,
  manualUpload: PropTypes.func as PropType<InputBoxProps['manualUpload']>,
  renderInputArea: PropTypes.func as PropType<InputBoxProps['renderInputArea']>,
  onSend: PropTypes.func as PropType<InputBoxProps['onSend']>,
  onClearContext: PropTypes.func as PropType<InputBoxProps['onClearContext']>,
  onInputChange: PropTypes.func as PropType<InputBoxProps['onInputChange']>,
};
const vuePropsType = vuePropsMake(propsType, {
  uploadProps: {}
})
const index = defineComponent({
  props: { ...vuePropsType },
  name: 'index',
  setup(props, { attrs }) {
    const slots = useSlots();
    const inputAreaRef = ref()
    const state = reactive<InputBoxState>({
      content: '',
      attachment: []
    })
    const { adapter: adapterInject } = useBaseComponent(props, state)
    function adapter_(): InputBoxAdapter<InputBoxProps, InputBoxState> {
      return {
        ...adapterInject(),
        notifyInputChange: (props_: { inputValue: string; attachment: any[]}) => {
          const { onInputChange } = props;
          onInputChange && onInputChange(props_);
        },
        setInputValue: (value) => {
          state.content = value
        },
        setAttachment: (attachment: any[]) => {
          state.attachment = attachment
        },
        notifySend: (content: string, attachment: FileItem[]) => {
          const { onSend } = props;
          onSend && onSend(content, attachment);
        }
      };
    }
    const adapter = adapter_()
    const foundation = new InputBoxFoundation(adapter);


    const onClick = () => {
      inputAreaRef.value?.focus();
    }

    const renderUploadButton = () => {
      const { uploadProps, uploadRef, uploadTipProps } = props;
      const { attachment } = state;
      const { className, onChange, renderFileItem, ...rest } = uploadProps;
      const children = slots.children?.()
      const realUploadProps = {
        ...rest,
        className: cls(`${PREFIX_INPUT_BOX}-upload`, {
          [className]: className
        }),
        onChange: foundation.onAttachmentAdd,
      };
      const uploadNode = <Upload
        ref={uploadRef}
        fileList={attachment}
        {...realUploadProps}
      >
        {children ? children : <Button
          class={`${PREFIX_INPUT_BOX}-uploadButton`}
          icon={<IconChainStroked size="extra-large" />}
          theme='borderless'
        />}
      </Upload>;
      return (uploadTipProps ? <Tooltip {...uploadTipProps}><span>{uploadNode}</span></Tooltip> : uploadNode);
    }

    const renderInputArea = () => {
      const { content, attachment } = state;
      const { placeholder, sendHotKey } = props;
      return (<div
        class={`${PREFIX_INPUT_BOX}-inputArea`}
      >
        <TextArea
          placeholder={placeholder}
          onEnterPress={foundation.onEnterPress}
          value={content}
          onChange={foundation.onInputAreaChange}
          forwardRef={inputAreaRef}
          class={`${PREFIX_INPUT_BOX}-textarea`}
          autosize={textAutoSize}
          disabledEnterStartNewLine={sendHotKey === SEND_HOT_KEY.ENTER}
          onPaste={foundation.onPaste}
        />
        <Attachment
          attachment={attachment}
          onClear={foundation.onAttachmentDelete}
        />
      </div>);
    }

    const renderClearButton = () => {
      const { onClearContext } = props;
      return (
        <Button
          class={`${PREFIX_INPUT_BOX}-clearButton`}
          theme='borderless'
          icon={<IconDeleteStroked />}
          onClick={onClearContext}
        />
      );
    }

    const renderSendButton = () => {
      const disabledSend = foundation.getDisableSend();
      return (
        <Button
          data-testid="sendButton"
          disabled={disabledSend}
          theme='solid'
          type='primary'
          class={`${PREFIX_INPUT_BOX}-sendButton`}
          // icon={<IconSend size="extra-large" class={`${PREFIX_INPUT_BOX}-sendButton-icon`} />}
          icon={<IconArrowUp size="large" class={`${PREFIX_INPUT_BOX}-sendButton-icon`} />}
          onClick={foundation.onSend}
        />
      );
    }

    return () => {

      const { onClearContext, renderInputArea: renderInputArea_props, onSend, style, className, showClearContext } = props;
      const nodes = (
        <div class={cls(PREFIX_INPUT_BOX, { [className]: className })} style={style}>
          <div
            class={`${PREFIX_INPUT_BOX}-inner`}
            onClick={onClick}
          >
            {showClearContext && renderClearButton()}
            <div class={`${PREFIX_INPUT_BOX}-container`}>
              {renderUploadButton()}
              {renderInputArea()}
              {renderSendButton()}
            </div>
          </div>
        </div>
      );
      if (renderInputArea_props) {
        return renderInputArea_props({
          defaultNode: nodes,
          onClear: onClearContext,
          onSend: onSend,
        });
      }
      return nodes;
    };
  },
});


export default index;

