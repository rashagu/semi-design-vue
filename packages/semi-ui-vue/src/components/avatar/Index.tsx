import {
  defineComponent,
  ref,
  h,
  Fragment,
  VNode,
  CSSProperties,
  ImgHTMLAttributes,
  reactive,
  onUnmounted,
  onBeforeUpdate, watch, onMounted
} from 'vue'

import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/avatar/constants';
import AvatarFoundation, { AvatarAdapter } from '@douyinfe/semi-foundation/avatar/foundation';
import '@douyinfe/semi-foundation/avatar/avatar.scss';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import BaseComponent, {useBaseComponent} from '../_base/BaseComponent';
import type { AvatarProps } from './interface';
// import {AvatarColor, AvatarShape, AvatarSize} from "./interface";
// import {TooltipProps} from "../tooltip";
import {RadioInnerProps} from "../radio/RadioInner";

const sizeSet = strings.SIZE;
const shapeSet = strings.SHAPE;
const colorSet = strings.COLOR;
const prefixCls = cssClasses.PREFIX;

export * from './interface';
export interface AvatarState {
  isImgExist: boolean;
  hoverContent: VNode | string;
}


export const vuePropsType = {
  style: [Object, String],
  className: String,
  color: {type:String,default:'grey'},
  shape: {type:String,default:'circle'},
  size: {type:String,default:'medium'},
  hoverMask: [Object, String,Number],
  src: String,
  srcSet: String,
  alt: String,
  onError: Function,
  onClick: {
    type: Function,
    default: noop
  },
  onMouseEnter: {
    type: Function,
    default: noop
  },
  onMouseLeave: {
    type: Function,
    default: noop
  },
  imgAttr: Object,
}
const Index = defineComponent<AvatarProps>((props, {slots}) => {


  let foundation!: AvatarFoundation;

  const state = reactive<AvatarState>({
    isImgExist: true,
    hoverContent: '',
  });

  watch(()=>props.src,()=>{
    const image = new Image(0, 0);
    image.src = props.src;
    image.onload = () => {
      state.isImgExist = true
    };
    image.onerror = () => {
      state.isImgExist = false
    };
    image.onabort = () => {
      state.isImgExist = false
    };
  })
  const {cache, adapter: adapterInject, log, context: context_} = useBaseComponent<RadioInnerProps>(props, state)

  const theAdapter = adapter()
  function adapter(): AvatarAdapter<AvatarProps, AvatarState> {
    return {
      ...adapterInject<AvatarProps, AvatarState>(),
      notifyImgState: (isImgExist: boolean) => {
        state.isImgExist = isImgExist
      },
      notifyEnter: (e: MouseEvent) => {
        const { hoverMask } = props;
        state.hoverContent = hoverMask

        const { onMouseEnter } = props;
        onMouseEnter && onMouseEnter(e);
      },
      notifyLeave: (e: MouseEvent) => {
        state.hoverContent = ''
        const { onMouseLeave } = props;
        onMouseLeave && onMouseLeave(e);
      }
    };
  }
  onMounted(()=>{
    foundation = new AvatarFoundation<AvatarProps, AvatarState>(theAdapter);
    foundation.init();
  })

  onUnmounted(()=>{
    foundation.destroy();
  })

  function onEnter(e: MouseEvent) {
    foundation.handleEnter(e);
  }

  function onLeave(e: MouseEvent) {
    foundation.handleLeave(e);
  }

  function handleError() {
    foundation.handleImgLoadError();
  }


  return () => {
    // eslint-disable-next-line max-len, no-unused-vars
    const { shape, size, color, className, hoverMask, onClick, imgAttr, src, srcSet, style, alt, ...others } = props;
    const children = slots.default?slots.default():null
    const { isImgExist, hoverContent } = state;
    const isImg = src && isImgExist;
    const avatarCls = cls(
      prefixCls,
      {
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-${color}`]: color && !isImg,
        [`${prefixCls}-img`]: isImg,
      },
      className
    );
    let content: any = children;
    const hoverRender = hoverContent ? (<div class={`${prefixCls}-hover`}>{hoverContent}</div>) : null;
    if (isImg) {
      content = (
        <img src={src} srcset={srcSet} onError={handleError} alt={alt} {...imgAttr} />
      );
    } else if (typeof children === 'string') {
      content = (
        <span class={`${prefixCls}-content`}>
                    <span class={`${prefixCls}-label`}>{children}</span>
                </span>
      ) as VNode;
    }
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
      <span
        {...(others as any)}
        style={style}
        class={avatarCls}
        onClick={onClick as any}
        onMouseenter={onEnter as any}
        onMouseleave={onLeave as any}
      >
        {content}
        {hoverRender}
      </span>
    );
  }
})

Index.props = vuePropsType

export default Index

