import {defineComponent, ref, h, Fragment, useSlots} from "vue";
import LocaleProvider from "../localeProvider";
import Pagination from "../../pagination";
import en_GB from "../source/en_GB";
import ja_JP from "../source/ja_JP";

interface LocaleDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const LocaleDemo = defineComponent<LocaleDemoProps>((props, {}) => {
  const slots = useSlots();

  return () => <div>
    <LocaleProvider locale={en_GB}>
      <Pagination total={100} showTotal showSizeChanger style={{ margin: 20 }} />
    </LocaleProvider>
    <LocaleProvider locale={ja_JP}>
      <Pagination total={100} showTotal showSizeChanger style={{ margin: 20 }} />
    </LocaleProvider>
  </div>;
});



export default LocaleDemo;
