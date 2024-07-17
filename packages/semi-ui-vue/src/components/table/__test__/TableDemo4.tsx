import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import Table, { TableColumn } from '../index';
import Avatar from '../../avatar';
import { IconMore } from '@kousum/semi-icons-vue';
import { IllustrationNoResult, IllustrationNoResultDark } from '@kousum/semi-illustrations-vue';

import { IconDelete } from '@kousum/semi-icons-vue';
import {TypographyText} from "../../typography"
import Button from '../../button';
import Empty from '../../empty';
interface TableDemo1Props {
  name?: string;
}

const raw = [
  {
    key: '1',
    name: 'Semi Design 设计稿标题可能有点长这时候应该显示 Tooltip.fig',
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
    name: 'Semi Pro 设计文档可能也有点长所以也会显示Tooltip',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '34KB',
    owner: '姜琪',
    updateTime: '2020-01-26 11:01',
    avatarBg: 'green',
  },
];
export const vuePropsType = {
  name: String,
};
const TableDemo1 = defineComponent((props, {}) => {
  const slots = useSlots();

  const pagination = {
    pageSize: 3,
  };
  const dataSource = ref(raw);

  return () => {

    const removeRecord = key => {
      let newDataSource = [...dataSource.value];
      if (key != null) {
        let idx = newDataSource.findIndex(data => data.key === key);

        if (idx > -1) {
          newDataSource.splice(idx, 1);
          dataSource.value = newDataSource
        }
      }
    };
    const resetData = () => {
      const newDataSource = [...raw];
      dataSource.value = newDataSource
    };

    const columns = [
      {
        title: '标题',
        dataIndex: 'name',
        width: 400,
        render: (text, record, index) => {
          return (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: '12px' }}></Avatar>
              {/* 宽度计算方式为单元格设置宽度 - 非文本内容宽度 */}
              {/*// @ts-ignore*/}
              <TypographyText heading={'5'} ellipsis={{ showTooltip: true }} style={{ width: 'calc(400px - 76px)' }}>
                {text}
              </TypographyText>
            </span>
          );
        },
      },
      {
        title: '大小',
        dataIndex: 'size',
        width: 150,
      },
      {
        title: '所有者',
        dataIndex: 'owner',
        width: 300,
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
        width: 200,
      },
      {
        title: '',
        dataIndex: 'operate',
        render: (text, record) => (
          <Button icon={<IconDelete />} theme="borderless" onClick={() => removeRecord(record.key)} />
        ),
      },
    ];

    const empty = (
      <Empty image={<IllustrationNoResult />} darkModeImage={<IllustrationNoResultDark />} description={'搜索无结果'} />
    );

    return (
      <>
        <Button onClick={resetData} style={{ marginBottom: '10px' }}>
          重置
        </Button>
        <Table style={{ minHeight: '350px' }} columns={columns} dataSource={dataSource.value} pagination={false} empty={empty} />
      </>
    );
  };
});



export default TableDemo1;
