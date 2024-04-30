import {mount} from "@vue/test-utils";
import { beforeAll, expect, test, vi } from 'vitest';
import DescriptionsHorizontalDemo from "./DescriptionsHorizontalDemo";

test('DatePickerDemo qwe', async () => {
  const wrapper = mount(DescriptionsHorizontalDemo, {})

  const tr = wrapper.get('table').find('tr')
  const th = tr.findAll('th')
  const td = tr.findAll('td')

  let totalSpan = td.length
  td.forEach(item=>{
    totalSpan += +item.getRootNodes()[0].getAttribute('colspan')
  })
  expect(totalSpan).toEqual(8)
})
