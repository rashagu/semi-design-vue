import { expect, test, describe } from 'vitest'
import Comp from "./TagInputDemo";
import {mount} from "@vue/test-utils";

test('TagInputDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('p').text()
  expect(profileLink).toEqual('抖音')
})
