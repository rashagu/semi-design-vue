import { defineComponent, ref, h, Fragment, useSlots, reactive } from 'vue';
import Tabs, { TabPane } from '../index';

interface TabsDemo2Props {
  name?: string;
  isVitest?: boolean;
}

export const vuePropsType = {
  name: String,
  isVitest: Boolean,
};
const TabsDemo2 = defineComponent<TabsDemo2Props>((props, {}) => {
  const slots = useSlots();
  return () => {
    return (
      <Tabs>
        <TabPane tab={<span role={'symbol'}>symbol0</span>} itemKey={'0'}>
          <div>symbol0</div>

        </TabPane>
        {[1, 2, 3].map((item) => {
          return (
            <TabPane tab={<span role={'symbol'}>symbol{item}</span>} itemKey={'' + item}>
              <div>symbol{item}</div>
            </TabPane>
          );
        })}
      </Tabs>
    );
  };
});

export default TabsDemo2;
