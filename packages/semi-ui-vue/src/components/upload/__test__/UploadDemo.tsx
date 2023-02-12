import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import Upload, {FileItem} from '../index';
import Button from '../../button';
import { IconUpload } from '@kousum/semi-icons-vue';
import FileCard from '../fileCard';

interface UploadDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const UploadDemo = defineComponent<UploadDemoProps>((props, {}) => {
  const slots = useSlots();

  const fileList = ref<FileItem[]>([
    {
      name: '2569d972-b9c1-41d4-9294-bb44b3f072ec',
      size: '5.9MB',
      status: 'success',
      uid: '2569d972-b9c1-41d4-9294-bb44b3f072ec',
      url: 'blob:http://localhost:8888/117441f7-cce2-412b-b661-d4b84d197889',
    },
  ]);
  return () => (
    <div>
      <Upload
        fileList={fileList.value}
        onChange={(v) => {
          console.log(v);
          fileList.value = v.fileList
        }}
        action="https://run.mocky.io/v3/d6ac5c9e-4d39-4309-a747-7ed3b5694859"
      >
        <Button icon={<IconUpload />} theme="light">
          点击上传
        </Button>
      </Upload>
      <Upload listType="picture" action="https://run.mocky.io/v3/d6ac5c9e-4d39-4309-a747-7ed3b5694859">
        <Button icon={<IconUpload />} theme="light">
          点击上传
        </Button>
      </Upload>

      <FileCard />
    </div>
  );
});

UploadDemo.props = vuePropsType;
UploadDemo.name = 'UploadDemo';

export default UploadDemo;
