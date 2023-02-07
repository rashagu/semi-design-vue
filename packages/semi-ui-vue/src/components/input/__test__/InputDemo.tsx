import {defineComponent, ref, h, onMounted,} from 'vue'
import Input from '../index'
import TextArea from "../textArea";
import {IconSearch} from '@kousum/semi-icons-vue'
import {Text} from '../../typography'
import {InputGroup} from "../../index";
import InputNumber from "../../inputNumber";

interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}
const InputDemo = defineComponent<ExampleProps>((props, {slots}) => {

  const defaultValue = ref('asd')
  onMounted(()=>{
    // console.log(defaultValue.value)
    // setInterval(()=>{
    //   defaultValue.value = JSON.stringify((new Date))
    //   // console.log(defaultValue.value)
    // }, 1000)
  })

  function onChange(v:any) {
    console.log(v)
  }
  return () => (
    <div id={'a'}>

      {/*<Input  prefix={<IconSearch />} placeholder={'请输入'} showClear></Input>*/}
      {/*<br/><br/>*/}
      {/*<Input prefix="Prefix" showClear></Input>*/}
      {/*<br/><br/>*/}
      {/*<Input suffix={<IconSearch />} showClear></Input>*/}
      {/*<br/><br/>*/}
      {/*<Input disabled suffix={<Text strong type='secondary' style={{ marginRight: 8 }}>Suffix</Text>} showClear></Input>*/}
      <br/><br/>
      <Input showClear mode={'password'} placeholder={'click to clear'} onChange={onChange}></Input>
      <Input showClear defaultValue={'defaultValue.value'} value={defaultValue.value}  placeholder={'click to clear'}></Input>
      <Input showClear defaultValue={defaultValue.value} placeholder={'click to clear'}></Input>
      {defaultValue.value}
      <TextArea defaultValue={defaultValue.value} placeholder={'请输入'} />
      <TextArea value={defaultValue.value} placeholder={'请输入'} />
      <TextArea v-model={[defaultValue.value,'value']} placeholder={'请输入'} />
      <TextArea maxCount={100} showClear/>

      <Input defaultValue='ies' validateStatus='warning'></Input>
      <br/><br/>
      <Input defaultValue='ies' validateStatus='error'></Input>
      <br/><br/>
      <Input defaultValue='ies'></Input>


      <InputGroup>
        <Input placeholder="Name" style={{ width: '100px' }} />
        <InputNumber placeholder="Score" style={{ width: '140px' }} />
      </InputGroup>
    </div>
  )
})


InputDemo.props = VuePropsType

export default InputDemo
