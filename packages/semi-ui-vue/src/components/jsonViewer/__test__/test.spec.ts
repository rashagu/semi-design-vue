import { beforeAll, expect, test, vi } from 'vitest';
import Demo from './JsonViewerDemo';
import { fireEvent, render, screen } from '@testing-library/vue';

beforeAll(() => {
  window.URL.createObjectURL = vi.fn();
  window.URL.revokeObjectURL = vi.fn();
  vi.useFakeTimers({ toFake: ['requestIdleCallback'] });
  vi.spyOn(window.URL, "createObjectURL").mockImplementation(() => "http://fake.url");
});
test('JsonViewerDemo qwe', async () => {
  render(Demo);
  const text = await screen.findByText('1');

  expect(text.getAttribute("class")).toEqual("line-number-text")

});

