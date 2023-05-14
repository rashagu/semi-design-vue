import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import FormDemo from "./FormDemo";
import WithFormApiDemo from "./WithFormApiDemo";
import WithFormStateDemo from "./WithFormStateDemo";
import WithFieldDemo from "./WithFieldDemo";
import WithFieldDemo2 from "./WithFieldDemo2";

interface FormAllDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const FormAllDemo = defineComponent<FormAllDemoProps>((props, {}) => {
  const slots = useSlots()






  return () => (
    <div>
      <FormDemo />
      <WithFormApiDemo />
      <WithFormStateDemo/>
      <WithFieldDemo/>
      <WithFieldDemo2/>
    </div>
  )
})

// @ts-ignore
FormAllDemo.props = vuePropsType
FormAllDemo.name = 'FormAllDemo'

export default FormAllDemo

