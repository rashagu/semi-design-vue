import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { strings, cssClasses } from '@douyinfe/semi-foundation/descriptions/constants';
import '@douyinfe/semi-foundation/descriptions/descriptions.scss';
import { isPlainObject } from 'lodash';
import DescriptionsContext, { DescriptionsAlign, DescriptionsContextValue } from './descriptions-context';
import Item from './item';
import {CSSProperties, defineComponent, h, useSlots, VNode} from "vue";
import {vuePropsMake} from "../PropTypes";
import {VueJsxNode} from "../interface";

export type { DescriptionsItemProps } from './item';
export type DescriptionsSize = 'small' | 'medium' | 'large';
export interface Data {
    key?: VueJsxNode;
    value?: (() => VueJsxNode) | VueJsxNode;
    hidden?: boolean
}
export interface DescriptionsProps {
    align?: DescriptionsAlign;
    row?: boolean;
    size?: DescriptionsSize;
    style?: CSSProperties;
    className?: string;
    children?: VNode[];
    data?: Data[]
}

const prefixCls = cssClasses.PREFIX;

const propTypes = {
    align: PropTypes.string,
    row: PropTypes.bool,
    size: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.array,
};

const defaultProps = {
    align: 'center',
    row: false,
    size: 'medium',
    data: [] as Array<Data>,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Descriptions = defineComponent<DescriptionsProps>((props, {}) => {
    const slots = useSlots()


    return () => {
        const children = slots.default?.()
        const { align, row, size, className, style, data } = props;
        const classNames = cls(prefixCls, className, {
            [`${prefixCls}-${align}`]: !row,
            [`${prefixCls}-double`]: row,
            [`${prefixCls}-double-${size}`]: row,
        });
        const childrenList = data && data.length ?
          data.map((item, index) => (
            isPlainObject(item) ? <Item itemKey={item.key} {...item} key={index}>{item.value}</Item> : null
          )) :
          children;
        return (
          <div class={classNames} style={style}>
              <table>
                  <tbody>
                  <DescriptionsContext.Provider value={{ align }}>
                      {childrenList}
                  </DescriptionsContext.Provider>
                  </tbody>
              </table>
          </div>
        );
    }
})

Descriptions.props = vuePropsType
Descriptions.name = 'Descriptions'

export default Descriptions
export {
    Item as DescriptionsItem
}
