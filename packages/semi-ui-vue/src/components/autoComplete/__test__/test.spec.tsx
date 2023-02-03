
import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./AutoCompleteItemsDemo";
import OptionDemo from "./OptionDemo";

test('AutoComplete test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-input-default')
  expect(profileLink.attributes('placeholder')).toEqual('搜索...')

})

test('AutoComplete Option test', async () => {
  const wrapper = mount(OptionDemo, {})

  const profileLink = wrapper.get('.semi-autoComplete-option')
  expect(profileLink.text()).toEqual('s@qq.com')
})
