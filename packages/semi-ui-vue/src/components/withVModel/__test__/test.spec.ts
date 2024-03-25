import { expect, test, describe } from 'vitest'

import {fireEvent, render, screen} from "@testing-library/vue";
import Comp from './WithVModelDemo';

test('DatePickerDemo qwe', async () => {

  render(Comp)
  const img = await screen.findByText("dy.jpeg")
  expect(img.innerHTML).toEqual("dy.jpeg")
})
