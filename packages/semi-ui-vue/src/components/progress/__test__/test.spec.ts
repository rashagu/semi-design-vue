import { expect, test, describe } from 'vitest'
import Comp from "./ProgressDemo";
import {mount} from "@vue/test-utils";

test('ProgressDemo test', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-progress-track-inner').exists()
  expect(profileLink).toEqual(true)
})
