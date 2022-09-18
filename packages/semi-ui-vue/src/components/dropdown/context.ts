import type { TooltipProps } from '../tooltip';
import Consumer from "./context/Consumer";
import Provider from "./context/Provider";

export interface DropdownContextType {
    level?: number;
    showTick?: boolean;
    trigger?: TooltipProps['trigger'];
}

export const DropdownContext = {
    Consumer: Consumer,
    Provider: Provider,
};
