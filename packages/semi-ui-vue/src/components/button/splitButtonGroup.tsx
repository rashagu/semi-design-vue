import {
  defineComponent,
  ref,
  h,
  onActivated,
  Fragment,
  StyleValue,
  ComponentObjectPropsOptions,
  onMounted,
  onUnmounted,
} from 'vue';
import classNames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/button/constants';
import '@douyinfe/semi-foundation/button/button.scss';
import { BaseProps } from '../_base/baseComponent';
import { CombineProps } from '../interface';

const prefixCls = cssClasses.PREFIX;

// eslint-disable-next-line
export interface SplitButtonGroupProps extends BaseProps {}

export const vuePropsType: CombineProps<SplitButtonGroupProps> = {
  style: Object,
  className: String,
};
const SplitButtonGroup = defineComponent({
  props: { ...vuePropsType },
  name: 'SplitButtonGroup',
  setup(props, { slots }) {
    const containerRef = ref();
    let mutationObserver: MutationObserver | null = null;

    onMounted(() => {
      const addClassName = () => {
        const buttons = containerRef.value.querySelectorAll('button');
        const firstButton = buttons[0];
        const lastButton = buttons[buttons.length - 1];
        if (!firstButton?.classList.contains(`${prefixCls}-first`)) {
          firstButton?.classList.add(`${prefixCls}-first`);
        }
        if (!lastButton?.classList.contains(`${prefixCls}-last`)) {
          lastButton?.classList.add(`${prefixCls}-last`);
        }
      };
      if (containerRef.value) {
        addClassName();
        const mutationObserver_ = new MutationObserver((mutations, observer) => {
          for (const mutation of mutations) {
            if (
              (mutation.type === 'attributes' && mutation.attributeName === 'class') ||
              (mutation.type === 'childList' &&
                Array.from(mutation.addedNodes).some((node) => node.nodeName === 'BUTTON'))
            ) {
              addClassName();
            }
          }
        });
        mutationObserver_.observe(containerRef.value, { attributes: true, childList: true, subtree: true });
        mutationObserver = mutationObserver_;
      }
    });

    onUnmounted(() => {
      mutationObserver?.disconnect();
    });

    return () => {
      const { style, className } = props;
      const cls = classNames(`${prefixCls}-split`, className);
      return (
        <div ref={containerRef} class={cls} style={style} role="group" aria-label={props['aria-label']}>
          {slots.default ? slots.default() : null}
        </div>
      );
    };
  },
});

export default SplitButtonGroup;
