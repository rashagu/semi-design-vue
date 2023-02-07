import { expect, test, describe } from 'vitest';
import ModalDemo from './ModalDemo';
import ModalDemoHook from './ModalDemoHook';
import ModalDemoConfirm from './ModalDemoConfirm';
import { mount } from '@vue/test-utils';
import { fireEvent, render, screen } from '@testing-library/vue';

test('TypoDemo test', async () => {
  expect(ModalDemo).toBeTruthy();

  const wrapperHook = mount(ModalDemoHook, {});
  const profileLinkHook = wrapperHook.exists();
  expect(profileLinkHook).toEqual(true);

  const wrapper = mount(ModalDemoConfirm, {});
  const profileLink = wrapper.exists();
  expect(profileLink).toEqual(true);
});

test('ImageDemo inner qwe', async () => {
  render(ModalDemoConfirm);
  const img = await screen.findByTestId("custom-element");
  await fireEvent.click(img);
  const value = await screen.findByText('bla bla bla...');

});
