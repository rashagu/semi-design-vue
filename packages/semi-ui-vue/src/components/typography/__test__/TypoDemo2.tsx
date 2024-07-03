import {defineComponent, ref, h, Fragment} from 'vue'
import Title from '../title'
import Text from '../text'
import Paragraph from '../paragraph'
import {IconLink} from "@kousum/semi-icons-vue";
import { TypographyNumeral } from '../../index';
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TypoDemo = defineComponent<ExampleProps>((props, {slots}) => {



// return ()=>{
//   return <Paragraph ellipsis={{ rows: 3, expandable: true, collapsible: true, collapseText: '折叠我吧', onExpand: (bool, e) => console.log(bool, e) }} style={{ width: '300px' }}>
//     支持展开和折叠：Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
//   </Paragraph>
// }
  return () => (
    <div class={'111'}>
      <Paragraph copyable>点击右边的图标复制文本。</Paragraph>
      <TypographyNumeral precision={1}>
      <p>点赞量：1.6111e1 K</p>
    </TypographyNumeral>
    </div>
  )
})


export default TypoDemo

