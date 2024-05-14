import * as PropTypes from '../PropTypes';
import classnames from 'classnames';
import { get } from 'lodash';
import { cssClasses } from '@douyinfe/semi-foundation/table/constants';
import { flattenColumns } from '@douyinfe/semi-foundation/table/utils';
import { ColumnProps, TableComponents } from './interface';
import {defineComponent, h, useSlots} from "vue";
import type {CSSProperties} from "vue";
import {vuePropsMake} from "../PropTypes";

export interface ColGroupProps {
    columns?: ColumnProps[];
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    components?: TableComponents['body']
}

const propTypes = {
    columns: PropTypes.array,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    components: PropTypes.object,
};

const defaultProps = {
    columns: [] as [],
    prefixCls: cssClasses.PREFIX,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const ColGroup = defineComponent<ColGroupProps>((props, {}) => {
    const slots = useSlots();

    return () => {
        const { columns, className, style, prefixCls, components } = props;

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const ColGroup = get(components, 'colgroup.wrapper', 'colgroup');
        const Col = get(components, 'colgroup.col', 'col');

        const cols = flattenColumns(columns).map((column: ColumnProps, idx: number) => {
            const colStyle: { width?: number | string; minWidth?: number | string } = {};

            /**
             * table width
             */
            if (column.width) {
                colStyle.width = typeof column.width === 'string' ? column.width:(column.width + 'px');
                colStyle.minWidth = typeof colStyle.width === 'string' ? colStyle.width:(colStyle.width + 'px');
            }

            return (
              <Col
                className={classnames(`${prefixCls}-col`, column.className)}
                key={column.key || column.dataIndex || idx}
                style={colStyle}
              />
            );
        });

        const groupCls = classnames(`${prefixCls}-colgroup`, className);

        return (
          <ColGroup className={groupCls} style={style}>
              {cols}
          </ColGroup>
        );
    };
}, {
    props: vuePropsType,
    name: 'ColGroup'
});


export default ColGroup;



