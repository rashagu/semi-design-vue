import {expect, test, describe, beforeAll} from 'vitest'
import Comp from "./NavigationDemo";
import {mount} from "@vue/test-utils";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  };
});
test('NavigationDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink:any = await (new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(wrapper.get('.semi-navigation-item-text'))
    }, 100)
  }))
  expect(profileLink.text()).toEqual("用户管理")
})
