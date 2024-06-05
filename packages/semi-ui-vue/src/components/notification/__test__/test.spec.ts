import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./NotificationDemo";
import { fireEvent, render, screen } from '@testing-library/vue';
import Demo2 from './NotificationDemo2';

test('NotificationDemo test', async () => {
  render(Comp, {
    global: {
      stubs: {
        // 因为有同名的自定义组件 与vue的transition组件冲突
        transition: false,
      },
    },
  })

  const menuitem = await screen.findByText("Display Notification")
})


test('NotificationDemo render', async () => {
  render(Demo2, {
    global: {
      stubs: {
        // 因为有同名的自定义组件 与vue的transition组件冲突
        transition: false,
      },
    },
  })
  const input = await screen.findByRole("bt")
  await fireEvent.click(input)
  // const value = await screen.findByText("00时间")
  await (new Promise(resolve => setTimeout(resolve, 500)))
  const menuitem = await screen.findByText("Display Notification")

});
