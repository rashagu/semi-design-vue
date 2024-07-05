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
const TableDemo1 = defineComponent((props, {}) => {
  const slots = useSlots();

  return () => {
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

    const renderName = (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    };

    const renderOwner = (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: '4px' }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    };

    return (
      <Table dataSource={data} pagination={false}>
        <TableColumn title="标题" dataIndex="name" key="name" render={renderName} />
        <TableColumn title="大小" dataIndex="size" key="size" />
        <TableColumn title="所有者" dataIndex="owner" key="owner" render={renderOwner} />
        <TableColumn title="更新时间" dataIndex="updateTime" key="updateTime" />
        <TableColumn title="" dataIndex="operate" key="operate" render={() => <IconMore />} />
      </Table>
    );
  }
});




export default TableDemo1;
