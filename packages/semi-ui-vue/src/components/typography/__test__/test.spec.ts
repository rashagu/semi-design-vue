import { expect, test, describe } from 'vitest'
import Comp from "./TypoDemo";
import Comp2 from "./TypoDemo2";
import { fireEvent, render, screen } from '@testing-library/vue';
import TypoDemoSFC from './TypoDemoSFC.vue';
import NumeralDemo from './NumeralDemo';

test('TypoDemo test', async () => {
  expect(Comp).toBeTruthy()
})

test('typography render', async () => {
  render(Comp2, {
    global: {
      stubs: {
      },
    },
  });

  const input = await screen.findByRole("button");
  await fireEvent.click(input);
  // const value = await screen.findByText("00时间")
  await (new Promise(resolve => setTimeout(resolve, 1000)));
  const menuitem = await screen.findByText("复制成功");


});

test('typography sfc', async () => {
  render(TypoDemoSFC, {
    global: {
      stubs: {
      },
    },
  });

  const input = await screen.findByText("点赞量：16.1 K");


});

test('typography NumeralDemo', async () => {
  render(NumeralDemo, {
    global: {
      stubs: {
      },
    },
  });

  const input = await screen.findByText("7,100+");


});

