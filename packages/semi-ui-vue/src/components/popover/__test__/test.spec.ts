import { expect, test, describe } from 'vitest'
import Comp from "./PopoverTest";
import {mount} from "@vue/test-utils";

test('PopoverTest qwe', async () => {
  expect(Comp).toBeTruthy()

  const wrapper = mount(Comp, {  })
})
