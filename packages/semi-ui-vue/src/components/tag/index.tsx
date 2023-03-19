import {defineComponent, ref, h, Fragment, VNode, CSSProperties, reactive, watch} from 'vue'
import * as PropTypes from '../PropTypes'
import classNames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/tag/constants';
import Avatar from '../avatar';
import { IconClose } from '@kousum/semi-icons-vue';
import {TagProps, TagSize, TagColor, TagType, AvatarShape, TagShape} from './interface';
import { handlePrevent } from '@douyinfe/semi-foundation/utils/a11y';
import '@douyinfe/semi-foundation/tag/tag.scss';
import {VueJsxNode} from "../interface";
import {vuePropsMake} from "../PropTypes";
import {isString} from "lodash";
import cls from 'classnames';

export * from './interface';

const prefixCls = cssClasses.PREFIX;

const tagColors = strings.TAG_COLOR;

const tagSize = strings.TAG_SIZE;
const tagType = strings.TAG_TYPE;
const avatarShapeSet = strings.AVATAR_SHAPE;

export interface TagState {
  visible: boolean;
}

const propTypes = {
  children: PropTypes.node,
  tagKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: String,
  color: String,
  type: String,
  closable: PropTypes.bool,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  avatarSrc: PropTypes.string,
  avatarShape: String,
  'aria-label': PropTypes.string,

  shape: {type: String, default: 'square'},
  onKeydown: Function,
  tabIndex: Number, // use internal, when tag in taInput, we want to use left arrow and right arrow to control the tag focus, so the tabIndex need to be -1.
  onMouseenter: Function
};
const defaultProps: TagProps = {
  size: tagSize[0] as TagSize,
  color: tagColors[0] as TagColor,
  closable: false,
  // visible: true,
  type: tagType[0] as TagType,
  onClose: () => undefined,
  onClick: () => undefined,
  onMouseenter: () => undefined,
  style: {},
  className: '',
  shape: 'square',
  avatarShape: 'square',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Index = defineComponent<TagProps>((props, {slots}) => {

  const state = reactive<TagState>({
    visible: true,
  });
  // ok
  function getDerivedStateFromProps(nextProps: TagProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible,
      };
    }
    return null;
  }
  watch(()=>props.visible, (val)=>{
    const newState = getDerivedStateFromProps(props)
    if (newState){
      Object.keys(newState).forEach(key=>{
        state[key] = newState[key]
      })
    }
  })

  function setVisible(visible: boolean) {
    if (!('visible' in props)) {
      state.visible = visible
    }
  }

  function close(e: MouseEvent, value: VueJsxNode, tagKey: string | number) {
    const { onClose } = props;
    e.stopPropagation();
    e.stopImmediatePropagation();
    onClose && onClose(value, e, tagKey);
    // when user call e.preventDefault() in onClick callback, tag will not hidden
    if (e.defaultPrevented) {
      return;
    }
    setVisible(false);
  }

  function handleKeyDown(event: any) {
    const { closable, onClick, onKeydown } = props;
    switch (event.key) {
      case "Backspace":
      case "Delete":
        closable && close(event, slots.default?.(), props.tagKey);
        handlePrevent(event);
        break;
      case "Enter":
        onClick(event);
        handlePrevent(event);
        break;
      case 'Escape':
        event.target.blur();
        break;
      default:
        break;
    }
    onKeydown && onKeydown(event);
  }
  function renderAvatar() {
    const { avatarShape, avatarSrc } = props;
    const avatar = <Avatar src={avatarSrc} shape={avatarShape} />;
    return avatar;
  }
  return () => {
    const children = slots.default?slots.default():null;
    const {tagKey, size, color, closable, visible, onClose, className, onClick, type, shape, avatarSrc, avatarShape, tabIndex, children: tagChildren, ...attr } = props;
    const { visible: isVisible } = state;
    const clickable = onClick !== defaultProps.onClick || closable;
    // only when the Tag is clickable or closable, the value of tabIndex is allowed to be passed in.
    const a11yProps = { role: 'button', tabIndex: tabIndex || 0, onKeyDown: handleKeyDown };
    const baseProps = {
      ...attr,
      onClick,
      tabindex: tabIndex,
      className: classNames(
        prefixCls,
        {
          [`${prefixCls}-default`]: size === 'default',
          [`${prefixCls}-small`]: size === 'small',
          [`${prefixCls}-large`]: size === 'large',
          [`${prefixCls}-square`]: shape === 'square',
          [`${prefixCls}-circle`]: shape === 'circle',
          [`${prefixCls}-${type}`]: type,
          [`${prefixCls}-${color}-${type}`]: color && type,
          [`${prefixCls}-closable`]: closable,
          [`${prefixCls}-invisible`]: !isVisible,
          [`${prefixCls}-avatar-${avatarShape}`]: avatarSrc,
        },
        className
      ),
    };
    const wrapProps = clickable ? ({ ...baseProps, ...a11yProps }) : baseProps;
    const closeIcon = closable ? (
      <div class={`${prefixCls}-close`} onClick={e => close(e, children[0], tagKey)}>
        <IconClose size="small" />
      </div>
    ) : null;

    const stringChild = isString(children);
    const contentCls = cls(`${prefixCls}-content`, `${prefixCls}-content-${stringChild ? 'ellipsis' : 'center' }`);

    return (

      <div aria-label={props['aria-label'] || stringChild ? `${closable ? 'Closable ' : ''}Tag: ${children}` : '' } {...wrapProps}>
        {avatarSrc ? renderAvatar() : null}
        <div class={contentCls}>
          {children}
        </div>
        {closeIcon}
      </div>
    );
  }
})

Index.props = vuePropsType
Index.name = 'Tag'

export default Index

