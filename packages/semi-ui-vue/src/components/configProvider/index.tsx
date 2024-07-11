import { defineComponent, ref, h, Fragment, ComponentObjectPropsOptions, PropType } from 'vue';
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';
import DefaultLocale from '../locale/source/zh_CN';
import Context from './context';
import type { ContextValue } from './context';
import { CombineProps } from '../interface';

export interface ConfigProviderProps extends ContextValue {}

export const vuePropsType: CombineProps<ConfigProviderProps> = {
  locale: {
    type: Object,
    default: DefaultLocale,
  },
  timeZone: String,
  getPopupContainer: Function as PropType<ConfigProviderProps['getPopupContainer']>,
  direction: { type: String as PropType<ConfigProviderProps['direction']>, default: 'ltr' },
};
const ConfigProvider = defineComponent({
  props: { ...vuePropsType },
  name: 'ConfigProvider',
  setup(props, { slots }) {
    function renderChildren() {
      const { direction } = props;
      if (direction === 'rtl') {
        return <div class={`${BASE_CLASS_PREFIX}-rtl`}>{slots.default ? slots.default() : null}</div>;
      }
      return slots.default ? slots.default() : null;
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
            default: renderChildren,
          }}
        </Context.Provider>
      );
    };
  },
});

export default ConfigProvider;
