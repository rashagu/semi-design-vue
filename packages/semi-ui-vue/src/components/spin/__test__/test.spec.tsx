import {expect, test, describe, beforeAll} from 'vitest'
import Comp from "./SpinDemo";
import {mount} from "@vue/test-utils";
beforeAll(()=>{
  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  document.body.appendChild(div);
})
test('RatingDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, { attachTo: document.getElementById('container') })

  const profileLink = wrapper.find('path').exists()
  expect(profileLink).toEqual(true)
})
