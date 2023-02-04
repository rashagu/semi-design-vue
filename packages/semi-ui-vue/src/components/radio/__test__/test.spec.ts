import { expect, test, describe } from 'vitest'
import Comp from "./RadioDemo";
import {mount} from "@vue/test-utils";

test('PopoverTest qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-radio-addon-buttonRadio').text()
  expect(profileLink).toEqual("即时推送")
})
