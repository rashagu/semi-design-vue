import {h} from 'vue'
import {shallowMount, mount} from "@vue/test-utils";
import { expect, test } from 'vitest'

test('render with scoped-slot', async () => {
  const HelloWorld: any = {
    render() {
      // @ts-ignore
      return (h('div', {id:'a'}, '123'))
    },
  }
  const wrapper = shallowMount(HelloWorld, {})

  const profileLink = wrapper.get('#a')
  expect(profileLink.text()).toEqual('123')
})
