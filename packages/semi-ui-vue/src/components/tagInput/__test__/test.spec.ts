import { test } from 'vitest';
import Comp from './TagInputDemo';
import { render, screen } from '@testing-library/vue';

test('TagInputDemo', async () => {
  render(Comp)
  const input = await screen.findAllByText("抖音")
})
