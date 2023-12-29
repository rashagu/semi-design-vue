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
  onBeforeUpdate,
  watch,
  onMounted,
  ComponentObjectPropsOptions,
  PropType,
} from 'vue';

import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/avatar/constants';
import AvatarFoundation, { AvatarAdapter } from '@douyinfe/semi-foundation/avatar/foundation';
import '@douyinfe/semi-foundation/avatar/avatar.scss';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import { useBaseComponent } from '../_base/baseComponent';
import type { AvatarProps } from './interface';
// import {AvatarColor, AvatarShape, AvatarSize} from "./interface";
// import {TooltipProps} from "../tooltip";
import { RadioInnerProps } from '../radio/radioInner';
import { handlePrevent } from '@douyinfe/semi-foundation/utils/a11y';

const sizeSet = strings.SIZE;
const shapeSet = strings.SHAPE;
const colorSet = strings.COLOR;
const prefixCls = cssClasses.PREFIX;

export * from './interface';

export interface AvatarState {
  isImgExist: boolean;
  hoverContent: VNode | string;
  focusVisible: boolean;
  scale: number;
}

export const vuePropsType: ComponentObjectPropsOptions<AvatarProps> = {
  style: [Object, String] as PropType<AvatarProps['style']>,
  className: String,
  color: { type: String as PropType<AvatarProps['color']>, default: 'grey' },
  shape: { type: String as PropType<AvatarProps['shape']>, default: 'circle' },
  size: { type: String as PropType<AvatarProps['size']>, default: 'medium' },
  gap: { type: Number as PropType<AvatarProps['gap']>, default: 3 },
  hoverMask: [Object, String, Number] as PropType<AvatarProps['hoverMask']>,
  src: String,
  srcSet: String,
  alt: String,
  onError: Function as PropType<AvatarProps['onError']>,
  onClick: {
    type: Function as PropType<AvatarProps['onClick']>,
    default: noop,
  },
  onMouseEnter: {
    type: Function as PropType<AvatarProps['onMouseEnter']>,
    default: noop,
  },
  onMouseLeave: {
    type: Function as PropType<AvatarProps['onMouseLeave']>,
    default: noop,
  },
  imgAttr: Object,
};
const Index = defineComponent<AvatarProps>(
  (props, { slots }) => {
    let foundation!: AvatarFoundation;

    const state = reactive<AvatarState>({
      isImgExist: true,
      hoverContent: '',
      focusVisible: false,
      scale: 1,
    });
    const avatarRef = ref();


    let textChildren = ''
    function watchTextChildren() {
      const children = slots.default?.() || []
      if (foundation && children.length === 1 && children[0].type.toString() === 'Symbol(v-txt)') {
        const newTextChildren = children[0].children as string
        if (textChildren !== newTextChildren){
          foundation.changeScale();
          console.log('foundation.changeScale')
          textChildren = newTextChildren
        }
      }
    }
    watch(
      () => props.src,
      () => {
        const image = new Image(0, 0);
        image.src = props.src;
        image.onload = () => {
          state.isImgExist = true;
        };
        image.onerror = () => {
          state.isImgExist = false;
        };
        image.onabort = () => {
          state.isImgExist = false;
        };
        watchTextChildren()
      }
    );
    const { adapter: adapterInject } = useBaseComponent<RadioInnerProps>(props, state);

    const theAdapter = adapter();

    function adapter(): AvatarAdapter<AvatarProps, AvatarState> {
      return {
        ...adapterInject<AvatarProps, AvatarState>(),
        notifyImgState: (isImgExist: boolean) => {
          state.isImgExist = isImgExist;
        },
        notifyEnter: (e: MouseEvent) => {
          const { hoverMask } = props;
          state.hoverContent = hoverMask;

          const { onMouseEnter } = props;
          onMouseEnter && onMouseEnter(e);
        },
        notifyLeave: (e: MouseEvent) => {
          state.hoverContent = '';
          const { onMouseLeave } = props;
          onMouseLeave && onMouseLeave(e);
        },
        setFocusVisible: (focusVisible: boolean): void => {
          state.focusVisible = focusVisible;
        },
        setScale: (scale: number) => {
          state.scale = scale;
        },
        getAvatarNode: () => {
          return avatarRef.value;
        },
      };
    }

    onMounted(() => {
      foundation = new AvatarFoundation<AvatarProps, AvatarState>(theAdapter);
      foundation.init();
    });

    onUnmounted(() => {
      foundation.destroy();
    });

    function onEnter(e: MouseEvent) {
      foundation.handleEnter(e);
    }

    function onLeave(e: MouseEvent) {
      foundation.handleLeave(e);
    }

    function handleError() {
      foundation.handleImgLoadError();
    }

    function handleKeyDown(event: any) {
      const { onClick } = props;
      switch (event.key) {
        case 'Enter':
          onClick(event);
          handlePrevent(event);
          break;
        case 'Escape':
          event.target.blur();
          break;
        default:
          break;
      }
    }

    const handleFocusVisible = (event: FocusEvent) => {
      foundation.handleFocusVisible(event);
    };

    const handleBlur = (event: FocusEvent) => {
      foundation.handleBlur();
    };

    const getContent = () => {
      const { onClick, imgAttr, src, srcSet, alt } = props;
      const { isImgExist } = state;
      const children = slots.default?.();
      let content = children;
      const clickable = onClick !== noop;
      const isImg = src && isImgExist;
      const a11yFocusProps = {
        tabIndex: 0,
        onKeyDown: handleKeyDown,
        onFocus: handleFocusVisible,
        onBlur: handleBlur,
      };
      if (isImg) {
        const finalAlt = clickable ? `clickable Avatar: ${alt}` : alt;
        const imgBasicProps = {
          src,
          srcSet,
          onError: handleError,
          ...imgAttr,
          className: cls({
            [`${prefixCls}-no-focus-visible`]: clickable,
          }),
        };
        const imgProps = clickable ? { ...imgBasicProps, ...a11yFocusProps } : imgBasicProps;
        content = [<img alt={finalAlt} {...imgProps} />];
      } else if (typeof children === 'string') {
        const tempAlt = alt ?? children;
        const finalAlt = clickable ? `clickable Avatar: ${tempAlt}` : tempAlt;
        const props = {
          role: 'img',
          'aria-label': finalAlt,
          className: cls(`${prefixCls}-label`, {
            [`${prefixCls}-no-focus-visible`]: clickable,
          }),
        };
        const finalProps = clickable ? { ...props, ...a11yFocusProps } : props;
        const stringStyle: CSSProperties = {
          transform: `scale(${state.scale})`,
        };
        content = [(
          <span class={`${prefixCls}-content`} style={stringStyle}>
            <span {...finalProps} x-semi-prop="children">
              {children}
            </span>
          </span>
        )];
      }
      return content;
    };

    return () => {
      watchTextChildren()
      const { shape, size, color, className, hoverMask, onClick, imgAttr, src, srcSet, style, alt, gap, ...others } =
        props;
      const { isImgExist, hoverContent, focusVisible } = state;
      const isImg = src && isImgExist;
      const avatarCls = cls(
        prefixCls,
        {
          [`${prefixCls}-${shape}`]: shape,
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-${color}`]: color && !isImg,
          [`${prefixCls}-img`]: isImg,
          [`${prefixCls}-focus`]: focusVisible,
        },
        className
      );

      const hoverRender = hoverContent ? (
        <div class={`${prefixCls}-hover`} x-semi-prop="hoverContent">
          {hoverContent}
        </div>
      ) : null;

      console.log(2)
      return (
        <span
          {...(others as any)}
          style={style}
          class={avatarCls}
          onClick={onClick as any}
          onMouseenter={onEnter as any}
          onMouseleave={onLeave as any}
          role="listitem"
          ref={avatarRef}
        >
          {getContent()}
          {hoverRender}
        </span>
      );
    };
  },
  {
    props: vuePropsType,
    name: 'Avatar',
  }
);

export default Index;
