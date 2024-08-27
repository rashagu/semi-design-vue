
import { defineComponent, ref } from 'vue';
import Button from '../../button';
import ImagePreview from '../preview'

const Demo = defineComponent(() => {
  const srcList = [
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/greenleaf.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/colorful.jpg",
  ];

  const visible1 = ref(false);
  const visible2 = ref(false);

  const visibleChange1 = (v) => {
    visible1.value = (v);
  };

  const visibleChange2 = (v) => {
    visible2.value = (v);
  };

  const onButton1Click = (v) => {
    visible1.value = (true);
  };

  const onButton2Click = (v) => {
    visible2.value = (true);
  };

  return () => (
    <>
      <Button onClick={onButton1Click}>Preview single Image</Button>
      <ImagePreview
        src={"https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg"}
        visible={visible1.value}
        onVisibleChange={visibleChange1}
      />
      <br />
      <Button onClick={onButton2Click} style={{ marginTop: '20px' }}>Preview multiple Images</Button>
      <ImagePreview
        src={srcList}
        visible={visible2.value}
        onVisibleChange={visibleChange2}
      />
    </>
  );
})
export default Demo;
