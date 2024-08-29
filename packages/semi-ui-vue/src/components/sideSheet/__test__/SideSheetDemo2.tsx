
import { defineComponent, ref } from 'vue';
import Button from '../../button';
import SideSheet from '../index';

const Demo = defineComponent(() => {
  const visible = ref(false);
  const value = ref('');
  const getContainer = () => {
    return document.querySelector('.sidesheet-container');
  };
  return () => (
    <div
      style={{
        height: '320px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid var(--semi-color-border)',
        borderRadius: '2px',
        padding: '24px',
        textAlign: 'center',
        background: 'var(--semi-color-fill-0)',
      }}
      class="sidesheet-container"
    >
      <span>Render in this</span>
      <br />
      <br />
      <Button onClick={() => visible.value = (true)}>Open SideSheet</Button>
      <SideSheet
        title="渲染在指定容器内部"
        visible={visible.value}
        onCancel={() => visible.value = (false)}
        width={220}
        getPopupContainer={getContainer}
      >
        <p>This is the content of a basic sidesheet.</p>
        <p>Here is more content...</p>
      </SideSheet>
    </div>
  );
})
export default Demo;
