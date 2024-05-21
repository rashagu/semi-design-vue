import { expect, test, describe } from 'vitest';
import ModalDemo from './ModalDemo';
import ModalDemo2 from './ModalDemo2';
import ModalDemoHook from './ModalDemoHook';
import ModalDemoConfirm from './ModalDemoConfirm';
import { mount } from '@vue/test-utils';
import { fireEvent, render, screen } from '@testing-library/vue';


test('ModalDemo test', async () => {
  expect(ModalDemo).toBeTruthy();

  const wrapperHook = mount(ModalDemoHook, {});
  const profileLinkHook = wrapperHook.exists();
  expect(profileLinkHook).toEqual(true);

  const wrapper = mount(ModalDemoConfirm, {});
  const profileLink = wrapper.exists();
  expect(profileLink).toEqual(true);
});

test('ModalDemo inner qwe', async () => {
  render(ModalDemoConfirm);
  const img = await screen.findByTestId("custom-element");
  await fireEvent.click(img);
  const value = await screen.findByText('bla bla bla...');

});


test('ModalDemo header', async () => {
  render(ModalDemo2)
  const input = await screen.findByRole("bt")
  await fireEvent.click(input)
  // const value = await screen.findByText("00时间")
  await (new Promise(resolve => setTimeout(resolve, 500)))
  const menuitem = await screen.findByText("基本对话框")

  expect(menuitem.innerHTML).toContain('基本对话框');

});
