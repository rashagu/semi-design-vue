import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import Select from '../index';

interface SelectTestProps {
  name?: string;
}

export const vuePropsType: CombineProps<SelectTestProps> = {
  name: String,
};
const SelectTest = defineComponent({
  props: { ...vuePropsType },
  name: 'SelectTest',
  setup(props, { attrs }) {
    const slots = useSlots();

    return () => {
      return (
        <Select filter style={{ width: '180px' }} placeholder="带搜索功能的单选" defaultOpen={true} inputProps={{role:'select-search-input'}}>
          <Select.Option value="abc">抖音</Select.Option>
          <Select.Option value="ulikecam">轻颜相机</Select.Option>
          <Select.Option value="jianying">剪映</Select.Option>
          <Select.Option value="xigua">西瓜视频</Select.Option>
        </Select>
      );
    };
  },
});

export default SelectTest;
