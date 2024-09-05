import {CSSProperties, VNode} from "vue";
import {AriaAttributes} from "../AriaAttributes";
import {VueJsxNode} from "../interface";

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
export type TagShape = 'circle' | 'square';

export interface TagProps {
    // children?: VNode | string,
    tagKey?: string | number;
    size?: TagSize;
    color?: TagColor;
    type?: TagType;
    closable?: boolean;
    visible?: boolean;
    onClose?: (tagChildren: VueJsxNode, event: MouseEvent, tagKey: string | number) => void;
    onClick?: (e:Event)=>void;
    prefixIcon?: VNode;
    suffixIcon?: VNode;
    style?: CSSProperties;
    className?: string;
    avatarSrc?: string;
    avatarShape?: AvatarShape;
    shape?: TagShape;
    onKeydown?: (e:Event)=>void;
    'aria-label'?: AriaAttributes['aria-label'];
    tabIndex?: number; // use internal, when tag in taInput, we want to use left arrow and right arrow to control the tag focus, so the tabIndex need to be -1.
    onMouseenter?: () => void | (() => void)[]
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
