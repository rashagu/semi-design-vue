import {defineComponent, ref, h, Fragment, useSlots} from 'vue';
import Switch from "../../switch";
import Skeleton, {SkeletonAvatar, SkeletonButton, SkeletonImage, SkeletonParagraph, SkeletonTitle} from '../index'
import Avatar from "../../avatar";
import Button from "../../button";

interface SkeletonDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const SkeletonDemo = defineComponent((props, {}) => {
  const slots = useSlots();
  const loading = ref(true);
  const showContent = () => {
    loading.value = !loading.value
  };
  return () => (
    <>
      {'loading.value:' + (loading.value?"true":'false')}
      <span style={{display: 'flex', alignItems: 'center'}}>
        <Switch onChange={() => showContent()}/>
        <span style={{marginLeft: '10px'}}>显示加载内容</span>
      </span>
      <br/>
      <Skeleton placeholder={<SkeletonAvatar/>} loading={loading.value}>
        <Avatar color="blue" style={{marginBottom: 10}}>
          U
        </Avatar>
      </Skeleton>
      <br/>
      <Skeleton style={{width: 200, height: 150}} placeholder={<SkeletonImage/>} loading={loading.value}>
        <img
          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
          height="150"
          alt="avatar"
        />
      </Skeleton>
      <br/>
      <Skeleton style={{width: 80}} placeholder={<SkeletonTitle style={{marginBottom: 10}}/>} loading={loading.value}>
        <h4 style={{marginBottom: 0}}>Semi UI</h4>
      </Skeleton>
      <Skeleton style={{width: 240}} placeholder={<SkeletonParagraph rows={2}/>} loading={loading.value}>
        <p style={{width: 240}}>精心打磨每一个组件的用户体验，从用户的角度考虑每个组件的使用场景。</p>
      </Skeleton>
      <br/>
      <Skeleton placeholder={<SkeletonButton/>} loading={loading.value}>
        <Button>Button</Button>
      </Skeleton>
    </>
  );
});




export default SkeletonDemo;
