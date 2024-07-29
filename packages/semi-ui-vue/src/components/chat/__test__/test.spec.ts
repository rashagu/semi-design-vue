
import { expect, test } from 'vitest'
import Comp from "./ChatDemo";
import { fireEvent, render, screen } from '@testing-library/vue';



test('Chat ', async () => {
  render(Comp)
  await screen.findByText("给一个 Semi Design 的 Button 组件的使用示例")
  const textarea = await screen.findByTestId("test_base_textarea")
  await fireEvent.input(textarea, {target: {value: 'text11'}})
  const bt = await screen.findByTestId("sendButton")
  await fireEvent.click(bt)
  await screen.findByText("text11")
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // const scroll = await screen.findByTestId("chat-container-scroll")
  // expect(scroll.scrollTop).toEqual(291)
});
