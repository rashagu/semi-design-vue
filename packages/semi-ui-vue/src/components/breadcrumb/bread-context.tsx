import { showToolTipProps } from './index';
import { BreadcrumbItemInfo } from './item';
import {VNode} from "vue";
import Consumer from "./context/Consumer";
import Provider from "./context/Provider";
export interface BreadContextType {
    onClick?: (info: BreadcrumbItemInfo, event: MouseEvent) => void;
    showTooltip?: boolean | showToolTipProps;
    compact?: boolean;
    separator?: VNode;
}

const BreadContext = {
    Consumer: Consumer,
    Provider: Provider,
}

export default BreadContext;
