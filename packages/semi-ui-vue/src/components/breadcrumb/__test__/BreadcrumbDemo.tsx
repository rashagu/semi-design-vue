import {defineComponent, ref, h, Fragment} from 'vue'
import Breadcrumb, {BreadcrumbItem} from "../index";

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
    </div>
  )
})

BreadcrumbDemo.props = vuePropsType

export default BreadcrumbDemo

