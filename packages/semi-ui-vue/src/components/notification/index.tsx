import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import ConfigContext, {ContextValue} from '../configProvider/context';
import NotificationListFoundation, {
  ConfigProps, NotificationListAdapter,
  NotificationListProps,
  NotificationListState
} from '@douyinfe/semi-foundation/notification/notificationListFoundation';
import {cssClasses, strings} from '@douyinfe/semi-foundation/notification/constants';
import Notice from './notice';
import '@douyinfe/semi-foundation/notification/notification.scss';
import NoticeTransition from './NoticeTransition';
import getUuid from '@douyinfe/semi-foundation/utils/uuid';
import useNotification from './useNotification';
import {
  NoticeInstance,
  NoticePosition,
  NoticeProps,
  NoticeState
} from '@douyinfe/semi-foundation/notification/notificationFoundation';
import {
  defineComponent,
  h,
  reactive,
  useSlots,
  CSSProperties,
  Fragment,
  createVNode,
  createApp,
  App,
  onUnmounted
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useConfigContext} from "../configProvider/context/Consumer";
import {useBaseComponent} from "../_base/baseComponent";
import {BannerProps} from "../banner";
// TODO: Automatic folding + unfolding function when there are more than N

export type {NoticeTransitionProps} from './NoticeTransition';

export interface NoticeReactProps extends NoticeProps {
  style?: CSSProperties;
}

export type {
  NoticeState,
  NotificationListProps,
  NotificationListState,
  ConfigProps
};

export type NoticesInPosition = {
  top: NoticeInstance[];
  topLeft: NoticeInstance[];
  topRight: NoticeInstance[];
  bottom: NoticeInstance[];
  bottomLeft: NoticeInstance[];
  bottomRight: NoticeInstance[];
};


const defaultConfig = {
  duration: 3,
  position: 'topRight' as NoticePosition,
  motion: true,
  content: '',
  title: '',
  zIndex: 1010,
};

const propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  direction: String,
  ref: [Function, Object]
};
const defaultProps = {};

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const NotificationList = defineComponent<NotificationListProps>((props, {expose}) => {

  const slots = useSlots()
  let noticeStorage: NoticeInstance[] = [];
  let removeItemStorage: NoticeInstance[] = [];

  const state = reactive<NotificationListState>({
    notices: [],
    removedItems: [],
  })

  const {adapter: adapterInject} = useBaseComponent<BannerProps>(props, state)

  onUnmounted(()=>{
    console.log('卸载')
  })
  function adapter_(): NotificationListAdapter {
    return {
      ...adapterInject(),
      updateNotices: (notices: NoticeInstance[], removedItems: NoticeInstance[] = []) => {
        console.log(notices, removedItems)
        noticeStorage = [...notices];
        removeItemStorage = [...removedItems];
        // setState is async sometimes and react often merges state, so use "this" , make sure other code always get right data.
        state.notices = notices
        state.removedItems = removedItems
      },
      getNotices: () => noticeStorage,
    };
  }

  const adapter = adapter_()
  const foundation = new NotificationListFoundation(adapter);

  const {context} = useConfigContext()

  const add = (noticeOpts: NoticeProps) => foundation.addNotice(noticeOpts);

  const remove = (id: string | number) => {
    console.log(id)
    foundation.removeNotice(String(id));
  };

  const destroyAll = () => foundation.destroyAll();


  const renderNoticeInPosition = (
    notices: NoticeInstance[],
    position: NoticePosition,
    removedItems: NoticeInstance[] = []
  ) => {
    const className = cls(cssClasses.LIST);
    // TODO notifyOnClose
    if (notices.length) {
      const style = setPosInStyle(notices[0]);
      return (
        <div
          // @ts-ignore
          placement={position}
          key={position}
          class={className}
          style={style}
        >
          {notices.map((notice, index) => {

            console.log(notice.motion, removedItems)
             return (notice.motion ? (
                <NoticeTransition
                  key={notice.id || index}
                  position={position}
                  motion={notice.motion}
                  children={removedItems.find(item => item.id === notice.id) ?
                    null :
                    transitionStyle => (
                      <Notice
                        {...notice}
                        style={{...transitionStyle, ...notice.style}}
                        key={notice.id}
                        close={remove}
                      />
                    )}>

                </NoticeTransition>
              ) : (
                <Notice {...notice} style={{...notice.style}} key={notice.id} close={remove}/>
              ))
            }
          )}
        </div>
      );
    }
    return null;
  };

  function setPosInStyle(noticeInstance: NoticeInstance) {
    const style:CSSProperties = {};
    ['top', 'left', 'bottom', 'right'].forEach(pos => {
      if (pos in noticeInstance) {
        const val = noticeInstance[pos];
        style[pos] = typeof val === 'number' ? `${val}px` : val;
      }
    });
    return style;
  }

  expose({
    add,
    remove,
    destroyAll
  })

  return () => {
    let {notices} = state;
    const {removedItems} = state;
    notices = Array.from(new Set([...notices, ...removedItems]));
    const noticesInPosition: NoticesInPosition = {
      top: [],
      topLeft: [],
      topRight: [],
      bottom: [],
      bottomLeft: [],
      bottomRight: [],
    };
    notices.forEach(notice => {
      const direction = notice.direction || context.value.direction;
      const defaultPosition = direction === 'rtl' ? 'topLeft' : 'topRight';
      const position = notice.position || defaultPosition;
      noticesInPosition[position].push(notice);
    });
    console.log(noticesInPosition)
    const noticesList = Object.entries(noticesInPosition).map(obj => {
      const pos = obj[0];
      const noticesInPos = obj[1];
      return renderNoticeInPosition(noticesInPos, pos as NoticePosition, removedItems);
    });

    console.log(noticesList)

    return <Fragment>{noticesList}</Fragment>;
  }
})

NotificationList.props = vuePropsType
NotificationList.name = 'NotificationList'

export default NotificationList

export class NotificationListClass {
  static app: App<Element>
  static useNotification: typeof useNotification = useNotification;
  private static wrapperId: string;
  static NotificationListRef = null;

  static addNotice(notice: NoticeProps) {
    const id = getUuid('notification');
    if (!this.NotificationListRef) {
      const {getPopupContainer} = notice;
      const div = document.createElement('div');
      if (!this.wrapperId) {
        this.wrapperId = getUuid('notification-wrapper').slice(0, 32);
      }
      div.className = cssClasses.WRAPPER;
      div.id = this.wrapperId;
      div.style.zIndex = String(typeof notice.zIndex === 'number' ? notice.zIndex : defaultConfig.zIndex);
      if (getPopupContainer) {
        const container = getPopupContainer();
        container.appendChild(div);
      } else {
        document.body.appendChild(div);
      }
      this.app = createApp(() => createVNode(
        NotificationList,
        {
          ref: (instance: any) => {
            console.log(instance)
            if (!this.NotificationListRef) {
              instance.add({...notice, id});
            }
            this.NotificationListRef = instance
          }
        })
      );
      this.app.mount(div)
    } else {
      this.NotificationListRef.add({...notice, id});
    }
    return id;
  }

  static removeNotice(id: string) {
    if (this.NotificationListRef) {
      this.NotificationListRef.remove(id);
    }

    return id;
  }

  static info(opts: NoticeProps) {
    return this.addNotice({...defaultConfig, ...opts, type: 'info'});
  }

  static success(opts: NoticeProps) {
    return this.addNotice({...defaultConfig, ...opts, type: 'success'});
  }

  static error(opts: NoticeProps) {
    return this.addNotice({...defaultConfig, ...opts, type: 'error'});
  }

  static warning(opts: NoticeProps) {
    return this.addNotice({...defaultConfig, ...opts, type: 'warning'});
  }

  static open(opts: NoticeProps) {
    return this.addNotice({...defaultConfig, ...opts, type: 'default'});
  }

  static close(id: string) {
    return this.removeNotice(id);
  }

  static destroyAll() {
    if (this.NotificationListRef) {
      this.NotificationListRef.destroyAll();
      const wrapper = document.querySelector(`#${this.wrapperId}`);
      this.app.unmount()
      // ReactDOM.unmountComponentAtNode(wrapper);
      wrapper && wrapper.parentNode.removeChild(wrapper);
      this.NotificationListRef = null;
      this.wrapperId = null;
    }
  }

  static config(opts: ConfigProps) {
    ['top', 'left', 'bottom', 'right'].map(pos => {
      if (pos in opts) {
        defaultConfig[pos] = opts[pos];
      }
    });

    if (typeof opts.zIndex === 'number') {
      defaultConfig.zIndex = opts.zIndex;
    }
    if (typeof opts.duration === 'number') {
      defaultConfig.duration = opts.duration;
    }
    if (typeof opts.position === 'string') {
      defaultConfig.position = opts.position as NoticePosition;
    }
  }

}

