import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { noop } from 'lodash';
import { IconCaretup, IconCaretdown } from '@kousum/semi-icons-vue';

import { cssClasses, strings } from '@douyinfe/semi-foundation/table/constants';

import { SortIcon, SortOrder } from './interface';
import isEnterPress from '@douyinfe/semi-foundation/utils/isEnterPress';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, PropType, useSlots } from 'vue';
import { CombineProps, VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';

export interface ColumnSorterProps {
  className?: string;
  style?: CSSProperties;
  onClick?: (e: MouseEvent) => void;
  prefixCls?: string;
  sortOrder?: SortOrder;
  title?: VueJsxNode;
  sortIcon?: SortIcon;
}

const propTypes: CombineProps<ColumnSorterProps> = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func as PropType<ColumnSorterProps['onClick']>,
  prefixCls: PropTypes.string,
  sortOrder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sortIcon: PropTypes.func as PropType<ColumnSorterProps['sortIcon']>,
  title: PropTypes.any as PropType<ColumnSorterProps['title']>,
};

const defaultProps = {
  prefixCls: cssClasses.PREFIX,
  onClick: noop,
  sortOrder: false,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const ColumnSorter = defineComponent({
  props: { ...vuePropsType },
  name: 'ColumnSorter',
  setup(props, {}) {
    const slots = useSlots();

    return () => {
      const { prefixCls, onClick, sortOrder, style, title, sortIcon } = props;

      const iconBtnSize = 'default';

      const upCls = cls(`${prefixCls}-column-sorter-up`, {
        on: sortOrder === strings.SORT_DIRECTIONS[0],
      });

      const downCls = cls(`${prefixCls}-column-sorter-down`, {
        on: sortOrder === strings.SORT_DIRECTIONS[1],
      });
      const ariaProps = {
        /**
         * Set 'aria-sort' to aria-columnheader is difficult, so set 'aria-label' about sort info to sorter
         * reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaSort
         */
        'aria-label': `Current sort order is ${sortOrder ? `${sortOrder}ing` : 'none'}`,
        'aria-roledescription': 'Sort data with this column',
      };

      const renderSortIcon = () => {
        if (typeof sortIcon === 'function') {
          return sortIcon({ sortOrder });
        } else {
          return (
            <div style={style} class={`${prefixCls}-column-sorter`}>
              <span class={`${upCls}`}>
                <IconCaretup size={iconBtnSize} />
              </span>
              <span class={`${downCls}`}>
                <IconCaretdown size={iconBtnSize} />
              </span>
            </div>
          );
        }
      };

      return (
        <div
          role="button"
          {...ariaProps}
          tabindex={-1}
          class={`${prefixCls}-column-sorter-wrapper`}
          onClick={onClick}
          onKeypress={(e) => isEnterPress(e) && onClick(e as any)}
        >
          {title}
          {renderSortIcon()}
        </div>
      );
    };
  },
});

export default ColumnSorter;
