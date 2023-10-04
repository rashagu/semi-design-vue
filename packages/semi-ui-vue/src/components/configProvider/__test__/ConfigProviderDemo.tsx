import {defineComponent, ref, h, Fragment} from 'vue'
import ConfigProvider from "../index";
import en_US from '../../locale/source/en_US';
import DatePickerDemo from "../../datePicker/__test__/DatePickerDemo";

interface ConfigProviderDemoProps {
  name?: string
}

export const vuePropsType = {


}
const ConfigProviderDemo = defineComponent<ConfigProviderDemoProps>((props, {slots}) => {


  return () => (
    <ConfigProvider locale={en_US}>
      <DatePickerDemo />
    </ConfigProvider>
  )
})



export default ConfigProviderDemo

