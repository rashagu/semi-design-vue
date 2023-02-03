import { expect, test, describe, beforeAll } from 'vitest'
import Comp from "./DividerDemo";
import {mount} from "@vue/test-utils";

test('Demo test', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-divider-vertical')
  expect(profileLink.exists()).toEqual(true)
})
