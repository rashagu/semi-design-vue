import {mount} from "@vue/test-utils";
import {render, screen, fireEvent} from "@testing-library/vue";
import { expect, test } from 'vitest'
import Comp from "./TimePickerDemo";

test('TimePickerDemo test', async () => {
  render(Comp)
  const input = await screen.findAllByPlaceholderText("请选择时间")
  await fireEvent.click(input[0])
  // const value = await screen.findByText("00时间")


  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-input').attributes().placeholder
  expect(profileLink).toEqual('请选择时间')
})
