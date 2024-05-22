import {expect, test, describe, beforeAll} from 'vitest'
import Comp from "./SideSheetDemo";
import {mount} from "@vue/test-utils";
import { fireEvent, render, screen } from '@testing-library/vue';
import ModalDemo2 from '../../modal/__test__/ModalDemo2';
beforeAll(()=>{
  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  document.body.appendChild(div);
})
test('RatingDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, { attachTo: document.getElementById('container') })

  const profileLink = wrapper.get('.semi-radio-addon').text()
  expect(profileLink).toEqual("right")
})


test('sideSheet render', async () => {
  render(ModalDemo2)
  const input = await screen.findByRole("bt1");
  await fireEvent.click(input);
  // const value = await screen.findByText("00时间")
  await (new Promise(resolve => setTimeout(resolve, 500)));
  const menuitem = await screen.findByText("滑动侧边栏");

  expect(menuitem.getAttribute('class')).toContain('semi-sidesheet-title');

});
