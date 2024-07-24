import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { Form } from '../index';

interface FormRenderDemoProps {
  name?: string;
}

export const vuePropsType: ComponentObjectPropsOptions<Required<FormRenderDemoProps>> = {
  name: String,
};
const FormRenderDemo = defineComponent({
  props: vuePropsType,
  name: 'FormRenderDemo',
  setup(props, { attrs }) {
    const slots = useSlots();

    return () => (
      <div>
        <Form render={({ formState, formApi, values }) => (
          <>
            <Form.Select field="Role" label='角色' style={{ width: '176px' }}>
              <Form.SelectOption value="admin">管理员</Form.SelectOption>
              <Form.SelectOption value="user">普通用户</Form.SelectOption>
              <Form.SelectOption value="guest">访客</Form.SelectOption>
            </Form.Select>
            <Form.Input field='UserName' label='用户名' style={{ width: '80px' }}/>
            <Form.Input field='Password' label='密码' style={{ width: '176px' }}/>
            <code style={{ marginTop: '24px' }}>{JSON.stringify(formState)}</code>
          </>
        )} layout='horizontal' onValueChange={values=>console.log(values)}>
        </Form>
      </div>
    );
  },
});


export default FormRenderDemo;

