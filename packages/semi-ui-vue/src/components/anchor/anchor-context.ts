
import Anchor, { AnchorProps, AnchorState } from '.';
import Provider from "./anchor-content/Provider";
import Consumer from "./anchor-content/Consumer";

export type AnchorContextType = Pick<AnchorProps, 'showTooltip' | 'position' | 'autoCollapse' | 'size'>
& Pick<AnchorState, 'activeLink'>
& {
    childMap: Record<string, Set<string>>
    addLink: (link: string)=>void
    removeLink: (link: string)=>void
    onClick: (     e: MouseEvent,     link: string)=> void
};

const AnchorContext = {
    Provider,
    Consumer
};

export default AnchorContext;
