import cls from 'classnames';
import * as propTypes from '../PropTypes';
import {cssClasses} from '@douyinfe/semi-foundation/breadcrumb/constants';
import BreadcrumbItemFoundation from '@douyinfe/semi-foundation/breadcrumb/itemFoundation';
import type {
  BreadcrumbItemAdapter,
  BreadcrumbItemInfo,
  Route
} from '@douyinfe/semi-foundation/breadcrumb/itemFoundation';

import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import {noop} from '@douyinfe/semi-foundation/utils/function';
import {Text as TypographyText} from '../typography';
import type {EllipsisPos, ShowTooltip as ShowTooltipType} from '../typography';
import {merge, isUndefined, isNull} from 'lodash';
import {
  h,
  Fragment,
  VNode,
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
  isVNode,
  cloneVNode,
  useSlots, ComponentObjectPropsOptions, PropType
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useBreadContext} from "./context/Consumer";

const clsPrefix = cssClasses.PREFIX;

export {BreadcrumbItemInfo};

export interface RouteProps extends Route {
  icon?: VNode;
}

export interface BreadcrumbItemProps extends BaseProps {
  onClick?: (item: RouteProps, e: MouseEvent) => void;
  icon?: VNode;
  href?: string;
  separator?: VNode;
  noLink?: boolean;
  active?: boolean;
  shouldRenderSeparator?: boolean;
  route?: RouteProps;
}

type BreadcrumbItemState = Record<string, never>;

interface GetTooltipOptType {
  width: number;
  ellipsisPos: EllipsisPos;
  opts?: ShowTooltipType['opts'];
}

const propTypes_:ComponentObjectPropsOptions<BreadcrumbItemProps> = {
  onClick: propTypes.func as PropType<BreadcrumbItemProps['onClick']>,
  route: [propTypes.object, propTypes.string],
  active: propTypes.bool,
  shouldRenderSeparator: propTypes.bool,
  icon: propTypes.node as PropType<BreadcrumbItemProps['icon']>,
  separator: propTypes.node as PropType<BreadcrumbItemProps['separator']>,
  noLink: propTypes.bool,
};

const defaultProps = {
  onClick: noop,
  shouldRenderSeparator: true
};

export const vuePropsType = vuePropsMake(propTypes_, defaultProps)
const BreadcrumbItem = defineComponent<BreadcrumbItemProps>((props, {}) => {
  const slots = useSlots()
  const state = reactive<BreadcrumbItemState>({})
  const {context} = useBreadContext()
  const {
    adapter: adapterInject,
    getDataAttr
  } = useBaseComponent<BreadcrumbItemProps>(props, state)

  function adapter(): BreadcrumbItemAdapter<BreadcrumbItemProps, BreadcrumbItemState> {
    return {
      ...adapterInject<BreadcrumbItemProps, BreadcrumbItemState>(),
      notifyClick: (...args) => {
        props.onClick(...args);
      },
      notifyParent: (...args) => {
        context.value.onClick(...args);
      },
    };
  }

  const foundation = new BreadcrumbItemFoundation(adapter());

  onMounted(() => {
    foundation.init();
  })
  onUnmounted(() => {
    foundation.destroy();
  })

  const renderIcon = () => {
    const iconType = props.icon;
    const {compact} = context.value;
    const iconSize = compact ? 'small' : 'default';
    const className = `${clsPrefix}-item-icon`;
    if (isVNode(iconType)) {
      return cloneVNode(iconType, {className, size: iconSize});
    }
    return iconType;
  };

  const getTooltipOpt = () => {
    const {showTooltip} = context.value;
    if (!showTooltip) {
      return {
        width: 150,
        ellipsisPos: 'end',
      };
    }
    const defaultOpts = {
      width: 150,
      ellipsisPos: 'end',
      opts: {
        autoAdjustOverflow: true,
        position: 'top',
      },
    };
    if (typeof showTooltip === 'object') {
      return merge(defaultOpts, showTooltip);
    }
    return defaultOpts;
  };

  const getItemInfo = (): BreadcrumbItemInfo => {
    let itemInfo: BreadcrumbItemInfo = {};
    const children = slots.default?.();
    const {route, href} = props;
    const hasHref = !isUndefined(href) && !isNull(href);
    if (route) {
      itemInfo = route;
    } else {
      itemInfo.name = children;
      if (hasHref) {
        itemInfo.href = href;
      }
    }
    return itemInfo;
  };

  const renderBreadItem = () => {
    const children = slots.default?.();
    const {compact} = context.value;
    const showTooltip = getTooltipOpt();
    const icon = renderIcon();
    if (Boolean(children) && typeof children === 'string') {
      const {opts, ellipsisPos, width} = showTooltip as GetTooltipOptType;
      return (
        <Fragment>
          {icon}
          <span class={`${clsPrefix}-item-title`}>
                        <TypographyText
                          ellipsis={{
                            showTooltip: opts ? {opts} : false,
                            pos: ellipsisPos,
                          }}
                          // icon={renderIcon(icon)}
                          style={{ maxWidth: width }}
                          size={compact ? 'small' : 'normal'}
                        >
                            {children}
                        </TypographyText>
                    </span>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {icon}
        {children ? (
          <span class={`${clsPrefix}-item-title ${clsPrefix}-item-title-inline`}>{children}</span>
        ) : null}
      </Fragment>
    );
  };

  const renderItem = () => {
    const {href, active, noLink} = props;
    const hasHref = href !== null && typeof href !== 'undefined';
    const itemCls = cls({
      [`${clsPrefix}-item`]: true,
      [`${clsPrefix}-item-active`]: active,
      [`${clsPrefix}-item-link`]: !noLink,
    });
    const itemInner = renderBreadItem();
    const tag = active || !hasHref ? 'span' : 'a';
    const itemInfo = getItemInfo();

    return h(
      tag,
      {
        className: itemCls,
        onClick: e => foundation.handleClick(itemInfo, e),
        href,
      },
      itemInner
    );
  };

  return () => {
    const {
      active,
      shouldRenderSeparator
      // children,
    } = props;
    const pageLabel = active ? { 'aria-current': 'page' as const } : {};
    const item = renderItem();
    const separator = !active ?
      props.separator || <span class={`${clsPrefix}-separator`}>{context.value.separator}</span> :
      null;
    const wrapperCLs = cls({
      [`${clsPrefix}-item-wrap`]: true,
      // [`${clsPrefix}-item-wrap-iconOnly`]: !!children && props.icon,
    });
    return (
      <span class={wrapperCLs} {...pageLabel} {...getDataAttr()}>
        {item}
        {shouldRenderSeparator && separator}
      </span>
    );
  }
}, {
  props: vuePropsType,
  name: 'BreadcrumbItem'
})



export default BreadcrumbItem
