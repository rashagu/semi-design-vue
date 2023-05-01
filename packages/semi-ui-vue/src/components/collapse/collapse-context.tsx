import {VueJsxNode} from "../interface";
import Provider from "./context/Provider";
import Consumer from "./context/Consumer";
import {VNode} from "vue";


export interface CollapseContextType{
    activeSet: Set<string>;
    expandIcon: VNode;
    collapseIcon: VNode;
    clickHeaderToExpand: boolean;
    keepDOM: boolean;
    expandIconPosition: 'left' | 'right';
    onClick: (activeKey: string, e: MouseEvent) => void;
    motion: boolean
}


const CollapseContext = {
    Provider,
    Consumer
};

export default CollapseContext;
