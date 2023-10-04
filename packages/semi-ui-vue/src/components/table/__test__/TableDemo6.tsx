import { defineComponent, ref, h, Fragment, useSlots, computed, onMounted } from 'vue';
import {TableMaker, RowSelection, TableColumn } from '../index';
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

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';
const pageSize = 5;

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
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: text => `${text} KB`,
  },
  {
    title: '所有者',
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

const getData = () => {
  const data = [];
  for (let i = 0; i < 46; i++) {
    const isSemiDesign = i % 2 === 0;
    const randomNumber = (i * 1000) % 199;
    let a = {
      key: '' + i,
      name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
      owner: isSemiDesign ? '姜鹏志' : '郝宣',
      size: randomNumber,
      updateTime: new Date().valueOf() + randomNumber * DAY,
      avatarBg: isSemiDesign ? 'grey' : 'red',
    };
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
interface ColType {
  owner: string;
  size: number;
  name: string;
  avatarBg: string;
  updateTime: number;
  key: string;
}
const Table = TableMaker<ColType>();
const TableDemo1 = defineComponent<TableDemo1Props>((props, {}) => {
  const dataSource = ref<ColType[]>([]);
  const loading = ref(false);
  const currentPage = ref(1);

  const fetchData = (currentPage_ = 1) => {
    loading.value = true;
    currentPage.value = currentPage_;
    return new Promise((res, rej) => {
      setTimeout(() => {
        const data = getData();
        let dataSource = data.slice((currentPage_ - 1) * pageSize, currentPage_ * pageSize);
        res(dataSource);
      }, 300);
    }).then(dataSource_ => {
      loading.value = false;
      dataSource.value = dataSource_ as any;
    });
  };

  const handlePageChange = page => {
    fetchData(page);
  };

  onMounted(() => {
    fetchData();
  });

  const rowSelection: RowSelection<ColType> = {
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
        columns={columns}
        dataSource={dataSource.value}
        pagination={{
          currentPage: currentPage.value,
          pageSize: 5,
          total: data.length,
          onPageChange: handlePageChange,
        }}
        rowSelection={rowSelection}
        loading={loading.value}
      />
    );
  };
});



export default TableDemo1;
