import Chat from '../index';
import { Radio } from '../../radio';
import RadioGroup from '../../radio/radioGroup';
import { defineComponent, Fragment, ref } from 'vue';


const defaultMessage = [
  {
    role: 'system',
    id: '1',
    createAt: 1715676751919,
    content: "Hello, I'm your AI assistant.",
  },
  {
    role: 'user',
    id: '2',
    createAt: 1715676751919,
    content: "给一个 Semi Design 的 Button 组件的使用示例",
  },
  {
    role: 'assistant',
    id: '3',
    createAt: 1715676751919,
    content: "以下是一个 Semi 代码的使用示例：\n\`\`\`jsx \nimport React from 'react';\nimport { Button } from '@douyinfe/semi-ui';\n\nconst MyComponent = () => {\n  return (\n    <Button>Click me</Button>\n );\n};\nexport default MyComponent;\n\`\`\`\n",
  }
];

const roleInfo = {
  user:  {
    name: 'User',
    avatar: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png'
  },
  assistant: {
    name: 'Assistant',
    avatar: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png'
  },
  system: {
    name: 'System',
    avatar: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png'
  }
}

const commonOuterStyle = {
  border: '1px solid var(--semi-color-border)',
  borderRadius: '16px',
  margin: '8px 16px',
  height: '550px',
}

let id = 0;
function getId() {
  return `id-${id++}`
}

const uploadProps = { action: 'https://api.semi.design/upload' }
const uploadTipProps = { content: '自定义上传按钮提示信息' }

export default defineComponent({
  setup(){

    const message = ref(defaultMessage);
    const mode = ref('bubble');
    const align = ref('leftRight');

    const onAlignChange = (e) => {
      align.value = e.target.value;
    }

    const onModeChange = (e) => {
      mode.value = e.target.value
    }

    const onMessageSend = (content, attachment) => {
      const newAssistantMessage = {
        role: 'assistant',
        id: getId(),
        createAt: Date.now(),
        content: "这是一条 mock 回复信息",
      }
      setTimeout(() => {
        message.value = [ ...message.value, newAssistantMessage]
      }, 200);
    }

    const onChatsChange = (chats) => {
      message.value = chats
    }

    const onMessageReset = (e) => {
      setTimeout(() => {
        const lastMessage = message[message.value.length - 1];
        const newLastMessage = {
          ...lastMessage,
          status: 'complete',
          content: 'This is a mock reset message.',
        }
        message.value = [...message.value.slice(0, -1), newLastMessage]
      }, 200);
    }

    return ()=>{
      return (
        <Fragment>
            <span style={{ display: 'flex', flexDirection: 'column', rowGap: '8px'}}>
                <span style={{ display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                    模式
                    <RadioGroup onChange={onModeChange} value={mode.value} type={"button"}>
                        <Radio value={'bubble'}>气泡</Radio>
                        <Radio value={'noBubble'}>非气泡</Radio>
                        <Radio value={'userBubble'}>用户会话气泡</Radio>
                    </RadioGroup>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                    会话对齐方式
                    <RadioGroup onChange={onAlignChange} value={align.value} type={"button"}>
                        <Radio value={'leftRight'}>左右分布</Radio>
                        <Radio value={'leftAlign'}>左对齐</Radio>
                    </RadioGroup>
                </span>
            </span>
          <Chat
            key={align.value + mode.value}
            align={align.value}
            mode={mode.value}
            uploadProps={uploadProps}
            style={commonOuterStyle}
            chats={message.value}
            roleConfig={roleInfo}
            onChatsChange={onChatsChange}
            onMessageSend={onMessageSend}
            onMessageReset={onMessageReset}
            uploadTipProps={uploadTipProps}
          />
        </Fragment>
      )
    }
  }
})

