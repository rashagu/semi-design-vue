import { expect, test, describe } from 'vitest'
import Comp from "./AllDemo";
import {mount} from "@vue/test-utils";

test('AllTableDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {  })
  const profileLink = wrapper.get('.semi-table-row-cell').text()
  // expect(profileLink).toEqual("Semi Design 设计稿.fig")
})


