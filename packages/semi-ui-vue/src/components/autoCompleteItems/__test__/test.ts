import {shallowMount, mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./AutoCompleteItemsDemo";

test('render with scoped-slot', async () => {
  const wrapper = shallowMount(Comp, {})

  // const profileLink = wrapper.get('.aa')
  // expect(profileLink.text()).toEqual('123')
})
