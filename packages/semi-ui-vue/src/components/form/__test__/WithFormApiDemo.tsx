import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Button from "../../button";
import {Form, FormInput, withFormApi} from "../index";

const SomeComponetInsideForm = props => (
  <Button onClick={() => {
    props.formApi.setValue('name', Math.random());
  }}>Click Me!!! ChangeName By【formApi】</Button>
);
const ComponentWithFormApi = withFormApi(SomeComponetInsideForm);


interface WithFormApiDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}

const WithFormApiDemo = defineComponent<WithFormApiDemoProps>((props, {}) => {

  const slots = useSlots()

  return () => (
    <div>
      <Form>
        <FormInput field='name' initValue='semi'></FormInput>
        <FormInput field='familyName' initValue='design'></FormInput>
        <Button htmlType='submit' style={{ marginRight: 4 }}>submit</Button>
        <ComponentWithFormApi />
      </Form>
    </div>
  )
})

WithFormApiDemo.props = vuePropsType
WithFormApiDemo.name = 'WithFormApiDemo'

export default WithFormApiDemo

