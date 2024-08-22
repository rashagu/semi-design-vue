/* eslint-disable max-len */
import cls from 'classnames';
import {
  cloneVNode,
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  Fragment,
  h,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  useSlots,
  VNode,
} from 'vue';
import * as propTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/breadcrumb/constants';
import BreadcrumbFoundation, { BreadcrumbAdapter } from '@douyinfe/semi-foundation/breadcrumb/foundation';
import warning from '@douyinfe/semi-foundation/utils/warning';
import { isFunction } from 'lodash';
import '@douyinfe/semi-foundation/breadcrumb/breadcrumb.scss';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import Popover from '../popover';
import type { BreadcrumbItemInfo, BreadcrumbItemProps, RouteProps } from './item';
import BreadcrumbItem from './item';
import BreadContext from './bread-context';
import { TooltipProps } from '../tooltip';
import { IconMore } from '@kousum/semi-icons-vue';

import { AriaAttributes } from '../AriaAttributes';
import { CombineProps, VueJsxNode } from '../interface';
import { getFragmentChildren, getVNodeChildren } from '../_utils';

const clsPrefix = cssClasses.PREFIX;

export { RouteProps, BreadcrumbItemProps, BreadcrumbItemInfo };
export interface showToolTipProps {
  width?: string | number;
  ellipsisPos?: 'end' | 'middle';
  opts?: TooltipProps;
}

export type MoreType = 'default' | 'popover';

export interface BreadcrumbProps extends BaseProps {
  routes?: Array<RouteProps>;
  onClick?: (route: RouteProps, event: MouseEvent) => void;
  separator?: VueJsxNode;
  compact?: boolean;
  style?: CSSProperties;
  renderItem?: (route: RouteProps) => VNode;
  className?: string;
  showTooltip?: boolean | showToolTipProps;
  maxItemCount?: number;
  autoCollapse?: boolean;
  /* Customize the contents of the ellipsis area */
  renderMore?: (restItem: Array<VNode>) => VNode;
  /* Style type for ellipsis area */
  moreType?: MoreType;
  'aria-label'?: AriaAttributes['aria-label'];
  activeIndex?: number;
}

interface BreadcrumbState {
  isCollapsed: boolean;
}

const propTypes_: CombineProps<BreadcrumbProps> = {
  activeIndex: propTypes.number,
  routes: propTypes.array,
  onClick: propTypes.func as PropType<BreadcrumbProps['onClick']>,
  separator: propTypes.node as PropType<BreadcrumbProps['separator']>,
  compact: propTypes.bool,
  style: propTypes.object,
  renderItem: propTypes.func as PropType<BreadcrumbProps['renderItem']>,
  showTooltip: [propTypes.object, propTypes.bool],
  className: propTypes.string,
  autoCollapse: propTypes.bool,
  maxItemCount: propTypes.number,

  /* Customize the contents of the ellipsis area */
  renderMore: propTypes.func as PropType<BreadcrumbProps['renderMore']>,

  /* Type of ellipsis area */
  moreType: String as PropType<BreadcrumbProps['moreType']>,
  'aria-label': propTypes.string,
};
const defaultProps = {
  routes: [] as [],
  onClick: noop,
  renderItem: undefined as undefined,
  separator: '/',
  compact: true,
  showTooltip: {
    width: 150,
    ellipsisPos: 'end',
  },
  autoCollapse: true,
  moreType: 'default',
  maxItemCount: 4,
  'aria-label': 'Breadcrumb',
};
export const vuePropsType = vuePropsMake(propTypes_, defaultProps);
const Breadcrumb = defineComponent({
  props: { ...vuePropsType },
  name: 'Breadcrumb',
  setup(props, {}) {
    const state = reactive<BreadcrumbState>({
      isCollapsed: true,
    });

    const { adapter: adapterInject, getDataAttr } = useBaseComponent<BreadcrumbProps>(props, state);
    function adapter(): BreadcrumbAdapter<BreadcrumbProps, BreadcrumbState> {
      return {
        ...adapterInject<BreadcrumbProps, BreadcrumbState>(),
        notifyClick: (...args) => {
          props.onClick(...args);
        },
        expandCollapsed: () => (state.isCollapsed = false),
      };
    }
    const foundation = new BreadcrumbFoundation(adapter());

    onMounted(() => {
      foundation.init();
    });
    onUnmounted(() => {
      foundation.destroy();
    });

    function renderPopoverMore(restItem: Array<VNode>) {
      const { separator } = props;
      const content = (
        <>
          {restItem.map((item: VNode, idx: number) => (
            <Fragment key={`restItem-${idx}`}>
              {item}
              {idx !== restItem.length - 1 && <span class={`${clsPrefix}-restItem`}>{separator}</span>}
            </Fragment>
          ))}
        </>
      );
      return (
        <Popover
          content={content}
          style={{
            padding: 12,
          }}
          showArrow
        >
          <IconMore />
        </Popover>
      );
    }

    const handleCollapse = (template: Array<VNode>, itemsLen: number) => {
      const { maxItemCount, renderMore, moreType } = props;
      const hasRenderMore = isFunction(renderMore);
      const restItem = template.slice(1, itemsLen - maxItemCount + 1);
      const spread = (
        <span class={`${clsPrefix}-collapse`} key={`more-${itemsLen}`}>
          <span class={`${clsPrefix}-item-wrap`}>
            <span
              role="button"
              tabindex={0}
              aria-label="Expand breadcrumb items"
              class={`${clsPrefix}-item ${clsPrefix}-item-more`}
              onClick={(item) => foundation.handleExpand(item)}
              onKeypress={(e) => foundation.handleExpandEnterPress(e)}
            >
              {hasRenderMore && renderMore(restItem)}
              {!hasRenderMore && moreType === 'default' && <IconMore />}
              {!hasRenderMore && moreType === 'popover' && renderPopoverMore(restItem)}
            </span>
            <span class={`${clsPrefix}-separator`} x-semi-prop="separator">
              {props.separator}
            </span>
          </span>
        </span>
      );
      template.splice(1, itemsLen - maxItemCount, spread);
      return template;
    };

    const renderRouteItems = (items: Array<RouteProps>, shouldCollapse: boolean, moreTypeIsPopover: boolean) => {
      const { renderItem, renderMore, maxItemCount } = props;
      const restItemLength = items.length - maxItemCount;
      const hasRenderMore = isFunction(renderMore);
      const template = items.map((route, idx: number) => {
        const key = route._origin.key || `item-${route.name || route.path}-${idx}`;
        const inCollapseArea = idx > 0 && idx <= restItemLength;
        return (
          <BreadcrumbItem
            {...route}
            key={key}
            active={props.activeIndex !== undefined ? props.activeIndex === idx : idx === items.length - 1}
            route={route._origin}
            // eslint-disable-next-line max-len
            shouldRenderSeparator={
              idx !== items.length - 1 && !(shouldCollapse && (hasRenderMore || moreTypeIsPopover) && inCollapseArea)
            }
          >
            {renderItem ? renderItem(route._origin) : route.name}
          </BreadcrumbItem>
        );
      });
      return template;
    };

    const slots = useSlots();
    const renderList = (): Array<VNode> => {
      const { routes, autoCollapse, maxItemCount, renderMore, moreType } = props;
      const { isCollapsed } = state;
      const hasRoutes = routes && routes.length > 0;
      const items = hasRoutes ? foundation.genRoutes(routes) : getFragmentChildren(slots) || [];

      let template;

      const itemLength = items.length; // children length

      const restItemLength = itemLength - maxItemCount; // Omitted children items

      const shouldCollapse = items && autoCollapse && itemLength > maxItemCount && isCollapsed; // Whether the number of children exceeds, need to collapse

      const hasRenderMore = isFunction(renderMore); // Whether the user passes in the renderMore method
      const moreTypeIsPopover = moreType === 'popover';

      if (hasRoutes) {
        template = renderRouteItems(items, shouldCollapse, moreTypeIsPopover);
      } else {
        template = items.map((item: any, idx: number) => {
          const inCollapseArea = idx > 0 && idx <= restItemLength;
          if (!item) {
            return item;
          }
          warning(
            item.type && item.type.name !== 'BreadcrumbItem',
            '[Semi Breadcrumb]: Only accepts Breadcrumb.Item as its children'
          );

          return cloneVNode(item, {
            key: `${idx}-item`,
            active: props.activeIndex !== undefined ? props.activeIndex === idx : idx === items.length - 1,
            shouldRenderSeparator:
              idx !== items.length - 1 && !(shouldCollapse && (hasRenderMore || moreTypeIsPopover) && inCollapseArea),
          });
        });
      }

      if (shouldCollapse) {
        return handleCollapse(template, items.length);
      }

      return template;
    };

    const onClick = (info: BreadcrumbItemInfo, event: MouseEvent) => {
      foundation.handleClick(info, event);
    };

    return () => {
      const breadcrumbs = renderList();
      const { compact, className, style, separator, showTooltip } = props;
      const sizeCls = cls(className, {
        [`${clsPrefix}-wrapper`]: true,
        [`${clsPrefix}-wrapper-compact`]: compact,
        [`${clsPrefix}-wrapper-loose`]: !compact,
      });
      return (
        <BreadContext.Provider
          value={{
            onClick: onClick,
            showTooltip,
            compact,
            separator,
          }}
        >
          <nav aria-label={props['aria-label']} class={sizeCls} style={style} {...getDataAttr()}>
            {breadcrumbs}
          </nav>
        </BreadContext.Provider>
      );
    };
  },
});


export type BreadcrumbType = typeof Breadcrumb & {
  Item: typeof BreadcrumbItem
}
const BaseBreadcrumb = Breadcrumb as BreadcrumbType
BaseBreadcrumb.Item = BreadcrumbItem
export default BaseBreadcrumb;
export { BreadcrumbItem };
