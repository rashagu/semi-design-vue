import {defineComponent, ref, h, onMounted,} from 'vue'
import Input from '../Index'
import Textarea from "../Textarea";
import {IconSearch} from '@kousum/semi-icons-vue'
import {Text} from '../../typography'

interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}
const InputDemo = defineComponent<ExampleProps>((props, {slots}) => {

  const defaultValue = ref('')
  onMounted(()=>{
    console.log(defaultValue.value)
    // setInterval(()=>{
    //   defaultValue.value = JSON.stringify((new Date))
    //   console.log(defaultValue.value)
    // }, 1000)
  })
  return () => (
    <div id={'a'}>
      <Input  prefix={<IconSearch />} showClear></Input>
      <br/><br/>
      <Input prefix="Prefix" showClear></Input>
      <br/><br/>
      <Input suffix={<IconSearch />} showClear></Input>
      <br/><br/>
      <Input suffix={<Text strong type='secondary' style={{ marginRight: 8 }}>Suffix</Text>} showClear></Input>
      <br/><br/>
      <Input showClear defaultValue={'defaultValue.value'} value={defaultValue.value} placeholder={'click to clear'}></Input>
      <Textarea placeholder={'请输入'} />
    </div>
  )
})


InputDemo.props = VuePropsType

export default InputDemo
