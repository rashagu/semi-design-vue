import { cloneDeepWith, isPlainObject } from 'lodash';
import {isVNode} from "vue";

export function cloneDeep(treeNodeList: any) {
    return cloneDeepWith(treeNodeList, val => {
        // only clone treeNode inner data and skip user data
        if (isPlainObject(val) && !val._innerDataTag) {
            return val;
        }
        if (isVNode(val)) {
            return val;
        }
    });
}
