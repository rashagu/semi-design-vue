
import '@douyinfe/semi-foundation/modal/modal.scss';
import { ModalState } from '@douyinfe/semi-foundation/modal/modalFoundation';
import Modal, {ModalConfirm} from './Modal';
import　{ ModalReactProps } from './Modal';
import useModal from './useModal';

export type { ConfirmProps } from './confirm';

export type Directions = 'ltr' | 'rtl';

export type { ModalReactProps, ModalState };

export {
  ModalConfirm,
  useModal
}
export default Modal;
