import { defineComponent, ref, h, Fragment, useSlots, reactive } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { Form, FormInput } from '../../form';
import {
  AutoCompleteVModel,
  CascaderVModel,
  CheckboxGroupVModel,
  DatePickerVModel,
  InputNumberVModel,
  InputVModel,
  RadioGroupVModel,
  RatingVModel,
  SelectVModel,
  SliderVModel,
  SwitchVModel,
  TagInputVModel,
  TimePickerVModel, TransferVModel, TreeSelectVModel, UploadVModel,
} from '../index';
import { Radio } from '../../radio';
import { SelectOption } from '../../select';
import { Button, TimePicker } from '../../index';
import { IconUpload } from '@kousum/semi-icons-vue';

interface WithVModelDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<WithVModelDemoProps> = {
  name: String,
};
const WithVModelDemo = defineComponent((props, {}) => {
  const slots = useSlots();


  const data = reactive({
    a: '2023-12-12',
    b: 2,
    c: ['抖音'],
    d: 'abc',
    e: 40,
    f: true,
    g: '04:05:03',
    h: [],
    i: undefined,
    j: [
      {
        uid: '1',
        name: 'dyBag.jpeg',
        status: 'success',
        size: '130KB',
        preview: true,
        url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/edit-bag.jpeg',
      },
      {
        uid: '2',
        name: 'dy.jpeg',
        status: 'uploading',
        size: '222KB',
        percent: 50,
        preview: true,
        fileInstance: new File([new ArrayBuffer(2048)], 'dy.jpeg', { type: 'image/jpeg' }),
        url:
          'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png',
      },
    ]
  })
  const plainOptions = ['抖音', '火山', '皮皮虾'];

  const dataSource = Array.from({ length: 100 }, (v, i) => {
    return {
      label: `选项名称 ${i}`,
      value: i,
      disabled: false,
      key: i,
    };
  });

  const treeData = [
    {
      label: '亚洲',
      value: 'Asia',
      key: '0',
      children: [
        {
          label: '中国',
          value: 'China',
          key: '0-0',
          children: [
            {
              label: '北京',
              value: 'Beijing',
              key: '0-0-0',
            },
            {
              label: '上海',
              value: 'Shanghai',
              key: '0-0-1',
            },
          ],
        },
      ],
    },
    {
      label: '北美洲',
      value: 'North America',
      key: '1',
    }
  ];
  return () => (
    <div>
      {JSON.stringify(data)}

      <InputVModel v-model={data.a}/>
      <AutoCompleteVModel v-model={data.a}/>
      <CascaderVModel v-model={data.a}/>
      <CheckboxGroupVModel options={plainOptions} v-model={data.c} aria-label="CheckboxGroup 示例" />
      <DatePickerVModel v-model={data.a}/>
      <InputNumberVModel v-model={data.b}/>
      <RadioGroupVModel v-model={data.b} direction="vertical" aria-label="单选组合示例" name="demo-radio-group-vertical">
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroupVModel>
      <RatingVModel v-model={data.b}/>
      <SelectVModel v-model={data.d} style={{ width: '120px' }}>
        <SelectOption value="abc">抖音</SelectOption>
        <SelectOption value="ulikecam">轻颜相机</SelectOption>
      </SelectVModel>
      <SliderVModel v-model={data.e} ></SliderVModel>

      <SwitchVModel v-model={data.f} aria-label="a switch for demo"></SwitchVModel>
      <TagInputVModel
        v-model={data.c}
        placeholder='请输入...'
      />
      <TimePickerVModel v-model={data.g} />


      <TransferVModel
        style={{ width: '568px', height: '416px' }}
        dataSource={dataSource}
        v-model={data.h}
      />

      <TreeSelectVModel
        style={{ width: '300px' }}
        dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
        treeData={treeData}
        placeholder="请选择"
        v-model={data.i}
      />

      <UploadVModel
        action="https://api.semi.design/upload"
        showRetry={false}
        v-model={data.j}
      >
        <Button icon={<IconUpload />} theme="light">
          点击上传
        </Button>
      </UploadVModel>
    </div>
  );
}, {
  props: vuePropsType,
  name: 'WithVModelDemo',
});


export default WithVModelDemo;

