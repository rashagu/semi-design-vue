import { defineComponent, ref, h, Fragment, useSlots, reactive, onMounted } from 'vue';
import Tabs, { TabPane } from '../index';
import { IconFile, IconGlobe, IconHelpCircle } from '@kousum/semi-icons-vue';
import TabsDemo2 from './TabsDemo2';
import Button from '../../button';

interface TabsDemoProps {
  name?: string;
  isVitest?: boolean;
}

export const vuePropsType = {
  name: String,
  isVitest: Boolean,
};
const TabsDemo = defineComponent((props, {}) => {
  const slots = useSlots();
  const state = reactive({
    tabList: [
      { tab: '文档', itemKey: '1', text: '文档', closable: true },
    ],
  });



  const txt = ref(1);

  const arr = [
    { tab: '快速起步', itemKey: '2', text: '快速起步', closable: true },
    { tab: '帮助', itemKey: '3', text: '帮助' },
    { tab: '帮助', itemKey: '4', text: '帮助' },
    { tab: '帮助', itemKey: '5', text: '帮助' },
    { tab: '帮助', itemKey: '6', text: '帮助' },
    { tab: '帮助', itemKey: '7', text: '帮助' },
  ];
  onMounted(() => {
    arr.forEach((item) => {
    })

  });

  let index = 0;

  function add() {
    state.tabList.push(arr[index])
    index++
  }

  return () => {
    return (
      <div>
        <Button onClick={add}>add tab</Button>
        <Tabs type="button" keepDOM={false} collapsible>
          {state.tabList.map((item) => {
            return <TabPane tab={'文sdfsdsf档' + item.tab} itemKey={item.itemKey}>
              <div>
                <div>{item.text}</div>
              </div>
            </TabPane>
          })}
        </Tabs>
      </div>
    );
  };
});

export default TabsDemo;

const TestComponent = defineComponent(() => {
  return () => {
    console.log('render');
    return <span>sdsd</span>;
  };
});
