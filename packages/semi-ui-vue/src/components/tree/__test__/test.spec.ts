import { expect, test, describe } from 'vitest'
import Comp from "./TreeAllDemo";
import TreeCheckDemo from "./TreeCheckDemo";
import {mount} from "@vue/test-utils";

test('Tree test', async () => {
  const wrapper = mount(TreeCheckDemo, {})
  // semi-tree-auto-wrapper
  const profileLink = wrapper.get('.semi-tree-option-label-text')

  expect(profileLink.text()).toEqual("Asia")
})
test('Tree test2', async () => {
  const wrapper = mount(Comp, {})
  // semi-tree-auto-wrapper

  const profileStyle = wrapper.get('.semi-tree-auto-wrapper')


  expect( profileStyle.attributes('style')).toEqual("height: 300px; overflow: visible;")
})
