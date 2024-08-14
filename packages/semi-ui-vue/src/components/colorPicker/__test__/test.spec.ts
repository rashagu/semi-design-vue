import { expect, test, describe, beforeAll } from 'vitest'
import Comp from "./ColorPickerDemo";
import { fireEvent, render, screen } from '@testing-library/vue';

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  };
});

test('Demo test', async () => {
  render(Comp)
  const colorPicker = await screen.findByTestId("ColorPicker_testid1");
  await fireEvent.click(colorPicker);
  const dialog = await screen.findByRole('dialog')
  const width = (dialog.querySelector('.semi-colorPicker-colorChooseArea') as HTMLDivElement).style.width
  expect(width).toEqual('280px')
})
