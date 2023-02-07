import { expect, test, describe } from 'vitest'
import Comp from "./FormAllDemo";
import {mount} from "@vue/test-utils";
import {fireEvent, render, screen} from "@testing-library/vue";

test('FormAllDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})


  const profileLink = wrapper.find('.semi-input-inset-label')
  expect(profileLink.text()).toEqual("名称")



  render(Comp)
  const input = await screen.findByPlaceholderText("名称")
  await input.focus()
  // await fireEvent.change(input, {target: {value: '2020-05-24'}})
  await fireEvent.keyDown(document.activeElement || document.body);
  await fireEvent.update(input)
  const value = await screen.findByText("baseInfo")
})
