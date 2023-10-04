import { expect, test, describe, beforeAll, vi } from 'vitest';
import Comp from './ImageDemo';
import { mount } from '@vue/test-utils';
import { Image, ImagePreview } from '../../index';
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

})
