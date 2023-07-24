import getUuid from '@douyinfe/semi-foundation/utils/uuid';
import HookToast from './HookToast';
import { ToastInstance, ToastProps } from '@douyinfe/semi-foundation/toast/toastFoundation';
import {h, Fragment, ref, Ref, VNode, watch, shallowRef} from "vue";
import { noop } from "lodash";

// const ref = null;
// TODO: toast larger than N bars, automatic folding, allowing expansion, N configurable

const defaultOpts = {
    motion: true,
    zIndex: 1010,
    duration: 3,
};

function usePatchElement(): [Ref<any[]>, typeof patchElement] {
  const elements = ref([]);
  function setElements(val: any) {
    elements.value = val;
  }
  function patchElement(element: any, config: ToastInstance) {
    setElements((originElements) => [{ element, config }, ...originElements]);

    return (id: string) => {
      setElements((originElements) =>
        originElements.filter(({ config: configOfCurrentElement }) => configOfCurrentElement.id !== id)
      );
    };
  }

  return [elements, patchElement];
}

type ToastFuncType = {
  success: (config: ToastProps) => string;
  info: (config: ToastProps) => string;
  error: (config: ToastProps) => string;
  warning: (config: ToastProps) => string;
  open: (config: ToastProps) => string;
  close: (id: string) => void;
};

export default function useToast():[ToastFuncType, Ref<VNode>] {
    const [elements, patchElement] = usePatchElement();
  const toastRef = shallowRef(new Map<string, { close: () => void }>());

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
                afterClose={instanceId => closeFunc(instanceId)}
                // TODO
              // @ts-ignore
                ref={(data: { close: () => void }) => {
                  toastRef.value.set(id, { close: data?.close ?? noop });
                }}
            />
        );
        closeFunc = patchElement(toast, { ...mergeConfig });
        return id;
    };

    const removeElement = (id: string) => {
        const ele = toastRef.value.get(id);
        ele && ele.close();
    };

    const dom = ref<VNode>()
    watch(()=>elements.value, (value)=>{
        dom.value = <>
            {
                Array.isArray(elements.value) && elements.value.length ?
                  <>{elements.value.map(item => item.element)}</> :
                  null
            }
        </>
    })
    return [
        {
            success: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'success' }),
            info: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'info' }),
            error: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'error' }),
            warning: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'warning' }),
            open: (config: ToastProps) => addToast({ ...defaultOpts, ...config, type: 'default' }),
            close: (id: string) => removeElement(id)
        },
        dom
        ,
    ];
}
