import { expect, test, describe } from 'vitest'
import Comp from "./LayoutTest";
import {mount} from "@vue/test-utils";

test('LayoutTest qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-layout-content')
  expect(profileLink.text()).toEqual("Content")
})
