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
            if (isVNode(child) && (child.type === Column || get(child, 'type.name') === Column.name)) {
                const col = omit(child.props, ['children']);

                if (Array.isArray(child.props.children) && child.props.children.length) {
                    col.children = getColumns(child.props.children);
                }

                columns.push({
                    key: child.key,
                    ...col,
                });
            }
        })

        return columns;
    }

    return [];
}
