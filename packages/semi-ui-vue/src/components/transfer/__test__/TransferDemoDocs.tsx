
import { IconHandle, IconClose } from '@kousum/semi-icons-vue';
import { defineComponent } from 'vue';
import Transfer from '../../transfer';
import Avatar from '../../avatar';
import { Checkbox } from '../../checkbox';

const Comp = defineComponent(() => {
  const renderSourceItem = item => {
    return (
      <div className="components-transfer-demo-source-item" key={item.label}>
        <Checkbox
          onChange={() => {
            item.onChange();
          }}
          key={item.label}
          checked={item.checked}
          style={{ height: '52px', alignItems: 'center' }}
        >
          <Avatar color={item.color} size="small">
            {item.abbr}
          </Avatar>
          <div className="info">
            <div className="name">{item.label}</div>
            <div className="email">{item.value}</div>
          </div>
        </Checkbox>
      </div>
    );
  };

  const renderSelectedItem = item => {
    const { sortableHandle } = item;
    const DragHandle = sortableHandle((arg:any) => <IconHandle ref={arg.handleRef} className={`semi-right-item-drag-handler`} />);
    return (
      <div className="components-transfer-demo-selected-item" key={item.label} ref={item.element}>
        <DragHandle />
        <Avatar color={item.color} size="small">
          {item.abbr}
        </Avatar>
        <div className="info">
          <div className="name">{item.label}</div>
          <div className="email">{item.value}</div>
        </div>
        <IconClose onClick={item.onRemove} />
      </div>
    );
  };

  const customFilter = (sugInput, item) => {
    return item.value.includes(sugInput) || item.label.includes(sugInput);
  };

  const data = [
    { label: '夏可漫', value: 'xiakeman@example.com', abbr: '夏', color: 'amber', area: 'US', key: 1 },
    { label: '申悦', value: 'shenyue@example.com', abbr: '申', color: 'indigo', area: 'UK', key: 2 },
    { label: '文嘉茂', value: 'wenjiamao@example.com', abbr: '文', color: 'cyan', area: 'HK', key: 3 },
    { label: '曲晨一', value: 'quchenyi@example.com', abbr: '曲', color: 'blue', area: 'India', key: 4 },
    { label: '曲晨二', value: 'quchener@example.com', abbr: '二', color: 'blue', area: 'India', key: 5 },
    { label: '曲晨三', value: 'quchensan@example.com', abbr: '三', color: 'blue', area: 'India', key: 6 },
  ];

  return ()=>(
    <Transfer
      draggable
      style={{ width: '568px' }}
      dataSource={data}
      filter={customFilter}
      defaultValue={['xiakeman@example.com', 'shenyue@example.com']}
      renderSelectedItem={renderSelectedItem}
      renderSourceItem={renderSourceItem}
      inputProps={{ placeholder: '搜索姓名或邮箱' }}
      onChange={(values, items) => {
        // console.log(values, items)
      }}
    />
  );
})
export default Comp;
