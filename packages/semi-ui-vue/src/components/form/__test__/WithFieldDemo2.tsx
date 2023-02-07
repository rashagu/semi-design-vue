import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { Form, useFormState, withField } from '../index';
import { Input, Select } from '../../index';

const MyComponent = (props) => {
  console.log(props);
  let value = props.value?.value || '';
  const { onChange } = props;
  const { name, role } = value || {};
  const handleChange = (v, type) => {
    console.log(v, type, value);
    let newValue = { ...value, [type === 'name' ? 'name' : 'role']: v };
    onChange(newValue);
  };

  return (
    <div class="customField">
      <Input
        insetLabel="名称"
        placeholder={'名称'}
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
const CustomField = withField(MyComponent, { valueKey: 'value', onKeyChangeFnName: 'onChange' });

const ComponentUsingFormState = () => {
  const formState = useFormState();
  return (
    <pre>
      <code>{JSON.stringify(formState.value)}</code>
      <code>{Object.keys(formState.value.values)[0]}</code>
    </pre>
  );
};

interface WithFieldDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const WithFieldDemo = defineComponent<WithFieldDemoProps>((props, {}) => {
  const slots = useSlots();

  return () => (
    <div>
      <Form>
        <CustomField field="baseInfo" label={{ text: '基本信息', required: true }} />
        <ComponentUsingFormState />
      </Form>
      <div>FormDemo</div>
    </div>
  );
});

WithFieldDemo.props = vuePropsType;
WithFieldDemo.name = 'WithFieldDemo';

export default WithFieldDemo;
