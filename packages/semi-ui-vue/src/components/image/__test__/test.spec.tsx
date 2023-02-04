import { expect, test, describe, beforeAll, vi } from 'vitest';
import Comp from './ImageDemo';
import { mount } from '@vue/test-utils';
import { Image, ImagePreview } from '../../index';
import {defineComponent, h, provide, ref} from "vue";
import PreviewInner from "../previewInner";
import {noop} from "lodash";

beforeAll(()=>{
  const intersectionObserverMock = () => ({
    observe: () => null
  })
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);
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
  const wrapper = mount(getImagePreview, { attachTo: document.getElementById('container') });

  const profileLink = wrapper.find('.semi-image-overlay');
  expect(profileLink.exists()).toEqual(true);
});
