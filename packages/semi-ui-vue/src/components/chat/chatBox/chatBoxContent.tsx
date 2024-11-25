import { defineComponent, ref, h, Fragment, useSlots, VNode, PropType } from 'vue';
import { CombineProps } from '../../interface';

import cls from 'classnames';
import { Message, Metadata, RenderContentProps } from '../interface';
import MarkdownRender from '../../markdownRender';
import { cssClasses, strings } from '@douyinfe/semi-foundation/chat/constants';
import { MDXProps } from 'mdx/types';
import { FileAttachment, ImageAttachment } from '../attachment';
import Code from './code';
import { useMemo } from '../../_utils/useMemo';

const { PREFIX_CHAT_BOX } = cssClasses;
const { MESSAGE_STATUS, MODE, ROLE } = strings;

interface ChatBoxContentProps {
  mode?: 'bubble' | 'noBubble' | 'userBubble';
  customMarkDownComponents?: MDXProps['components'];
  children?: string;
  role?: Metadata;
  message?: Message;
  customRenderFunc?: (props: RenderContentProps) => VNode
}

export const vuePropsType: CombineProps<ChatBoxContentProps> = {
  mode: String as PropType<ChatBoxContentProps['mode']>,
  customMarkDownComponents: Object as PropType<ChatBoxContentProps['customMarkDownComponents']>,
  children: String,
  role: Object as PropType<ChatBoxContentProps['role']>,
  message: Object as PropType<ChatBoxContentProps['message']>,
  customRenderFunc: Function as PropType<ChatBoxContentProps['customRenderFunc']>,

};
const chatBoxContent = defineComponent({
  props: { ...vuePropsType },
  name: 'chatBoxContent',
  setup(props, { attrs }) {
    const slots = useSlots();

    const markdownComponents = useMemo(() => ({
      'code': Code,
      'SemiFile': FileAttachment,
      'img': ImageAttachment,
      ...props.customMarkDownComponents
    }), [()=>props.customMarkDownComponents]);

    const wrapCls = useMemo(() => {
      const isUser = props.message.role === ROLE.USER;
      const bubble = props.mode === MODE.BUBBLE;
      const userBubble = props.mode === MODE.USER_BUBBLE && isUser;
      return cls(`${PREFIX_CHAT_BOX}-content`, {
        [`${PREFIX_CHAT_BOX}-content-${props.mode}`]: bubble || userBubble,
        [`${PREFIX_CHAT_BOX}-content-user`]: (bubble && isUser) || userBubble,
        [`${PREFIX_CHAT_BOX}-content-error`]: props.message.status === MESSAGE_STATUS.ERROR && (bubble || userBubble)
      });
    }, [()=>props.message.role, ()=>props.message.status]);

    const node = useMemo(() => {
      if (props.message.status === MESSAGE_STATUS.LOADING) {
        return <span class={`${PREFIX_CHAT_BOX}-content-loading`} >
                <span class={`${PREFIX_CHAT_BOX}-content-loading-item`} />
            </span>;
      } else {
        let realContent;
        if (typeof props.message.content === 'string') {
          realContent = <MarkdownRender
            format='md'
            raw={props.message.content}
            components={markdownComponents as any}
          />;
        } else if (Array.isArray(props.message.content)) {
          realContent = props.message.content.map((item, index)=> {
            if (item.type === 'text') {
              return <MarkdownRender
                key={`index`}
                format='md'
                raw={item.text}
                components={markdownComponents as any}
              />;
            } else if (item.type === 'image_url') {
              return <ImageAttachment key={`index`} src={item.image_url.url} />;
            } else if (item.type === 'file_url') {
              const { name, size, url, type } = item.file_url;
              const realType = name.split('.').pop() ?? type?.split('/').pop();
              return <FileAttachment key={`index`} url={url} name={name} size={size} type={realType}></FileAttachment>;
            }
            return null;
          });
        }
        return (<Fragment>
          {realContent}
        </Fragment>);
      }
    }, [()=>props.message.status, ()=>props.message.content]);


    return () => {

      const { message = {}, customRenderFunc, role: roleInfo, customMarkDownComponents, mode } = props;


      if (customRenderFunc) {
        return customRenderFunc({
          message,
          role: roleInfo,
          defaultContent: node.value,
          className: wrapCls.value,
        });
      } else {
        return <div class={wrapCls.value}>{node.value}</div>;
      }
    };
  },
});


export default chatBoxContent;

