import { defineComponent, ref, h, Fragment, VNode } from 'vue';
import warning from '@douyinfe/semi-foundation/utils/warning';
import type { OptionProps } from './option';
import type { OptionGroupProps } from './optionGroup';
import { getFragmentChildren } from '../_utils';

const generateOption = (child: VNode, parent: any, index: number, newKey?: string | number): OptionProps => {
  const childProps = child.props;
  if (!child || !childProps) {
    return null;
  }


  const option = {
    value: childProps.value,
    // Drop-down menu rendering priority label value, children, value in turn downgrade
    label:
      childProps.label ||
      // @ts-ignore
      (typeof child.children === 'object' && child.children.default ? child.children.default() : null) ||
      childProps.value,
    _show: true,
    _selected: false,
    _scrollIndex: index,
    ...childProps,
    _parentGroup: parent,
  };

  // Props are collected from ReactNode, after React.Children.toArray
  // no need to determine whether the key exists in child
  // Even if the user does not explicitly declare it, React will always generate a key.
  //@ts-ignore
  option._keyInJsx = newKey || child.key;

  return option;
};

const getOptionsFromGroup = (selectChildren: VNode[]) => {
  let optionGroups: OptionGroupProps[] = [];
  let options: OptionProps[] = [];

  const emptyGroup = { label: '', children: [], _show: false };

  // TODO 不同点
  // if (!Array.isArray(selectChildren)){
  //   selectChildren = selectChildren[0].children as VNode[]
  // }

  // avoid null
  // eslint-disable-next-line max-len
  // let childNodes = React.Children.toArray(selectChildren) as React.ReactElement[];
  let childNodes = selectChildren.filter((childNode) => {
    return childNode && childNode.props;
  });

  let type = '';
  let optionIndex = -1;

  childNodes.forEach((child: VNode) => {
    // @ts-ignore
    if (child.type?.name === 'isSelectOption') {
      type = 'option';
      optionIndex++;
      const option = generateOption(child, undefined, optionIndex);
      emptyGroup.children.push(option);
      options.push(option);
      // @ts-ignore
    } else if (child.type?.name === 'isSelectOptionGroup') {
      type = 'group';
      // Avoid saving children (reactNode) by... removing other props from the group except children, causing performance problems
      // eslint-disable-next-line prefer-const
      let { ...restGroupProps } = child.props;


      // @ts-ignore
      let children = getFragmentChildren(child.children);
      let originKeys = [];
      if (Array.isArray(children)) {
        // if group has children > 1
        originKeys = children.map(item => item.key);
      } else {
        // @ts-ignore
        originKeys.push(children.key);
      }
      // children = React.Children.toArray(children);
      if (Array.isArray(children[0])) {
        children = children[0];
      }

      const childrenOption = children.map((option: VNode, index) => {
        let newKey = option.key;
        if (originKeys[index] === null) {
          // @ts-ignore
          newKey = child.key + '' + option.key; // if option in group and didn't set key, concat parent key to avoid conflict (default generate key just like .0, .1)
        }
        optionIndex++;
        return generateOption(option, restGroupProps, optionIndex, newKey as string);
      });
      const group: OptionGroupProps = {
        ...child.props,
        children: childrenOption as VNode[],
        // @ts-ignore
        key: child.key,
      };
      optionGroups.push(group);
      options = options.concat(childrenOption);
    } else {
      warning(true, '[Semi Select] The children of `Select` should be `Select.Option` or `Select.OptionGroup`');
    }
  });
  if (type === 'option') {
    optionGroups = [emptyGroup];
  }
  return { optionGroups, options };
};

export { generateOption, getOptionsFromGroup };
