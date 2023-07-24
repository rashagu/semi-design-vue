import {defineComponent, ref, h, Fragment, useSlots, CSSProperties} from 'vue'
import Calendar from "../index";
import EventDemo from "./EventDemo";

interface CalenderDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const CalenderDemo = defineComponent<CalenderDemoProps>((props, {}) => {
  const slots = useSlots()

  const DemoDiy = () => {
    const importantDate:CSSProperties = {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      backgroundColor: 'var(--semi-color-danger-light-default)',
    };
    const displayValue = new Date(2019, 6, 23, 8, 32, 0);
    const importDates = [new Date(2019, 6, 2), new Date(2019, 6, 8), new Date(2019, 6, 19), new Date(2019, 6, 23)];
    const dateRender = dateString => {
      if (importDates.filter(date => date.toString() === dateString).length) {
        return <div style={importantDate} />;
      }
      return null;
    };
    return <Calendar height={700} mode="month" displayValue={displayValue} dateGridRender={dateRender} />;
  };
  return () => (
    <div>
      <Calendar mode="day"></Calendar>
      <Calendar mode="week"></Calendar>
      <Calendar mode="month"></Calendar>
      <EventDemo/>
      <DemoDiy />
    </div>
  )
}, {
  props:vuePropsType,
  name:'CalenderDemo',
})


export default CalenderDemo

