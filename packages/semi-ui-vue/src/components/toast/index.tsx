import * as PropTypes from '../PropTypes';
import ToastListFoundation, {
  ToastListAdapter,
  ToastListProps,
  ToastListState,
} from '@douyinfe/semi-foundation/toast/toastListFoundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/toast/constants';
import Toast from './toast';
import '@douyinfe/semi-foundation/toast/toast.scss';
import getUuid from '@douyinfe/semi-foundation/utils/uuid';
import useToast from './useToast';
import { ConfigProps, ToastInstance, ToastProps, ToastState } from '@douyinfe/semi-foundation/toast/toastFoundation';
import CSSAnimation from '../_cssAnimation';
import cls from 'classnames';
import { Motion } from '../_base/base';
import {
  CSSProperties,
  defineComponent,
  h,
  reactive,
  useSlots,
  Fragment,
  render,
  createApp,
  App,
  ref,
  createVNode,
} from 'vue';
import { VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';


export interface ToastReactProps extends ToastProps {
  id?: string;
  style?: CSSProperties;
  icon?: VueJsxNode;
  content: VueJsxNode;
}

export type { ConfigProps, ToastListProps, ToastListState, ToastState };

const propTypes = {
  content: PropTypes.node,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  icon: PropTypes.node,
  direction: String,
  ref: [Function, Object],
};
const defaultProps = {};
const vuePropsType = vuePropsMake(propTypes, defaultProps);

const ToastList = defineComponent<ToastListProps>((props, { expose }) => {
  const slots = useSlots();

  const state = reactive<ToastListState>({
    list: [],
    removedItems: [],
    updatedItems: [],
  });

  const { adapter: adapterInject } = useBaseComponent<ToastListProps>(props, state);

  function adapter_(): ToastListAdapter {
    return {
      ...adapterInject<ToastListProps, ToastListState>(),
      updateToast: (list: ToastInstance[], removedItems: ToastInstance[], updatedItems: ToastInstance[]) => {
        state.list = list;
        state.removedItems = removedItems;
        state.updatedItems = updatedItems;
      },
    };
  }

  const adapter = adapter_();
  const foundation = new ToastListFoundation(adapter);

  function has(id: string) {
    return foundation.hasToast(id);
  }

  function add(opts: ToastInstance) {
    return foundation.addToast(opts);
  }

  function update(id: string, opts: ToastInstance) {
    return foundation.updateToast(id, opts);
  }

  function remove(id: string) {
    return foundation.removeToast(id);
  }

  function destroyAll() {
    return foundation.destroyAll();
  }

  expose({
    has,
    add,
    update,
    remove,
    destroyAll,
  });

  return () => {
    let { list } = state;
    const { removedItems, updatedItems } = state;
    list = Array.from(new Set([...list, ...removedItems]));
    const updatedIds = updatedItems.map(({ id }) => id);

    const refFn = (toast) => {
      if (toast?.foundation?._id && updatedIds.includes(toast.foundation._id)) {
        toast.foundation.setState({ duration: toast.props.duration });
        toast.foundation.restartCloseTimer();
      }
    };

    return (
      <Fragment>
        {list.map((item, index) => {
          const isRemoved = removedItems.find((removedItem) => removedItem.id === item.id) !== undefined;
          return (
            <CSSAnimation
              key={item.id}
              motion={item.motion}
              animationState={isRemoved ? 'leave' : 'enter'}
              startClassName={isRemoved ? `${cssClasses.PREFIX}-animation-hide` : `${cssClasses.PREFIX}-animation-show`}
              children={({ animationClassName, animationEventsNeedBind, isAnimating }) => {
                return isRemoved && !isAnimating ? null : (
                  <Toast
                    {...item}
                    className={cls({
                      [item.className]: Boolean(item.className),
                      [animationClassName]: true,
                    })}
                    {...animationEventsNeedBind}
                    style={{ ...item.style }}
                    close={(id) => remove(id)}
                    ref={refFn}
                  />
                );
              }}
            >
            </CSSAnimation>
          );
        })}
      </Fragment>
    );
  };
}, {
  props: vuePropsType,
  name: 'ToastList'
});
// ToastList.props = vuePropsType;
// ToastList.name = 'ToastList';
export { ToastList };

const createBaseToast = () => {
  return ToastList;
};

export type ToastListType = {
  has: (id: string) => boolean;
  add: (opts: ToastInstance) => void;
  update: (id: string, opts: ToastInstance) => void;
  remove: (id: string) => void;
  destroyAll: () => void;
};
export function useToastHook(configProps?: ConfigProps) {
  let createApp_: App<Element>;
  let ToastListRef: ToastListType;
  const defaultOpts: ToastReactProps & { motion: Motion } = {
    motion: true,
    zIndex: 1010,
    content: '',
  };
  let wrapperId: null | string;

  configProps && config(configProps);

  function create(opts: ToastReactProps) {
    const id = opts.id ?? getUuid('toast');
    // id = id;
    if (!ToastListRef) {
      const div = document.createElement('div');
      if (!wrapperId) {
        wrapperId = getUuid('toast-wrapper').slice(0, 26);
      }
      div.className = cssClasses.WRAPPER;
      div.id = wrapperId;
      div.style.zIndex = String(typeof opts.zIndex === 'number' ? opts.zIndex : defaultOpts.zIndex);
      ['top', 'left', 'bottom', 'right'].map((pos) => {
        if (pos in defaultOpts || pos in opts) {
          const val = opts[pos] ? opts[pos] : defaultOpts[pos];
          div.style[pos] = typeof val === 'number' ? `${val}px` : val;
        }
      });
      // document.body.appendChild(div);
      if (defaultOpts.getPopupContainer) {
        const container = defaultOpts.getPopupContainer();
        container.appendChild(div);
      } else {
        document.body.appendChild(div);
      }
      createApp_ = createApp(() =>
        createVNode(ToastList, {
          ref: (instance: any) => {
            if (!ToastListRef) {
              instance.add({ ...opts, id });
            }
            ToastListRef = instance;
          },
        })
      );
      createApp_.mount(div);
    } else {
      const node = document.querySelector(`#${wrapperId}`) as HTMLElement;
      ['top', 'left', 'bottom', 'right'].map((pos) => {
        if (pos in opts) {
          node.style[pos] = typeof opts[pos] === 'number' ? `${opts[pos]}px` : opts[pos];
        }
      });
      if (ToastListRef.has(id)) {
        ToastListRef.update(id, { ...opts, id });
      } else {
        ToastListRef.add({ ...opts, id });
      }
    }
    return id;
  }

  function close(id: string) {
    if (ToastListRef) {
      ToastListRef.remove(id);
    }
  }

  function destroyAll() {
    if (ToastListRef) {
      ToastListRef.destroyAll();
      const wrapper = document.querySelector(`#${wrapperId}`);
      createApp_.unmount();
      // ReactDOM.unmountComponentAtNode(wrapper);
      wrapper && wrapper.parentNode.removeChild(wrapper);
      ToastListRef = null;
      wrapperId = null;
    }
  }

  function getWrapperId() {
    return wrapperId;
  }

  function info(opts: Omit<ToastReactProps, 'type'> | string) {
    if (typeof opts === 'string') {
      opts = { content: opts };
    }
    return create({ ...defaultOpts, ...opts, type: 'info' });
  }

  function warning(opts: Omit<ToastReactProps, 'type'> | string) {
    if (typeof opts === 'string') {
      opts = { content: opts };
    }
    return create({ ...defaultOpts, ...opts, type: 'warning' });
  }

  function error(opts: Omit<ToastReactProps, 'type'> | string) {
    if (typeof opts === 'string') {
      opts = { content: opts };
    }
    return create({ ...defaultOpts, ...opts, type: 'error' });
  }

  function success(opts: Omit<ToastReactProps, 'type'> | string) {
    if (typeof opts === 'string') {
      opts = { content: opts };
    }
    return create({ ...defaultOpts, ...opts, type: 'success' });
  }

  function config(opts: ConfigProps) {
    ['top', 'left', 'bottom', 'right'].forEach((pos) => {
      if (pos in opts) {
        defaultOpts[pos] = opts[pos];
      }
    });

    if (typeof opts.zIndex === 'number') {
      defaultOpts.zIndex = opts.zIndex;
    }
    if (typeof opts.duration === 'number') {
      defaultOpts.duration = opts.duration;
    }
    if (typeof opts.getPopupContainer === 'function') {
      defaultOpts.getPopupContainer = opts.getPopupContainer;
    }
  }

  return {
    create,
    close,
    destroyAll,
    getWrapperId,
    info,
    warning,
    error,
    success,
    config,

    useToast,
  };
}

export class ToastFactory {
  static create(config?: ConfigProps): ReturnType<typeof useToastHook> {
    return useToastHook(config);
  }
}

export default ToastFactory.create();
