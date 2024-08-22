
import { Upload, Button } from '@kousum/semi-ui-vue';
import { IconUpload } from '@kousum/semi-icons-vue';
import { defineComponent, reactive } from 'vue';



const ValidateDemo = defineComponent(()=>{
  const state = reactive({});
  let count = 0;
  function transformFile(fileInstance) {
    if (count === 0) {
      let newFile = new File([fileInstance], 'newFileName', { type: 'image/png' });
      return newFile;
    } else {
      return fileInstance;
    }
  }

  function beforeUpload({ file, fileList }) {
    let result;
    if (count > 0) {
      result = {
        autoRemove: false,
        fileInstance: file.fileInstance,
        shouldUpload: true,
      };
    } else {
      result = {
        autoRemove: false,
        fileInstance: file.fileInstance,
        status: 'validateFail',
        shouldUpload: false,
      };
    }
    count = count + 1;
    return result;
  }

  return ()=>{

    return (
      <Upload
        action="https://api.semi.design/upload"
        transformFile={transformFile}
        beforeUpload={beforeUpload}
      >
        <Button icon={<IconUpload />} theme="light">
          点击上传（上传前同步校验）
        </Button>
      </Upload>
    );
  }
})
export default ValidateDemo
