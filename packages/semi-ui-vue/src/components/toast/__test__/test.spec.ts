import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./ToastDemo";

test('ToastDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.Throttled').text()
  expect(profileLink).toEqual('Throttled Toast')

})
