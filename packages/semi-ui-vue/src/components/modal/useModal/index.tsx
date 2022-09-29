import HookModal from './HookModal';
import { ConfirmProps, withConfirm, withError, withInfo, withSuccess, withWarning } from '../confirm';
import { ModalReactProps } from '../Modal';
import {h, Ref, ref, VNode, Fragment} from "vue";

type Node = VNode | string
let uuid = 0;

function usePatchElement(): ([Ref<Node[]>, (element: Node) => () => void]) {
    const elements = ref<Node[]>([]);

    function patchElement(element: Node) {
        elements.value = [...Array.from(elements.value), element]
        return () => {
            elements.value = Array.from(elements.value).filter(ele => ele !== element)
        };
    }

    return [elements, patchElement];
}

type UseModalReturnHooksType = (config: ModalReactProps) => { destroy: () => void, update: (newConfig: ConfirmProps) => void };

export default function useModal(): [{
    info: UseModalReturnHooksType,
    success: UseModalReturnHooksType,
    error:UseModalReturnHooksType,
    warning: UseModalReturnHooksType,
    confirm: UseModalReturnHooksType
}, Node] {
    const [elements, patchElement] = usePatchElement();

    // eslint-disable-next-line max-len
    function getConfirmFunc(withFunc: (typeof withConfirm | typeof withInfo | typeof withSuccess | typeof withError | typeof withWarning)) {
        return function hookConfirm(config: ModalReactProps) {
            uuid += 1;

            const modalRef = ref();

            // eslint-disable-next-line prefer-const
            let closeFunc: () => void;
            const modal = (
                <HookModal
                    key={`semi-modal-${uuid}`}
                    config={withFunc(config)}
                    ref={modalRef}
                    afterClose={() => {
                        closeFunc();
                    }}
                />
            );

            closeFunc = patchElement(modal);

            return {
                destroy: () => {
                    if (modalRef.value) {
                        modalRef.value.destroy();
                    }
                },
                update: (newConfig: ConfirmProps) => {
                    if (modalRef.value) {
                        modalRef.value.update(newConfig);
                    }
                },
            };
        };
    }

    return [
        {
            info: getConfirmFunc(withInfo),
            success: getConfirmFunc(withSuccess),
            error: getConfirmFunc(withError),
            warning: getConfirmFunc(withWarning),
            confirm: getConfirmFunc(withConfirm),
        },
        <>{elements}</>,
    ];
}
