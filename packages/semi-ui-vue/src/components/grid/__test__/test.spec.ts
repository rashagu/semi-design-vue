import {expect, test, describe, beforeAll} from 'vitest'
import Comp from "./GridTest";
import {mount} from "@vue/test-utils";
// beforeAll(() => {
//   global.matchMedia = ()=>{};
// });
test('grid qwe', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-col-4')
  expect(profileLink.text()).toEqual("col-4")
})
