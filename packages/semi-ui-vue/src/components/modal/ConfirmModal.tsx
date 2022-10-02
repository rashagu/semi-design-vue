/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
import cls from 'classnames';
import {cssClasses} from '@douyinfe/semi-foundation/modal/constants';
import Modal from './Modal';
import {isSemiIcon} from '../_utils';

import '@douyinfe/semi-foundation/modal/modal.scss';
import {ConfirmProps} from './confirm';
import {cloneVNode, computed, defineComponent, h, onMounted, onUnmounted, ref, useSlots} from 'vue';
import {vuePropsMake} from "../PropTypes";
import * as PropTypes from "../PropTypes";
import {noop} from "lodash";
import {getProps, useBaseComponent} from "../_base/baseComponent";

const propTypes = {
  mask: {
    type: PropTypes.bool,
    default: undefined
  },
  closable: {
    type: PropTypes.bool,
    default: undefined
  },
  centered: {
    type: PropTypes.bool,
    default: undefined
  },
  visible: {
    type: PropTypes.bool,
    default: undefined
  },
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  confirmLoading: {
    type: PropTypes.bool,
    default: undefined
  },
  cancelLoading: {
    type: PropTypes.bool,
    default: undefined
  },
  okText: PropTypes.string,
  okType: PropTypes.string,
  cancelText: PropTypes.string,
  maskClosable: {
    type: PropTypes.bool,
    default: undefined
  },
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  afterClose: PropTypes.func,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  maskStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  zIndex: PropTypes.number,
  title: PropTypes.node,
  icon: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
  hasCancel: {
    type: PropTypes.bool,
    default: undefined
  },
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  getPopupContainer: PropTypes.func,
  getContainerContext: PropTypes.func,
  maskFixed: {
    type: PropTypes.bool,
    default: undefined
  },
  closeIcon: PropTypes.node,
  closeOnEsc: {
    type: PropTypes.bool,
    default: undefined
  },
  size: String,
  keepDOM: {
    type: PropTypes.bool,
    default: undefined
  },
  lazyRender: {
    type: PropTypes.bool,
    default: undefined
  },
  direction: String,
  fullScreen: {
    type: PropTypes.bool,
    default: undefined
  },
};
const defaultProps = {
  zIndex: 1000,
  motion: true,
  mask: true,
  centered: false,
  closable: true,
  visible: false,
  confirmLoading: false,
  cancelLoading: false,
  okType: 'primary',
  maskClosable: true,
  hasCancel: true,
  onCancel: noop,
  onOk: noop,
  afterClose: noop,
  maskFixed: false,
  closeOnEsc: true,
  size: 'small',
  keepDOM: false,
  lazyRender: true,
  fullScreen: false,
};
export const vuePropsType = {
  ...vuePropsMake(propTypes, defaultProps),
  type: String
}
const ConfirmModal = defineComponent<ConfirmProps>((props, {}) => {

  const slots = useSlots()

  const visible = ref<boolean>(true);

  function setVisible(val: boolean) {
    visible.value = val;
  }

  const confirmLoading = ref<boolean>();

  function setConfirmLoading(val: boolean) {
    confirmLoading.value = val;
  }

  const cancelLoading = ref<boolean>();

  function setCancelLoading(val: boolean) {
    cancelLoading.value = val;
  }

  const handleOk = computed(
    () => (e: MouseEvent) => {
      const res = props.onOk && props.onOk(e);
      if (res && res.then) {
        setConfirmLoading(true);
        res.then(
          (...args) => {
            setVisible(false);
            setConfirmLoading(false);
          },
          err => {
            setConfirmLoading(false);
          }
        );
      } else {
        setVisible(false);
      }
    }
  );

  const handleCancel = computed(
    () => (e) => {
      const res = props.onCancel && props.onCancel(e);
      if (res && res.then) {
        setCancelLoading(true);
        res.then(
          (...args) => {
            setVisible(false);
            setCancelLoading(false);
          },
          err => {
            setCancelLoading(false);
          }
        );
      } else {
        setVisible(false);
      }
    }
  );


  return () => {

    const {direction} = props;

    const {title, content, icon, type, onCancel, onOk, className, ...rest} = getProps(props);


    const confirmCls = `${cssClasses.DIALOG}-confirm`;
    const wrapperCls = cls(className, confirmCls, {
      [`${confirmCls}-rtl`]: direction === 'rtl',
    });
    const typeCls = cls(`${cssClasses.DIALOG}-${type}`);
    const iconNode = isSemiIcon(icon)
      ? cloneVNode(icon as any, {className: `${confirmCls}-icon ${typeCls}-icon`, size: 'extra-large'})
      : icon;
    const titleNode = title == null ? null : <span class={`${confirmCls}-title-text`}>{title}</span>;
    const contentCls = cls(`${confirmCls}-content`, {
      [`${confirmCls}-content-withIcon`]: props.icon,
    });

    return (
      <Modal
        {
          ...{
            className: wrapperCls,
            title: titleNode,
            confirmLoading: confirmLoading.value,
            cancelLoading: cancelLoading.value,
            onOk: handleOk.value,
            onCancel: handleCancel.value,
            icon: iconNode,
            visible: visible.value,
            ...rest
          }}
      >
        <div class={contentCls} x-semi-prop="content">
          {content}
        </div>
      </Modal>
    );
  }
})

ConfirmModal.props
ConfirmModal.name = 'ConfirmModal'

export default ConfirmModal

