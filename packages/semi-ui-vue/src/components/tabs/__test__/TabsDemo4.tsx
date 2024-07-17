import { defineComponent, ref, h, Fragment, useSlots, reactive } from 'vue';
import Tabs, { TabPane } from '../index';
import Button from '../../button';

interface TabsDemo4Props {
  name?: string;
  isVitest?: boolean;
}

export const vuePropsType = {
  name: String,
  isVitest: Boolean,
};
const TabsDemo4 = defineComponent((props, {}) => {
  const slots = useSlots();
  const activeKey = ref('0');

  return () => {
    return (
      <div style={{width:'400px'}}>
        <Tabs activeKey={activeKey.value} collapsible onChange={(v)=>activeKey.value = v}>
          <TabPane tab={<span role={'symbol'}>symbol0</span>} itemKey={'0'}>
            <div>symbol0</div>
          </TabPane>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
            return (
              <TabPane tab={<span role={'symbol'}>symbol{item}</span>} itemKey={'' + item}>
                <div>symbol{item}</div>
              </TabPane>
            );
          })}
        </Tabs>
        {activeKey.value}
        <Button
          role={'bt'}
          onClick={() => {
            activeKey.value = '10';
          }}
        >
          set
        </Button>
      </div>
    );
  };
});

export default TabsDemo4;
