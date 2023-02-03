import { expect, test, describe } from 'vitest'
import Comp from "./UploadDemo";
import {mount} from "@vue/test-utils";

test('UploadDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-upload-hidden-input-replace')
  expect(profileLink.exists()).toEqual(true)
})
