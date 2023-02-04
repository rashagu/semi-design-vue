import { expect, test, describe } from 'vitest'
import Comp from "./SelectDemo";
import {mount} from "@vue/test-utils";

test('SelectDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-select-selection-placeholder').text()
  expect(profileLink).toEqual('拥有3k个Option的Select 虚拟滚动')
})
