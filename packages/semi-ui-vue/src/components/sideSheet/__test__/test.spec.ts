import {expect, test, describe, beforeAll} from 'vitest'
import Comp from "./SideSheetDemo";
import {mount} from "@vue/test-utils";
beforeAll(()=>{
  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  document.body.appendChild(div);
})
test('RatingDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, { attachTo: document.getElementById('container') })

  const profileLink = wrapper.get('.semi-radio-addon').text()
  expect(profileLink).toEqual("right")
})
