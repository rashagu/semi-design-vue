import { expect, test, describe, beforeAll, vi } from 'vitest';
import Comp from "./TabsDemo";
import Comp2 from "./TabsDemo2";
import Comp3 from "./TabsDemo3";
import TabsDemo4 from "./TabsDemo4";
import TabsDemo3VueSFC from "./TabsDemo3VueSFC.vue";
import {mount} from "@vue/test-utils";
import {fireEvent, render, screen} from "@testing-library/vue";


beforeAll(()=>{
  const intersectionObserverMock = () => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);
  window.Element.prototype.scrollIntoView = vi.fn()
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
test('TabsDemo3', async () => {
  render(Comp3)
  const input = await screen.findAllByRole("symbol")
  expect(input[0].innerHTML).toContain('symbol0')
  expect(input[1].innerHTML).toContain('symbol1')
  expect(input[2].innerHTML).toContain('symbol2')
  expect(input[3].innerHTML).toContain('symbol3')
})
test('TabsDemo3VueSFC', async () => {
  render(TabsDemo3VueSFC)
  const input = await screen.findAllByRole("symbol")
  expect(input[0].innerHTML).toContain('symbol0')
  expect(input[1].innerHTML).toContain('symbol1')
  expect(input[2].innerHTML).toContain('symbol2')
  expect(input[3].innerHTML).toContain('symbol3')
})

test('TabsDemo4', async () => {
  render(TabsDemo4)
  const bt = await screen.findByRole("bt")
  await fireEvent.click(bt)
  await (new Promise(resolve => setTimeout(resolve, 500)))

  const presentation = await screen.findByRole("presentation")
  expect(presentation.getAttribute('aria-haspopup')).toContain('true')
})
