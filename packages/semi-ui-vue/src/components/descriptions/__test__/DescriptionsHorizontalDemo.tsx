import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import Tag from '../../tag';
import Descriptions from '../index';
import { IconArrowUp } from '@kousum/semi-icons-vue';
import DescriptionsItem from "../item";
import Space from '../../space';

interface DescriptionsDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const DescriptionsHorizontalDemo = defineComponent((props, {}) => {
  const slots = useSlots();

  const data = [
    { key: '抖音号', value: 'SemiDesign' },
    { key: '主播类型', value: '自由主播' },
    { key: '安全等级', value: '3级' },
    { key: '垂类标签', value: <Space>
        <Tag size="small" shape='circle' color='amber'>互联网资讯</Tag>
        <Tag size="small" shape='circle' color='violet'>编程</Tag>
      </Space>, span: 4
    },
    { key: '作品数量', value: '88888888', span: 2 },
    { key: '认证状态', value: '这是一个很长很长很长很长很长很长很长很长很长的值' },
  ];
  return ()=>(
    <>
      {/*<Descriptions layout='horizontal' data={data} column={5} />*/}
      <Descriptions layout='horizontal' align='center' column={4}>
        {data.map((item, index)=>{
          return <DescriptionsItem itemKey={item.key} span={item.span}>{item.value}</DescriptionsItem>
        })}
      </Descriptions>
    </>
  );
});



export default DescriptionsHorizontalDemo;
