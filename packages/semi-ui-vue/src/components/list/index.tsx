import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/list/constants';
import { noop } from 'lodash';
import '@douyinfe/semi-foundation/list/list.scss';
import LocaleConsumer from '../locale/localeConsumer';
import { Locale } from '../locale/interface';
import ListItem from './item';
import { Row } from '../grid';
import Spin from '../spin';
import ListContext, { Grid } from './list-context';
import {
  cloneVNode,
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  PropType,
  useSlots,
  VNode,
} from 'vue';
import { VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import { useAttrs } from 'vue';

export type { ListItemProps } from './item';

export interface ListProps<T> {
  style?: CSSProperties;
  className?: string;
  bordered?: boolean;
  footer?: VueJsxNode;
  header?: VueJsxNode;
  layout?: 'vertical' | 'horizontal';
  size?: 'small' | 'large' | 'default';
  split?: boolean;
  emptyContent?: VueJsxNode;
  dataSource?: T[];
  renderItem?: (item: T, ind: number) => VNode;
  grid?: Grid;
  loading?: boolean;
  loadMore?: VueJsxNode;
  onClick?: (e: MouseEvent) => void;
  onRightClick?: (e: MouseEvent) => void;
}

const prefixCls = cssClasses.PREFIX;

const propTypes: ComponentObjectPropsOptions<ListProps<any>> = {
  style: PropTypes.object,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  footer: PropTypes.node,
  header: PropTypes.node,
  layout: PropTypes.string as PropType<ListProps<any>['layout']>,
  size: PropTypes.string as PropType<ListProps<any>['size']>,
  split: PropTypes.bool,
  emptyContent: PropTypes.node,
  dataSource: PropTypes.array,
  renderItem: PropTypes.func as PropType<ListProps<any>['renderItem']>,
  grid: PropTypes.object,
  loading: PropTypes.bool,
  loadMore: PropTypes.node,
  onRightClick: PropTypes.func as PropType<ListProps<any>['onRightClick']>,
  onClick: PropTypes.func as PropType<ListProps<any>['onClick']>,
};

const defaultProps = {
  bordered: false,
  split: true,
  loading: false,
  layout: 'vertical',
  size: 'default',
  onRightClick: noop,
  onClick: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);

const List = defineComponent({
  props: vuePropsType,
  name: 'List',
  setup(props, {}) {
    const slots = useSlots();
    const attr = useAttrs();

    const renderEmpty = () => {
      const { emptyContent } = props;
      if (emptyContent) {
        return (
          <div class={`${cssClasses.PREFIX}-empty`} x-semi-prop="emptyContent">
            {emptyContent}
          </div>
        );
      } else {
        return (
          <LocaleConsumer componentName="List">
            {(locale: Locale['List']) => <div class={`${cssClasses.PREFIX}-empty`}>{locale.emptyText}</div>}
          </LocaleConsumer>
        );
      }
    };

    function wrapChildren(childrenList: VNode[], children: VNode[]) {
      const { grid } = props;
      if (grid) {
        const rowProps = {};
        ['align', 'gutter', 'justify', 'type'].forEach((key) => {
          if (key in grid) {
            rowProps[key] = grid[key];
          }
        });
        return (
          <Row type="flex" {...rowProps}>
            {childrenList ? childrenList : null}
            {children}
          </Row>
        );
      }
      return (
        <ul class={`${prefixCls}-items`}>
          {childrenList ? childrenList : null}
          {children}
        </ul>
      );
    }

    return () => {
      const children = slots.default?.();
      const {
        style,
        className,
        header,
        loading,
        onRightClick,
        onClick,
        footer,
        layout,
        grid,
        size,
        split,
        loadMore,
        bordered,
        dataSource,
        renderItem,
        ...rest
      } = props;
      const wrapperCls = cls(prefixCls, className, {
        [`${prefixCls}-flex`]: layout === 'horizontal',
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-grid`]: grid,
        [`${prefixCls}-split`]: split,
        [`${prefixCls}-bordered`]: bordered,
      });
      let childrenList;
      if (dataSource && dataSource.length) {
        childrenList = [];
        const items = renderItem ? dataSource.map((item, index) => renderItem(item, index)) : [];
        items.forEach((child, index) => {
          const itemKey = child.key || `list-item-${index}`;
          childrenList.push(
            cloneVNode(child, {
              key: itemKey,
            })
          );
        });
      } else if (!children && !loading) {
        childrenList = renderEmpty();
      }
      return (
        <div class={wrapperCls} style={style} {...getDataAttr({ ...rest, ...attr })}>
          {header ? (
            <div class={`${cssClasses.PREFIX}-header`} x-semi-prop="header">
              {header}
            </div>
          ) : null}
          <ListContext.Provider
            value={{
              grid,
              onRightClick,
              onClick,
            }}
          >
            <Spin spinning={loading} size="large">
              {wrapChildren(childrenList, children)}
            </Spin>
          </ListContext.Provider>
          {footer ? (
            <div class={`${cssClasses.PREFIX}-footer`} x-semi-prop="footer">
              {footer}
            </div>
          ) : null}
          {loadMore ? loadMore : null}
        </div>
      );
    };
  },
});

export default List;
export { ListItem };
