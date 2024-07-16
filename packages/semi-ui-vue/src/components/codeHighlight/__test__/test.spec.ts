import {mount} from "@vue/test-utils";
import {beforeAll, expect, test, vi} from 'vitest'
import Comp from "./CodeHighlightDemo";
import { fireEvent, render, screen } from '@testing-library/vue';

test('PaginationDemo test', async () => {
  render(Comp)
  const input = await screen.findAllByText("return")
  expect(input[0].getAttribute('class')).toContain('token keyword')
})
