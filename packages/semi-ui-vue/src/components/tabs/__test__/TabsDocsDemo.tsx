import Tabs from '../index';
import TabPane from '../TabPane';

const Demo = ()=>(
  <Tabs style={{ width: '20%', margin: '20px' }} type="card" collapsible>
    {[10,2324325324324,1111].map(i => (
      <TabPane tab={`Tab-${i}`} itemKey={`Tab-${i}`} key={i}>
        Content of card tab {i}
      </TabPane>
    ))}
  </Tabs>
)
export default Demo
