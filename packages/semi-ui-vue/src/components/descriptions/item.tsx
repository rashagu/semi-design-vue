import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/descriptions/constants';
import '@douyinfe/semi-foundation/descriptions/descriptions.scss';
import { CSSProperties, defineComponent, h, useSlots, VNode } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useDescriptionsContext } from './context/Consumer';
import { VueJsxNode } from '../interface';

export interface DescriptionsItemProps {
  hidden?: boolean;
  className?: string;
  children?: VNode[];
  style?: CSSProperties;
  itemKey?: VueJsxNode;
}

const prefixCls = cssClasses.PREFIX;
const keyCls = `${prefixCls}-key`;
const valCls = `${prefixCls}-value`;

const propTypes = {
  itemKey: PropTypes.node,
  hidden: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
export const vuePropsType = vuePropsMake(propTypes, {});
const DescriptionsItem = defineComponent<DescriptionsItemProps>((props, {}) => {
  const slots = useSlots();

  const { context } = useDescriptionsContext();

  return () => {
    const children = slots.default?.();
    const { itemKey, hidden, className, style } = props;
    const { align } = context.value;
    if (hidden) {
      return null;
    }
    const item =
      align === 'plain' ? (
        <tr class={className} style={style}>
          <td class={`${prefixCls}-item`}>
            <span class={keyCls}>{itemKey}:</span>
            <span class={valCls}>{children}</span>
          </td>
        </tr>
      ) : (
        <tr class={className} style={style}>
          <th class={`${prefixCls}-item ${prefixCls}-item-th`}>
            <span class={keyCls}>{itemKey}</span>
          </th>
          <td class={`${prefixCls}-item ${prefixCls}-item-td`}>
            <span class={valCls}>{children}</span>
          </td>
        </tr>
      );
    return item;
  };
}, {
  props: vuePropsType,
  name: 'DescriptionsItem'
});


export default DescriptionsItem;
