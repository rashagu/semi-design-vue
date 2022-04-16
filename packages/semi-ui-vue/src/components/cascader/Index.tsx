import {defineComponent, ref, h, Fragment, useSlots, CSSProperties, VNode} from 'vue'
import cls from 'classnames';
import CascaderFoundation, {
  /* Corresponding to the state of react */
  BasicCascaderInnerData,
  /* Corresponding to the props of react */
  BasicCascaderProps,
  BasicTriggerRenderProps,
  BasicScrollPanelProps,
  CascaderAdapter,
  CascaderType
} from '@douyinfe/semi-foundation/cascader/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/cascader/constants';
import { numbers as popoverNumbers } from '@douyinfe/semi-foundation/popover/constants';
import { isSet, isEqual, isString, isEmpty, isFunction, isNumber, noop, flatten } from 'lodash';
import '@douyinfe/semi-foundation/cascader/cascader.scss';
import { IconClear, IconChevronDown } from '@kousum/semi-icons-vue';
import { findKeysForValues, convertDataToEntities, calcMergeType } from '@douyinfe/semi-foundation/cascader/util';
import { calcCheckedKeys, normalizeKeyList, calcDisabledKeys } from '@douyinfe/semi-foundation/tree/treeUtil';
import ConfigContext from '../configProvider/context';
import BaseComponent, { ValidateStatus } from '../_base/BaseComponent';
import Input from '../input/Index';
import Popover, { PopoverProps } from '../popover/Index';
import Item, { CascaderData, Entities, Entity, Data } from './Item';
import Trigger from '../trigger/Index';
import Tag from '../tag/Index';
import TagInput from '../tagInput/Index';
import { Motion } from '../_base/base';
import { isSemiIcon } from '../_utils';
import {AriaAttributes} from "../AriaAttributes";

export { CascaderType, ShowNextType } from '@douyinfe/semi-foundation/cascader/foundation';
export { CascaderData, Entity, Data, CascaderItemProps } from './Item';

export interface ScrollPanelProps extends BasicScrollPanelProps {
  activeNode: CascaderData;
}

export interface TriggerRenderProps extends BasicTriggerRenderProps {
  componentProps: CascaderProps;
  onClear: (e: MouseEvent) => void;
}

/* The basic type of the value of Cascader */
export type SimpleValueType = string | number | CascaderData;

/* The value of Cascader */
export type Value = SimpleValueType | Array<SimpleValueType> | Array<Array<SimpleValueType>>;

export interface CascaderProps extends BasicCascaderProps {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  'aria-label'?: AriaAttributes['aria-label'];
  arrowIcon?: VNode | string;
  defaultValue?: Value;
  dropdownStyle?: CSSProperties;
  emptyContent?: VNode | string;
  motion?: Motion;
  treeData?: Array<CascaderData>;
  restTagsPopoverProps?: PopoverProps;
  children?: VNode | string;
  value?: Value;
  prefix?: VNode | string;
  suffix?: VNode | string;
  id?: string;
  insetLabel?: VNode | string;
  insetLabelId?: string;
  style?: CSSProperties;
  bottomSlot?: VNode | string;
  topSlot?: VNode | string;
  triggerRender?: (props: TriggerRenderProps) => VNode | string;
  onListScroll?: (e: any, panel: ScrollPanelProps) => void;
  loadData?: (selectOptions: CascaderData[]) => Promise<void>;
  onLoad?: (newLoadedKeys: Set<string>, data: CascaderData) => void;
  onChange?: (value: Value) => void;
  onExceed?: (checkedItem: Entity[]) => void;
  displayRender?: (selected: Array<string> | Entity, idx?: number) => VNode | string;
  onBlur?: (e: MouseEvent) => void;
  onFocus?: (e: MouseEvent) => void;
  validateStatus?: ValidateStatus;
}

export interface CascaderState extends BasicCascaderInnerData {
  keyEntities: Entities;
  prevProps: CascaderProps;
  treeData?: Array<CascaderData>;
}

const prefixcls = cssClasses.PREFIX;
const resetkey = 0;


export const vuePropsType = {
  'aria-describedby': String,
  'aria-errormessage': String,
  'aria-invalid': String,
  'aria-labelledby': String,
  'aria-required': String,
  defaultValue: [Object,Boolean,String,Number],
  dropdownStyle: [Object, String],
  emptyContent: [Object, String],
  children: [Object, String],
  value: [Object,Boolean,String,Number],
  prefix: [Object, String],
  suffix: [Object, String],
  id: [ String],
  insetLabel: [Object, String],
  insetLabelId: [String],
  style: [Object, String],
  bottomSlot: [Object, String],
  topSlot: [Object, String],
  triggerRender: Function,
  loadData: Function,
  onLoad: Function,
  onChange: Function,
  displayRender: Function,
  onBlur: Function,
  onFocus: Function,

  leafOnly: {
    type: Boolean,
    default: false
  },
  arrowIcon: {
    type: Object,
    default: <IconChevronDown />
  },
  stopPropagation: {
    type: Boolean,
    default: true
  },
  motion: {
    type: [Object,Boolean,String,Number],
    default: true
  },
  defaultOpen: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: String,
    default: popoverNumbers.DEFAULT_Z_INDEX
  },
  showClear: {
    type: Boolean,
    default: false
  },
  autoClearSearchValue: {
    type: Boolean,
    default: true
  },
  changeOnSelect: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disableStrictly: {
    type: Boolean,
    default: false
  },
  autoMergeValue: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  filterTreeNode: {
    type: Boolean,
    default: false
  },
  filterLeafOnly: {
    type: Boolean,
    default: true
  },
  showRestTagsPopover: {
    type: Boolean,
    default: false
  },
  restTagsPopoverProps: {
    type: Object,
    default: {}
  },
  separator: {
    type: String,
    default: '/'
  },
  size: {
    type: String,
    default: 'default'
  },
  treeNodeFilterProp: {
    type: String,
    default: 'label'
  },
  displayProp: {
    type: String,
    default: 'label'
  },
  treeData: {
    type: Array,
    default: []
  },
  showNext: {
    type: String,
    default: strings.SHOW_NEXT_BY_CLICK,
  },
  onExceed: {
    type: Function,
    default: noop
  },
  onClear: {
    type: Function,
    default: noop
  },
  onDropdownVisibleChange: {
    type: Function,
    default: noop
  },
  onListScroll: {
    type: Function,
    default: noop
  },
  enableLeafClick: {
    type: Boolean,
    default: false
  },
  'aria-label': {
    type: String,
    default: 'Cascader'
  }
}
const Index = defineComponent<CascaderProps>((props, {}) => {
  const slots = useSlots()

  const state = {
    disabledKeys: new Set(),
    isOpen: props.defaultOpen,
    /* By changing rePosKey, the dropdown position can be refreshed */
    rePosKey: resetkey,
    /* A data structure for storing cascader data items */
    keyEntities: {},
    /* Selected and show tick icon */
    selectedKeys: new Set([]),
    /* The key of the activated node */
    activeKeys: new Set([]),
    /* The key of the filtered node */
    filteredKeys: new Set([]),
    /* Value of input box */
    inputValue: '',
    /* Is searching */
    isSearching: false,
    /* The placeholder of input box */
    inputPlaceHolder: props.searchPlaceholder || props.placeholder,
    /* Cache props */
    prevProps: {},
    /* Is hovering */
    isHovering: false,
    /* Key of checked node, when multiple */
    checkedKeys: new Set([]),
    /* Key of half checked node, when multiple */
    halfCheckedKeys: new Set([]),
    /* Auto merged checkedKeys or leaf checkedKeys, when multiple */
    resolvedCheckedKeys: new Set([]),
    /* Keys of loaded item */
    loadedKeys: new Set(),
    /* Keys of loading item */
    loadingKeys: new Set(),
    /* Mark whether this rendering has triggered asynchronous loading of data */
    loading: false
  };

  return () => (
    <div>
      Index
    </div>
  )
})

Index.props = vuePropsType

export default Index

