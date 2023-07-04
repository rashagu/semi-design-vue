import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import Tag from '../../tag';
import Descriptions from '../index';
import { IconArrowUp } from '@kousum/semi-icons-vue';
import DescriptionsItem from "../item";

interface DescriptionsDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const DescriptionsDemo = defineComponent<DescriptionsDemoProps>((props, {}) => {
  const slots = useSlots();

  const data0 = [
    { key: '实际用户数量', value: '1,480,000' },
    { key: '7天留存', value: '98%' },
    { key: '安全等级', value: '3级' },
    { key: '垂类标签', value: <Tag style={{ margin: 0 }}>电商</Tag> },
    { key: '认证状态', value: '未认证' },
  ];

  const data = [
    { key: '实际用户数量', value: '1,480,000' },
    { key: '7天留存', value: '98%' },
    { key: '安全等级', value: '3级' },
    { key: '垂类标签', value: <Tag style={{ margin: 0 }}>电商</Tag> },
    { key: '认证状态', value: '未认证' },
  ];
  const style = {
    boxShadow: 'var(--semi-shadow-elevated)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '4px',
    padding: '10px',
    margin: '10px',
    width: '200px',
  };

  const data1 = [
    { key: '实际用户数量', value: '1,480,000' },
    {
      key: '7天留存',
      value: (
        <span>
          98%
          <IconArrowUp size="small" style={{ color: 'red', marginLeft: '4px' }} />
        </span>
      ),
    },
    { key: '安全等级', value: '3级' },
  ];
  const style1 = {
    boxShadow: 'var(--semi-shadow-elevated)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '4px',
    padding: '10px',
    marginRight: '20px',
    width: '600px',
  };

  return () => {
    return (
      <div>
        <Descriptions data={data0} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Descriptions align="center" data={data} style={style} />
          <Descriptions align="justify" data={data} style={style} />
          <Descriptions align="left" data={data} style={style} />
          <Descriptions align="plain" data={data} style={style} />
        </div>
        <div>
          <Descriptions data={data1} row size="small" style={style1} />
          <br />
          <Descriptions data={data1} row style={style1} />
          <br />
          <Descriptions data={data1} row size="large" style={style1} />
        </div>
        <div>
          <Descriptions>
            <DescriptionsItem itemKey="实际用户数量">1,480,000</DescriptionsItem>
            <DescriptionsItem itemKey="7天留存">98%</DescriptionsItem>
            <DescriptionsItem itemKey="安全等级">3级</DescriptionsItem>
            <DescriptionsItem itemKey="垂类标签">电商</DescriptionsItem>
            <DescriptionsItem itemKey="认证状态">未认证</DescriptionsItem>
          </Descriptions>
        </div>
      </div>
    );
  };
});



export default DescriptionsDemo;
