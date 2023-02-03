import { expect, test, describe } from 'vitest'
import Comp from "./AvatarDemo";
import {mount} from "@vue/test-utils";

test('DatePickerDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})
  // wrapper.setProps()
  const profileLink = wrapper.get('.semi-avatar-group span')
  expect(profileLink.attributes('class')).toEqual('semi-avatar semi-avatar-circle semi-avatar-medium semi-avatar-red semi-avatar-item-start-0')
})
