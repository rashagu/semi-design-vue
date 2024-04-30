import { expect, test, describe, beforeAll, vi } from 'vitest';
import Comp from "./TabsDemo";
import Comp2 from "./TabsDemo2";
import {mount} from "@vue/test-utils";
import {fireEvent, render, screen} from "@testing-library/vue";


beforeAll(()=>{
  const intersectionObserverMock = () => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

})

test('TabsDemo qwe', async () => {
  const wrapper = mount(Comp, {})
  await wrapper.setProps({
    isVitest: true
  })
  const profileLink = wrapper.get('#semiTabPanel1').text()
  expect(profileLink).toEqual('文档')

})
test('TabsDemo2', async () => {
  render(Comp2)
  const input = await screen.findAllByRole("tab")
  expect(input[0].innerHTML).toContain('Tab-0')
})
