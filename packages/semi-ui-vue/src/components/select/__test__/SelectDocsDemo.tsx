import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import Select from '../index';

interface SelectDocsDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<SelectDocsDemoProps> = {
  name: String,
};
const SelectDocsDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'SelectDocsDemo',
  setup(props, { attrs }) {
    const slots = useSlots();


    return () => (
      <div>
        <Select
          multiple
          maxTagCount={2}
          showRestTagsPopover={true}
          restTagsPopoverProps={{ position: 'top' }}
          style={{ width: '320px' }}
          defaultValue={['abc', 'ulikecam', 'jianying']}
        >
          <Select.Option value="abc">抖音</Select.Option>
          <Select.Option value="ulikecam">轻颜相机</Select.Option>
          <Select.Option value="jianying">剪映</Select.Option>
          <Select.Option value="xigua">西瓜视频</Select.Option>
        </Select>

      </div>
    );
  },
});


export default SelectDocsDemo;

