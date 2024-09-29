
import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./AutoCompleteItemsDemo";
import OptionDemo from "./OptionDemo";
import { render, screen, } from '@testing-library/vue';

test('AutoComplete test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-input-default')
  expect(profileLink.attributes('placeholder')).toEqual('搜索...')

})

test('AutoComplete Option test', async () => {
  render(OptionDemo, {})
  const option = await screen.findByRole('option')
  expect(option.textContent).toEqual('s@qq.com')
})
