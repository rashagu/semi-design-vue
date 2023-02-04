import { expect, test, describe } from 'vitest'
import Comp from "./RatingDemo";
import {mount} from "@vue/test-utils";

test('RatingDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.find('.semi-rating-star-second').exists()
  expect(profileLink).toEqual(true)
})
