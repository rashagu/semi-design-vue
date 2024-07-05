import { defineComponent, ref, h, Fragment, useSlots } from "vue";
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
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: 'a' + i,
      name: 'Semi Design 设计稿.fig',
      nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
      size: '2M',
      owner: '姜鹏志',
      updateTime: '2020-02-02 05:13',
      avatarBg: 'grey',
    })
  }


  return () => {
    return <Table columns={columns} dataSource={data} pagination={false} />;
  }
});




export default TableDemo1;
