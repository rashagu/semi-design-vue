import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./BreadcrumbDemo";

test('render with scoped-slot', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('#aa')
  expect(profileLink.text()).toEqual('Semi-ui')
})
