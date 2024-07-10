import { defineComponent, ref, h, Fragment, VNode, inject, Ref, ComponentObjectPropsOptions } from 'vue';
import { Locale as dateFns } from 'date-fns';

import { get } from 'lodash';
import LocaleContext from './context';
import Context, { ContextValue } from '../configProvider/context';

import DefaultLocale from './source/zh_CN';
import { Locale } from './interface';
import { CombineProps } from '../interface';

type ChildrenRender<T> = (componentLocal: T, localeCode: string, dateFnsLocale: dateFns) => VNode;
export interface LocaleConsumerProps<T> {
  componentName: string;
  // children?: ChildrenRender<T>;
}

function LocaleConsumerFunc<T>() {
  const vuePropsType: CombineProps<LocaleConsumerProps<T>> = {
    componentName: {
      type: String,
      default: '',
      required: true
    },
    // children: [String, Boolean,Object,Array],
  };
  const vn = defineComponent({
    props: vuePropsType,
    name: 'LocaleConsumer',
    setup(props, { slots }) {
      // const config = inject('ConfigContext', ref<ContextValue>({}))
      function renderChildren(localeData: Locale, children: any) {
        const { componentName } = props;
        let locale = localeData;
        if (!localeData?.code) {
          locale = DefaultLocale;
        }
        /**
         * dateFnsLocale is used to format the date into a local date
         * example:
         *  import { zhCN } from "date-fns/locale";
         *  format(new Date("2021-04-29"), "yyyy-MM-dd EEEE")
         *      => '2021-04-29 Thursday' (默认 locale 为 en-US)
         *  format(new Date('2021-04-29'), "yyyy-MM-dd EEEE", { locale: zhCN })
         *      => '2021-04-29 星期四'
         */
        const defaultFnsLocale = get(DefaultLocale, 'dateFnsLocale');
        const dateFnsLocale = get(locale, 'dateFnsLocale', defaultFnsLocale);
        return children?.(locale[componentName], locale.code, dateFnsLocale);
      }

      return () => {
        return (
          <Context.Consumer>
            {{
              default: (locale: Ref<ContextValue>) => {
                return (
                  <LocaleContext.Consumer>
                    {{
                      default: (localeData) => renderChildren(locale.value.locale || localeData.value, slots.default),
                    }}
                  </LocaleContext.Consumer>
                );
              },
            }}
          </Context.Consumer>
        );
      };
    },
  });

  return vn;
}

const LocaleConsumer = LocaleConsumerFunc();
export default LocaleConsumer;
export { LocaleConsumerFunc };
