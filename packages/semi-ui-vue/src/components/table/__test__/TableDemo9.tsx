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
const Table = TableMaker();
const TableDemo1 = defineComponent<TableDemo1Props>((props, {}) => {
  const columns = [
    {
      title: 'Key',
      dataIndex: 'dataKey',
      key: 'dataKey',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      width: 400,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '默认值',
      dataIndex: 'default',
      key: 'default',
      width: 100,
    },
  ];
  const data = [
    {
      key: 1,
      dataKey: 'videos_info',
      name: '视频信息',
      type: 'Object 对象',
      description: '视频的元信息',
      default: '无',
      children: [
        {
          key: 11,
          dataKey: 'status',
          name: '视频状态',
          type: 'Enum <Integer> 枚举',
          description: '视频的可见、推荐状态',
          default: '1',
        },
        {
          key: 12,
          dataKey: 'vid',
          name: '视频 ID',
          type: 'String 字符串',
          description: '标识视频的唯一 ID',
          default: '无',
          children: [
            {
              dataKey: 'video_url',
              name: '视频地址',
              type: 'String 字符串',
              description: '视频的唯一链接',
              default: '无',
            },
          ],
        },
      ],
    },
    {
      key: 2,
      dataKey: 'text_info',
      name: '文本信息',
      type: 'Object 对象',
      description: '视频的元信息',
      default: '无',
      children: [
        {
          key: 21,
          dataKey: 'title',
          name: '视频标题',
          type: 'String 字符串',
          description: '视频的标题',
          default: '无',
        },
        {
          key: 22,
          dataKey: 'video_description',
          name: '视频描述',
          type: 'String 字符串',
          description: '视频的描述',
          default: '无',
        },
      ],
    },
  ];
  return () => {
    return <Table columns={columns} defaultExpandAllRows dataSource={data} />;
  };
});



export default TableDemo1;
