import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Collapse, {CollapsePanel} from "../index";
import {IconCopy} from "@kousum/semi-icons-vue";
import Tag from "../../tag";

interface CollapseDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const CollapseDemo = defineComponent<CollapseDemoProps>((props, {}) => {
  const slots = useSlots()


  return () => (
    <div>
      <Collapse accordion>
        <CollapsePanel header="This is panel header 1" itemKey="1" extra="1234">
          <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
        </CollapsePanel>
        <CollapsePanel header="This is panel header 2" itemKey="2" extra={<IconCopy />}>
          <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
        </CollapsePanel>
        <CollapsePanel
          header="This is panel header 3"
          itemKey="3"
          extra={
            <Tag color="violet" style={{ margin: 0 }}>
              {' '}
              Recommended{' '}
            </Tag>
          }
        >
          <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
        </CollapsePanel>
      </Collapse>
    </div>
  )
})

CollapseDemo.props = vuePropsType
CollapseDemo.name = 'CollapseDemo'

export default CollapseDemo

