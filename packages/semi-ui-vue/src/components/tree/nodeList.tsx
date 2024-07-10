import { isEqual } from 'lodash';
import Collapse from './collapse';
import type { FlattenNode, NodeListProps, NodeListState, TransitionNodes } from './interface';
import {
  type ComponentObjectPropsOptions,
  type CSSProperties,
  defineComponent,
  h,
  type PropType, type Reactive,
  reactive,
  useSlots,
  type VNode,
  watch,
} from 'vue';
import { CombineProps } from '../interface';

const getTreeNodeKey = (treeNode: FlattenNode) => {
  return treeNode.key;
};

export const vuePropsType: CombineProps<NodeListProps> = {
  flattenNodes: {
    type: Array,
    required: true
  },
  motionKeys: {
    type: Object,
    required: true
  },
  motionType: {
    type: String,
    required: true
  },
  flattenList: {
    type: Array,
    required: true
  },
  searchTargetIsDeep: Boolean,
  renderTreeNode: {
    type: Function as PropType<NodeListProps['renderTreeNode']>,
    required: true
  },
  onMotionEnd: {
    type: Function as PropType<NodeListProps['onMotionEnd']>,
    required: true
  },
  role: String,
};
const NodeList = defineComponent({
  props: vuePropsType,
  name: 'NodeList',
  setup(props, {}) {
    const slots = useSlots();

    const state = reactive<NodeListState>({
      transitionNodes: [],
    });

    function getDerivedStateFromProps(props: NodeListProps) {
      const { flattenNodes = [], motionKeys, motionType, flattenList = [] } = props;
      const hasChanged =
        !isEqual(state.cachedMotionKeys, motionKeys) ||
        !isEqual(
          (state.cachedData as unknown as NodeListState['cachedData']).map((i) => i.key),
          flattenNodes.map((i) => i.key)
        );
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
        cachedMotionType: motionType,
      };
      return newState;
    }

    watch(
      [() => props.flattenNodes, () => props.motionKeys, () => props.motionType, () => props.flattenList],
      () => {
        const newState = getDerivedStateFromProps({ ...props });
        newState &&
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
      },
      { immediate: true }
    );

    const onMotionEnd = () => {
      typeof props.onMotionEnd === 'function' && props.onMotionEnd();
      state.transitionNodes = [];
    };

    return () => {
      const { flattenNodes, motionType, searchTargetIsDeep, renderTreeNode } = props;
      const { transitionNodes } = state;
      const mapData: TransitionNodes<FlattenNode> | FlattenNode[] =
        //@ts-ignore
        transitionNodes.length && !searchTargetIsDeep ? transitionNodes  : flattenNodes;
      const options = mapData.map((treeNode) => {
        const isMotionNode = Array.isArray(treeNode);
        if (isMotionNode && !(treeNode as FlattenNode[]).length) {
          return null;
        }
        if (isMotionNode && (treeNode as FlattenNode[]).length) {
          const nodeKey = getTreeNodeKey(treeNode[0]);
          return (
            <Collapse
              motionType={motionType === 'show' ? 'enter' : 'leave'}
              key={`motion-${nodeKey}`}
              onMotionEnd={onMotionEnd}
              motion={Boolean(motionType)}
            >
              {treeNode.map((node) => {
                return renderTreeNode(node);
              })}
            </Collapse>
          );
        }
        return renderTreeNode(treeNode as FlattenNode);
      });
      return options as VNode[];
    };
  },
});

export default NodeList;
