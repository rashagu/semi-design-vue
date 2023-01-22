import { defineComponent, ref, h, Fragment, useSlots } from "vue";
import Table, {TableColumn} from '../index'
import Avatar from '../../avatar'
import {IconMore} from "@kousum/semi-icons-vue";
interface TableDemo1Props {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const TableDemo1 = defineComponent<TableDemo1Props>((props, {}) => {
  const slots = useSlots();

  const pagination = {
    pageSize: 3,
  };
  return () => {
    const columns = [
      {
        title: '标题',
        dataIndex: 'name',
        width: 400,
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
    const data = [
      {
        key: '1',
        name: 'Semi Design 设计稿.fig',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
        size: '2M',
        owner: '姜鹏志',
        updateTime: '2020-02-02 05:13',
        avatarBg: 'grey',
      },
      {
        key: '2',
        name: 'Semi Design 分享演示文稿',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
        size: '2M',
        owner: '郝宣',
        updateTime: '2020-01-17 05:31',
        avatarBg: 'red',
      },
      {
        key: '3',
        name: '设计文档',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
        size: '34KB',
        owner: 'Zoey Edwards',
        updateTime: '2020-01-26 11:01',
        avatarBg: 'light-blue',
      },
      {
        key: '4',
        name: 'Semi Pro 设计稿.fig',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
        size: '2M',
        owner: '姜鹏志',
        updateTime: '2020-02-02 05:13',
        avatarBg: 'grey',
      },
      {
        key: '5',
        name: 'Semi Pro 分享演示文稿',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
        size: '2M',
        owner: '郝宣',
        updateTime: '2020-01-17 05:31',
        avatarBg: 'red',
      },
      {
        key: '6',
        name: 'Semi Pro 设计文档',
        nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
        size: '34KB',
        owner: 'Zoey Edwards',
        updateTime: '2020-01-26 11:01',
        avatarBg: 'light-blue',
      },
    ];
    const rowSelection = {
      getCheckboxProps: record => ({
        disabled: record.name === '设计文档', // Column configuration not to be checked
        name: record.name,
      }),
      onSelect: (record, selected) => {
        console.log(`select row: ${selected}`, record);
      },
      onSelectAll: (selected, selectedRows) => {
        console.log(`select all rows: ${selected}`, selectedRows);
      },
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };


    return <Table columns={columns} dataSource={data} rowSelection={rowSelection} pagination={pagination} />;
  }
});

TableDemo1.props = vuePropsType;
TableDemo1.name = "TableDemo1";

export default TableDemo1;
