import {defineComponent, ref, h, Fragment, VNode, inject} from 'vue'
import { Locale as dateFns } from 'date-fns';

import { get } from 'lodash';
import LocaleContext from './Context';
import ConfigContextConsumer from '../configProvider/ConfigContextConsumer';

import DefaultLocale from './source/zh_CN';
import { Locale } from './interface';

type ChildrenRender<T> = (componentLocal: T, localeCode: string, dateFnsLocale: dateFns) => VNode;
export interface LocaleConsumerProps<T> {
  componentName: string;
  children?: ChildrenRender<T>;
}

export const vuePropsType = {
  componentName: {
    type:String,
    default:''
  },
  children: [String, Boolean,Object,Array],
}

function LocaleConsumer<T>(){
  const vn = defineComponent<LocaleConsumerProps<T>>((props, {slots}) => {

    // const config = inject('ConfigContext', ref<ContextValue>({}))
    function renderChildren(localeData: Locale, children:any) {
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
      // console.log(locale)
      return children?.(locale[componentName], locale.code, dateFnsLocale);
    }


    return () => {
      return (
        <ConfigContextConsumer>
          {{
            default:(locale:any) => (
              <LocaleContext.Consumer>
                {{
                  default: localeData => renderChildren(locale || localeData, slots.default)
                }}
              </LocaleContext.Consumer>
            )
          }}
        </ConfigContextConsumer>
      )
    }
  })

  vn.props = vuePropsType
  return vn
}

export default LocaleConsumer

