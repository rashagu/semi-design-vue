import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Upload from "../index";
import Button from "../../button";
import {IconUpload} from "@kousum/semi-icons-vue";
import FileCard from "../fileCard";

interface UploadDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const UploadDemo = defineComponent<UploadDemoProps>((props, {}) => {

  const slots = useSlots()

  return () => (
    <div>
      <Upload  action="https://run.mocky.io/v3/d6ac5c9e-4d39-4309-a747-7ed3b5694859">
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
  )
})

UploadDemo.props = vuePropsType
UploadDemo.name = 'UploadDemo'

export default UploadDemo

