import {defineComponent, ref, h, Fragment, useSlots, watch} from 'vue'
import {Form, FormSelectOption, FormInput, FormSelect} from "../index";
import Tooltip from "../../tooltip";
import {IconHelpCircle} from "@kousum/semi-icons-vue";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const FormDemo = defineComponent<ExampleProps>((props, {attrs}) => {
  const slots = useSlots()

  return () => (
    <div>
      <Form layout='horizontal' onValueChange={values=>console.log(values)}>
        <FormInput field='UserName' label='用户名' style={{ width:80 }}/>
        <FormInput
          field='Password'
          label={{
            text: '密码',
            extra: <Tooltip content='详情'><IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }}/></Tooltip>
          }}
          style={{ width:176 }}
        />
        <FormSelect field="Role" label={{ text: '角色', optional: true }} style={{ width:176 }}>
          <FormSelectOption value="admin">管理员</FormSelectOption>
          <FormSelectOption value="user">普通用户</FormSelectOption>
          <FormSelectOption value="guest">访客</FormSelectOption>
        </FormSelect>
      </Form>
    </div>
  )
})

FormDemo.props = vuePropsType
FormDemo.name = 'FormDemo'

export default FormDemo

