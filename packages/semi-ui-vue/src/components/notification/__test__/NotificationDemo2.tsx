import { defineComponent, onMounted, useSlots } from 'vue';
import Button from '../../button';
import { NotificationListClass } from '../index';
import useNotification from '../useNotification';

interface NotificationDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const NotificationDemo2 = defineComponent<NotificationDemoProps>((props, {}) => {
  const slots = useSlots();

  // 有bug，而且没有动画，不建议使用
  const [e, d] = useNotification();

  onMounted(() => {
    NotificationListClass.open({
      content: 'abc',
    });
  });

  return () => (
    <div>
      <Button
        //@ts-ignore
        role={'bt'}
        className={'test'}
        onClick={() => {
          NotificationListClass.open({
            title: 'Hi, Bytedance',
            content: 'ies dance dance dance',
            duration: 3,
          });
          NotificationListClass.success({
            title: 'Hi, Bytedance',
            content: 'Hi, Bytedance dance dance',
            duration: 3,
            theme: 'light',
          });
        }}
      >
        Display Notification
      </Button>
    </div>
  );
});

export default NotificationDemo2;
