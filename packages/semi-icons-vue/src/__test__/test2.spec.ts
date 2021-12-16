import {shallowMount, mount} from "@vue/test-utils";
import Index from './Index'

test('render with scoped-slot', async () => {
  const wrapper = shallowMount(Index, {})

  const profileLink = wrapper.get('.aa')
  expect(profileLink.text()).toEqual('123')
})
