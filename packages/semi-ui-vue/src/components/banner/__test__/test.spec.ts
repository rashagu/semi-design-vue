import { expect, test, describe } from 'vitest'
import Comp from "./BannerDemo";
import {mount} from "@vue/test-utils";

test('BannerDemo qwe', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.test').text()
  expect(profileLink).toEqual('Sounds great!')
})
