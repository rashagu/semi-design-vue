import { defineComponent, ref, unref } from 'vue';
import Tabs, { TabPane } from '../index';
import Input from '../../input';

const TabsDemo = defineComponent((props, {}) => {
  const testValue = ref('123');
  return () => (
    <Tabs type="button">
      <TabPane tab="文档" itemKey="1">
        <div>
          <div>{Math.random()}</div>
          {Array.from({ length: 2000 }, (item) => (
            <Input style={{ width: '200px' }} value={unref(testValue)}></Input>
          ))}
        </div>
      </TabPane>
      <TabPane tab="快速起步" itemKey="2">
        <div>快速起步</div>
      </TabPane>
      <TabPane tab="帮助" itemKey="3">
        <div>帮助</div>
      </TabPane>
    </Tabs>
  );
});
export default TabsDemo;
