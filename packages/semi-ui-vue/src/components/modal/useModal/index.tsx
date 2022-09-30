import HookModal from './HookModal';
import {ConfirmProps, withConfirm, withError, withInfo, withSuccess, withWarning} from '../confirm';
import {ModalReactProps} from '../Modal';
import {h, Ref, ref, VNode, Fragment, watch} from "vue";

type Node = VNode
let uuid = 0;

function usePatchElement(): ([Ref<Node[]>, (element: Node) => () => void]) {
  const elements = ref<Node[]>([]);

  function patchElement(element: Node) {
    elements.value = [...elements.value, element]
    return () => {
      elements.value = elements.value.filter(ele => {
        console.log(ele !== element)
        return ele !== element
      })
    };
  }

  return [elements, patchElement];
}

type UseModalReturnHooksType = (config: ModalReactProps) => { destroy: () => void, update: (newConfig: ConfirmProps) => void };

export default function useModal(): [{
  info: UseModalReturnHooksType,
  success: UseModalReturnHooksType,
  error: UseModalReturnHooksType,
  warning: UseModalReturnHooksType,
  confirm: UseModalReturnHooksType
}, Ref<Node[]>] {
  const [elements, patchElement] = usePatchElement();

  // eslint-disable-next-line max-len
  function getConfirmFunc(withFunc: (typeof withConfirm | typeof withInfo | typeof withSuccess | typeof withError | typeof withWarning)) {
    return function hookConfirm(config: ModalReactProps) {
      uuid += 1;


      // eslint-disable-next-line prefer-const
      let closeFunc: () => void;
      const modal: VNode = h(HookModal,
        {
          key: `semi-modal-${uuid}`,
          config: withFunc(config),
          afterClose: () => {
            closeFunc();
          }
        });

      closeFunc = patchElement(modal);

      return {
        destroy: () => {
          console.log(modal.component)
          if (modal) {
            // 没有销毁方法 ？
            // console.log(modal.destroy)
            // modal.destroy();
          }
        },
        update: (newConfig: ConfirmProps) => {
          if (modal) {
            modal.component.update(newConfig);
          }
        },
      };
    };
  }

  watch(elements, () => {
    console.log(elements.value)
  })

  return [
    {
      info: getConfirmFunc(withInfo),
      success: getConfirmFunc(withSuccess),
      error: getConfirmFunc(withError),
      warning: getConfirmFunc(withWarning),
      confirm: getConfirmFunc(withConfirm),
    },
    elements,
  ];
}
