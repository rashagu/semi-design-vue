
import { BaseProps } from '../_base/baseComponent';
import {CSSProperties, ImgHTMLAttributes, VNode} from "vue";

export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'extra-extra-small' | 'extra-small' | 'small' | 'default' | 'medium' | 'large' | 'extra-large';
export type AvatarColor =
    | 'amber'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'grey'
    | 'indigo'
    | 'light-blue'
    | 'light-green'
    | 'lime'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'violet'
    | 'yellow';

export interface AvatarProps extends BaseProps {
    color?: AvatarColor;
    shape?: AvatarShape;
    size?: AvatarSize;
    hoverMask?: VNode;
    src?: string;
    srcSet?: string;
    alt?: string;
    onError?: (e:MouseEvent)=>void;
    onClick?: (e:MouseEvent)=>void;
    onMouseEnter?: (e:MouseEvent)=>void;
    onMouseLeave?: (e:MouseEvent)=>void;
    imgAttr?: ImgHTMLAttributes;
}

export type AvatarGroupShape = 'circle' | 'square';
export type AvatarGroupSize = 'extra-extra-small' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
export type AvatarGroupOverlapFrom = 'start' | 'end';

export interface AvatarGroupProps {
    shape?: AvatarGroupShape;
    size?: AvatarGroupSize;
    overlapFrom?: AvatarGroupOverlapFrom;
    maxCount?: number;
    renderMore?: (restNumber?: number, restAvatars?: VNode[]) => VNode;
    style?: CSSProperties
    className?: string
}
