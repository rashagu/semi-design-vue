import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/skeleton/constants';
import { strings } from '@douyinfe/semi-foundation/avatar/constants';

import '@douyinfe/semi-foundation/skeleton/skeleton.scss';
import {CSSProperties, FunctionalComponent, h, DefineComponent, defineComponent, useSlots} from "vue";
import {vuePropsMake} from "../PropTypes";

export type BasicProps = {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    type?: string;
};

export interface ParagraphProps extends BasicProps {
    rows?: number;
}

export interface AvatarProps extends BasicProps {
    size?: typeof strings.SIZE[number];
    shape?: string;
}

export type GenericProps = BasicProps & AvatarProps;

const sizeSet = strings.SIZE;
const shapeSet = strings.SHAPE;

const generator = <T extends BasicProps>(type: string) => (BasicComponent: typeof Generic) => (
    props
) => {
    return <BasicComponent type={type} {...props} />
};


const propTypes = {
    type: PropTypes.string,
    prefixCls: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    size: String,
    shape: String,
};

const defaultProps = {
    prefixCls: cssClasses.PREFIX,
    size: 'medium',
    shape: 'circle',
};

export const vuePropsTypeGeneric = vuePropsMake(propTypes, defaultProps)
const Generic = defineComponent<GenericProps>((props, {}) => {

    const slots = useSlots()

    return () => {
        const { prefixCls, className, type, size, shape, ...others } = props;
        const classString = cls(
          className,
          `${prefixCls}-${type}`,
          {
              [`${prefixCls}-${type}-${size}`]: type.toUpperCase() === 'AVATAR',
          },
          {
              [`${prefixCls}-${type}-${shape}`]: type.toUpperCase() === 'AVATAR',
          }
        );
        return h('div', { className: classString, ...others });
    }
}, {
    props: vuePropsTypeGeneric,
    name: 'Generic'
})


export const Avatar = generator<AvatarProps>('avatar')(Generic);
export const Image = generator<BasicProps>('image')(Generic);
export const Title = generator<BasicProps>('title')(Generic);
export const Button = generator<BasicProps>('button')(Generic);


const propTypesParagraph = {
    rows: PropTypes.number,
    prefixCls: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
};

const defaultPropsParagraph = {
    prefixCls: cssClasses.PREFIX,
    rows: 4,
};
export const vuePropsTypeParagraph = vuePropsMake(propTypesParagraph, defaultPropsParagraph)

export const Paragraph = defineComponent<ParagraphProps>((props, {}) => {

    const slots = useSlots()

    return () => {
        const { prefixCls, className, style, rows } = props;
        const classString = cls(className, `${prefixCls}-paragraph`);
        return (
          <ul class={classString} style={style}>
              {[...Array(rows)].map((e, i) => (
                <li key={i} />
              ))}
          </ul>
        );
    }
}, {
    props: vuePropsTypeParagraph,
    name: 'Paragraph'
})


