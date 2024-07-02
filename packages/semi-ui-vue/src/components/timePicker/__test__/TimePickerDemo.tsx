


import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import TimePicker from '../index';
import Combobox from "../Combobox";
import Provider from "../../configProvider/context/Provider";
import zh_CN from "../../locale/source/zh_CN";
import {Locale} from "../../locale/interface";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TimePickerDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  const value = ref('04:05:03')
  return () => (
    <div>
      <TimePicker  placeholder={'请选择时间'} />
      <TimePicker value={value.value} onChange={(v)=>{
        console.log(v)
        value.value = v
      }} placeholder={'请选择时间'} />
      <TimePicker defaultOpen={true}  placeholder={'请选择时间'} />
    </div>
  )
})




export default TimePickerDemo

