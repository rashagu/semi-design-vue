import {defineComponent, ref, h, onActivated, Fragment} from 'vue'
import DropdownMenu from "../DropdownMenu";
import DropdownItem from "../DropdownItem";
import DropdownDivider from "../DropdownDivider";
import Dropdown from "../Index";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const DropdownDemo1 = defineComponent<ExampleProps>((props, {slots}) => {
  // 在keep-alive = true时  相当于 onShow
  onActivated(() => {

  })

  return () => (
    <Dropdown
      trigger="click"
      render={
        <DropdownMenu>
          <DropdownItem disabled>1111</DropdownItem>
          <DropdownDivider />
          <DropdownItem selected={true}>
            2222 What if the text is super long? Longer than whatever you've known
            <Dropdown
              trigger="click"
              render={
                <DropdownMenu>
                  <DropdownItem disabled>1111</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem selected={true}>
                    2222 What if the text is super long? Longer than whatever you've known
                  </DropdownItem>
                  <DropdownItem>It looks OK</DropdownItem>
                </DropdownMenu>
              }
            >
              <div>分割线</div>
            </Dropdown>
          </DropdownItem>
          <DropdownItem>It looks OK</DropdownItem>
        </DropdownMenu>
      }
    >
      <div>分割线</div>

    </Dropdown>
  );
})

DropdownDemo1.props = vuePropsType

export default DropdownDemo1

