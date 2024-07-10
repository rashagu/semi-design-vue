import cls from 'classnames';
import { isEqual, noop, pick, omit } from 'lodash';
import { IconFilter } from '@kousum/semi-icons-vue';

import { cssClasses } from '@douyinfe/semi-foundation/table/constants';

import Dropdown, { DropdownMenu, DropdownItem, DropdownVuePropsType } from '../dropdown';
import type { DropdownProps } from '../dropdown';
import { Radio } from '../radio';
import { Checkbox } from '../checkbox';
import { FilterIcon, Filter, OnFilterDropdownVisibleChange, RenderFilterDropdownItem } from './interface';
import { CombineProps, VueJsxNode } from '../interface';
import { cloneVNode, isVNode, h, ref, watch, defineComponent, VNode, ComponentObjectPropsOptions, PropType } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useHasInProps } from '../_base/baseComponent';

function renderDropdown(props: RenderDropdownProps, nestedElem: VueJsxNode = null, level = 0) {
  const {
    filterMultiple = true,
    filters = [],
    filteredValue = [],
    filterDropdownVisible,
    onSelect = noop,
    onFilterDropdownVisibleChange = noop,
    trigger = 'click',
    position = 'bottom',
    renderFilterDropdown,
    renderFilterDropdownItem,
  } = props ?? {};

  const renderFilterDropdownProps: RenderFilterDropdownProps = pick(props, [
    'tempFilteredValue',
    'setTempFilteredValue',
    'confirm',
    'clear',
    'close',
    'filters',
  ]);

  const render =
    typeof renderFilterDropdown === 'function' ? (
      renderFilterDropdown(renderFilterDropdownProps)
    ) : (
      <DropdownMenu>
        {Array.isArray(filters) &&
          filters.map((filter, index) => {
            const changeFn = (e: MouseEvent) => {
              const domEvent = e;
              if (domEvent) {
                // Block this event to prevent the pop-up layer from closing
                domEvent.stopImmediatePropagation();

                // Prevent bubbling and default events to prevent label click events from triggering twice
                domEvent.stopPropagation();
                domEvent.preventDefault();
              }
              let values = [...filteredValue];

              const included = values.includes(filter.value);
              const idx = values.indexOf(filter.value);

              if (idx > -1) {
                values.splice(idx, 1);
              } else if (filterMultiple) {
                values.push(filter.value);
              } else {
                values = [filter.value];
              }
              return onSelect({
                value: filter.value,
                filteredValue: values,
                included: !included,
                domEvent,
              });
            };

            const checked = filteredValue.includes(filter.value);
            const { text } = filter;
            const { value } = filter;
            const key = `${level}_${index}`;

            const dropdownItem =
              typeof renderFilterDropdownItem === 'function'
                ? renderFilterDropdownItem({
                    onChange: changeFn,
                    filterMultiple,
                    value,
                    text,
                    checked,
                    filteredValue,
                    level,
                  })
                : null;

            let item =
              dropdownItem && isVNode(dropdownItem) ? (
                cloneVNode(dropdownItem, { key })
              ) : (
                <DropdownItem key={key} onClick={changeFn}>
                  {filterMultiple ? (
                    <Checkbox checked={checked}>{text}</Checkbox>
                  ) : (
                    <Radio checked={checked}>{text}</Radio>
                  )}
                </DropdownItem>
              );

            if (Array.isArray(filter.children) && filter.children.length) {
              const childrenDropdownProps = {
                ...props,
                filters: filter.children,
                trigger: 'hover' as const,
                position: 'right' as const,
              };

              delete childrenDropdownProps.filterDropdownVisible;

              item = renderDropdown(childrenDropdownProps, item, level + 1);
            }
            return item;
          })}
      </DropdownMenu>
    );

  const dropdownProps: DropdownProps = {
    ...pick(props, ...Object.keys(DropdownVuePropsType)),
    onVisibleChange: (visible: boolean) => onFilterDropdownVisibleChange(visible),
    trigger,
    position,
    render,
  };

  if (filterDropdownVisible != null) {
    dropdownProps.visible = filterDropdownVisible;
  }

  return (
    <Dropdown
      {...dropdownProps}
      key={`Dropdown_level_${level}`}
      className={`${cssClasses.PREFIX}-column-filter-dropdown`}
    >
      {nestedElem}
    </Dropdown>
  );
}

const propTypes: CombineProps<ColumnFilterProps> = {
  ...DropdownVuePropsType,
  prefixCls: String,
  filteredValue: Array,
  filterIcon: [Boolean, Object, Function] as PropType<ColumnFilterProps['filterIcon']>,
  filterDropdown: [Boolean, Object, Function] as PropType<ColumnFilterProps['filterDropdown']>,
  filterDropdownProps: Object,
  filters: Array,
  filterMultiple: Boolean,
  filterDropdownVisible: Boolean,
  onSelect: Function as PropType<ColumnFilterProps['onSelect']>,
  onFilterDropdownVisibleChange: Function as PropType<ColumnFilterProps['onFilterDropdownVisibleChange']>,
  renderFilterDropdown: Function as PropType<ColumnFilterProps['renderFilterDropdown']>,
  renderFilterDropdownItem: Function as PropType<ColumnFilterProps['renderFilterDropdownItem']>,

  title: String,
  dataIndex: [Number, String],
  width: [Number, String],
  fixed: [Boolean, String],
};
const defaultProps = {};
const ColumnFilterVueProps = vuePropsMake(propTypes, defaultProps);
export const ColumnFilter = defineComponent({
  props: ColumnFilterVueProps as CombineProps<ColumnFilterProps>,
  name: 'ColumnFilter',
  setup(props, { attrs }) {
    const {getProps} = useHasInProps()
    // custom filter related status
    const isFilterDropdownVisibleControlled_ = typeof props.filterDropdownVisible !== 'undefined';
    const isCustomFilterDropdown_ = typeof props.renderFilterDropdown === 'function';
    const isCustomDropdownVisible_ = !isFilterDropdownVisibleControlled_ && isCustomFilterDropdown_;
    const dropdownVisibleInitValue = isCustomDropdownVisible_ ? false : props.filterDropdownVisible;

    const tempFilteredValue = ref<any[]>(props.filteredValue);
    const dropdownVisible = ref<boolean | undefined>(dropdownVisibleInitValue);

    watch(
      () => props.filterDropdownVisible,
      () => {
        if (typeof props.filterDropdownVisible !== 'undefined') {
          dropdownVisible.value = props.filterDropdownVisible;
        }
      },
      { immediate: true }
    );

    watch(
      () => props.filteredValue,
      () => {
        tempFilteredValue.value = props.filteredValue;
      },
      { immediate: true }
    );

    const confirm: RenderFilterDropdownProps['confirm'] = (props_ = {}) => {
      const newFilteredValue = props_?.filteredValue || tempFilteredValue;
      if (!isEqual(newFilteredValue, props.filteredValue)) {
        props.onSelect({ filteredValue: newFilteredValue });
      }
      if (props_.closeDropdown) {
        dropdownVisible.value = false;
      }
    };

    const clear: RenderFilterDropdownProps['clear'] = (props_: { closeDropdown?: boolean } = {}) => {
      tempFilteredValue.value = [];
      props.onSelect({ filteredValue: [] });
      if (props_.closeDropdown) {
        dropdownVisible.value = false;
      }
    };

    const close: RenderFilterDropdownProps['close'] = () => {
      dropdownVisible.value = false;
    };

    const handleFilterDropdownVisibleChange = (visible: boolean) => {
      const isFilterDropdownVisibleControlled = typeof props.filterDropdownVisible !== 'undefined';
      const isCustomFilterDropdown = typeof props.renderFilterDropdown === 'function';
      const isCustomDropdownVisible = !isFilterDropdownVisibleControlled && isCustomFilterDropdown;
      if (isCustomDropdownVisible) {
        dropdownVisible.value = visible;
      }
      props.onFilterDropdownVisibleChange(visible);
    };

    return () => {
      const {
        prefixCls = cssClasses.PREFIX,
        filteredValue,
        filterIcon = 'filter',
        filterDropdownProps,
        onSelect,
        filterDropdownVisible,
        renderFilterDropdown,
        onFilterDropdownVisibleChange,
      } = getProps(props);
      let { filterDropdown = null } = props;

      // custom filter related status
      const isFilterDropdownVisibleControlled = typeof props.filterDropdownVisible !== 'undefined';

      const renderFilterDropdownProps: RenderFilterDropdownProps = {
        tempFilteredValue: tempFilteredValue.value,
        setTempFilteredValue: (v) => {
          tempFilteredValue.value = v;
        },
        confirm,
        clear,
        close,
      };

      const finalCls = cls(`${prefixCls}-column-filter`, {
        on: Array.isArray(filteredValue) && filteredValue.length,
      });

      let iconElem;

      if (typeof filterIcon === 'function') {
        iconElem = filterIcon(Array.isArray(filteredValue) && filteredValue.length > 0);
      } else if (isVNode(filterIcon)) {
        iconElem = filterIcon;
      } else {
        iconElem = (
          <div class={finalCls}>
            {'\u200b' /* ZWSP(zero-width space) */}
            <IconFilter
              role="button"
              aria-label="Filter data with this column"
              aria-haspopup="listbox"
              tabIndex={-1}
              size="default"
            />
          </div>
        );
      }

      const renderProps: RenderDropdownProps = {
        ...getProps(props),
        ...filterDropdownProps,
        ...renderFilterDropdownProps,
        filterDropdownVisible: isFilterDropdownVisibleControlled ? filterDropdownVisible : dropdownVisible.value,
        onFilterDropdownVisibleChange: handleFilterDropdownVisibleChange,
      };

      filterDropdown = isVNode(filterDropdown) ? filterDropdown : renderDropdown(renderProps, iconElem);

      return filterDropdown;
    };
  },
});

export interface ColumnFilterProps extends Omit<RenderDropdownProps, keyof RenderFilterDropdownProps> {
  prefixCls?: string;
  filteredValue?: any[];
  filterIcon?: FilterIcon;
  filterDropdown?: VueJsxNode;
  filterDropdownProps?: FilterDropdownProps;
  filters?: Filter[];

  // warning
  title?: string;
  dataIndex?: string | number;
  width?: string | number;
  fixed?: string | boolean;
}

export interface RenderDropdownProps extends FilterDropdownProps, RenderFilterDropdownProps {
  filterMultiple?: boolean;
  filters?: Filter[];
  filteredValue?: any[];
  filterDropdownVisible?: boolean;
  onSelect?: (data: OnSelectData) => void;
  onFilterDropdownVisibleChange?: OnFilterDropdownVisibleChange;
  renderFilterDropdown?: (props?: RenderFilterDropdownProps) => VNode;
  renderFilterDropdownItem?: RenderFilterDropdownItem;
}

export interface FilterDropdownProps extends Omit<DropdownProps, 'render' | 'onVisibleChange'> {}

export interface OnSelectData {
  value?: any;
  /** only this value is used now  */
  filteredValue: any;
  included?: boolean;
  domEvent?: MouseEvent;
}

export interface RenderFilterDropdownProps {
  /** temporary filteredValue  */
  tempFilteredValue: any[];
  /** set temporary filteredValue  */
  setTempFilteredValue: (tempFilteredValue: any[]) => void;
  /** set tempFilteredValue to filteredValue. You can also pass filteredValue to directly set the filteredValue  */
  confirm: (props?: { closeDropdown?: boolean; filteredValue?: any[] }) => void;
  /** clear tempFilteredValue and filteredValue  */
  clear: (props?: { closeDropdown?: boolean }) => void;
  /** close dropdown  */
  close: () => void;
  /** column filters  */
  filters?: RenderDropdownProps['filters'];
}

export default ColumnFilter;
