import {defineComponent, ref, h, Fragment} from 'vue'
import Empty from "../index";
import Button from "../../button";
import {IllustrationSuccess, IllustrationSuccessDark} from "@kousum/semi-illustrations-vue";

interface EmptyDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const EmptyDemo = defineComponent<EmptyDemoProps>((props, {slots}) => {


  return () => (
    <Empty
      title={'创建成功'}
      image={<IllustrationSuccess style={{width: 150, height: 150}} />}
      darkModeImage={<IllustrationSuccessDark style={{width: 150, height: 150}} />}
      layout="horizontal"
      description="这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。"
      style={{ width: 800, margin: '0 auto' }}
    >
      <Button type="primary" theme="solid" style={{ padding: '6px 24px' }}>
        开始操作
      </Button>
    </Empty>
  )
})

EmptyDemo.props = vuePropsType

export default EmptyDemo

