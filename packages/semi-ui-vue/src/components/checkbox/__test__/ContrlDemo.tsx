import { defineComponent, ref, h, Fragment, useSlots, reactive } from 'vue';
import { Button, Checkbox } from '../../index';

interface ContrlDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const ContrlDemo = defineComponent((props, {}) => {
  const slots = useSlots();

  const state = reactive({
    checked: true,
    disabled: false,
  });

  function toggleChecked() {
    state.checked = !state.checked;
  }

  function toggleDisable() {
    state.disabled = !state.disabled;
  }

  function onChange(e) {
    console.trace('checked = ', e.target.checked);
    state.checked = e.target.checked;
  }

  return () => {
    const label = `${state.checked ? 'Checked' : 'Unchecked'} ${state.disabled ? 'Disabled' : 'Enabled'}`;

    return (
      <div>
        <div>
          <p style={{ marginBottom: '20px' }}>
            <Checkbox checked={state.checked} disabled={state.disabled} onChange={onChange} aria-label="Checkbox 示例">
              {label}
            </Checkbox>
          </p>
          <p>
            <Button type="primary" size="small" onClick={toggleChecked}>
              {!state.checked ? 'Check' : 'Uncheck'}
            </Button>
            <Button style={{ marginLeft: '10px' }} type="primary" size="small" onClick={toggleDisable}>
              {!state.disabled ? 'Disable' : 'Enable'}
            </Button>
          </p>
        </div>
      </div>
    );
  };
});


export default ContrlDemo;
