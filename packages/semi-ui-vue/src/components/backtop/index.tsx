import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { throttle } from 'lodash';
import { cssClasses } from '@douyinfe/semi-foundation/backtop/constants';
import BackTopFoundation, { BackTopAdapter } from '@douyinfe/semi-foundation/backtop/foundation';

import '@douyinfe/semi-foundation/backtop/backtop.scss';
import IconButton from '../iconButton';
import { IconChevronUp } from '@kousum/semi-icons-vue';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  useSlots,
} from 'vue';
import { CombineProps, VueJsxNode } from '../interface';
import { useBaseComponent } from '../_base/baseComponent';
import { TabsProps } from '../tabs';
import { vuePropsMake } from '../PropTypes';

const prefixCls = cssClasses.PREFIX;

const getDefaultTarget = () => window;

export interface BackTopProps {
  target?: () => any;
  visibilityHeight?: number;
  duration?: number;
  onClick?: (e: MouseEvent) => void;
  style?: CSSProperties;
  className?: string;
}

export interface BackTopState {
  visible?: boolean;
}

const defaultProps = {
  visibilityHeight: 400,
  target: getDefaultTarget,
  duration: 450,
};

const propTypes: CombineProps<BackTopProps> = {
  target: PropTypes.func as PropType<BackTopProps['target']>,
  visibilityHeight: PropTypes.number,
  duration: PropTypes.number,
  onClick: PropTypes.func as PropType<BackTopProps['onClick']>,
  style: PropTypes.object,
  className: PropTypes.string,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const BackTop = defineComponent({
  props: vuePropsType,
  name: 'BackTop',
  setup(props, {}) {
    const slots = useSlots();

    let handler: (e: MouseEvent) => void;
    const state = reactive<BackTopState>({
      visible: false,
    });
    const { adapter: adapterInject } = useBaseComponent<TabsProps>(props, state);
    function adapter_(): BackTopAdapter {
      return {
        ...adapterInject(),
        updateVisible: (visible: boolean) => {
          state.visible = visible;
        },
        notifyClick: (e: MouseEvent) => {
          props.onClick && props.onClick(e);
        },
        targetIsWindow: (target: any) => target === window,
        isWindowUndefined: () => window === undefined,
        targetScrollToTop: (targetNode: any, scrollTop: number) => {
          if (targetNode === window) {
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
          } else {
            targetNode.scrollTop = scrollTop;
          }
        },
      };
    }

    const adapter = adapter_();
    const foundation = new BackTopFoundation(adapter);

    onMounted(() => {
      foundation.init();
      handler = throttle(handleClick, props.duration ?? defaultProps.duration);
    });

    onBeforeUnmount(() => {
      foundation.destroy();
    });

    function handleClick(e: MouseEvent) {
      foundation.onClick(e);
    }

    function renderDefault() {
      return <IconButton theme="light" icon={<IconChevronUp />} />;
    }

    return () => {
      const children = slots.default?.();
      const { className, style, onClick, visibilityHeight, target, ...others } = props;
      const { visible } = state;
      const preCls = cls(prefixCls, className);
      const backtopBtn = children ? children : renderDefault();
      const content = visible ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div {...others} class={preCls} style={style} onClick={(e) => handler(e)} x-semi-prop="children">
          {backtopBtn}
        </div>
      ) : null;
      return content;
    };
  },
});

export default BackTop;
