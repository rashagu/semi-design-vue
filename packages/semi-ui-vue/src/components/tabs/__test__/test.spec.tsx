import { expect, test, describe } from 'vitest'
import Comp from "./TabsDemo";
import {mount} from "@vue/test-utils";
import {h} from "vue";

test('TabsDemo qwe', async () => {
  const wrapper = mount(Comp, {})
  await wrapper.setProps({
    isVitest: true
  })
  const profileLink = wrapper.get('#semiTabPanel1').text()
  expect(profileLink).toEqual('文档')
})
