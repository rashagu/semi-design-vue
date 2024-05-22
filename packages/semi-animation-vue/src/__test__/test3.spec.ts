import { expect, test } from 'vitest'
import App from '../App'
import { fireEvent, render, screen,  } from '@testing-library/vue';


test('semi-animation-vue render', async () => {
  render(App, {
    global: {
      stubs: {
        // 因为有同名的自定义组件 与vue的transition组件冲突
        transition: false,
      },
    },
  });
  const input = await screen.findByRole("bt1");
  await fireEvent.click(input);
  // const value = await screen.findByText("00时间")
  await (new Promise(resolve => setTimeout(resolve, 1000)));
  const menuitem = await screen.findByText("Toggle to see some animation happen!");

  expect(menuitem.getAttribute('style')).toContain('opacity: 1;');

});
