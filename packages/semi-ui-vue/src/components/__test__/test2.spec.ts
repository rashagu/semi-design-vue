import {shallowMount, mount} from "@vue/test-utils";
import App from '../../App'

test('render with scoped-slot', async () => {
  const wrapper = mount(App, {})

  const profileLink = wrapper.get('.aa')
  expect(profileLink.text()).toEqual('123')
})
