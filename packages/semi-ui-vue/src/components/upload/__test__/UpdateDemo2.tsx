import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import { Button, Upload } from '../../index';
import { IconUpload } from '@kousum/semi-icons-vue';

interface UpdateDemo2Props {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const UpdateDemo2 = defineComponent({
  props: vuePropsType,
  name: 'UpdateDemo2',
  setup(props, { attrs }) {
    const slots = useSlots();

    const initList = [
      {
        uid: '1',
        name: 'dyBag.jpeg',
        status: 'success',
        size: '130KB',
        preview: true,
        url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/edit-bag.jpeg',
      },
      {
        uid: '2',
        name: 'dy.jpeg',
        status: 'uploading',
        size: '222KB',
        percent: 50,
        preview: true,
        fileInstance: new File([new ArrayBuffer(2048)], 'dy.jpeg', { type: 'image/jpeg' }),
        url:
          'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png',
      },
    ];

    const list = ref([
      ...initList
    ]);

    const onChange = ({ fileList, currentFile, event }) => {
      console.log('onChange');
      console.log(fileList);
      console.log(currentFile);
      let newFileList = [...fileList]; // spread to get new array
      list.value = newFileList
    };

    return () => (
      <Upload
        action="https://api.semi.design/upload"
        onChange={onChange}
        fileList={list.value}
      >
        <Button icon={<IconUpload />} theme="light">
          点击上传
        </Button>
      </Upload>
    );
  },
});


export default UpdateDemo2;

