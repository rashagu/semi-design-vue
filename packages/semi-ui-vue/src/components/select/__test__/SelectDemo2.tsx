import { defineComponent, ref, h, Fragment, reactive, onMounted, createVNode, VNode } from 'vue';
import Select, { optionRenderProps, SelectOption, SelectOptionGroup } from '../index';
import Option from '../option';
import OptGroup from '../optionGroup';
import classNames from 'classnames';
import { IconGift, IconVigoLogo } from '@kousum/semi-icons-vue';
import { Form, FormSelect, FormSelectOption, FormSelectOptionGroup } from '../../form';

interface ExampleProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const SelectDemo2 = defineComponent<ExampleProps>((props, { slots }) => {
  let optionList = [
    { value: 'tony', label: 'Ironman' },
    { value: 'Thor', label: 'Thor' },
    { value: 'steve', label: 'Caption' },
    { value: 'peter', label: 'SpiderBoy' },
  ];
  const optionListRef = ref<{ value: string; label: VNode | string }[]>([
    { value: 'tony', label: 'Ironman' },
    { value: 'Thor', label: 'Thor' },
    { value: 'steve', label: 'Caption' },
    { value: 'peter', label: 'SpiderBoy' },
  ]);
  onMounted(() => {
    setTimeout(() => {
      optionListRef.value = [
        {
          value: 'tony',
          label: (
            <span style={{ color: 'red' }}>
              <span>tony</span>
            </span>
          ),
        },
        {
          value: 'Thor',
          label: (
            <span style={{ color: '#c300ff' }}>
              <span>Thor</span>
            </span>
          ),
        },
      ];
    }, 0);
  });
  const renderOptionItem = (renderProps: optionRenderProps) => {
    const { disabled, selected, label, value, focused, className, style, onMouseEnter, onClick, ...rest } = renderProps;

    const optionCls = classNames({
      ['custom-option-render']: true,
      ['custom-option-render-focused']: focused,
      ['custom-option-render-disabled']: disabled,
      ['custom-option-render-selected']: selected,
    });
    // Notice：
    // 1.props传入的style需在wrapper dom上进行消费，否则在虚拟化场景下会无法正常使用
    // 2.选中(selected)、聚焦(focused)、禁用(disabled)等状态的样式需自行加上，你可以从props中获取到相对的boolean值
    // 3.onMouseEnter需在wrapper dom上绑定，否则上下键盘操作时显示会有问题

    return (
      <div style={style} class={optionCls} onClick={(e) => onClick(e)} onMouseenter={(e) => onMouseEnter(e)}>
        <div class="option-right">{label}</div>
      </div>
    );
  };
  const list = [];
  const data = [
    {
      label: 'Asia',
      children: [
        { value: 'a-1', label: 'China' },
        { value: 'a-2', label: 'Koera' },
      ],
    },
    {
      label: 'Europe',
      children: [
        { value: 'b-1', label: 'Germany' },
        { value: 'b-2', label: 'France' },
      ],
    },
    {
      label: 'South America',
      children: [{ value: 'c-1', label: 'Peru' }],
    },
  ];

  let innerSlotStyle = {
    backgroundColor: 'var(--color-white)',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    paddingLeft: '32px',
    borderTop: '1px solid var(--semi-color-border)',
    borderRadius: '0 0 6px 6px',
    color: 'var(--semi-color-link)',
  };
  let innerSlotNode = <div style={innerSlotStyle}>点击加载更多</div>;
  let outSlotStyle = {
    backgroundColor: 'var(--semi-color-fill-0)',
    height: '36px',
    display: 'flex',
    paddingLeft: '32px',
    color: 'var(--semi-color-link)',
    alignItems: 'center',
    cursor: 'pointer',
    borderTop: '1px solid var(--semi-color-border)',
    borderRadius: '0 0 6px 6px',
  };
  let outSlotNode = (
    <div style={outSlotStyle}>
      <span style={{ color: 'var(--semi-color-link)' }}>未找到应用?</span>
    </div>
  );
  let newOptions = Array.from({ length: 3000 }, (v, i) => ({ label: `option-${i}`, value: i }));
  let newOptions2 = Array.from({ length: 30 }, (v, i) => ({ label: `option-${i}`, value: i }));
  const state = reactive({
    optionList: newOptions,
    optionList2: newOptions2,
  });

  const dd = ref();
  function onChange(v) {
    console.log(v);
    dd.value = v;
  }
  return () => {
    let { optionList, optionList2 } = state;
    let virtualize = {
      height: 270,
      width: '100%',
      itemSize: 36, // px
    };
    function handleSearch() {}

    return (
      <div>
        <div>
          <Form>
            <FormSelect field="sss" style={{ width: '300px' }} placeholder="带搜索功能的多选"
                        virtualize={{
                          height: 270,
                          width: '100%',
                          itemSize: 36 // px
                        }}>
              <FormSelectOptionGroup label="Asia">
                {['s', 'ss'].map((item) => {
                  return (
                    <FormSelectOption value={item} key={item}>
                      {item}
                    </FormSelectOption>
                  );
                })}
              </FormSelectOptionGroup>
              <FormSelectOptionGroup label="Europe">
                <FormSelectOption value="b-1">Germany</FormSelectOption>
                <FormSelectOption value="b-2">France</FormSelectOption>
              </FormSelectOptionGroup>
              <FormSelectOptionGroup label="South America">
                <FormSelectOption value="c-1">Peru</FormSelectOption>
              </FormSelectOptionGroup>
            </FormSelect>
          </Form>
        </div>
      </div>
    );
  };
});

export default SelectDemo2;
