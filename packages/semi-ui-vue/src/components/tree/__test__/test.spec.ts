import { expect, test, describe } from 'vitest'
import Comp from "./TreeAllDemo";
import {mount} from "@vue/test-utils";

test('Tree test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-tree-option-label-text')
  expect(profileLink.text()).toEqual("Asia")
})
