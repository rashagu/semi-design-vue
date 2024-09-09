import { defineComponent, ref, h, Fragment, useSlots, computed } from 'vue';
import Table from '../index'
import Avatar from '../../avatar'
import {IconMore} from "@kousum/semi-icons-vue";
interface TableDemo1Props {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const TableDemo1 = defineComponent((props, {}) => {
  const slots = useSlots();
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      render: (text, record, index) => {
        return (
          <div>
            <Avatar
              size="small"
              shape="square"
              src={record.nameIconSrc}
              style={{ marginRight: '12px' }}
            ></Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '大小',
      dataIndex: 'size',
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: '4px' }}>
              {typeof text === 'string' && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
    },
    {
      title: '',
      dataIndex: 'operate',
      render: () => {
        return <IconMore />;
      },
    },
  ];
  const data = ref([]);
  for (let i = 0; i < 10; i++) {
    data.value.push({
      key: 'a' + i,
      name: 'Semi Design 设计稿.fig',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
      size: '2M',
      owner: '姜鹏志',
      updateTime: '2020-02-02 05:13',
      avatarBg: 'grey',
      IsCheck: i === 0,
    })
  }

  const rowSelection = computed(()=>{
    return {
      selectedRowKeys: data.value.filter(item=>!!item.IsCheck).map(item=>item.key),
      getCheckboxProps: (record) => {
        return ({
          disabled: false,
          name: record.DrugsterId,
        })
      },
      onSelect: (record, selected) => {
        console.log(`select row: ${selected}`, record)
        record && (record.IsCheck = selected?1:0);
        data.value = [...data.value]
      },
      onSelectAll: (selected, selectedRows) => {
        // console.log(`select all rows: ${selected}`, selectedRows)
      },
      onChange: (selectedRowKeys_, selectedRows) => {
        console.log('onChange')
        // selectedRowKeys.value = selectedRowKeys_ as any
      }
    }
  })


  return () => {
    return <Table columns={columns} dataSource={data.value} rowSelection={rowSelection.value} pagination={false} />;
  }
});




export default TableDemo1;
