import { expect, test, describe } from 'vitest'
import Comp from "./SliderDemo";
import {mount} from "@vue/test-utils";

test('TypoDemo test', async () => {
  expect(Comp).toBeTruthy()

  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-slider-boundary-max').text()
  expect(profileLink).toEqual('100')

})
