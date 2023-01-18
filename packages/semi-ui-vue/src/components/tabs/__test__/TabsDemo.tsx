import {defineComponent, ref, h, Fragment, useSlots, reactive} from 'vue'
import Tabs, {TabPane} from "../index";

interface TabsDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TabsDemo = defineComponent<TabsDemoProps>((props, {}) => {
  const slots = useSlots()
  const state = reactive({
    tabList: [
      { tab: '文档', itemKey: '1', text: '文档', closable: true },
      { tab: '快速起步', itemKey: '2', text: '快速起步', closable: true },
      { tab: '帮助', itemKey: '3', text: '帮助' },
    ]
  });
  function close(key){
    const newTabList = [...state.tabList];
    const closeIndex = newTabList.findIndex(t=>t.itemKey===key);
    newTabList.splice(closeIndex, 1);
    state.tabList = newTabList
  }
  return () => {
    return (
      <Tabs type="card" defaultActiveKey="1" onTabClose={close.bind(this)}>
        {
          state.tabList.map(t=><TabPane closable={t.closable as any} tab={t.tab} itemKey={t.itemKey} key={t.itemKey}>{t.text}</TabPane>)
        }
      </Tabs>
    );
  }
})

TabsDemo.props = vuePropsType
TabsDemo.name = 'TabsDemo'

export default TabsDemo

