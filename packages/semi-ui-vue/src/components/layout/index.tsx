import {defineComponent, ref, h, Fragment, CSSProperties, DefineComponent, reactive, provide,} from 'vue'
import cls from 'classnames';
import {cssClasses} from '@douyinfe/semi-foundation/layout/constants';
import '@douyinfe/semi-foundation/layout/layout.scss';
import { ContextType } from './layoutContext';
import Sider from './Sider';


const htmlTag = {
  Header: 'header',
  Footer: 'footer',
  Content: 'main',
  Layout: 'section'
};



export interface BasicProps {
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  tagName?: keyof HTMLElementTagNameMap;
  type?: string;
}

const BasicVuePropsType = {
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX
  },
  style: [String, Object],
  className: String,
  tagName: String,
  type: String,
}

const Basic = defineComponent<BasicProps>((props, {slots}) => {

  return () => {
    const { prefixCls, type, className, tagName, ...others } = props;
    const classString = cls(className, `${prefixCls}-${type}`);
    console.log(tagName)
    return h(tagName, { className: classString, ...others }, slots.default?slots.default():null);
  }
})
Basic.props = BasicVuePropsType


function generator<P extends { type?: string; tagName?: string; role?: any; 'aria-label'?: string }>(type: string): (ComponentType:  DefineComponent<BasicProps>) => DefineComponent<P> {
  const tagName = htmlTag[type];
  const typeName = type.toLowerCase();
  return (BasicComponent) => defineComponent<P>((props, {slots}) => {
    return ()=>
      <BasicComponent role={props.role} aria-label={props['aria-label']} type={typeName}
                      tagName={tagName} {...props} >
        {slots.default?slots.default():null}
      </BasicComponent>;
  });
}

const LayoutHeader = generator<BasicProps>('Header')(Basic);
const LayoutFooter = generator<BasicProps>('Footer')(Basic);
const LayoutContent = generator<BasicProps>('Content')(Basic);
const LayoutSider = Sider

export interface BasicLayoutProps {
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  hasSider?: boolean;
  tagName?: keyof HTMLElementTagNameMap;
}

export interface BasicLayoutState {
  siders: Array<string>;
}
export const vuePropsType = {
  name: String,
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX
  },
  style: [String, Object],
  className: String,
  hasSider: Boolean,
  tagName: {
    type: String,
    default: 'section'
  },
}
const Layout = defineComponent<BasicLayoutProps>((props, {slots}) => {

  const state = reactive<BasicLayoutState>({
    siders: [],
  })

  function getSiderHook(): ContextType['siderHook'] {
    return {
      addSider: (id: string): void => {
        state.siders = [...state.siders, id]
      },
      removeSider: (id: string): void => {
        state.siders = state.siders.filter(curr => curr !== id)
      },
    };
  }
  provide('LayoutContext', { siderHook: getSiderHook() })
  return () => {
    const { prefixCls, className, hasSider, tagName, ...others } = props;
    const { siders } = state;
    console.log(hasSider,siders)
    const classString = cls(className, prefixCls, {
      [`${prefixCls}-has-sider`]: hasSider ? hasSider : siders.length > 0,
    });
    const Tag: any = tagName;
    return (
      <Tag className={classString} {...others}>
        {slots.default?slots.default():null}
      </Tag>
    );
  }
})

Layout.props = vuePropsType

export {
  LayoutHeader,
  LayoutFooter,
  LayoutContent,
  LayoutSider
};
export default Layout;

