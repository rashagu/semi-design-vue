import { withField, Input, Select, Form, useFormState } from '@kousum/semi-ui-vue';
import { defineComponent } from 'vue';

const MyComponent = defineComponent(
  (props) => {
    const handleChange = (v, type) => {
      let newValue = { ...props.value, [type === 'name' ? 'name' : 'role']: v };
      props.onChange(newValue);
    };
    return () => {
      const { onChange, value } = props;
      const { name, role } = value || {};
      return (
        <div className="customField">
          <Input
            insetLabel="名称"
            value={name}
            onChange={(v) => handleChange(v, 'name')}
            style={{ width: '180px', marginRight: '12px' }}
          />
          <Select
            insetLabel="角色"
            value={role}
            onChange={(v) => handleChange(v, 'role')}
            style={{ width: '200px' }}
            optionList={[
              { value: 'rd', label: '开发' },
              { value: 'UED', label: '设计师' },
            ]}
          />
        </div>
      );
    };
  },
  {
    props: {
      onChange: { type: Function },
      value: { type: Object },
    },
  }
);
const CustomField = withField(MyComponent, { valueKey: 'value', onKeyChangeFnName: 'onChange' });

const ComponentUsingFormState = defineComponent(() => {
  const formState = useFormState();
  return () => (
    <pre>
      <code>{JSON.stringify(formState.value)}</code>
    </pre>
  );
});

export default () => {
  return (
    <Form>
      <CustomField field="baseInfo" label={{ text: '基本信息', required: true }} />
      <ComponentUsingFormState />
    </Form>
  );
};
