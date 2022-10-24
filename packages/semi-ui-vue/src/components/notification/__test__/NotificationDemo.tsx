import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Button from "../../button";
import {NotificationListClass} from '../index'

interface NotificationDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const NotificationDemo = defineComponent<NotificationDemoProps>((props, {}) => {

  const slots = useSlots()

  return () => (
    <Button
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
  )
})

NotificationDemo.props = vuePropsType
NotificationDemo.name = 'NotificationDemo'

export default NotificationDemo

