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
const TabsDemo2 = defineComponent((props, {}) => {
  const slots = useSlots();
  return () => {
    return (
      <Tabs style={{ width: '60%', margin: '20px' }} type="card" collapsible>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <TabPane tab={`Tab-${i}`} itemKey={`Tab-${i}`} key={i}>
            Content of card tab {i}
          </TabPane>
        ))}
      </Tabs>
    );
  };
});

export default TabsDemo2;
