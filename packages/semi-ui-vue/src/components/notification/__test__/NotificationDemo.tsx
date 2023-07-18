import {defineComponent, ref, h, Fragment, useSlots, onMounted} from 'vue'
import Button from "../../button";
import NotificationList, {NotificationListClass} from '../index'
import {ToastList} from "../../toast";
import {NoticePosition} from "@douyinfe/semi-foundation/notification/notificationFoundation";
import useNotification from "../useNotification";


interface NotificationDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const NotificationDemo = defineComponent<NotificationDemoProps>((props, {}) => {

  const slots = useSlots()

  // 有bug，而且没有动画，不建议使用
  const [e, d] = useNotification()

  onMounted(()=>{
    NotificationListClass.open({
      content:'abc'
    })
  })
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

      <Button
        className={'test'}
        onClick={() =>
          e.info({
            content:'eeeeeeeeeee'
          })
        }
      >
        useNotification
      </Button>
        {d()}
    </div>
  )
})



export default NotificationDemo

