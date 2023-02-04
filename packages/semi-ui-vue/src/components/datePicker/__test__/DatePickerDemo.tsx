import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import DatePicker from '../index'
import MonthsGrid from "../monthsGrid";
import Zh_CN from "../../locale/source/zh_CN";
import {Locale} from "../../locale/interface";
import Month from "../month";
import YearAndMonth from "../yearAndMonth";
import Navigation from "../navigation";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}

const DatePickerDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  const types = [
    "dateTime",
    "dateRange",
    "dateTimeRange",
    "month",
    "date",
    "dateTime",
  ]
  return () => (
    <div>
      <DatePicker onChange={(date, dateString) => console.log(dateString)} />
      {types.map(item=>{
        return <DatePicker type={item as any} onChange={(date, dateString) => console.log(dateString)} />
      })}
      {/*// @ts-ignore*/}
      <MonthsGrid locale={Zh_CN['DatePicker']} ></MonthsGrid>
      {/*// @ts-ignore*/}
      <Month locale={Zh_CN['DatePicker']} ></Month>
      <YearAndMonth locale={Zh_CN['DatePicker']} ></YearAndMonth>
      <Navigation></Navigation>
    </div>
  )
})

DatePickerDemo.props = vuePropsType

export default DatePickerDemo

