import { defineComponent, Fragment } from 'vue';
import Breadcrumb from '../index';
import { TypographyText } from '../../index';

interface BreadcrumbDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String
}
const BreadcrumbDemo2 = defineComponent<BreadcrumbDemoProps>((props, {slots}) => {

  const routes:any = ['首页', '当这个页面标题很长很长很长时需要省略', '详情页'];
  return () => (
    <>
      <TypographyText size="small">默认行为</TypographyText>
      <Breadcrumb
        routes={routes}
      />
      <br/>
      <TypographyText size="small">省略但不显示Tooltip</TypographyText>
      <Breadcrumb
        showTooltip={false}
        routes={routes}
      />
      <br/>
      <TypographyText size="small">不截断</TypographyText>
      <Breadcrumb
        showTooltip={{ width: 'auto' }}
        routes={routes}
      />
      <br/>
      <TypographyText size="small">从标题中间开始省略</TypographyText>
      <Breadcrumb
        showTooltip={{ ellipsisPos: 'middle' }}
        routes={routes}
      />
      <br/>
      <TypographyText size="small">自定义 Tooltip 参数</TypographyText>
      <Breadcrumb
        showTooltip={{ opts: { position: 'topLeft' } }}
        routes={routes}
      />
    </>
  );

})

// @ts-ignore
BreadcrumbDemo2.props = vuePropsType

export default BreadcrumbDemo2

