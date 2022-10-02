import { isEqual } from 'lodash';
import TreeContext from './treeContext';
import Collapse from './collapse';
import { FlattenNode, NodeListProps, NodeListState, TransitionNodes } from './interface';
import {CSSProperties, defineComponent, h, reactive, useSlots, watch} from "vue";
import {VueJsxNode} from "../interface";

const getTreeNodeKey = (treeNode: FlattenNode) => {
    const { data } = treeNode;
    const { key } = data;
    return key;
};


export const vuePropsType = {
    flattenNodes: Array,
    motionKeys: Object,
    motionType: String,
    flattenList: Array,
    searchTargetIsDeep: Boolean,
    renderTreeNode: Function,
    onMotionEnd: Function
}
const NodeList = defineComponent<NodeListProps>((props, {}) => {
    const slots = useSlots()

    const state = reactive<NodeListState>({
        transitionNodes: [],
    })

    function getDerivedStateFromProps(props: NodeListProps, prevState: NodeListState) {
        const { flattenNodes = [], motionKeys, motionType, flattenList = [] } = props;
        const hasChanged = !isEqual(prevState.cachedMotionKeys, motionKeys) ||
          !isEqual(prevState.cachedData.map(i => i.key), flattenNodes.map(i => i.key));
        const motionArr = [...motionKeys];
        if (!hasChanged || !motionArr.length) {
            return null;
        }
        const transitionNodes: TransitionNodes<FlattenNode> = [];
        const transitionRange: FlattenNode[] = [];
        let rangeStart = 0;
        let newState = {};
        const lookUpTarget = motionType === 'hide' && flattenList ? flattenList : flattenNodes;
        lookUpTarget.forEach((treeNode, ind) => {
            const nodeKey = getTreeNodeKey(treeNode);
            if (motionKeys.has(nodeKey)) {
                transitionRange.push(treeNode);
                if (nodeKey === motionArr[0]) {
                    rangeStart = ind;
                }
            } else {
                transitionNodes.push(treeNode);
            }
        });
        transitionNodes.splice(rangeStart, 0, transitionRange);
        newState = {
            transitionNodes,
            cachedData: flattenNodes,
            cachedMotionKeys: motionKeys,
            cachedMotionType: motionType
        };
        return newState;
    }

    watch(()=>props, ()=>{
        const newState = getDerivedStateFromProps(props, state)
        Object.keys(newState).forEach(key=>{
            state[key] = newState[key]
        })
    }, {deep: true})


    const onMotionEnd = () => {
        typeof props.onMotionEnd === 'function' && props.onMotionEnd();
        state.transitionNodes = []
    };

    return () => {
        const { flattenNodes, motionType, searchTargetIsDeep, renderTreeNode } = props;
        const { transitionNodes } = state;
        const mapData = transitionNodes.length && !searchTargetIsDeep ? transitionNodes : flattenNodes;
        const options = mapData.map(treeNode => {
            const isMotionNode = Array.isArray(treeNode);
            if (isMotionNode && !(treeNode as FlattenNode[]).length) {
                return null;
            }
            if (isMotionNode && (treeNode as FlattenNode[]).length) {
                const nodeKey = getTreeNodeKey(treeNode[0]);
                console.log(treeNode)
                return (
                  <Collapse
                    motionType={motionType === 'show' ? 'enter' : 'leave'}
                    key={`motion-${nodeKey}`}
                    onMotionEnd={onMotionEnd}
                    motion={Boolean(motionType)}
                  >
                      {treeNode.map(node => {
                          console.log(node)
                          return renderTreeNode(node)
                      })}
                  </Collapse>
                );
            }
            return renderTreeNode(treeNode as FlattenNode);
        });
        return options;
    }
})

NodeList.props = vuePropsType
NodeList.name = 'NodeList'

export default NodeList

