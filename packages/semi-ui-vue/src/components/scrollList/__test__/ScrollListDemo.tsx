import {defineComponent, ref, h, Fragment, useSlots, reactive} from 'vue'
import ScrollList from '../index'
import ScrollItem from '../scrollItem'
import Button from '../../button'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ScrollListDemo = defineComponent((props, {}) => {
  const slots = useSlots()
  const state = reactive({
    selectIndex1: 1,
    selectIndex2: 1,
    selectIndex3: 1,
  });

  const ampms = [
    {
      value: '上午',
    },
    {
      value: '下午',
    },
  ];

  const hours = new Array(12).fill(0).map((itm, index) => {
    return {
      value: index + 1,
    };
  });

  const minutes = new Array(60).fill(0).map((itm, index) => {
    return {
      value: index,
      disabled: false,
    };
  });


  function onSelectAP(data) {
    state['selectIndex' + data.type] = data.index
  }

  function onSelectHour(data) {
    console.log('You have choose the hour for: ', data.value);
    state['selectIndex' + data.type] = data.index
  }

  function onSelectMinute(data) {
    console.log('You have choose the minute for: ', data.value);
    state['selectIndex' + data.type] = data.index
  }

  function handleClose() {
    console.log('close');
  }

  function renderFooter() {
    return (
      <Button size="small" type="primary" onClick={handleClose}>
        Ok
      </Button>
    );
  }

  return () => {

    const scrollStyle = {
      border: 'unset',
      boxShadow: 'unset',
    };
    return (
      <div>
        <ScrollList style={scrollStyle} header={'无限滚动列表'} footer={renderFooter()}>
          <ScrollItem
            mode="wheel"
            cycled={false}
            list={ampms}
            type={1}
            selectedIndex={state.selectIndex1}
            onSelect={onSelectAP}
          />
          <ScrollItem
            mode="wheel"
            cycled={true}
            list={hours}
            type={2}
            selectedIndex={state.selectIndex2}
            onSelect={onSelectHour}
          />
          <ScrollItem
            mode="wheel"
            cycled={true}
            list={minutes}
            type={3}
            selectedIndex={state.selectIndex3}
            onSelect={onSelectMinute}
          />
        </ScrollList>
      </div>
    )
  }
}, {
  props: vuePropsType,
  name: 'ScrollListDemo'
})


export default ScrollListDemo

