import { expect, test, describe } from 'vitest'
import Comp from "./InputDemo";
import {mount} from "@vue/test-utils";

test('DatePickerDemo qwe', async () => {
  expect(Comp).toBeTruthy()

  const wrapper = mount(Comp, {});
  const profileLink = wrapper.find('textarea');
  expect(profileLink.exists()).toEqual(true);
})
