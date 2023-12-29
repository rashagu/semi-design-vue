import { PopoverProps } from '../popover';
import { TooltipProps } from '../tooltip';
import { ArrayElement } from '../_base/base';
import { strings } from '@douyinfe/semi-foundation/typography/constants';
import {VueJsxNode} from "../interface";

export type EllipsisPos = 'end' | 'middle';
export type ShowTooltip = {
    type?: string;
    opts?: Partial<PopoverProps> & Partial<TooltipProps>;
    renderTooltip?: (content: TooltipProps['content'], children: VueJsxNode ) => VueJsxNode
};

export type Ellipsis = {
    collapseText?: string;
    collapsible?: boolean;
    expandText?: string;
    expandable?: boolean;
    pos?: EllipsisPos;
    rows?: number;
    showTooltip?: boolean | ShowTooltip;
    suffix?: string;
    onExpand?: (expanded: boolean, event: any) => void;
};
export type OmitTypographyProps = 'dangerouslySetInnerHTML';
export type TypographyBaseType = ArrayElement<typeof strings.TYPE>;
export type TypographyBaseSize = ArrayElement<typeof strings.SIZE>;
export type TypographyBaseSpacing = ArrayElement<typeof strings.SPACING>;
