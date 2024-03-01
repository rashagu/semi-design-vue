import { expect, test, describe } from 'vitest'
import CalenderDemo from "./CalenderDemo";
import EventDemo from "./EventDemo";
import {mount} from "@vue/test-utils";
import {fireEvent, render, screen} from "@testing-library/vue";

test('CalenderDemo qwe', async () => {
  expect(CalenderDemo).toBeTruthy()
  const wrapper0 = mount(CalenderDemo, {});
  const profileLink0 = wrapper0.findAll('.semi-calendar-month-date');
  expect(typeof (profileLink0[1].text() || 0)).toEqual('string');
})

test('EventDemo qwe', async () => {
  render(EventDemo)
})
