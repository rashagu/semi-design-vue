import {mount} from "@vue/test-utils";
import {beforeAll, expect, test, vi} from 'vitest'
import Comp from "./markDownRenderDemo";
import { fireEvent, render, screen } from '@testing-library/vue';

test('PaginationDemo test', async () => {
  render(Comp)
  const img = await screen.findByText("低成本快速创建风格各异的设计系统，更少时间，更快交付");
})
