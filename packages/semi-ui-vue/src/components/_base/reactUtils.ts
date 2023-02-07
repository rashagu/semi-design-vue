// https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element

import { isHTMLElement } from '@douyinfe/semi-foundation/utils/dom';
import {isVNode} from "vue";



function isElement(element: any) {
    return isVNode(element);
}

function isCompositeTypeElement(element: any) {
    return isElement(element) && typeof element.type === 'function';
}

function isEmptyChildren(children: any) {
    return children().length === 0;
}

export {
    isElement,
    // isDOMTypeElement,
    isHTMLElement,
    isCompositeTypeElement,
    isEmptyChildren
};
