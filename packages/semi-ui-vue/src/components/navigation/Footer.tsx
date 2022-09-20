import * as PropTypes from '../PropTypes';
import cls from 'classnames';

import {cssClasses, strings} from '@douyinfe/semi-foundation/navigation/constants';
// @ts-ignore
import CollapseButton from './CollapseButton';
import '@douyinfe/semi-foundation/navigation/navigation.scss';
import {BaseProps} from '../_base/baseComponent';
import {defineComponent, h, isVNode, VNode} from "vue";
import {useNavContext} from "./nav-context/Consumer";

export interface NavFooterProps extends BaseProps {
  collapseButton?: VNode;
  collapseText?: (collapsed?: boolean) => VNode;
}

export const vuePropsType = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  collapseButton: {
    type: [PropTypes.node, PropTypes.bool],
    default: false
  },
  collapseText: PropTypes.func,
}
const NavFooter = defineComponent<NavFooterProps>((props, {slots}) => {

  const {context} = useNavContext()

  const renderCollapseButton = () => {
    const {collapseButton, collapseText} = props;

    if (isVNode(collapseButton)) {
      return collapseButton;
    }

    const {onCollapseChange, prefixCls, locale, isCollapsed} = context.value;

    return (
      <CollapseButton
        prefixCls={prefixCls}
        isCollapsed={isCollapsed}
        locale={locale}
        onClick={(val)=>{
          onCollapseChange(val)
        }}
        collapseText={collapseText}
        {...(typeof collapseButton === 'object' ? collapseButton : {})}
      />
    );
  };


  return () => {
    const {style, className, collapseButton} = props;
    let children = slots.default?.();
    const {isCollapsed, mode} = context.value;

    if (!isVNode(children) && collapseButton && mode !== strings.MODE_HORIZONTAL) {
      children = renderCollapseButton() as any;
    }

    const wrapCls = cls(className, `${cssClasses.PREFIX}-footer`, {
      [`${cssClasses.PREFIX}-footer-collapsed`]: isCollapsed,
    });

    return (
      <div class={wrapCls} style={style}>
        {children}
      </div>
    );
  }
})

NavFooter.props = vuePropsType

export default NavFooter
