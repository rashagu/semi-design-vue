import {expect, test, describe, beforeAll, vi} from 'vitest'
import Comp from "./HighlightDemo";
import {mount} from "@vue/test-utils";

test('grid qwe', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-highlight-tag')
  expect(profileLink.text()).toEqual("Semi Design")
})
