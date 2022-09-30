import {defineComponent, ref, h, Fragment} from 'vue'
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';
import DefaultLocale from '../locale/source/zh_CN';
import Context from './context';
import type {ContextValue} from './context';



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
const ConfigProvider = defineComponent<ConfigProviderProps>((props, {slots}) => {

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
      <Context.Provider
        value={{
          direction,
          ...rest,
        }}
      >
        {{
          default: renderChildren
        }}
      </Context.Provider>
    );
  }
})

ConfigProvider.props = vuePropsType
ConfigProvider.name = 'ConfigProvider'
export default ConfigProvider

