import {destroyFns, ModalReactProps,} from './Modal';
import ConfirmModal from './ConfirmModal';

import '@douyinfe/semi-foundation/modal/modal.scss';

import {
  IconAlertCircle,
  IconAlertTriangle,
  IconHelpCircle,
  IconInfoCircle,
  IconTickCircle
} from '@kousum/semi-icons-vue';
import { omit } from "lodash";
import { type ButtonProps } from "../button";

import {
  h,
  createApp,
  App
} from "vue";

export interface ConfirmProps extends ModalReactProps {
  type: 'success' | 'info' | 'warning' | 'error' | 'confirm';
}

export default function confirm<T>(props: ConfirmProps) {
  // create a dom in adapter?
  const div = document.createElement('div');
  document.body.appendChild(div);

  let app: App<Element>

  let currentConfig = {...props};

  const destroy = () => {
    // TODO
    // console.log(app);
    app?.unmount()
    if (div.parentNode) {
      setTimeout(() => {
        div.parentNode?.removeChild(div);
      })
    }

    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === destroy) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  };

  // const mergedMotion: Motion = typeof (props.motion) === 'undefined' || props.motion ? {
  //   ...(props.motion as any),
  //   didLeave: (...args: any) => {
  //     const didLeave = get(props.motion, 'didLeave');
  //
  //     if (typeof didLeave === 'function') {
  //       didLeave(...args);
  //     }
  //
  //     destroy();
  //   }
  //
  // } : false;

  function render(renderProps: ConfirmProps) {
    const { afterClose } = renderProps;
    // TODO
    destroy()
    app = createApp(h(ConfirmModal, {...renderProps, motion: props.motion, afterClose: ()=>{
        //@ts-ignore
        afterClose?.(...args);
        destroy();
      }}))
    app.mount(div)
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
    };
    render(currentConfig);
  }

  function update(newConfig: T extends { type: Exclude<ConfirmProps['type'], 'confirm'> } ? ModalReactProps : ConfirmProps) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    } as ConfirmProps;
    render(currentConfig);
  }

  render(currentConfig);
  destroyFns.push(destroy);
  return {
    destroy: destroy,
    update,
  };
}


export function withInfo(props: ModalReactProps) {
  return {
    type: 'info' as const,
    icon: <IconInfoCircle/>,
    ...props
  } as ConfirmProps;
}

export function withSuccess(props: ModalReactProps) {
  return {
    type: 'success' as const,
    icon: <IconTickCircle/>,
    ...props
  } as ConfirmProps;
}

export function withWarning(props: ModalReactProps) {
  return {
    type: 'warning' as const,
    icon: <IconAlertTriangle/>,
    ...props
  } as ConfirmProps;
}

export function withError(props: ModalReactProps) {
  return {
    type: 'error' as const,
    icon: <IconAlertCircle/>,
    okButtonProps: { type: 'danger' as ButtonProps['type'], ...props.okButtonProps },
    ...(omit(props, ['okButtonProps']) as ConfirmProps)
  };
}

export function withConfirm(props: ModalReactProps) {
  return {
    type: 'confirm' as const,
    icon: <IconHelpCircle/>,
    ...props
  } as ConfirmProps;
}
