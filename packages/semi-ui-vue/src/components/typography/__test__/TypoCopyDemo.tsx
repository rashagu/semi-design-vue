import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { IconSetting } from '@kousum/semi-icons-vue';
import { Toast, Typography, TextArea } from '../../index';
const { Paragraph, Text, Numeral } = Typography;

interface TypoCopyDemoProps {
  name?: string;
}

export const vuePropsType: ComponentObjectPropsOptions<TypoCopyDemoProps> = {
  name: String,
};
const TypoCopyDemo = defineComponent<TypoCopyDemoProps>((props, {}) => {
  const slots = useSlots();




  return () => {

    return (
      <div>
        <Paragraph copyable>点击右边的图标复制文本。</Paragraph>
        <Paragraph copyable={{ content: 'Hello, Semi Design!' }}>点击复制文本。</Paragraph>
        <Paragraph copyable={{ onCopy: () => Toast.success({ content: '复制文本成功' }) }}>点击右边的图标复制文本。</Paragraph>
        时间戳: <Numeral truncate="ceil" copyable underline>{new Date().getTime()/1000}s</Numeral>
        <Paragraph copyable={{ icon: <IconSetting style={{ color: 'var(--semi-color-link)' }}/> }}>自定义复制节点</Paragraph>
        <br/>
        <br/>
        <Text type="secondary">粘贴区域：</Text>
        <br/>
        <TextArea autosize style={{ width: '320px', marginTop: '4px' }} rows={3} />
      </div>
    );
  };
}, {
  props: vuePropsType,
  name: 'TypoCopyDemo',
});


export default TypoCopyDemo;

