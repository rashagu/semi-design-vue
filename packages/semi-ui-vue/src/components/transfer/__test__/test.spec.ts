import { expect, test, describe } from 'vitest'
import Comp from "./TransferDemo";
import {mount} from "@vue/test-utils";

test('TransferDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-transfer-right-item-text')
  expect(profileLink.text()).toEqual("B-3（disabled）")
})
