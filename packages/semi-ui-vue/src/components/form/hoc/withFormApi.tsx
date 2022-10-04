import { FormApiContext } from '../context';
import {h} from 'vue'

const withFormApi = (Component: any) => (props) => (
  <FormApiContext.Consumer>
    {formApi => <Component formApi={formApi} {...props} />}
  </FormApiContext.Consumer>
)

export default withFormApi;
