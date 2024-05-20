import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import DatePicker from '../index'
import MonthsGrid from "../monthsGrid";
import Zh_CN from "../../locale/source/zh_CN";
import {Locale} from "../../locale/interface";
import Month from "../month";
import YearAndMonth from "../yearAndMonth";
import Navigation from "../navigation";
import { Form, FormDatePicker } from '../../form';

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
    "month",
    "date",
    "dateTime",
  ]
  const typesRange = [
    "dateRange",
    "dateTimeRange",
  ]
  const dateValue = ref("2023-01-01")


  return () => (
    <div>
      <DatePicker value={dateValue.value} onChange={(date, dateString) => {
        dateValue.value = dateString as any
        console.log(dateString)
      }} />
      {types.map(item=>{
        return <DatePicker type={item as any} onChange={(date, dateString) => console.log(dateString)} />
      })}
      {typesRange.map(item=>{
        return <DatePicker type={item as any} onChange={(date, dateString) => console.log(dateString)} />
      })}
      {/*// @ts-ignore*/}
      <MonthsGrid locale={Zh_CN['DatePicker']} ></MonthsGrid>
      {/*// @ts-ignore*/}
      <Month locale={Zh_CN['DatePicker']} ></Month>
      {/*// @ts-ignore*/}
      <YearAndMonth locale={Zh_CN['DatePicker']} currentYear={{ left: 0,  right: 0 }} currentMonth={{ left: 0,  right: 0 }}></YearAndMonth>
      <Navigation></Navigation>
      <Form>
        <FormDatePicker field='ssss'/>
      </Form>
    </div>
  )
})



export default DatePickerDemo

