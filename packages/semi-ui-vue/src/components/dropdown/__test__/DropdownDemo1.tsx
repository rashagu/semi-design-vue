import {defineComponent, h, onActivated} from 'vue'
import DropdownMenu from "../dropdownMenu";
import DropdownItem from "../dropdownItem";
import DropdownDivider from "../dropdownDivider";
import Dropdown from "../index";
import {Button} from "../../index";
import {IconMore} from "@kousum/semi-icons-vue";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const DropdownDemo1 = defineComponent((props, {slots}) => {
  // 在keep-alive = true时  相当于 onShow
  onActivated(() => {

  })

  return () => (
    <div>

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

      <Dropdown
        trigger={"click"}
        render={
          <DropdownMenu>
            <DropdownItem>Menu Item 1</DropdownItem>
            <DropdownItem>Menu Item 2</DropdownItem>
            <DropdownItem>Menu Item 3</DropdownItem>
          </DropdownMenu>
        }
      >
        <Button icon={<IconMore />} />
      </Dropdown>
    </div>

  );
})


export default DropdownDemo1

