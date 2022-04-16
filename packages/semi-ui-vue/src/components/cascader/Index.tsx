import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
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
import BaseComponent, { ValidateStatus } from '../_base/baseComponent';
import Input from '../input/index';
import Popover, { PopoverProps } from '../popover/index';
import Item, { CascaderData, Entities, Entity, Data } from './Item';
import Trigger from '../trigger';
import Tag from '../tag';
import TagInput from '../tagInput';
import { Motion } from '../_base/base';
import { isSemiIcon } from '../_utils';

export { CascaderType, ShowNextType } from '@douyinfe/semi-foundation/cascader/foundation';
export { CascaderData, Entity, Data, CascaderItemProps } from './Item';

export interface ScrollPanelProps extends BasicScrollPanelProps {
  activeNode: CascaderData;
}

export interface TriggerRenderProps extends BasicTriggerRenderProps {
  componentProps: CascaderProps;
  onClear: (e: React.MouseEvent) => void;
}

/* The basic type of the value of Cascader */
export type SimpleValueType = string | number | CascaderData;

/* The value of Cascader */
export type Value = SimpleValueType | Array<SimpleValueType> | Array<Array<SimpleValueType>>;

export interface CascaderProps extends BasicCascaderProps {
  'aria-describedby'?: React.AriaAttributes['aria-describedby'];
  'aria-errormessage'?: React.AriaAttributes['aria-errormessage'];
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
  'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
  'aria-required'?: React.AriaAttributes['aria-required'];
  'aria-label'?: React.AriaAttributes['aria-label'];
  arrowIcon?: ReactNode;
  defaultValue?: Value;
  dropdownStyle?: CSSProperties;
  emptyContent?: ReactNode;
  motion?: Motion;
  treeData?: Array<CascaderData>;
  restTagsPopoverProps?: PopoverProps;
  children?: ReactNode;
  value?: Value;
  prefix?: ReactNode;
  suffix?: ReactNode;
  id?: string;
  insetLabel?: ReactNode;
  insetLabelId?: string;
  style?: CSSProperties;
  bottomSlot?: ReactNode;
  topSlot?: ReactNode;
  triggerRender?: (props: TriggerRenderProps) => ReactNode;
  onListScroll?: (e: React.UIEvent<HTMLUListElement, UIEvent>, panel: ScrollPanelProps) => void;
  loadData?: (selectOptions: CascaderData[]) => Promise<void>;
  onLoad?: (newLoadedKeys: Set<string>, data: CascaderData) => void;
  onChange?: (value: Value) => void;
  onExceed?: (checkedItem: Entity[]) => void;
  displayRender?: (selected: Array<string> | Entity, idx?: number) => ReactNode;
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
  name: String
}
const Index = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()


  return () => (
    <div>
      Index
    </div>
  )
})

Index.props = vuePropsType

export default Index

