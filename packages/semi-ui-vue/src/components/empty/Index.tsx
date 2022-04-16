import {defineComponent, ref, h, Fragment, CSSProperties, VNode, reactive, onMounted, onUnmounted, useSlots} from 'vue'
import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/empty/constants';
import '@douyinfe/semi-foundation/empty/empty.scss';
import {Title} from '../typography/Index';
import { ArrayElement } from '../_base/base';

const prefixCls = cssClasses.PREFIX;

interface SVGNode {
  id?: string;
  viewBox?: string;
  url?: string;
}

export interface EmptyProps {
  layout?: ArrayElement<typeof strings.LAYOUT>;
  imageStyle?: CSSProperties;
  title?: VNode | string;
  description?: VNode | string;
  image?: VNode | string | SVGNode;
  darkModeImage?: VNode | string | SVGNode;
  style?: CSSProperties;
  className?: string;
}

interface EmptyState {
  mode: any;
}


export const vuePropsType = {
  layout: {type:String,default:'vertical'},
  imageStyle:[Object,String],
  title:[Object,String],
  description:[Object,String],
  image:[Object,String],
  darkModeImage:[Object,String],
  style:[Object,String],
  className:[String],
}


const Empty = defineComponent<EmptyProps>((props, ) => {

  let body: any;
  let observer: MutationObserver;

  const state = reactive({
    mode: null
  });


  onMounted(()=>{
    if (props.darkModeImage) {
      body = window.document.body;
      updateMode();
      const config = { attributes: true, childList: false, subtree: false };
      observer = new MutationObserver(observe);
      observer.observe(body, config);
    }
  })

  onUnmounted(()=>{

    observer && observer.disconnect();
  })
  const observe = (mutationsList: any): void => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'theme-mode') {
        updateMode();
      }
    }
  }


  const updateMode = (): void => {
    const val = body.getAttribute('theme-mode');
    if (val !== state.mode) {
      state.mode = val
    }
  }
  const slots = useSlots()
  return () => {
    const children = slots.default?slots.default():null
    const { className, image, description, style, title, imageStyle, layout, darkModeImage } = props;

    const alt = typeof description === 'string' ? description : 'empty';
    const imgSrc = state.mode && darkModeImage ? darkModeImage : image;
    let imageNode = null;
    if (typeof imgSrc === 'string') {
      imageNode = <img alt={alt} src={imgSrc} />;
    } else if (imgSrc && 'id' in (imgSrc as any)) {
      imageNode = (
        <svg
          // className={iconCls}
          aria-hidden="true"
        >
          <use xlinkHref={`#${(imgSrc as any).id}`} />
        </svg>
      );
    } else {
      imageNode = imgSrc;
    }
    const wrapperCls = cls(className, prefixCls, {
      [`${prefixCls}-${layout}`]: layout,
    });

    const titleProps = imageNode ?
      {
        heading: 4,
      } :
      {
        heading: 6,
        style: { fontWeight: 400 },
      };
    return (
      <div class={wrapperCls} style={style}>
        <div class={`${prefixCls}-image`} style={imageStyle} >
          {imageNode}
        </div>
        <div class={`${prefixCls}-content`} >
          {title ? (
            <Title {...(titleProps as any)} className={`${prefixCls}-title`} >
              {title}
            </Title>
          ) : null}
          {description ? <div class={`${prefixCls}-description`} >{description}</div> : null}
          {children ? <div class={`${prefixCls}-footer`}>{children}</div> : null}
        </div>
      </div>
    );
  }
})

Empty.props = vuePropsType

export default Empty

