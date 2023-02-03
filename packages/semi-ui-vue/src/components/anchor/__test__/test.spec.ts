import { expect, test, describe } from 'vitest'
import Comp from "./AnchorDemo";
import {mount} from "@vue/test-utils";

test('DatePickerDemo qwe', async () => {
  expect(Comp).toBeTruthy()

  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-anchor-link-title')
  expect(profileLink.text()).toEqual('基本示例')

})
