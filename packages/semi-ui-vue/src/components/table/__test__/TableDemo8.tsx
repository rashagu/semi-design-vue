import { defineComponent, ref, h, Fragment, useSlots, computed, onMounted } from 'vue';
import {TableMaker, ColumnProps, RowSelection, TableColumn} from '../index';
import Avatar from '../../avatar';
import { IconMore } from '@kousum/semi-icons-vue';
import { IllustrationNoResult, IllustrationNoResultDark } from '@kousum/semi-illustrations-vue';
import { Button, Empty } from '../../index';
import { IconDelete } from '@kousum/semi-icons-vue';
import { TypographyText } from '../../typography';
import * as dateFns from 'date-fns';
import Tag from "../../tag";

interface TableDemo1Props {
  name?: string;
}



export const vuePropsType = {
  name: String,
};
interface ColType {key: string, name: string, nameIconSrc: string, size: string, owner: string, updateTime: string, avatarBg: string}
const Table = TableMaker<ColType>();
const TableDemo1 = defineComponent((props, {}) => {

  const DAY = 24 * 60 * 60 * 1000;
  const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

  const columns:ColumnProps<ColType>[] = [
    {
      title: '标题',
      width: 500,
      dataIndex: 'name',
      render: (text, record, index) => {
        return (
          <span>
                    <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: 12 }}></Avatar>
            {text}
                </span>
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
            <Avatar size="small" color={record.avatarBg as any} style={{ marginRight: 4 }}>
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
  ];

  const expandData = {
    '0': [
      { key: '实际用户数量', value: '1,480,000' },
      { key: '7天留存', value: '98%' },
      { key: '安全等级', value: '3级' },
      { key: '垂类标签', value: <Tag style={{ margin: 0 }}>设计</Tag> },
      { key: '认证状态', value: '未认证' },
    ],
    '1': [
      { key: '实际用户数量', value: '2,480,000' },
      { key: '7天留存', value: '90%' },
      { key: '安全等级', value: '1级' },
      { key: '垂类标签', value: <Tag style={{ margin: 0 }}>模板</Tag> },
      { key: '认证状态', value: '已认证' },
    ],
    '2': [
      { key: '实际用户数量', value: '2,920,000' },
      { key: '7天留存', value: '98%' },
      { key: '安全等级', value: '2级' },
      { key: '垂类标签', value: <Tag style={{ margin: 0 }}>文档</Tag> },
      { key: '认证状态', value: '已认证' },
    ],
  };


  const expandRowRender = (record, index) => {
    return <div>123</div>;
  };

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

  return () => {


    return (
      <Table
        rowKey="name"
        columns={columns}
        dataSource={data}
        expandedRowRender={expandRowRender}
        rowSelection={rowSelection}
        pagination={false}
      />
    );
  };
});




export default TableDemo1;
