import { expect, test, describe } from 'vitest'
import Comp from "./ResizableDemo";
import {fireEvent, render, screen} from "@testing-library/vue";

test('SelectDemo toRaw unit', async () => {

  render(Comp)
  const select = await screen.findByText("Drag edge to resize min:10% max:40%") as HTMLInputElement
  // await fireEvent.click(select);
  // const option = await screen.findByTestId("a001")
  // await fireEvent.click(option);
  // const valueText = option.parentElement.className
  // expect(valueText).toEqual("semi-select-option semi-select-option-selected semi-select-option-focused")
  // const hs = await screen.findAllByText("火山")
  // expect(hs.length).toEqual(2)
})
