import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { strings, cssClasses } from '@douyinfe/semi-foundation/descriptions/constants';
import '@douyinfe/semi-foundation/descriptions/descriptions.scss';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import { isPlainObject } from 'lodash';
import DescriptionsContext, {
  DescriptionLayout,
  DescriptionsAlign,
  DescriptionsContextValue,
} from './descriptions-context';
import Item from './item';
import { CSSProperties, defineComponent, Fragment, h, isVNode, PropType, useAttrs, useSlots, VNode } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { VueJsxNode } from '../interface';
import { ComponentObjectPropsOptions } from 'vue';
import { getProps, useBaseComponent } from '../_base/baseComponent';
import DescriptionsFoundation, { DescriptionsAdapter } from '@douyinfe/semi-foundation/descriptions/foundation';
import { getFragmentChildren } from '../_utils';

export type { DescriptionsItemProps } from './item';
export type DescriptionsSize = 'small' | 'medium' | 'large';
export interface Data {
  key?: VueJsxNode;
  value?: (() => VueJsxNode) | VueJsxNode;
  hidden?: boolean;
  span?: number;
}
export interface DescriptionsProps {
  align?: DescriptionsAlign;
  row?: boolean;
  size?: DescriptionsSize;
  style?: CSSProperties;
  className?: string;
  children?: VNode[];
  data?: Data[];
  layout?: DescriptionLayout;
  column?: number;
}

const prefixCls = cssClasses.PREFIX;

const propTypes: ComponentObjectPropsOptions<DescriptionsProps> = {
  align: PropTypes.string as PropType<DescriptionsProps['align']>,
  row: PropTypes.bool,
  size: PropTypes.string as PropType<DescriptionsProps['size']>,
  style: PropTypes.object,
  className: PropTypes.string,
  data: PropTypes.array,
  layout: PropTypes.string as PropType<DescriptionsProps['layout']>,
  column: PropTypes.number,
};

const defaultProps = {
  align: 'center',
  row: false,
  size: 'medium',
  data: [] as Array<Data>,
  layout: 'vertical',
  column: 3,
};
export const vuePropsType = vuePropsMake<DescriptionsProps>(propTypes, defaultProps);
const Descriptions = defineComponent(
  (props, {}) => {
    const slots = useSlots();
    const attr = useAttrs();

    const { adapter: adapterInject } = useBaseComponent<DescriptionsProps>(props, {});
    function adapter_(): DescriptionsAdapter<DescriptionsProps> {
      return {
        ...adapterInject(),
        getColumns: () => {
          if (props.data?.length) {
            return props.data;
          }
          const children = getFragmentChildren(slots);
          if (children) {
            return children.map((item) => {
              return isVNode(item)
                ? {
                //@ts-ignore
                  value: item.children.default?.(),
                    ...item.props,
                  }
                : [];
            });
          }
          return [];
        },
      };
    }
    const adapter = adapter_();
    const foundation = new DescriptionsFoundation<DescriptionsProps>(adapter);

    // 当一行里面的列数没有达到maxColumnPerLine，就让最后一列填满剩余的
    function _rowFillRemainder(itemRow: any) {
      const { column: maxColumnPerLine } = adapter.getProps();
      if (itemRow.length === 0) {
        return;
      }
      const lastSpan = itemRow[itemRow.length - 1];
      // 如果用户设置了span就跳过
      if (lastSpan.span && !isNaN(lastSpan.span)) {
        return;
      }

      let total = 0;
      itemRow.forEach((item: { span: number })=>{
        return total += !isNaN(item.span)?item.span:1;
      });

      if (total < maxColumnPerLine) {
        lastSpan.span = maxColumnPerLine - total + 1;
      }
    }

    function getHorizontalList() {
      const { column: maxColumnPerLine } = adapter.getProps();
      const columns = adapter.getColumns();
      const horizontalList = [];
      const curRow = { totalSpan: 0, itemList: [] };
      columns.forEach((item, index) => {
        let itemSpan = item.span || 1;
        let restSpan = maxColumnPerLine - curRow.totalSpan;
        if (itemSpan <= restSpan) {
          curRow.itemList.push(item);
          curRow.totalSpan = curRow.totalSpan + itemSpan;
        } else {
          // 剩余空间放不下当前item，需要另起一行
          // 若新行放不下当前item，极端情况，例如用户给当前span数值远大于 maxColumnPerLine，即使另起新行都无法放得下，itemSpan直接按props.column处理
          itemSpan > maxColumnPerLine ? itemSpan = maxColumnPerLine : null;
          // 新行能放得下当前item，将原有行push到horizontalList中，然后重置curRow，将当前item存到curRow中
          _rowFillRemainder(curRow.itemList);
          horizontalList.push(curRow.itemList);
          curRow.totalSpan = itemSpan;
          curRow.itemList = [item];
        }
        if (index === columns.length -1) {
          _rowFillRemainder(curRow.itemList);
          horizontalList.push(curRow.itemList);
        }
      });

      return horizontalList;
    }
    const renderChildrenList = () => {
      const children = getFragmentChildren(slots);

      const { layout, data } = props;
      if (layout === 'horizontal') {
        const horizontalList: Data[][] = getHorizontalList();
        return horizontalList.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((item, itemIndex) =>
                isPlainObject(item) ? (
                  <Item itemKey={item.key} {...item} key={index + '-' + itemIndex}>
                    {item.value}
                  </Item>
                ) : null
              )}
            </tr>
          );
        });
      } else {
        return data && data.length
          ? data.map((item, index) =>
              isPlainObject(item) ? (
                <Item itemKey={item.key} {...item} key={index}>
                  {item.value}
                </Item>
              ) : null
            )
          : children;
      }
    };

    return () => {
      const { align, row, size, className, style, data, layout, ...rest } = props;
      const classNames = cls(prefixCls, className, {
        [`${prefixCls}-${align}`]: !row,
        [`${prefixCls}-double`]: row,
        [`${prefixCls}-double-${size}`]: row,
        [`${prefixCls}-horizontal`]: layout === 'horizontal',
        [`${prefixCls}-vertical`]: layout === 'vertical',
      });
      return (
        <div class={classNames} style={style} {...getDataAttr({ ...rest, ...attr })}>
          <table>
            <tbody>
              <DescriptionsContext.Provider value={{ align, layout }}>
                {renderChildrenList()}
              </DescriptionsContext.Provider>
            </tbody>
          </table>
        </div>
      );
    };
  },
  {
    props: vuePropsType,
    name: 'Descriptions',
  }
);

export default Descriptions;
export { Item as DescriptionsItem };
