import {defineComponent, ref, h, Fragment, reactive} from 'vue'
import Select, {optionRenderProps} from '../index'
import Option from '../option'
import OptGroup from '../optionGroup'
import classNames from "classnames";
import {IconGift, IconVigoLogo} from "@kousum/semi-icons-vue";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const SelectDemo = defineComponent<ExampleProps>((props, {slots}) => {

  let optionList = [
    { value: 'tony', label: 'Ironman' },
    { value: 'Thor', label: 'Thor' },
    { value: 'steve', label: 'Caption' },
    { value: 'peter', label: 'SpiderBoy' },
  ];
  const renderOptionItem = (renderProps: optionRenderProps) => {
    const {
      disabled,
      selected,
      label,
      value,
      focused,
      className,
      style,
      onMouseEnter,
      onClick,
      ...rest
    } = renderProps;

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
      <div style={style} class={optionCls} onClick={(e) => onClick(e)} onMouseenter={e => onMouseEnter(e)}>
        <div class="option-right">{label}</div>
      </div>
    );
  };
  const list = [
    { value: 'abc', label: '抖音', otherKey:0 },
    { value: 'hotsoon', label: '火山小视频', disabled: true, otherKey: 1 },
    { value: 'jianying', label: '剪映', otherKey: 2 },
    { value: 'toutiao', label: '今日头条', otherKey: 3 },
  ];
  const data = [
    {
      label: 'Asia',
      children: [
        { value: 'a-1', label: 'China' },
        { value: 'a-2', label: 'Koera' },
      ]
    },
    {
      label: 'Europe',
      children: [
        { value: 'b-1', label: 'Germany' },
        { value: 'b-2', label: 'France' },
      ]
    },
    {
      label: 'South America',
      children: [
        { value: 'c-1', label: 'Peru' },
      ]
    }
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
  let innerSlotNode = (<div style={innerSlotStyle}>
    点击加载更多
  </div>);
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
  let outSlotNode = (<div style={outSlotStyle}>
    <span style={{color: 'var(--semi-color-link)'}}>未找到应用?</span>
  </div>);
  let newOptions = Array.from({ length: 3000 }, (v, i) => ({ label: `option-${i}`, value: i }));
  let newOptions2 = Array.from({ length: 30 }, (v, i) => ({ label: `option-${i}`, value: i }));
  const state = reactive({
    optionList: newOptions,
    optionList2: newOptions2,
  });
  return () => {
    let { optionList, optionList2 } = state;
    let virtualize = {
      height: 300,
      width: '100%',
      itemSize: 36, // px
    };
    function handleSearch() {

    }
    return (
      <div>
        <div>
          <Select
            placeholder="拥有3k个Option的Select 虚拟滚动"
            style={{ width: '260px' }}
            filter
            onSearch={handleSearch}
            virtualize={virtualize}
            optionList={optionList}
          ></Select>
        </div>
        <Select
          placeholder={'请选择'}
          filter
          dropdownClassName="components-select-demo-renderOptionItem"
          optionList={optionList2}
          onChange={(v)=>console.log(v)}
          style={{ width: '300px' }}
          renderOptionItem={renderOptionItem}
        />

        <Select defaultValue='abc' style={{ width: 120 }}>
          <Option value='abc'>抖音</Option>
          <Option value='hotsoon'>火山</Option>
          <Option value='jianying' disabled>剪映</Option>
          <Option value='xigua'>西瓜视频</Option>
        </Select>
        <br/><br/>
        <Select defaultValue='abc' disabled style={{ width: 120 }}>
          <Option value='abc'>抖音</Option>
          <Option value='hotsoon'>火山</Option>
        </Select>
        <br/><br/>
        <Select placeholder='请选择业务线' style={{ width: 120 }}>
          <Option value='abc'>抖音</Option>
          <Option value='hotsoon'>火山</Option>
          <Option value='jianying' disabled>剪映</Option>
          <Option value='xigua'>西瓜视频</Option>
        </Select>
        <Select placeholder='请选择业务线' style={{ width: 180 }} optionList={list}>
        </Select>
        <Select multiple style={{ width: '320px' }} defaultValue={['abc','hotsoon']}>
          <Option value='abc'>抖音</Option>
          <Option value='hotsoon'>火山</Option>
          <Option value='jianying'>剪映</Option>
          <Option value='xigua'>西瓜视频</Option>
        </Select>
        <br/><br/>
        <Select multiple style={{ width: '320px' }} defaultValue={['abc','hotsoon', 'jianying']} maxTagCount={2}>
          <Option value='abc'>抖音</Option>
          <Option value='hotsoon'>火山</Option>
          <Option value='jianying'>剪映</Option>
          <Option value='xigua'>西瓜视频</Option>
        </Select>

        <br/><br/>
        <Select multiple style={{ width: '320px' }} defaultValue={['abc']} max={2}>
          <Option value='abc'>抖音</Option>
          <Option value='hotsoon'>火山</Option>
          <Option value='jianying'>剪映</Option>
          <Option value='xigua'>西瓜视频</Option>
        </Select>

        <div>
          <Select placeholder="" style={{ width: '180px' }} filter>
            <OptGroup label="Asia">
              <Option value="a-1">China</Option>
              <Option value="a-2">Koera</Option>
            </OptGroup>
            <OptGroup label="Europe">
              <Option value="b-1">Germany</Option>
              <Option value="b-2">France</Option>
            </OptGroup>
            <OptGroup label="South America">
              <Option value="c-1">Peru</Option>
            </OptGroup>
          </Select>
        </div>
        <div>
          <Select placeholder="" style={{ width: '180px' }} filter>
            {
              data.map((group, index) => (
                <OptGroup label={group.label} key={`${index}-${group.label}`}>
                  {
                    group.children.map((option, index2) => (
                      <Option value={option.value} key={`${index2}-${group.label}`}>
                        {option.label}
                      </Option>
                    ))
                  }
                </OptGroup>
              ))
            }
          </Select>
        </div>
        <div>
          <div>不同尺寸</div>
          <Select placeholder='请选择业务线' style={{ width: '180px' }} size='small'>
            <Option value='hotsoon'>火山</Option>
          </Select>
          <br/><br/>
          <Select placeholder='请选择业务线' style={{ width: '180px' }}>
            <Option value='hotsoon'>火山</Option>
          </Select>
          <br/><br/>
          <Select placeholder='请选择业务线' style={{ width: '180px' }} size='large'>
            <Option value='hotsoon'>火山</Option>
          </Select>
        </div>

        <div>
          <Select style={{ width: '180px' }}>
            <Option value='hotsoon'>火山</Option>
          </Select>
          <br/><br/>
          <Select style={{ width: '180px' }} validateStatus='warning'>
            <Option value='hotsoon'>火山</Option>
          </Select>
          <br/><br/>
          <Select style={{ width: '180px' }} validateStatus='error'>
            <Option value='hotsoon'>火山</Option>
          </Select>
        </div>

        <div>
          <Select
            style={{ width: '320px' }}
            defaultValue={'hotsoon'}
            prefix={<IconVigoLogo />}
            showClear={true}
          >
            <Option value='abc'>抖音</Option>
            <Option value='hotsoon'>火山</Option>
            <Option value='jianying'>剪映</Option>
            <Option value='xigua'>西瓜视频</Option>
          </Select>
          <br/><br/>
          <Select
            style={{ width: '320px' }}
            defaultValue={'hotsoon'}
            prefix={<IconVigoLogo />}
            suffix={<IconGift />}
            showArrow={false}
          >
            <Option value='abc'>抖音</Option>
            <Option value='hotsoon'>火山</Option>
            <Option value='jianying'>剪映</Option>
            <Option value='xigua'>西瓜视频</Option>
          </Select>
        </div>

        <div>
          <Select style={{ width: '300px' }} optionList={list} insetLabel='业务线' defaultValue='abc'>
          </Select>
          <br/><br/>
          <Select
            style={{ width: '300px' }}
            optionList={list} placeholder='请选择业务线'
            insetLabel={<span style={{marginRight: 0, marginLeft: '10px', color: "var(--semi-color-text-2)"}}>业务线</span>}>
          </Select>
        </div>



        <div>
          <p>outerBottomSlot:</p>
          <Select
            style={{ width: '300px' }}
            dropdownStyle={{ width: '180px' }}
            maxHeight={150}
            outerBottomSlot={outSlotNode}
            placeholder='自定义外侧底部slot，始终显示'
            defaultOpen
            autoAdjustOverflow={false}
            position='bottom'
          >
            <Option value='abc'>抖音</Option>
            <Option value='hotsoon'>火山</Option>
            <Option value='jianying'>剪映</Option>
            <Option value='duoshan'>多闪</Option>
            <Option value='xigua'>西瓜视频</Option>
          </Select>
          <p style={{ marginTop: '200px' }}>innerBottomSlot:</p>
          <Select
            style={{ width: '300px' }}
            dropdownStyle={{ width: '180px' }}
            maxHeight={150}
            innerBottomSlot={innerSlotNode}
            placeholder='自定义内侧底部slot，滚动至底部显示'
          >
            <Option value='abc'>抖音</Option>
            <Option value='hotsoon'>火山</Option>
            <Option value='jianying'>剪映</Option>
            <Option value='duoshan'>多闪</Option>
            <Option value='xigua'>西瓜视频</Option>
          </Select>
        </div>


        <div>
          <p>搜索</p>
          <Select filter style={{ width: '180px' }} placeholder='带搜索功能的单选'>
            <Option value='abc'>抖音</Option>
            <Option value='hotsoon'>火山</Option>
            <Option value='jianying'>剪映</Option>
            <Option value='xigua'>西瓜视频</Option>
          </Select>
          <br/><br/>
          <Select filter multiple style={{ width: '300px' }} placeholder='带搜索功能的多选' autoClearSearchValue={false}>
            <Option value='semi-0'>Semi-0</Option>
            <Option value='semi-1'>Semi-1</Option>
            <Option value='semi-2'>Semi-2</Option>
            <Option value='semi-3'>Semi-3</Option>
            <Option value='semi-4'>Semi-4</Option>
          </Select>
        </div>
      </div>
    )
  }
})


export default SelectDemo

