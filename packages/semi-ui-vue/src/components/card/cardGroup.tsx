
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/card/constants';
import cls from 'classnames';
import Space from '../space';
import {ComponentObjectPropsOptions, CSSProperties, defineComponent, h, PropType, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";
import {VueJsxNode} from "../interface";

const prefixcls = cssClasses.PREFIX;

export type CardGroupType = 'grid';

export interface CardGroupProps {
    /** Card group style class name */
    className?: string;
    /** Card Spacing */
    spacing?: number | number[];
    /** Card group inline style */
    style?: CSSProperties;
    /** Card set type */
    type?: CardGroupType
}
const propTypes:ComponentObjectPropsOptions<CardGroupProps> = {
    className: PropTypes.string,
    spacing: [PropTypes.number, PropTypes.array],
    style: PropTypes.object,
    type: PropTypes.string as PropType<CardGroupProps['type']>
};

const defaultProps = {
    spacing: 16
};
export const vuePropsType = vuePropsMake<CardGroupProps>(propTypes, defaultProps)
const CardGroup = defineComponent((props, {}) => {
    const slots = useSlots()


    return () => {
        const children = slots.default?.()
        const {
            className,
            spacing,
            style,
            type,
            ...others
        } = props;
        const isGrid = type === 'grid';
        const cardGroupCls = cls(`${prefixcls}-group`, className, {
            [`${prefixcls}-group-grid`]: isGrid
        });

        return (
          <Space
            spacing={isGrid ? 0 : spacing}
            wrap={true}
            className={cardGroupCls}
            style={style}
            {...others}
          >
              {children}
          </Space>
        );
    }
}, {
    props: vuePropsType,
    name: 'CardGroup'
})


export default CardGroup
