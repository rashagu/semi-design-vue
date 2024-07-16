import {mount} from "@vue/test-utils";
import {beforeAll, expect, test, vi} from 'vitest'
import Comp from "./PaginationDemo";
import { render, screen } from '@testing-library/vue';

test('PaginationDemo test', async () => {
  render(Comp)
  const input = await screen.findByText("每页条数：10")
})
