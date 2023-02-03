import { expect, test, describe } from 'vitest'
import Comp from "./BacktopDemo";
import {mount} from "@vue/test-utils";

test('Demo test', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, {})
  await new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(1)
    }, 500)
  })
  const profileLink = wrapper.find('.semi-backtop')
  expect(profileLink.exists()).toEqual(true)
})
