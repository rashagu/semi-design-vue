import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/descriptions/constants';
import '@douyinfe/semi-foundation/descriptions/descriptions.scss';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import { CSSProperties, defineComponent, h, useSlots, VNode } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useDescriptionsContext } from './context/Consumer';
import { VueJsxNode } from '../interface';
import { useAttrs } from 'vue';

export interface DescriptionsItemProps {
  hidden?: boolean;
  className?: string;
  children?: VNode[];
  style?: CSSProperties;
  itemKey?: VueJsxNode;
  span?: number;
}

const prefixCls = cssClasses.PREFIX;
const keyCls = `${prefixCls}-key`;
const valCls = `${prefixCls}-value`;

const propTypes = {
  itemKey: PropTypes.node,
  hidden: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  span: PropTypes.number,
  value: PropTypes.node,
};
export const vuePropsType = vuePropsMake(propTypes, {});
const DescriptionsItem = defineComponent({
  props: vuePropsType,
  name: 'DescriptionsItem',
  setup(props, {}) {
    const slots = useSlots();
    const attr = useAttrs();

    const { context } = useDescriptionsContext();

    return () => {
      const children = slots.default?.();
      const { itemKey, hidden, className, span, style, ...rest } = props;
      const { align, layout } = context.value;
      if (hidden) {
        return null;
      }
      const plainItem = (
        <td class={`${prefixCls}-item`} colspan={span || 1}>
          <span class={keyCls}>{itemKey}:</span>
          <span class={valCls}>{children}</span>
        </td>
      );
      const alignItem = (
        <>
          <th class={`${prefixCls}-item ${prefixCls}-item-th`}>
            <span class={keyCls}>{itemKey}</span>
          </th>
          <td class={`${prefixCls}-item ${prefixCls}-item-td`} colspan={span ? span * 2 - 1 : 1}>
            <span class={valCls}>{children}</span>
          </td>
        </>
      );
      const item =
        align === 'plain' ? (
          <tr class={className} style={style} {...getDataAttr(rest)}>
            {plainItem}
          </tr>
        ) : (
          <tr class={className} style={style} {...getDataAttr(rest)}>
            {alignItem}
          </tr>
        );
      const horizontalItem = align === 'plain' ? plainItem : alignItem;
      return layout === 'horizontal' ? horizontalItem : item;
    };
  },
});

export default DescriptionsItem;
