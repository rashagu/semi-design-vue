import { defineComponent, ref, h, Fragment, useSlots, watch } from 'vue';
import { Form, FormSelectOption, FormInput, FormSelect, FormApi } from '../index';
import Tooltip from '../../tooltip';
import { IconHelpCircle } from '@kousum/semi-icons-vue';
import Button from "../../button";

interface ExampleProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const FormDemo = defineComponent((props, { attrs }) => {
  const slots = useSlots();
  const formApi = ref<FormApi<any>>()

  function onSubmit() {
    formApi.value.validate().then(values=>{
      console.log(values)
    })
  }

  function onReset() {
    formApi.value.reset()
    console.log(formApi.value.getValues())
  }
  return () => (
    <div>
      <Form getFormApi={v=>formApi.value = v} layout="horizontal" onValueChange={(values) => console.log(values)}>
        <FormInput
          field="UserName"
          label="用户名"
          style={{ width: 80 }}
          rules={[
            { required: true, message: 'required error' },
          ]}
        />
        <FormInput
          field="Password"
          label={{
            text: '密码',
            extra: (
              <Tooltip content="详情">
                <IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }} />
              </Tooltip>
            ),
          }}
          style={{ width: 176 }}
          validate={(fieldValue, values) => fieldValue >= 5 ? 'value not valid': ''}
        />
        <FormSelect field="Role" label={{ text: '角色', optional: true }} style={{ width: 176 }}
                    rules={[
                      { required: true, message: 'required error' },
                    ]}>
          <FormSelectOption value="admin">管理员</FormSelectOption>
          <FormSelectOption value="user">普通用户</FormSelectOption>
          <FormSelectOption value="guest">访客</FormSelectOption>
        </FormSelect>
        <Button type="primary" html-type="submit" onClick={onSubmit}>刷新</Button>
        <Button type="primary" onClick={onReset}>reset</Button>
      </Form>
    </div>
  );
});


export default FormDemo;
