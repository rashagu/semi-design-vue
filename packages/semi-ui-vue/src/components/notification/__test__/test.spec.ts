import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./NotificationDemo";

test('NotificationDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.test').text()
  expect(profileLink).toEqual('Display Notification')
})
