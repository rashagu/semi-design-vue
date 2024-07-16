import {mount} from "@vue/test-utils";
import {beforeAll, expect, test, vi} from 'vitest'
import Comp from "./PinCodeDemo";
import { fireEvent, render, screen } from '@testing-library/vue';

test('PaginationDemo test', async () => {
  render(Comp)
  const input = await screen.findAllByTestId("pin-code-input") as HTMLInputElement[]
  await fireEvent.pause(input[5], {target: {value: '9'}})
  expect(input[5].value).toEqual('9')
})
