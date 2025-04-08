import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { Button } from '../../index';
import Space from '../../space';
import Switch from '../../switch';
import Tag from '../../tag';
import UserGuide from '../../userGuide';
import { CombineProps } from '../../interface';

interface UserGuideDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<UserGuideDemoProps> = {
  name: String,
};
const UserGuideDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'UserGuideDemo',
  setup(props, { attrs }) {
    const slots = useSlots();

    const visible = ref(false);
    const showDialog = () => {
      visible.value = true;
    };
    return () => {
      return (
        <div>
          <Button data-testId={'showDialogBt'} onClick={showDialog}>开始引导</Button>
          <br />
          <br />
          <Space>
            <Switch id={'basic-demo-1'} defaultChecked={true}></Switch>
            <Tag id={'basic-demo-2'}> Default Tag </Tag>
            <Button id={'basic-demo-3'}>确定</Button>
          </Space>
          <UserGuide
            mode="popup"
            mask={true}
            visible={visible.value}
            steps={[
              {
                target: document.querySelector('#basic-demo-1'),
                title: '新手引导',
                description: 'Hello ByteDancer!',
                position: 'bottom',
              },
              {
                target: document.querySelector('#basic-demo-2'),
                title: 'Switch',
                description: 'This is a Semi Switch',
                position: 'bottom',
              },
              {
                target: document.querySelector('#basic-demo-3'),
                title: 'Button',
                description: 'This is a Semi Button',
                position: 'bottom',
              },
            ]}
            onChange={(current) => {
              console.log('当前引导步骤', current);
            }}
            onNext={(current) => {
              console.log('下一步引导');
            }}
            onPrev={(current) => {
              console.log('上一步引导');
            }}
            onFinish={() => {
              visible.value = false;
              console.log('引导完成');
            }}
            onSkip={() => {
              visible.value = false;
              console.log('跳过引导');
            }}
          />
        </div>
      );
    };
  },
});

export default UserGuideDemo;
