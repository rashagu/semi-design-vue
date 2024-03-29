import {shallowMount, mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import App from '../App'

test('render with scoped-slot', async () => {
  const wrapper = shallowMount(App, {})

  const profileLink = wrapper.get('.aa')
  expect(profileLink.text()).toEqual('123')
})
