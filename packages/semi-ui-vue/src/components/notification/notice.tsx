import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, numbers, strings } from '@douyinfe/semi-foundation/notification/constants';
import NotificationFoundation, {
  NoticeAdapter,
  NoticeProps,
  NoticeState,
} from '@douyinfe/semi-foundation/notification/notificationFoundation';
import Button from '../iconButton';
import { useBaseComponent } from '../_base/baseComponent';
import { isSemiIcon } from '../_utils';
import { noop } from 'lodash';
import { IconAlertCircle, IconAlertTriangle, IconClose, IconInfoCircle, IconTickCircle } from '@kousum/semi-icons-vue';
import { getUuidShort } from '@douyinfe/semi-foundation/utils/uuid';
import {
  cloneVNode,
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  useSlots,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useConfigContext } from '../configProvider/context/Consumer';
import { VueJsxNode } from '../interface';

export interface NoticeReactProps extends NoticeProps {
  style?: CSSProperties;
  title?: VueJsxNode;
  content?: VueJsxNode;
  icon?: VueJsxNode;
  onClick?: (e: MouseEvent) => void;
}

const prefixCls = cssClasses.NOTICE;
const { duration } = numbers;
const { types, themes, directions } = strings;

const propTypes: ComponentObjectPropsOptions<NoticeReactProps> = {
  duration: PropTypes.number,
  id: PropTypes.string,
  title: PropTypes.node,
  content: PropTypes.node, // strings、numbers、array、element
  type: String as PropType<NoticeReactProps['type']>,
  theme: String as PropType<NoticeReactProps['theme']>,
  icon: PropTypes.node,
  onClick: PropTypes.func as PropType<NoticeReactProps['onClick']>,
  onClose: PropTypes.func as PropType<NoticeReactProps['onClose']>,
  onCloseClick: PropTypes.func as PropType<NoticeReactProps['onCloseClick']>,
  showClose: PropTypes.bool,
  // private props
  close: PropTypes.func as PropType<NoticeReactProps['close']>,
  direction: String as PropType<NoticeReactProps['direction']>,
  onHookClose: PropTypes.func as PropType<NoticeReactProps['onHookClose']>,
};
const defaultProps = {
  duration,
  id: '',
  close: noop,
  onClose: noop,
  onClick: noop,
  onCloseClick: noop,
  content: '',
  title: '',
  showClose: true,
  theme: 'normal',
};

export const vuePropsType = vuePropsMake<NoticeReactProps>(propTypes, defaultProps);
const Notice = defineComponent({
  props: vuePropsType,
  name: 'Notice',
  setup(props, { expose }) {
    const slots = useSlots();

    const state = reactive<NoticeState>({
      visible: true,
    });

    const { adapter: adapterInject } = useBaseComponent<NoticeReactProps>(props, state);
    function adapter_(): NoticeAdapter {
      return {
        ...adapterInject(),
        notifyWrapperToRemove: (id: string) => {
          props.close(id);
        },
        notifyClose: () => {
          props.onClose();
          props.onHookClose && props.onHookClose();
        },
      };
    }
    const adapter = adapter_();
    const foundation = new NotificationFoundation(adapter);

    const { context } = useConfigContext();

    onMounted(() => {
      foundation.init();
    });

    onUnmounted(() => {
      foundation.destroy();
    });

    function renderTypeIcon() {
      const { type, icon } = props;
      const iconMap = {
        warning: <IconAlertTriangle size="large" />,
        success: <IconTickCircle size="large" />,
        info: <IconInfoCircle size="large" />,
        error: <IconAlertCircle size="large" />,
      };
      let iconType = iconMap[type];
      const iconCls = cls({
        [`${prefixCls}-icon`]: true,
        [`${prefixCls}-${type}`]: true,
      });
      if (icon) {
        iconType = icon;
      }
      if (iconType) {
        return (
          <div class={iconCls} x-semi-prop="icon">
            {isSemiIcon(iconType) ? cloneVNode(iconType, { size: iconType.props.size || 'large' }) : iconType}
          </div>
        );
      }
      return null;
    }

    const clearCloseTimer = () => {
      foundation._clearCloseTimer();
    };

    const startCloseTimer = () => {
      foundation._startCloseTimer();
    };

    const close = (e: MouseEvent) => {
      props.onCloseClick(props.id);
      foundation.close(e);
    };

    const notifyClick = (e: MouseEvent) => {
      props.onClick(e);
    };

    expose({
      getFoundation() {
        return foundation;
      },
    });

    return () => {
      const direction = props.direction || context.value.direction;
      const defaultPosition = direction === 'rtl' ? 'topLeft' : 'topRight';
      const {
        content,
        title,
        theme,
        position = defaultPosition,
        type,
        id,
        onCloseClick,
        className,
        showClose,
        style,
        ...attr
      } = props;
      const { visible } = state;
      const wrapper = cls(prefixCls, className, {
        [`${prefixCls}-close`]: !visible,
        [`${prefixCls}-icon-show`]: types.includes(type),
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-${theme}`]: theme === 'light',
        [`${prefixCls}-rtl`]: direction === 'rtl',
      });
      const titleID = getUuidShort({});
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          class={wrapper}
          style={style}
          onMouseenter={clearCloseTimer}
          onMouseleave={startCloseTimer}
          onClick={notifyClick}
          aria-labelledby={titleID}
          role={'alert'}
        >
          <div>{renderTypeIcon()}</div>
          <div class={`${prefixCls}-inner`}>
            <div class={`${prefixCls}-content-wrapper`}>
              {title ? (
                <div id={titleID} class={`${prefixCls}-title`} x-semi-prop="title">
                  {title}
                </div>
              ) : (
                ''
              )}
              {content ? (
                <div class={`${prefixCls}-content`} x-semi-prop="content">
                  {content}
                </div>
              ) : (
                ''
              )}
            </div>
            {showClose && (
              <Button
                className={`${prefixCls}-icon-close`}
                type="tertiary"
                icon={<IconClose />}
                theme="borderless"
                size="small"
                onClick={close}
              />
            )}
          </div>
        </div>
      );
    };
  },
});

export default Notice;
