import { expect, test, describe, beforeAll, vi } from 'vitest';
import Comp from "./UploadDemo";
import {mount} from "@vue/test-utils";
import { fireEvent, render, screen } from '@testing-library/vue';


beforeAll(() => {
  window.URL.createObjectURL = vi.fn();
  window.URL.revokeObjectURL = vi.fn();
  vi.spyOn(window.URL, "createObjectURL").mockImplementation(() => "http://fake.url");
});
test('UploadDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-upload-hidden-input-replace')
  expect(profileLink.exists()).toEqual(true)
})

test('upload file', async () => {

  render(Comp, {
    global: {
      stubs: {
        // 因为有同名的自定义组件 与vue的transition组件冲突
        transition: false,
      },

    },
  })
  const bt1 = await screen.findAllByTestId("upload-bt")
  await fireEvent.change(bt1[0], {
    target: {
      files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})],
    },
  })

  const text = await screen.findByText("chucknorris.png")
  expect(text.innerHTML).toEqual('chucknorris.png')

})
test('upload sss', async () => {

  render(Comp)
  const bt1 = await screen.findByRole("bt1")
  await fireEvent.click(bt1)


  await screen.findByText("2569d972-b9c1-41d4-9294-bb44b3f072ec")
  const img2 = await screen.findByText("清空")
  await fireEvent.click(img2)
  const text2 = await screen.findByText("2569d972-b9c1-41d4-9294-bb44b3f072ec").catch(()=>{
    return false
  })
  expect(text2).toEqual(false)

})
