import { expect, test, describe } from 'vitest'
import Comp from "./TreeAllDemo";
import TreeDemo2 from "./TreeDemo2";
import TreeCheckDemo from "./TreeCheckDemo";
import {mount} from "@vue/test-utils";
import { fireEvent, render, screen } from '@testing-library/vue';

test('Tree test', async () => {
  const wrapper = mount(TreeCheckDemo, {})
  // semi-tree-auto-wrapper
  const profileLink = wrapper.get('.semi-tree-option-label-text')

  expect(profileLink.text()).toEqual("Asia")
})
test('Tree test2', async () => {
  const wrapper = mount(Comp, {})
  // semi-tree-auto-wrapper
  await (new Promise(resolve => setTimeout(resolve, 500)))

  const profileStyle = wrapper.get('.semi-tree-auto-wrapper')


  expect( profileStyle.attributes('style')).toEqual("height: 300px; overflow: visible;")
})

test('Tree Render', async () => {
  render(TreeDemo2)
  const menuitem = await screen.findByText("上海")

  expect(menuitem.getAttribute('class')).toContain('semi-tree-option-label-text');

});
