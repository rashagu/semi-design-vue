import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Badge from "../index";
import {Avatar} from "../../index";
import {IconLock} from "@kousum/semi-icons-vue";

interface BadgeDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const BadgeDemo = defineComponent((props, {}) => {
  const slots = useSlots()


  return () => {

    const style = {
      width: '42px',
      height: '42px',
      borderRadius: '4px',
    };
    return (
      <div>
        <Badge count={5}>
          <Avatar color='blue' shape='square' style={style}>BM</Avatar>
        </Badge>
        <br/>
        <br/>
        <Badge dot>
          <Avatar color='blue' shape='square' style={style}>YL</Avatar>
        </Badge>
        <br/>
        <br/>
        <Badge count={<IconLock style={{ color: 'var(--semi-color-primary)' }}/>}>
          <Avatar color='light-blue' shape='square' style={style}>XZ</Avatar>
        </Badge>
        <br/>
        <br/>
        <Badge count='NEW' >
          <Avatar color='light-blue' shape='square' style={style}>WF</Avatar>
        </Badge>
      </div>
    );
  }
})

// @ts-ignore
BadgeDemo.props = vuePropsType
// @ts-ignore
BadgeDemo.name = 'BadgeDemo'

export default BadgeDemo

