import getUuid from '@douyinfe/semi-foundation/utils/uuid';
import HookToast from './HookToast';
import { ToastInstance, ToastProps } from '@douyinfe/semi-foundation/toast/toastFoundation';
import { h, Fragment, ref, Ref, VNode, watch, shallowRef, unref } from 'vue';
import { noop } from 'lodash';

// const ref = null;
// TODO: toast larger than N bars, automatic folding, allowing expansion, N configurable

const defaultOpts = {
  motion: true,
  zIndex: 1010,
  duration: 3,
};

function usePatchElement(): [Ref<any[]>, typeof patchElement] {
  const elements = ref([]);
  function patchElement(element: any, config: ToastInstance) {
    elements.value = [{ element, config }, ...unref(elements)]

    return (id: string) => {
      elements.value = unref(elements).filter(({ config: configOfCurrentElement }) => configOfCurrentElement.id !== id)
    };
  }

  return [elements, patchElement];
}

export type ToastFuncType = {
  success: (config: ToastProps) => string;
  info: (config: ToastProps) => string;
  error: (config: ToastProps) => string;
  warning: (config: ToastProps) => string;
  open: (config: ToastProps) => string;
  close: (id: string) => void;
};

export default function useToast(): [ToastFuncType, Ref<VNode>] {
  const [elements, patchElement] = usePatchElement();
  const toastRef = new Map<string, { close: () => void }>();

  const addToast = (config: ToastProps) => {
    const id = getUuid('semi_toast_');
    const mergeConfig = {
      ...config,
      id,
    };
    // eslint-disable-next-line prefer-const
    let closeFunc: ReturnType<typeof patchElement>;

    const toast = (
      <HookToast
        {...mergeConfig}
        key={id}
        afterClose={(instanceId) => closeFunc(instanceId)}
        onMyMounted={(data: { close: () => void }) => {
          toastRef.set(id, { close: data?.close ?? noop });
        }}
      />
    );
    closeFunc = patchElement(toast, { ...mergeConfig });
    return id;
  };

  const removeElement = (id: string) => {
    const ele = toastRef.get(id);
    ele && ele.close();
  };

  const dom = ref<VNode>();
  watch(
    () => elements.value,
    (value) => {
      dom.value = (
        <Fragment>
          {Array.isArray(elements.value) && elements.value.length ? (
            <Fragment>{elements.value.map((item) => item.element)}</Fragment>
          ) : null}
        </Fragment>
      );
    }
  );
  return [
    {
      success: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'success' }),
      info: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'info' }),
      error: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'error' }),
      warning: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'warning' }),
      open: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'default' }),
      close: (id: string) => removeElement(id),
    },
    dom,
  ];
}
