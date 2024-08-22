
import { defineComponent, ref } from 'vue';
import { Checkbox } from '../../checkbox';
import Highlight from '../../highlight'
import Select from '../index';

function classNames(obj) {
  return Object.keys(obj).filter(className => obj[className]).join(' ');
}


const Comp = defineComponent(() => {
  const inputValue = ref('');
  const renderOptionItem = renderProps => {
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
      empty,
      emptyContent,
      ...rest
    } = renderProps;
    const optionCls = classNames({
      ['custom-option-render']: true,
      ['custom-option-render-focused']: focused,
      ['custom-option-render-disabled']: disabled,
      ['custom-option-render-selected']: selected,
    });
    const searchWords = [inputValue.value];

    // Notice：
    // 1.props传入的style需在wrapper dom上进行消费，否则在虚拟化场景下会无法正常使用
    // 2.选中(selected)、聚焦(focused)、禁用(disabled)等状态的样式需自行加上，你可以从props中获取到相对的boolean值
    // 3.onMouseEnter需在wrapper dom上绑定，否则上下键盘操作时显示会有问题

    console.log(renderProps)
    return (
      <div style={style} clas={optionCls} onClick={() => onClick()} onMouseenter={e => onMouseEnter()}>
        <Checkbox checked={selected} />
        <div class="option-right">
          <Highlight sourceString={label} searchWords={searchWords} />
        </div>
      </div>
    );
  };

  const optionList = [
    { value: 'abc', label: '抖音', otherKey: 0 },
    { value: 'ulikecam', label: '轻颜相机', disabled: true, otherKey: 1 },
    { value: 'jianying', label: '剪映', otherKey: 2 },
    { value: 'toutiao', label: '今日头条', otherKey: 3 },
  ];

  return () => (
    <>
      <Select
        filter
        placeholder="单选"
        onSearch={(v) => inputValue.value = v}
        dropdownClassName="components-select-demo-renderOptionItem"
        optionList={optionList}
        style={{ width: '180px' }}
        renderOptionItem={renderOptionItem}
      />
      <br />
      <br />
      <Select
        filter
        placeholder="多选"
        multiple
        onSearch={(v) => inputValue.value = v}
        dropdownClassName="components-select-demo-renderOptionItem"
        optionList={optionList}
        style={{ width: '320px' }}
        renderOptionItem={renderOptionItem}
      />
    </>
  );
})
export default Comp
