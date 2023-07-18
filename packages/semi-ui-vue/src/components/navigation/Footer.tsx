import * as PropTypes from '../PropTypes';
import cls from 'classnames';

import {cssClasses, strings} from '@douyinfe/semi-foundation/navigation/constants';
// @ts-ignore
import CollapseButton from './CollapseButton';
import '@douyinfe/semi-foundation/navigation/navigation.scss';
import {BaseProps} from '../_base/baseComponent';
import {ComponentObjectPropsOptions, defineComponent, h, isVNode, PropType, VNode} from "vue";
import {useNavContext} from "./nav-context/Consumer";
import {VueJsxNode} from "../interface";

export interface NavFooterProps extends BaseProps {
  collapseButton?: VueJsxNode;
  collapseText?: (collapsed?: boolean) => VueJsxNode;
}

export const vuePropsType:ComponentObjectPropsOptions<NavFooterProps> = {
  // children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  collapseButton: {
    type: PropTypes.any as PropType<NavFooterProps['collapseButton']>,
    default: false
  },
  collapseText: PropTypes.func as PropType<NavFooterProps['collapseText']>,
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
}, {
  props: vuePropsType,
  name: 'NavFooter'
})



export default NavFooter
