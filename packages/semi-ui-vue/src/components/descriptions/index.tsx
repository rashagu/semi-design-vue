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
const Descriptions = defineComponent<DescriptionsProps>(
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

    const renderChildrenList = () => {
      const children = getFragmentChildren(slots);

      const { layout, data } = props;
      if (layout === 'horizontal') {
        const horizontalList: Data[][] = foundation.getHorizontalList();
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
