import {expect, test, describe, beforeAll, vi} from 'vitest'
import Comp from "./GridTest";
import {mount} from "@vue/test-utils";
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
});
test('grid qwe', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-col-4')
  expect(profileLink.text()).toEqual("col-4")
})
