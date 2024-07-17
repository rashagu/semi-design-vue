import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import { Form, FormInput, withFormState } from '../index';


const SomeComponentInsideForm = props => (
  <code>{JSON.stringify(props.formState.value)}</code>
);
const ComponentWithFormState = withFormState(SomeComponentInsideForm);

interface WithFormStateDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const WithFormStateDemo = defineComponent((props, {}) => {

  const slots = useSlots()

  return () => (
    <div>
      <Form>
        <FormInput field='name' initValue='semi'></FormInput>
        <FormInput field='familyName' initValue='design'></FormInput>
        <ComponentWithFormState />
      </Form>
    </div>
  )
})


export default WithFormStateDemo

