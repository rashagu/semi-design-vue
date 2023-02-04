import {expect, test, describe, beforeAll} from 'vitest'
import Comp from "./TimelineDemo";
import {mount} from "@vue/test-utils";
beforeAll(()=>{
  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  document.body.appendChild(div);
})
test('RatingDemo qwe', async () => {
  expect(Comp).toBeTruthy()
  const wrapper = mount(Comp, { attachTo: document.getElementById('container') })

  const profileLink = wrapper.get('.semi-timeline-item-content').text()
  expect(profileLink).toEqual("第一个节点内容2019-07-14 10:35")
})
