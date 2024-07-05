import { Transition } from '@kousum/semi-animation-vue';
import { NoticePosition } from '@douyinfe/semi-foundation/notification/notificationFoundation';
import { Motion } from '../_base/base';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  FunctionalComponent,
  h,
  PropType,
  useSlots,
  VNode,
} from 'vue';

export type ArgsType<T> = T extends (...args: infer A) => any ? A : never;

export interface NoticeTransitionProps {
  position?: NoticePosition;
  children: VNode | ((TransitionProps: any) => any) | VNode[] | ((transitionStyle: any) => VNode);
  motion?: Motion<NoticeTransitionProps>;
}

type NoticeTransitionFormatFuncType = (styles: { translate: string; opacity: string | number }) => any;

export const vuePropsType: ComponentObjectPropsOptions<NoticeTransitionProps> = {
  position: String as PropType<NoticeTransitionProps['position']>,
  children: [Object, Function] as PropType<NoticeTransitionProps['children']>,
  motion: [Object, String, Boolean],
};
const NoticeTransition = defineComponent({
  props: vuePropsType,
  name: 'NoticeTransition',
  setup(props, {}) {
    const slots = useSlots();
    let children;

    return () => {
      let { motion = {} } = props;
      const { position = 'topRight' } = props;

      const formatStyle = function formatStyle({ translate, opacity }: ArgsType<NoticeTransitionFormatFuncType>[0]) {
        let transform = `translateX(${translate}%)`;

        if (position && typeof position === 'string') {
          if (/left/i.test(position)) {
            transform = `translateX(${-translate}%)`;
          } else if (/right/i.test(position)) {
            transform = `translateX(${translate}%)`;
          } else if (/top/i.test(position)) {
            transform = `translateY(${-translate}%)`;
          } else {
            transform = `translateY(${translate}%)`;
          }
        }

        return {
          transform,
          opacity,
        };
      };

      if (typeof motion === 'function') {
        motion = motion(props);
      } else if (!motion || typeof motion !== 'object') {
        motion = {};
      }

      // TODO 缓存 children函数 用于退出动画
      if (!children) {
        children = props.children;
      }
      return (
        <Transition
          // onFrame={style => console.log(formatStyle(style))}
          from={{ translate: 100, opacity: 0 }}
          enter={{ translate: { val: 0, tension: 560, friction: 32 }, opacity: { val: 1, duration: 200 } } as any}
          leave={
            {
              translate: { val: 100, easing: 'easeOutCubic', duration: 300 },
              opacity: { val: 0, duration: 200 },
            } as any
          }
          children={
            typeof props.children === 'function'
              ? (transitionStyle: ArgsType<NoticeTransitionFormatFuncType>[0]) => {
                  let children_;
                  if (props.children === null) {
                    children_ = children;
                  } else {
                    children_ = props.children;
                  }
                  return children_?.(formatStyle(transitionStyle));
                }
              : props.children
          }
          {...motion}
        ></Transition>
      );
    };
  },
});

export default NoticeTransition;
