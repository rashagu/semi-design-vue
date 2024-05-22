import { expect, test, describe } from 'vitest'
import Comp from "./PopconfirmDemo";
import {mount} from "@vue/test-utils";
import { fireEvent, render, screen } from '@testing-library/vue';



test('popconfirm', async () => {
  render(Comp)
  const input = await screen.findByRole("bt")
  await fireEvent.click(input)
  // const value = await screen.findByText("00时间")
  const menuitem = await screen.findByText("确定")
  await fireEvent.click(menuitem)
  await (new Promise(resolve => setTimeout(resolve, 100)))
  const cf = await screen.findByText("确认保存！")


});
