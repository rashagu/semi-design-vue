import { expect, test, describe } from 'vitest'
import Comp from "./TreeSelectDemo";
import {mount} from "@vue/test-utils";

test('UploadDemo test', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {  })

  const profileLink = wrapper.get('.semi-tree-select-selection-placeholder').text()
  expect(profileLink).toEqual("请选择")
})
