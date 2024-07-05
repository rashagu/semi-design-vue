import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  VNode,
  cloneVNode,
  PropType,
  watch,
  onMounted,
  nextTick, toRaw, onUnmounted,
} from 'vue';
import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/cascader/constants';
import isEnterPress from '@douyinfe/semi-foundation/utils/isEnterPress';
import { includes } from 'lodash';
import LocaleConsumer from '../locale/localeConsumer';
import { IconChevronRight, IconTick } from '@kousum/semi-icons-vue';
import { Locale } from '../locale/interface';
import Spin from '../spin';
import Checkbox, { CheckboxEvent } from '../checkbox';
import { BasicCascaderData, BasicEntity, ShowNextType, BasicData, Virtualize } from '@douyinfe/semi-foundation/cascader/foundation';
import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import { VueJsxNode } from '../interface';
import {ComponentObjectPropsOptions} from "vue";
import { FixedSizeList as List } from '@kousum/vue3-window';
import VirtualRow from './virtualRow';

export interface CascaderData extends BasicCascaderData {
  label: VNode | string;
}

export interface Entity extends BasicEntity {
  /* children list */
  children?: Array<Entity>;
  /* treedata */
  data: CascaderData;
  /* parent data */
  parent?: Entity;
}

export interface Entities {
  [idx: string]: Entity;
}

export interface Data extends BasicData {
  data: CascaderData;
  searchText: VNode[] | string[];
}

export interface FilterRenderProps {
  className: string;
  inputValue: string;
  disabled: boolean;
  data: CascaderData[];
  checkStatus: {
    checked: boolean;
    halfChecked: boolean;
  };
  selected: boolean;
  onClick: (e: MouseEvent) => void;
  onCheck: (e: MouseEvent) => void;
}

export interface CascaderItemProps extends BaseProps {
  activeKeys: Set<string>;
  selectedKeys: Set<string>;
  loadedKeys: Set<string>;
  loadingKeys: Set<string>;
  onItemClick: (e: MouseEvent | KeyboardEvent, item: Entity | Data) => void;
  onItemHover: (e: MouseEvent, item: Entity) => void;
  showNext: ShowNextType;
  onItemCheckboxClick: (item: Entity | Data) => void;
  onListScroll: (e: any, ind: number) => void;
  searchable: boolean;
  keyword: string;
  empty?: boolean;
  emptyContent: VNode | string;
  loadData: (selectOptions: CascaderData[]) => Promise<void>;
  data: Array<Data | Entity>;
  separator: string;
  multiple: boolean;
  checkedKeys: Set<string>;
  halfCheckedKeys: Set<string>;
  filterRender?: (props: FilterRenderProps) => VueJsxNode;
  virtualize?: Virtualize
}

const prefixcls = cssClasses.PREFIX_OPTION;

export const vuePropsType:ComponentObjectPropsOptions<CascaderItemProps> = {
  activeKeys: Object,
  selectedKeys: Object,
  loadedKeys: Object,
  loadingKeys: Object,
  onItemClick: Function as PropType<CascaderItemProps['onItemClick']>,
  onItemHover: Function as PropType<CascaderItemProps['onItemHover']>,
  showNext: String as PropType<CascaderItemProps['showNext']>,
  onItemCheckboxClick: Function as PropType<CascaderItemProps['onItemCheckboxClick']>,
  onListScroll: Function as PropType<CascaderItemProps['onListScroll']>,
  searchable: Boolean,
  keyword: String,
  virtualize: Object,
  emptyContent: [Object, String],
  loadData: Function as PropType<CascaderItemProps['loadData']>,
  data: Array,
  separator: String,
  multiple: Boolean,
  checkedKeys: Object,
  halfCheckedKeys: Object,
  empty: {
    type: Boolean,
    default: false,
  },
};
const Item = defineComponent((props, {}) => {
  const slots = useSlots();

  // TODO context
  const { context } = useBaseComponent<CascaderItemProps>(props, {});
  const onClick = (e: MouseEvent | KeyboardEvent, item: Entity | Data) => {
    const { onItemClick } = props;
    if (item.data.disabled || ('disabled' in item && item.disabled)) {
      return;
    }
    onItemClick(e, item);
  };

  /**
   * A11y: simulate item click
   */
  const handleItemEnterPress = (keyboardEvent: KeyboardEvent, item: Entity | Data) => {
    if (isEnterPress(keyboardEvent)) {
      onClick(keyboardEvent, item);
    }
  };

  const onHover = (e: MouseEvent, item: Entity) => {
    const { showNext, onItemHover } = props;
    if (item.data.disabled) {
      return;
    }
    if (showNext === strings.SHOW_NEXT_BY_HOVER) {
      onItemHover(e, item);
    }
  };

  const onCheckboxChange = (e: CheckboxEvent, item: Entity | Data) => {
    const { onItemCheckboxClick } = props;
    // Prevent Checkbox's click event bubbling to trigger the li click event
    e.stopPropagation();
    if (e && e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
      e.nativeEvent.stopImmediatePropagation();
    }
    // @ts-ignore
    if (e && e.stopImmediatePropagation && typeof e.stopImmediatePropagation === 'function') {
      // @ts-ignore
      e.stopImmediatePropagation();
    }
    onItemCheckboxClick(item);
  };

  const getItemStatus = (key: string) => {
    const { activeKeys, selectedKeys, loadedKeys, loadingKeys } = props;
    const state = { active: false, selected: false, loading: false };
    if (activeKeys.has(key)) {
      state.active = true;
    }
    if (selectedKeys.has(key)) {
      state.selected = true;
    }
    if (loadingKeys.has(key) && !loadedKeys.has(key)) {
      state.loading = true;
    }
    return state;
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'child':
        return <IconChevronRight className={`${prefixcls}-icon ${prefixcls}-icon-expand`} />;
      case 'tick':
        return <IconTick className={`${prefixcls}-icon ${prefixcls}-icon-active`} />;
      case 'loading':
        return <Spin wrapperClassName={`${prefixcls}-spin-icon`} />;
      case 'empty':
        return <span aria-hidden={true} class={`${prefixcls}-icon ${prefixcls}-icon-empty`} />;
      default:
        return null;
    }
  };

  const highlight = (searchText: (VNode | string | JSX.Element)[]) => {
    const content: (VNode | string | JSX.Element)[] = [];
    const { keyword, separator } = props;
    searchText.forEach((item, idx) => {
      if (typeof item === 'string' && includes(item, keyword)) {
        item.split(keyword).forEach((node, index) => {
          if (index > 0) {
            content.push(
              <span class={`${prefixcls}-label-highlight`} key={`${index}-${idx}`}>
                {keyword}
              </span>
            );
          }
          content.push(node);
        });
      } else {
        content.push(item);
      }
      if (idx !== searchText.length - 1) {
        content.push(separator);
      }
    });
    return content;
  };


  const renderFlattenOptionItem = (data: Data, index?: number, style?: any) => {
    const { multiple, selectedKeys, checkedKeys, halfCheckedKeys, keyword, filterRender, virtualize } = props;
    const { searchText, key, disabled, pathData } = data;
    const selected = selectedKeys.has(key);
    const className = cls(prefixcls, {
      [`${prefixcls}-flatten`]: true && !filterRender,
      [`${prefixcls}-disabled`]: disabled,
      [`${prefixcls}-select`]: selected && !multiple,
    });
    const onClick_ = e => {
      onClick(e, data);
    };
    const onKeyPress = e => handleItemEnterPress(e, data);
    const onCheck = (e: CheckboxEvent) => onCheckboxChange(e, data);
    if (filterRender) {
      const props_ = {
        className,
        inputValue: keyword,
        disabled,
        data: pathData,
        checkStatus: {
          checked: checkedKeys.has(data.key),
          halfChecked: halfCheckedKeys.has(data.key),
        },
        selected,
        onClick: onClick_,
        onCheck
      };
      const item = filterRender(props_) as any;
      const otherProps = virtualize ? {
        key,
        style: {
          ...(item.props.style ?? {}),
          ...style
        },
      } : { key };
      return cloneVNode(item, otherProps );
    }
    return (
      <li
        role='menuitem'
        class={className}
        style={style}
        key={key}
        onClick={onClick_}
        onKeypress={onKeyPress}
      >
                <span class={`${prefixcls}-label`}>
                    {!multiple && renderIcon('empty')}
                  {multiple && (
                    <Checkbox
                      onChange={onCheck}
                      disabled={disabled}
                      indeterminate={halfCheckedKeys.has(data.key)}
                      checked={checkedKeys.has(data.key)}
                      className={`${prefixcls}-label-checkbox`}
                    />
                  )}
                  {highlight(searchText)}
                </span>
      </li>
    );
  }

  const renderFlattenOption = (data: Data[]) => {
    const { virtualize } = props;
    const content = (
      <ul class={`${prefixcls}-list`} key={'flatten-list'}>
        {virtualize ? renderVirtualizeList(data) : data.map(item => renderFlattenOptionItem(item))}
      </ul>
    );
    return content;
  };


  const renderVirtualizeList = (visibleOptions: any) => {
    const { direction } = context.value;
    const { virtualize } = props;
    return (
      <List
        height={parseInt('' + virtualize.height)}
        itemCount={visibleOptions.length}
        itemSize={virtualize.itemSize}
        itemData={{ visibleOptions, renderOption: renderFlattenOptionItem }}
        width={virtualize.width ?? '100%'}
        style={{ direction }}
      >
        {VirtualRow}
      </List>
    );
  }

  const contentNode = ref()
  function renderItem(renderData: Array<Entity>, content: Array<VNode> = []) {
    const { multiple, checkedKeys, halfCheckedKeys } = props;
    let showChildItem: Entity;
    const ind = content.length;
    content.push(
      <ul role="menu" class={`${prefixcls}-list`} key={renderData[0].key} onScroll={(e) => props.onListScroll(e, ind)}>
        {renderData.map((item) => {
          const { data, key, parentKey } = item;
          const { children, label, disabled, isLeaf } = data;
          const { active, selected, loading } = getItemStatus(key);
          const hasChild = Boolean(children) && children.length;
          const showExpand = hasChild || (props.loadData && !isLeaf);
          if (active && hasChild) {
            showChildItem = item;
          }
          const className = cls(prefixcls, {
            [`${prefixcls}-active`]: active && !selected,
            [`${prefixcls}-select`]: selected && !multiple,
            [`${prefixcls}-disabled`]: disabled,
          });
          const otherAriaProps = parentKey ? { ['aria-owns']: `cascaderItem-${parentKey}` } : {};
          return (
            <li
              role="menuitem"
              id={`cascaderItem-${key}`}
              aria-expanded={active}
              aria-haspopup={Boolean(showExpand)}
              aria-disabled={disabled}
              {...otherAriaProps}
              class={className}
              key={key}
              onClick={(e) => {
                onClick(e, item);
              }}
              onKeypress={(e) => handleItemEnterPress(e, item)}
              onMouseenter={(e) => {
                onHover(e, item);
              }}
            >
              <span class={`${prefixcls}-label`}>
                {selected && !multiple && renderIcon('tick')}
                {!selected && !multiple && renderIcon('empty')}
                {multiple && (
                  <Checkbox
                    onChange={(e: CheckboxEvent) => onCheckboxChange(e, item)}
                    disabled={disabled}
                    indeterminate={halfCheckedKeys.has(item.key)}
                    checked={checkedKeys.has(item.key)}
                    className={`${prefixcls}-label-checkbox`}
                  />
                )}
                <span>{label}</span>
              </span>
              {showExpand ? renderIcon(loading ? 'loading' : 'child') : null}
            </li>
          );
        })}
      </ul>
    );
    if (showChildItem) {
      content.concat(renderItem(showChildItem.children, content));
    }
    return content;
  }

  function renderEmpty() {
    const { emptyContent } = props;
    return (
      <LocaleConsumer componentName="Cascader">
        {(locale: Locale['Cascader']) => (
          <ul class={`${prefixcls} ${prefixcls}-empty`} key={'empty-list'}>
            <span class={`${prefixcls}-label`}>{emptyContent || locale.emptyText}</span>
          </ul>
        )}
      </LocaleConsumer>
    );
  }

  function updateScrollTop() {
    props.activeKeys.forEach((item)=>{
      let optionId = `cascaderItem-${item}`;

      let destNode = (contentNode.value as HTMLDivElement)?.querySelector('#' + optionId) as HTMLElement
      // let destNode = document.getElementById(optionId);
      if (destNode) {
        /**
         * Scroll the first selected item into view.
         * The reason why ScrollIntoView is not used here is that it may cause page to move.
         */
        const destParent = destNode.parentNode as HTMLDivElement;
        destParent.scrollTop = destNode.offsetTop -
          destParent.offsetTop -
          (destParent.clientHeight / 2) +
          (destNode.clientHeight / 2);
      }
    })
  }

  onMounted(()=>{
    updateScrollTop()
  })
  // onUnmounted(()=>{
  //   console.log('onUnmounted');
  // })
  //
  // watch(()=>props, (value, oldValue, onCleanup)=>{
  //   console.log(toRaw(value), toRaw(oldValue));
  // }, {deep: true})

  return () => {
    const { data, searchable } = props;
    const { direction } = context.value;
    const isEmpty = !data || !data.length;
    let content;
    const listsCls = cls({
      [`${prefixcls}-lists`]: true,
      [`${prefixcls}-lists-rtl`]: direction === 'rtl',
      [`${prefixcls}-lists-empty`]: isEmpty,
    });

    if (isEmpty) {
      content = renderEmpty();
    } else {
      content = searchable ? renderFlattenOption(data as Data[]) : renderItem(data as Entity[]);
    }
    return <div ref={contentNode} class={listsCls}>{content}</div>;
  };
}, {
  props: vuePropsType,
  name: 'CascaderItem'
});


export default Item;
