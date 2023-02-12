import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Rating from "../index";
import {IconLikeHeart} from "@kousum/semi-icons-vue";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const RatingDemo = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  const value = ref(1)
  return () => (
    <div>
      <div>
        <Rating style={{ color:'red' }} value={value.value} character={(<IconLikeHeart size="extra-large" />)}
        onChange={(v)=>{
          console.log(v)
          value.value = v
        }}/>
        <br/>
        <br/>
        <Rating style={{ color:'red' }} size={48} allowHalf character={(<IconLikeHeart style={{ fontSize: 48 }} />)} defaultValue={3}/>
        <br/>
        <br/>
        <Rating character={'赞'} size={18} defaultValue={3}/>
        <br/>
        <br/>
        <Rating count={10} defaultValue={6}/>
      </div>
    </div>
  )
})

RatingDemo.props = vuePropsType
RatingDemo.name = 'RatingDemo'

export default RatingDemo

