import {defineComponent, ref, h, StyleValue} from 'vue'
import log from '@douyinfe/semi-foundation/utils/log';
import { DefaultAdapter } from '@douyinfe/semi-foundation/base/foundation';
import { VALIDATE_STATUS } from '@douyinfe/semi-foundation/base/constants';
import { ArrayElement } from './base';

const { hasOwnProperty } = Object.prototype;

export type ValidateStatus = ArrayElement<typeof VALIDATE_STATUS>;

export interface BaseProps {
  style?: StyleValue;
  className?: string;
}



const BaseComponent = defineComponent<BaseProps>(props => {
  const cache = ref<any>({});
  const foundation = ref<any>(null);


  // eslint-disable-next-line
  const isControlled = (key: any) => Boolean(key && props && typeof props === 'object' && hasOwnProperty.call(props, key));

  function log(text: string, ...rest: any): any {
    return log(text, ...rest);
  }

  return () => (
    <div id={'a'}>
      BaseComponent
    </div>
  )
})


BaseComponent.props = {
  style: Object,
  className: String,
}

export default BaseComponent
