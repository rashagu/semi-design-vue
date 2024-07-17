import {defineComponent, ref, h, onMounted,} from 'vue'
import Input from '../index'
import TextArea from "../textArea";
import InputNumber from "../../inputNumber";
import AutoComplete from '../../autoComplete';
import Button from '../../button';
import InputGroup from '../inputGroup';
import { ModalClass } from '../../modal';
import Select, { SelectOption } from '../../select';

interface ExampleProps {
  name?: string
}

export const VuePropsType = {
  name: String
}
const InputDemo = defineComponent((props, {slots}) => {

  const defaultValue = ref('asd')
  onMounted(()=>{
    // console.log(defaultValue.value)
    // setInterval(()=>{
    //   defaultValue.value = JSON.stringify((new Date))
    //   // console.log(defaultValue.value)
    // }, 1000)
  })

  //
  const value = ref()
  function onChange(v: any) {
    console.log(v);
    value.value = v
  }

  //
  const pwd = ref()
  function check(){
    ModalClass.confirm({
      title: "验证密码",
      content: ()=><Input value={pwd.value} onChange={(v: string) => {
           pwd.value = v
        }}/>,
      // content: h(Input, {
      //   type:"password",
      //   placeholder: '请输入密码',
      //   value: pwd.value,
      //   onChange: (v: string) => {
      //     pwd.value = v
      //   },
      // }) as any,
      onOk(){
        alert('ok' + pwd.value)
      }

    })
  }

  onMounted(()=>{
    setTimeout(()=>{
      pwd.value = 'ddd'
    }, 1000)
  })

  return () => (
    <div id={'a'}>
      <Button onClick={check}>confirm</Button>

      {/*<Input  prefix={<IconSearch />} placeholder={'请输入'} showClear></Input>*/}
      {/*<br/><br/>*/}
      {/*<Input prefix="Prefix" showClear></Input>*/}
      {/*<br/><br/>*/}
      {/*<Input suffix={<IconSearch />} showClear></Input>*/}
      {/*<br/><br/>*/}
      {/*<Input disabled suffix={<Text strong type='secondary' style={{ marginRight: 8 }}>Suffix</Text>} showClear></Input>*/}
      <br />
      <br />
      <Input showClear mode={'password'} value={value.value} placeholder={'click to clear password'} onChange={onChange}></Input>
      <Input
        showClear
        defaultValue={'defaultValue.value'}
        value={defaultValue.value}
        placeholder={'click to clear'}
      ></Input>
      <Input showClear defaultValue={defaultValue.value} placeholder={'click to clear'}></Input>
      {defaultValue.value}
      <TextArea defaultValue={defaultValue.value} placeholder={'请输入'} />
      <TextArea value={defaultValue.value} placeholder={'请输入'} />
      <TextArea v-model={[defaultValue.value, 'value']} placeholder={'请输入'} />
      <TextArea maxCount={100} showClear />

      <Input defaultValue="ies" validateStatus="warning"></Input>
      <br />
      <br />
      <Input defaultValue="ies" validateStatus="error"></Input>
      <br />
      <br />
      <Input defaultValue="ies"></Input>

      <InputGroup>
        <Input placeholder="Name" style={{ width: '100px' }} />
        <InputNumber placeholder="Score" style={{ width: '140px' }} />
      </InputGroup>
      <br />
      <br />

      <InputNumber placeholder="Score" style={{ width: '140px' }} />
      <br />
      <br />
      <InputGroup>
        <Select style={{ width: '100px' }} defaultValue="home">
          <SelectOption value="home">Home</SelectOption>
          <SelectOption value="work">Work</SelectOption>
        </Select>
        <AutoComplete data={['Beijing Haidian']} placeholder="Address: " style={{ width: 180 }}></AutoComplete>
      </InputGroup>
    </div>
  );
})


// @ts-ignore
InputDemo.props = VuePropsType

export default InputDemo
