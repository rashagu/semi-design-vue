import { defineComponent, ref, h, Fragment, useSlots, computed, onMounted } from 'vue';
import Table, {ColumnProps, RowSelection, TableColumn} from '../index';
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



const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: '12px' }}></Avatar>
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi Pro 设计稿',
        value: 'Semi Pro 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '大小',
    dataIndex: 'size',
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
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
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: value => {
      return dateFns.format(new Date(value), 'yyyy-MM-dd');
    },
  },
];

const getData = () => {
  const data = [];
  for (let i = 0; i < 46; i++) {
    const isSemiDesign = i % 2 === 0;
    const randomNumber = ((i * 1000) % 19) + 100;
    data.push({
      key: '' + i,
      name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
      owner: isSemiDesign ? '姜鹏志' : '郝宣',
      size: randomNumber,
      updateTime: new Date().valueOf() + randomNumber * DAY,
      avatarBg: isSemiDesign ? 'grey' : 'red',
    });
  }
  return data;
};

const data = getData();

export const vuePropsType = {
  name: String,
};
const TableDemo1 = defineComponent<TableDemo1Props>((props, {}) => {

  return () => {
    const rowKey = record =>
      `${record.owner && record.owner.toLowerCase()}-${record.name && record.name.toLowerCase()}`;

    return (
      <div style={{ padding: '20px 0px' }}>
        <Table
          dataSource={data}
          rowKey={rowKey}
          groupBy={'size'}
          columns={columns}
          renderGroupSection={groupKey => <strong>根据文件大小分组 {groupKey} KB</strong>}
          onGroupedRow={(group, index) => {
            return {
              // onMouseEnter: () => {
              //     console.log(`Grouped row mouse enter: `, group, index);
              // },
              // onMouseLeave: () => {
              //     console.log(`Grouped row mouse leave: `, group, index);
              // },
              onClick: e => {
                console.log(`Grouped row clicked: `, group, index);
              },
            };
          }}
          clickGroupedRowToExpand // if you want to click the entire row to expand
          scroll={{ y: 480 }}
        />
      </div>
    );
  };
});

TableDemo1.props = vuePropsType;
TableDemo1.name = 'TableDemo1';

export default TableDemo1;
