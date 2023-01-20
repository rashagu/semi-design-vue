import {defineComponent, ref, h, Fragment} from 'vue'
import DefaultLocale from './source/zh_CN';
import LocaleContext from './context';
import { Locale } from './interface';

interface ExampleProps {
  locale?: Locale;
}

export const vuePropsType = {
  locale: { type: Object, default: DefaultLocale }
}
const LocaleProvider = defineComponent<ExampleProps>((props, {slots}) => {


  return () => (
    <LocaleContext.Provider value={props.locale}>
      {slots.default?.()}
    </LocaleContext.Provider>
  )
})

LocaleProvider.props = vuePropsType

export default LocaleProvider

