import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, isVNode, PropType, reactive } from 'vue';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/layout/constants';
import '@douyinfe/semi-foundation/layout/layout.scss';
import LayoutContext, { ContextType } from './layoutContext';
import Sider from './Sider';
import { CombineProps } from '../interface';

const htmlTag = {
  Header: 'header',
  Footer: 'footer',
  Content: 'main',
  Layout: 'section',
};

export interface BasicProps {
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  tagName?: keyof HTMLElementTagNameMap;
  type?: string;
}

const basicVuePropsType: CombineProps<BasicProps> = {
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX,
  },
  style: [String, Object] as PropType<BasicProps['style']>,
  className: String,
  tagName: String as PropType<BasicProps['tagName']>,
  type: String,
};

const Basic = defineComponent({
  props: basicVuePropsType,
  name: 'Basic',
  setup(props, { slots }) {
    return () => {
      const { prefixCls, type, className, tagName, ...others } = props;
      const classString = cls(className, `${prefixCls}-${type}`);
      return h(tagName, { className: classString, ...others }, slots.default ? slots.default() : null);
    };
  },
});

function generator<P extends { type?: string; tagName?: string; role?: any; 'aria-label'?: string }>(type: string) {
  const tagName = htmlTag[type];
  const typeName = type.toLowerCase();
  return (BasicComponent) =>
    defineComponent((props, { slots }) => {
      return () => (
        <BasicComponent role={props.role} aria-label={props['aria-label']} type={typeName} tagName={tagName} {...props}>
          {slots.default ? slots.default() : null}
        </BasicComponent>
      );
    });
}

const LayoutHeader = generator<BasicProps>('Header')(Basic);
const LayoutFooter = generator<BasicProps>('Footer')(Basic);
const LayoutContent = generator<BasicProps>('Content')(Basic);
const LayoutSider = Sider;

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
export const vuePropsType: CombineProps<BasicLayoutProps> = {
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX,
  },
  style: [String, Object] as PropType<BasicLayoutProps['style']>,
  className: String,
  hasSider: Boolean,
  tagName: {
    type: String as PropType<BasicLayoutProps['tagName']>,
    default: 'section',
  },
};
const Layout = defineComponent(
  (props, { slots }) => {
    const state = reactive<BasicLayoutState>({
      siders: [],
    });

    function getSiderHook(): ContextType['siderHook'] {
      return {
        addSider: (id: string): void => {
          state.siders = [...state.siders, id];
        },
        removeSider: (id: string): void => {
          state.siders = state.siders.filter((curr) => curr !== id);
        },
      };
    }

    return () => {
      const children = slots.default?.() || [];
      const { prefixCls, className, hasSider, tagName, ...others } = props;
      const { siders } = state;
      const classString = cls(className, prefixCls, {
        [`${prefixCls}-has-sider`]:
          (typeof hasSider === 'boolean' && hasSider) ||
          siders.length > 0 ||
          children.some((child) => {
            return isVNode(child) && child.type && (child.type as any).name === 'Layout.Sider';
          }),
      });
      const Tag: any = tagName;
      return (
        <LayoutContext.Provider value={{ siderHook: getSiderHook() }}>
          <Tag className={classString} {...others}>
            {slots.default?.()}
          </Tag>
        </LayoutContext.Provider>
      );
    };
  },
  {
    props: vuePropsType,
    name: 'Layout',
  }
);

export { LayoutHeader, LayoutFooter, LayoutContent, LayoutSider };
export default Layout;
