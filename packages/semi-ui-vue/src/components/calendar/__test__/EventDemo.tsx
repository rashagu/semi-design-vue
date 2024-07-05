import {defineComponent, ref, h, Fragment, useSlots, reactive, CSSProperties} from 'vue'
import {Radio, RadioGroup} from "../../index";
import Calendar from "../index";

interface EventDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const EventDemo = defineComponent((props, {}) => {
  const slots = useSlots()
  const state = reactive<{mode:"week" | "month" | "range" | "day"}>({
    mode: 'week',
  });

  function onSelect(e) {
    state.mode = e.target.value
  }
  return () => {

    const { mode } = state;
    const isMonthView = mode === 'month';
    const dailyEventStyle:CSSProperties = {
      borderRadius: '3px',
      boxSizing: 'border-box',
      border: 'var(--semi-color-primary) 1px solid',
      padding: '10px',
      backgroundColor: 'var(--semi-color-primary-light-default)',
      height: '100%',
      overflow: 'hidden',
    };
    const allDayStyle:CSSProperties = {
      borderRadius: '3px',
      boxSizing: 'border-box',
      border: 'var(--semi-color-bg-1) 1px solid',
      padding: '2px 4px',
      backgroundColor: 'var(--semi-color-primary-light-active)',
      height: '100%',
      overflow: 'hidden',
    };
    const dailyStyle = isMonthView ? allDayStyle : dailyEventStyle;
    const events = [
      {
        key: '0',
        start: new Date(2019, 5, 25, 14, 45, 0),
        end: new Date(2019, 6, 26, 6, 18, 0),
        children: <div style={dailyStyle}>6月25日 14:45 ~ 7月26日 6:18</div>,
      },
      {
        key: '1',
        start: new Date(2019, 6, 18, 10, 0, 0),
        end: new Date(2019, 6, 30, 8, 0, 0),
        children: <div style={allDayStyle}>7月18日 10:00 ~ 7月30日 8:00</div>,
      },
      {
        key: '2',
        start: new Date(2019, 6, 19, 20, 0, 0),
        end: new Date(2019, 6, 23, 14, 0, 0),
        children: <div style={allDayStyle}>7月19日 20:00 ~ 7月23日 14:00</div>,
      },
      {
        key: '3',
        start: new Date(2019, 6, 21, 6, 0, 0),
        end: new Date(2019, 6, 25, 6, 0, 0),
        children: <div style={allDayStyle}>7月21日 6:00 ~ 7月25日 6:00</div>,
      },
      {
        key: '4',
        allDay: true,
        start: new Date(2019, 6, 22, 8, 0, 0),
        children: <div style={allDayStyle} id={'calenderDemo_test_id'}>7月22日 全天</div>,
      },
      {
        key: '5',
        start: new Date(2019, 6, 22, 9, 0, 0),
        end: new Date(2019, 6, 23, 23, 0, 0),
        children: <div style={allDayStyle}>7月22日 9:00 ~ 7月23日 23:00</div>,
      },
      {
        key: '6',
        start: new Date(2019, 6, 23, 8, 32, 0),
        children: <div style={dailyStyle}>7月23日 8:32</div>,
      },
      {
        key: '7',
        start: new Date(2019, 6, 23, 14, 30, 0),
        end: new Date(2019, 6, 23, 20, 0, 0),
        children: <div style={dailyStyle}>7月23日 14:30-20:00</div>,
      },
      {
        key: '8',
        start: new Date(2019, 6, 25, 8, 0, 0),
        end: new Date(2019, 6, 27, 6, 0, 0),
        children: <div style={allDayStyle}>7月25日 8:00 ~ 7月27日 6:00</div>,
      },
      {
        key: '9',
        start: new Date(2019, 6, 26, 10, 0, 0),
        end: new Date(2019, 6, 27, 16, 0, 0),
        children: <div style={allDayStyle}>7月26日 10:00 ~ 7月27日 16:00</div>,
      },
    ];
    const displayValue = new Date(2019, 6, 23, 8, 32, 0);
    return (
      <>
        <RadioGroup onChange={e => onSelect(e)} value={mode}>
          <Radio value={'day'}>日视图</Radio>
          <Radio value={'week'}>周视图</Radio>
          <Radio value={'month'}>月视图</Radio>
          <Radio value={'range'}>多日视图</Radio>
        </RadioGroup>
        <br />
        <br />
        <Calendar
          height={400}
          mode={state.mode}
          displayValue={displayValue}
          events={events}
          range={state.mode === 'range' ? [new Date(2019, 6, 23), new Date(2019, 6, 26)] : []}
        ></Calendar>
      </>
    );
  }
}, {
  props: vuePropsType,
  name :'EventDemo'
})


export default EventDemo

