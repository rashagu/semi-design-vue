import { expect, test, describe } from 'vitest'
import Comp from "./InputNumberDemo";
import {mount} from "@vue/test-utils";

test('InputNumberDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-input-number-suffix-btns')
  expect(profileLink.exists()).toEqual(true)
})
