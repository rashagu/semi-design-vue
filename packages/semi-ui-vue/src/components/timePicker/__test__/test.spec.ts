import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import Comp from "./TimePickerDemo";

test('TimePickerDemo test', async () => {
  const wrapper = mount(Comp, {})

  const profileLink = wrapper.get('.semi-input').attributes().placeholder
  expect(profileLink).toEqual('请选择时间')
})
