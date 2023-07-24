import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Anchor, {AnchorLink} from "../index";

interface AnchorDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const AnchorDemo = defineComponent<AnchorDemoProps>((props, {}) => {
  const slots = useSlots()
  const getContainer = ():HTMLElement => {
    return document.querySelector('window');
  };

  return () => (
    <div>
      <Anchor>
        <AnchorLink href="#基本示例" title="基本示例" />
        <AnchorLink href="#组件" title="组件" />
        <AnchorLink href="#设计语言" title="设计语言" />
        <AnchorLink href="#物料平台" title="物料平台" />
        <AnchorLink href="#主题商店" title="主题商店" />
      </Anchor>

      <div>
        <span>请看右侧固定的 Anchor </span>
        <Anchor
          getContainer={getContainer}
          offsetTop={100}
          targetOffset={100} // v>=1.9
          style={{ position: 'fixed', right: '20px', top: '100px', width: '200px', zIndex: 3 }} >
          <AnchorLink href="#基本示例" title="我是固定的 Anchor" />
          <AnchorLink href="#综合使用" title="综合使用" />
          <AnchorLink href="#尺寸" title="尺寸" />
          <AnchorLink href="#滑轨主题" title="滑轨主题" />
          <AnchorLink href="#动态展示" title="动态展示" />
          <AnchorLink href="#显示工具提示" title="显示工具提示" />
          <AnchorLink href="#工具提示位置" title="工具提示位置" />
          <AnchorLink href="#API参考" title="API参考">
            <AnchorLink href="#Anchor" title="Anchor" />
            <AnchorLink href="#AnchorLink" title="AnchorLink" />
          </AnchorLink>
        </Anchor>
      </div>
      <div>
        <Anchor
          railTheme={'muted'}
          getContainer={getContainer}
          targetOffset={60}
          offsetTop={100}
        >
          <AnchorLink href="#尺寸" title="尺寸" />
          <AnchorLink href="#滑轨主题" title="滑轨主题" />
          <AnchorLink href="#设计语言" title="设计语言" />
          <AnchorLink href="#物料平台" title="物料平台" />
          <AnchorLink href="#主题商店" title="主题商店" />
        </Anchor>
      </div>
    </div>
  )
})

// @ts-ignore
AnchorDemo.props = vuePropsType
// @ts-ignore
AnchorDemo.name = 'AnchorDemo'

export default AnchorDemo

