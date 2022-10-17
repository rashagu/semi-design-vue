import {shallowMount, mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./AutoCompleteItemsDemo";

test('AutoComplete test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-input-default')
  expect(profileLink.attributes('placeholder')).toEqual('搜索...')
})
