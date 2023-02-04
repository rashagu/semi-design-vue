import {expect, test, describe, beforeAll, vi} from 'vitest'
import Comp from "./StepsDemo";
import {mount} from "@vue/test-utils";
beforeAll(()=>{
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
  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  document.body.appendChild(div);
})
test('RatingDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, { attachTo: document.getElementById('container') })

  const profileLink = wrapper.find('path').exists()
  expect(profileLink).toEqual(true)
})
