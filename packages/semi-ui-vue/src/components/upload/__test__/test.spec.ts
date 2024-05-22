import { expect, test, describe } from 'vitest'
import Comp from "./UploadDemo";
import {mount} from "@vue/test-utils";
import { fireEvent, render, screen } from '@testing-library/vue';

test('UploadDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-upload-hidden-input-replace')
  expect(profileLink.exists()).toEqual(true)
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
