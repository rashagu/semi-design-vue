import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Switch from "../index";
import Space from "../../space";

interface SwitchDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const SwitchDemo = defineComponent<SwitchDemoProps>((props, {}) => {

  const slots = useSlots()

  return () => (
    <div>
      <Switch checkedText="开" uncheckedText="关" />
      <Switch checkedText="｜" uncheckedText="〇" style={{ marginLeft: 5 }} />
      <br />
      <br />
      <Switch defaultChecked checkedText="开" uncheckedText="关" />
      <Switch defaultChecked checkedText="｜" uncheckedText="〇" style={{ marginLeft: 5 }} />
      <br />
      <br />
      <Switch checkedText="开" uncheckedText="关" size="large" />
      <Switch checkedText="｜" uncheckedText="〇" size="large" style={{ marginLeft: 5 }} />
      <br />
      <br />
      <Switch defaultChecked checkedText="开" uncheckedText="关" size="large" />
      <Switch defaultChecked checkedText="｜" uncheckedText="〇" size="large" style={{ marginLeft: 5 }} />
      <div>
        <Space style={{ marginBottom: 10, display: 'block' }}>
          <Switch size="small" aria-label="a switch for demo"></Switch>
          <Switch defaultChecked={true} size="small" aria-label="a switch for demo"></Switch>
          <Switch size="small" loading aria-label="a switch for demo" />
          <Switch size="small" loading defaultChecked={true} aria-label="a switch for demo" />
        </Space>
        <Space style={{ marginBottom: 10, display: 'block' }}>
          <Switch></Switch>
          <Switch defaultChecked={true} aria-label="a switch for demo"></Switch>
          <Switch loading aria-label="a switch for demo" />
          <Switch loading defaultChecked={true} aria-label="a switch for demo" />
        </Space>
        <Space>
          <Switch size="large"></Switch>
          <Switch defaultChecked={true} size="large"></Switch>
          <Switch size="large" loading />
          <Switch size="large" loading defaultChecked={true} />
        </Space>
      </div>
    </div>
  )
})

SwitchDemo.props = vuePropsType
SwitchDemo.name = 'SwitchDemo'

export default SwitchDemo

