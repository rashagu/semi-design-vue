import { expect, test, describe } from 'vitest'
import Comp from "./FormAllDemo";
import {mount} from "@vue/test-utils";

test('FormAllDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})


  const profileLink = wrapper.find('.semi-input-inset-label')
  expect(profileLink.text()).toEqual("名称")
})
