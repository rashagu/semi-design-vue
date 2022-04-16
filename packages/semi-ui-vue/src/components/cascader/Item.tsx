import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/cascader/constants';
import isEnterPress from '@douyinfe/semi-foundation/utils/isEnterPress';
import { includes } from 'lodash';
import ConfigContext from '../configProvider/context';
import LocaleConsumer from '../locale/localeConsumer';
import { IconChevronRight, IconTick } from '@kousum/semi-icons-vue';
import { Locale } from '../locale/interface';
import Spin from '../spin';
import Checkbox, { CheckboxEvent } from '../checkbox/Index';
import {
  BasicCascaderData,
  BasicEntity,
  ShowNextType,
  BasicData
} from '@douyinfe/semi-foundation/cascader/foundation';

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
  searchText: React.VNode | string[];
}

export interface CascaderItemProps {
  activeKeys: Set<string>;
  selectedKeys: Set<string>;
  loadedKeys: Set<string>;
  loadingKeys: Set<string>;
  onItemClick: (e: React.MouseEvent | React.KeyboardEvent, item: Entity | Data) => void;
  onItemHover: (e: React.MouseEvent, item: Entity) => void;
  showNext: ShowNextType;
  onItemCheckboxClick: (item: Entity | Data) => void;
  onListScroll: (e: React.UIEvent<HTMLUListElement, UIEvent>, ind: number) => void;
  searchable: boolean;
  keyword: string;
  empty: boolean;
  emptyContent: React.VNode | string;
  loadData: (selectOptions: CascaderData[]) => Promise<void>;
  data: Array<Data | Entity>;
  separator: string;
  multiple: boolean;
  checkedKeys: Set<string>;
  halfCheckedKeys: Set<string>;
}

const prefixcls = cssClasses.PREFIX_OPTION;

export const vuePropsType = {
  name: String
}
const Item = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      Item
    </div>
  )
})

Item.props = vuePropsType

export default Item

