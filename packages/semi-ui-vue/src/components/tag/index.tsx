import {defineComponent, ref, h, Fragment, VNode, CSSProperties, reactive} from 'vue'
import classNames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/tag/constants';
import Avatar from '../avatar';
import { IconClose } from '@kousum/semi-icons-vue';
import {TagProps, TagSize, TagColor, TagType, AvatarShape} from './interface';
import '@douyinfe/semi-foundation/tag/tag.scss';
import {func} from "prop-types";

export * from './interface';

const prefixCls = cssClasses.PREFIX;

const tagColors = strings.TAG_COLOR;

const tagSize = strings.TAG_SIZE;
const tagType = strings.TAG_TYPE;
const avatarShapeSet = strings.AVATAR_SHAPE;

export interface TagState {
  visible: boolean;
}

export const vuePropsType = {
  children: [Object,Number,String],
  size: {
    type: String,
    default: tagSize[0]
  },
  color: {
    type: String,
    default: tagColors[0]
  },
  type: {
    type: String,
    default: tagType[0]
  },
  closable:{type: Boolean, default:false},
  visible: Boolean,
  onClose:{
    type: Function,
    default: () => undefined
  },
  onClick:{
    type: Function,
    default: () => undefined
  },
  style: [Object, String],
  className: {type:String,default:''},
  avatarSrc: String,
  avatarShape: {type:String, default: 'square'},
}
const Index = defineComponent<TagProps>((props, {slots}) => {

  const state = reactive({
    visible: true,
  });
  function getDerivedStateFromProps(nextProps: TagProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible,
      };
    }
    return null;
  }

  function setVisible(visible: boolean) {
    if (!('visible' in props)) {
      state.visible = visible
    }
  }

  function close(e: MouseEvent, value: VNode) {
    const { onClose } = props;
    e.stopPropagation();
    e.stopImmediatePropagation();
    onClose && onClose(value, e);
    // when user call e.preventDefault() in onClick callback, tag will not hidden
    if (e.defaultPrevented) {
      return;
    }
    setVisible(false);
  }

  function renderAvatar() {
    const { avatarShape, avatarSrc } = props;
    const avatar = <Avatar src={avatarSrc} shape={avatarShape} />;
    return avatar;
  }
  return () => {
    const children = slots.default?slots.default():null;
    const { size, color, closable, visible, onClose, className, type, avatarSrc, avatarShape, children: tagChildren, ...attr } = props;
    const { visible: isVisible } = state;
    const baseProps = {
      ...attr,
      className: classNames(
        prefixCls,
        {
          [`${prefixCls}-default`]: size === 'default',
          [`${prefixCls}-small`]: size === 'small',
          [`${prefixCls}-large`]: size === 'large',
          [`${prefixCls}-${type}`]: type,
          [`${prefixCls}-${color}-${type}`]: color && type,
          [`${prefixCls}-closable`]: closable,
          [`${prefixCls}-invisible`]: !isVisible,
          [`${prefixCls}-avatar-${avatarShape}`]: avatarSrc,
        },
        className
      ),
    };
    const closeIcon = closable ? (
      <div class={`${prefixCls}-close`} onClick={e => close(e, children[0])}>
        <IconClose size="small" />
      </div>
    ) : null;
    return (
      <div {...baseProps}>
        <div class={`${prefixCls}-content`}>
          {avatarSrc ? renderAvatar() : null}
          {children}
          {closeIcon}
        </div>
      </div>
    );
  }
})

Index.props = vuePropsType

export default Index

