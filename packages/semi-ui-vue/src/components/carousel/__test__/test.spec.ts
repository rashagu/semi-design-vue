import { expect, test, describe } from 'vitest'
import Comp from "./CarouselDemo";
import {mount} from "@vue/test-utils";

test('Demo test', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('img')
  expect(profileLink.attributes('alt')).toEqual("semi_logo")
})
