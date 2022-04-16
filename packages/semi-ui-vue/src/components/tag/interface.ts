import {CSSProperties, VNode} from "vue";

export type TagColor =
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
    | 'yellow'
    | 'white';
export type TagType = 'ghost' | 'solid' | 'light';
export type TagSize = 'default' | 'small' | 'large';
export type AvatarShape = 'circle' | 'square';

export interface TagProps {
    children?: VNode | string,
    size?: TagSize;
    color?: TagColor;
    type?: TagType;
    closable?: boolean;
    visible?: boolean;
    onClose?: (tagChildren: VNode, event: MouseEvent) => void;
    onClick?: (e:Event)=>void;
    style?: CSSProperties;
    className?: string;
    avatarSrc?: string;
    avatarShape?: AvatarShape;
}

export interface TagGroupProps {
    style?: CSSProperties;
    className?: string;
    maxTagCount?: number;
    tagList?: (TagProps | VNode)[];
    size?: 'small' | 'large';
    showPopover?: boolean;
    popoverProps?: any; // TODO: 替换成PopoverProps
    avatarShape?: AvatarShape;
    mode?: string; // TODO: check 文档里没有这个api
}
