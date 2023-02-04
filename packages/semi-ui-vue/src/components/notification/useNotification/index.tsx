import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/notification/constants';
import HookNotice from './HookNotice';
import '@douyinfe/semi-foundation/notification/notification.scss';
import getUuid from '@douyinfe/semi-foundation/utils/uuid';
import type {
  NoticeInstance,
  NoticePosition,
  NoticeProps,
} from '@douyinfe/semi-foundation/notification/notificationFoundation';
import type { NoticesInPosition } from '../index';
import { VueJsxNode } from '../../interface';
import { Fragment, h, Ref, ref, VNode, watch } from 'vue';
// TODO: Automatic folding + unfolding function when there are more than N

const defaultConfig = {
  duration: 3,
  position: 'topRight' as NoticePosition,
  motion: true,
  content: '',
  title: '',
  zIndex: 1010,
};

function usePatchElement(): [()=>VNode[], typeof patchElement] {
  const elements = ref([]);

  function setElements(val: any) {
    elements.value = val;
  }
  // TODO
  function patchElement(element: ()=>VNode, config: NoticeInstance) {
    setElements([{ element, config }, ...elements.value]);


    return (id: string) => {
      setElements(elements.value.filter(({ config: configOfCurrentElement }) => {
        console.log(configOfCurrentElement.id, id)
        return configOfCurrentElement.id !== id
      }));
    };
  }

  function renderList() {
    const noticesInPosition: NoticesInPosition = {
      top: [],
      topLeft: [],
      topRight: [],
      bottom: [],
      bottomLeft: [],
      bottomRight: [],
    };
    elements.value.forEach(({ element, config }) => {
      const { position } = config;
      noticesInPosition[position].push(element);
    });
    return Object.entries(noticesInPosition).map((obj) => {
      const pos = obj[0];
      const notices = obj[1];
      return Array.isArray(notices) && notices.length ? (
        // @ts-ignore
        <div key={pos} class={cls(cssClasses.LIST)} placement={pos}>
          {/*// @ts-ignore*/}
          {notices.map(item=>item())}
        </div>
      ) : null;
    });
  }

  return [renderList, patchElement];
}

type NotificationFunType = {
    success: (config: NoticeProps) => string;
    info: (config: NoticeProps) => string;
    error: (config: NoticeProps) => string;
    warning: (config: NoticeProps) => string;
    open: (config: NoticeProps) => string;
    close: (instanceID: string) => void;
};
export default function useNotification():[NotificationFunType, ()=>VNode[]] {
  const [elements, patchElement] = usePatchElement();
  const noticeRef = new Map<string, { close: () => void } & Element>();

  const addNotice = (config: NoticeProps) => {
    const id = getUuid('semi_notice_');
    const mergeConfig = {
      ...config,
      id,
    };
    // eslint-disable-next-line prefer-const
    let closeFunc: ReturnType<typeof patchElement>;
    const ref = (ele: any) => {
      noticeRef.set(id, ele);
    };
    const notice = ()=>(
      <HookNotice key={id} {...mergeConfig} afterClose={(instanceID: string) => closeFunc(instanceID)} ref={ref} />
    );
    closeFunc = patchElement(notice, { ...mergeConfig });
    return id;
  };

  const removeElement = (instanceID: string) => {
    const ele = noticeRef.get(instanceID);
    ele && ele.close();
  };
  return [
    {
      success: (config: NoticeProps) => addNotice({ ...defaultConfig, ...config, type: 'success' }),
      info: (config: NoticeProps) => addNotice({ ...defaultConfig, ...config, type: 'info' }),
      error: (config: NoticeProps) => addNotice({ ...defaultConfig, ...config, type: 'error' }),
      warning: (config: NoticeProps) => addNotice({ ...defaultConfig, ...config, type: 'warning' }),
      open: (config: NoticeProps) => addNotice({ ...defaultConfig, ...config, type: 'default' }),
      close: removeElement,
    },
    elements,
  ];
}
