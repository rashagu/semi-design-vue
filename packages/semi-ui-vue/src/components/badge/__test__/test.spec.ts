import { expect, test, describe } from 'vitest'
import Comp from "./BadgeDemo";
import {mount} from "@vue/test-utils";

test('Demo test', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})
  const profileLink = wrapper.get('.semi-badge-primary')
  expect(profileLink.text()).toEqual("5")
})
