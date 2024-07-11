/* eslint-disable max-len */
import * as PropTypes from '../PropTypes';
import { get, noop } from 'lodash';
import classnames from 'classnames';

import ColGroup from './ColGroup';
import TableHeader from './TableHeader';
import { Fixed, TableComponents, Scroll, BodyScrollEvent, ColumnProps, OnHeaderRow, Sticky } from './interface';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, PropType, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useHasInProps } from '../_base/baseComponent';
import { CombineProps } from '../interface';

export interface HeadTableProps {
  tableLayout?: 'fixed' | 'auto';
  anyColumnFixed?: boolean;
  bodyHasScrollBar?: boolean;
  columns?: ColumnProps[];
  components?: TableComponents;
  dataSource?: Record<string, any>[];
  fixed?: Fixed;
  handleBodyScroll?: (e: BodyScrollEvent) => void;
  prefixCls?: string;
  forwardedRef?: any;
  scroll?: Scroll;
  selectedRowKeysSet: Set<any>;
  showHeader?: boolean;
  onDidUpdate?: (ref: any) => void;
  onHeaderRow?: OnHeaderRow<any>;
  sticky?: Sticky;
}

/**
 * When there are fixed columns, the header is rendered as a separate Table
 */

const propTypes: CombineProps<HeadTableProps> = {
  tableLayout: PropTypes.string as PropType<HeadTableProps['tableLayout']>,
  bodyHasScrollBar: PropTypes.bool,
  columns: PropTypes.array,
  components: PropTypes.object,
  dataSource: PropTypes.array,
  fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  handleBodyScroll: PropTypes.func as PropType<HeadTableProps['handleBodyScroll']>,
  prefixCls: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  scroll: PropTypes.object,
  selectedRowKeysSet: {
    type: PropTypes.object,
    required: true,
  }, // Useful when update is selected
  showHeader: PropTypes.bool,
  onDidUpdate: PropTypes.func as PropType<HeadTableProps['onDidUpdate']>,
  onHeaderRow: PropTypes.func as PropType<HeadTableProps['onHeaderRow']>,
  anyColumnFixed: PropTypes.bool,
  sticky: [PropTypes.bool, PropTypes.object],
};

const defaultProps = {
  handleBodyScroll: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const HeadTable = defineComponent({
  props: { ...vuePropsType },
  name: 'HeadTable',
  setup(props, {}) {
    const {getProps} = useHasInProps()
    const slots = useSlots();

    return () => {
      const {
        scroll,
        prefixCls,
        fixed,
        forwardedRef,
        handleBodyScroll,
        columns,
        components,
        onDidUpdate,
        showHeader,
        tableLayout,
        anyColumnFixed,
        bodyHasScrollBar,
        sticky,
      } = getProps(props);

      const Table = get(components, 'header.outer', 'table') as any;
      const x = get(scroll, 'x');
      const headStyle: Partial<CSSProperties> = {};
      const tableStyle: { width?: number | string } = {};

      if (x && !fixed) {
        tableStyle.width = x + 'px';
      }

      if (bodyHasScrollBar) {
        headStyle.overflowY = 'scroll';
      }

      const colgroup = <ColGroup columns={columns} prefixCls={prefixCls} />;
      const tableHeader = (
        <TableHeader {...getProps(props)} columns={columns} components={components} onDidUpdate={onDidUpdate} />
      );

      const headTableCls = classnames(`${prefixCls}-header`, {
        [`${prefixCls}-header-sticky`]: sticky,
        [`${prefixCls}-header-hidden`]: !showHeader,
      });

      const stickyTop = get(sticky, 'top', 0);
      if (typeof stickyTop === 'number') {
        headStyle.top = stickyTop;
      }

      return (
        <div key="headTable" style={headStyle} class={headTableCls} ref={forwardedRef} onScroll={handleBodyScroll}>
          <Table
            style={tableStyle}
            className={classnames(prefixCls, {
              [`${prefixCls}-fixed`]: tableLayout === 'fixed',
            })}
          >
            {colgroup}
            {tableHeader}
          </Table>
        </div>
      );
    };
  },
});

export default HeadTable;
