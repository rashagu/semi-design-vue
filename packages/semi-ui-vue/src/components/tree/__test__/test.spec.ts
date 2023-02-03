import { expect, test, describe } from 'vitest'
import Comp from "./TreeDemo";
import {mount} from "@vue/test-utils";

test('Tree test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-tree-option-label-text')
  expect(profileLink.text()).toEqual("亚洲")
})
