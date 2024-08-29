import * as PropTypes from '../PropTypes';
import Column from './Column';
import {get, isArray, omit} from 'lodash';
import { ColumnProps } from './interface';
import {VueJsxNode} from "../interface";
import {isVNode} from "vue";

/**
 * Convert jsx children into object columns
 * @param {Node} children
 * @returns
 */
export default function getColumns(children: VueJsxNode) {
    if (children && isArray(children)) {
        const columns: ColumnProps[] = [];
        children.forEach(child => {
            if (isVNode(child) && (child.type === Column || get(child, 'type.name') === 'Column')) {
                const col = omit(child.props, ['children']);

                //@ts-ignore
                const children_ = child.children?.default?(child.children?.default?.()):child.children
                if (Array.isArray(children_) && children_.length) {
                    col.children = getColumns(children_);
                }

                columns.push({
                    key: child.props.dataIndex,
                    ...col,
                });
            }
        })

        return columns;
    }

    return [];
}
