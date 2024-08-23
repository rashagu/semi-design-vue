

import { defineComponent, ref } from 'vue';
import { Dropdown } from '../../dropdown';
import Tabs, { TabPane } from '../index';

const Demo = defineComponent(() => {

  const activeKey = ref('Tab-0');
  const renderArrow = (items, pos, handleArrowClick) => {
    const style = {
      width: '32px',
      height: '32px',
      margin: '0 12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100%',
      background: 'rgba(var(--semi-grey-1), 1)',
      color: 'var(--semi-color-text)',
      cursor: 'pointer',
    };
    return (
      <Dropdown
        render={
          <Dropdown.Menu>
            {items.map(item => {
              return (
                <Dropdown.Item onClick={() => activeKey.value = item.itemKey}>{item.itemKey}</Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        }
      >
        {pos === 'start' ? (
          <div style={style} onClick={handleArrowClick}>
            ←
          </div>
        ) : (
          <div style={style} onClick={handleArrowClick}>
            →
          </div>
        )}
      </Dropdown>
    );
  };

  return () => (
    <Tabs
      renderArrow={renderArrow}
      style={{ width: '50%', margin: '20px' }}
      activeKey={activeKey.value}
      type="card"
      collapsible
      onChange={k => activeKey.value = k}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
        <TabPane tab={`Tab-${i}`} itemKey={`Tab-${i}`} key={i}>
          Content of card tab {i}
        </TabPane>
      ))}
    </Tabs>
  );
})
export default Demo;
