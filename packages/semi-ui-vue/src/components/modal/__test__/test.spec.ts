import { expect, test, describe } from 'vitest'
  import ModalDemo from "./ModalDemo";
  import ModalDemoHook from "./ModalDemoHook";
  import ModalDemoConfirm from "./ModalDemoConfirm";
  import {mount} from "@vue/test-utils";

  test('TypoDemo test', async () => {
  expect(ModalDemo).toBeTruthy()

  const wrapperHook = mount(ModalDemoHook, {})
  const profileLinkHook = wrapperHook.exists()
  expect(profileLinkHook).toEqual(true)
  const wrapperConfirm = mount(ModalDemoConfirm, {})
  const profileLinkConfirm = wrapperConfirm.exists()
  expect(profileLinkConfirm).toEqual(true)
  const wrapper = mount(ModalDemoConfirm, {})
  const profileLink = wrapper.exists()
  expect(profileLink).toEqual(true)

})
