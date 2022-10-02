import {defineComponent, ref, h, Fragment, useSlots, VNode} from 'vue'
import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import { cssClasses } from '@douyinfe/semi-foundation/scrollList/constants';
import classnames from 'classnames';
import ScrollItem from './scrollItem';
import Foundation from '@douyinfe/semi-foundation/scrollList/foundation';

import '@douyinfe/semi-foundation/scrollList/scrollList.scss';
import {CheckboxProps} from "../checkbox";

export type { ScrollItemProps } from './scrollItem';

export interface ScrollListProps extends BaseProps {
  header?: VNode | string;
  footer?: VNode | string;
  children?: VNode | string;
  bodyHeight?: number | string;
  prefixCls?: string;
}

export const vuePropsType = {
  header: [Object, String],
  footer: [Object, String],
  children: [Object, String],
  bodyHeight: [Number, String],
  prefixCls: [String],
}
const index = defineComponent<ScrollListProps>((props, {}) => {
  const slots = useSlots()
  const {cache, adapter: adapterInject, log, context: context_} = useBaseComponent<CheckboxProps>(props, {})

  const foundation = new Foundation(adapterInject<CheckboxProps>());

  return () => {

    const { header, footer, prefixCls, bodyHeight, className, style } = props;

    const clsWrapper = classnames(className, {
      [prefixCls || cssClasses.PREFIX]: true,
    });

    const clsHeader = classnames({
      [`${prefixCls || cssClasses.PREFIX}-header`]: true,
    });

    return (
      <div class={clsWrapper} style={style}>
        {header ? (
          <div class={clsHeader}>
            <div class={`${clsHeader}-title`}>{header}</div>
            <div class={`${clsWrapper}-line`} />
          </div>
        ) : null}
        <div class={`${clsWrapper}-body`} style={{ height: bodyHeight ? bodyHeight : '' }}>
          {slots.default?.()}
        </div>
        {footer ? <div class={`${clsWrapper}-footer`}>{footer}</div> : null}
      </div>
    );
  }
})

index.props = vuePropsType

export default index

