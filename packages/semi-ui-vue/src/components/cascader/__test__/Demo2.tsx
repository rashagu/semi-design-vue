import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import Cascader from '../index';

interface Demo2Props {
  name?: string;
}

export const vuePropsType: CombineProps<Demo2Props> = {
  name: String,
};
const Demo2 = defineComponent((props, {}) => {
  const slots = useSlots();


  return () => (

    <Cascader
      defaultValue={['zhejiang', 'ningbo', 'jiangbei']}
      style={{ width: '300px' }}
      treeData={[
        {
          label: '浙江省',
          value: 'zhejiang',
          children: [
            {
              label: '杭州市',
              value: 'hangzhou',
              children: [
                {
                  label: '西湖区',
                  value: 'xihu',
                },
                {
                  label: '萧山区',
                  value: 'xiaoshan',
                },
                {
                  label: '临安区',
                  value: 'linan',
                },
              ],
            },
            {
              label: '宁波市',
              value: 'ningbo',
              children: [
                {
                  label: '海曙区',
                  value: 'haishu',
                },
                {
                  label: '江北区',
                  value: 'jiangbei',
                }
              ]
            },
          ],
        }
      ]}
      placeholder="请选择所在地区_test0"
      multiple
    />
  );
}, {
  props: { ...vuePropsType },
  name: 'Demo2',
});


export default Demo2;

