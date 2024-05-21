import { expect, test, describe } from 'vitest';
import Comp, {ItemDdemo} from './CascaderDemo';
import { mount } from '@vue/test-utils';
import {fireEvent, render, screen} from "@testing-library/vue";
import Demo2 from './Demo2';

test('CascaderDemo qwe', async () => {
  expect(Comp).toBeTruthy();
  const wrapper0 = mount(Comp, {});
  const profileLink0 = wrapper0.findAll('.semi-cascader-option');
  expect(profileLink0[1].text()).toEqual('浙江省');

  const wrapper = mount(ItemDdemo, {});
  const profileLink = wrapper.findAll('.semi-cascader-option');
  expect(profileLink[1].text()).toEqual('浙江省');
});

test('CascaderDemo render', async () => {
  render(Demo2)
  const input = await screen.findByRole("combobox")
  await fireEvent.click(input)
  // const value = await screen.findByText("00时间")
  const menuitem = await screen.findAllByRole("menuitem")

  const checkbox = menuitem.pop().getElementsByTagName('input')[0]
  const lastChild = menuitem.pop().innerHTML
  expect(checkbox.value).toEqual('on');
  expect(lastChild).toContain('海曙区');

});
