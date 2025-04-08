import {mount} from "@vue/test-utils";
import {beforeAll, expect, test, vi} from 'vitest'
import Comp from "./LottieDemo";
import { fireEvent, render, screen } from '@testing-library/vue';

test('PaginationDemo test', async () => {
  render(Comp)
})
