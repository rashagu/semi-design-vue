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



export const vuePropsType = {
  name: String,
};
const TableDemo1 = defineComponent<TableDemo1Props>((props, {}) => {
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
            <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: 12 }}></Avatar>
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
      width: 200,
      sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
      render: text => `${text} KB`,
    },
    {
      title: '所有者',
      width: 200,
      dataIndex: 'owner',
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
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

  const data = computed(() => {
    const _data = [];
    for (let i = 0; i < 46; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      _data.push({
        key: '' + i,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return _data;
  });

  return () => {
    return <Table columns={columns} dataSource={data.value} resizable bordered />;
  };
});




export default TableDemo1;
