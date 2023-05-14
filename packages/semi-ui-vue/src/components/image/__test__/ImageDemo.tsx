import {defineComponent, ref, h, Fragment, useSlots, computed} from 'vue'
import Image, {Preview as ImagePreview} from '../index'

interface ImageDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const ImageDemo = defineComponent<ImageDemoProps>((props, {}) => {

  const slots = useSlots()
  const srcList = computed(() => ([
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/greenleaf.jpg",
  ]));

  return () => (
    <>
      <div
        id="container"
        style={{
          height: '400px',
          position: "relative"
        }}
      >
        <ImagePreview
          getPopupContainer={() => {
            const node = document.getElementById("container");
            return node;
          }}
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

          }}
        >
          {srcList.value.map((src, index) => {
            return (
              <Image
                key={index}
                src={src}
                width={'200px'}
                alt={`lamp${index + 1}`}
                style={{ marginRight: '5px' }}
              />
            );
          })}
        </ImagePreview>
      </div>
    </>
  )
})

// @ts-ignore
ImageDemo.props = vuePropsType
ImageDemo.name = 'ImageDemo'

export default ImageDemo

