import { defineComponent, ref, h, Fragment, useSlots, reactive, onMounted } from 'vue';
import Tabs, { TabPane } from '../index';
import { IconFile, IconGlobe, IconHelpCircle } from '@kousum/semi-icons-vue';
import TabsDemo2 from './TabsDemo2';

interface TabsDemoProps {
  name?: string;
  isVitest?: boolean;
}

export const vuePropsType = {
  name: String,
  isVitest: Boolean,
};
const TabsDemo = defineComponent<TabsDemoProps>((props, {}) => {
  const slots = useSlots();
  const state = reactive({
    tabList: [
      { tab: '文档', itemKey: '1', text: '文档', closable: true },
      { tab: '快速起步', itemKey: '2', text: '快速起步', closable: true },
      { tab: '帮助', itemKey: '3', text: '帮助' },
      { tab: '帮助', itemKey: '4', text: '帮助' },
      { tab: '帮助', itemKey: '5', text: '帮助' },
      { tab: '帮助', itemKey: '6', text: '帮助' },
      { tab: '帮助', itemKey: '7', text: '帮助' },
    ],
  });
  function close(key) {
    const newTabList = [...state.tabList];
    const closeIndex = newTabList.findIndex((t) => t.itemKey === key);
    newTabList.splice(closeIndex, 1);
    state.tabList = newTabList;
  }
  const txt = ref(1)
  onMounted(()=>{
    setInterval(()=>{
      txt.value++
    }, 1000)
  })
  return () => {
    return (
      <div>
        {txt.value}
        <Tabs type="button" keepDOM={false}>
          <TabPane tab={'文sdfsdsf档' + txt.value} itemKey="1">
            <div>
              <div>文档</div>
            </div>
          </TabPane>
          <TabPane tab="快速dfdffdfx起步" itemKey="2">
            <div>
              <div>快速起步</div>
            </div>
          </TabPane>
          <TabPane tab="帮助" itemKey="3">
            <div>
              <div>帮助</div>
            </div>
          </TabPane>
        </Tabs>

        <Tabs>
          <TabPane
            tab={
              <span>
                <IconFile />
                文档
              </span>
            }
            itemKey="1"
          >
            <TestComponent/>
          </TabPane>
          <TabPane
            tab={
              <span>
                <IconGlobe />
                快速起步
              </span>
            }
            itemKey="2"
          >
            快速起步
          </TabPane>
          <TabPane
            tab={
              <span>
                <IconHelpCircle />
                帮助
              </span>
            }
            itemKey="3"
          >
            帮助
          </TabPane>
        </Tabs>
        <TabsDemo2/>
      </div>
    );
  };
});

export default TabsDemo;

const TestComponent = defineComponent(()=>{
  return ()=>{
    console.log('render');
    return <span>sdsd</span>
  }
})
