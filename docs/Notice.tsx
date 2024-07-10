import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import './index.scss'
import { IconInfoCircle } from '@kousum/semi-icons-vue';

interface NoticeProps {
  type: string,
  title: string,
  icon: any,
}

export const vuePropsType: CombineProps<NoticeProps> = {
  type: { type: String, default: 'primary' },
  title: String,
  icon: {
    type: [Object, Function, String],
    default: <IconInfoCircle />
  },
};
const Notice = defineComponent<NoticeProps>((props, {}) => {
  const slots = useSlots();


  return () => (
    <div className={`notice ${props.type}`}>
      <div className="notice-icon">
        {props.icon}
      </div>
      <div className="notice-caption">
        {props.title ? <div className="notice-title">{props.title}</div> : null}
        <div className="notice-body">{slots.default?.()}</div>
      </div>
    </div>
  );
}, {
  props: vuePropsType,
  name: 'Notice',
});


export default Notice;

