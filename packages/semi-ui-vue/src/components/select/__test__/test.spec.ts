import { expect, test, describe } from 'vitest'
import Comp from "./SelectDemo";
import {mount} from "@vue/test-utils";
import {fireEvent, render, screen} from "@testing-library/vue";

test('SelectDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-select-selection-placeholder').text()
  expect(profileLink).toEqual('onChange')


  render(Comp)
  const img = await screen.findAllByText("option-50")
  expect(img.length).toEqual(1)
  const input = await screen.findByText("onChange")
  await fireEvent.click(input);
  const item = await screen.findByText("tony")
  await fireEvent.click(item)
  const valueText = await screen.findByPlaceholderText("select_change_demo") as HTMLInputElement
  expect(valueText.value).toEqual('tony')
})

