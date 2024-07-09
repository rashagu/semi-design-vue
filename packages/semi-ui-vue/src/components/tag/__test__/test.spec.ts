import { expect, test, describe } from 'vitest'
import Comp from "./TagDemo";
import { render, screen } from '@testing-library/vue';

test('TagDemo qwe', async () => {
  expect(Comp).toBeTruthy()
})
test('TabsDemo2', async () => {
  render(Comp)
  const input = await screen.findAllByText("焦锐志")
  expect(input.length).toEqual(6)
})
