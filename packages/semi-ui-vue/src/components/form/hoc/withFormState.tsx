
import { FormStateContext } from '../context';
import {h} from 'vue'

const withFormState = (Component: any) => (props) => (
  <FormStateContext.Consumer>
    {formState => <Component formState={formState} {...props} />}
  </FormStateContext.Consumer>
)

export default withFormState;
