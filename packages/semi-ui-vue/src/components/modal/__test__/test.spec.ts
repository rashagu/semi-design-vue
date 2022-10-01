import { expect, test, describe } from 'vitest'
import ModalDemo from "./ModalDemo";
import ModalDemoHook from "./ModalDemoHook";
import ModalDemoConfirm from "./ModalDemoConfirm";
import {mount} from "@vue/test-utils";

test('TypoDemo test', async () => {
  expect(ModalDemo).toBeTruthy()

  const wrapper = mount(ModalDemo, {})
  const profileLink = wrapper.exists()
  expect(profileLink).toEqual(true)

})
