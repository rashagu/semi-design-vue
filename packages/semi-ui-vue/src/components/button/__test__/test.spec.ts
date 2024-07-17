import { expect, test, describe } from 'vitest'
import Comp from "./Demo";
import { render, screen, } from '@testing-library/vue';


test('PaginationDemo test', async () => {
  render(Comp)
  const img = await screen.findByText("分裂按钮");
})
