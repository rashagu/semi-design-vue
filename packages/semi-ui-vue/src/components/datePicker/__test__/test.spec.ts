import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./DatePickerDemo";
import { fireEvent, render, screen } from '@testing-library/vue';
import Demo2 from './DatePickerDemo2';

test('DatePickerDemo qwe', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-input').attributes().placeholder
  expect(profileLink).toEqual('请选择日期')
})

test('DatePickerDemo2 render', async () => {
  render(Demo2)
  const input = await screen.findByRole("combobox")
  await fireEvent.click(input)
  // const value = await screen.findByText("00时间")
  await (new Promise(resolve => setTimeout(resolve, 500)))
  const menuitem = await screen.findByText("六")

});
