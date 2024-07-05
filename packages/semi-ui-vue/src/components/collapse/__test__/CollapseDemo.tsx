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
const CollapseDemo = defineComponent((props, {}) => {
  const slots = useSlots()


  const activeKeyRef = ref<string | string[]>(['1'])
  function onChange(activeKey: string | string[]) {
    console.log(activeKey)
    activeKeyRef.value = activeKey
  }
  return () => (
    <div>
      <Collapse accordion activeKey={activeKeyRef.value} onChange={onChange}>
        <CollapsePanel header="This is panel header 1" itemKey="1" extra="1234">
          <p class={"test_text"}>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
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
}, {
  props: vuePropsType,
  name: 'CollapseDemo'
})



export default CollapseDemo

