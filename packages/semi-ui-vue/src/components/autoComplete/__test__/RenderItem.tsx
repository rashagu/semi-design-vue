import {defineComponent, ref, h, Fragment, reactive} from 'vue'
import Avatar from '../../avatar'
import {AutoCompleteFunc} from '../index'
import {IconSearch} from '@kousum/semi-icons-vue'
interface ExampleProps {
  name?: string
}

const AutoComplete = AutoCompleteFunc<{name: string, email: string, abbr: string, color: string}>()

export const vuePropsType = {
  name: String
}
const RenderItem = defineComponent<ExampleProps>((props, {slots}) => {

  const state = reactive({
    data: [],
    color: ['amber', 'indigo', 'cyan'],
    list: [
      { name: '夏可漫', email: 'xiakeman@example.com', abbr: 'XK', color: 'amber' },
      { name: '申悦', email: 'shenyue@example.com', abbr: 'SY', color: 'indigo' },
      { name: '曲晨一', email: 'quchenyi@example.com', abbr: 'CY', color: 'blue' },
      { name: '文嘉茂', email: 'wenjiamao@example.com', abbr: 'JM', color: 'cyan' },
    ],
  })

  function search(value) {
    let result;
    if (value) {
      result = state.list.map(item => {
        return { ...item, value: item.name, label: item.email };
      });
    } else {
      result = [];
    }
    state.data = result
  }


  function renderOption(item) {
    let optionStyle = {
      display: 'flex',
    };
    return (
      <>
        <Avatar color={item.color} size="small">
          {item.abbr}
        </Avatar>
        <div style={{ marginLeft: '4px' }}>
          <div style={{ fontSize: '14px', marginLeft: '4px' }}>{item.name}</div>
          <div style={{ marginLeft: '4px' }}>{item.email}</div>
        </div>
      </>
    );
  }



  return () => (
    <div>
      <AutoComplete
        data={state.data}
        prefix={<IconSearch />}
        style={{ width: '250px' }}
        renderSelectedItem={option => option.email}
        renderItem={renderOption}
        onSearch={search}
        onSelect={v => console.log(v)}
      ></AutoComplete>
    </div>
  )
}, {
  props: vuePropsType,
  name: 'RenderItem'
})


export default RenderItem

