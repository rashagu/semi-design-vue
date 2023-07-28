import { defineComponent, ref, h, Fragment, useSlots, computed, onMounted } from 'vue';
import {TableMaker, ColumnProps, RowSelection, TableColumn} from '../index';
import Avatar from '../../avatar';
import { IconMore } from '@kousum/semi-icons-vue';
import { IllustrationNoResult, IllustrationNoResultDark } from '@kousum/semi-illustrations-vue';
import { Button, Empty } from '../../index';
import { IconDelete } from '@kousum/semi-icons-vue';
import { TypographyText } from '../../typography';
import * as dateFns from 'date-fns';

interface TableDemo1Props {
  name?: string;
}



export const vuePropsType = {
  name: String,
};
interface ColType {owner: string, size: number, name: string, avatarBg: string, updateTime: number, key: string}
const Table = TableMaker<ColType>();
const TableDemo1 = defineComponent<TableDemo1Props>((props, {}) => {

  const DAY = 24 * 60 * 60 * 1000;
  const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

  const columns:ColumnProps<ColType>[] = [
    {
      title: '标题',
      dataIndex: 'name',
      fixed: true,
      width: 250,
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
      width: 200,
      sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
      render: text => `${text} KB`,
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      width: 200,
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg as any} style={{ marginRight: '4px' }}>
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
      sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
      render: value => {
        return dateFns.format(new Date(value), 'yyyy-MM-dd');
      },
    },
    {
      title: '',
      dataIndex: 'operate',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: () => {
        return <IconMore />;
      },
    },
  ];


  const dataSource = ref([]);

  const scroll = computed(() => ({ y: 300, x: 1200 }));
  const rowSelection = computed<RowSelection<ColType>>(
    () => ({
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Michael James', // Column configuration not to be checked
        name: record.name,
      }),
      fixed: true,
    })
  );

  const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
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

  onMounted(()=>{
    const data = getData();
    dataSource.value = data
  })

  return () => {
    return <div style={{width:'1000px'}}>
      <Table columns={columns} dataSource={dataSource.value} rowSelection={rowSelection.value} scroll={scroll.value} />
    </div>;
  };
});




export default TableDemo1;
