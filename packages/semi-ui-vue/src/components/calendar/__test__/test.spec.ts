import { expect, test, describe } from 'vitest'
import CalenderDemo from "./CalenderDemo";
import EventDemo from "./EventDemo";
import {mount} from "@vue/test-utils";

test('CalenderDemo qwe', async () => {
  expect(CalenderDemo).toBeTruthy()
  const wrapper0 = mount(CalenderDemo, {});
  const profileLink0 = wrapper0.findAll('.semi-calendar-month-date');
  expect(profileLink0[1].text()).toEqual('29');
})

test('EventDemo qwe', async () => {
  expect(EventDemo).toBeTruthy()
})
