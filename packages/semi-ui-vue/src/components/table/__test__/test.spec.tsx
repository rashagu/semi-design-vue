import { expect, test, describe } from 'vitest'
import Comp from "./AllDemo";
import TableDemo10 from "./TableDemo10";
import {mount} from "@vue/test-utils";
import {fireEvent, render, screen} from "@testing-library/vue";


test('AllTableDemo qwe', async () => {
  expect(Comp).toBeTruthy();
  const wrapper = mount(Comp, {  });
  const profileLink = wrapper.get('.semi-table-row-cell').text();
  // expect(profileLink).toEqual("Semi Design 设计稿.fig")
})


test('TableDemo10 columns filter', async () => {
  render(TableDemo10)

  const img = await screen.findAllByTestId("filterIcon")
  await fireEvent.click(img[0])
  await new Promise(function(resolve) {
    setTimeout(resolve, 100);
  });
  const value = await screen.findByText("Semi Design 设计稿 filterItemTestText")
  expect(value.innerHTML).toEqual("Semi Design 设计稿 filterItemTestText")
})
