
import '@douyinfe/semi-foundation/modal/modal.scss';
import { ModalState } from '@douyinfe/semi-foundation/modal/modalFoundation';
import Modal, {ModalClass} from './Modal';
import　{ ModalReactProps } from './Modal';
import useModal from './useModal';

export type { ConfirmProps } from './confirm';

export type Directions = 'ltr' | 'rtl';

export type { ModalReactProps, ModalState };

export {
  ModalClass,
  useModal
}
export default Modal;
