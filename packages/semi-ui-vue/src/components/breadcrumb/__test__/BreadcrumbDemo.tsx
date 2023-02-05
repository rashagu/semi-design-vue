import {defineComponent, ref, h, Fragment} from 'vue'
import Breadcrumb, {BreadcrumbItem} from "../index";
import {IconArticle, IconHome} from "@kousum/semi-icons-vue";

interface BreadcrumbDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const BreadcrumbDemo = defineComponent<BreadcrumbDemoProps>((props, {slots}) => {


  return () => (
    <div>
      <Breadcrumb>
        <BreadcrumbItem><span id={'aa'}>Semi-ui</span></BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        <BreadcrumbItem>Default</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb moreType='popover'>
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>当层级很多的时候</BreadcrumbItem>
        <BreadcrumbItem>又一层</BreadcrumbItem>
        <BreadcrumbItem>再一层</BreadcrumbItem>
        <BreadcrumbItem>上上一层</BreadcrumbItem>
        <BreadcrumbItem>上一层</BreadcrumbItem>
        <BreadcrumbItem>详情页</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb
        routes={
          [
            {
              path: '/',
              href: '/',
              icon: <IconHome size="small" />
            },
            {
              path: '/breadcrumb',
              href: '/zh-CN/navigation/breadcrumb',
              name: 'breadcrumb',
              icon: <IconArticle size="small" />
            },
          ]
        }
      />
    </div>
  )
})

BreadcrumbDemo.props = vuePropsType

export default BreadcrumbDemo

