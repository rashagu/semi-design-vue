import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import FormDemo from "./FormDemo";
import WithFormApiDemo from "./WithFormApiDemo";
import WithFormStateDemo from "./WithFormStateDemo";
import WithFieldDemo from "./WithFieldDemo";
import WithFieldDemo2Vitest from "./WithFieldDemo2Vitest";

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
      <WithFieldDemo2Vitest/>
    </div>
  )
})

FormAllDemo.props = vuePropsType
FormAllDemo.name = 'FormAllDemo'

export default FormAllDemo

