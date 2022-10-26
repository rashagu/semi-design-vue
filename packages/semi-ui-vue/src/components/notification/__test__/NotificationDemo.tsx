import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Button from "../../button";
import NotificationList, {NotificationListClass} from '../index'
import {ToastList} from "../../toast";
import {NoticePosition} from "@douyinfe/semi-foundation/notification/notificationFoundation";

interface NotificationDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const NotificationDemo = defineComponent<NotificationDemoProps>((props, {}) => {

  const slots = useSlots()

  return () => (
    <div>
      <NotificationList ref={(instance: any) => {
        instance.add({...{
            duration: 3,
            position: 'topRight' as NoticePosition,
            motion: true,
            content: 'test',
            title: 'test',
            zIndex: 1010,
          }, id: 'id'});
      }}/>
      <Button
        className={'test'}
        onClick={() =>
          NotificationListClass.open({
            title: 'Hi, Bytedance',
            content: 'ies dance dance dance',
            duration: 3,
          })
        }
      >
        Display Notification
      </Button>
    </div>
  )
})

NotificationDemo.props = vuePropsType
NotificationDemo.name = 'NotificationDemo'

export default NotificationDemo

