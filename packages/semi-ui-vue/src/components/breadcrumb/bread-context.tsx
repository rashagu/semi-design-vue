import { showToolTipProps } from './index';
import { BreadcrumbItemInfo } from './item';
import {VNode} from "vue";
import Consumer from "./context/Consumer";
import Provider from "./context/Provider";
import {VueJsxNode} from "../interface";
export interface BreadContextType {
    onClick?: (info: BreadcrumbItemInfo, event: MouseEvent) => void;
    showTooltip?: boolean | showToolTipProps;
    compact?: boolean;
    separator?: VueJsxNode;
}

const BreadContext = {
    Consumer: Consumer,
    Provider: Provider,
}

export default BreadContext;
