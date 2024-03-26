import {mount} from "@vue/test-utils";
import { expect, test } from 'vitest'
import DescriptionsHorizontalDemo from "./DescriptionsHorizontalDemo";

test('DatePickerDemo qwe', async () => {
  const wrapper = mount(DescriptionsHorizontalDemo, {})

  const tr = wrapper.get('table').find('tr')
  const th = tr.findAll('th')
  const td = tr.findAll('td')
  expect(th.length + td.length).toEqual(8)
})
