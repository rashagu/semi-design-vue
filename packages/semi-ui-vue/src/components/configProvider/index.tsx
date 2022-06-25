import {defineComponent, ref, h, Fragment} from 'vue'
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';
import DefaultLocale from '../locale/source/zh_CN';
import Context, {ConfigContextVNode, ContextValue} from './ConfigContextProvider';


// eslint-disable-next-line
export interface ConfigProviderProps extends ContextValue {}

export const vuePropsType = {
  locale: {
    type: Object,
    default: DefaultLocale
  },
  timeZone: String,
  getPopupContainer: Function,
  direction: {type:String, default:'ltr'},
}
const Index = defineComponent<ConfigProviderProps>((props, {slots}) => {

  function renderChildren() {
    const { direction,} = props;
    if (direction === 'rtl') {
      return (
        <div class={`${BASE_CLASS_PREFIX}-rtl`}>
          {slots.default?slots.default():null}
        </div>
      );
    }
    return slots.default?slots.default():null
  }
  return () => {

    const { direction, ...rest } = props;
    return (
      <ConfigContextVNode
        value={{
          direction,
          ...rest,
        }}
      >
        {renderChildren()}
      </ConfigContextVNode>
    );
  }
})

Index.props = vuePropsType

export default Index

