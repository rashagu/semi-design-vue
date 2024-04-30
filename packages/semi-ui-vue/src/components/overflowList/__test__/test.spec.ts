import {mount} from "@vue/test-utils";
import {beforeAll, expect, test, vi} from 'vitest'
import Comp from "./OverListAllDemo";

beforeAll(()=>{
  const intersectionObserverMock = () => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

})
test('OverListAllDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-tag-content').text()
  expect(profileLink).toEqual('+6')
})
