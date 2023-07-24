import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/sideSheet/constants';
import Button from '../iconButton';
import { noop } from 'lodash';
import { IconClose } from '@kousum/semi-icons-vue';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted, PropType,
  ref,
  useSlots
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { VueJsxNode } from '../interface';
import { SideSheetProps } from "@douyinfe/semi-foundation/sideSheet/sideSheetFoundation";
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';


let uuid = 0;
const prefixCls = cssClasses.PREFIX;

export interface SideSheetContentProps {
  onClose?: (e: MouseEvent) => void;
  mask?: boolean;
  maskStyle?: CSSProperties;
  maskClosable?: boolean;
  maskClassName?: string;
  title?: VueJsxNode;
  closable?: boolean;
  headerStyle?: CSSProperties;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  style: CSSProperties;
  size: SideSheetProps['size'];
  bodyStyle?: CSSProperties;
  className: string;
  dialogClassName?: string;
  footer?: VueJsxNode;
  'aria-label'?: string;
  maskExtraProps?: { [key: string]: any };
  wrapperExtraProps?: { [key: string]: any };

  motion?: boolean;
  visible?: boolean;
}

const propTypes:ComponentObjectPropsOptions<SideSheetContentProps> = {
  size: String as PropType<SideSheetContentProps['size']>,
  onClose: PropTypes.func as PropType<SideSheetContentProps['onClose']>,
  mask: PropTypes.bool,
  maskStyle: PropTypes.object,
  maskClosable: PropTypes.bool,
  maskClassName: PropTypes.string,
  title: PropTypes.node,
  closable: PropTypes.bool,
  headerStyle: PropTypes.object,
  width: [PropTypes.string, PropTypes.number],
  height: [PropTypes.string, PropTypes.number],
  style: PropTypes.object,
  bodyStyle: PropTypes.object,
  className: PropTypes.string,
  dialogClassName: PropTypes.string,
  footer: PropTypes.node,
  'aria-label': PropTypes.string,
  maskExtraProps: PropTypes.object,
  wrapperExtraProps: PropTypes.object,
  // children: PropTypes.node as PropType<SideSheetContentProps['children']>,

  motion: PropTypes.bool as PropType<SideSheetContentProps['motion']>,
  visible: PropTypes.bool as PropType<SideSheetContentProps['visible']>
};

const defaultProps = {
  onClose: noop,
};
export const vuePropsType = vuePropsMake<SideSheetContentProps>(propTypes, defaultProps);
const SideSheetContent = defineComponent<SideSheetContentProps>((props, {}) => {
  const slots = useSlots();
  let sideSheetId: string;
  let timeoutId: number;
  onMounted(() => {
    sideSheetId = `sidesheet-${uuid++}`;
  });
  onBeforeUnmount(() => {
    clearTimeout(timeoutId);
  });

  const onMaskClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      close(e);
    }
  };

  const close = (e: MouseEvent) => {
    const { onClose } = props;
    onClose && onClose(e);
  };

  function getMaskElement() {
    const { mask, maskStyle, maskClosable } = props;
    if (mask) {
      return (
        <div
          aria-hidden={true}
          key="mask"
          class={cls(`${prefixCls}-mask`, props.maskClassName ?? '')}
          style={maskStyle}
          onClick={maskClosable ? onMaskClick : null}
          {...props.maskExtraProps}
        />
      );
    }
    return null;
  }

  function renderHeader() {
    const { title, closable, headerStyle } = props;
    let header, closer;
    if (title) {
      header = (
        <div class={`${prefixCls}-title`} x-semi-prop="title">
          {props.title}
        </div>
      );
    }
    if (closable) {
      closer = (
        <Button
          className={`${prefixCls}-close`}
          key="close-btn"
          onClick={close}
          type="tertiary"
          icon={<IconClose />}
          theme="borderless"
          size="small"
        />
      );
    }
    return (
      <div class={`${prefixCls}-header`} role={'heading'} aria-level={1} style={{ ...headerStyle }}>
        {header}
        {closer}
      </div>
    );
  }

  function getDialogElement() {
    const style: CSSProperties = {};
    if (props.width) {
      style.width = typeof props.width === 'string' ? props.width : props.width + 'px';
      // When the mask is false, the width is set on the wrapper. At this time, sidesheet-inner does not need to set the width again, otherwise, the percentage will be accumulated repeatedly when the width is a percentage
      if (!props.mask) {
        style.width = '100%';
      }
    }
    if (props.height) {
      style.height = typeof props.height === 'string' ? props.height : props.height + 'px';
    }
    const header = renderHeader();
    const dialogElement = (
      <div
        key="dialog-element"
        role="dialog"
        tabindex={-1}
        class={cls(`${prefixCls}-inner`, `${prefixCls}-inner-wrap`, props.dialogClassName ?? '')}
        // onMouseDown={this.onDialogMouseDown}
        style={{ ...props.style, ...style }}
        {...props.wrapperExtraProps}
        // id={this.dialogId}
      >
        <div class={`${prefixCls}-content`}>
          {header}
          <div class={`${prefixCls}-body`} style={props.bodyStyle} x-semi-prop="children">
            {slots.default?.()}
          </div>
          {props.footer ? (
            <div class={`${prefixCls}-footer`} x-semi-prop="footer">
              {props.footer}
            </div>
          ) : null}
        </div>
      </div>
    );
    return dialogElement;
  }

  return () => {
    const {
      mask,
      className,
      width,
      onClose,
      maskStyle,
      maskClosable,
      maskClassName,
      title,
      closable,
      headerStyle,
      height,
      style,
      size,
      bodyStyle,
      dialogClassName,
      footer,
      maskExtraProps,
      wrapperExtraProps,
      ...rest
    } = props;
    const wrapperCls = cls(className, {
      [`${prefixCls}-fixed`]: !mask,
    });
    const wrapperStyle: CSSProperties = {};
    if (!mask && width) {
      wrapperStyle.width = typeof width === 'string' ? width : width + 'px';
    }

    const dataAttr = getDataAttr(rest);

    return (
      <div class={wrapperCls} style={wrapperStyle}  {...dataAttr}>
        {getMaskElement()}
        {getDialogElement()}
      </div>
    );
  };
}, {
  props: vuePropsType,
  name: 'SideSheetContent'
});


export default SideSheetContent;
