import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import {Button} from "../../index";
import SideSheet from "../index";
import RadioGroup from "../../radio/radioGroup";
import {Radio} from "../../radio";

interface SideSheetDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const SideSheetDemo = defineComponent<SideSheetDemoProps>((props, {}) => {
  const slots = useSlots()

  const visible = ref(false);
  const change = () => {
    visible.value = !visible.value
  };

  const placement = ref<"right" | "bottom" | "left" | "top">('right');
  const changePlacement = e => {
    placement.value = e.target.value
  };


  const visible2 = ref(false);
  const value = ref('');
  const getContainer = (): HTMLElement => {
    return document.querySelector('.sidesheet-container');
  };
  return () => (
    <div>
      <RadioGroup onChange={changePlacement} value={placement.value}>
        <Radio value={'right'}>right</Radio>
        <Radio value={'left'}>left</Radio>
        <Radio value={'top'}>top</Radio>
        <Radio value={'bottom'}>bottom</Radio>
      </RadioGroup>
      <br />
      <br />
      <Button onClick={change}>Open SideSheet</Button>
      <SideSheet title="滑动侧边栏" visible={visible.value} onCancel={change} placement={placement.value}
                 mask={false}
                 disableScroll={false}
      >
        <p>This is the content of a basic sidesheet.</p>
        <p>Here is more content...</p>
      </SideSheet>

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
        <Button onClick={() => visible2.value = true}>Open SideSheet</Button>
        <SideSheet
          title="渲染在指定容器内部"
          visible={visible2.value}
          onCancel={() => visible2.value = false}
          width={220}
          getPopupContainer={getContainer}
        >
          <p>This is the content of a basic sidesheet.</p>
          <p>Here is more content...</p>
        </SideSheet>
      </div>
    </div>
  )
})



export default SideSheetDemo

