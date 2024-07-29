import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { AutoComplete } from '@kousum/semi-ui-vue';
import { IconSearch } from '@kousum/semi-icons-vue';

const baseAutoComplete = defineComponent((props, {}) => {
  const slots = useSlots();

  const stringData = ref([]);
  const value = ref('');
  const handleStringSearch = (value) => {
    let result;
    if (value) {
      result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    } else {
      result = [];
    }
    stringData.value = result
  };

  const handleChange = (value_:any) => {
    console.log('onChange', value_);
    value.value = value_
  };

  return () => {

    return (
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
    );
  };
});


export default baseAutoComplete;

