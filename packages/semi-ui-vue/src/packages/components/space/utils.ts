import {isVNode, VNode} from "vue";


const VUE_FRAGMENT_TYPE = 'Symbol(Fragment)';

/**
 * Flatten the children and return the processed data
 */
export const flatten = (children: VNode[]): Array<VNode> => {
    let res: Array<VNode> = [];

    children.forEach(child => {
        if (child === undefined || child === null) {
            return;
        }
        if (Array.isArray(child)) {
            res = res.concat(flatten(child));
        } else if (isVNode(child) && child.type && child.type.toString() === VUE_FRAGMENT_TYPE && child.props) {
            res = res.concat(flatten(child.props.children));
        } else {
            res.push(child);
        }
    })

console.log(res)
    return res;
};