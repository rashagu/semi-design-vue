import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/list/constants';
import { noop } from 'lodash';
import { Col } from '../grid';
import ListContext, { ListContextValue } from './list-context';
import {CSSProperties, defineComponent, h, useSlots, VNode} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useListContext} from "./context/Consumer";
import {VueJsxNode} from "../interface";

export interface ListItemProps {
    extra?: VueJsxNode;
    header?: VueJsxNode;
    main?: VueJsxNode;
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    className?: string;
    style?: CSSProperties;
    onClick?: (e: MouseEvent)=>void;
    onRightClick?: (e: MouseEvent)=>void;
    onMouseLeave?: (e: MouseEvent)=>void;
    onMouseEnter?: (e: MouseEvent)=>void;
}

const prefixCls = cssClasses.PREFIX;
const propTypes = {
    extra: PropTypes.node,
    header: PropTypes.node,
    main: PropTypes.node,
    align: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    onRightClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

const defaultProps = {
    align: 'flex-start',
    onMouseEnter: noop,
    onMouseLeave: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const ListItem = defineComponent<ListItemProps>((props, {}) => {
    const slots = useSlots()

    const {context} = useListContext()

    function wrapWithGrid(content: VNode) {
        const { grid } = context.value;
        const { gutter, justify, type, align, ...rest } = grid;
        return (
          <Col {...rest}>
              {content}
          </Col>
        );
    }
    return () => {
        const children = slots.default?.()

        const {
            header,
            main,
            className,
            style,
            extra,
            align,
            onClick,
            onRightClick,
            onMouseEnter,
            onMouseLeave
        } = props;
        const { onRightClick: contextOnRightClick, onClick: contextOnClick, grid: contextGrid } = context.value;
        const handleContextMenu = onRightClick ? onRightClick : contextOnRightClick;
        const handleClick = onClick ? onClick : contextOnClick;
        const itemCls = cls(`${prefixCls}-item`, className);
        const bodyCls = cls(`${prefixCls}-item-body`,
          {
              [`${prefixCls}-item-body-${align}`]: align,
          }
        );
        let body;
        if (header || main) {
            body = (
              <div class={bodyCls}>
                  {header ? <div class={`${prefixCls}-item-body-header`}>{header}</div> : null}
                  {main ? <div class={`${prefixCls}-item-body-main`}>{main}</div> : null}
              </div>
            );
        }
        let content = (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li
            class={itemCls}
            style={style}
            onClick={handleClick}
            onContextmenu={handleContextMenu}
            onMouseenter={onMouseEnter}
            onMouseleave={onMouseLeave}
          >
              {body ? body : null}
              {children}
              {extra ? <div class={`${prefixCls}-item-extra`}>{extra}</div> : null}
          </li>
        );

        if (context.value && contextGrid) {
            content = wrapWithGrid(content);
        }

        return content;
    }
})

// @ts-ignore
ListItem.props = vuePropsType
ListItem.name = 'ListItem'

export default ListItem
