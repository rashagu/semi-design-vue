import {defineComponent, ref, h, Fragment, onMounted} from 'vue'
import Avatar from '../index'
import AvatarGroup from '../avatarGroup'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const AvatarDemo = defineComponent<ExampleProps>((props, {slots}) => {


  const src = ref('https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg')
  onMounted(()=>{
    setInterval(()=>{
      src.value = 'sd' + (new Date).toString()
    }, 1000)
  })

  // return ()=>{
  //   return <Avatar
  //     alt="a cat"
  //     style={{ margin: 4 }}
  //   >{src.value}</Avatar>
  // }
  return () => (
    <div>
      <div>
      <Avatar size="extra-extra-small" style={{ margin: 4 }}>
        U
      </Avatar>
      <Avatar size="extra-small" style={{ margin: 4 }}>
        U
      </Avatar>
      <Avatar size="small" style={{ margin: 4 }}>
        U
      </Avatar>
      <Avatar size="default" style={{ margin: 4 }}>
        U
      </Avatar>
      <Avatar style={{ margin: 4 }}>U</Avatar>
      <Avatar size="large" style={{ margin: 4 }}>
        U
      </Avatar>
      <Avatar size="extra-large" style={{ margin: 4 }}>
        U
      </Avatar>
    </div>
      <div>
        <Avatar style={{ margin: 4 }}>AS</Avatar>
        <Avatar color="red" style={{ margin: 4 }}>
          BM
        </Avatar>
        <Avatar color="light-blue" style={{ margin: 4 }}>
          TJ
        </Avatar>
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', margin: 4 }}>ZL</Avatar>
        <Avatar style={{ backgroundColor: '#87d068', margin: 4 }}>YZ</Avatar>
      </div>
      <div>
        <Avatar
          alt="a cat"
          src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
          style={{ margin: 4 }}
        />
        <Avatar
          alt="a cat"
          size="small"
          src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
          style={{ margin: 4 }}
        />
      </div>
      <div>
        <Avatar style={{ margin: 4 }}>U</Avatar>
        <Avatar shape="square" style={{ margin: 4 }}>
          U
        </Avatar>
      </div>
      <AvatarGroup>
        <Avatar color="red">LL</Avatar>
        <Avatar>CX</Avatar>
        <Avatar color="amber">RM</Avatar>
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>ZL</Avatar>
        <Avatar style={{ backgroundColor: '#87d068' }}>YZ</Avatar>
      </AvatarGroup>

      <br/>
      <AvatarGroup overlapFrom={'end'}>
        <Avatar color="red">LL</Avatar>
        <Avatar>CX</Avatar>
        <Avatar color="amber">RM</Avatar>
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>ZL</Avatar>
        <Avatar style={{ backgroundColor: '#87d068' }}>YZ</Avatar>
      </AvatarGroup>
      <br/>
      <AvatarGroup maxCount={3}>
        <Avatar color="red">LL</Avatar>
        <Avatar>CX</Avatar>
        <Avatar color="amber">RM</Avatar>
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>ZL</Avatar>
        <Avatar style={{ backgroundColor: '#87d068' }}>YZ</Avatar>
      </AvatarGroup>
    </div>
  )
})

// @ts-ignore
AvatarDemo.props = vuePropsType

export default AvatarDemo

