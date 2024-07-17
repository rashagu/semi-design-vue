import { expect, test, describe, beforeAll, vi } from 'vitest';
import Comp from './ImageDemo';
import { mount } from '@vue/test-utils';
import Image, {Preview as ImagePreview} from '../index'
import {defineComponent, h, provide, ref} from "vue";
import PreviewInner from "../previewInner";
import {noop} from "lodash";
import {fireEvent, render, screen} from "@testing-library/vue";

beforeAll(()=>{
  const intersectionObserverMock = () => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  document.body.appendChild(div);
})

const getImagePreview = defineComponent(()=>{

  provide('vitestEnvironments', ref(true))
  const srcList = [
    'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg',
    'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg',
    'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/greenleaf.jpg',
    'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/colorful.jpg',
  ];
  return ()=>(
    <ImagePreview>
      {srcList.map((src, index) => {
        return (
          <Image
            //@ts-ignore
            key={index}
            src={src}
            width={200}
            alt={`lamp${index + 1}`}
            style={{ marginRight: 5 }}
          />
        );
      })}
    </ImagePreview>
  );
})
test('ImageDemo qwe', async () => {
  expect(Comp).toBeTruthy();
  const wrapper0 = mount(Comp, { attachTo: document.getElementById('container') });

  const profileLink0 = wrapper0.find('.semi-image-overlay');
  expect(profileLink0.exists()).toEqual(true);


  const wrapper = mount(getImagePreview, { attachTo: document.getElementById('container') });

  const profileLink = wrapper.find('.semi-image-overlay');
  expect(profileLink.exists()).toEqual(true);
});

test('ImageDemo inner qwe', async () => {

  render(Comp)
  const img = await screen.findAllByAltText("lamp1")
  await fireEvent.click(img[0])
  const value = await screen.findByAltText("previewImag")


  const prev_bt = await screen.findByRole("prev_bt")
  await fireEvent.click(prev_bt)
  const next_bt = await screen.findByRole("next_bt")
  await fireEvent.click(next_bt)
  const plus_bt = await screen.findByRole("plus_bt")
  await fireEvent.click(plus_bt)
  const rotate_bt = await screen.findByRole("rotate_bt")
  await fireEvent.click(rotate_bt)
  const minus_bt = await screen.findByRole("minus_bt")
  await fireEvent.click(minus_bt)
  const download_bt = await screen.findByRole("minus_bt")
  await fireEvent.click(download_bt)



})
