import { expect, test, describe } from 'vitest'
import Comp from "./EmptyDemo";
import {mount} from "@vue/test-utils";

test('DatePickerDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-empty-image svg')
  expect(profileLink.exists()).toEqual(true)
})
