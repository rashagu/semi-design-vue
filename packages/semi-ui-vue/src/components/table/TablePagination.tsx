import * as PropTypes from '../PropTypes';
import { get, isFunction } from 'lodash';

import { cssClasses } from '@douyinfe/semi-foundation/table/constants';
import Pagination from '../pagination';
import { RenderPagination, TablePaginationProps as PaginationProps } from './interface';
import { CombineProps, VueJsxNode } from '../interface';
import type { ComponentObjectPropsOptions, CSSProperties, PropType } from 'vue';
import { defineComponent, h, useSlots, Fragment, isVNode } from 'vue';
import { vuePropsMake } from '../PropTypes';

export interface TablePaginationProps {
  style?: CSSProperties;
  prefixCls?: string;
  pagination?: PaginationProps;
  info?: VueJsxNode;
  renderPagination?: RenderPagination;
}
const propTypes: CombineProps<TablePaginationProps> = {
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  pagination: PropTypes.object,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  renderPagination: PropTypes.func as PropType<TablePaginationProps['renderPagination']>,
};

const defaultProps = {
  prefixCls: cssClasses.PREFIX,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const TablePagination = defineComponent({
  props: vuePropsType,
  name: 'TablePagination',
  setup(props, {}) {
    const slots = useSlots();

    return () => {
      const { pagination, prefixCls, info, renderPagination } = props;
      const total = get(pagination, 'total');
      const customPagination = renderPagination && isFunction(renderPagination) ? renderPagination(pagination) : null;

      return (
        <div class={`${prefixCls}-pagination-outer`}>
          {isVNode(customPagination) ? (
            customPagination
          ) : (
            <Fragment>
              <span class={`${prefixCls}-pagination-info`}>{info}</span>
              <span class={`${prefixCls}-pagination-wrapper`}>
                {total > 0 ? <Pagination {...pagination} key={get(pagination, 'pageSize', 'pagination')} /> : null}
              </span>
            </Fragment>
          )}
        </div>
      );
    };
  },
});

export default TablePagination;
