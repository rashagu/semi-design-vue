import { expect, test, describe } from 'vitest'
import Comp from "./PopconfirmDemo";
import {mount} from "@vue/test-utils";

test('PopconfirmDemo qwe', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.test').text()
  expect(profileLink).toEqual('保存')
})
