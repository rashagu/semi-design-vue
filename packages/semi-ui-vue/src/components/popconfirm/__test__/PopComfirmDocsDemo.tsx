
import { Popconfirm, Radio, RadioGroup, Button } from '@kousum/semi-ui-vue';
import { IconAlertTriangle } from '@kousum/semi-icons-vue';
import { defineComponent, ref } from 'vue';


const TypesConfirmDemo = defineComponent(() => {

  const typeMap = {
    default: {
      icon: <IconAlertTriangle size="extra-large" />,
    },
    warning: {
      icon: <IconAlertTriangle style={{ color: 'var(--semi-color-warning)' }} size="extra-large" />,
    },
    danger: {
      okType: 'danger',
      icon: <IconAlertTriangle style={{ color: 'var(--semi-color-danger)' }} size="extra-large" />,
    },
    tertiary: {
      icon: <IconAlertTriangle style={{ color: 'var(--semi-color-tertiary)' }} size="extra-large" />,
    },
  };

  const keys = Object.keys(typeMap);
  const type = ref('default');
  const visible = ref(true);

  const changeType = e => {
    const type_ = e && e.target && e.target.value;
    if (type_ && keys.includes(type_)) {
      type.value = (type_);
    }
  };

  const setVisible = v => visible.value = (v);
  const toggleVisible = () => setVisible(!visible.value);

  return () => (
    <div>
      <RadioGroup type="button" onChange={changeType} value={type.value} style={{ marginTop: '14px', marginBottom: '14px' }}>
        {keys.map(key => (
          <Radio key={key} value={key}>
            <span style={{ color: `var(--semi-color-${key === 'default' ? 'primary' : key})` }}>{key}</span>
          </Radio>
        ))}
      </RadioGroup>
      <div>
        <Popconfirm
          {...typeMap[type.value]}
          visible={visible.value}
          onVisibleChange={setVisible}
          trigger="custom"
          title="确定是否要保存此修改？"
          content="此修改将不可逆"
        >
          <Button onClick={toggleVisible}>点击此处</Button>
        </Popconfirm>
      </div>
    </div>
  );
})

export default TypesConfirmDemo
