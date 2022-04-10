import {defineComponent, ref, h, Fragment} from 'vue'
import AutoComplete from '../Index'
import {IconSearch} from '@kousum/semi-icons-vue'
import Input from "../../input/Index";
import RenderItem from "./RenderItem ";
import Empty from "../../empty";
import {IllustrationNoContent} from "@kousum/semi-illustrations-vue";
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const AutoCompleteItemsDemo = defineComponent<ExampleProps>((props, {slots}) => {

  const stringData = ref([]);
  const value = ref('');
  const handleStringSearch = (value) => {
    let result;
    if (value) {
      result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    } else {
      result = [];
    }
    console.log(result)
    stringData.value = result
  };

  const handleChange = (value_) => {
    console.log('onChange', value_);
    value.value= value_
  };
  return ()=>{
    return (
      <div>

        <AutoComplete
          data={stringData.value}
          value={value.value}
          showClear
          prefix={<IconSearch />}
          placeholder="搜索... "
          onSearch={handleStringSearch}
          onChange={handleChange}
          style={{ width: '200px' }}
        />

        <h1>renderItem</h1>

        <RenderItem/>


        <AutoComplete
          data={[]}
          emptyContent={<Empty style={{ padding: 12, width: 300 }} image={<IllustrationNoContent style={{width: '150px', height: '150px'}}/>} description={'暂无内容'} />}

        />
      </div>
    )
  };
})

AutoCompleteItemsDemo.props = vuePropsType

export default AutoCompleteItemsDemo

