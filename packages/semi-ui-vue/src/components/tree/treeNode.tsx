import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/tree/constants';
import isEnterPress from '@douyinfe/semi-foundation/utils/isEnterPress';
import { debounce, get, isEmpty, isFunction, isString } from 'lodash';
import { IconFile, IconFolder, IconFolderOpen, IconTreeTriangleDown } from '@kousum/semi-icons-vue';
import { Checkbox } from '../checkbox';
import Spin from '../spin';
import type { RenderFullLabelProps, TreeNodeProps, TreeNodeState } from './interface';
import Highlight from '../highlight';
import { cloneVNode, defineComponent, h, PropType, reactive, ref, useSlots } from 'vue';
import { useTreeContext } from './TreeContext/Consumer';
import type { CombineProps, VueHTMLAttributes } from '../interface';
import Indent from './indent';

const prefixcls = cssClasses.PREFIX_OPTION;

const propTypes: CombineProps<TreeNodeProps> = {
  expanded: {
    type: PropTypes.bool,
    default: undefined,
  },
  selected: {
    type: PropTypes.bool,
    default: undefined,
  },
  checked: {
    type: PropTypes.bool,
    default: undefined,
  },
  halfChecked: {
    type: PropTypes.bool,
    default: undefined,
  },
  active: {
    type: PropTypes.bool,
    default: undefined,
  },
  disabled: {
    type: PropTypes.bool,
    default: undefined,
  },
  loaded: {
    type: PropTypes.bool,
    default: undefined,
  },
  loading: {
    type: PropTypes.bool,
    default: undefined,
  },
  isLeaf: {
    type: PropTypes.bool,
    default: undefined,
  },
  pos: PropTypes.string,
  icon: PropTypes.node,
  directory: {
    type: PropTypes.bool,
    default: undefined,
  },
  keyword: PropTypes.string,
  treeNodeFilterProp: PropTypes.string,
  selectedKey: PropTypes.string,
  motionKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isEnd: PropTypes.array,
  showLine: PropTypes.bool,
  eventKey: String,
  label: PropTypes.node,
  data: Object,
  children: Object,
  nodeInstance: PropTypes.node,
  emptyContent: PropTypes.node,

  filtered: [String, Boolean] as PropType<TreeNodeProps['filtered']>,
  level: Number,
  empty: Boolean,
  style: [Object, String] as PropType<TreeNodeProps['style']>,
  display: PropTypes.any,

  value: [Object, Array, String, Number],
};

const defaultProps = {
  selectedKey: '',
  motionKey: '',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const TreeNode = defineComponent({
  props: { ...vuePropsType },
  name: 'TreeNode',
  setup(props, {}) {
    const slots = useSlots();

    const refNode = ref();
    const { context } = useTreeContext();
    const state = reactive<TreeNodeState>({});

    const onSelect = (e: MouseEvent | KeyboardEvent) => {
      const { onNodeSelect } = context.value;
      onNodeSelect(e, props);
    };

    const debounceSelect = debounce(onSelect, 500, {
      leading: true,
      trailing: false,
    });

    const onExpand = (e: MouseEvent | KeyboardEvent) => {
      const { onNodeExpand } = context.value;
      e && e.stopPropagation();
      e.stopImmediatePropagation();
      onNodeExpand(e, props);
    };

    const onCheck = (e: MouseEvent | KeyboardEvent) => {
      if (isDisabled()) {
        return;
      }
      const { onNodeCheck } = context.value;
      e.stopPropagation();
      e.stopImmediatePropagation?.();
      onNodeCheck(e, props);
    };

    /**
     * A11y: simulate checkbox click
     */
    const handleCheckEnterPress = (e: KeyboardEvent) => {
      if (isEnterPress(e)) {
        onCheck(e);
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      const { onNodeRightClick } = context.value;
      onNodeRightClick(e, props);
    };

    const onClick = (e: MouseEvent | KeyboardEvent) => {
      const { expandAction } = context.value;
      if (expandAction === 'doubleClick') {
        debounceSelect(e);
        return;
      }
      onSelect(e);
      if (expandAction === 'click') {
        onExpand(e);
      }
    };

    /**
     * A11y: simulate li click
     */
    const handleliEnterPress = (e: KeyboardEvent) => {
      if (isEnterPress(e)) {
        onClick(e);
      }
    };

    const onDoubleClick = (e: MouseEvent) => {
      const { expandAction, onNodeDoubleClick } = context.value;
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (isFunction(onNodeDoubleClick)) {
        onNodeDoubleClick(e, props);
      }
      if (expandAction === 'doubleClick') {
        onExpand(e);
      }
    };

    const onDragStart = (e: DragEvent) => {
      const { onNodeDragStart } = context.value;
      e.stopPropagation();
      onNodeDragStart(e, { ...props, nodeInstance: refNode.value });

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {
        // empty
      }
    };

    const onDragEnter = (e: DragEvent) => {
      const { onNodeDragEnter } = context.value;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, { ...props, nodeInstance: refNode.value });
    };

    const onDragOver = (e: DragEvent) => {
      const { onNodeDragOver } = context.value;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, { ...props, nodeInstance: refNode.value });
    };

    const onDragLeave = (e: DragEvent) => {
      const { onNodeDragLeave } = context.value;
      e.stopPropagation();
      onNodeDragLeave(e, { ...props, nodeInstance: refNode.value });
    };

    const onDragEnd = (e: DragEvent) => {
      const { onNodeDragEnd } = context.value;
      e.stopPropagation();
      onNodeDragEnd(e, { ...props, nodeInstance: refNode.value });
    };

    const onDrop = (e: DragEvent) => {
      const { onNodeDrop } = context.value;
      e.preventDefault();
      e.stopPropagation();
      onNodeDrop(e, { ...props, nodeInstance: refNode.value });
    };

    const getNodeChildren = () => {
      const { children } = props;
      return children || [];
    };

    const isLeaf = () => {
      const { isLeaf, loaded } = props;
      const { loadData } = context.value;
      const hasChildren = getNodeChildren().length !== 0;

      if (isLeaf === false) {
        return false;
      }
      return isLeaf || (!loadData && !hasChildren) || (loadData && loaded && !hasChildren);
    };

    const isDisabled = () => {
      const { disabled } = props;
      const { treeDisabled } = context.value;

      if (disabled === false) {
        return false;
      }

      return Boolean(treeDisabled || disabled);
    };

    function renderArrow() {
      const showIcon = !isLeaf();
      const { loading, expanded, showLine } = props;
      if (loading) {
        return <Spin wrapperClassName={`${prefixcls}-spin-icon`} />;
      }
      if (showIcon) {
        return (
          <IconTreeTriangleDown
            role="button"
            aria-label={`${expanded ? 'Expand' : 'Collapse'} the tree item`}
            className={`${prefixcls}-expand-icon`}
            size="small"
            onClick={onExpand}
          />
        );
      }
      if (showLine) {
        return renderSwitcher();
      }
      return <span class={`${prefixcls}-empty-icon`} />;
    }

    function renderCheckbox() {
      const { checked, halfChecked, eventKey } = props;
      const disabled = isDisabled();
      return (
        <div role="none" onClick={onCheck} onKeypress={handleCheckEnterPress}>
          <Checkbox
            aria-label="Toggle the checked state of checkbox"
            value={eventKey}
            indeterminate={halfChecked}
            checked={checked}
            disabled={Boolean(disabled)}
          />
        </div>
      );
    }

    // Switcher
    const renderSwitcher = () => {
      if (isLeaf()) {
        // if switcherIconDom is null, no render switcher span
        return (
          <span class={cls(`${prefixcls}-switcher`)}>
            <span class={`${prefixcls}-switcher-leaf-line`} />
          </span>
        );
      }
      return null;
    };
    function renderIcon() {
      const { directory, treeIcon } = context.value;
      const { expanded, icon, data } = props;
      if (icon) {
        return icon;
      }
      if (treeIcon) {
        return typeof treeIcon === 'function' ? treeIcon(props) : treeIcon;
      }
      if (directory) {
        const hasChild = !isLeaf();
        if (!hasChild) {
          return <IconFile className={`${prefixcls}-item-icon`} />;
        } else {
          return expanded ? (
            <IconFolderOpen className={`${prefixcls}-item-icon`} />
          ) : (
            <IconFolder className={`${prefixcls}-item-icon`} />
          );
        }
      }
      return null;
    }

    function renderEmptyNode() {
      const { emptyContent } = props;
      const wrapperCls = cls(prefixcls, {
        [`${prefixcls}-empty`]: true,
      });
      return (
        <ul class={wrapperCls}>
          <li class={`${prefixcls}-label ${prefixcls}-label-empty`} x-semi-prop="emptyContent">
            {emptyContent}
          </li>
        </ul>
      );
    }

    const renderRealLabel = () => {
      const { renderLabel } = context.value;
      const { label, keyword, data, filtered, treeNodeFilterProp } = props;
      if (isFunction(renderLabel)) {
        return renderLabel(label, data, keyword);
      } else if (isString(label) && filtered && keyword) {
        return (
          <Highlight
            highlightClassName={`${prefixcls}-highlight`}
            component='span'
            sourceString={label}
            searchWords={[keyword]}
          />
        );
      } else {
        return label;
      }
    };

    return () => {
      const {
        eventKey,
        expanded,
        selected,
        checked,
        halfChecked,
        loading,
        active,
        level,
        empty,
        filtered,
        treeNodeFilterProp,
        // eslint-disable-next-line no-unused-vars
        display,
        style,
        isEnd,
        showLine,
        ...rest
      } = props;
      if (empty) {
        return renderEmptyNode();
      }
      const { multiple, draggable, renderFullLabel, dragOverNodeKey, dropPosition, labelEllipsis } = context.value;
      const isEndNode = isEnd[isEnd.length - 1];
      const disabled = isDisabled();
      const dragOver = dragOverNodeKey === eventKey && dropPosition === 0;
      const dragOverGapTop = dragOverNodeKey === eventKey && dropPosition === -1;
      const dragOverGapBottom = dragOverNodeKey === eventKey && dropPosition === 1;
      const nodeCls = cls(prefixcls, {
        [`${prefixcls}-level-${level + 1}`]: true,
        [`${prefixcls}-fullLabel-level-${level + 1}`]: renderFullLabel,
        [`${prefixcls}-collapsed`]: !expanded,
        [`${prefixcls}-disabled`]: Boolean(disabled),
        [`${prefixcls}-selected`]: selected,
        [`${prefixcls}-active`]: !multiple && active,
        [`${prefixcls}-ellipsis`]: labelEllipsis,
        [`${prefixcls}-drag-over`]: !disabled && dragOver,
        [`${prefixcls}-draggable`]: !disabled && draggable && !renderFullLabel,
        // When draggable + renderFullLabel is enabled, the default style
        [`${prefixcls}-fullLabel-draggable`]: !disabled && draggable && renderFullLabel,
        // When draggable + renderFullLabel is turned on, the style of dragover
        [`${prefixcls}-fullLabel-drag-over-gap-top`]: !disabled && dragOverGapTop && renderFullLabel,
        [`${prefixcls}-fullLabel-drag-over-gap-bottom`]: !disabled && dragOverGapBottom && renderFullLabel,
        [`${prefixcls}-tree-node-last-leaf`]: isEndNode,
      });
      const labelProps: RenderFullLabelProps = {
        onClick: onClick,
        onContextMenu: onContextMenu,
        onDoubleClick: onDoubleClick,
        className: nodeCls,
        onExpand: onExpand,
        data: rest.data,
        level,
        onCheck: onCheck,
        style,
        expandIcon: renderArrow(),
        checkStatus: {
          checked,
          halfChecked,
        },
        expandStatus: {
          expanded,
          loading,
        },
        filtered,
        searchWord: rest.keyword,
      };

      const dragProps: VueHTMLAttributes = {
        onDblclick: onDoubleClick,
        onDragstart: draggable ? onDragStart : undefined,
        onDragenter: draggable ? onDragEnter : undefined,
        onDragover: draggable ? onDragOver : undefined,
        onDragleave: draggable ? onDragLeave : undefined,
        onDrop: draggable ? onDrop : undefined,
        onDragend: draggable ? onDragEnd : undefined,
        draggable: (!disabled && draggable) || undefined,
      };

      if (renderFullLabel) {
        const customLabel = renderFullLabel({ ...labelProps });
        if (draggable) {
          return cloneVNode(customLabel as any, {
            ref: refNode,
            ...dragProps,
          });
        } else {
          if (isEmpty(style)) {
            return customLabel;
          } else {
            // In virtualization, props.style will contain location information
            // @ts-ignore skip cloneElement type check
            return cloneElement(customLabel, {
              style: { ...get(customLabel, ['props', 'style']), ...style },
            });
          }
        }
      }
      const labelCls = cls(`${prefixcls}-label`, {
        [`${prefixcls}-drag-over-gap-top`]: !disabled && dragOverGapTop,
        [`${prefixcls}-drag-over-gap-bottom`]: !disabled && dragOverGapBottom,
      });
      const setsize = get(rest, ['data', 'length']);
      const posinset = isString(rest.pos) ? Number(rest.pos.split('-')[level + 1]) + 1 : 1;
      return (
        <li
          class={nodeCls}
          role="treeitem"
          aria-disabled={disabled}
          aria-checked={checked}
          aria-selected={selected}
          aria-setsize={setsize}
          aria-posinset={posinset}
          aria-expanded={expanded}
          aria-level={level + 1}
          data-key={eventKey}
          ref={refNode}
          style={style}
          {...{
            onClick,
            onKeypress: handleliEnterPress,
            onContextmenu: onContextMenu,
            onDblclick: onDoubleClick,
            ...dragProps,
          }}
        >
          <Indent showLine={showLine} prefixcls={prefixcls} level={level} isEnd={isEnd} />
          {renderArrow()}
          <span class={labelCls}>
            {multiple ? renderCheckbox() : null}
            {renderIcon()}
            <span class={`${prefixcls}-label-text`}>{renderRealLabel()}</span>
          </span>
        </li>
      );
    };
  },
});

export default TreeNode;
