import { expect, test, describe, beforeAll } from 'vitest'
import Comp from "./CollapseDemo";
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

test('Demo test', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.test_text')
  expect(profileLink.text()).toEqual("Hi, bytedance dance dance. This is the docsite of Semi UI.")
})
