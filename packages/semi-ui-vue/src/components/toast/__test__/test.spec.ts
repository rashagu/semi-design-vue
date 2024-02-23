import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./ToastDemo";
import {fireEvent, render, screen} from "@testing-library/vue";

test('ToastDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.Throttled').text()
  expect(profileLink).toEqual('Throttled Toast')

})
test('ToastDemo test2', async () => {
  render(Comp)
  await screen.findByText('Hi, Bytedance dance dance')

})
