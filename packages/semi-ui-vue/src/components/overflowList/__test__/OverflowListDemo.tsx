import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Tag from "../../tag";
import { IconAlarm, IconBookmark, IconCamera, IconDuration, IconEdit, IconFolder } from '@kousum/semi-icons-vue';
import Slider from "../../slider";
import OverflowList from "../index";
interface OverflowListDemo1Props {
  name?: string
}

export const vuePropsType = {
  name: String
}
const OverflowListDemo1 = defineComponent<OverflowListDemo1Props>((props, {}) => {
  const slots = useSlots()
  const width = ref(100);
  const renderOverflow = items => {
    return items.length ? <Tag style={{ flex: '0 0 auto' }}>+{items.length}</Tag> : null;
  };
  const renderItem = (item, ind) => {
    return (
      <Tag color="blue" key={item.key} style={{ marginRight: '8px', flex: '0 0 auto' }}>
        {item.icon}
        {item.key}
      </Tag>
    );
  };

  const items = [
    { icon: <IconAlarm style={{ marginRight: 4 }} />, key: 'alarm' },
    { icon: <IconBookmark style={{ marginRight: 4 }} />, key: 'bookmark' },
    { icon: <IconCamera style={{ marginRight: 4 }} />, key: 'camera' },
    { icon: <IconDuration style={{ marginRight: 4 }} />, key: 'duration' },
    { icon: <IconEdit style={{ marginRight: 4 }} />, key: 'edit' },
    { icon: <IconFolder style={{ marginRight: 4 }} />, key: 'folder' },
  ];


  return () => (
    <div>
      <Tag style={{ flex: '0 0 auto' }}>+6</Tag>
      <Slider step={1} value={width.value} onChange={value => width.value = value as any} />
      <br />
      <br />
      <div style={{ width: `200px` }}>
        <OverflowList items={items} overflowRenderer={renderOverflow} visibleItemRenderer={renderItem} />
      </div>
    </div>
  )
})

OverflowListDemo1.props = vuePropsType
OverflowListDemo1.name = 'OverflowList'

export default OverflowListDemo1

