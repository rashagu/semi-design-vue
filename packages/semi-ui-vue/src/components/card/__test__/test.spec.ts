import { expect, test, describe } from 'vitest'
import Comp from "./CardDemo";
import {mount} from "@vue/test-utils";

test('Demo test', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-typography-link-text')
  expect(profileLink.text()).toEqual("More")
})
