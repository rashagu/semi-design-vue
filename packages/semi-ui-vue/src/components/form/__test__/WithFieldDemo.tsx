import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import {Form, useFormState, withField} from "../index";


// 这里将html原生的input封装
const HtmlInput = (props) => {
  let value = props.value?.value || '';
  let { validateStatus, onChange, ...rest } = props; // prevent props being transparently transmitted to DOM
  console.log(props)
  return <input {...rest} onInput={onChange} value={value} />;
};

const CustomInput = withField(HtmlInput, { valueKey: 'value', onKeyChangeFnName: 'onChange', valuePath: 'target.value' });

// 观察formState，看input的数据流是否已被form接管
const ComponentUsingFormState = () => {
  const formState = useFormState();
  return (
    <pre>
            <code>{JSON.stringify(formState.value)}</code>
        </pre>
  );
};


interface WithFieldDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const WithFieldDemo = defineComponent<WithFieldDemoProps>((props, {}) => {

  const slots = useSlots()

  return () => (
    <div>
      <Form>
        <CustomInput field='name' />
        <ComponentUsingFormState />
      </Form>
    </div>
  )
})

WithFieldDemo.props = vuePropsType
WithFieldDemo.name = 'WithFieldDemo'

export default WithFieldDemo

