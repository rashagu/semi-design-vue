import {expect, test, describe, beforeAll} from 'vitest'
import Comp from "./SkeletonDemo";
import {mount} from "@vue/test-utils";
// beforeAll(() => {
//   global.matchMedia = ()=>{};
// });
test('grid qwe', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-skeleton-title')
  expect(profileLink.exists()).toEqual(true)
})
