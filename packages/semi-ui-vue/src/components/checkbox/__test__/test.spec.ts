import { expect, test, describe } from 'vitest'
import Comp from "./CheckboxDemo";
import {mount} from "@vue/test-utils";

test('DatePickerDemo qwe', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-icon-checkbox_tick svg')
  expect(profileLink.exists()).toEqual(true)
})
