import * as PropTypes from '../PropTypes';
import cls from 'classnames';

import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import {cssClasses} from '@douyinfe/semi-foundation/navigation/constants';
import '@douyinfe/semi-foundation/navigation/navigation.scss';

import {BaseProps} from '../_base/baseComponent';
import {defineComponent, h, isVNode, VNode, Fragment} from "vue";
import {useNavContext} from "./nav-context/Consumer";

export type Logo = VNode;

export interface NavHeaderProps extends BaseProps {
  link?: string;
  linkOptions?: any;
  logo?: Logo;
  prefixCls?: string;
  text?: VNode;
}

export const vuePropsType = {
  prefixCls: {
    type: PropTypes.string,
    default: cssClasses.PREFIX,
  },
  logo: PropTypes.node,
  text: PropTypes.node,
  style: PropTypes.object,
  class: PropTypes.string,
  link: PropTypes.string,
  linkOptions: PropTypes.object,
}
const NavHeader = defineComponent<NavHeaderProps>((props, {slots}) => {

  const {context} = useNavContext()


  function renderLogo(logo: VNode) {
    if (isVNode(logo)) {
      return logo;
    }
    return null;
  }

  return () => {
    const {style, className, logo, text, link, linkOptions, prefixCls} = props;

    const children = slots.default?.()
    const {isCollapsed} = context.value;

    const wrapCls = cls(className, `${cssClasses.PREFIX}-header`, {
      [`${cssClasses.PREFIX}-header-collapsed`]: isCollapsed,
    });

    let wrappedChildren = (
      <>
        {logo ? <i class={`${cssClasses.PREFIX}-header-logo`}>{renderLogo(logo)}</i> : null}
        {!isNullOrUndefined(text) && !isCollapsed ? (
          <span class={`${cssClasses.PREFIX}-header-text`}>{text}</span>
        ) : null}
        {children}
      </>
    );

    if (typeof link === 'string') {
      wrappedChildren = (
        <a class={`${prefixCls}-header-link`} href={link} {...(linkOptions as any)}>
          {wrappedChildren}
        </a>
      );
    }

    return (
      <div class={wrapCls} style={style}>
        {wrappedChildren}
      </div>
    );
  }
})

NavHeader.props = vuePropsType
NavHeader.name = "NavHeader"
export default NavHeader

