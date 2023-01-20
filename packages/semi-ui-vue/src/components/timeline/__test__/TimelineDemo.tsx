import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Timeline, {TimelineItem} from "../index";
import {IconAlertTriangle} from "@kousum/semi-icons-vue";

interface TimelineDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TimelineDemo = defineComponent<TimelineDemoProps>((props, {}) => {
  const slots = useSlots()


  return () => (
    <div>
      <Timeline>
        <TimelineItem time="2019-07-14 10:35">第一个节点内容</TimelineItem>
        <TimelineItem time="2019-06-13 16:17">第二个节点内容</TimelineItem>
        <TimelineItem time="2019-05-14 18:34">第三个节点内容</TimelineItem>
      </Timeline>
      <Timeline>
        <TimelineItem time="2019-07-14 10:35" type="ongoing">
          审核中
        </TimelineItem>
        <TimelineItem time="2019-06-13 16:17" type="success">
          发布成功
        </TimelineItem>
        <TimelineItem time="2019-05-14 18:34" type="error">
          审核失败
        </TimelineItem>
      </Timeline>
      <Timeline>
        <TimelineItem time="2019-07-14 10:35">默认样式的节点</TimelineItem>
        <TimelineItem time="2019-06-13 16:17" dot={<IconAlertTriangle />} type="warning">
          自定义图标
        </TimelineItem>
        <TimelineItem time="2019-05-14 18:34" color="pink">
          自定义节点颜色
        </TimelineItem>
        <TimelineItem time="2019-04-10 12:20">
          <span style={{ fontSize: '18px' }}>自定义节点样式</span>
        </TimelineItem>
      </Timeline>
      <Timeline mode="left">
        <TimelineItem time="2019-07-14 10:35" extra="节点辅助说明信息">
          第一个节点内容
        </TimelineItem>
        <TimelineItem time="2019-06-13 16:17" extra="节点辅助说明信息">
          第二个节点内容
        </TimelineItem>
        <TimelineItem time="2019-05-14 18:34" extra="节点辅助说明信息">
          第三个节点内容
        </TimelineItem>
        <TimelineItem time="2019-05-09 09:12" extra="节点辅助说明信息">
          第四个节点内容
        </TimelineItem>
      </Timeline>
      <Timeline mode="center">
        <TimelineItem time="2019-07-14 10:35" extra="节点辅助说明信息">
          第一个节点内容
        </TimelineItem>
        <TimelineItem time="2019-06-13 16:17" extra="节点辅助说明信息">
          第二个节点内容
        </TimelineItem>
        <TimelineItem time="2019-05-14 18:34" extra="节点辅助说明信息">
          第三个节点内容
        </TimelineItem>
        <TimelineItem time="2019-05-09 09:12" extra="节点辅助说明信息">
          第四个节点内容
        </TimelineItem>
      </Timeline>
      <Timeline mode="alternate">
        <TimelineItem time="2019-07-14 10:35" extra="节点辅助说明信息">
          第一个节点内容
        </TimelineItem>
        <TimelineItem time="2019-06-13 16:17" extra="节点辅助说明信息">
          第二个节点内容
        </TimelineItem>
        <TimelineItem time="2019-05-14 18:34" extra="节点辅助说明信息">
          第三个节点内容
        </TimelineItem>
        <TimelineItem time="2019-05-09 09:12" extra="节点辅助说明信息">
          第四个节点内容
        </TimelineItem>
      </Timeline>
      <Timeline mode="right">
        <TimelineItem time="2019-07-14 10:35" extra="节点辅助说明信息">
          第一个节点内容
        </TimelineItem>
        <TimelineItem time="2019-06-13 16:17" extra="节点辅助说明信息">
          第二个节点内容
        </TimelineItem>
        <TimelineItem time="2019-05-14 18:34" extra="节点辅助说明信息">
          第三个节点内容
        </TimelineItem>
        <TimelineItem time="2019-05-09 09:12" extra="节点辅助说明信息">
          第四个节点内容
        </TimelineItem>
      </Timeline>
      <Timeline
        mode="alternate"
        dataSource={[
          {
            time: '2019-07-14 10:35',
            extra: '节点辅助说明信息',
            content: '第一个节点内容',
            type: 'ongoing',
          },
          {
            time: '2019-06-13 16:17',
            extra: '节点辅助说明信息',
            content: <span style={{ fontSize: '18px' }}>第二个节点内容</span>,
            color: 'pink',
          },
          {
            time: '2019-05-14 18:34',
            extra: '节点辅助说明信息',
            dot: <IconAlertTriangle />,
            content: '第三个节点内容',
            type: 'warning',
          },
          {
            time: '2019-05-09 09:12',
            extra: '节点辅助说明信息',
            content: '第四个节点内容',
            type: 'success',
          },
        ]}
      />
    </div>
  )
})

TimelineDemo.props = vuePropsType
TimelineDemo.name = 'TimelineDemo'

export default TimelineDemo

