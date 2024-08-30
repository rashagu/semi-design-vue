import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import Avatar from '../index';
import AvatarGroup from '../avatarGroup';

interface AvatarGroupDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<AvatarGroupDemoProps> = {
  name: String,
};
const AvatarGroupDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'AvatarGroupDemo',
  setup(props, { attrs }) {
    const slots = useSlots();
    const roleInfo = [
      {
        name: 'User',
        avatar: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png'
      }
    ]

    return () => (
      <AvatarGroup size="extra-extra-small">
        {roleInfo.map((s, index) => (<Avatar key={index} src={s.avatar}></Avatar>))}
      </AvatarGroup>
    );
  },
});


export default AvatarGroupDemo;

