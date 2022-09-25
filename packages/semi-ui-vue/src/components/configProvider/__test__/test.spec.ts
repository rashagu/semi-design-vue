import { expect, test, describe } from 'vitest'
import Comp from "./ConfigProviderDemo";
import {mount} from "@vue/test-utils";

test('DatePickerDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-input').attributes().placeholder
  expect(profileLink).toEqual('Select date')
})
