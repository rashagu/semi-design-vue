import { defineComponent, ref, h, Fragment, reactive, onMounted, createVNode, VNode } from 'vue';
import Select, { optionRenderProps } from '../index';
import Option from '../option';
import OptGroup from '../optionGroup';
import classNames from 'classnames';
import { IconGift, IconVigoLogo } from '@kousum/semi-icons-vue';
import { Form, FormSelect } from '../../form';

interface ExampleProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const SelectDemo = defineComponent((props, { slots }) => {
  return () => {
    return (
      <Select placeholder="test" multiple style={{}}>
        <Option value="abc"><span data-testid={'a001'}>抖音</span></Option>
        <Option value="hotsoon">火山</Option>
        <Option value="jianying" disabled>
          剪映
        </Option>
        <Option value="xigua">西瓜视频</Option>
      </Select>
    );
  };
});

export default SelectDemo;
