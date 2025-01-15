import { expect, test, describe, beforeAll } from 'vitest'
import Comp from "./CropperDemo";
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
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const previewContainer = await screen.findByTestId("previewContainer");
  const width = previewContainer.clientWidth
  expect(width).toBeGreaterThan(-1)
})
