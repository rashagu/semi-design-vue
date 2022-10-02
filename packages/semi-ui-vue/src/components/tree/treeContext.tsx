import { Virtualize, ExpandAction } from '@douyinfe/semi-foundation/tree/foundation';
import {
    TreeNodeData,
    KeyEntities,
    TreeNodeProps,
    FlattenNode,
    RenderFullLabelProps
} from './interface';
import {VueJsxNode} from "../interface";
import {CSSProperties} from "vue";
import Provider from "./TreeContext/Provider";
import Consumer from "./TreeContext/Consumer";

export interface TreeContextValue {
    treeDisabled?: boolean;
    treeIcon?: VueJsxNode;
    motion?: boolean;
    motionKeys?: Set<string>;
    motionType?: string;
    filterTreeNode?: boolean | ((inputValue: string, treeNodeString: string) => void);
    keyEntities?: KeyEntities;
    onNodeClick?: any;
    onNodeExpand?: (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => void;
    onNodeSelect?: (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => void;
    onNodeCheck?: (e: MouseEvent | KeyboardEvent, treeNode: TreeNodeProps) => void;
    onNodeRightClick?: (e: MouseEvent, treeNode: TreeNodeProps) => void;
    onNodeDoubleClick?: (e: MouseEvent, treeNode: TreeNodeProps) => void;
    renderTreeNode?: (treeNode: FlattenNode, ind?: number, style?: CSSProperties) => VueJsxNode;
    onNodeDragStart?: (e: DragEvent, treeNode: TreeNodeProps) => void;
    onNodeDragEnter?: (e: DragEvent, treeNode: TreeNodeProps) => void;
    onNodeDragOver?: (e: DragEvent, treeNode: TreeNodeProps) => void;
    onNodeDragLeave?: (e: DragEvent, treeNode: TreeNodeProps) => void;
    onNodeDragEnd?: (e: DragEvent, treeNode: TreeNodeProps) => void;
    onNodeDrop?: (e: DragEvent, treeNode: TreeNodeProps) => void;
    expandAction?: ExpandAction;
    directory?: boolean;
    multiple?: boolean;
    showFilteredOnly?: boolean;
    isSearching?: boolean;
    loadData?: (treeNode?: TreeNodeData) => Promise<void>;
    onNodeLoad?: (data: TreeNodeData) => Promise<unknown>;
    renderLabel?: (label?: VueJsxNode, treeNode?: TreeNodeData) => VueJsxNode;
    draggable?: boolean;
    renderFullLabel?: (renderFullLabelProps: RenderFullLabelProps) => VueJsxNode;
    dragOverNodeKey?: string | string[];
    dropPosition?: number | null;
    labelEllipsis?: boolean | Virtualize;
}

const TreeContext = {
    Provider: Provider,
    Consumer: Consumer,
};

export default TreeContext;